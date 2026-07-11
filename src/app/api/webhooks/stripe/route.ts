import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getPrisma } from "@/lib/prisma";
import { getProducts } from "@/lib/catalog";
import { forwardOrderToSuppliers } from "@/lib/suppliers/router";
import { sendEmail, orderConfirmationHtml } from "@/lib/email";
import { formatPrice } from "@/lib/money";
import { log } from "@/lib/log";
import type { Locale } from "@/i18n/routing";

/**
 * Stripe webhook — the heart of the automation pipeline:
 *   payment confirmed → order persisted → fan-out to suppliers →
 *   confirmation email. Signature is verified against STRIPE_WEBHOOK_SECRET;
 *   unverifiable events are rejected.
 */
export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);
  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(await req.text(), signature, webhookSecret);
  } catch {
    await log("stripe", "warn", "Webhook signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const prisma = getPrisma();
  if (!prisma) {
    await log("stripe", "error", "Paid session received but no database configured", {
      sessionId: session.id,
    });
    return NextResponse.json({ error: "No database" }, { status: 500 });
  }

  // Idempotency: Stripe retries webhooks; the unique stripeSessionId makes
  // a duplicate delivery a no-op.
  const existing = await prisma.order.findUnique({ where: { stripeSessionId: session.id } });
  if (existing) return NextResponse.json({ received: true });

  const locale = (session.metadata?.locale ?? "en") as Locale;
  const cartItems = JSON.parse(session.metadata?.items ?? "[]") as { slug: string; quantity: number }[];
  const catalog = await getProducts(locale);
  const dbProducts = await prisma.product.findMany({
    where: { slug: { in: cartItems.map((i) => i.slug) } },
  });

  const seq = (await prisma.order.count()) + 1;
  const number = `TLS-${new Date().getFullYear()}-${String(seq).padStart(6, "0")}`;
  const address = session.collected_information?.shipping_details ?? null;

  let subtotal = 0;
  const itemsData = cartItems.flatMap((item) => {
    const cat = catalog.find((p) => p.slug === item.slug);
    const db = dbProducts.find((p) => p.slug === item.slug);
    if (!cat || !db) return [];
    subtotal += cat.priceCents * item.quantity;
    return [{ productId: db.id, name: cat.name, quantity: item.quantity, unitCents: cat.priceCents }];
  });

  const order = await prisma.order.create({
    data: {
      number,
      email: session.customer_details?.email ?? "",
      locale,
      currency: "EUR",
      status: "PAID",
      subtotalCents: subtotal,
      shippingCents: 0,
      totalCents: session.amount_total ?? subtotal,
      stripeSessionId: session.id,
      shippingName: address?.name ?? session.customer_details?.name ?? null,
      shippingLine1: address?.address?.line1 ?? null,
      shippingLine2: address?.address?.line2 ?? null,
      shippingCity: address?.address?.city ?? null,
      shippingPostal: address?.address?.postal_code ?? null,
      shippingCountry: address?.address?.country ?? null,
      items: { create: itemsData },
    },
  });

  await log("stripe", "info", `Order ${number} created from session ${session.id}`);

  // Decrement local stock immediately (authoritative stock comes back on next supplier sync).
  for (const item of itemsData) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  await sendEmail(
    order.email,
    `Order ${number} confirmed — Tulsi`,
    orderConfirmationHtml(number, formatPrice(order.totalCents, locale)),
  );

  await forwardOrderToSuppliers(order.id);

  return NextResponse.json({ received: true });
}

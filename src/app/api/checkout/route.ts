import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { getProducts } from "@/lib/catalog";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { LOCALES, type Locale } from "@/i18n/routing";

const checkoutSchema = z.object({
  locale: z.enum(LOCALES),
  items: z
    .array(z.object({ slug: z.string().min(1).max(100), quantity: z.number().int().min(1).max(10) }))
    .min(1)
    .max(20),
});

/** EU markets served at launch. */
const SHIPPING_COUNTRIES = ["NL", "BE", "DE", "FR", "ES", "IT", "AT", "IE", "PT", "LU"] as const;

/**
 * Creates a Stripe Checkout Session. Prices are always resolved server-side
 * from the catalog — the client only sends slugs and quantities, so a
 * tampered request can never change what is charged.
 * Payment methods (cards, Apple Pay, Google Pay, iDEAL, Bancontact, PayPal)
 * are managed from the Stripe Dashboard via automatic payment methods.
 */
export async function POST(req: Request) {
  if (!rateLimit(`checkout:${clientKey(req)}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Payments not configured yet (STRIPE_SECRET_KEY missing)." },
      { status: 503 },
    );
  }

  const parsed = checkoutSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { items, locale } = parsed.data;

  const catalog = await getProducts(locale as Locale);
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    const product = catalog.find((p) => p.slug === item.slug);
    if (!product) return NextResponse.json({ error: `Unknown product: ${item.slug}` }, { status: 400 });
    if (product.stock < item.quantity) {
      return NextResponse.json({ error: `Out of stock: ${product.name}` }, { status: 409 });
    }
    lineItems.push({
      quantity: item.quantity,
      price_data: {
        currency: "eur",
        unit_amount: product.priceCents,
        product_data: { name: product.name, metadata: { slug: product.slug } },
      },
    });
  }

  const stripe = new Stripe(secretKey);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    locale: locale as Stripe.Checkout.SessionCreateParams.Locale,
    shipping_address_collection: { allowed_countries: [...SHIPPING_COUNTRIES] },
    success_url: `${siteUrl}/${locale}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/${locale}/cart`,
    metadata: {
      locale,
      items: JSON.stringify(items), // resolved again server-side in the webhook
    },
  });

  return NextResponse.json({ url: session.url });
}

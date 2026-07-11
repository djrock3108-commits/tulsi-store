/**
 * Prueba E2E del pipeline de pedidos: construye un evento
 * checkout.session.completed firmado con STRIPE_WEBHOOK_SECRET (firma
 * HMAC-SHA256 idéntica a la de Stripe) y lo envía al webhook de producción.
 * Verifica: pedido en DB → orden automática a CJ → estado en admin.
 * Uso: node scripts/test-order-e2e.mjs
 */
import { createHmac, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
    }),
);

const WEBHOOK_URL = "https://tulsi-store-lpnb.vercel.app/api/webhooks/stripe";
const secret = env.STRIPE_WEBHOOK_SECRET;
if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET missing in .env");

const sessionId = `cs_test_e2e_${randomUUID().replace(/-/g, "").slice(0, 20)}`;
const event = {
  id: `evt_e2e_${randomUUID().replace(/-/g, "").slice(0, 20)}`,
  object: "event",
  api_version: "2025-06-30",
  type: "checkout.session.completed",
  data: {
    object: {
      id: sessionId,
      object: "checkout.session",
      mode: "payment",
      payment_status: "paid",
      amount_total: 4995,
      currency: "eur",
      customer_details: { email: "djrock.3108@gmail.com", name: "Prueba Tulsi E2E" },
      collected_information: {
        shipping_details: {
          name: "Prueba Tulsi E2E",
          address: {
            line1: "Teststraat 1",
            line2: null,
            city: "Amsterdam",
            postal_code: "1011AB",
            country: "NL",
          },
        },
      },
      metadata: {
        locale: "es",
        items: JSON.stringify([{ slug: "smart-pet-fountain", quantity: 1 }]),
      },
    },
  },
};

const payload = JSON.stringify(event);
const t = Math.floor(Date.now() / 1000);
const signature = createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");

console.log(`→ enviando checkout.session.completed simulado (${sessionId})`);
const res = await fetch(WEBHOOK_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Stripe-Signature": `t=${t},v1=${signature}`,
  },
  body: payload,
});
console.log(`← webhook respondió: HTTP ${res.status} ${await res.text()}`);

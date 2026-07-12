/**
 * GO-LIVE · Paso automatizable: crea el webhook de Stripe para el modo LIVE
 * y muestra el signing secret que hay que poner en Vercel.
 *
 * Uso (con la clave LIVE, sk_live_...):
 *   node scripts/setup-stripe-webhook.mjs sk_live_XXXX
 *
 * No guarda la clave en ningún sitio; solo la usa para esta llamada.
 */
const key = process.argv[2];
if (!key?.startsWith("sk_")) {
  console.error("Uso: node scripts/setup-stripe-webhook.mjs sk_live_...");
  process.exit(1);
}

const res = await fetch("https://api.stripe.com/v1/webhook_endpoints", {
  method: "POST",
  headers: {
    Authorization: `Basic ${Buffer.from(key + ":").toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    url: "https://tulsi.store/api/webhooks/stripe",
    "enabled_events[]": "checkout.session.completed",
    description: "Tulsi order pipeline (LIVE)",
  }),
});
const data = await res.json();
if (data.error) {
  console.error("ERROR:", data.error.message);
  process.exit(1);
}
console.log("✅ Webhook creado:", data.id, `(${data.status})`);
console.log("");
console.log("SIGNING SECRET (ponlo en Vercel como STRIPE_WEBHOOK_SECRET):");
console.log(data.secret);
console.log("");
console.log("Siguiente paso: docs/GO-LIVE-PAYMENTS.md → Paso 3");

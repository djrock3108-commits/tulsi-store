/**
 * GO-LIVE · Chequeo de preparación de Tulsi.store.
 * Ejecutar en cualquier momento para saber el estado exacto de cada pieza
 * y qué falta para vender en real. Solo LEE — no cambia nada.
 *
 * Uso: node scripts/go-live-check.mjs
 */
import { readFileSync, existsSync } from "node:fs";

const env = existsSync(".env")
  ? Object.fromEntries(
      readFileSync(".env", "utf8")
        .split("\n")
        .filter((l) => l.includes("="))
        .map((l) => {
          const i = l.indexOf("=");
          return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
        }),
    )
  : {};

const checks = [];
const ok = (name, detail = "") => checks.push({ name, pass: true, detail });
const warn = (name, detail) => checks.push({ name, pass: "warn", detail });
const fail = (name, detail) => checks.push({ name, pass: false, detail });

async function head(url) {
  try {
    const r = await fetch(url, { method: "GET", redirect: "manual" });
    return r.status;
  } catch {
    return 0;
  }
}

// 1. Dominio y tienda
const home = await head("https://tulsi.store/es");
home === 200 ? ok("Dominio tulsi.store", "SSL + tienda respondiendo") : fail("Dominio tulsi.store", `HTTP ${home}`);

// 2. Modo de Stripe
const sk = env.STRIPE_SECRET_KEY ?? "";
if (sk.startsWith("sk_live_")) ok("Stripe", "claves LIVE en .env local");
else if (sk.startsWith("sk_test_")) warn("Stripe", "en MODO TEST — cambiar a claves live al tener KVK (docs/GO-LIVE-PAYMENTS.md)");
else fail("Stripe", "sin STRIPE_SECRET_KEY en .env");

// 3. Checkout de producción funciona
try {
  const r = await fetch("https://tulsi.store/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ locale: "es", items: [{ slug: "smart-pet-fountain", quantity: 1 }] }),
  });
  const d = await r.json();
  d.url?.includes("checkout.stripe.com")
    ? ok("Checkout producción", "sesión de pago creada correctamente")
    : fail("Checkout producción", JSON.stringify(d).slice(0, 120));
} catch (e) {
  fail("Checkout producción", e.message);
}

// 4. Base de datos
if (env.DATABASE_URL) {
  try {
    const { Client } = await import("pg");
    const c = new Client({ connectionString: env.DATABASE_URL });
    await c.connect();
    const r = await c.query('SELECT count(*)::int AS n FROM "Product" WHERE active');
    ok("PostgreSQL (Neon)", `${r.rows[0].n} productos activos`);
    await c.end();
  } catch (e) {
    fail("PostgreSQL", e.message.slice(0, 100));
  }
} else fail("PostgreSQL", "sin DATABASE_URL en .env");

// 5. CJdropshipping
if (env.CJ_EMAIL && env.CJ_API_KEY) {
  if (existsSync("data/cj-token.json")) {
    const t = JSON.parse(readFileSync("data/cj-token.json", "utf8"));
    t.expiresAt > Date.now()
      ? ok("CJdropshipping", "credenciales + token válido")
      : warn("CJdropshipping", "token caducado — se renueva solo en el próximo uso");
  } else ok("CJdropshipping", "credenciales configuradas");
} else fail("CJdropshipping", "sin CJ_EMAIL/CJ_API_KEY");

// 6. Email transaccional
env.RESEND_API_KEY
  ? ok("Emails (Resend)", "configurado")
  : warn("Emails (Resend)", "SIN configurar — los clientes no reciben confirmación (crear cuenta en resend.com)");

console.log("\n══════ GO-LIVE CHECK · Tulsi.store ══════\n");
for (const c of checks) {
  const icon = c.pass === true ? "✅" : c.pass === "warn" ? "🟡" : "🔴";
  console.log(`${icon} ${c.name}${c.detail ? " — " + c.detail : ""}`);
}
const blockers = checks.filter((c) => c.pass === false).length;
const warns = checks.filter((c) => c.pass === "warn").length;
console.log(`\n${blockers === 0 ? (warns === 0 ? "🚀 LISTO PARA VENDER" : `🟡 Operativa con ${warns} pendiente(s) — ver docs/GO-LIVE-PAYMENTS.md`) : `🔴 ${blockers} bloqueo(s) — ver arriba`}\n`);

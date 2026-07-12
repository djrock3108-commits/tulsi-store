# GO-LIVE de pagos — Runbook para el día del KVK

_Para el propietario (DJ-ROCK) y para cualquier sesión de Claude que retome el proyecto._
_Estado al escribir esto (2026-07-12): pagos 100% construidos y probados en MODO TEST.
Pipeline verificado de punta a punta: pago → pedido en DB → orden automática a CJ._

**Diagnóstico rápido en cualquier momento:**
```bash
node scripts/go-live-check.mjs
```

---

## Requisitos previos (los hace el propietario, una sola vez)

1. **KVK obtenido** (kvk.nl, eenmanszaak, ~€82)
2. **Activar la cuenta Stripe**: dashboard.stripe.com → "Activate account" → rellenar con el
   nº KVK, IBAN y datos personales. Stripe aprueba normalmente en minutos-horas.
3. En Stripe → **Settings → Payment methods**: activar iDEAL, Bancontact, PayPal,
   Apple Pay y Google Pay (un clic cada uno; iDEAL/Bancontact son inmediatos con cuenta NL).

## Pasos técnicos (los ejecuta Claude — ~15 minutos)

### Paso 1 — Obtener claves LIVE
El propietario copia de Stripe (Developers → API keys, **sin** el toggle de test):
- `pk_live_...` (publishable)
- `sk_live_...` (secret)

### Paso 2 — Crear el webhook LIVE
```bash
cd C:/Users/alain/Desktop/tulsi-store
node scripts/setup-stripe-webhook.mjs sk_live_XXXX
```
Imprime el `whsec_...` del paso 3. (El webhook de test existente no estorba; puede borrarse
después desde el dashboard.)

### Paso 3 — Actualizar variables en Vercel
```bash
npx vercel env rm STRIPE_SECRET_KEY production --yes
printf "sk_live_XXXX" | npx vercel env add STRIPE_SECRET_KEY production
npx vercel env rm NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production --yes
printf "pk_live_XXXX" | npx vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
npx vercel env rm STRIPE_WEBHOOK_SECRET production --yes
printf "whsec_XXXX" | npx vercel env add STRIPE_WEBHOOK_SECRET production
```
Actualizar también `.env` local con los mismos valores (para go-live-check y scripts).

### Paso 4 — Redesplegar
```bash
npx vercel deploy --prod --yes
```

### Paso 5 — Verificación con dinero real (mínima)
1. `node scripts/go-live-check.mjs` → debe salir todo ✅ (Resend puede seguir 🟡)
2. **Compra real de humo**: el propietario compra el producto más barato en tulsi.store
   con su propia tarjeta → verificar en `/admin/orders` que el pedido aparece con
   `FORWARDED_TO_SUPPLIER` y `externalOrderId` de CJ
3. **Decisión sobre esa orden CJ**: pagarla en el panel de CJ (queda como primer pedido real
   de prueba, llega a casa del propietario) **o** cancelarla vía panel CJ y reembolsar al
   cliente (él mismo) desde Stripe
4. Vigilar `/admin/logs` las primeras 48h

### Paso 6 — Operación diaria con ventas reales
- **Pagar las órdenes CJ**: cada venta crea una orden IMPAGADA en CJ. Hasta automatizar el
  pago (CJ balance/API), entrar a diario en el panel CJ → Orders → pagar las pendientes
  (idealmente con saldo cargado o PayPal vinculado). CJ no envía nada sin este paso.
- El tracking y el email al cliente salen solos una vez CJ envía (cron diario).

---

## Pendientes relacionados (no bloquean el go-live, pero conviene)

| Qué | Cómo |
|---|---|
| **Emails de pedido (Resend)** | Propietario crea cuenta en resend.com → API key → `printf "re_XXX" \| npx vercel env add RESEND_API_KEY production` + verificar dominio tulsi.store en Resend (2 registros DNS en Vimexx, mismo procedimiento que ya hizo) → redeploy |
| **Facturas con IVA** | Con KVK: activar Stripe Tax o facturación manual; consultar gestor para la BTW (KOR si <€20k/año) |
| **Textos legales** | Añadir razón social + nº KVK a /legal/terms y /legal/privacy (editar `src/lib/legal-content.ts`, 6 idiomas) |
| **Claves de test** | Tras el go-live, revocar las claves test viejas en el dashboard de Stripe (fueron pegadas en chats) |

## Contexto para Claude (léeme si retomas el proyecto en frío)

- Deploy SIEMPRE con `npx vercel deploy --prod --yes` desde esta carpeta (la integración
  Git de Vercel no dispara builds — proyecto `tulsi-store-lpnb`, CLI ya autenticada).
- El pipeline de pedidos vive en `src/app/api/webhooks/stripe/route.ts` →
  `src/lib/suppliers/router.ts` → `src/lib/suppliers/cjdropshipping.ts`. Es idempotente
  por `stripeSessionId`; un leg fallido queda `FAILED` en la tabla `SupplierOrder` con el error.
- `scripts/test-order-e2e.mjs` simula un pago firmado (solo tiene sentido en modo test).
- Estado e historial completos: `PROJECT_STATUS.md` y `PRODUCT_SELECTION_REPORT.md`.
- Credenciales admin del panel: `ADMIN_CREDENTIALS.local.txt` (solo local, gitignored).

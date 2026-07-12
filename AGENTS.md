<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Tulsi.store — Guía operativa para agentes

E-commerce premium B2C en producción: **https://tulsi.store** (6 idiomas, 6 productos
verificados de CJdropshipping, pagos Stripe en modo test, pipeline de pedidos automático).

## Lo primero que debes leer

1. `PROJECT_STATUS.md` — estado, fases y decisiones del propietario (¡respetarlas!)
2. `docs/GO-LIVE-PAYMENTS.md` — runbook para activar pagos reales cuando exista KVK
3. `PRODUCT_SELECTION_REPORT.md` — cómo se eligió y verificó el catálogo

## Reglas del propietario (vigentes)

- **Catálogo CONGELADO en 6 productos** — no añadir ni quitar sin su aprobación explícita
- El scout diario (`/api/cron/scout-products`) SOLO informa; importar exige aprobación
- No inventar: reseñas, specs, urgencia, descuentos. Verificar fichas antes de afirmar
- Robot aspirador pospuesto; lámpara smart eliminada (sin candidato válido en CJ)
- Prioridad actual: conversión/UX/ventas, no ampliar catálogo
- El propietario no es técnico: darle instrucciones de un clic, hacer todo lo automatizable

## Operaciones clave

| Acción | Comando |
|---|---|
| Deploy a producción | `npx vercel deploy --prod --yes` (⚠️ la integración Git de Vercel NO dispara builds) |
| Diagnóstico general | `node scripts/go-live-check.mjs` |
| Dev local | `npm run dev` (puerto 3000; `.env` local ya configurado) |
| Migraciones DB | `npx prisma migrate dev --name X` (Neon, Frankfurt) |
| Test E2E de pedido (solo test-mode) | `node scripts/test-order-e2e.mjs` |
| Sourcing/verificación CJ | `scripts/cj-sourcing.mjs`, `scripts/cj-verify.mjs` |

Node no está en el PATH de las shells: usar `export PATH="/c/Program Files/nodejs:$PATH"`.

## Arquitectura en 30 segundos

Next.js 16 + Prisma 7 (PostgreSQL Neon) + next-intl (6 locales) + Stripe Checkout.
Pago → webhook firmado (`api/webhooks/stripe`) → Order en DB → fan-out a CJ
(`lib/suppliers/router.ts`; `supplierProductId` = **VID de variante** CJ) → email (Resend,
pendiente de configurar). Crons diarios: sync stock/costes, tracking, scout. Admin en
`/admin` (Basic auth; credenciales en `ADMIN_CREDENTIALS.local.txt`). Textos legales en
`src/lib/legal-content.ts`; contenido editorial home en `src/lib/home-content.ts`.

## Notas duras aprendidas (no re-tropezar)

- CJ: `product/stock/queryByPid` NO existe → usar `queryByVid`. `createOrderV2` exige
  `shippingCountry` (nombre) además del código ISO. Auth: 1 vez/300s (token cacheado en
  `data/cj-token.json`). Búsqueda `productNameEn` es difusa → filtrar SIEMPRE por regex.
- Prisma 7: URL del datasource en `prisma.config.ts`, no en el schema.
- Vercel Hobby: crons solo diarios; `maxDuration` límite 60s (fluid).
- El precio se resuelve SIEMPRE server-side (`api/checkout`); nunca confiar en el cliente.
- Garantía: 2 años legales UE de cara al cliente (innegociable); la política del proveedor
  (~30 días disputa CJ) es solo interna. El cliente jamás trata con CJ.

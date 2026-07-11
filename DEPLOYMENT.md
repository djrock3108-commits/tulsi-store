# Despliegue de Tulsi.store

## Por qué no se usa el hosting de Vimexx para el código

El hosting compartido de Vimexx ejecuta **PHP + MySQL**; no puede ejecutar Next.js/Node.js.
Vimexx queda como **registrador del dominio y gestor de DNS** (y opcionalmente email).
El código se despliega en **Vercel** (creadores de Next.js, CDN global, cron jobs incluidos).

## Paso 1 — Vercel

1. Sube este repo a GitHub y en [vercel.com](https://vercel.com) → *Import Project*.
2. En *Environment Variables*, copia todas las de `.env.example` con valores reales.
3. Deploy. Los cron jobs de `vercel.json` se activan solos.
4. En *Settings → Domains* añade `tulsi.store` y `www.tulsi.store`. Vercel te confirmará los registros del paso 2.

## Paso 2 — DNS en Vimexx

Panel Vimexx → Mijn domeinen → tulsi.store → DNS beheren. Sustituye los registros web por:

| Tipo | Nombre | Valor |
|---|---|---|
| A | @ | `76.76.21.21` (Vercel) |
| CNAME | www | `cname.vercel-dns.com` |

Deja intactos los registros **MX** si usas el email de Vimexx. SSL lo emite Vercel
automáticamente (Let's Encrypt) al validar el dominio — no hay que configurar nada en Vimexx.

## Paso 3 — Base de datos

Postgres gestionado (Neon, Supabase o Vercel Postgres). Con `DATABASE_URL` puesta:

```bash
npx prisma migrate dev --name init   # primera vez, en local contra la DB
npm run db:seed                      # 7 categorías + 8 productos en 6 idiomas
```

## Paso 4 — Stripe

1. Activa en el dashboard: iDEAL, Bancontact, PayPal, Apple Pay, Google Pay (Payment Methods).
2. Webhook: endpoint `https://tulsi.store/api/webhooks/stripe`, evento `checkout.session.completed`.
3. Copia `STRIPE_SECRET_KEY` y `STRIPE_WEBHOOK_SECRET` a Vercel.

## Paso 5 — Proveedores

- **BigBuy**: panel → API → generar clave → `BIGBUY_API_KEY` (empieza con `BIGBUY_ENV=sandbox`).
- **CJ**: developers.cjdropshipping.com → API key → `CJ_EMAIL` + `CJ_API_KEY`.
- Sustituye los `*-PENDING-MAP` de `supplierProductId` por las referencias/PIDs reales de cada
  producto (admin de cada proveedor) — editable vía Prisma Studio: `npx prisma studio`.

## Paso 6 — Email

Resend → verificar dominio `tulsi.store` (añade los registros DKIM/SPF que te dé Resend
al DNS de Vimexx) → `RESEND_API_KEY`.

## Verificación final

- [ ] `https://tulsi.store/es` carga con SSL
- [ ] Compra de prueba con tarjeta test `4242 4242 4242 4242` → pedido aparece en `/admin/orders`
- [ ] Email de confirmación recibido
- [ ] `/api/cron/sync-suppliers` con `Authorization: Bearer $CRON_SECRET` responde `{synced, skipped}`

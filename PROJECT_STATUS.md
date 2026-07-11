# PROJECT_STATUS — Tulsi.store

_Última actualización: 2026-07-11_

## Estado global

**Fase 1 (fundación completa) — TERMINADA y verificada.** `npm run build` compila sin errores;
la tienda, el pipeline de pedidos, el panel admin, el SEO y la seguridad están implementados.
Lo único que falta para operar en producción son **credenciales externas** (sección "Bloqueado por el propietario").

## Stack elegido (y por qué)

| Capa | Elección | Motivo |
|---|---|---|
| Framework | **Next.js 16** (App Router, React 19) | Más moderno que lo previsto (se pidió "Next.js"); SSG por idioma + rutas dinámicas |
| Lenguaje | TypeScript estricto | Type safety de extremo a extremo |
| Estilos | TailwindCSS 4 | Design system por tokens CSS (`globals.css`) |
| Base de datos | PostgreSQL + **Prisma 7** (adapter pg) | Escalable a millones de filas; migraciones versionadas |
| i18n | **next-intl 4** | 6 idiomas (EN/ES/NL/DE/FR/IT) con SSG y hreflang |
| Pagos | Stripe Checkout | Un solo integrador cubre tarjetas, Apple Pay, Google Pay, iDEAL, Bancontact y PayPal |
| Email | Resend (vía HTTP, sin SDK) | Confirmación y tracking automáticos |
| Hosting objetivo | **Vercel** + dominio en Vimexx vía DNS | El hosting compartido de Vimexx es PHP/MySQL y **no puede ejecutar Node/Next.js** (ver DEPLOYMENT.md) |

## Arquitectura

```
Cliente → Storefront (SSG, 6 idiomas)
        → /api/checkout  (precios resueltos SOLO en servidor, Zod + rate limit)
        → Stripe Checkout
        → /api/webhooks/stripe  (firma verificada, idempotente)
             → Order en PostgreSQL
             → fan-out por proveedor (src/lib/suppliers/router.ts)
                  → BigBuy   (src/lib/suppliers/bigbuy.ts)
                  → CJ       (src/lib/suppliers/cjdropshipping.ts)
             → email de confirmación
        → /api/cron/sync-tracking  → tracking + email de envío automáticos
        → /api/cron/sync-suppliers → stock/coste/imágenes cada hora
```

- **Patrón adaptador de proveedores** (`SupplierAdapter`): añadir un proveedor = 1 archivo nuevo.
- **Fallback sin DB**: sin `DATABASE_URL`, el catálogo se sirve desde `src/lib/catalog/seed-data.ts`
  (misma fuente que el seed de Prisma) — desarrollo local funciona sin Postgres.
- **Un pedido pagado nunca se pierde**: si un proveedor falla, el "leg" queda `FAILED` con el error
  registrado, visible en el admin para reintento.
- **Private Label CJ**: preparado — el cambio queda aislado en el adaptador CJ (`podProperties`).

## Implementado y verificado

- [x] Storefront premium (home, catálogo con filtro por categoría, ficha de producto, carrito, éxito de pedido)
- [x] 6 idiomas completos con selector; 48 fichas de producto prerenderizadas
- [x] 7 categorías y 8 productos iniciales exactos según especificación
- [x] Esquema PostgreSQL completo + seed idempotente (`npm run db:seed`)
- [x] Checkout Stripe con validación Zod, precios server-side y control de stock
- [x] Webhook Stripe con verificación de firma e idempotencia
- [x] Automatización completa pedido→proveedor→tracking→email
- [x] Panel admin (`/admin`): KPIs (ventas, beneficio, clientes), pedidos con estado de fulfilment, productos/inventario, logs, estado de APIs
- [x] SEO: sitemap.xml (102 URLs), robots.txt, Open Graph, Twitter Cards, Schema.org Product JSON-LD, canonical + hreflang
- [x] Seguridad: CSP, HSTS, X-Frame-Options DENY, rate limiting, Basic auth en /admin (comparación en tiempo constante), validación de toda entrada, secreto en /api/cron/*
- [x] Rendimiento: SSG mayoritario, lazy loading de imágenes, AVIF/WebP configurado, CSS atómico
- [x] Cron jobs declarados en `vercel.json` (stock cada hora, tracking cada 2h)

## Bloqueado por el propietario (no automatizable sin credenciales)

| Tarea | Qué necesito |
|---|---|
| Conectar dominio tulsi.store | Acceso a Vimexx **o** que apliques los registros DNS de DEPLOYMENT.md |
| Activar pagos | Claves Stripe (`STRIPE_SECRET_KEY`, webhook secret) + activar iDEAL/Bancontact/PayPal en el dashboard de Stripe |
| Sincronizar BigBuy | `BIGBUY_API_KEY` + mapear `supplierProductId` reales (hoy: `BB-PENDING-MAP`) |
| Sincronizar CJ | `CJ_EMAIL` + `CJ_API_KEY` + mapear PIDs reales (hoy: `CJ-PENDING-MAP`) |
| Base de datos producción | Provisionar Postgres gestionado y poner `DATABASE_URL`; luego `npm run db:migrate && npm run db:seed` |
| Emails | `RESEND_API_KEY` + verificar dominio tulsi.store en Resend |

## Siguientes fases

1. **Fase 2 — Puesta en producción**: deploy a Vercel, DNS, claves, migración, primera compra de prueba en modo test de Stripe.
2. **Fase 3 — Operación**: reintento de legs fallidos desde el admin (botón), imágenes reales de proveedor, textos legales (RGPD, devoluciones, cookies) en 6 idiomas.
3. **Fase 4 — Escala**: Auth.js multi-usuario en admin, rate limiting en Redis (Upstash), multi-moneda (tabla de tipos BCE), reviews, búsqueda.

## Decisiones técnicas registradas

- **Prisma 7**: la URL del datasource vive en `prisma.config.ts` (nuevo requisito de Prisma 7); el cliente se genera en `src/generated/prisma` (gitignored, se regenera en `npm run build`).
- **Dos root layouts** vía route groups: `(store)/[locale]` (público, i18n) y `(admin)/admin` (inglés, sin indexar).
- **Precios en céntimos EUR** (enteros): sin errores de coma flotante; multi-moneda = capa de presentación (`src/lib/money.ts`).
- **Basic auth en admin es de arranque**, documentado para sustituir por Auth.js antes de tener más de un operador.
- **Imágenes placeholder SVG** hasta que el sync de proveedores traiga las reales (CDNs ya permitidos en `next.config.ts`).

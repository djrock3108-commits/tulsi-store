# Tulsi.store

Marca europea premium de e-commerce. Next.js 16 · TypeScript · TailwindCSS 4 · PostgreSQL · Prisma 7 · next-intl (6 idiomas) · Stripe · BigBuy + CJdropshipping.

- **Estado del proyecto y decisiones**: [PROJECT_STATUS.md](./PROJECT_STATUS.md)
- **Guía de despliegue (Vercel + DNS Vimexx)**: [DEPLOYMENT.md](./DEPLOYMENT.md)

## Desarrollo local

```bash
npm install
cp .env.example .env   # rellena lo que tengas; sin DATABASE_URL se sirve el catálogo semilla
npm run dev            # http://localhost:3000 → redirige a /en
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | `prisma generate` + build de producción |
| `npm run db:migrate` | Aplica migraciones (producción) |
| `npm run db:seed` | Siembra categorías y productos (idempotente) |
| `npx prisma studio` | UI para editar datos |

## Mapa del código

```
src/
  app/(store)/[locale]/   Tienda pública (EN/ES/NL/DE/FR/IT)
  app/(admin)/admin/      Panel: dashboard, pedidos, productos, logs
  app/api/checkout        Crea sesión Stripe (precios server-side)
  app/api/webhooks/stripe Pago → pedido → proveedores → email
  app/api/cron/*          Sync de stock y tracking (protegidos por CRON_SECRET)
  lib/suppliers/          Adaptadores BigBuy y CJ tras una interfaz común
  lib/catalog.ts          Acceso a catálogo (Postgres con fallback semilla)
  proxy.ts                Cabeceras de seguridad + i18n + auth admin
prisma/                   Esquema y seed
messages/                 Traducciones
```

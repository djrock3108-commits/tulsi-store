<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Tulsi — Guía operativa para agentes

**PIVOTE 2026-07-12**: Tulsi ya NO es una tienda. Es una **plataforma profesional de
Astrología Védica** en producción: **https://tulsi.store** (6 idiomas). Servicio único:
Horóscopo Védico Personalizado, elaborado A MANO por eruditos humanos (Bhrigu Project).
El e-commerce anterior vive completo en la rama git **`shop-backup`**.

## Lo primero que debes leer

1. `docs/JYOTISH_KNOWLEDGE.md` — base erudita: estructura del informe, yogas, dashas, tono
2. `PROJECT_STATUS.md` — historial y decisiones del propietario

## Reglas del propietario (vigentes)

- **Postura NEUTRAL sobre el método** (decisión del propietario, 2026-07-18): la web NO
  afirma ni "hecho a mano / por humanos / eruditos" ni "con IA" — habla solo de tradición
  auténtica y preparación individual. No reintroducir claims de método en ningún idioma.
- **Sin pasarela de pago en la web** por diseño: el admin envía enlaces PayPal manualmente
  desde `/admin/requests`. No integrar checkout automático sin orden expresa.
- Nada inventado (testimonios, credenciales, urgencia). Tono digno, no "esotérico barato".
- El propietario no es técnico: instrucciones de un clic, hacer todo lo automatizable.

## Flujo del negocio

Cliente rellena formulario (`/order`) → fila en `HoroscopeRequest` (PENDING) + email al
admin (djrock.3108@gmail.com) + confirmación al cliente → admin envía enlace PayPal por
email y marca PAYMENT_SENT → cliente paga → PAID → eruditos preparan el PDF → COMPLETED
(entrega manual por email, <24h tras pago). Estados y notas en `/admin/requests`; CSV en
`/api/admin/requests/export`.

## Operaciones clave

| Acción | Comando |
|---|---|
| Deploy a producción | `npx vercel deploy --prod --yes` (⚠️ la integración Git de Vercel NO dispara builds) |
| Dev local | `npm run dev` (`.env` local configurado; Node no está en PATH: `export PATH="/c/Program Files/nodejs:$PATH"`) |
| Migraciones DB | `npx prisma migrate dev --name X` (Neon Frankfurt) |

## Arquitectura en 30 segundos

Next.js 16 + Prisma 7 (Neon) + next-intl (EN/ES/NL/DE/FR/IT) + Tailwind 4.
Contenido de la web en `src/lib/astro-content.ts` (+ `-locales.ts`); legales en
`src/lib/legal-content.ts`. Formulario: `components/HoroscopeForm.tsx` →
`api/horoscope-request`. Admin `/admin` (Basic auth; credenciales en
`ADMIN_CREDENTIALS.local.txt`; server actions para estados). Design tokens en
`globals.css` (crema/verde Tulsi/dorado; serif Fraunces). Emails vía Resend
(`lib/email.ts`) — **RESEND_API_KEY aún sin configurar**: los emails se saltan y quedan
en `/admin/logs`; configurarlo es la mejora nº1 pendiente.

## Notas duras aprendidas

- Prisma 7: URL del datasource en `prisma.config.ts`, no en el schema.
- Tras borrar rutas, `rm -rf .next` antes de compilar (tipos generados obsoletos).
- El modo mantenimiento vive en `src/proxy.ts` (`MAINTENANCE_MODE`, build-time).
- Stripe/CJ: credenciales aún en Vercel env pero SIN uso tras el pivote (los modelos de
  e-commerce siguen en el schema y sus tablas conservan los datos de prueba).

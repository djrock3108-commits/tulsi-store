import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { log } from "@/lib/log";
import { LOCALES } from "@/i18n/routing";

const ADMIN_EMAIL = "djrock.3108@gmail.com";

const schema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(200),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/).nullable().optional(),
  timeUnknown: z.boolean().default(false),
  city: z.string().min(1).max(120),
  country: z.string().min(2).max(90),
  comments: z.string().max(2000).optional().default(""),
  locale: z.enum(LOCALES),
  consent: z.literal(true),
});

/**
 * Paso 4 del flujo: almacena la solicitud (NO genera nada, NO cobra nada),
 * notifica al administrador y confirma la recepción al cliente. El enlace
 * PayPal lo envía el administrador manualmente desde el panel.
 */
export async function POST(req: Request) {
  if (!rateLimit(`horoscope:${clientKey(req)}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const d = parsed.data;

  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ error: "Unavailable" }, { status: 503 });

  const request = await prisma.horoscopeRequest.create({
    data: {
      fullName: d.fullName,
      email: d.email.toLowerCase(),
      birthDate: d.birthDate,
      birthTime: d.timeUnknown ? null : (d.birthTime ?? null),
      timeUnknown: d.timeUnknown,
      city: d.city,
      country: d.country,
      comments: d.comments || null,
      locale: d.locale,
    },
  });

  await log("system", "info", `Nueva solicitud de horóscopo ${request.id} (${d.fullName}, ${d.country})`);

  // Notificación al administrador (con todos los datos para preparar la carta)
  await sendEmail(
    ADMIN_EMAIL,
    `🕉 Nueva solicitud de horóscopo — ${d.fullName}`,
    `<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:24px">
      <h2>Nueva solicitud de Horóscopo Védico</h2>
      <table cellpadding="6" style="font-size:14px">
        <tr><td><b>Nombre</b></td><td>${d.fullName}</td></tr>
        <tr><td><b>Email</b></td><td>${d.email}</td></tr>
        <tr><td><b>Nacimiento</b></td><td>${d.birthDate} · ${d.timeUnknown ? "HORA DESCONOCIDA" : d.birthTime}</td></tr>
        <tr><td><b>Lugar</b></td><td>${d.city}, ${d.country}</td></tr>
        <tr><td><b>Idioma</b></td><td>${d.locale}</td></tr>
        <tr><td><b>Comentarios</b></td><td>${d.comments || "—"}</td></tr>
      </table>
      <p>Siguiente paso: enviar el enlace PayPal desde <a href="https://tulsi.store/admin/requests">el panel</a>.</p>
    </div>`,
  );

  // Confirmación al cliente (en su idioma; texto alineado con la página de gracias)
  const CONFIRM: Record<string, { subject: string; body: string }> = {
    en: { subject: "Your Vedic Horoscope request has been received — Tulsi", body: "Thank you. Your information has been received. Within a few hours you will receive a secure PayPal payment link. Once payment is confirmed, our Vedic Astrology scholars will begin preparing your personalized horoscope. Delivery: within 24 hours after payment." },
    es: { subject: "Hemos recibido tu solicitud de Horóscopo Védico — Tulsi", body: "Gracias. Hemos recibido tu información. En pocas horas recibirás un enlace seguro de pago de PayPal. Una vez confirmado el pago, nuestros eruditos de Astrología Védica comenzarán tu horóscopo personalizado. Entrega: en menos de 24 horas tras el pago." },
    nl: { subject: "Je aanvraag voor een Vedische horoscoop is ontvangen — Tulsi", body: "Dank je. Je gegevens zijn ontvangen. Binnen enkele uren ontvang je een veilige PayPal-betaallink. Na betalingsbevestiging beginnen onze geleerden aan je persoonlijke horoscoop. Levering: binnen 24 uur na betaling." },
    de: { subject: "Deine Anfrage für ein vedisches Horoskop ist eingegangen — Tulsi", body: "Danke. Deine Angaben sind eingegangen. Innerhalb weniger Stunden erhältst du einen sicheren PayPal-Zahlungslink. Nach Zahlungsbestätigung beginnen unsere Gelehrten mit deinem persönlichen Horoskop. Lieferung: innerhalb von 24 Stunden nach Zahlung." },
    fr: { subject: "Votre demande d'horoscope védique a bien été reçue — Tulsi", body: "Merci. Vos informations ont bien été reçues. Sous quelques heures, vous recevrez un lien de paiement PayPal sécurisé. Une fois le paiement confirmé, nos érudits commenceront votre horoscope personnalisé. Livraison : sous 24 heures après paiement." },
    it: { subject: "La tua richiesta di oroscopo vedico è stata ricevuta — Tulsi", body: "Grazie. Le tue informazioni sono state ricevute. Entro poche ore riceverai un link di pagamento PayPal sicuro. Confermato il pagamento, i nostri eruditi inizieranno il tuo oroscopo personalizzato. Consegna: entro 24 ore dal pagamento." },
  };
  const c = CONFIRM[d.locale] ?? CONFIRM.en;
  await sendEmail(
    d.email,
    c.subject,
    `<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1b1a16">
      <h1 style="font-size:20px;letter-spacing:0.2em">TULSI</h1>
      <p style="font-size:15px;line-height:1.6">${c.body}</p>
      <hr style="border:none;border-top:1px solid #e7dfce;margin:24px 0" />
      <p style="font-size:12px;color:#6e6857">Tulsi — Authentic Vedic Astrology · tulsi.store</p>
    </div>`,
  );

  return NextResponse.json({ ok: true, id: request.id });
}

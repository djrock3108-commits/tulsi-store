import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { notifyAdmin } from "@/lib/email";
import { LOCALES } from "@/i18n/routing";

const ADMIN_EMAIL = "djrock.3108@gmail.com";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  message: z.string().min(5).max(3000),
  locale: z.enum(LOCALES),
});

/** Formulario de contacto: guarda el mensaje y lo releva al Gmail del admin. */
export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientKey(req)}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const d = parsed.data;

  const prisma = getPrisma();
  if (prisma) {
    await prisma.contactMessage.create({
      data: { name: d.name, email: d.email.toLowerCase(), message: d.message, locale: d.locale },
    });
  }

  await notifyAdmin(ADMIN_EMAIL, `✉️ Mensaje de contacto — ${d.name}`, {
    Nombre: d.name,
    Email: d.email,
    Idioma: d.locale,
    Mensaje: d.message,
  });

  return NextResponse.json({ ok: true });
}

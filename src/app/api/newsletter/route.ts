import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { LOCALES } from "@/i18n/routing";

const schema = z.object({
  email: z.string().email().max(200),
  locale: z.enum(LOCALES),
  consent: z.literal(true), // RGPD: sin consentimiento explícito no hay alta
});

export async function POST(req: Request) {
  if (!rateLimit(`newsletter:${clientKey(req)}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ error: "Unavailable" }, { status: 503 });

  await prisma.subscriber.upsert({
    where: { email: parsed.data.email.toLowerCase() },
    update: { consent: true, locale: parsed.data.locale },
    create: { email: parsed.data.email.toLowerCase(), locale: parsed.data.locale },
  });
  return NextResponse.json({ ok: true });
}

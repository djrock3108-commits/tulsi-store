import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/** Exportación CSV de solicitudes (protegida por Basic auth vía proxy /api/admin). */
export async function GET() {
  const prisma = getPrisma();
  if (!prisma) return new Response("No database", { status: 503 });

  const rows = await prisma.horoscopeRequest.findMany({ orderBy: { createdAt: "desc" } });
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const header = [
    "id", "fullName", "email", "birthDate", "birthTime", "timeUnknown", "city", "country",
    "locale", "status", "comments", "adminNotes", "createdAt", "paymentSentAt", "paidAt", "deliveredAt",
  ];
  const lines = rows.map((r) =>
    [
      r.id, r.fullName, r.email, r.birthDate, r.birthTime ?? "", r.timeUnknown, r.city, r.country,
      r.locale, r.status, r.comments ?? "", r.adminNotes ?? "",
      r.createdAt.toISOString(), r.paymentSentAt?.toISOString() ?? "", r.paidAt?.toISOString() ?? "", r.deliveredAt?.toISOString() ?? "",
    ].map(esc).join(","),
  );
  const csv = [header.join(","), ...lines].join("\r\n");

  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="tulsi-horoscope-requests-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

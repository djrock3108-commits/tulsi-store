import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";
import { log } from "@/lib/log";

export const dynamic = "force-dynamic";

const STATUSES = ["PENDING", "PAYMENT_SENT", "PAID", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;
type Status = (typeof STATUSES)[number];

const STATUS_STYLE: Record<Status, string> = {
  PENDING: "bg-amber-100 text-amber-900",
  PAYMENT_SENT: "bg-blue-100 text-blue-900",
  PAID: "bg-emerald-100 text-emerald-900",
  IN_PROGRESS: "bg-purple-100 text-purple-900",
  COMPLETED: "bg-surface-2 text-muted",
  CANCELLED: "bg-red-100 text-red-900",
};

async function setStatus(formData: FormData) {
  "use server";
  const prisma = getPrisma();
  if (!prisma) return;
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as Status;
  if (!STATUSES.includes(status)) return;
  await prisma.horoscopeRequest.update({
    where: { id },
    data: {
      status,
      ...(status === "PAYMENT_SENT" ? { paymentSentAt: new Date() } : {}),
      ...(status === "PAID" ? { paidAt: new Date() } : {}),
      ...(status === "COMPLETED" ? { deliveredAt: new Date() } : {}),
    },
  });
  await log("system", "info", `Solicitud ${id} → ${status}`);
  revalidatePath("/admin/requests");
}

async function saveNotes(formData: FormData) {
  "use server";
  const prisma = getPrisma();
  if (!prisma) return;
  await prisma.horoscopeRequest.update({
    where: { id: String(formData.get("id")) },
    data: { adminNotes: String(formData.get("notes")).slice(0, 4000) || null },
  });
  revalidatePath("/admin/requests");
}

export default async function AdminRequests({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;
  const prisma = getPrisma();
  if (!prisma) return <p className="text-sm text-muted">No database connected.</p>;

  const requests = await prisma.horoscopeRequest.findMany({
    where: {
      ...(status && STATUSES.includes(status as Status) ? { status: status as Status } : {}),
      ...(q
        ? { OR: [{ fullName: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }] }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-xl font-semibold tracking-tight">Horoscope Requests</h1>
        <a href="/api/admin/requests/export" className="rounded-full border border-line px-5 py-2 text-xs text-muted hover:border-accent hover:text-accent">
          Export CSV
        </a>
      </div>

      {/* Búsqueda y filtros */}
      <form className="mt-6 flex flex-wrap items-center gap-2" action="/admin/requests" method="get">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search name or email…"
          className="rounded-full border border-line bg-surface px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <button className="rounded-full bg-accent px-5 py-2 text-sm text-accent-foreground">Search</button>
        <div className="ml-2 flex flex-wrap gap-1">
          <a href="/admin/requests" className={`rounded-full border px-3 py-1.5 text-xs ${!status ? "border-accent text-accent" : "border-line text-muted"}`}>All</a>
          {STATUSES.map((s) => (
            <a key={s} href={`/admin/requests?status=${s}`} className={`rounded-full border px-3 py-1.5 text-xs ${status === s ? "border-accent text-accent" : "border-line text-muted"}`}>
              {s}
            </a>
          ))}
        </div>
      </form>

      {requests.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No requests match.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {requests.map((r) => (
            <li key={r.id} className="rounded-2xl border border-line bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">
                    {r.fullName} <span className="font-normal text-muted">· {r.email} · {r.locale.toUpperCase()}</span>
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    🗓 {r.birthDate} · ⏰ {r.timeUnknown ? <b className="text-error">time unknown</b> : r.birthTime} · 📍 {r.city}, {r.country}
                  </p>
                  {r.comments && <p className="mt-2 max-w-xl text-xs italic text-muted">“{r.comments}”</p>}
                  <p className="mt-2 text-[11px] text-muted">
                    Requested {r.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                    {r.paymentSentAt && ` · PayPal sent ${r.paymentSentAt.toISOString().slice(0, 10)}`}
                    {r.paidAt && ` · Paid ${r.paidAt.toISOString().slice(0, 10)}`}
                    {r.deliveredAt && ` · Delivered ${r.deliveredAt.toISOString().slice(0, 10)}`}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLE[r.status as Status]}`}>{r.status}</span>
              </div>

              {/* Acciones de estado */}
              <div className="mt-4 flex flex-wrap gap-2">
                {(
                  [
                    ["PAYMENT_SENT", "Send PayPal Link ✉"],
                    ["PAID", "Mark as Paid"],
                    ["IN_PROGRESS", "In Progress"],
                    ["COMPLETED", "Completed ✓"],
                    ["CANCELLED", "Cancel"],
                  ] as const
                ).map(([s, label]) => (
                  <form key={s} action={setStatus}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="status" value={s} />
                    <button
                      disabled={r.status === s}
                      className="rounded-full border border-line px-4 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
                    >
                      {label}
                    </button>
                  </form>
                ))}
              </div>

              {/* Notas */}
              <form action={saveNotes} className="mt-3 flex gap-2">
                <input type="hidden" name="id" value={r.id} />
                <input
                  name="notes"
                  defaultValue={r.adminNotes ?? ""}
                  placeholder="Admin notes (PayPal link sent, price agreed, astrologer assigned…)"
                  className="min-w-0 flex-1 rounded-full border border-line bg-background px-4 py-2 text-xs outline-none focus:border-accent"
                />
                <button className="rounded-full border border-line px-4 py-1.5 text-xs text-muted hover:border-accent hover:text-accent">
                  Save
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

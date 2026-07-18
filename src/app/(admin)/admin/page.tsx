import Link from "next/link";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const STATUSES = ["PENDING", "PAYMENT_SENT", "PAID", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

export default async function AdminDashboard() {
  const prisma = getPrisma();
  if (!prisma) return <p className="text-sm text-muted">No database connected.</p>;

  const [byStatus, total, subscribers, recent] = await Promise.all([
    prisma.horoscopeRequest.groupBy({ by: ["status"], _count: true }),
    prisma.horoscopeRequest.count(),
    prisma.subscriber.count(),
    prisma.horoscopeRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);
  const count = (s: string) => byStatus.find((x) => x.status === s)?._count ?? 0;

  return (
    <div>
      <h1 className="font-serif text-xl font-semibold tracking-tight">Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card label="Total requests" value={total} highlight={false} />
        <Card label="⏳ Pending (send PayPal link!)" value={count("PENDING")} highlight={count("PENDING") > 0} />
        <Card label="💳 Awaiting payment" value={count("PAYMENT_SENT")} highlight={false} />
        <Card label="🕉 To prepare (paid)" value={count("PAID") + count("IN_PROGRESS")} highlight={count("PAID") > 0} />
        <Card label="✅ Completed" value={count("COMPLETED")} highlight={false} />
        <Card label="Newsletter subscribers" value={subscribers} highlight={false} />
      </div>

      <h2 className="mt-10 text-sm font-medium">Latest requests</h2>
      {recent.length === 0 ? (
        <p className="mt-3 text-sm text-muted">No requests yet. They will appear here the moment a client submits the form.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {recent.map((r) => (
            <li key={r.id} className="rounded-xl border border-line bg-surface p-4 text-sm">
              <span className="font-medium">{r.fullName}</span> · {r.email} · {r.birthDate}
              {r.timeUnknown ? " (time unknown)" : ` ${r.birthTime}`} · {r.city}, {r.country} —{" "}
              <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs">{r.status}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex gap-3">
        <Link href="/admin/requests" className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground">
          Manage requests →
        </Link>
        <a href="/api/admin/requests/export" className="rounded-full border border-line px-6 py-2.5 text-sm text-muted hover:border-accent hover:text-accent">
          Export CSV
        </a>
      </div>

      <p className="mt-10 text-xs text-muted">
        Statuses: {STATUSES.join(" → ")}. Flow: send the PayPal link by email manually, then advance the status here.
      </p>
    </div>
  );
}

function Card({ label, value, highlight }: { label: string; value: number; highlight: boolean }) {
  return (
    <div className={`rounded-2xl border p-6 ${highlight ? "border-gold bg-surface" : "border-line bg-surface"}`}>
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-2 font-serif text-2xl font-semibold">{value}</p>
    </div>
  );
}

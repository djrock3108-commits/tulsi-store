import { getPrisma } from "@/lib/prisma";
import { ADAPTERS } from "@/lib/suppliers/router";

export const dynamic = "force-dynamic";

function euro(cents: number): string {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(cents / 100);
}

async function getStats() {
  const prisma = getPrisma();
  if (!prisma) return null;
  try {
    const [orders, paidAgg, products, customers, pendingLegs] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: { notIn: ["PENDING_PAYMENT", "CANCELLED", "REFUNDED"] } },
        _sum: { totalCents: true, subtotalCents: true },
      }),
      prisma.product.count({ where: { active: true } }),
      prisma.order.groupBy({ by: ["email"] }).then((g) => g.length),
      prisma.supplierOrder.count({ where: { status: "FAILED" } }),
    ]);
    // Profit estimate: paid revenue minus supplier cost of sold items.
    const items = await prisma.orderItem.findMany({
      where: { order: { status: { notIn: ["PENDING_PAYMENT", "CANCELLED", "REFUNDED"] } } },
      include: { product: { select: { costCents: true } } },
    });
    const cost = items.reduce((s, i) => s + i.product.costCents * i.quantity, 0);
    const revenue = paidAgg._sum.totalCents ?? 0;
    return { orders, revenue, profit: revenue - cost, products, customers, pendingLegs };
  } catch {
    return null;
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const apiStatus = [
    { name: "PostgreSQL", ok: Boolean(process.env.DATABASE_URL) },
    { name: "Stripe", ok: Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET) },
    { name: "BigBuy", ok: ADAPTERS.BIGBUY.isConfigured() },
    { name: "CJdropshipping", ok: ADAPTERS.CJDROPSHIPPING.isConfigured() },
    { name: "Email (Resend)", ok: Boolean(process.env.RESEND_API_KEY) },
  ];

  const cards = stats
    ? [
        { label: "Revenue", value: euro(stats.revenue) },
        { label: "Estimated profit", value: euro(stats.profit) },
        { label: "Orders", value: String(stats.orders) },
        { label: "Customers", value: String(stats.customers) },
        { label: "Active products", value: String(stats.products) },
        { label: "Failed supplier legs", value: String(stats.pendingLegs) },
      ]
    : [];

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>

      {!stats && (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          No database connected — set <code className="font-mono">DATABASE_URL</code> and run{" "}
          <code className="font-mono">npx prisma migrate deploy && npx prisma db seed</code>. The
          storefront is currently serving the seed catalog.
        </div>
      )}

      {stats && (
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {cards.map((c) => (
            <div key={c.label} className="rounded-2xl border border-line bg-white p-6">
              <p className="text-xs uppercase tracking-widest text-muted">{c.label}</p>
              <p className="mt-2 text-2xl font-semibold">{c.value}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-10 text-sm font-medium">API status</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {apiStatus.map((api) => (
          <span
            key={api.name}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs ${
              api.ok ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-line bg-white text-muted"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${api.ok ? "bg-emerald-500" : "bg-zinc-300"}`} />
            {api.name} — {api.ok ? "configured" : "not configured"}
          </span>
        ))}
      </div>
    </div>
  );
}

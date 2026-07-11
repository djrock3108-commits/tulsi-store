import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function euro(cents: number): string {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export default async function AdminOrders() {
  const prisma = getPrisma();
  const orders = prisma
    ? await prisma.order
        .findMany({
          orderBy: { createdAt: "desc" },
          take: 100,
          include: { items: true, supplierOrders: true },
        })
        .catch(() => [])
    : [];

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Orders</h1>
      {orders.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No orders yet.</p>
      ) : (
        <table className="mt-6 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-widest text-muted">
              <th className="py-3 pr-4">Number</th>
              <th className="py-3 pr-4">Customer</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Total</th>
              <th className="py-3 pr-4">Fulfilment</th>
              <th className="py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-line/60">
                <td className="py-3 pr-4 font-mono text-xs">{o.number}</td>
                <td className="py-3 pr-4">{o.email}</td>
                <td className="py-3 pr-4">
                  <span className="rounded-full bg-line/60 px-2 py-1 text-xs">{o.status}</span>
                </td>
                <td className="py-3 pr-4">{euro(o.totalCents)}</td>
                <td className="py-3 pr-4 text-xs text-muted">
                  {o.supplierOrders.map((l) => `${l.supplier}: ${l.status}${l.trackingNumber ? ` (${l.trackingNumber})` : ""}`).join(" · ") || "—"}
                </td>
                <td className="py-3 text-xs text-muted">{o.createdAt.toISOString().slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

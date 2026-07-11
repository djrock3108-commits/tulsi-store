import { getProducts } from "@/lib/catalog";

export const dynamic = "force-dynamic";

function euro(cents: number): string {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export default async function AdminProducts() {
  const products = await getProducts("en");

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Products</h1>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-widest text-muted">
            <th className="py-3 pr-4">SKU</th>
            <th className="py-3 pr-4">Name</th>
            <th className="py-3 pr-4">Supplier</th>
            <th className="py-3 pr-4">Price</th>
            <th className="py-3 pr-4">Margin</th>
            <th className="py-3">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.slug} className="border-b border-line/60">
              <td className="py-3 pr-4 font-mono text-xs">{p.sku}</td>
              <td className="py-3 pr-4">{p.name}</td>
              <td className="py-3 pr-4 text-xs">{p.supplier}</td>
              <td className="py-3 pr-4">{euro(p.priceCents)}</td>
              <td className="py-3 pr-4 text-xs text-muted">—</td>
              <td className={`py-3 ${p.stock === 0 ? "text-red-600" : ""}`}>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs text-muted">
        Stock and cost refresh automatically via /api/cron/sync-suppliers once BigBuy / CJ keys are set.
      </p>
    </div>
  );
}

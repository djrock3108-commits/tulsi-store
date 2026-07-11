import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/money";
import type { CatalogProduct } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";

export default function ProductCard({ product, locale }: { product: CatalogProduct; locale: Locale }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]"
    >
      <div className="aspect-square overflow-hidden bg-[#f4f3f1]">
        {/* Placeholder art until the supplier image sync runs; supplier CDNs are allowed in next.config. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-muted">{product.tagline}</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-sm font-semibold">{formatPrice(product.priceCents, locale)}</span>
          {product.compareAtCents && (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.compareAtCents, locale)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

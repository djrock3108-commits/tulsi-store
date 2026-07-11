import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCategories, getProducts } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("shop") };
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ locale }, { category }] = await Promise.all([params, searchParams]);
  setRequestLocale(locale);
  const [t, categories, products] = await Promise.all([
    getTranslations("home"),
    getCategories(locale as Locale),
    getProducts(locale as Locale, category),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-xs uppercase tracking-[0.3em] text-muted">{t("featured")}</h1>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`rounded-full border px-5 py-2 text-xs transition-colors ${
            !category ? "border-foreground bg-foreground text-background" : "border-line text-muted hover:border-foreground hover:text-foreground"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/products?category=${c.slug}`}
            className={`rounded-full border px-5 py-2 text-xs transition-colors ${
              category === c.slug
                ? "border-foreground bg-foreground text-background"
                : "border-line text-muted hover:border-foreground hover:text-foreground"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} locale={locale as Locale} />
        ))}
      </div>
    </div>
  );
}

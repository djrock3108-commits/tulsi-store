import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCategories, getProducts } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tHome, products, categories] = await Promise.all([
    getTranslations("hero"),
    getTranslations("home"),
    getProducts(locale as Locale),
    getCategories(locale as Locale),
  ]);
  const featured = products.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-24 text-center md:pt-36 md:pb-28">
        <p className="animate-fade-up text-xs uppercase tracking-[0.3em] text-muted">{t("eyebrow")}</p>
        <h1 className="animate-fade-up delay-100 mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
          {t("title")}
        </h1>
        <p className="animate-fade-up delay-200 mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted">
          {t("subtitle")}
        </p>
        <div className="animate-fade-up delay-300 mt-10">
          <Link
            href="/products"
            className="inline-block rounded-full bg-foreground px-10 py-4 text-sm font-medium text-background transition-all duration-300 hover:opacity-85 active:scale-[0.98]"
          >
            {t("cta")}
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-6">
        <h2 className="text-xs uppercase tracking-[0.3em] text-muted">{tHome("featured")}</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale as Locale} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 pt-20">
        <h2 className="text-xs uppercase tracking-[0.3em] text-muted">{tHome("categories")}</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className="rounded-full border border-line px-6 py-3 text-sm text-muted transition-all duration-300 hover:border-foreground hover:text-foreground"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Brand promise */}
      <section className="mx-auto max-w-6xl px-6 pt-24">
        <div className="rounded-3xl bg-foreground px-8 py-16 text-center text-background md:py-24">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {tHome("promiseTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-sm leading-relaxed opacity-70">
            {tHome("promiseBody")}
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {(
            [
              ["shipping", "shippingBody"],
              ["warranty", "warrantyBody"],
              ["returns", "returnsBody"],
            ] as const
          ).map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-line p-8">
              <h3 className="text-sm font-medium">{tHome(title)}</h3>
              <p className="mt-2 text-sm text-muted">{tHome(body)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

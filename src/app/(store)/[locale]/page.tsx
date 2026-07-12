import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCategories, getProducts } from "@/lib/catalog";
import { getHomeContent } from "@/lib/home-content";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";
import Reveal from "@/components/Reveal";
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
  const c = getHomeContent(locale as Locale);
  const featured = products.slice(0, 4);
  const bySlug = (slug: string) => products.find((p) => p.slug === slug);
  // Imagen representativa por categoría: la de su primer producto
  const categoryImage = (slug: string) => products.find((p) => p.categorySlug === slug)?.images[0];

  return (
    <>
      {/* ── Hero editorial ─────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:pb-28 md:pt-24">
        <div>
          <p className="animate-fade-up text-xs uppercase tracking-[0.3em] text-muted">{t("eyebrow")}</p>
          <h1 className="animate-fade-up delay-100 mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            {t("title")}
          </h1>
          <p className="animate-fade-up delay-200 mt-6 max-w-md text-pretty text-base leading-relaxed text-muted">
            {t("subtitle")}
          </p>
          <div className="animate-fade-up delay-300 mt-10 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-foreground px-9 py-4 text-sm font-medium text-background transition-all duration-300 hover:opacity-85 active:scale-[0.98]"
            >
              {t("cta")}
            </Link>
            <Link
              href="/#featured"
              className="rounded-full border border-line px-9 py-4 text-sm transition-colors hover:border-foreground"
            >
              {tHome("featured")}
            </Link>
          </div>
        </div>
        <div className="relative hidden h-[480px] md:block">
          {featured[0] && (
            <div className="animate-float-slow absolute right-0 top-0 w-[62%] overflow-hidden rounded-3xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured[0].images[0]} alt={featured[0].name} className="aspect-[4/5] w-full object-cover" />
            </div>
          )}
          {featured[1] && (
            <div className="animate-float-slower absolute bottom-0 left-0 w-[48%] overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.2)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured[1].images[0]} alt={featured[1].name} className="aspect-square w-full object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* ── Franja de confianza ────────────────────────────────────── */}
      <section className="border-y border-line bg-white/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {c.trust.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-xs text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Colección ──────────────────────────────────────────────── */}
      <section id="featured" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-20">
        <Reveal>
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted">{tHome("featured")}</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProductCard product={p} locale={locale as Locale} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Bloques editoriales (producto como solución) ───────────── */}
      <section className="mx-auto max-w-6xl space-y-24 px-6 pt-24">
        {c.editorial.map((block, i) => {
          const product = bySlug(block.slug);
          if (!product) return null;
          const reversed = i % 2 === 1;
          return (
            <div key={block.slug} className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16`}>
              <Reveal className={reversed ? "md:order-2" : ""}>
                <Link href={`/products/${product.slug}`} className="group block overflow-hidden rounded-3xl bg-[#f4f3f1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </Link>
              </Reveal>
              <Reveal delay={120} className={reversed ? "md:order-1" : ""}>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">{block.kicker}</p>
                <h3 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">{block.title}</h3>
                <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted">{block.body}</p>
                <ul className="mt-6 space-y-2">
                  {block.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-8 inline-block rounded-full border border-foreground px-8 py-3 text-sm transition-colors hover:bg-foreground hover:text-background"
                >
                  {product.name} →
                </Link>
              </Reveal>
            </div>
          );
        })}
      </section>

      {/* ── Categorías en mosaico ──────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-24">
        <Reveal>
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted">{tHome("categories")}</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 60}>
              <Link
                href={`/products?category=${cat.slug}`}
                className="group relative block overflow-hidden rounded-2xl bg-[#eceae7]"
              >
                {categoryImage(cat.slug) && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={categoryImage(cat.slug)}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                )}
                <span className="absolute bottom-3 left-4 rounded-full bg-background/90 px-4 py-1.5 text-xs font-medium backdrop-blur-sm">
                  {cat.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Por qué Tulsi (bloque oscuro) ──────────────────────────── */}
      <section id="why" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24">
        <Reveal>
          <div className="rounded-3xl bg-foreground px-8 py-16 text-background md:px-16 md:py-20">
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">{c.why.title}</h2>
            <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed opacity-70">{c.why.body}</p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {c.why.principles.map((p, i) => (
                <div key={p.title}>
                  <p className="text-xs uppercase tracking-widest opacity-50">0{i + 1}</p>
                  <p className="mt-2 text-sm font-medium">{p.title}</p>
                  <p className="mt-1 text-xs leading-relaxed opacity-60">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-2xl scroll-mt-24 px-6 pt-24">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold tracking-tight">{c.faqTitle}</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {c.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="text-muted transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Newsletter ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-24">
        <Reveal>
          <div className="flex flex-col items-start gap-8 rounded-3xl border border-line bg-white px-8 py-12 md:flex-row md:items-center md:justify-between md:px-14">
            <div>
              <h2 className="max-w-sm text-balance text-2xl font-semibold tracking-tight">{c.newsletter.title}</h2>
              <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted">{c.newsletter.note}</p>
            </div>
            <NewsletterForm t={c.newsletter} />
          </div>
        </Reveal>
      </section>
    </>
  );
}

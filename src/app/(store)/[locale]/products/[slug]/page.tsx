import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProduct, getProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";
import AddToCart from "@/components/AddToCart";
import ProductGallery from "@/components/ProductGallery";
import { LOCALES, type Locale } from "@/i18n/routing";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tulsi.store";

export async function generateStaticParams() {
  const products = await getProducts("en");
  return LOCALES.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(locale as Locale, slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
    alternates: {
      canonical: `/${locale}/products/${slug}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/products/${slug}`])),
    },
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: product.images.map((i) => (i.startsWith("http") ? i : `${SITE_URL}${i}`)),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [t, product] = await Promise.all([
    getTranslations("product"),
    getProduct(locale as Locale, slug),
  ]);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.images.map((i) => (i.startsWith("http") ? i : `${SITE_URL}${i}`)),
    brand: { "@type": "Brand", name: "Tulsi" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/${locale}/products/${product.slug}`,
      priceCurrency: "EUR",
      price: (product.priceCents / 100).toFixed(2),
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/products" className="text-xs text-muted transition-colors hover:text-foreground">
        ← {t("backToShop")}
      </Link>
      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />
        <div className="animate-fade-up delay-100 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            {product.stock > 0 ? t("inStock") : t("outOfStock")}
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-lg text-muted">{product.tagline}</p>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">
              {formatPrice(product.priceCents, locale as Locale)}
            </span>
            {product.compareAtCents && (
              <span className="text-base text-muted line-through">
                {formatPrice(product.compareAtCents, locale as Locale)}
              </span>
            )}
          </div>
          <p className="mt-6 text-pretty text-sm leading-relaxed text-muted">{product.description}</p>
          <div className="mt-10">
            <AddToCart
              slug={product.slug}
              name={product.name}
              priceCents={product.priceCents}
              image={product.images[0]}
              inStock={product.stock > 0}
            />
            <p className="mt-3 text-center text-xs text-muted">{t("freeShipping")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

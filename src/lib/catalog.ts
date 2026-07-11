import { getPrisma } from "./prisma";
import { SEED_CATEGORIES, SEED_PRODUCTS, type SupplierCode } from "./catalog/seed-data";
import type { Locale } from "@/i18n/routing";

export interface CatalogCategory {
  slug: string;
  name: string;
}

export interface CatalogProduct {
  slug: string;
  sku: string;
  supplier: SupplierCode;
  categorySlug: string;
  priceCents: number;
  compareAtCents: number | null;
  stock: number;
  images: string[];
  name: string;
  tagline: string;
  description: string;
}

/** True when serving from Postgres, false when on the seed fallback. */
export function isDatabaseBacked(): boolean {
  return getPrisma() !== null;
}

export async function getCategories(locale: Locale): Promise<CatalogCategory[]> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const rows = await prisma.category.findMany({
        orderBy: { sortOrder: "asc" },
        include: { translations: true },
      });
      return rows.map((c) => ({
        slug: c.slug,
        name:
          c.translations.find((t) => t.locale === locale)?.name ??
          c.translations.find((t) => t.locale === "en")?.name ??
          c.slug,
      }));
    } catch {
      // fall through to seed catalog
    }
  }
  return SEED_CATEGORIES.map((c) => ({ slug: c.slug, name: c.names[locale] ?? c.names.en }));
}

export async function getProducts(locale: Locale, categorySlug?: string): Promise<CatalogProduct[]> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const rows = await prisma.product.findMany({
        where: { active: true, ...(categorySlug ? { category: { slug: categorySlug } } : {}) },
        include: { translations: true, category: true },
        orderBy: { createdAt: "asc" },
      });
      return rows.map((p) => {
        const t = p.translations.find((x) => x.locale === locale) ?? p.translations.find((x) => x.locale === "en");
        return {
          slug: p.slug,
          sku: p.sku,
          supplier: p.supplier as SupplierCode,
          categorySlug: p.category.slug,
          priceCents: p.priceCents,
          compareAtCents: p.compareAtCents,
          stock: p.stock,
          images: p.images,
          name: t?.name ?? p.slug,
          tagline: t?.tagline ?? "",
          description: t?.description ?? "",
        };
      });
    } catch {
      // fall through to seed catalog
    }
  }
  return SEED_PRODUCTS.filter((p) => !categorySlug || p.categorySlug === categorySlug).map((p) => {
    const t = p.i18n[locale] ?? p.i18n.en;
    return {
      slug: p.slug,
      sku: p.sku,
      supplier: p.supplier,
      categorySlug: p.categorySlug,
      priceCents: p.priceCents,
      compareAtCents: p.compareAtCents ?? null,
      stock: p.stock,
      images: p.images,
      name: t.name,
      tagline: t.tagline,
      description: t.description,
    };
  });
}

export async function getProduct(locale: Locale, slug: string): Promise<CatalogProduct | null> {
  const all = await getProducts(locale);
  return all.find((p) => p.slug === slug) ?? null;
}

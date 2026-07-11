import type { MetadataRoute } from "next";
import { getProducts, getCategories } from "@/lib/catalog";
import { LOCALES } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tulsi.store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getProducts("en"), getCategories("en")]);

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    entries.push(
      { url: `${SITE_URL}/${locale}`, changeFrequency: "daily", priority: 1 },
      { url: `${SITE_URL}/${locale}/products`, changeFrequency: "daily", priority: 0.9 },
    );
    for (const c of categories) {
      entries.push({
        url: `${SITE_URL}/${locale}/products?category=${c.slug}`,
        changeFrequency: "daily",
        priority: 0.7,
      });
    }
    for (const p of products) {
      entries.push({
        url: `${SITE_URL}/${locale}/products/${p.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }
  return entries;
}

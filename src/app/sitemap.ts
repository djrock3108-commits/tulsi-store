import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/routing";
import { LEGAL_TOPICS } from "@/lib/legal-content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tulsi.store";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    entries.push(
      { url: `${SITE_URL}/${locale}`, changeFrequency: "weekly", priority: 1 },
      { url: `${SITE_URL}/${locale}/order`, changeFrequency: "weekly", priority: 0.9 },
    );
    for (const topic of LEGAL_TOPICS) {
      entries.push({ url: `${SITE_URL}/${locale}/legal/${topic}`, changeFrequency: "yearly", priority: 0.3 });
    }
  }
  return entries;
}

import type { MetadataRoute } from "next";
import { LOCALES, routing } from "@/i18n/routing";
import { LEGAL_TOPICS } from "@/lib/legal-content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tulsi.store";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const PAGES: { path: string; changeFrequency: ChangeFrequency; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/order", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
  ...LEGAL_TOPICS.map((topic) => ({
    path: `/legal/${topic}`,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${page.path}`])),
          "x-default": `${SITE_URL}/${routing.defaultLocale}${page.path}`,
        },
      },
    })),
  );
}

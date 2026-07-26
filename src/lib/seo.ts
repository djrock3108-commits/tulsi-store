import { LOCALES, routing } from "@/i18n/routing";

/** Per-page canonical + hreflang alternates. `path` excludes the locale segment, e.g. "/order". */
export function pageAlternates(locale: string, path: string) {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${routing.defaultLocale}${path}`,
    },
  };
}

import { LOCALES, routing, type Locale } from "@/i18n/routing";
import type { AstroContent } from "@/lib/astro-content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tulsi.store";

const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Spanish",
  nl: "Dutch",
  de: "German",
  fr: "French",
  it: "Italian",
};

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

/** Site-wide Organization entity — no logo/sameAs, since neither exists yet. */
export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Tulsi",
    alternateName: "Tulsi Vedic Astrology",
    url: `${SITE_URL}/${locale}`,
    email: "hello@tulsi.store",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@tulsi.store",
        url: `${SITE_URL}/${locale}/contact`,
        availableLanguage: LOCALES.map((l) => LANGUAGE_NAMES[l]),
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Tulsi",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: [...LOCALES],
  };
}

/** No Product/AggregateRating — no cart on this site, and no genuine reviews exist. */
export function serviceJsonLd(locale: Locale, c: AstroContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Vedic astrology reading",
    name: c.form.title,
    description: c.hero.subtitle,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "Worldwide",
    availableLanguage: LOCALES.map((l) => LANGUAGE_NAMES[l]),
    offers: {
      "@type": "Offer",
      price: "60",
      priceCurrency: "EUR",
      url: `${SITE_URL}/${locale}/order`,
    },
  };
}

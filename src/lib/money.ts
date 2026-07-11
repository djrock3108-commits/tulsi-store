import type { Locale } from "@/i18n/routing";

/**
 * All prices are stored in EUR cents. The store launches EUR-only;
 * multi-currency display is prepared here — add rates (from ECB or your
 * PSP) and per-locale currency mapping when expanding beyond the eurozone.
 */
export const BASE_CURRENCY = "EUR";

const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-IE", // euro-formatting English
  es: "es-ES",
  nl: "nl-NL",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
};

export function formatPrice(cents: number, locale: Locale, currency = BASE_CURRENCY): string {
  return new Intl.NumberFormat(LOCALE_TAGS[locale] ?? "en-IE", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

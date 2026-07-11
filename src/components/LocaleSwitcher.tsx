"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES, type Locale } from "@/i18n/routing";

const LABELS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  nl: "NL",
  de: "DE",
  fr: "FR",
  it: "IT",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={(e) => router.replace(pathname, { locale: e.target.value as Locale })}
      className="cursor-pointer appearance-none bg-transparent text-xs tracking-widest text-muted transition-colors hover:text-foreground focus:outline-none"
    >
      {LOCALES.map((l) => (
        <option key={l} value={l}>
          {LABELS[l]}
        </option>
      ))}
    </select>
  );
}

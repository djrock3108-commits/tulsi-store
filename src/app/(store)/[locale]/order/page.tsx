import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAstroContent } from "@/lib/astro-content";
import HoroscopeForm from "@/components/HoroscopeForm";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = getAstroContent(locale as Locale);
  return {
    title: c.form.title,
    description: c.form.subtitle,
    alternates: pageAlternates(locale, "/order"),
  };
}

export default async function OrderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getAstroContent(locale as Locale);
  const tPrice = await getTranslations("price");

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <p className="animate-fade-up text-center text-xs uppercase tracking-[0.3em] text-gold">✦</p>
      <h1 className="animate-fade-up delay-100 mt-4 text-balance text-center font-serif text-4xl font-medium tracking-tight md:text-5xl">
        {c.form.title}
      </h1>
      <p className="animate-fade-up delay-200 mx-auto mt-5 max-w-lg text-pretty text-center text-sm leading-relaxed text-muted">
        {c.form.subtitle}
      </p>
      <p className="animate-fade-up delay-200 mx-auto mt-6 inline-flex w-full justify-center">
        <span className="rounded-full border border-gold/40 bg-surface px-6 py-2.5 text-sm tracking-wide text-foreground">
          {tPrice("line")}
        </span>
      </p>
      <div className="animate-fade-up delay-300 mt-12">
        <HoroscopeForm t={c.form} />
      </div>
    </div>
  );
}

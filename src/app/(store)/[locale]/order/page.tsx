import { setRequestLocale } from "next-intl/server";
import { getAstroContent } from "@/lib/astro-content";
import HoroscopeForm from "@/components/HoroscopeForm";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = getAstroContent(locale as Locale);
  return { title: c.form.title, description: c.form.subtitle };
}

export default async function OrderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getAstroContent(locale as Locale);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <p className="animate-fade-up text-center text-xs uppercase tracking-[0.3em] text-gold">✦</p>
      <h1 className="animate-fade-up delay-100 mt-4 text-balance text-center font-serif text-4xl font-medium tracking-tight md:text-5xl">
        {c.form.title}
      </h1>
      <p className="animate-fade-up delay-200 mx-auto mt-5 max-w-lg text-pretty text-center text-sm leading-relaxed text-muted">
        {c.form.subtitle}
      </p>
      <div className="animate-fade-up delay-300 mt-12">
        <HoroscopeForm t={c.form} />
      </div>
    </div>
  );
}

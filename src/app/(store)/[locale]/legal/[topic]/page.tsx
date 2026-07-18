import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { LEGAL, LEGAL_TOPICS, type LegalTopic } from "@/lib/legal-content";
import { LOCALES, type Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => LEGAL_TOPICS.map((topic) => ({ locale, topic })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}): Promise<Metadata> {
  const { locale, topic } = await params;
  const entry = LEGAL[topic as LegalTopic];
  if (!entry) return {};
  const doc = entry[locale as Locale] ?? entry.en;
  return { title: doc.title };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;
  setRequestLocale(locale);
  const entry = LEGAL[topic as LegalTopic];
  if (!entry) notFound();
  const doc = entry[locale as Locale] ?? entry.en;

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <h1 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">{doc.title}</h1>
      <div className="mt-10 space-y-5">
        {doc.paragraphs.map((p, i) => (
          <p key={i} className="text-pretty text-sm leading-relaxed text-muted">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

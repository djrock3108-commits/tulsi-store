import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing, LOCALES } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["opsz"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tulsi.store";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Tulsi — Authentic Vedic Astrology · Personalized Birth Chart Readings",
      template: "%s — Tulsi Vedic Astrology",
    },
    description:
      "Professional Jyotish: personalized Vedic horoscope and birth chart analysis prepared by hand by experienced Vedic astrology scholars. Delivered within 24 hours.",
    keywords: [
      "vedic astrology", "vedic horoscope", "jyotish", "birth chart", "natal chart",
      "vedic astrologer", "online horoscope", "vedic birth chart reading", "professional jyotish",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      siteName: "Tulsi",
      url: `${SITE_URL}/${locale}`,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${geist.variable} ${fraunces.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

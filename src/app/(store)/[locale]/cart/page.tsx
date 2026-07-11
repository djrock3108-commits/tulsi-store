import { getTranslations, setRequestLocale } from "next-intl/server";
import CartView from "@/components/CartView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cart" });
  return { title: t("title"), robots: { index: false } };
}

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cart");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-center text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <div className="mt-10">
        <CartView />
      </div>
    </div>
  );
}

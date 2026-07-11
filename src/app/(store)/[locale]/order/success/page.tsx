import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ClearCart from "./clear-cart";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tCart] = await Promise.all([getTranslations("order"), getTranslations("cart")]);

  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <ClearCart />
      <h1 className="animate-fade-up text-4xl font-semibold tracking-tight">{t("successTitle")}</h1>
      <p className="animate-fade-up delay-100 mt-5 text-pretty text-sm leading-relaxed text-muted">
        {t("successBody")}
      </p>
      <Link
        href="/products"
        className="animate-fade-up delay-200 mt-10 inline-block rounded-full border border-foreground px-8 py-3 text-sm transition-colors hover:bg-foreground hover:text-background"
      >
        {tCart("continue")}
      </Link>
    </div>
  );
}

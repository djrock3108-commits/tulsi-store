import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">404</p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 text-pretty text-sm leading-relaxed text-muted">{t("body")}</p>
      <Link
        href="/products"
        className="mt-10 inline-block rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        {t("cta")}
      </Link>
    </div>
  );
}

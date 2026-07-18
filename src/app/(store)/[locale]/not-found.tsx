import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">404</p>
      <h1 className="mt-5 text-balance font-serif text-4xl font-medium tracking-tight md:text-5xl">{t("title")}</h1>
      <p className="mt-4 text-pretty text-sm leading-relaxed text-muted">{t("body")}</p>
      <Link
        href="/"
        className="mt-10 inline-block rounded-full bg-accent px-8 py-3 text-sm font-medium text-accent-foreground transition-colors duration-200 hover:bg-accent-hover"
      >
        {t("cta")}
      </Link>
    </div>
  );
}

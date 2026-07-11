import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.25em]">TULSI</p>
          <p className="mt-2 max-w-sm text-sm text-muted">{t("tagline")}</p>
        </div>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Tulsi.store — {t("rights")}
        </p>
      </div>
    </footer>
  );
}

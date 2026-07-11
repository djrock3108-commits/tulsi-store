import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const links = [
    { href: "/legal/shipping-returns", label: t("shipping") },
    { href: "/legal/terms", label: t("terms") },
    { href: "/legal/privacy", label: t("privacy") },
  ];
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.25em]">TULSI</p>
          <p className="mt-2 max-w-sm text-sm text-muted">{t("tagline")}</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <nav className="flex flex-wrap gap-5 text-xs text-muted">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Tulsi.store — {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

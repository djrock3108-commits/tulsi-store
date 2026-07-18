import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const links = [
    { href: "/legal/privacy", label: t("privacy") },
    { href: "/legal/terms", label: t("terms") },
  ];
  return (
    <footer className="mt-28 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-sm font-semibold tracking-[0.25em]">TULSI</p>
          <p className="mt-2 max-w-sm text-sm text-muted">{t("tagline")}</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <nav className="flex flex-wrap gap-5 text-xs text-muted">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </Link>
            ))}
            <a href="mailto:hello@tulsi.store" className="transition-colors hover:text-foreground">
              {t("contact")}
            </a>
          </nav>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Tulsi — {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

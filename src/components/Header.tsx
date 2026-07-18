"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#how", label: t("how") },
    { href: "/#why", label: t("why") },
    { href: "/#faq", label: t("faq") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-line bg-background/90 shadow-[0_1px_20px_rgba(27,26,22,0.05)] backdrop-blur-md"
          : "border-transparent bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="block leading-none" onClick={() => setOpen(false)}>
          <span className="font-serif text-lg font-semibold tracking-[0.25em]">TULSI</span>
          <span className="mt-1 block text-[8px] uppercase tracking-[0.34em] text-gold">
            Authentic Jyotish
          </span>
        </Link>

        {/* Escritorio */}
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
          <LocaleSwitcher />
          <Link
            href="/order"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-colors duration-200 hover:bg-accent-hover"
          >
            {t("order")}
          </Link>
        </nav>

        {/* Móvil */}
        <div className="flex items-center gap-4 md:hidden">
          <Link
            href="/order"
            onClick={() => setOpen(false)}
            className="rounded-full bg-accent px-4 py-2 text-xs font-medium text-accent-foreground"
          >
            {t("order")}
          </Link>
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
          >
            <span className={`h-px w-5 bg-foreground transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-foreground transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted">
                {l.label}
              </Link>
            ))}
            <LocaleSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import CartBadge from "./CartBadge";

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
    { href: "/products", label: t("shop") },
    { href: "/#why", label: t("about") },
    { href: "/#faq", label: t("faq") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "border-line bg-background/90 shadow-[0_1px_20px_rgba(0,0,0,0.04)] backdrop-blur-md" : "border-transparent bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-[0.25em]" onClick={() => setOpen(false)}>
          TULSI
        </Link>

        {/* Escritorio */}
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
          <Link href="/cart" className="flex items-center text-muted transition-colors hover:text-foreground">
            {t("cart")}
            <CartBadge />
          </Link>
          <LocaleSwitcher />
        </nav>

        {/* Móvil */}
        <div className="flex items-center gap-5 md:hidden">
          <Link href="/cart" className="flex items-center text-sm text-muted" onClick={() => setOpen(false)}>
            {t("cart")}
            <CartBadge />
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

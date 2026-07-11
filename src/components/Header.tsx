import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import CartBadge from "./CartBadge";

export default function Header() {
  const t = useTranslations("nav");
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-[0.25em]">
          TULSI
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <Link href="/products" className="text-muted transition-colors hover:text-foreground">
            {t("shop")}
          </Link>
          <Link href="/cart" className="flex items-center text-muted transition-colors hover:text-foreground">
            {t("cart")}
            <CartBadge />
          </Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}

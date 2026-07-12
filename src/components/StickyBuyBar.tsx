"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { addToCart } from "@/lib/cart-client";
import { formatPrice } from "@/lib/money";
import type { Locale } from "@/i18n/routing";

interface Props {
  slug: string;
  name: string;
  priceCents: number;
  image: string;
  inStock: boolean;
  locale: Locale;
}

/** Barra de compra fija en móvil: aparece al pasar la zona principal del producto. */
export default function StickyBuyBar({ slug, name, priceCents, image, inStock, locale }: Props) {
  const t = useTranslations("product");
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!inStock) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="text-xs text-muted">{formatPrice(priceCents, locale)}</p>
        </div>
        <button
          onClick={() => {
            addToCart({ slug, name, priceCents, image });
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }}
          className="shrink-0 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background active:scale-[0.98]"
        >
          {added ? t("added") : t("addToCart")}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { addToCart } from "@/lib/cart-client";

interface Props {
  slug: string;
  name: string;
  priceCents: number;
  image: string;
  inStock: boolean;
}

export default function AddToCart({ slug, name, priceCents, image, inStock }: Props) {
  const t = useTranslations("product");
  const [added, setAdded] = useState(false);

  if (!inStock) {
    return (
      <button disabled className="w-full cursor-not-allowed rounded-full bg-line py-4 text-sm text-muted">
        {t("outOfStock")}
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        addToCart({ slug, name, priceCents, image });
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
      }}
      className="w-full rounded-full bg-foreground py-4 text-sm font-medium text-background transition-all duration-300 hover:opacity-85 active:scale-[0.98]"
    >
      {added ? t("added") : t("addToCart")}
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getCart, removeFromCart, setQuantity, subscribeCart, type CartItem } from "@/lib/cart-client";
import { formatPrice } from "@/lib/money";
import type { Locale } from "@/i18n/routing";

export default function CartView() {
  const t = useTranslations("cart");
  const locale = useLocale() as Locale;
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setItems(getCart());
    update();
    return subscribeCart(update);
  }, []);

  const subtotal = items.reduce((s, i) => s + i.priceCents * i.quantity, 0);

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) window.location.href = data.url;
      else setError(data.error ?? "Checkout failed");
    } catch {
      setError("Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-muted">{t("empty")}</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full border border-foreground px-8 py-3 text-sm transition-colors hover:bg-foreground hover:text-background"
        >
          {t("continue")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ul className="divide-y divide-line">
        {items.map((item) => (
          <li key={item.slug} className="flex items-center gap-5 py-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl bg-[#f4f3f1] object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium">{item.name}</p>
              <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-line px-3 py-1">
                <button
                  onClick={() => setQuantity(item.slug, item.quantity - 1)}
                  aria-label="−"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  −
                </button>
                <span className="min-w-4 text-center text-xs">{item.quantity}</span>
                <button
                  onClick={() => setQuantity(item.slug, item.quantity + 1)}
                  aria-label="+"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{formatPrice(item.priceCents * item.quantity, locale)}</p>
              <button
                onClick={() => removeFromCart(item.slug)}
                className="mt-1 text-xs text-muted underline-offset-2 transition-colors hover:text-foreground hover:underline"
              >
                {t("remove")}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
        <span className="text-sm text-muted">{t("subtotal")}</span>
        <span className="text-lg font-semibold">{formatPrice(subtotal, locale)}</span>
      </div>
      <button
        onClick={checkout}
        disabled={loading}
        className="mt-8 w-full rounded-full bg-foreground py-4 text-sm font-medium text-background transition-all hover:opacity-85 disabled:opacity-50"
      >
        {loading ? "…" : t("checkout")}
      </button>
      {error && <p className="mt-3 text-center text-xs text-red-600">{error}</p>}
      <p className="mt-4 text-center text-xs leading-relaxed text-muted">{t("note")}</p>
    </div>
  );
}

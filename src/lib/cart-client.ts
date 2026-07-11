"use client";

/**
 * Client-side cart, persisted in localStorage. The cart holds only slugs and
 * quantities plus display snapshots — prices are always re-resolved
 * server-side at checkout (see /api/checkout), so nothing here is trusted.
 */
export interface CartItem {
  slug: string;
  name: string;
  priceCents: number;
  image: string;
  quantity: number;
}

const KEY = "tulsi:cart";
const EVENT = "tulsi:cart-change";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as CartItem[];
  } catch {
    return [];
  }
}

function persist(items: CartItem[]): void {
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function addToCart(item: Omit<CartItem, "quantity">, quantity = 1): void {
  const items = getCart();
  const existing = items.find((i) => i.slug === item.slug);
  if (existing) existing.quantity = Math.min(existing.quantity + quantity, 10);
  else items.push({ ...item, quantity });
  persist(items);
}

export function removeFromCart(slug: string): void {
  persist(getCart().filter((i) => i.slug !== slug));
}

export function clearCart(): void {
  persist([]);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.quantity, 0);
}

export function subscribeCart(cb: () => void): () => void {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

"use client";

import { useEffect } from "react";
import { clearCart } from "@/lib/cart-client";

/** Payment completed — empty the local cart. */
export default function ClearCart() {
  useEffect(() => {
    clearCart();
  }, []);
  return null;
}

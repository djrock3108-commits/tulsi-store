"use client";

import { useEffect, useState } from "react";
import { getCart, cartCount, subscribeCart } from "@/lib/cart-client";

export default function CartBadge() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = () => setCount(cartCount(getCart()));
    update();
    return subscribeCart(update);
  }, []);
  if (count === 0) return null;
  return (
    <span className="ml-1 inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
      {count}
    </span>
  );
}

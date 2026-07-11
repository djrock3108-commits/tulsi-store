"use client";

import { useState } from "react";

/** Galería de ficha de producto: imagen principal + miniaturas si hay varias. */
export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="animate-fade-up overflow-hidden rounded-3xl bg-[#f4f3f1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[active]} alt={alt} className="aspect-square h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`${alt} — ${i + 1}`}
              className={`h-16 w-16 overflow-hidden rounded-xl border transition-all ${
                i === active ? "border-foreground" : "border-line opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

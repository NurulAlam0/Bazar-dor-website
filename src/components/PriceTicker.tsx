"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { formatBnPrice, formatBnPercent, unitLabel } from "@/lib/format";
import type { Product } from "@/types/product";

function TickerItem({ product }: { product: Product }) {
  const arrow =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";
  const color =
    product.change.dir === "up"
      ? "text-red-300"
      : product.change.dir === "down"
        ? "text-emerald-300"
        : "text-zinc-300";

  return (
    <span className="mx-6 inline-flex items-center gap-2 whitespace-nowrap text-sm">
      <span>{product.image}</span>
      <span className="font-medium">{product.nameBn}</span>
      <span>
        দাম {formatBnPrice(product.today)}/{unitLabel(product.unit).replace("প্রতি ", "")}
      </span>
      <span className={color}>
        {arrow} {formatBnPercent(product.change.pct)}
      </span>
    </span>
  );
}

export function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  if (!products.length) {
    return (
      <div className="bg-[var(--color-ticker)] py-2 text-center text-sm text-white">
        আজকের বাজারদর লোড হচ্ছে...
      </div>
    );
  }

  const loop = [...products, ...products];

  return (
    <div className="overflow-hidden bg-[var(--color-ticker)] py-2 text-white">
      <div className="ticker-track flex">
        {loop.map((product, index) => (
          <TickerItem key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
}

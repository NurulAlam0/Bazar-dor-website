import Link from "next/link";
import { ChangeBadge } from "@/components/ChangeBadge";
import { formatBnPrice, unitLabel } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-3.5"
    >
      <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-bazar-sand)] text-3xl">
        {product.image}
      </div>
      <h3 className="text-base font-bold text-[var(--color-bazar-ink)] group-hover:text-[var(--color-bazar)] sm:text-lg">
        {product.nameBn}
      </h3>
      <p className="mt-1 text-sm text-zinc-500">{unitLabel(product.unit)}</p>
      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div>
          <p className="text-xs text-zinc-500">আজকের দাম</p>
          <p className="text-base font-bold text-[var(--color-bazar-dark)]">
            {formatBnPrice(product.today)}
          </p>
        </div>
        <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
      </div>
    </Link>
  );
}

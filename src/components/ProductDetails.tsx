"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChangeBadge } from "@/components/ChangeBadge";
import { EmptyState } from "@/components/EmptyState";
import { ProductSkeletons } from "@/components/ProductSkeletons";
import { getProductBySlug } from "@/lib/api";
import {
  formatBnPrice,
  marketStats,
  productSummary,
  unitLabel,
} from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductDetails({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    getProductBySlug(slug)
      .then(setProduct)
      .catch(() => setProduct(null));
  }, [slug]);

  if (product === undefined) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="mb-4 text-zinc-500">Loading…</p>
        <ProductSkeletons count={4} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <EmptyState
          title="পণ্য পাওয়া যায়নি"
          message="এই পণ্যটি খুঁজে পাওয়া যায়নি। হোম পেজে ফিরে যান।"
        />
      </div>
    );
  }

  const stats = product.markets.length ? marketStats(product.markets) : null;

  return (
    <div className="mx-auto max-w-4xl space-y-5 px-4 py-6 sm:py-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-sm text-zinc-500"
      >
        <Link href="/" className="transition hover:text-[var(--color-bazar)]">
          হোম
        </Link>
        <span aria-hidden="true">›</span>
        <Link
          href={`/category/${encodeURIComponent(product.category)}`}
          className="transition hover:text-[var(--color-bazar)]"
        >
          {product.categoryNameBn}
        </Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page" className="font-semibold text-zinc-700">
          {product.nameBn}
        </span>
      </nav>

      <section className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div
            aria-hidden="true"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-bazar-sand)] text-4xl"
          >
            {product.image}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-extrabold text-[var(--color-bazar-ink)] sm:text-3xl">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              {unitLabel(product.unit)} <span aria-hidden="true">·</span>{" "}
              {product.categoryIcon} {product.categoryNameBn}
            </p>
            <p className="mt-3 text-sm text-zinc-600">
              {productSummary(product)}
            </p>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 rounded-2xl bg-[var(--color-bazar-sand)]/70 px-5 py-3 sm:min-w-36 sm:flex-col sm:items-start sm:gap-1">
            <div>
              <p className="text-xs text-zinc-500">আজকের দাম</p>
              <p className="text-2xl font-extrabold text-[var(--color-bazar-dark)]">
                {formatBnPrice(product.today)}
              </p>
              <p className="text-xs text-zinc-500">
                {unitLabel(product.unit)}
              </p>
            </div>
            <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-[var(--color-bazar-ink)]">
          দামের সারসংক্ষেপ
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "সর্বনিম্ন দাম",
              value: stats ? formatBnPrice(stats.min) : "তথ্য নেই",
              detail: "সব বাজারের মধ্যে",
            },
            {
              label: "সর্বোচ্চ দাম",
              value: stats ? formatBnPrice(stats.max) : "তথ্য নেই",
              detail: "সব বাজারের মধ্যে",
            },
            {
              label: "গড় দাম",
              value: stats ? formatBnPrice(stats.avg) : formatBnPrice(product.today),
              detail: stats ? "বাজারগুলোর গড়" : "আজকের গড় বাজারদর",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-[var(--color-bazar-cream)]/70 p-4 sm:p-5"
            >
              <p className="text-sm text-zinc-500">{item.label}</p>
              <p className="mt-2 text-xl font-extrabold text-[var(--color-bazar-dark)]">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
        <div className="px-5 pb-4 pt-5 sm:px-7 sm:pt-7">
          <h2 className="text-xl font-bold text-[var(--color-bazar-ink)]">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            বিভিন্ন বাজারে {product.nameBn}-এর দামের তুলনা
          </p>
        </div>
        {product.markets.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[var(--color-bazar-cream)] text-zinc-600">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold sm:px-7">
                    বাজার
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    বিভাগ
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    সর্বনিম্ন
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    সর্বোচ্চ
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    গড়
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market, index) => (
                  <tr
                    key={`${market.division}-${market.market}-${index}`}
                    className="border-t border-zinc-100"
                  >
                    <td className="whitespace-nowrap px-5 py-3 font-medium sm:px-7">
                      {market.market}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-zinc-600">
                      {market.division}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3">
                      {formatBnPrice(market.min)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3">
                      {formatBnPrice(market.max)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 font-semibold text-[var(--color-bazar-dark)]">
                      {formatBnPrice((market.min + market.max) / 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-5 pb-6 text-sm text-zinc-500 sm:px-7">
            এই পণ্যের বাজারভিত্তিক দাম এখনো পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}

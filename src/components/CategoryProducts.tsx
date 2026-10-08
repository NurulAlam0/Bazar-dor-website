"use client";

import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { ProductSkeletons } from "@/components/ProductSkeletons";
import { SortSelect } from "@/components/SortSelect";
import { getCategories, getProductsByCategory, sortProducts } from "@/lib/api";
import type { Category, Product, SortKey } from "@/types/product";

export function CategoryProducts({ slug }: { slug: string }) {
  const [result, setResult] = useState<{
    slug: string;
    category: Category | null;
    products: Product[];
    invalid: boolean;
  } | null>(null);
  const [sort, setSort] = useState<SortKey>("default");

  useEffect(() => {
    let cancelled = false;

    Promise.all([getCategories(), getProductsByCategory(slug)])
      .then(([categories, items]) => {
        if (cancelled) return;
        const match = categories.find((item) => item.slug === slug);
        setResult({
          slug,
          category: match ?? null,
          products: match && Array.isArray(items) ? items : [],
          invalid: !match,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setResult({
            slug,
            category: null,
            products: [],
            invalid: true,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const currentResult = result?.slug === slug ? result : null;
  const category = currentResult?.category ?? null;
  const products = currentResult?.products ?? null;

  const sorted = useMemo(
    () => (products ? sortProducts(products, sort) : []),
    [products, sort],
  );

  if (products === null) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="mb-4 text-zinc-500">Loading…</p>
        <ProductSkeletons count={8} />
      </div>
    );
  }

  if (currentResult?.invalid) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <EmptyState
          title="ক্যাটাগরি পাওয়া যায়নি"
          message="এই স্লাগের কোনো ক্যাটাগরি নেই। হোম পেজে ফিরে যান।"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">
            {category?.icon} {category?.nameBn}
          </h1>
          <p className="mt-1 text-zinc-600">এই ক্যাটাগরির আজকের বাজারদর</p>
        </div>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {!sorted.length ? (
        <div className="mt-6">
          <EmptyState
            title="এই ক্যাটাগরিতে পণ্য নেই"
            message="অন্য ক্যাটাগরি বেছে নিন অথবা হোমে ফিরে যান।"
          />
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

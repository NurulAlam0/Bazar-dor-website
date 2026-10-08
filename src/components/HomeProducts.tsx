"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductSkeletons } from "@/components/ProductSkeletons";
import { getProducts, topFallers, topRisers } from "@/lib/api";
import type { Product } from "@/types/product";

function Section({
  id,
  title,
  subtitle,
  products,
}: {
  id?: string;
  title: ReactNode;
  subtitle?: string;
  products: Product[];
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-6 sm:py-7">
      <h2 className="text-xl font-extrabold sm:text-2xl">{title}</h2>
      {subtitle ? <p className="mt-2 text-zinc-600">{subtitle}</p> : null}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function HomeProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  if (!products) {
    return (
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        <p className="text-zinc-500">Loading…</p>
        <ProductSkeletons count={8} />
      </div>
    );
  }

  return (
    <>
      <Section
        title={
          <>
            আজ দাম বেড়েছে <span className="text-red-600">▲</span>
          </>
        }
        subtitle="গতকালের তুলনায় সবচেয়ে বেশি দাম বাড়া পণ্যগুলো"
        products={topRisers(products)}
      />
      <Section
        title={
          <>
            আজ দাম কমেছে <span className="text-emerald-600">▼</span>
          </>
        }
        subtitle="আজ কেনাকাটায় সুবিধাজনক পণ্যগুলো"
        products={topFallers(products)}
      />
      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="চাল থেকে মসলা — আজকের বাজারদর একসাথে"
        products={products}
      />
    </>
  );
}

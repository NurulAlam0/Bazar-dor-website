import type { Category, Product, SortKey } from "@/types/product";

const BASE_URLS = [
  process.env.NEXT_PUBLIC_API_URL ??
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchFromApi<T>(path: string): Promise<T> {
  let lastError: Error | null = null;

  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, { cache: "no-store" });
      if (!res.ok) {
        lastError = new Error(`Request failed (${res.status})`);
        continue;
      }
      return (await res.json()) as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Network error");
    }
  }

  throw lastError ?? new Error("Failed to fetch data");
}

export function getProducts() {
  return fetchFromApi<Product[]>("/products");
}

export function getProductsByCategory(category: string) {
  return fetchFromApi<Product[]>(
    `/products?category=${encodeURIComponent(category)}`,
  );
}

export function getProductById(id: number) {
  return fetchFromApi<Product>(`/products/${id}`);
}

export function getCategories() {
  return fetchFromApi<Category[]>("/categories");
}

export function getCategory(slug: string) {
  return fetchFromApi<Category>(`/categories/${encodeURIComponent(slug)}`);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((item) => item.slug === slug) ?? null;
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const copy = [...products];
  if (sort === "price-asc") {
    return copy.sort((a, b) => a.today - b.today);
  }
  if (sort === "price-desc") {
    return copy.sort((a, b) => b.today - a.today);
  }
  return copy;
}

export function topRisers(products: Product[], limit = 6) {
  return [...products]
    .filter((item) => item.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

export function topFallers(products: Product[], limit = 6) {
  return [...products]
    .filter((item) => item.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, limit);
}

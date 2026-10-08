import { ProductSkeletons } from "@/components/ProductSkeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="mb-4 text-zinc-500">Loading…</p>
      <ProductSkeletons />
    </div>
  );
}

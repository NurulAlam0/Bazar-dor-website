import Link from "next/link";

export function EmptyState({
  title = "পণ্য পাওয়া যায়নি",
  message = "এই পাতায় কোনো তথ্য নেই। হোম পেজে ফিরে গিয়ে আবার চেষ্টা করুন।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
      <p className="text-5xl">🧺</p>
      <h1 className="mt-4 text-3xl font-bold">৪০৪</h1>
      <h2 className="mt-2 text-xl font-semibold">{title}</h2>
      <p className="mt-3 text-zinc-600">{message}</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-bazar)] px-5 text-sm font-semibold text-white"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

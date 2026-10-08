export function ProductSkeletons({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-48 animate-pulse rounded-2xl bg-white p-4 shadow-sm"
        >
          <div className="mb-3 h-16 w-16 rounded-2xl bg-zinc-200" />
          <div className="mb-2 h-5 w-2/3 rounded bg-zinc-200" />
          <div className="mb-6 h-4 w-1/3 rounded bg-zinc-100" />
          <div className="flex justify-between">
            <div className="h-8 w-24 rounded bg-zinc-200" />
            <div className="h-6 w-14 rounded-full bg-zinc-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

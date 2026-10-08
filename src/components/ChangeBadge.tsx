import { formatBnPercent } from "@/lib/format";
import type { PriceDirection } from "@/types/product";

export function ChangeBadge({
  dir,
  pct,
}: {
  dir: PriceDirection;
  pct: number;
}) {
  if (dir === "up") {
    return (
      <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
        ▲ {formatBnPercent(pct)}
      </span>
    );
  }

  if (dir === "down") {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
        ▼ {formatBnPercent(pct)}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-semibold text-zinc-600">
      —{formatBnPercent(0)}
    </span>
  );
}

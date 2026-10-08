const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBnDigits(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => BN_DIGITS[Number(digit)]);
}

export function formatBnNumber(value: number): string {
  return toBnDigits(Math.round(value).toLocaleString("en-IN"));
}

export function formatBnPrice(value: number): string {
  return `${formatBnNumber(value)} টাকা`;
}

export function formatBnPercent(value: number): string {
  const abs = Math.abs(value);
  const formatted = Number.isInteger(abs) ? String(abs) : abs.toFixed(1);
  return `${toBnDigits(formatted)}%`;
}

export function unitLabel(unit: string): string {
  switch (unit) {
    case "kg":
      return "প্রতি কেজি";
    case "litre":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
      return "প্রতি পিস";
    default:
      return `প্রতি ${unit}`;
  }
}

export function banglaDate(date: Date | string): string {
  const value = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(value);
}

export function productSummary(product: {
  nameBn: string;
  yesterday: number;
  today: number;
  change: { dir: string; pct: number };
}): string {
  if (product.change.dir === "up") {
    return `গতকালের তুলনায় ${product.nameBn}-এর দাম ${formatBnPercent(product.change.pct)} বেড়েছে। আজকের গড় বাজারদর ${formatBnPrice(product.today)}।`;
  }
  if (product.change.dir === "down") {
    return `গতকালের তুলনায় ${product.nameBn}-এর দাম ${formatBnPercent(product.change.pct)} কমেছে। আজকের গড় বাজারদর ${formatBnPrice(product.today)}।`;
  }
  return `আজ ${product.nameBn}-এর দাম অপরিবর্তিত। বাজারে গড় দর ${formatBnPrice(product.today)}।`;
}

export function marketStats(markets: { min: number; max: number }[]) {
  const mins = markets.map((m) => m.min);
  const maxs = markets.map((m) => m.max);
  const min = Math.min(...mins);
  const max = Math.max(...maxs);
  const avg =
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length;
  return { min, max, avg };
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthButtons } from "@/components/AuthButtons";
import { banglaDate } from "@/lib/format";
import { getCategories } from "@/lib/api";
import type { Category } from "@/types/product";

export function Navbar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [todayLabel, setTodayLabel] = useState("আজ");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));

    let dateUpdateTimer: ReturnType<typeof setTimeout>;

    function scheduleDateUpdate() {
      const now = new Date();
      setTodayLabel(banglaDate(now));

      const dateParts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).formatToParts(now);
      const year = Number(dateParts.find((part) => part.type === "year")?.value);
      const month = Number(
        dateParts.find((part) => part.type === "month")?.value,
      );
      const day = Number(dateParts.find((part) => part.type === "day")?.value);
      const nextDhakaMidnight = Date.UTC(year, month - 1, day + 1, -6);
      const delay = Math.max(1, nextDhakaMidnight - now.getTime() + 100);

      dateUpdateTimer = setTimeout(scheduleDateUpdate, delay);
    }

    dateUpdateTimer = setTimeout(scheduleDateUpdate, 0);

    return () => clearTimeout(dateUpdateTimer);
  }, []);

  const activeSlug = pathname.startsWith("/category/")
    ? pathname.split("/")[2]
    : "";

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link href="/" className="flex items-center gap-3">
          <span>
            <span className="block text-xl font-extrabold tracking-tight text-[var(--color-bazar-ink)] sm:text-2xl">
              🛒 বাজার দর
            </span>
            <span className="block text-xs text-zinc-500 sm:text-sm">
              {todayLabel}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl border border-zinc-200 px-3 py-2 text-sm md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="মেনু"
          >
            ☰
          </button>
          <AuthButtons />
        </div>
      </div>

      <nav className="border-t border-black/5 bg-[var(--color-bazar-cream)]">
        <div className="mx-auto hidden max-w-6xl items-center justify-center gap-1 overflow-x-auto px-4 py-1.5 md:flex">
          {categories.map((category) => {
            const active = activeSlug === category.slug;
            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                  active
                    ? "bg-[var(--color-bazar)] text-white"
                    : "text-[var(--color-bazar-ink)] hover:bg-white"
                }`}
              >
                {category.icon} {category.nameBn}
              </Link>
            );
          })}
        </div>

        {open ? (
          <div className="grid gap-1 px-4 py-3 md:hidden">
            {categories.map((category) => {
              const active = activeSlug === category.slug;
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                    active
                      ? "bg-[var(--color-bazar)] text-white"
                      : "bg-white"
                  }`}
                >
                  {category.icon} {category.nameBn}
                </Link>
              );
            })}
          </div>
        ) : null}
      </nav>
    </header>
  );
}

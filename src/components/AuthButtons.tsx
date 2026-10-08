"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

export function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <span className="h-9 w-20 animate-pulse rounded-full bg-zinc-200" />
        <span className="h-9 w-20 animate-pulse rounded-full bg-zinc-200" />
      </div>
    );
  }

  if (session?.user) {
    const initials = session.user.name?.trim().charAt(0).toUpperCase() || "ব";

    return (
      <details className="group relative">
        <summary
          aria-label="প্রোফাইল মেনু খুলুন"
          className="flex cursor-pointer list-none items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-[var(--color-bazar-cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bazar)] [&::-webkit-details-marker]:hidden"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-bazar-ink)] text-sm font-bold text-white">
            {initials}
          </span>
          <span className="hidden max-w-32 truncate text-sm font-semibold text-[var(--color-bazar-ink)] sm:block">
            {session.user.name}
          </span>
          <span aria-hidden="true" className="text-xs text-zinc-500">
            ▾
          </span>
        </summary>

        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-black/5 bg-white p-2 shadow-lg">
          <div className="border-b border-zinc-100 px-3 py-3">
            <p className="truncate text-sm font-bold text-[var(--color-bazar-ink)]">
              {session.user.name}
            </p>
            <p className="mt-0.5 truncate text-xs text-zinc-500">
              {session.user.email}
            </p>
          </div>
          <Link
            href="/profile"
            className="mt-1 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-[var(--color-bazar-cream)] hover:text-[var(--color-bazar-ink)]"
          >
            <span aria-hidden="true">👤</span>
            আমার প্রোফাইল
          </Link>
          <Button
            size="sm"
            className="w-full justify-start rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
            onPress={async () => {
              try {
                await signOut();
                toast.success("সাইন আউট সম্পন্ন হয়েছে");
                router.push("/");
                router.refresh();
              } catch (error) {
                toast.error(
                  error instanceof Error
                    ? error.message
                    : "সাইন আউট করা যায়নি",
                );
              }
            }}
          >
            <span aria-hidden="true">↪</span>
            সাইন আউট
          </Button>
        </div>
      </details>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        className="inline-flex h-8 items-center rounded-full border border-[var(--color-bazar)] px-3 text-sm font-semibold text-[var(--color-bazar)] sm:h-10"
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="inline-flex h-8 items-center rounded-full bg-[var(--color-bazar)] px-3 text-sm font-semibold text-white sm:h-10"
      >
        সাইন আপ
      </Link>
    </div>
  );
}

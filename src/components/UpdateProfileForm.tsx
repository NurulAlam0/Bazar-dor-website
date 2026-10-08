"use client";

import { useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { updateUser, useSession } from "@/lib/auth-client";

function ProfileEditor({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const [name, setName] = useState(initialName);
  const [pending, setPending] = useState(false);
  const initials = initialName.trim().charAt(0).toUpperCase() || "ব";

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const normalizedName = name.trim();
    if (!normalizedName) {
      toast.error("নাম লিখুন");
      return;
    }

    setPending(true);
    try {
      const { error } = await updateUser({ name: normalizedName });
      if (error) {
        toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
        return;
      }

      setName(normalizedName);
      toast.success("তথ্য আপডেট হয়েছে");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "আপডেট ব্যর্থ হয়েছে",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-extrabold text-[var(--color-bazar-ink)]">
        আমার প্রোফাইল
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও আপডেট করুন
      </p>

      <div className="mt-5 space-y-4">
        <section className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-bazar-sand)] text-2xl font-bold text-[var(--color-bazar-ink)]">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate font-bold text-[var(--color-bazar-ink)]">
              {name || initialName}
            </p>
            <p className="truncate text-sm text-zinc-500">{email}</p>
          </div>
        </section>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 className="font-bold text-[var(--color-bazar-ink)]">তথ্য আপডেট</h2>
          <TextField
            fullWidth
            isRequired
            name="name"
            value={name}
            onChange={setName}
          >
            <Label>নাম</Label>
            <Input placeholder="আপনার নাম" />
          </TextField>
          <Button
            type="submit"
            fullWidth
            className="bg-[var(--color-bazar)]"
            isPending={pending}
          >
            সংরক্ষণ করুন
          </Button>
        </form>
      </div>
    </div>
  );
}

export function UpdateProfileForm() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return <p className="px-4 py-16 text-center text-zinc-500">Loading…</p>;
  }

  if (!user) {
    return (
      <p className="px-4 py-16 text-center text-zinc-500">
        প্রোফাইলের তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <ProfileEditor
      key={user.id}
      initialName={user.name}
      email={user.email}
    />
  );
}

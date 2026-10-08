"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { signIn } from "@/lib/auth-client";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (searchParams.get("reason") === "protected") {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", {
        id: "protected-route",
      });
    }
    if (searchParams.get("registered") === "1") {
      toast.success("রেজিস্ট্রেশন সফল। এখন লগইন করুন", {
        id: "registered",
      });
    }
  }, [searchParams]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      const message = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(message);
      toast.error(message);
      return;
    }

    setPending(true);
    try {
      const { error: authError } = await signIn.email({
        email: normalizedEmail,
        password,
        callbackURL: "/",
      });

      if (authError) {
        const message = authError.message || "লগইন ব্যর্থ হয়েছে";
        setError(message);
        toast.error(message);
        return;
      }

      toast.success("লগইন সফল হয়েছে");
      const callback = searchParams.get("callbackUrl") || "/";
      router.push(callback);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "লগইন ব্যর্থ হয়েছে";
      setError(message);
      toast.error(message);
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-sm space-y-3 rounded-3xl bg-white p-4 shadow-sm sm:p-5"
    >
      <h1 className="text-center text-2xl font-extrabold">লগইন</h1>
      <p className="text-center text-sm text-zinc-500">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>

      <TextField
        fullWidth
        isRequired
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
        isInvalid={Boolean(error)}
      >
        <Label>ইমেইল</Label>
        <Input placeholder="you@email.com" />
      </TextField>

      <TextField
        fullWidth
        isRequired
        name="password"
        type="password"
        value={password}
        onChange={setPassword}
        isInvalid={Boolean(error)}
      >
        <Label>পাসওয়ার্ড</Label>
        <Input placeholder="••••••••" />
        {error ? <FieldError>{error}</FieldError> : null}
      </TextField>

      <Button type="submit" fullWidth className="bg-[var(--color-bazar)]" isPending={pending}>
        লগইন
      </Button>

      <p className="text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-[var(--color-bazar)]">
          রেজিস্টার করুন
        </Link>
      </p>

      <div className="relative text-center text-xs text-zinc-400">
        <span className="bg-white px-2">অথবা</span>
      </div>
      <SocialAuthButtons />
    </form>
  );
}

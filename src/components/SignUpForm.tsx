"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { signUp } from "@/lib/auth-client";

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const normalizedEmail = email.trim();
    if (!name || !normalizedEmail || !password) {
      const message = "নাম, ইমেইল ও পাসওয়ার্ড দিন";
      setError(message);
      toast.error(message);
      return;
    }
    if (password.length < 8) {
      const message = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
      setError(message);
      toast.error(message);
      return;
    }

    setPending(true);
    try {
      const { error: authError } = await signUp.email({
        name,
        email: normalizedEmail,
        password,
      });

      if (authError) {
        const message = authError.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে";
        setError(message);
        toast.error(message);
        return;
      }

      toast.success("রেজিস্ট্রেশন সফল হয়েছে, আপনি লগইন করেছেন");
      router.push("/");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "রেজিস্ট্রেশন ব্যর্থ হয়েছে";
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
      <h1 className="text-center text-2xl font-extrabold">রেজিস্ট্রেশন</h1>
      <p className="text-center text-sm text-zinc-500">নতুন অ্যাকাউন্ট তৈরি করুন</p>

      <TextField fullWidth isRequired name="name" value={name} onChange={setName}>
        <Label>নাম</Label>
        <Input placeholder="আপনার নাম" />
      </TextField>

      <TextField
        fullWidth
        isRequired
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
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
        <Input placeholder="কমপক্ষে ৮ অক্ষর" />
        {error ? <FieldError>{error}</FieldError> : null}
      </TextField>

      <Button type="submit" fullWidth className="bg-[var(--color-bazar)]" isPending={pending}>
        রেজিস্টার
      </Button>

      <p className="text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-[var(--color-bazar)]">
          লগইন করুন
        </Link>
      </p>

      <div className="relative text-center text-xs leading-none text-zinc-400">
        <span className="bg-white px-2">অথবা</span>
      </div>
      <SocialAuthButtons />
    </form>
  );
}

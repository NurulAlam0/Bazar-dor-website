import { Suspense } from "react";
import { SignInForm } from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <div className="px-4 py-6 sm:py-8">
      <Suspense fallback={<p className="text-center">Loading…</p>}>
        <SignInForm />
      </Suspense>
    </div>
  );
}

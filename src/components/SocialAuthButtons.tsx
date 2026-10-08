"use client";

import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export function SocialAuthButtons() {
  async function social(provider: "google" | "github") {
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "সোশ্যাল লগইন কনফিগার করা হয়নি",
      );
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="tertiary" className="w-full" onPress={() => social("google")}>
        Google দিয়ে চালিয়ে যান
      </Button>
      <Button variant="tertiary" className="w-full" onPress={() => social("github")}>
        GitHub দিয়ে চালিয়ে যান
      </Button>
    </div>
  );
}

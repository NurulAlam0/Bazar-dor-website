import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PriceTicker } from "@/components/PriceTicker";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <Suspense fallback={<div className="h-20" />}>
        <Navbar />
      </Suspense>
      <PriceTicker />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Providers } from "@/app/providers";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর ",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}

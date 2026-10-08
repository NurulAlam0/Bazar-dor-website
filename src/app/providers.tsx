"use client";

import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: "var(--font-hind-siliguri), sans-serif",
            borderRadius: "12px",
            background: "#163024",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

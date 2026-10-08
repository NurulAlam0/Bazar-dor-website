import { EmptyState } from "@/components/EmptyState";

export default function NotFound() {
  return (
    <div className="px-4 py-16">
      <EmptyState
        title="পাতাটি খুঁজে পাওয়া যায়নি"
        message="আপনি যে ঠিকানায় এসেছেন সেটি ভুল অথবা সরানো হয়েছে।"
      />
    </div>
  );
}

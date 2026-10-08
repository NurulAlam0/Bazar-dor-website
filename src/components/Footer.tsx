export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-extrabold text-[var(--color-bazar-ink)]">
            🛒 বাজার দর
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>
        <p className="max-w-sm text-sm text-zinc-500 sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}

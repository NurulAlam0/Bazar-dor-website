import Image from "next/image";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-7 sm:py-10 lg:grid-cols-2">
      <div>
        <p className="text-sm font-semibold tracking-wide text-[var(--color-bazar)]">
          প্রতিদিনের বাজার, এক নজরে
        </p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[var(--color-bazar-ink)] sm:text-5xl">
          নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম
        </h1>
        <p className="mt-4 max-w-xl text-base text-zinc-600 sm:text-lg">
          চাল, ডাল, তেল, সবজি, মাছ ও মাংসসহ দেশের বিভিন্ন বাজারের সর্বশেষ দর
          তুলনা করুন — বাংলায়, সহজে।
        </p>
        <a
          href="#সব-পণ্য"
          className="btn-sm sm:btn-md mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-bazar)] px-5 text-sm font-semibold text-white sm:h-11 sm:px-6"
        >
          সব পণ্য দেখুন
        </a>
      </div>
      <div className="flex justify-center">
        <div className="relative flex h-56 w-full max-w-md items-center justify-center rounded-[2.5rem] bg-[var(--color-bazar-sand)] sm:h-72">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের ঝুড়ি"
            width={280}
            height={280}
            className="drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}

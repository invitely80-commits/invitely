import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="page-shell flex min-h-screen items-center justify-center px-6 py-16">
      <div className="surface-card max-w-xl rounded-[40px] px-8 py-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-maroon/70">Not Found</p>
        <h1 className="mt-4 font-heading text-5xl text-maroon">This page isn&apos;t on the guest list</h1>
        <p className="mt-4 text-base leading-7 text-stone-600">
          The link may be outdated, or this invitation might have been moved. Head back to Invitely to
          create or revisit a wedding site.
        </p>
        <Link href="/" className={buttonStyles({ className: "mt-8" })}>
          Back to Invitely
        </Link>
      </div>
    </main>
  );
}


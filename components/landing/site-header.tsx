import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";

export function SiteHeader({
  ctaHref,
  ctaLabel,
}: {
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <header className="section-shell fixed inset-x-0 top-0 z-50 pt-4 sm:pt-6">
      <div className="glass-nav flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
        <Link href="/" className="font-heading text-3xl font-medium tracking-tight text-burgundy">
          Invitely
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] font-medium uppercase tracking-wider text-stone-500 md:flex">
          <a href="#how-it-works" className="transition hover:text-burgundy">
            How it works
          </a>
          <a href="#templates" className="transition hover:text-burgundy">
            Templates
          </a>
          <a href="#features" className="transition hover:text-burgundy">
            Features
          </a>
        </nav>
        <Link href={ctaHref} className={buttonStyles({ size: "sm", className: "px-6" })}>
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}

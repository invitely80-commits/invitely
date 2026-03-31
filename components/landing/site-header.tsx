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
    <header className="section-shell relative z-20 pt-6">
      <div className="surface-card flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
        <Link href="/" className="font-heading text-3xl text-maroon">
          Invitely
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-stone-600 md:flex">
          <a href="#how-it-works" className="transition hover:text-maroon">
            How it works
          </a>
          <a href="#templates" className="transition hover:text-maroon">
            Templates
          </a>
          <a href="#features" className="transition hover:text-maroon">
            Features
          </a>
          <a href="#testimonials" className="transition hover:text-maroon">
            Testimonials
          </a>
        </nav>
        <Link href={ctaHref} className={buttonStyles({ size: "sm" })}>
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}

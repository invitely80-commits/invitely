"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export function SiteHeader({
  ctaHref,
  ctaLabel,
}: {
  ctaHref: string;
  ctaLabel: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex justify-center py-8 px-6 pointer-events-none">
      <div className="glass-nav pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-ink/5 bg-white/70 px-8 py-3 backdrop-blur-xl shadow-2xl transition-all hover:border-ink/10">
        <Link href="/" className="font-heading text-2xl font-bold tracking-[-0.04em] text-ink">
          Invitely<span className="text-gold">.</span>
        </Link>
        
        <nav className="hidden items-center gap-12 text-[11px] font-bold uppercase tracking-[0.3em] text-ink/40 md:flex">
          <Link href="/templates" className="transition hover:text-burgundy">
            Collection
          </Link>
          <Link href="#features" className="transition hover:text-burgundy">
            Aesthetics
          </Link>
          <Link href="#story" className="transition hover:text-burgundy">
            Rituals
          </Link>
        </nav>
 
        <div className="flex items-center gap-8">
          <Link href="/sign-in" className="hidden text-[11px] font-bold uppercase tracking-widest text-ink transition hover:text-gold lg:block">
            Sign In
          </Link>
          <Link 
            href={ctaHref} 
            className="flex h-12 items-center justify-center rounded-full bg-ink px-8 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-gold hover:scale-105 active:scale-95 shadow-xl shadow-ink/10"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}

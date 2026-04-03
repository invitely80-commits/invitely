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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center py-6 px-6 pointer-events-none">
      <div className="glass-nav pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/20 px-6 py-2 shadow-2xl shadow-burgundy/5 transition-all hover:border-white/40">
        <Link href="/" className="font-heading text-2xl font-bold tracking-tight text-burgundy">
          Invitely
        </Link>
        
        <nav className="hidden items-center gap-10 text-[11px] font-bold uppercase tracking-[.25em] text-stone-400 md:flex">
          <Link href="/templates" className="transition hover:text-burgundy">
            Templates
          </Link>
          <Link href="#features" className="transition hover:text-burgundy">
            Features
          </Link>
          <Link href="#story" className="transition hover:text-burgundy">
            Our Story
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link href="/sign-in" className="hidden text-[11px] font-bold uppercase tracking-widest text-burgundy transition hover:opacity-60 lg:block">
            Login
          </Link>
          <Link 
            href={ctaHref} 
            className={buttonStyles({ 
              size: "sm", 
              className: "rounded-xl bg-burgundy px-5 py-4 sm:px-6 sm:py-5 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-burgundy/90 shadow-lg shadow-burgundy/10 transition-all active:scale-95" 
            })}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}

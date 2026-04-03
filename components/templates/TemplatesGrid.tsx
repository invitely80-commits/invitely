"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { type InviteTheme } from "@/lib/invites";
import { TraditionCard } from "@/components/templates/TraditionCard";
import { CultureBackground } from "@/components/templates/CultureBackground";

interface TemplateData {
  value: InviteTheme;
  label: string;
  description: string;
  color: string;
}

/**
 * TemplatesGrid — Minimal client island for the templates page.
 *
 * This is the ONLY "use client" component on the page.
 * Responsibilities:
 *   1. IntersectionObserver for staggered card reveal (replaces framer stagger)
 *   2. Hover → activeTheme state for CultureBackground
 *   3. router.push for card navigation
 *
 * Everything else (hero, header, footer CTA) is a Server Component.
 */
export default function TemplatesGrid({ templates }: { templates: TemplateData[] }) {
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = React.useState<InviteTheme>("hindu");

  // IntersectionObserver for staggered reveal
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-card]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.index || "0", 10) * 120;
            setTimeout(() => {
              el.classList.remove("card-reveal-hidden");
              el.classList.add("card-reveal-visible");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Closing section reveal observer
  const closingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = closingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("section-reveal-hidden");
            entry.target.classList.add("section-reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback(
    (theme: InviteTheme) => {
      router.push(`/templates/${theme}`);
    },
    [router]
  );

  const handleThemeHover = useCallback((theme: InviteTheme) => {
    setActiveTheme(theme);
  }, []);

  return (
    <>
      {/* Dynamic background (needs client state for activeTheme) */}
      <CultureBackground activeTheme={activeTheme} />

      {/* Prestige Grid */}
      <section className="relative z-10 max-w-7xl mx-auto py-32 px-6 sm:px-8">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {templates.map((template, index) => (
            <div
              key={template.value}
              data-card
              data-index={index}
              className="card-reveal-hidden"
              onMouseEnter={() => handleThemeHover(template.value)}
            >
              <TraditionCard
                theme={template.value}
                title={template.label}
                description={template.description}
                isActive={activeTheme === template.value}
                onNavigate={() => handleNavigate(template.value)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Bespoke Heritage Closure */}
      <section className="px-6 sm:px-8 py-32 sm:py-52 z-10 relative bg-black">
        <div
          ref={closingRef}
          className="section-reveal-hidden max-w-7xl mx-auto rounded-[48px] sm:rounded-[80px] border border-white/5 p-12 sm:p-20 lg:p-32 text-center overflow-hidden relative bg-white/[0.01]"
        >
          <div className="absolute inset-0 bg-mandala opacity-[0.01] scale-150 rotate-45" />

          <div className="relative z-10 space-y-10 sm:space-y-12">
            <h2 className="font-serif-lux text-5xl sm:text-6xl lg:text-8xl tracking-tighter text-silk">
              Bespoke Lineage
            </h2>
            <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-silk/20 max-w-3xl mx-auto leading-relaxed">
              Our creative engineers can orchestrate a unique architecture for unions that demand
              a one-of-a-kind digital translation.
            </p>
            <button className="cta-button-static mt-10 sm:mt-12 h-16 sm:h-18 bg-silk text-charcoal rounded-full px-12 sm:px-16 text-[10px] font-mono-lux font-bold uppercase tracking-[0.5em] shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
              Request Bespoke Collection
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import React, { useEffect, useRef, useCallback, useState, useMemo } from "react";
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

const ITEMS_PER_BATCH = 6;

/**
 * TemplatesGrid — Minimal client island for the templates page.
 *
 * This component is performance-first:
 *   1. IntersectionObserver for staggered card reveal.
 *   2. Support for Load More (Scalability).
 *   3. LCP priority for above-the-fold cards (Hindu, Muslim, Christian).
 */
export default function TemplatesGrid({ templates }: { templates: TemplateData[] }) {
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<InviteTheme>("hindu");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Pagination simulation (Scalability)
  const visibleTemplates = useMemo(() => {
    return templates.slice(0, visibleCount);
  }, [templates, visibleCount]);

  const loadMore = useCallback(() => {
    if (visibleCount >= templates.length) return;
    setIsLoadingMore(true);
    
    // Simulating low-overhead network load for scalability demo
    setTimeout(() => {
      setVisibleCount(prev => prev + ITEMS_PER_BATCH);
      setIsLoadingMore(false);
    }, 400);
  }, [visibleCount, templates.length]);

  // IntersectionObserver for staggered reveal on new items
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-card]:not(.card-reveal-visible)");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.index || "0", 10) % ITEMS_PER_BATCH * 120;
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
  }, [visibleTemplates]);

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

  return (
    <>
      {/* Dynamic background (needs client state for activeTheme) */}
      <CultureBackground activeTheme={activeTheme} />

      {/* Prestige Grid */}
      <section className="relative z-10 max-w-7xl mx-auto py-24 px-6 sm:px-8">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {visibleTemplates.map((template, index) => (
            <div
              key={template.value}
              data-card
              data-index={index}
              className="card-reveal-hidden"
              onMouseEnter={() => setActiveTheme(template.value)}
            >
              <TraditionCard
                theme={template.value}
                title={template.label}
                description={template.description}
                isActive={activeTheme === template.value}
                onNavigate={() => handleNavigate(template.value)}
                priority={index < 3} // Only first row gets priority
              />
            </div>
          ))}
        </div>

        {/* Scalability: Load More / Skeleton interaction point */}
        <div className="mt-20 flex justify-center">
          {visibleCount < templates.length && (
            <button 
              onClick={loadMore}
              disabled={isLoadingMore}
              className="group relative overflow-hidden h-16 bg-white/5 backdrop-blur-xl border border-white/10 text-charcoal/40 font-mono-lux tracking-[0.4em] uppercase py-2 px-12 rounded-full transition-all hover:bg-gold-accent hover:text-white disabled:opacity-50"
            >
              <span className="relative z-10">{isLoadingMore ? "Gathering Heritage..." : "Load More Collections"}</span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gold-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          )}
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

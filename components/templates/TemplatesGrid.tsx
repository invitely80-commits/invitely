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

  const visibleTemplates = useMemo(() => {
    return templates.slice(0, visibleCount);
  }, [templates, visibleCount]);

  const loadMore = useCallback(() => {
    if (visibleCount >= templates.length) return;
    setIsLoadingMore(true);
    
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setIsLoadingMore(false);
    }, 600);
  }, [visibleCount, templates.length]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-card]:not(.card-reveal-visible)");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const indexAttribute = el.dataset.index || "0";
            const delay = (parseInt(indexAttribute, 10) % 3) * 150;
            setTimeout(() => {
              el.classList.remove("card-reveal-hidden");
              el.classList.add("card-reveal-visible");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [visibleTemplates]);

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
      <CultureBackground activeTheme={activeTheme} />

      <section className="relative z-10 max-w-[1400px] mx-auto py-32 px-6 sm:px-12">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10"
        >
          {visibleTemplates.map((template, index) => {
            const isFeatured = index % 5 === 0;
            const gridSpan = isFeatured ? "md:col-span-8 lg:col-span-7" : "md:col-span-4 lg:col-span-5";
            
            return (
              <div
                key={template.value}
                data-card
                data-index={index}
                className={`card-reveal-hidden ${gridSpan} ${index % 2 === 1 ? 'md:mt-12' : ''}`}
                onMouseEnter={() => setActiveTheme(template.value)}
              >
                <TraditionCard
                  theme={template.value}
                  title={template.label}
                  description={template.description}
                  isActive={activeTheme === template.value}
                  onNavigate={() => handleNavigate(template.value)}
                  priority={index < 4}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-32 flex flex-col items-center gap-8">
          <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent" />
          {visibleCount < templates.length && (
            <button 
              onClick={loadMore}
              disabled={isLoadingMore}
              className="group relative overflow-hidden h-18 bg-white/5 backdrop-blur-2xl border border-white/10 text-white font-mono-lux text-[10px] tracking-[0.5em] uppercase py-3 px-16 rounded-full transition-all hover:bg-white hover:text-black disabled:opacity-50"
            >
              <span className="relative z-10">{isLoadingMore ? "Gathering Heritage..." : "Discover More"}</span>
              <div className="absolute inset-0 bg-gold-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          )}
        </div>
      </section>

      <section className="px-6 sm:px-8 py-32 sm:py-64 z-10 relative bg-black">
        <div
          ref={closingRef}
          className="section-reveal-hidden max-w-[1400px] mx-auto rounded-[64px] border border-white/5 p-12 sm:p-24 lg:p-40 text-center overflow-hidden relative bg-white/[0.01]"
        >
          <div className="absolute inset-0 bg-mandala opacity-[0.02] scale-150 -rotate-12" />

          <div className="relative z-10 space-y-12">
            <div className="space-y-6">
              <span className="font-mono-lux text-[9px] tracking-[0.6em] text-gold-accent uppercase font-bold">Unparalleled Service</span>
              <h2 className="font-serif-lux text-5xl sm:text-7xl lg:text-[8rem] tracking-tighter text-white leading-[0.8]">
                Bespoke <br /> <span className="italic font-light opacity-80">Lineage</span>
              </h2>
            </div>
            
            <p className="mt-8 text-lg sm:text-xl text-white/30 max-w-2xl mx-auto leading-relaxed font-medium">
              For unions requiring a one-of-a-kind digital architect, our creative 
              engineers design bespoke experiences from the ground up.
            </p>

            <div className="pt-12">
              <button className="h-18 px-16 bg-white text-black rounded-full text-[10px] font-mono-lux font-bold uppercase tracking-[0.6em] hover:bg-gold-accent hover:text-white transition-all shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                Inquire for Bespoke
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

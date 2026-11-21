"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
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

export default function TemplatesGrid({ templates }: { templates: TemplateData[] }) {
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<InviteTheme>("south-indian-heritage");

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-card]:not(.card-reveal-visible)");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.remove("card-reveal-hidden");
            el.classList.add("card-reveal-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [templates]);

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

      <section className="relative z-10 max-w-[1400px] mx-auto py-16 px-6 sm:px-12">
        <div
          ref={gridRef}
          className="max-w-xl mx-auto"
        >
          {templates.map((template, index) => {
            return (
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
                  priority={true}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-20 flex flex-col items-center gap-8">
          <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      <section className="px-6 sm:px-8 py-24 sm:py-36 z-10 relative bg-black">
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
              <button
                onClick={() => router.push("/dashboard/invite/new?template=south-indian-heritage")}
                className="h-18 px-16 bg-white text-black rounded-full text-[10px] font-mono-lux font-bold uppercase tracking-[0.6em] hover:bg-gold-accent hover:text-white transition-all shadow-[0_40px_80px_rgba(0,0,0,0.8)] cursor-pointer"
              >
                Create Invitation
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

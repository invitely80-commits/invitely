"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";

import { ScaleIn } from "@/components/landing/motion";
import { SiteHeader } from "@/components/landing/site-header";
import { TraditionIcons } from "@/components/landing/tradition-icons";
import { themeOptions } from "@/lib/invites";
import NextLink from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function TemplatesPage() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.utils.toArray(".template-card").forEach((card: unknown, i: number) => {
        gsap.from(card as HTMLElement, {
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="page-shell bg-ivory pb-32">
      <SiteHeader ctaHref="/sign-up" ctaLabel="Get Started" />

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 px-6 text-center overflow-hidden">
        <div className="bg-mandala absolute inset-0 opacity-[0.03] scale-150 rotate-12" />
        <div ref={headingRef} className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-burgundy/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-burgundy/60 mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Curated Heritage Collections</span>
          </div>
          <h1 className="font-heading text-6xl font-medium tracking-tight text-burgundy sm:text-8xl">
            Choose Your <br />
            <span className="italic text-gold italic-heading font-normal">Digital Mood</span>
          </h1>
          <p className="mt-8 text-lg text-stone-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Every tradition has a story. Every story deserves a canvas that honors its unique rituals, 
            colors, and celebratory essence.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="section-shell px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {themeOptions.filter(t => t.value !== 'minimal' && t.value !== 'royal').map((template, i) => {
            const label = template.label as keyof typeof TraditionIcons;
            const Icon = TraditionIcons[label] || TraditionIcons.Civil;
            return (
              <div key={template.value} className="template-card group">
                <div className="surface-card relative aspect-[4/5] rounded-[40px] overflow-hidden p-2 transition-all duration-700 group-hover:shadow-[0_40px_100px_rgba(87,0,19,0.12)] group-hover:-translate-y-4">
                  {/* Visual Preview Placeholder */}
                  <div 
                    className="h-full w-full rounded-[34px] overflow-hidden relative"
                    style={{ backgroundColor: `${template.color}15` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="scale-150 opacity-20">
                          <Icon />
                       </div>
                    </div>
                    
                    {/* Floating Info Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-8 pt-16 bg-gradient-to-t from-white via-white/90 to-transparent">
                       <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-burgundy/40 mb-2 block">Tradition</span>
                       <h3 className="font-heading text-3xl font-medium text-burgundy">{template.label}</h3>
                       <p className="mt-3 text-sm text-stone-500 leading-relaxed font-medium">
                         {template.description}
                       </p>
                       
                        <NextLink 
                          href={`/templates/${template.value}`}
                          className="mt-8 inline-flex h-12 items-center gap-3 rounded-2xl bg-burgundy px-6 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-burgundy/90 hover:gap-5"
                        >
                          Preview Style <ArrowRight className="h-4 w-4" />
                        </NextLink>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Legacy/Default Templates */}
          {themeOptions.filter(t => t.value === 'minimal' || t.value === 'royal').map((template) => (
             <div key={template.value} className="template-card group">
                <div className="surface-card relative aspect-[4/5] rounded-[40px] overflow-hidden p-2 transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-4">
                   <div 
                    className="h-full w-full rounded-[34px] overflow-hidden relative"
                    style={{ backgroundColor: `${template.color}15` }}
                  >
                    <div className="absolute inset-x-0 bottom-0 p-8 pt-16 bg-gradient-to-t from-white via-white/90 to-transparent">
                       <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-burgundy/40 mb-2 block">Classic</span>
                       <h3 className="font-heading text-3xl font-medium text-burgundy">{template.label}</h3>
                       <p className="mt-3 text-sm text-stone-500 leading-relaxed font-medium">
                         {template.description}
                       </p>
                       <NextLink 
                         href={`/templates/${template.value}`}
                         className="mt-8 inline-flex h-12 items-center gap-3 rounded-2xl border border-stone-200 px-6 text-xs font-bold uppercase tracking-widest text-burgundy transition-all hover:bg-stone-50 hover:gap-5"
                       >
                         Preview Style <ArrowRight className="h-4 w-4" />
                       </NextLink>
                    </div>
                  </div>
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* Bespoke Request CTA */}
      <section className="section-shell px-6 mt-32">
        <ScaleIn className="bg-burgundy-container rounded-[48px] p-12 text-center text-white relative overflow-hidden">
           <div className="bg-mandala absolute inset-0 opacity-[0.05] scale-150 rotate-45" />
           <div className="relative z-10">
              <h2 className="font-heading text-4xl font-medium sm:text-6xl max-w-2xl mx-auto">Don&apos;t see your tradition?</h2>
              <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
                We are constantly expanding our heirloom library. Reach out to our design curators 
                for a bespoke digital celebration.
              </p>
              <button className="mt-10 h-14 rounded-2xl bg-white px-10 text-xs font-bold uppercase tracking-widest text-burgundy transition-all hover:bg-white/90">
                Request Bespoke Mood
              </button>
           </div>
        </ScaleIn>
      </section>
    </main>
  );
}

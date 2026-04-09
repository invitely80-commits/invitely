"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/landing/motion";
import { HeroPreview } from "@/components/landing/hero-preview";

interface EditorialHeroProps {
  ctaHref: string;
  ctaLabel: string;
}

export function EditorialHero({ ctaHref, ctaLabel }: EditorialHeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-40 pb-20 lg:pt-56 lg:pb-32 px-6">
      <div className="section-shell relative z-10 w-full">
        <div className="grid gap-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="flex flex-col items-start gap-12">
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-3 rounded-full bg-gold/5 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.4em] text-gold ring-1 ring-gold/20 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The Legacy Modernist</span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <h1 className="max-w-4xl font-heading text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-ink text-balance">
                Modern Heritage. <br />
                <span className="italic font-serif-lux font-normal text-burgundy/90">Digital Elegance.</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="max-w-xl text-lg lg:text-xl leading-relaxed text-ink/60 font-medium">
                Transform your wedding invitations into a cinematic web experience. 
                Meticulously crafted to bridge heritage rituals with the seamless 
                convenience of the digital age.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3} className="flex flex-wrap gap-8 pt-8">
              <Link 
                href={ctaHref} 
                className="group relative inline-flex h-18 items-center justify-center rounded-full bg-burgundy px-12 text-base font-bold !text-white transition-all hover:bg-ink hover:scale-105 active:scale-95 shadow-xl shadow-burgundy/10"
              >
                <span className="relative z-10">{ctaLabel}</span>
                <div className="ml-3 transition-transform duration-500 group-hover:translate-x-2">
                  <ArrowRight size={20} className="!text-white" />
                </div>
              </Link>
              
              <Link 
                href="#preview" 
                className="inline-flex h-18 items-center justify-center rounded-full border border-ink/10 bg-white/50 px-12 text-base font-bold text-ink backdrop-blur-md transition-all hover:bg-white hover:border-ink/20 shadow-sm"
              >
                Explore Collection
              </Link>
            </FadeIn>

            {/* Social Proof Mini */}
            <FadeIn direction="up" delay={0.4} className="flex items-center gap-6 pt-12">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 w-12 rounded-full border-4 border-silk bg-silk overflow-hidden ring-1 ring-ink/5">
                    <div className="h-full w-full bg-burgundy/10 flex items-center justify-center text-[10px] font-bold text-burgundy/40">U{i}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-ink/40">
                Trusted by <span className="text-ink">15,000+</span> Couples
              </p>
            </FadeIn>
          </div>

          <div className="relative">
             <HeroPreview />
          </div>
        </div>
      </div>

      {/* Background Architectural Elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-silk/30 skew-x-[-12deg] translate-x-20 overflow-hidden">
         <div className="bg-mandala absolute inset-0 opacity-[0.03] scale-150 rotate-12" />
      </div>
    </section>
  );
}

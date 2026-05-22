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

            <FadeIn direction="up" delay={0.3} className="flex flex-wrap gap-6 pt-6">
              <Link 
                href={ctaHref} 
                className="group relative inline-flex h-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)] px-10 text-sm font-bold uppercase tracking-widest !text-white transition-all duration-300 hover:brightness-110 active-scale shadow-[0_20px_50px_rgba(87,0,19,0.22)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {ctaLabel}
                  <ArrowRight size={16} className="!text-white transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </Link>
              
              <Link 
                href="/templates" 
                className="inline-flex h-16 items-center justify-center rounded-full border border-gold/20 bg-white/70 px-10 text-sm font-bold uppercase tracking-widest text-gold backdrop-blur-md transition-all duration-300 hover:bg-white hover:border-gold/40 active-scale shadow-[0_20px_40px_rgba(154,127,63,0.05)]"
              >
                Explore Collection
              </Link>
            </FadeIn>

            {/* Social Proof Mini */}
            <FadeIn direction="up" delay={0.4} className="flex items-center gap-5 pt-8">
              <div className="flex -space-x-3.5">
                {[
                  { initial: "A", bg: "bg-[#570013]/10", text: "text-[#570013]" },
                  { initial: "V", bg: "bg-[#9a7f3f]/10", text: "text-[#9a7f3f]" },
                  { initial: "S", bg: "bg-[#1c1c18]/10", text: "text-[#1c1c18]" },
                  { initial: "M", bg: "bg-[#570013]/5", text: "text-[#570013]" },
                ].map((item, i) => (
                  <div key={i} className={`h-11 w-11 rounded-full border-2 border-[#fcf9f2] ${item.bg} flex items-center justify-center ring-1 ring-ink/5 overflow-hidden transition-transform duration-500 hover:translate-y-[-4px] hover:z-20`}>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.text}`}>{item.initial}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink/40">
                Trusted by <span className="text-burgundy font-extrabold">15,000+</span> couples globally
              </p>
            </FadeIn>
          </div>

          <div className="relative">
             <HeroPreview />
          </div>
        </div>
      </div>

      {/* Background Architectural Elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-silk/45 skew-x-[-12deg] translate-x-20 overflow-hidden">
         <div className="bg-mandala absolute inset-0 opacity-[0.04] scale-150 rotate-12" />
      </div>
    </section>
  );
}

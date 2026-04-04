import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function HinduVisual({ name, priority }: { name: string; priority?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#570013]">
      <Image
        src="/images/templates/hindu/hero_god_tier.png"
        alt="Hindu Wedding Rituals"
        fill
        priority={priority}
        className="object-cover opacity-70 group-hover:scale-110 transition-all duration-1000"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#570013]/60 to-[#800020]/40 mix-blend-overlay" />
      <div className="absolute inset-0 bg-mandala opacity-[0.2] scale-150 rotate-12" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center space-y-6">
        <div className="w-20 h-20 border border-gold-accent/40 rounded-full mx-auto flex items-center justify-center backdrop-blur-xl bg-white/5">
          <Sparkles className="text-gold-accent shrink-0 size-8" strokeWidth={1} />
        </div>
        <h3 className="font-serif-lux text-5xl text-gold-accent tracking-tighter uppercase leading-none drop-shadow-2xl">
          {name}
        </h3>
        <p className="font-mono-lux text-[9px] tracking-[0.5em] text-gold-accent/60 uppercase">Auspicious Heritage</p>
      </div>
    </div>
  );
}

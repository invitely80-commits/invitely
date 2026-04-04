import React from "react";
import Image from "next/image";
import { Crown } from "lucide-react";

export default function LuxuryVisual({ name, priority }: { name: string; priority?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0f0f0f]">
      <Image
        src="/images/templates/luxury/hero_god_tier.png"
        alt="Luxury Materiality"
        fill
        priority={priority}
        className="object-cover opacity-60 group-hover:scale-125 transition-all duration-[2000ms]"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f]/90 to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-mandala opacity-[0.08] scale-200 rotate-45" />
      
      <div className={`relative z-10 h-full flex flex-col items-center justify-center p-12 text-center space-y-8 transition-all duration-1000`}>
        <div className="w-28 h-28 border border-gold-accent/20 rounded-full flex items-center justify-center p-2 bg-black/40 backdrop-blur-3xl">
           <Crown className="text-gold-accent/70 shrink-0 size-16 mx-auto drop-shadow-[0_0_20px_rgba(201,154,60,0.5)]" strokeWidth={0.5} />
        </div>
        <h3 className="font-serif-lux text-5xl text-gold-accent tracking-[0.15em] uppercase leading-none drop-shadow-2xl">
          {name}
        </h3>
        <p className="font-mono-lux text-[9px] tracking-[0.8em] text-gold-accent/50 uppercase">The Legacy Edition</p>
      </div>
    </div>
  );
}

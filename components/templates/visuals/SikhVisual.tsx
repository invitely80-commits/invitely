import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function SikhVisual({ name, priority }: { name: string; priority?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1e3a8a]">
      <Image
        src="/images/templates/sikh/card_thumb.png"
        alt="Sikh Anand Karaj"
        fill
        priority={priority}
        className="object-cover opacity-60 group-hover:scale-110 transition-all duration-1000"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/80 to-[#1e40af]/40 mix-blend-overlay" />
      <div className="absolute inset-0 bg-mandala opacity-[0.15] scale-150 -rotate-12" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center space-y-6">
        <div className="w-20 h-20 border border-orange-400/50 rounded-full mx-auto flex items-center justify-center bg-white/5 backdrop-blur-xl">
          <Sparkles className="text-orange-400 shrink-0 size-8" strokeWidth={1} />
        </div>
        <h3 className="font-serif-lux text-5xl text-orange-300 tracking-tighter uppercase leading-none drop-shadow-2xl">
          {name}
        </h3>
        <p className="font-mono-lux text-[9px] tracking-[0.5em] text-orange-300/60 uppercase">Ethereal Grace</p>
      </div>
    </div>
  );
}

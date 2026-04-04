import React from "react";
import Image from "next/image";
import { Circle } from "lucide-react";

export default function MinimalVisual({ name, priority }: { name: string; priority?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5F5F5]">
      <Image
        src="/images/templates/minimal/card_thumb.png"
        alt="Minimal Heritage"
        fill
        priority={priority}
        className="object-cover opacity-40 group-hover:scale-105 transition-all duration-1000 grayscale"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[20px]" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center space-y-6">
        <Circle className="text-stone-300 shrink-0 size-8 mx-auto" strokeWidth={1} />
        <h3 className="font-serif-lux text-5xl text-stone-600 tracking-tighter drop-shadow-sm">
          {name}
        </h3>
        <p className="font-mono-lux text-[10px] tracking-[0.5em] text-stone-400 uppercase">Pure Essence</p>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function ChristianVisual({ name, priority }: { name: string; priority?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#fefefe]">
      <Image
        src="/images/templates/christian/hero_god_tier.png"
        alt="Ethereal Christian Wedding"
        fill
        priority={priority}
        className="object-cover opacity-60 group-hover:scale-105 transition-all duration-1000"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center space-y-6">
        <Heart className="text-stone-400 shrink-0 size-10 mx-auto" strokeWidth={1} />
        <h3 className="font-serif-lux text-5xl text-charcoal tracking-tighter drop-shadow-sm">
          {name}
        </h3>
        <p className="font-mono-lux text-[10px] tracking-[0.4em] text-stone-400 uppercase">Divine Union</p>
      </div>
    </div>
  );
}

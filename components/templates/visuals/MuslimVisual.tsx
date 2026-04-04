import React from "react";
import Image from "next/image";
import { Crown } from "lucide-react";

export default function MuslimVisual({ name, priority }: { name: string; priority?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#064e3b]">
      <Image
        src="/images/templates/muslim/hero_god_tier.png"
        alt="Islamic Nikah Architecture"
        fill
        priority={priority}
        className="object-cover opacity-60 group-hover:scale-110 transition-all duration-1000"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b]/80 to-[#065f46]/40 mix-blend-multiply" />
      <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center space-y-8">
        <Crown className="text-gold-accent/50 shrink-0 size-16 mx-auto" strokeWidth={1} />
        <h3 className="font-serif-lux text-6xl text-gold-accent tracking-tighter leading-tight drop-shadow-2xl">
          {name.split(" & ").map((n, i) => (
            <span key={n} className="block">{n}{i === 0 && <span className="text-gold-accent/30 mx-2 tracking-normal">&</span>}</span>
          ))}
        </h3>
        <p className="font-mono-lux text-[9px] tracking-[0.5em] text-gold-accent/40 uppercase">Nikah Essence</p>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function RoyalVisual({ name, priority }: { name: string; priority?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#5c1530]">
      <Image
        src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop"
        alt="Royal Heritage"
        fill
        priority={priority}
        className="object-cover opacity-60 group-hover:scale-110 transition-all duration-1000"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#5c1530]/80 to-[#800020]/40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-mandala opacity-[0.25] scale-125 -rotate-12" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center space-y-8">
        <div className="w-24 h-24 border border-gold-accent/30 rounded-full mx-auto flex items-center justify-center p-4 bg-white/5 backdrop-blur-3xl">
           <Sparkles className="text-gold-accent shrink-0 size-10" strokeWidth={0.5} />
        </div>
        <h3 className="font-serif-lux text-5xl text-gold-accent tracking-tighter uppercase leading-[0.85] drop-shadow-2xl">
           {name}
        </h3>
        <p className="font-mono-lux text-[10px] tracking-[0.5em] text-gold-accent/50 uppercase">Kinship Heirloom</p>
      </div>
    </div>
  );
}

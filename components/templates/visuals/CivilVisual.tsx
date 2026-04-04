import React from "react";
import Image from "next/image";

export default function CivilVisual({ name, priority }: { name: string; priority?: boolean }) {
  const [firstName, , lastName] = name.split(" ");
  
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1c1c18]">
      <Image
        src="/images/templates/civil/hero_god_tier.png"
        alt="Civil Wedding Portrait"
        fill
        priority={priority}
        className="object-cover opacity-80 group-hover:scale-105 transition-all duration-1000"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent mix-blend-multiply" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center space-y-8">
        <h3 className="font-serif-lux text-7xl text-silk/90 tracking-widest leading-none drop-shadow-2xl">
          {firstName} <br />
          <span className="text-silk/40 font-mono-lux tracking-normal">&</span> <br />
          {lastName}
        </h3>
        <p className="font-mono-lux text-[10px] tracking-[0.6em] text-silk/50 uppercase">Cinematic Union</p>
      </div>
    </div>
  );
}

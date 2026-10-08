import React from "react";
import Image from "next/image";

export default function SouthIndianHeritageVisual({
  name,
  priority = false,
}: {
  name: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F8F3E8]">
      {/* Background illustration */}
      <Image
        src="/wedding/scenes/shreyas-house.webp"
        alt="South Indian Heritage Wedding"
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 520px"
        className="object-cover object-center opacity-95 transition-transform duration-700 group-hover:scale-105"
      />

      {/* Warm parchment gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2D231E]/80 via-transparent to-[#F8F3E8]/30 pointer-events-none" />

      {/* Floating Header Tag */}
      <div className="absolute inset-x-6 top-8 rounded-full border border-[#C9A84C]/50 bg-[#F8F3E8]/90 px-4 py-2.5 text-center shadow-lg backdrop-blur-sm">
        <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-[#63534B]">
          Heritage Series
        </p>
        <p className="mt-0.5 font-serif text-lg uppercase tracking-[0.18em] text-[#821919] font-normal">
          {name}
        </p>
      </div>
    </div>
  );
}

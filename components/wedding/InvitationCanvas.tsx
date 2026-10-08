"use client";

import React from "react";
import Image from "next/image";
import { BotanicalFrame } from "./BotanicalFrame";
import { PetalLayer } from "./PetalLayer";

interface InvitationCanvasProps {
  children: React.ReactNode;
  className?: string;
}

export function InvitationCanvas({ children, className = "" }: InvitationCanvasProps) {
  return (
    <div className="relative w-full min-h-screen bg-[#F8ECDA] text-[#2D231E] overflow-x-clip selection:bg-[#821919] selection:text-white flex flex-col items-center">
      {/* 1. TYPOGRAPHY IMPORT */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Cinzel:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* 2. LAYER 1: VERY SUBTLE CONTINUOUS PAPER TEXTURE */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 mix-blend-multiply">
        <Image
          src="/wedding/decorations/parchment.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-repeat"
        />
      </div>

      {/* 3. LAYER 0: WARM SOFT AMBIENT VIGNETTE */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 65% at 50% 25%, rgba(255, 252, 245, 0.45) 0%, rgba(248, 236, 218, 0.2) 65%, rgba(240, 224, 202, 0.45) 100%)",
        }}
      />

      {/* 
        4. SINGLE CONTINUOUS INVITATION CANVAS (PRIMARY COORDINATE SYSTEM)
        Constrained editorial width (720-840px) matching the reference stationery sheet.
      */}
      <div className={`relative w-full max-w-[820px] mx-auto px-3 sm:px-8 md:px-12 py-8 sm:py-12 flex flex-col items-center ${className}`}>
        {/* Layer 2: Botanical frame anchored to canvas edges */}
        <BotanicalFrame />

        {/* Layer 4: Soft floating drifting petals */}
        <PetalLayer />

        {/* Layers 3, 5, 6: Editorial content on single central vertical axis */}
        <div className="relative z-20 w-full flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { BotanicalLayer } from "./BotanicalLayer";
import { PetalLayer } from "./PetalLayer";

interface WeddingInvitationCanvasProps {
  children: React.ReactNode;
  className?: string;
  standalone?: boolean;
}

/**
 * WeddingInvitationCanvas
 * 
 * The single continuous luxury wedding stationery canvas.
 * Unifies all sections (Families, The Wedding, Celebrations, Venue, RSVP)
 * onto ONE continuous piece of illustrated stationery.
 * 
 * Eliminates disjointed card boundaries, floating boxes, and unnatural gaps.
 * Uses container queries (container-type: inline-size) so that typography and artwork
 * maintain exact proportions across all viewports.
 */
export function WeddingInvitationCanvas({
  children,
  className = "",
  standalone = false,
}: WeddingInvitationCanvasProps) {
  const canvasContent = (
    <main
      aria-label="Wedding Invitation"
      className={`relative w-full max-w-[680px] lg:max-w-[720px] bg-[#FAF0E1] rounded-[2px] shadow-[0_16px_60px_rgba(45,35,30,0.18)] select-none flex flex-col items-center pb-[6cqw] ${className}`}
      style={{
        maxWidth: "720px",
        width: "100%",
        margin: "0 auto",
        containerType: "inline-size",
        containerName: "canvas",
        boxShadow: "0 12px 50px -10px rgba(70, 50, 40, 0.25), 0 0 1px rgba(100, 70, 50, 0.18)",
      }}
    >
      {/* 1. Continuous watercolor paper parchment texture spanning the entire canvas */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 40% at 50% 10%, rgba(255,253,248,0.7) 0%, rgba(246,233,215,0.4) 60%, rgba(235,218,196,0.6) 100%)",
        }}
      />

      {/* 2. Top botanical foliage framing */}
      <BotanicalLayer mode="top" />

      {/* 3. Drifting ambient rose petals */}
      <PetalLayer />

      {/* 4. The Continuous Invitation Sections */}
      <div className="relative z-20 w-full flex flex-col items-center">
        {children}
      </div>

      {/* 5. Bottom botanical foliage framing */}
      <BotanicalLayer mode="bottom" />
    </main>
  );

  if (!standalone) {
    return canvasContent;
  }

  return (
    <div className="min-h-screen w-full bg-[#EDE3D2] py-4 sm:py-8 md:py-12 px-2 sm:px-4 flex justify-center items-start selection:bg-[#821919] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Cinzel:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
      `}</style>
      {canvasContent}
    </div>
  );
}

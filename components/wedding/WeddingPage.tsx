"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BotanicalDecoration } from "./BotanicalDecoration";
import { PetalLayer } from "./PetalLayer";
import { FamilySection, type FamilyData } from "./FamilySection";
import { FloralDivider } from "./FloralDivider";

export const PAGE1_FAMILIES: FamilyData[] = [
  {
    id: "shreyas",
    name: "SHREYAS",
    artwork: "/wedding/scenes/shreyas-house.webp",
    artworkAlt: "Ancestral Wooden Heritage House of Shreyas' Family",
    grandparents: [
      "Late Sri Venkataraman Iyer & Smt. Lakshmi Ammal",
      "Sri Raghavan Iyer & Smt. Meenakshi Iyer",
    ],
    parents: [
      "Sri Suresh Iyer & Smt. Kavitha Suresh",
    ],
  },
  {
    id: "ananya",
    name: "ANANYA",
    artwork: "/wedding/scenes/ananya-temple.webp",
    artworkAlt: "Heritage Chettinad Palace of Ananya's Family",
    grandparents: [
      "Late Sri Narayanan Rao & Smt. Rukmini Rao",
      "Sri Krishnamurthy Sharma & Smt. Radha Sharma",
    ],
    parents: [
      "Sri Prakash Sharma & Smt. Anitha Prakash",
    ],
  },
];

interface WeddingPageProps {
  families?: FamilyData[];
}

export function WeddingPage({ families = PAGE1_FAMILIES }: WeddingPageProps) {
  return (
    <div className="relative w-full min-h-screen bg-[#F8F3E8] text-[#2D231E] overflow-x-clip selection:bg-[#821919] selection:text-white">
      {/* 1. TYPOGRAPHY IMPORT */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Cinzel:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* 2. SUBTLE PARCHMENT TEXTURE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-multiply">
        <Image
          src="/wedding/decorations/parchment.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-repeat"
        />
      </div>

      {/* 3. SUBTLE WARM GOLDEN AMBIENT VIGNETTE */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 15%, rgba(255, 252, 243, 0.7) 0%, rgba(245, 236, 224, 0.4) 60%, rgba(238, 225, 208, 0.8) 100%)",
        }}
      />

      {/* 4. BOTANICAL CORNER & EDGE FOLIAGE DECORATION */}
      <BotanicalDecoration />

      {/* 5. FLOATING JASMINE & ROSE PETALS PARTICLE LAYER */}
      <PetalLayer />

      {/* 6. MAIN EDITORIAL CONTENT CONTAINER */}
      <main className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-24 sm:pb-32 flex flex-col items-center">
        {/* PAGE 1 INVOCATION / TITLE BLOCK */}
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14 select-none"
        >
          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#821919] font-normal tracking-[0.06em] leading-[1.18] sm:leading-[1.15]">
            <span className="block">With the blessings</span>
            <span className="block">of our families</span>
          </h1>

          {/* Traditional 8-petal Diamond Rosette Emblem */}
          <div className="flex items-center justify-center my-3 text-[#821919]" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 opacity-90 drop-shadow-sm">
              <path d="M16 2L19.2 11.2L28.8 8.4L22.4 16L28.8 23.6L19.2 20.8L16 30L12.8 20.8L3.2 23.6L9.6 16L3.2 8.4L12.8 11.2L16 2Z" />
              <circle cx="16" cy="16" r="2.5" fill="#FAF5EB" />
            </svg>
          </div>

          {/* Subtitle */}
          <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#63534B] tracking-wide font-light max-w-md mx-auto">
            Two families, one beautiful beginning
          </p>
        </motion.header>

        {/* 7. FIRST FAMILY SECTION (SHREYAS) */}
        {families[0] && (
          <FamilySection family={families[0]} isFirst={true} />
        )}

        {/* 8. REFINED CENTRAL TRANSITION DIVIDER */}
        <FloralDivider variant="main" />

        {/* 9. SECOND FAMILY SECTION (ANANYA) */}
        {families[1] && (
          <FamilySection family={families[1]} isFirst={false} />
        )}
      </main>
    </div>
  );
}

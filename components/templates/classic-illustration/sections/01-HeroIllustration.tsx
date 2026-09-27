"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FloatingFlowers } from "../FloatingFlowers";

interface HeroIllustrationProps {
  brideName: string;
  groomName: string;
  weddingDate: string;
  city: string;
}

export function HeroIllustration({
  brideName,
  groomName,
  weddingDate,
  city,
}: HeroIllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll tracking across the 220vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Inertial spring to completely eliminate any jerkiness on trackpads or mouse wheels
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    restDelta: 0.0001,
  });

  // 3D Parallax & Vertical Camera Pan
  // At 0%: Camera focuses on the Grand Gopuram & the dynamic couple names
  // At 100%: Camera smoothly tilts and pans down into the tranquil lotus pond with the couple in limelight
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "-38%"]);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.03, 1.06]);

  // Phase 1: Gopuram & Couple Names Fade Out on scroll
  const gopuramOpacity = useTransform(smoothProgress, [0, 0.25, 0.45], [1, 0.85, 0]);
  const gopuramY = useTransform(smoothProgress, [0, 0.45], [0, -70]);
  const gopuramFadeMask = useTransform(smoothProgress, [0.15, 0.48], [0, 0.95]);

  // Phase 2: Second Half (Couple at Lotus Pond) Coming into the Limelight
  const pondLimelightOpacity = useTransform(smoothProgress, [0.38, 0.65, 1], [0, 1, 1]);
  const pondTextY = useTransform(smoothProgress, [0.38, 0.7], [45, 0]);
  const pondSunlightGlow = useTransform(smoothProgress, [0.35, 0.75], [0, 0.85]);

  const brideFirst = brideName.split(" ")[0];
  const groomFirst = groomName.split(" ")[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[220vh] bg-[#F7F2E7] select-none"
    >
      {/* STICKY FULLSCREEN VIEWPORT - OCCUPIES 100% OF THE SCREEN */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* TOP FLOATING NAVIGATION BAR */}
        <header className="relative z-30 w-full px-6 py-5 flex items-center justify-between max-w-6xl mx-auto transition-all duration-300">
          {/* Couple Monogram */}
          <div className="font-serif text-lg sm:text-2xl tracking-[0.25em] text-[#801818] font-bold drop-shadow-sm">
            {groomFirst[0]} &amp; {brideFirst[0]}
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4 sm:gap-8 font-serif text-xs sm:text-sm tracking-wider text-[#4A382E] bg-white/40 backdrop-blur-md px-5 py-2 rounded-full border border-[#D4AF37]/30 shadow-sm">
            <span className="text-[#801818] font-semibold border-b-2 border-[#801818] pb-0.5">
              Home
            </span>
            <span className="hover:text-[#801818] transition-colors cursor-pointer hidden xs:inline">
              Our Story
            </span>
            <span className="hover:text-[#801818] transition-colors cursor-pointer">
              Wedding
            </span>
            <span className="hover:text-[#801818] transition-colors cursor-pointer hidden sm:inline">
              Venue
            </span>
            <span className="hover:text-[#801818] transition-colors cursor-pointer hidden sm:inline">
              Gallery
            </span>
            <span className="hover:text-[#801818] transition-colors cursor-pointer text-[#801818] font-semibold">
              RSVP
            </span>
          </nav>
        </header>

        {/* FULLSCREEN 3D PARALLAX ILLUSTRATION - OCCUPIES ENTIRE VIEWPORT */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            style={{
              y: imageY,
              scale: imageScale,
            }}
            className="relative w-full h-[165vh] will-change-transform origin-top"
          >
            <Image
              src="/images/templates/classic-illustration/hero_illustration.png"
              alt="Classic South Indian Temple Illustration"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top select-none pointer-events-none"
            />

            {/* Limelight Golden Sunlight Aura over Sacred Pond & Couple */}
            <motion.div
              style={{ opacity: pondSunlightGlow }}
              className="absolute inset-x-0 bottom-0 h-2/3 bg-radial-gradient from-[#FFEBB3]/35 via-[#F7D896]/15 to-transparent pointer-events-none"
            />

            {/* Smooth Atmospheric Mist that dissolves the Top Gopuram on scroll */}
            <motion.div
              style={{ opacity: gopuramFadeMask }}
              className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-[#F7F2E7] via-[#F7F2E7]/85 to-transparent pointer-events-none"
            />
          </motion.div>
        </div>

        {/* FLOATING LOTUS BLOSSOMS & PETALS LAYER (ENTIRE SCREEN WIDTH) */}
        <FloatingFlowers isPondStage={true} />

        {/* PHASE 1 OVERLAY: TOP GOPURAM TEXT PRESENTATION (DYNAMIC FROM FORM) */}
        <motion.div
          style={{
            opacity: gopuramOpacity,
            y: gopuramY,
          }}
          className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4 will-change-transform pointer-events-none max-w-2xl mx-auto"
        >
          {/* Auspicious Red Emblem */}
          <div className="mb-2 text-[#801818]">
            <svg
              viewBox="0 0 40 40"
              fill="currentColor"
              className="w-8 h-8 mx-auto drop-shadow-sm opacity-90"
            >
              <path d="M20 2 C22 10, 30 18, 38 20 C30 22, 22 30, 20 38 C18 30, 10 22, 2 20 C10 18, 18 10, 20 2 Z" />
              <circle cx="20" cy="20" r="3.5" fill="#FFF" />
            </svg>
          </div>

          <p className="font-serif text-xs sm:text-sm tracking-[0.3em] text-[#4A382E] mb-2 uppercase font-medium">
            Together with our families
          </p>

          {/* Couple Names from Form */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#801818] font-normal tracking-[0.1em] uppercase leading-none drop-shadow-sm">
            <span className="block">{groomName}</span>
            <span className="block font-serif italic text-2xl sm:text-4xl text-[#A63535] my-1 font-light lowercase">
              &amp;
            </span>
            <span className="block">{brideName}</span>
          </h1>

          {/* Red Floral Diamond Divider */}
          <div className="my-3 flex items-center justify-center gap-2 text-[#801818]">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
          </div>

          {/* Wedding Date and City from Form */}
          <p className="font-serif text-sm sm:text-lg tracking-[0.3em] text-[#3D2D24] uppercase font-medium">
            {weddingDate}
          </p>
          <p className="font-serif text-xs sm:text-sm tracking-[0.35em] text-[#554339] mt-1 uppercase">
            {city}
          </p>

          {/* Scroll Down Cue */}
          <div className="mt-8 flex flex-col items-center gap-1.5 opacity-80">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#735A4B] font-sans font-medium">
              Scroll into the Sanctum
            </span>
            <span className="text-[#801818] text-base animate-bounce">↓</span>
          </div>
        </motion.div>

        {/* PHASE 2 OVERLAY: SECOND HALF (COUPLE BY LOTUS POND) IN LIMELIGHT */}
        <motion.div
          style={{
            opacity: pondLimelightOpacity,
            y: pondTextY,
          }}
          className="absolute inset-x-0 bottom-10 sm:bottom-14 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none will-change-transform"
        >
          <div className="max-w-md sm:max-w-lg bg-[#FAF5EC]/92 backdrop-blur-md px-6 sm:px-10 py-5 rounded-2xl border border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(43,27,23,0.18)] space-y-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#801818] font-sans font-bold block">
              The Sacred Pushkarini
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#241712] font-normal leading-snug">
              Where Sacred Waters Mirror Timeless Devotion
            </h3>
            <p className="font-serif text-xs sm:text-sm text-[#5C4D43] italic leading-relaxed">
              &ldquo;Sitting beside the blossoming lotuses, gazing upon the sanctum where two souls become one.&rdquo;
            </p>
            <div className="pt-2 flex items-center justify-center gap-3 text-xs tracking-widest uppercase text-[#801818] font-sans font-semibold">
              <span>{groomName}</span>
              <span>•</span>
              <span>{brideName}</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom subtle indicator */}
        <div className="relative z-10 w-full pb-3 text-center pointer-events-none">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#554339]/40 font-sans">
            Scroll to Journey Ahead
          </span>
        </div>
      </div>
    </div>
  );
}

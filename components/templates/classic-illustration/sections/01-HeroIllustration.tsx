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
    stiffness: 50,
    damping: 22,
    restDelta: 0.0001,
  });

  // 3D Parallax & Vertical Camera Pan
  // At 0%: Centered on top Gopuram & Title
  // At 100%: Camera tilts/pans down to the couple sitting by the sacred lotus pond
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "-42%"]);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.04, 1.08]);

  // Phase 1: Gopuram & Couple Names Fade Out
  const gopuramOpacity = useTransform(smoothProgress, [0, 0.3, 0.55], [1, 0.9, 0]);
  const gopuramY = useTransform(smoothProgress, [0, 0.5], [0, -80]);
  const textScale = useTransform(smoothProgress, [0, 0.45], [1, 0.94]);

  // Phase 2: Second Half (Couple at Lotus Pond) Coming into the Limelight
  const pondLimelightOpacity = useTransform(smoothProgress, [0.35, 0.65, 1], [0, 1, 1]);
  const pondTextY = useTransform(smoothProgress, [0.4, 0.75], [50, 0]);
  const waterGlowOpacity = useTransform(smoothProgress, [0.4, 0.8], [0, 0.75]);

  const brideFirst = brideName.split(" ")[0];
  const groomFirst = groomName.split(" ")[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[220vh] bg-[#F7F2E7] select-none"
    >
      {/* STICKY FULLSCREEN VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* TOP FLOATING NAVIGATION BAR */}
        <header className="relative z-30 w-full px-6 py-5 flex items-center justify-between max-w-5xl mx-auto transition-all duration-300">
          {/* Monogram */}
          <div className="font-serif text-lg sm:text-xl tracking-[0.25em] text-[#801818] font-semibold">
            {groomFirst[0]} &amp; {brideFirst[0]}
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4 sm:gap-8 font-serif text-xs sm:text-sm tracking-wider text-[#554339]">
            <span className="text-[#801818] font-medium border-b-2 border-[#801818] pb-0.5">
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
            <span className="hover:text-[#801818] transition-colors cursor-pointer text-[#801818] font-medium">
              RSVP
            </span>
          </nav>
        </header>

        {/* 3D PARALLAX ILLUSTRATION CANVAS */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          {/* Background Illustration Canvas */}
          <motion.div
            style={{
              y: imageY,
              scale: imageScale,
            }}
            className="relative w-full h-[185vh] sm:h-[180vh] max-w-[850px] aspect-[9/16] will-change-transform"
          >
            <Image
              src="/images/templates/classic-illustration/hero_illustration.png"
              alt="Classic South Indian Temple Illustration"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 850px"
              className="object-cover object-top select-none pointer-events-none drop-shadow-2xl"
            />

            {/* Limelight Lighting Wash for the Second Half (Pond & Couple) */}
            <motion.div
              style={{ opacity: waterGlowOpacity }}
              className="absolute inset-x-0 bottom-0 h-3/5 bg-radial-gradient from-[#FFE8B3]/25 via-transparent to-transparent pointer-events-none"
            />

            {/* Smooth Top Gopuram Fade Mask on Scroll */}
            <motion.div
              style={{ opacity: useTransform(smoothProgress, [0.2, 0.6], [0, 0.9]) }}
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#F7F2E7] via-[#F7F2E7]/80 to-transparent pointer-events-none"
            />
          </motion.div>
        </div>

        {/* FLOATING FLOWERS AND LOTUS BLOSSOMS LAYER */}
        <FloatingFlowers isPondStage={true} />

        {/* PHASE 1 OVERLAY: TOP TEXT & GOPURAM PRESENTATION */}
        <motion.div
          style={{
            opacity: gopuramOpacity,
            y: gopuramY,
            scale: textScale,
          }}
          className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4 will-change-transform pointer-events-none"
        >
          {/* Sacred Kolam / Auspicious Emblem */}
          <div className="mb-3 text-[#801818]">
            <svg
              viewBox="0 0 40 40"
              fill="currentColor"
              className="w-7 h-7 mx-auto drop-shadow-sm opacity-90"
            >
              <path d="M20 2 C22 10, 30 18, 38 20 C30 22, 22 30, 20 38 C18 30, 10 22, 2 20 C10 18, 18 10, 20 2 Z" />
              <circle cx="20" cy="20" r="3" fill="#FFF" />
            </svg>
          </div>

          <p className="font-serif text-xs sm:text-sm tracking-[0.25em] text-[#4A3D34] mb-3 uppercase">
            Together with our families
          </p>

          {/* Couple Names */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#801818] font-normal tracking-[0.1em] uppercase leading-tight drop-shadow-sm">
            <span>{groomName}</span>
            <span className="block font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#A63535] my-1 font-light lowercase">
              &amp;
            </span>
            <span>{brideName}</span>
          </h1>

          {/* Red Floral Diamond Divider */}
          <div className="my-3 flex items-center justify-center gap-2 text-[#801818]">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
          </div>

          {/* Date and City */}
          <p className="font-serif text-sm sm:text-base tracking-[0.3em] text-[#3D2D24] uppercase">
            {weddingDate}
          </p>
          <p className="font-serif text-xs sm:text-sm tracking-[0.35em] text-[#554339] mt-1 uppercase">
            {city}
          </p>

          {/* Scroll Down Prompt */}
          <div className="mt-8 flex flex-col items-center gap-1 opacity-70">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#735A4B] font-sans">
              Scroll into the Sanctum
            </span>
            <span className="text-[#801818] text-sm animate-bounce">↓</span>
          </div>
        </motion.div>

        {/* PHASE 2 OVERLAY: SECOND HALF (COUPLE BY LOTUS POND) IN LIMELIGHT */}
        <motion.div
          style={{
            opacity: pondLimelightOpacity,
            y: pondTextY,
          }}
          className="absolute inset-x-0 bottom-12 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none will-change-transform"
        >
          <div className="max-w-lg bg-[#FAF5EC]/90 backdrop-blur-md px-8 py-5 rounded-2xl border border-[#D4AF37]/50 shadow-2xl space-y-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#801818] font-sans font-bold">
              The Sacred Pushkarini
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#241712] font-normal">
              Where Sacred Waters Mirror Timeless Devotion
            </h3>
            <p className="font-serif text-xs sm:text-sm text-[#5C4D43] italic leading-relaxed">
              &ldquo;Sitting beside the blossoming lotuses, gazing upon the sanctum where two souls become one.&rdquo;
            </p>
            <div className="pt-2 flex items-center justify-center gap-3 text-xs tracking-widest uppercase text-[#801818] font-sans">
              <span>{groomFirst}</span>
              <span>•</span>
              <span>{brideFirst}</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom subtle gradient spacer */}
        <div className="relative z-10 w-full pb-3 text-center pointer-events-none">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#554339]/50">
            Scroll to Journey Ahead
          </span>
        </div>
      </div>
    </div>
  );
}

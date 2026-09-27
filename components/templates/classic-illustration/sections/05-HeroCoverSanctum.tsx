"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FloatingFlowers } from "../FloatingFlowers";

interface HeroCoverSanctumProps {
  brideName: string;
  groomName: string;
  weddingDate: string;
  city: string;
}

export function HeroCoverSanctum({
  brideName,
  groomName,
  weddingDate,
  city,
}: HeroCoverSanctumProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll tracking across the 220vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics for buttery smooth motion without jerkiness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.0005,
  });

  // Parallax camera movement: moves from Gopuram down to the sacred pond couple
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "-48%"]);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.02, 1.05]);

  // Phase 1: Gopuram & Couple Names fade out smoothly as user scrolls down
  const gopuramOpacity = useTransform(smoothProgress, [0, 0.25, 0.45], [1, 0.7, 0]);
  const gopuramY = useTransform(smoothProgress, [0, 0.45], [0, -60]);

  // Phase 2: Pushkarini Pond & Seated Couple come into the limelight
  const pondLimelightOpacity = useTransform(smoothProgress, [0.45, 0.7, 1], [0, 1, 1]);
  const pondTextY = useTransform(smoothProgress, [0.45, 0.75], [40, 0]);
  const pondSunlightGlow = useTransform(smoothProgress, [0.4, 0.8], [0, 0.9]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="sanctum"
      ref={containerRef}
      className="relative w-full min-h-[220vh] bg-[#F7F2E7] select-none border-t border-[#D4AF37]/25"
    >
      {/* STICKY FULLSCREEN VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* 1. EDGE-TO-EDGE AMBIENT BACKDROP */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 scale-125 blur-3xl opacity-40 transform-gpu">
            <Image
              src="/images/templates/classic-illustration/hero_illustration.png"
              alt="Atmospheric Temple Ambient"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#F7F2E7]/40 to-[#F7F2E7]/90" />
        </div>

        {/* 2. 3D PARALLAX ILLUSTRATION CANVAS (OCCUPIES FULL SCREEN) */}
        <div className="absolute inset-0 z-10 w-full h-full flex justify-center items-start overflow-hidden pointer-events-none">
          <motion.div
            style={{
              y: imageY,
              scale: imageScale,
            }}
            className="relative w-full max-w-[1400px] h-[190vh] will-change-transform origin-top"
          >
            <Image
              src="/images/templates/classic-illustration/hero_illustration.png"
              alt="Classic South Indian Temple & Sanctum Illustration"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1400px"
              className="object-cover object-top select-none pointer-events-none drop-shadow-2xl"
            />

            {/* Limelight Golden Sunlight Aura over Sacred Pond & Couple */}
            <motion.div
              style={{
                opacity: pondSunlightGlow,
              }}
              className="absolute inset-x-0 bottom-0 h-3/5 bg-radial-gradient from-[#FFE7A8]/45 via-[#F7D896]/20 to-transparent pointer-events-none"
            />
          </motion.div>
        </div>

        {/* 3. FLOATING LOTUS BLOSSOMS & PETALS */}
        <FloatingFlowers isPondStage={true} />

        {/* 4. PHASE 1 OVERLAY: TOP GOPURAM TEXT PRESENTATION */}
        <motion.div
          style={{
            opacity: gopuramOpacity,
            y: gopuramY,
          }}
          className="relative z-20 my-auto flex flex-col items-center justify-center text-center px-4 will-change-transform pointer-events-none max-w-2xl mx-auto pt-16 sm:pt-20"
        >
          {/* Emblem */}
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

          {/* Couple Names */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#801818] font-normal tracking-[0.1em] uppercase leading-none drop-shadow-sm">
            <span className="block">{groomName}</span>
            <span className="block font-serif italic text-2xl sm:text-4xl text-[#A63535] my-1 font-light lowercase">
              &amp;
            </span>
            <span className="block">{brideName}</span>
          </h1>

          <div className="my-3 flex items-center justify-center gap-2 text-[#801818]">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
          </div>

          <p className="font-serif text-sm sm:text-lg tracking-[0.3em] text-[#3D2D24] uppercase font-medium">
            {weddingDate}
          </p>
          <p className="font-serif text-xs sm:text-sm tracking-[0.35em] text-[#554339] mt-1 uppercase">
            {city}
          </p>

          <div className="mt-8 flex flex-col items-center gap-1.5 opacity-80">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#735A4B] font-sans font-medium">
              Scroll into the Sanctum
            </span>
            <span className="text-[#801818] text-base animate-bounce">↓</span>
          </div>
        </motion.div>

        {/* 5. PHASE 2 OVERLAY: SECOND HALF (COUPLE BY LOTUS POND) IN LIMELIGHT */}
        <motion.div
          style={{
            opacity: pondLimelightOpacity,
            y: pondTextY,
          }}
          className="absolute inset-x-0 bottom-12 sm:bottom-16 z-20 flex flex-col items-center justify-center text-center px-4 will-change-transform"
        >
          <div className="max-w-md sm:max-w-xl bg-[#FAF5EC]/95 backdrop-blur-md px-6 sm:px-10 py-6 rounded-3xl border border-[#D4AF37]/50 shadow-[0_25px_60px_rgba(43,27,23,0.25)] space-y-3 pointer-events-auto">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#801818] font-sans font-bold block">
              The Sacred Pushkarini
            </span>

            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#241712] font-normal leading-snug">
              Where Sacred Waters Mirror Timeless Devotion
            </h3>

            <p className="font-serif text-xs sm:text-sm text-[#5C4D43] italic leading-relaxed">
              &ldquo;Sitting beside the blossoming lotuses, gazing upon the sanctum where two souls become one.&rdquo;
            </p>

            {/* Shubhamastu Blessing */}
            <div className="pt-2 border-t border-[#D4AF37]/40 space-y-1">
              <h4 className="font-serif text-2xl text-[#801818] font-normal tracking-wide">
                || शुभमस्तु ||
              </h4>
              <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#554339]">
                May Auspiciousness Abound
              </p>
            </div>

            {/* Return to Top Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 hover:bg-white text-[#801818] border border-[#D4AF37]/40 text-xs font-serif tracking-[0.25em] uppercase font-semibold transition-all shadow-sm hover:shadow"
              >
                <span>Return to Top</span>
                <span>↑</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Subtle Bottom Bar */}
        <div className="relative z-10 w-full pb-3 text-center pointer-events-none">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#554339]/40 font-sans">
            Invitely &bull; Sacred Digital Wedding
          </span>
        </div>
      </div>
    </section>
  );
}

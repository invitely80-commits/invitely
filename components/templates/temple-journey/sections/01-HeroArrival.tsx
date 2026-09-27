"use client";

import React from "react";
import Image from "next/image";
import { motion, MotionValue, useMotionValue, useTransform } from "framer-motion";
import { GopuramCrest, TempleBell } from "../TempleVisualAssets";

interface HeroArrivalProps {
  brideName: string;
  groomName: string;
  weddingDate: string;
  city: string;
  heroImage: string;
  scrollYProgress?: MotionValue<number>;
}

export function HeroArrival({
  brideName,
  groomName,
  weddingDate,
  city,
  heroImage,
  scrollYProgress,
}: HeroArrivalProps) {
  const fallbackScroll = useMotionValue(0);
  const activeScroll = scrollYProgress || fallbackScroll;

  const bgScale = useTransform(activeScroll, [0, 0.25], [1, 1.08]);
  const textY = useTransform(activeScroll, [0, 0.2], [0, 60]);
  const textOpacity = useTransform(activeScroll, [0, 0.18], [1, 0.2]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#120E0B]">
      {/* Background with Parallax Scale */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src={heroImage || "/images/templates/temple-journey/hero_gopuram.jpg"}
          alt="Temple Gopuram at Dawn"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.72] contrast-[1.08]"
        />
        {/* Soft Vignette and Rich Gold Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120E0B] via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#120E0B]/30 to-[#120E0B]/90 pointer-events-none" />
      </motion.div>

      {/* Decorative Hanging Bells */}
      <div className="absolute top-0 left-8 md:left-24 z-10 hidden sm:block animate-pulse duration-1000">
        <TempleBell className="w-8 h-20 text-[#D4AF37] opacity-80" />
      </div>
      <div className="absolute top-0 right-8 md:right-24 z-10 hidden sm:block animate-pulse duration-700">
        <TempleBell className="w-8 h-20 text-[#D4AF37] opacity-80" />
      </div>

      {/* Content Container */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center text-[#F5F2EB] flex flex-col items-center"
      >
        {/* Sacred Invocation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center space-y-2 mb-6"
        >
          <GopuramCrest className="w-10 h-10 text-[#D4AF37] drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]" />
          <p className="font-serif tracking-[0.35em] text-xs uppercase text-[#E8D5A0] font-medium">
            || श्री गणेशाय नमः ||
          </p>
        </motion.div>

        {/* Narrative Pre-title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F5F2EB]/80 font-sans mb-4"
        >
          The Sacred Temple Journey of
        </motion.p>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 sm:space-y-3 mb-6"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-wide text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            <span className="block sm:inline">{brideName}</span>
            <span className="italic font-serif text-[#D4AF37] text-3xl sm:text-5xl md:text-6xl mx-3 sm:mx-6 font-light">
              &
            </span>
            <span className="block sm:inline">{groomName}</span>
          </h1>
        </motion.div>

        {/* Date and Location Stamp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base text-[#E8D5A0] tracking-[0.2em] font-serif uppercase pt-4 border-t border-[#D4AF37]/30 max-w-lg w-full"
        >
          <span>{weddingDate}</span>
          <span className="hidden sm:inline text-[#D4AF37]/50">•</span>
          <span>{city}</span>
        </motion.div>

        {/* Scroll Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-14 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            const el = document.getElementById("temple-corridor");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#E8D5A0]/80">
            Enter the Temple
          </span>
          <span className="text-[#D4AF37] text-lg animate-bounce">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

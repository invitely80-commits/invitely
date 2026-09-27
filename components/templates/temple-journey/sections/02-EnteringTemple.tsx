"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { KuthuvilakkuDiya, AntiqueDivider } from "../TempleVisualAssets";

export function EnteringTemple() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const zoomScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id="temple-corridor"
      ref={sectionRef}
      className="relative w-full min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#16120E] py-24 px-6"
    >
      {/* Background Architectural Corridor with Zoom & Perspective */}
      <motion.div
        style={{ scale: zoomScale, y: yParallax }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/images/templates/temple-journey/temple_corridor.jpg"
          alt="Ancient Temple Pillared Corridor"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.55] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120E0B] via-transparent to-[#16120E]" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      </motion.div>

      {/* Flanking Kuthuvilakku Lamps with subtle glowing aura */}
      <div className="absolute left-4 sm:left-12 lg:left-24 bottom-12 z-10 hidden sm:flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-[#FF9E1B]/20 blur-md absolute -top-1" />
        <KuthuvilakkuDiya className="w-10 h-24 text-[#D4AF37] drop-shadow-[0_0_15px_rgba(255,158,27,0.5)]" />
      </div>
      <div className="absolute right-4 sm:right-12 lg:right-24 bottom-12 z-10 hidden sm:flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-[#FF9E1B]/20 blur-md absolute -top-1" />
        <KuthuvilakkuDiya className="w-10 h-24 text-[#D4AF37] drop-shadow-[0_0_15px_rgba(255,158,27,0.5)]" />
      </div>

      {/* Editorial Poetry Card */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="bg-[#120E0B]/80 backdrop-blur-md p-8 sm:p-12 rounded-2xl border border-[#D4AF37]/30 shadow-2xl text-[#F5F2EB]"
        >
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
            02 • The Threshold
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal mt-3 mb-6 text-white tracking-wide">
            Entering the Sacred Precincts
          </h2>

          <AntiqueDivider className="w-3/4 mx-auto my-4 text-[#D4AF37]" />

          <p className="font-serif text-base sm:text-lg md:text-xl text-[#F5F2EB]/90 italic leading-relaxed max-w-xl mx-auto">
            &ldquo;Where carved granite pillars whisper centuries of devotion, fragrant jasmine fills the sanctum air, and sacred fire bears witness to two destinies becoming one.&rdquo;
          </p>

          <p className="text-xs uppercase tracking-[0.25em] text-[#E8D5A0]/80 mt-6 font-sans">
            Step forward into eternal union
          </p>
        </motion.div>
      </div>
    </section>
  );
}

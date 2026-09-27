"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface FamilyBlessingsProps {
  brideName: string;
  groomName: string;
}

export function FamilyBlessings({ brideName, groomName }: FamilyBlessingsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const groomY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const brideY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const brideFirst = brideName.split(" ")[0].toUpperCase();
  const groomFirst = groomName.split(" ")[0].toUpperCase();

  return (
    <section
      id="family"
      ref={sectionRef}
      className="relative w-full py-28 px-4 sm:px-6 bg-[#F7F2E7] text-[#2B1B17] overflow-hidden select-none"
    >
      {/* Background Subtle Floral & Palm Leaf Border Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-[#D4AF37]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial-gradient from-[#801818]/5 to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-3 mb-16"
        >
          <div className="text-[#801818] mb-1">
            <svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 mx-auto opacity-90">
              <path d="M16 2 C18 8, 24 14, 30 16 C24 18, 18 24, 16 30 C14 24, 8 18, 2 16 C8 14, 14 8, 16 2 Z" />
            </svg>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#801818] tracking-wide">
            With the blessings of our families
          </h2>

          <div className="text-[#801818] flex items-center justify-center my-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
          </div>

          <p className="font-serif text-sm sm:text-base text-[#554339] italic">
            Two families, one beautiful beginning
          </p>
        </motion.div>

        {/* 1. THE FAMILY OF GROOM */}
        <motion.div
          style={{ y: groomY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="space-y-6 mb-20"
        >
          <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#554339] font-medium">
            The Family of
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#801818] tracking-[0.2em] font-normal uppercase">
            {groomFirst}
          </h3>

          <div className="flex items-center justify-center text-[#801818]">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
          </div>

          {/* Groom's Ancestral Traditional Wooden Tiled Home */}
          <div className="relative w-full max-w-lg mx-auto aspect-[16/8] sm:aspect-[16/7] my-4 drop-shadow-md">
            <Image
              src="/images/templates/classic-illustration/groom_ancestral_home.png"
              alt="Ancestral Home"
              fill
              className="object-contain"
            />
          </div>

          {/* Grandparents & Parents Lineage */}
          <div className="space-y-6 max-w-md mx-auto pt-2">
            <div>
              <p className="font-serif italic text-sm sm:text-base text-[#801818] mb-1 font-light">
                Grandparents
              </p>
              <p className="font-serif text-xs sm:text-sm text-[#382820] leading-relaxed">
                Late Sri Venkataraman Iyer &amp; Smt. Lakshmi Ammal<br />
                Sri Raghavan Iyer &amp; Smt. Meenakshi Iyer
              </p>
            </div>

            <div className="flex items-center justify-center text-[#801818]">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
            </div>

            <div>
              <p className="font-serif italic text-sm sm:text-base text-[#801818] mb-1 font-light">
                Parents
              </p>
              <p className="font-serif text-xs sm:text-sm text-[#382820] leading-relaxed">
                Sri Suresh Iyer &amp; Smt. Kavitha Suresh
              </p>
            </div>
          </div>
        </motion.div>

        {/* Ornamental Section Divider */}
        <div className="my-16 flex items-center justify-center max-w-md mx-auto">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          <span className="w-2 h-2 rotate-45 border border-[#801818] mx-3" />
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-transparent" />
        </div>

        {/* 2. THE FAMILY OF BRIDE */}
        <motion.div
          style={{ y: brideY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="space-y-6"
        >
          <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#554339] font-medium">
            The Family of
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#801818] tracking-[0.2em] font-normal uppercase">
            {brideFirst}
          </h3>

          <div className="flex items-center justify-center text-[#801818]">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
          </div>

          {/* Bride's Ancestral White Chettinad Palace */}
          <div className="relative w-full max-w-lg mx-auto aspect-[16/8] sm:aspect-[16/7] my-4 drop-shadow-md">
            <Image
              src="/images/templates/classic-illustration/bride_ancestral_home.png"
              alt="Ancestral Palace"
              fill
              className="object-contain"
            />
          </div>

          {/* Grandparents & Parents Lineage */}
          <div className="space-y-6 max-w-md mx-auto pt-2">
            <div>
              <p className="font-serif italic text-sm sm:text-base text-[#801818] mb-1 font-light">
                Grandparents
              </p>
              <p className="font-serif text-xs sm:text-sm text-[#382820] leading-relaxed">
                Late Sri Narayanan Rao &amp; Smt. Rukmini Rao<br />
                Sri Krishnamurthy Sharma &amp; Smt. Radha Sharma
              </p>
            </div>

            <div className="flex items-center justify-center text-[#801818]">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
            </div>

            <div>
              <p className="font-serif italic text-sm sm:text-base text-[#801818] mb-1 font-light">
                Parents
              </p>
              <p className="font-serif text-xs sm:text-sm text-[#382820] leading-relaxed">
                Sri Prakash Sharma &amp; Smt. Anitha Prakash
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

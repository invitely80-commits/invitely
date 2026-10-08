"use client";

import React from "react";
import { motion } from "framer-motion";

interface InvitationIntroProps {
  subtitle?: string;
}

export function InvitationIntro({
  subtitle = "Two families, one beautiful beginning",
}: InvitationIntroProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 text-center select-none pt-4 sm:pt-8 mb-4 sm:mb-6 px-4"
    >
      {/* 1. MAIN INVITATION HEADING */}
      <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] text-[#821919] font-normal tracking-[0.04em] leading-[1.18] sm:leading-[1.16]">
        <span className="block">With the blessings</span>
        <span className="block">of our families</span>
      </h1>

      {/* 2. TRADITIONAL 8-POINT ROSETTE FLORET */}
      <div className="flex items-center justify-center my-2 sm:my-2.5 text-[#821919]" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 opacity-85">
          <path d="M16 2L19.2 11.2L28.8 8.4L22.4 16L28.8 23.6L19.2 20.8L16 30L12.8 20.8L3.2 23.6L9.6 16L3.2 8.4L12.8 11.2L16 2Z" />
          <circle cx="16" cy="16" r="2" fill="#FAF5EB" />
        </svg>
      </div>

      {/* 3. SUBTITLE INVOCATION */}
      <p className="font-serif italic text-xs sm:text-sm md:text-[15px] text-[#6B5A50] tracking-wide font-light max-w-md mx-auto">
        {subtitle}
      </p>
    </motion.header>
  );
}

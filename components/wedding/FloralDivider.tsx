"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloralDividerProps {
  className?: string;
}

export function FloralDivider({ className = "" }: FloralDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.95 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative z-20 w-full max-w-[380px] sm:max-w-[460px] mx-auto my-5 sm:my-7 flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      {/* Reference: Fine gold/crimson rule with centered 12-point heritage rosette */}
      <div className="flex-1 h-[0.75px] bg-gradient-to-r from-transparent via-[#821919]/30 to-[#821919]/55" />
      <div className="mx-2.5 text-[#821919] shrink-0">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-80">
          <circle cx="12" cy="12" r="2.2" />
          <path d="M12 2C12.5 4 13.5 5 15.5 5.5C13.5 6 12.5 7 12 9C11.5 7 10.5 6 8.5 5.5C10.5 5 11.5 4 12 2Z" />
          <path d="M12 22C12.5 20 13.5 19 15.5 18.5C13.5 18 12.5 17 12 15C11.5 17 10.5 18 8.5 18.5C10.5 19 11.5 20 12 22Z" />
          <path d="M2 12C4 11.5 5 10.5 5.5 8.5C6 10.5 7 11.5 9 12C7 12.5 6 13.5 5.5 15.5C5 13.5 4 12.5 2 12Z" />
          <path d="M22 12C20 11.5 19 10.5 18.5 8.5C18 10.5 17 11.5 15 12C17 12.5 18 13.5 18.5 15.5C19 13.5 20 12.5 22 12Z" />
        </svg>
      </div>
      <div className="flex-1 h-[0.75px] bg-gradient-to-l from-transparent via-[#821919]/30 to-[#821919]/55" />
    </motion.div>
  );
}

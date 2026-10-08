"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FloralDividerProps {
  variant?: "main" | "mini";
  className?: string;
}

export function FloralDivider({ variant = "main", className = "" }: FloralDividerProps) {
  if (variant === "mini") {
    return (
      <div className={`flex items-center justify-center my-3 text-[#821919] select-none ${className}`} aria-hidden="true">
        {/* Subtle 8-point traditional diamond floret */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 opacity-85 drop-shadow-sm">
          <path d="M12 2L14.2 8.5L20.8 6.5L16.2 12L20.8 17.5L14.2 15.5L12 22L9.8 15.5L3.2 17.5L7.8 12L3.2 6.5L9.8 8.5L12 2Z" />
          <circle cx="12" cy="12" r="1.5" fill="#FAF5EB" />
        </svg>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.9 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full max-w-lg mx-auto my-12 sm:my-16 flex items-center justify-center select-none ${className}`}
    >
      <div className="relative w-full h-8 sm:h-10 max-w-[460px]">
        <Image
          src="/wedding/ui/floral-divider.png"
          alt=""
          fill
          sizes="(max-width: 640px) 340px, 460px"
          className="object-contain opacity-90 drop-shadow-[0_1px_2px_rgba(184,139,74,0.3)]"
        />
      </div>
    </motion.div>
  );
}

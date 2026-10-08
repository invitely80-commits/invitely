"use client";

import React from "react";

interface SectionDividerProps {
  className?: string;
}

/**
 * SectionDivider
 * 
 * Delicate antique gold mandala floret rule used between sections
 * on the continuous luxury wedding stationery canvas.
 */
export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div
      className={`relative z-20 w-[42cqw] max-w-[280px] mx-auto my-[4cqw] flex items-center justify-center text-[#C29B63] ${className}`}
      aria-hidden="true"
    >
      <div className="flex-1 h-[0.75px] bg-gradient-to-r from-transparent to-[#C29B63]" />
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[2.2cqw] h-[2.2cqw] mx-[1.2cqw] opacity-90 max-w-[20px] max-h-[20px]"
        style={{ width: "2.2cqw", height: "2.2cqw", maxWidth: "20px", maxHeight: "20px" }}
      >
        <circle cx="12" cy="12" r="2.2" />
        <path d="M12 2C11.2 5 12.8 5 12 8C11.2 5 12.8 5 12 2Z" />
        <path d="M12 22C11.2 19 12.8 19 12 16C11.2 19 12.8 19 12 22Z" />
        <path d="M2 12C5 11.2 5 12.8 8 12C5 11.2 5 12.8 2 12Z" />
        <path d="M22 12C19 11.2 19 12.8 16 12C19 11.2 19 12.8 22 12Z" />
      </svg>
      <div className="flex-1 h-[0.75px] bg-gradient-to-l from-transparent to-[#C29B63]" />
    </div>
  );
}

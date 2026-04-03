import React from "react";

/**
 * CSS-only scroll indicator — zero JS, zero framer-motion.
 * Uses @keyframes defined in globals.css.
 */
export const ScrollIndicator = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="scroll-indicator-entrance w-[24px] h-[40px] rounded-full border-2 border-white/20 flex justify-center p-1.5">
        <div className="animate-scroll-dot w-1 h-1 rounded-full bg-gold-accent" />
      </div>
      <span className="scroll-indicator-label font-mono-lux text-[8px] tracking-[0.4em] uppercase text-white opacity-40">
        Scroll to Experience
      </span>
    </div>
  );
};

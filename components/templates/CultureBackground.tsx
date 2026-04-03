import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type InviteTheme } from "@/lib/invites";

/**
 * OKLCH Luxury Color Tokens for Perceptual Depth
 */
const themeColors: Record<string, { bg: string, accent: string, pattern: string }> = {
  hindu: { bg: "oklch(20% 0.1 20)", accent: "oklch(60% 0.15 25)", pattern: "mandala" },
  muslim: { bg: "oklch(15% 0.1 160)", accent: "oklch(55% 0.12 155)", pattern: "geometric" },
  christian: { bg: "oklch(96% 0.01 70)", accent: "oklch(85% 0.05 75)", pattern: "silk" },
  minimal: { bg: "oklch(96% 0.01 90)", accent: "oklch(90% 0.02 95)", pattern: "" },
  royal: { bg: "oklch(18% 0.08 15)", accent: "oklch(50% 0.12 25)", pattern: "mandala" },
  lux: { bg: "oklch(12% 0.02 260)", accent: "oklch(40% 0.05 265)", pattern: "grain" },
  default: { bg: "oklch(98% 0.005 70)", accent: "oklch(92% 0.01 75)", pattern: "" }
};

export const CultureBackground = ({ activeTheme }: { activeTheme: InviteTheme | "default" }) => {
  const current = themeColors[activeTheme as keyof typeof themeColors] || themeColors.default;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]" 
         style={{ backgroundColor: current.bg }}>
      
      {/* 1. Global Vellum Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-soft-light pointer-events-none"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* 2. Dynamic Pattern & Modal Aura Reveal */}
      <AnimatePresence mode="wait">
        <motion.div
           key={activeTheme}
           initial={{ opacity: 0, scale: 1.1 }}
           animate={{ opacity: 0.1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.95 }}
           transition={{ duration: 1.5, ease: "circOut" }}
           className="absolute inset-0 overflow-hidden"
        >
          {/* Central Bloom / Aura */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] rounded-full opacity-40 blur-[120px]"
            style={{ background: `radial-gradient(circle, ${current.accent} 0%, transparent 60%)` }}
          />

          {current.pattern === "mandala" && (
            <div className="absolute inset-0 bg-mandala scale-150 rotate-12 opacity-50" />
          )}
          {current.pattern === "geometric" && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:48px_48px] opacity-30" />
          )}
          {current.pattern === "silk" && (
            <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* 3. Perceptual Shadow Play */}
      <div className="absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-black/20 to-transparent mix-blend-multiply opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black/20 to-transparent mix-blend-multiply opacity-40" />
    </div>
  );
};

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type InviteTheme } from "@/lib/invites";

const themeColors: Record<string, { bg: string, pattern: string }> = {
  hindu: { bg: "oklch(20% 0.05 15)", pattern: "mandala" },
  muslim: { bg: "oklch(15% 0.1 150)", pattern: "geometric" },
  christian: { bg: "oklch(98% 0.01 70)", pattern: "silk" },
  minimal: { bg: "oklch(96% 0.01 90)", pattern: "" },
  royal: { bg: "oklch(20% 0.08 10)", pattern: "mandala" },
  lux: { bg: "oklch(15% 0.02 260)", pattern: "grain" },
  default: { bg: "oklch(96% 0.01 70)", pattern: "" }
};

export const CultureBackground = ({ activeTheme }: { activeTheme: InviteTheme | "default" }) => {
  const current = themeColors[activeTheme] || themeColors.default;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-[1000ms] ease-in-out" 
         style={{ backgroundColor: current.bg }}>
      
      {/* Dynamic Pattern Overlays */}
      <AnimatePresence mode="wait">
        <motion.div
           key={activeTheme}
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.05 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
           className="absolute inset-0"
        >
          {current.pattern === "mandala" && (
            <div className="absolute inset-0 bg-mandala scale-150 rotate-12 opacity-40" />
          )}
          {current.pattern === "geometric" && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px] opacity-20" />
          )}
          {current.pattern === "silk" && (
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Radiant Glows */}
      <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-white/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-black/5 to-transparent" />
    </div>
  );
};

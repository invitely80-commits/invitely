"use client";

import React from "react";
import { type InviteTheme } from "@/lib/invites";

/**
 * CSS-only culture background — replaces framer AnimatePresence + infinite breathing animation.
 * 
 * BEFORE: AnimatePresence mount/unmount on every theme change + 160vw breathing glow (infinite GPU layer)
 * AFTER:  CSS transition on background-color (1.2s) + static pattern. Zero spring instances.
 */
const themeColors: Record<string, { bg: string; accent: string; pattern: string }> = {
  hindu:     { bg: "oklch(20% 0.1 20)",  accent: "oklch(60% 0.15 25)",  pattern: "mandala" },
  muslim:    { bg: "oklch(15% 0.1 160)", accent: "oklch(55% 0.12 155)", pattern: "geometric" },
  christian: { bg: "oklch(96% 0.01 70)", accent: "oklch(85% 0.05 75)",  pattern: "silk" },
  minimal:   { bg: "oklch(96% 0.01 90)", accent: "oklch(90% 0.02 95)",  pattern: "" },
  royal:     { bg: "oklch(18% 0.08 15)", accent: "oklch(50% 0.12 25)",  pattern: "mandala" },
  lux:       { bg: "oklch(12% 0.02 260)", accent: "oklch(40% 0.05 265)", pattern: "grain" },
  sikh:      { bg: "oklch(18% 0.06 250)", accent: "oklch(50% 0.10 250)", pattern: "mandala" },
  civil:     { bg: "oklch(15% 0.01 260)", accent: "oklch(40% 0.03 260)", pattern: "grain" },
  luxury:    { bg: "oklch(12% 0.02 260)", accent: "oklch(40% 0.05 265)", pattern: "grain" },
  default:   { bg: "oklch(98% 0.005 70)", accent: "oklch(92% 0.01 75)",  pattern: "" },
};

export const CultureBackground = ({ activeTheme }: { activeTheme: InviteTheme | "default" }) => {
  const current = themeColors[activeTheme as keyof typeof themeColors] || themeColors.default;

  return (
    <div
      className="culture-bg fixed inset-0 z-[-1] pointer-events-none"
      style={{ backgroundColor: current.bg }}
    >
      {/* Static grain overlay (inline data URL, no external fetch) */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Static ambient glow (no infinite animation — just a positioned radial) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] rounded-full blur-[120px] opacity-30 culture-bg-pattern"
        style={{
          background: `radial-gradient(circle, ${current.accent} 0%, transparent 70%)`,
        }}
      />

      {/* Pattern layers (CSS only, no mount/unmount cycling) */}
      <div
        className="absolute inset-0 culture-bg-pattern"
        style={{ opacity: current.pattern === "mandala" ? 0.05 : 0 }}
      >
        <div className="absolute inset-0 bg-mandala scale-150 rotate-12" />
      </div>

      <div
        className="absolute inset-0 culture-bg-pattern"
        style={{ opacity: current.pattern === "geometric" ? 0.03 : 0 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div
        className="absolute inset-0 culture-bg-pattern"
        style={{ opacity: current.pattern === "silk" ? 0.015 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Perceptual shadow play */}
      <div className="absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-black/20 to-transparent mix-blend-multiply opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black/20 to-transparent mix-blend-multiply opacity-40" />
    </div>
  );
};

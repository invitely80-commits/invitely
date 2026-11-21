"use client";

import React from "react";
import Image from "next/image";
import { type InviteTheme } from "@/lib/invites";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CultureBackground = ({
  activeTheme: _activeTheme,
}: {
  activeTheme?: InviteTheme | "default";
}) => {
  return (
    <div
      className="culture-bg fixed inset-0 z-[-1] pointer-events-none"
      style={{ backgroundColor: "oklch(18% 0.06 35)" }}
    >
      {/* Dynamic Cinematic Hero Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/wedding/scenes/shreyas-house.webp"
            alt="South Indian Heritage Background"
            fill
            className="object-cover blur-[100px] scale-125"
            priority
          />
        </div>
      </div>

      {/* Static grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Static ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] rounded-full blur-[120px] opacity-30 culture-bg-pattern"
        style={{
          background: "radial-gradient(circle, oklch(55% 0.12 45) 0%, transparent 70%)",
        }}
      />

      {/* Pattern layer */}
      <div className="absolute inset-0 culture-bg-pattern opacity-5">
        <div className="absolute inset-0 bg-mandala scale-150 rotate-12" />
      </div>
    </div>
  );
};

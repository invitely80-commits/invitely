import React from "react";
import dynamic from "next/dynamic";
import { type InviteTheme } from "@/lib/invites";
import { getThemeCardStyles } from "./ThemeVisualAssets";

const SouthIndianHeritageVisual = dynamic(() => import("./visuals/SouthIndianHeritageVisual"));

/**
 * TraditionCard — South Indian Heritage Wedding Card.
 */
export const TraditionCard = ({
  theme,
  title,
  description,
  isActive,
  onNavigate,
  priority = false,
}: {
  theme: InviteTheme;
  title: string;
  description: string;
  isActive: boolean;
  onNavigate: () => void;
  priority?: boolean;
}) => {
  const styles = getThemeCardStyles(theme);
  const name = "Shreyas & Ananya";

  return (
    <div
      onClick={onNavigate}
      className={`template-card cursor-pointer relative w-full aspect-[4/5] rounded-[40px] overflow-hidden group transition-all duration-700 ${styles.background} ${styles.shadow} ${isActive ? "ring-1 ring-[#C9A84C]/40 scale-[1.02]" : ""}`}
      style={{ isolation: "isolate", clipPath: styles.clipPath || "none" }}
    >
      {/* Unique Pattern Overlay */}
      <div className={`absolute inset-0 z-0 ${styles.pattern} transition-opacity duration-700`} />
      
      {/* Unique Border Frame */}
      <div className={`absolute inset-0 z-20 pointer-events-none rounded-[40px] border-[0.5px] ${styles.border} opacity-40`} />

      {/* Hero Visual Area */}
      <div className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-1000 grayscale-[0.3] group-hover:grayscale-0">
        <SouthIndianHeritageVisual name={name} priority={priority} />
      </div>

      {/* Cinematic Gradient Fade (Persistent) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent z-10 opacity-90 transition-opacity duration-700" />

      {/* Permanent Information Panel */}
      <div className="relative z-30 h-full p-8 sm:p-10 flex flex-col justify-end text-white pb-12">
        <div className="space-y-4 transition-all duration-700">
          <div className="space-y-1.5 translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
            <span className={`font-mono-lux tracking-[0.6em] text-[9px] uppercase ${styles.accent} block font-bold`}>
              {styles.label || "Heritage Series"}
            </span>
            <h3 className="font-serif-lux text-3xl sm:text-4xl tracking-tighter leading-[0.9] mix-blend-plus-lighter text-white">
              {title}
            </h3>
          </div>

          <p className="text-sm font-sans text-stone-300 leading-relaxed max-w-sm line-clamp-3">
            {description}
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center gap-2 text-[10px] font-mono-lux uppercase tracking-[0.4em] text-[#C9A84C] group-hover:text-white transition-colors">
              Explore Template &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

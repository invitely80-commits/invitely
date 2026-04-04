import React from "react";
import dynamic from "next/dynamic";
import { type InviteTheme } from "@/lib/invites";
import { getThemeCardStyles } from "./ThemeVisualAssets";

// Dynamic Imports for Theme Visuals (Code Splitting)
const HinduVisual = dynamic(() => import("./visuals/HinduVisual"));
const MuslimVisual = dynamic(() => import("./visuals/MuslimVisual"));
const ChristianVisual = dynamic(() => import("./visuals/ChristianVisual"));
const RoyalVisual = dynamic(() => import("./visuals/RoyalVisual"));
const SikhVisual = dynamic(() => import("./visuals/SikhVisual"));
const CivilVisual = dynamic(() => import("./visuals/CivilVisual"));
const LuxuryVisual = dynamic(() => import("./visuals/LuxuryVisual"));

/**
 * TraditionCard — Redesigned for Unique Style and Persistent Info.
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

  // Bespoke sample names per theme
  const sampleNames: Record<string, string> = {
    hindu: "Aria & Julian",
    muslim: "Zayn & Myra",
    christian: "Ethan & Clara",
    royal: "Siddharth & Meera",
    sikh: "Arjun & Preet",
    civil: "Alex & Sam",
    luxury: "The Heirloom",
  };

  const name = sampleNames[theme] || "Our Union";

  const renderVisual = () => {
    switch (theme) {
      case "hindu": 
      case "south-indian": return <HinduVisual name={name} priority={priority} />;
      case "muslim": return <MuslimVisual name={name} priority={priority} />;
      case "christian": 
      case "minimal": return <ChristianVisual name={name} priority={priority} />;
      case "royal": return <RoyalVisual name={name} priority={priority} />;
      case "sikh": return <SikhVisual name={name} priority={priority} />;
      case "civil": return <CivilVisual name={name} priority={priority} />;
      case "luxury": return <LuxuryVisual name={name} priority={priority} />;
      default: return <div className="bg-charcoal w-full h-full opacity-20" />;
    }
  };

  return (
    <div
      className={`template-card relative w-full aspect-[4/5] rounded-[40px] overflow-hidden group transition-all duration-700 ${styles.background} ${styles.shadow} ${isActive ? 'ring-1 ring-[#C9A84C]/40 scale-[1.02]' : ''}`}
      style={{ isolation: "isolate", clipPath: styles.clipPath || "none" }}
    >
      {/* Unique Pattern Overlay */}
      <div className={`absolute inset-0 z-0 ${styles.pattern} transition-opacity duration-700`} />
      
      {/* Unique Border Frame */}
      <div className={`absolute inset-0 z-20 pointer-events-none rounded-[40px] border-[0.5px] ${styles.border} opacity-40`} />

      {/* Hero Visual Area */}
      <div className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-1000 grayscale-[0.5] group-hover:grayscale-0">
        {renderVisual()}
      </div>

      {/* Cinematic Gradient Fade (Persistent) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent z-10 opacity-90 transition-opacity duration-700" />

      {/* Permanent Information Panel */}
      <div className={`relative z-30 h-full p-8 sm:p-10 flex flex-col justify-end text-white pb-12`}>
        <div className={`space-y-4 transition-all duration-700`}>
          <div className="space-y-1.5 translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
            <span className={`font-mono-lux tracking-[0.6em] text-[9px] uppercase ${styles.accent} block font-bold`}>
              {styles.label || "Heritage Series"}
            </span>
            <h3 className="font-serif-lux text-3xl sm:text-4xl tracking-tighter leading-[0.9] mix-blend-plus-lighter text-white">
              {title}
            </h3>
          </div>

          <p className="text-[13px] text-white/50 font-medium leading-relaxed max-w-[95%] line-clamp-2 opacity-100 group-hover:opacity-100 transition-all duration-500 translate-y-0 group-hover:-translate-y-2">
            {description}
          </p>

          <button
            onClick={onNavigate}
            className={`card-cta mt-6 h-14 w-full bg-white text-black rounded-full font-mono-lux text-[9px] tracking-[0.5em] uppercase font-bold shadow-2xl flex items-center justify-center hover:bg-gold-accent hover:text-white transition-all transform opacity-100 group-hover:scale-[1.03] active:scale-95`}
          >
            Overview
          </button>
        </div>
      </div>
    </div>
  );
};

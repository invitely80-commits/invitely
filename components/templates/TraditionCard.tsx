import React from "react";
import dynamic from "next/dynamic";
import { type InviteTheme } from "@/lib/invites";

// Dynamic Imports for Theme Visuals (Code Splitting)
const HinduVisual = dynamic(() => import("./visuals/HinduVisual"));
const MuslimVisual = dynamic(() => import("./visuals/MuslimVisual"));
const ChristianVisual = dynamic(() => import("./visuals/ChristianVisual"));
const RoyalVisual = dynamic(() => import("./visuals/RoyalVisual"));
const SikhVisual = dynamic(() => import("./visuals/SikhVisual"));
const CivilVisual = dynamic(() => import("./visuals/CivilVisual"));
const LuxuryVisual = dynamic(() => import("./visuals/LuxuryVisual"));

/**
 * TraditionCard — Performance-optimized template card with Code Splitting.
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
  const borderGradient =
    theme === "hindu" || theme === "muslim" || theme === "royal" || theme === "luxury"
      ? "linear-gradient(to bottom right, oklch(75% 0.15 70), oklch(40% 0.1 75))"
      : "linear-gradient(to bottom right, oklch(90% 0.01 70), oklch(60% 0.01 75))";

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
      case "hindu": return <HinduVisual name={name} priority={priority} />;
      case "muslim": return <MuslimVisual name={name} priority={priority} />;
      case "christian": return <ChristianVisual name={name} priority={priority} />;
      case "royal": return <RoyalVisual name={name} priority={priority} />;
      case "sikh": return <SikhVisual name={name} priority={priority} />;
      case "civil": return <CivilVisual name={name} priority={priority} />;
      case "luxury": return <LuxuryVisual name={name} priority={priority} />;
      default: return <div className="bg-charcoal w-full h-full" />;
    }
  };

  return (
    <div
      className="template-card relative w-full aspect-[4/5] rounded-[40px] overflow-hidden group"
      style={{ isolation: "isolate" }}
    >
      <div
        className="absolute inset-0 p-[1.5px] rounded-[40px] z-20 pointer-events-none"
        style={{
          background: borderGradient,
          maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
        }}
      />

      <div className="absolute inset-0 z-0">
        {renderVisual()}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-700" />

      <div className={`relative z-30 h-full p-10 sm:p-12 flex flex-col justify-end text-silk`}>
        <div className={`card-info-panel space-y-5 ${isActive ? "card-info-active" : ""}`}>
          <div className="space-y-2">
            <span className="font-mono-lux tracking-[0.6em] text-[10px] uppercase text-gold-accent block opacity-80">
              Heritage Series
            </span>
            <h3 className="font-serif-lux text-4xl sm:text-5xl tracking-tighter leading-[0.8] mix-blend-plus-lighter">
              {title}
            </h3>
          </div>

          <p className="text-sm text-silk/60 font-medium leading-relaxed max-w-[90%] line-clamp-2">
            {description}
          </p>

          <button
            onClick={onNavigate}
            className="card-cta mt-6 h-14 w-full bg-silk text-charcoal rounded-full font-mono-lux text-[10px] tracking-[0.4em] uppercase shadow-2xl flex items-center justify-center hover:bg-gold-accent hover:text-white transition-all active:scale-95"
          >
            Experience Mood
          </button>
        </div>
      </div>
    </div>
  );
};

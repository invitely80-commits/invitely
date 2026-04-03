import React from "react";
import { Sparkles, Heart, Crown, CircleDashed } from "lucide-react";
import { type InviteTheme } from "@/lib/invites";

/**
 * Theme-specific visual for each card.
 * Pure server component — no motion values, no springs, no JS animation.
 */
const TraditionVisual = ({ theme }: { theme: InviteTheme }) => {
  const sampleNames: Record<string, string> = {
    hindu: "Aria & Julian",
    muslim: "Zayn & Myra",
    christian: "Ethan & Clara",
    minimal: "L & K",
    royal: "Siddharth & Meera",
    luxury: "The Legacy",
    sikh: "Arjun & Preet",
    civil: "Alex & Sam",
  };

  const name = sampleNames[theme] || "Our Union";

  switch (theme) {
    case "hindu":
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#570013] to-[#800020] overflow-hidden flex flex-col items-center justify-center p-12">
          <div className="absolute inset-0 bg-mandala opacity-[0.1] scale-150 rotate-12" />
          <div className="relative z-10 text-center space-y-6">
            <div className="w-20 h-20 border border-gold-accent/30 rounded-full mx-auto flex items-center justify-center">
              <Sparkles className="text-gold-accent shrink-0 size-8" strokeWidth={1} />
            </div>
            <h4 className="font-serif-lux text-5xl text-gold-accent tracking-tighter uppercase leading-none">
              {name}
            </h4>
            <div className="h-[1px] w-32 bg-gold-accent/20 mx-auto" />
            <p className="font-mono-lux text-[9px] tracking-[0.5em] text-gold-accent/40 uppercase">Auspicious Vows</p>
          </div>
        </div>
      );
    case "muslim":
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b] to-[#065f46] overflow-hidden flex flex-col items-center justify-center p-12">
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]" />
          <div className="relative z-10 text-center space-y-8">
            <Crown className="text-gold-accent/40 shrink-0 size-16 mx-auto" strokeWidth={1} />
            <h4 className="font-serif-lux text-6xl text-gold-accent tracking-tighter leading-tight">
              {name.split(" & ").map((n, i) => (
                <span key={n} className="block">{n}{i === 0 && <span className="text-gold-accent/20 mx-2 tracking-normal">&</span>}</span>
              ))}
            </h4>
          </div>
          <div className="absolute top-0 right-0 p-10 opacity-20">
            <div className="w-32 h-32 border border-silk rounded-full" />
          </div>
        </div>
      );
    case "christian":
      return (
        <div className="absolute inset-0 bg-[#fefefe] overflow-hidden flex flex-col items-center justify-center p-12">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10 text-center space-y-6">
            <Heart className="text-stone-300 shrink-0 size-10 mx-auto" strokeWidth={1} />
            <h4 className="font-serif-lux text-5xl text-charcoal tracking-tighter">
              {name}
            </h4>
            <div className="flex items-center gap-6 justify-center">
              <span className="h-[1px] w-16 bg-stone-100" />
              <span className="font-mono-lux text-[10px] tracking-[0.4em] text-stone-400 uppercase">Eternal Bond</span>
              <span className="h-[1px] w-16 bg-stone-100" />
            </div>
          </div>
        </div>
      );
    case "sikh":
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] overflow-hidden flex flex-col items-center justify-center p-12">
          <div className="absolute inset-0 bg-mandala opacity-[0.08] scale-150 -rotate-12" />
          <div className="relative z-10 text-center space-y-6">
            <div className="w-20 h-20 border border-orange-400/30 rounded-full mx-auto flex items-center justify-center">
              <Sparkles className="text-orange-400 shrink-0 size-8" strokeWidth={1} />
            </div>
            <h4 className="font-serif-lux text-5xl text-orange-300 tracking-tighter uppercase leading-none">
              {name}
            </h4>
            <div className="h-[1px] w-32 bg-orange-400/20 mx-auto" />
            <p className="font-mono-lux text-[9px] tracking-[0.5em] text-orange-300/40 uppercase">Sacred Union</p>
          </div>
        </div>
      );
    case "civil":
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c18] to-[#2a2a26] overflow-hidden flex flex-col items-center justify-center p-12">
          <div className="relative z-10 text-center space-y-8">
            <h4 className="font-serif-lux text-6xl text-silk/80 tracking-tighter leading-tight">
              {name}
            </h4>
            <div className="flex items-center gap-6 justify-center">
              <span className="h-[1px] w-20 bg-silk/10" />
              <span className="font-mono-lux text-[10px] tracking-[0.4em] text-silk/30 uppercase">Modern Story</span>
              <span className="h-[1px] w-20 bg-silk/10" />
            </div>
          </div>
        </div>
      );
    case "luxury":
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a18] overflow-hidden flex flex-col items-center justify-center p-12">
          <div className="absolute inset-0 bg-mandala opacity-[0.03] scale-200 rotate-45" />
          <div className="relative z-10 text-center space-y-8">
            <Crown className="text-gold-accent/50 shrink-0 size-14 mx-auto" strokeWidth={1} />
            <h4 className="font-serif-lux text-5xl text-gold-accent/80 tracking-tighter uppercase leading-none">
              {name}
            </h4>
            <p className="font-mono-lux text-[9px] tracking-[0.5em] text-gold-accent/30 uppercase">God Tier Heirloom</p>
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 bg-charcoal overflow-hidden flex flex-col items-center justify-center p-12">
          <div className="relative z-10 text-center space-y-10">
            <div className="w-24 h-24 border border-gold-accent/20 rounded-full flex items-center justify-center p-4">
              <CircleDashed className="size-full text-gold-accent/30 animate-spin-slow" strokeWidth={0.5} />
            </div>
            <h4 className="font-serif-lux text-4xl text-silk/30 tracking-widest leading-none uppercase">{name}</h4>
          </div>
        </div>
      );
  }
};

/**
 * TraditionCard — Performance-optimized template card.
 * 
 * BEFORE: 6 framer-motion spring instances per card (useMotionValue×2, useSpring×2, useTransform×2)
 *         + motion.div with 3D tilt + motion.button + backdrop-blur-2xl
 * AFTER:  Pure CSS hover (transform + box-shadow) via `.template-card` class
 *         Zero spring instances. Zero JS animation. `contain: layout style paint` for isolation.
 */
export const TraditionCard = ({
  theme,
  title,
  description,
  isActive,
  onNavigate,
}: {
  theme: InviteTheme;
  title: string;
  description: string;
  isActive: boolean;
  onNavigate: () => void;
}) => {
  const borderGradient =
    theme === "hindu" || theme === "muslim" || theme === "royal" || theme === "luxury"
      ? "linear-gradient(to bottom right, oklch(75% 0.15 70), oklch(40% 0.1 75))"
      : "linear-gradient(to bottom right, oklch(90% 0.01 70), oklch(60% 0.01 75))";

  return (
    <div
      className="template-card relative w-full aspect-[4/5] rounded-[40px] overflow-hidden group"
    >
      {/* 1px Luxury Border Gradient */}
      <div
        className="absolute inset-0 p-[1.5px] rounded-[40px] z-20 pointer-events-none"
        style={{
          background: borderGradient,
          maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
        }}
      />

      {/* Theme Visual */}
      <div className="absolute inset-0 z-0">
        <TraditionVisual theme={theme} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-10 opacity-60" />

      {/* Card info (CSS-driven reveal on hover) */}
      <div className={`relative z-30 h-full p-10 sm:p-12 flex flex-col justify-end text-silk`}>
        <div className={`card-info-panel space-y-5 ${isActive ? "card-info-active" : ""}`}>
          <div className="space-y-2">
            <span className="font-mono-lux tracking-[0.6em] text-[10px] uppercase text-gold-accent/80 block">
              Heritage Vol. I
            </span>
            <h3 className="font-serif-lux text-4xl sm:text-5xl tracking-tighter leading-[0.8]">
              {title}
            </h3>
          </div>

          <p className="text-sm text-silk/50 font-medium leading-relaxed max-w-[85%]">
            {description}
          </p>

          <button
            onClick={onNavigate}
            className="card-cta mt-6 h-14 w-full bg-silk text-charcoal rounded-full font-mono-lux text-[10px] tracking-[0.4em] uppercase shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center"
          >
            Preview Mood
          </button>
        </div>
      </div>
    </div>
  );
};

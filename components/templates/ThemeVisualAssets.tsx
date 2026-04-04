import React from "react";

export const getThemeCardStyles = (theme: string) => {
  switch (theme) {
    case "hindu":
      return {
        background: "bg-[#1A0F0A]",
        border: "border-gold-accent/40",
        accent: "text-[#E8D5A0]",
        pattern: "bg-mandala opacity-[0.03]",
        shadow: "shadow-[0_20px_50px_rgba(232,213,160,0.1)]",
        label: "Bespoke Heritage"
      };
    case "muslim":
      return {
        background: "bg-[#0A1A10]",
        border: "border-[#D4AF37]/30",
        accent: "text-[#E8D5A0]",
        pattern: "bg-[radial-gradient(circle_at_center,_#E8D5A0_1px,_transparent_1px)] bg-[size:32px_32px] opacity-[0.05]",
        shadow: "shadow-[0_20px_50px_rgba(212,175,55,0.1)]",
        label: "Imperial Nikah",
        clipPath: "polygon(0% 15%, 50% 0%, 100% 15%, 100% 100%, 0% 100%)" // Subtle Mughal Arch
      };
    case "christian":
      return {
        background: "bg-white/5 backdrop-blur-3xl",
        border: "border-white/20",
        accent: "text-white",
        pattern: "bg-[url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M20 20.5V18H18V20.5H15.5V22.5H18V25H20V22.5H22.5V20.5H20Z\" fill=\"%23FFFFFF\" fill-opacity=\"0.05\"/%3E%3C/svg%3E')] opacity-30",
        shadow: "shadow-[0_20px_50px_rgba(255,255,255,0.05)]",
        label: "Ethereal Grace"
      };
    case "royal":
      return {
        background: "bg-[#1C0A0A]",
        border: "border-[#C9A84C] border-[3px]",
        accent: "text-[#E8D5A0]",
        pattern: "bg-mandala opacity-[0.06] scale-125",
        shadow: "shadow-[0_30px_60px_rgba(201,168,76,0.15)]",
        label: "Imperial Collection"
      };
    case "sikh":
      return {
        background: "bg-[#0A111F]",
        border: "border-[#FF9933]/40",
        accent: "text-[#E8D5A0]",
        pattern: "bg-[linear-gradient(45deg,_transparent_48%,_#FF9933_50%,_transparent_52%)] bg-[size:40px_40px] opacity-[0.03]",
        shadow: "shadow-[0_20px_50px_rgba(255,153,51,0.08)]",
        label: "Divine Union"
      };
    case "south-indian":
      return {
        background: "bg-[#2D0A0A]",
        border: "border-[#C9A84C]/50",
        accent: "text-[#E8D5A0]",
        pattern: "bg-[radial-gradient(circle_at_center,_#E8D5A0_2px,_transparent_2px)] bg-[size:64px_64px] opacity-[0.04]",
        shadow: "shadow-[0_20px_50px_rgba(201,168,76,0.1)]",
        label: "Vedic Traditions"
      };
    case "minimal":
      return {
        background: "bg-transparent",
        border: "border-charcoal/10",
        accent: "text-charcoal",
        pattern: "",
        shadow: "none",
        label: "Simply Modern"
      };
    case "civil":
      return {
        background: "bg-[#F5F5F5]",
        border: "border-charcoal/10",
        accent: "text-charcoal",
        pattern: "bg-[linear-gradient(90deg,_rgba(0,0,0,0.02)_1px,_transparent_1px)] bg-[size:20px_20px]",
        shadow: "shadow-[0_20px_40px_rgba(0,0,0,0.03)]",
        label: "Urban Elegant"
      };
    case "luxury":
      return {
        background: "bg-black",
        border: "border-[#C9A84C]/60",
        accent: "text-[#E8D5A0]",
        pattern: "bg-grain opacity-[0.08] mix-blend-overlay",
        shadow: "shadow-[0_40px_100px_rgba(0,0,0,1)] shadow-[#C9A84C]/5",
        label: "The Heirloom"
      };
    default:
      return {
        background: "bg-charcoal/5",
        border: "border-charcoal/10",
        accent: "text-charcoal",
        pattern: "",
        shadow: "none",
        label: "Heritage series"
      };
  }
};

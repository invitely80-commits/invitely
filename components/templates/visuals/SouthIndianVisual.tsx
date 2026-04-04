"use client";

import React from "react";
import { motion } from "framer-motion";

export function LightRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-soft-light opacity-20">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <radialGradient id="ray-grad" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <motion.path
            key={i}
            d={`M500 0 L${200 + i * 150} 1000 L${300 + i * 150} 1000 Z`}
            fill="url(#ray-grad)"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ 
              duration: 4 + i, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "easeInOut" 
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function GopuramSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 400 600" 
      className={className} 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Elaborate Tiered Temple Tower (Gopuram) */}
      <path d="M150 100h100l10 20H140l10-20z" />
      <path d="M130 120h140l10 30H120l10-30z" />
      <path d="M110 150h180l15 40H95l15-40z" />
      <path d="M90 190h220l20 50H70l20-50z" />
      <path d="M70 240h260l25 70H45l25-70z" />
      <path d="M40 310h320l30 100H10l30-100z" />
      {/* Base */}
      <rect x="0" y="410" width="400" height="190" />
      {/* Detailed crown carvings */}
      <path d="M185 80h30v20h-30zM195 60h10v20h-10z" />
      <circle cx="200" cy="50" r="5" />
    </svg>
  );
}

export function RitualIcon({ type, size = 120 }: { type: 'fire' | 'jasmine' | 'mangalsutra' | 'nadaswaram', size?: number }) {
  const icons = {
    fire: (
      <g>
        <path d="M50 85c-15 0-25-10-25-25 0-15 15-35 25-50 10 15 25 35 25 50 0 15-10 25-25 25z" fill="#FF8C00" opacity="0.6" />
        <path d="M50 80c-10 0-18-8-18-18 0-10 10-25 18-35 8 10 18 25 18 35 0 10-8 18-18 18z" fill="#FF4500" />
        <path d="M20 85h60v5H20z" fill="#4B2D1B" />
      </g>
    ),
    jasmine: (
      <g transform="translate(50,50)">
        {[0, 72, 144, 216, 288].map(a => (
          <ellipse key={a} cx="0" cy="-20" rx="10" ry="25" fill="#fff" transform={`rotate(${a})`} />
        ))}
        <circle r="8" fill="#F4E99B" />
      </g>
    ),
    mangalsutra: (
      <g stroke="#C9A84C" strokeWidth="2" fill="none">
        <path d="M20 40c0 30 25 50 30 50s30-20 30-50" />
        <circle cx="50" cy="90" r="8" fill="#C9A84C" />
        <circle cx="50" cy="90" r="4" fill="#000" />
      </g>
    ),
    nadaswaram: (
      <g fill="#A0522D">
        <path d="M45 10h10l5 70 15 10v5H25v-5l15-10 5-70z" />
        {[25, 40, 55].map(y => <circle key={y} cx="50" cy={y} r="2" fill="#C9A84C" />)}
      </g>
    )
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {icons[type]}
    </svg>
  );
}

export function AnimatedBirds() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: -100, y: 100 + i * 50 }}
          animate={{ x: 1200, y: 50 + i * 20 }}
          transition={{ 
            duration: 20 + i * 2, 
            repeat: Infinity, 
            delay: i * 3,
            ease: "linear" 
          }}
        >
          <svg width="20" height="10" viewBox="0 0 20 10">
            <motion.path
              d="M0 5 Q5 0 10 5 Q15 0 20 5"
              stroke="#000"
              strokeWidth="1"
              fill="none"
              animate={{ d: ["M0 5 Q5 0 10 5 Q15 0 20 5", "M0 5 Q5 10 10 5 Q15 10 20 5"] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
import Image from "next/image";

export default function SouthIndianVisual({ name, priority }: { name: string; priority?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#8B1A1A]">
      <Image
        src="/images/templates/south-indian/hero_god_tier.png"
        alt="South Indian Heritage"
        fill
        priority={priority}
        className="object-cover opacity-60 group-hover:scale-110 transition-all duration-1000"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B1A1A]/80 to-[#A52A2A]/40 mix-blend-multiply" />
      <LightRays />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center space-y-8">
        <GopuramSilhouette className="text-gold-accent/20 h-48 absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none" />
        <h3 className="font-serif-lux text-5xl text-gold-accent tracking-tighter uppercase leading-[0.85] drop-shadow-2xl">
           {name}
        </h3>
        <p className="font-mono-lux text-[10px] tracking-[0.5em] text-gold-accent/50 uppercase">Vedic Heirloom</p>
      </div>
    </div>
  );
}

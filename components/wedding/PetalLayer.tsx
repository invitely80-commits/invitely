"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PetalConfig {
  id: number;
  left: number; // percentage
  top: number;  // percentage
  size: number; // pixels
  rotation: number;
  duration: number;
  delay: number;
  swayX: number;
  swayY: number;
}

const PETALS: PetalConfig[] = [
  { id: 1, left: 16, top: 9, size: 20, rotation: 15, duration: 13, delay: 0, swayX: 12, swayY: 18 },
  { id: 2, left: 84, top: 15, size: 18, rotation: -30, duration: 15, delay: 1.5, swayX: -14, swayY: 16 },
  { id: 3, left: 74, top: 35, size: 22, rotation: 45, duration: 12, delay: 0.8, swayX: -10, swayY: 20 },
  { id: 4, left: 12, top: 48, size: 16, rotation: -20, duration: 14, delay: 2.2, swayX: 14, swayY: 18 },
  { id: 5, left: 88, top: 65, size: 22, rotation: 60, duration: 16, delay: 1.1, swayX: -16, swayY: 22 },
  { id: 6, left: 20, top: 78, size: 18, rotation: -45, duration: 13.5, delay: 2.8, swayX: 12, swayY: 16 },
  { id: 7, left: 78, top: 88, size: 18, rotation: 25, duration: 14.5, delay: 0.5, swayX: -10, swayY: 18 },
  { id: 8, left: 50, top: 44, size: 15, rotation: -10, duration: 17, delay: 3.5, swayX: 8, swayY: 22 },
];

export function PetalLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
      {/* Static corner cluster overlay from reference - clean transparent alpha */}
      <div className="absolute top-8 right-6 w-14 sm:w-20 h-24 sm:h-32 opacity-75">
        <Image
          src="/wedding/decorations/petals.webp"
          alt=""
          fill
          sizes="80px"
          className="object-contain"
        />
      </div>

      <div className="absolute bottom-10 left-6 w-14 sm:w-20 h-24 sm:h-32 opacity-75 scale-x-[-1]">
        <Image
          src="/wedding/decorations/petals.webp"
          alt=""
          fill
          sizes="80px"
          className="object-contain"
        />
      </div>

      {/* Floating animated drifting petals with true alpha */}
      {PETALS.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.25, 0.6, 0.35, 0.25],
            x: [0, p.swayX, -p.swayX * 0.7, 0],
            y: [0, p.swayY, p.swayY * 0.5, 0],
            rotate: [p.rotation, p.rotation + 20, p.rotation - 10, p.rotation],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          {/* Stylized Rose Petal Vector */}
          <svg viewBox="0 0 40 46" fill="none" className="w-full h-full">
            <path
              d="M19.5 2C10.5 7.5 3 20 5.5 32C7.5 41.5 19 44.5 25.5 42C33.5 39 37 28.5 35 18C33.5 10 26 3.5 19.5 2Z"
              fill="url(#rose-petal-grad-clean)"
              opacity="0.85"
            />
            <path
              d="M20 10C17 18 16 28 21 37"
              stroke="#FCE7F3"
              strokeWidth="0.7"
              strokeLinecap="round"
              opacity="0.4"
            />
            <defs>
              <linearGradient id="rose-petal-grad-clean" x1="6" y1="4" x2="33" y2="42" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F472B6" />
                <stop offset="0.5" stopColor="#E11D48" />
                <stop offset="1" stopColor="#9F1239" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

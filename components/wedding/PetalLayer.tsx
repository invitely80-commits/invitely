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
  { id: 1, left: 12, top: 8, size: 28, rotation: 15, duration: 12, delay: 0, swayX: 18, swayY: 25 },
  { id: 2, left: 88, top: 14, size: 24, rotation: -30, duration: 14, delay: 1.5, swayX: -22, swayY: 20 },
  { id: 3, left: 78, top: 38, size: 32, rotation: 45, duration: 11, delay: 0.8, swayX: -16, swayY: 30 },
  { id: 4, left: 8, top: 52, size: 22, rotation: -20, duration: 13, delay: 2.2, swayX: 20, swayY: 24 },
  { id: 5, left: 92, top: 68, size: 30, rotation: 60, duration: 15, delay: 1.1, swayX: -25, swayY: 28 },
  { id: 6, left: 16, top: 82, size: 26, rotation: -45, duration: 12.5, delay: 2.8, swayX: 18, swayY: 22 },
  { id: 7, left: 82, top: 92, size: 24, rotation: 25, duration: 13.5, delay: 0.5, swayX: -15, swayY: 26 },
  { id: 8, left: 50, top: 48, size: 20, rotation: -10, duration: 16, delay: 3.5, swayX: 14, swayY: 32 },
];

export function PetalLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
      {/* Static corner cluster overlay from reference */}
      <div className="absolute top-12 right-6 w-32 h-44 opacity-60 mix-blend-multiply">
        <Image
          src="/wedding/decorations/petals.webp"
          alt=""
          fill
          sizes="128px"
          className="object-contain"
        />
      </div>

      <div className="absolute bottom-16 left-6 w-32 h-44 opacity-50 mix-blend-multiply scale-x-[-1]">
        <Image
          src="/wedding/decorations/petals.webp"
          alt=""
          fill
          sizes="128px"
          className="object-contain"
        />
      </div>

      {/* Floating animated drifting petals */}
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
            opacity: [0.65, 0.95, 0.7, 0.65],
            x: [0, p.swayX, -p.swayX * 0.7, 0],
            y: [0, p.swayY, p.swayY * 0.5, 0],
            rotate: [p.rotation, p.rotation + 25, p.rotation - 15, p.rotation],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          {/* Stylized Rose Petal Vector for ultra-crisp resolution at any zoom */}
          <svg viewBox="0 0 40 46" fill="none" className="w-full h-full drop-shadow-sm">
            <path
              d="M19.5 2C10.5 7.5 3 20 5.5 32C7.5 41.5 19 44.5 25.5 42C33.5 39 37 28.5 35 18C33.5 10 26 3.5 19.5 2Z"
              fill="url(#rose-petal-grad)"
              opacity="0.88"
            />
            <path
              d="M20 10C17 18 16 28 21 37"
              stroke="#FCE7F3"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.45"
            />
            <defs>
              <linearGradient id="rose-petal-grad" x1="6" y1="4" x2="33" y2="42" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F472B6" />
                <stop offset="0.45" stopColor="#E11D48" />
                <stop offset="1" stopColor="#9F1239" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

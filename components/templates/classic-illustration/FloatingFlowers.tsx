"use client";

import React from "react";
import { motion } from "framer-motion";

// SVG Lotus Flower
export function LotusFlower({
  className = "w-10 h-10",
  opacity = 0.9,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Outer Petals */}
      <path
        d="M50 78 C30 75 12 60 18 45 C24 32 40 45 50 78 Z"
        fill="url(#lotus-outer)"
        opacity="0.85"
      />
      <path
        d="M50 78 C70 75 88 60 82 45 C76 32 60 45 50 78 Z"
        fill="url(#lotus-outer)"
        opacity="0.85"
      />
      {/* Mid Petals */}
      <path
        d="M50 78 C34 68 24 50 32 32 C38 22 48 40 50 78 Z"
        fill="url(#lotus-mid)"
      />
      <path
        d="M50 78 C66 68 76 50 68 32 C62 22 52 40 50 78 Z"
        fill="url(#lotus-mid)"
      />
      {/* Center Main Petal */}
      <path
        d="M50 80 C42 60 40 30 50 18 C60 30 58 60 50 80 Z"
        fill="url(#lotus-core)"
      />
      {/* Golden Pistil / Stamen */}
      <ellipse cx="50" cy="74" rx="8" ry="4" fill="#FFD54F" opacity="0.9" />
      <circle cx="50" cy="72" r="3" fill="#FFA000" />

      <defs>
        <linearGradient id="lotus-outer" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#C2185B" />
          <stop offset="70%" stopColor="#F48FB1" />
          <stop offset="100%" stopColor="#FFF0F5" />
        </linearGradient>
        <linearGradient id="lotus-mid" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#D81B60" />
          <stop offset="70%" stopColor="#F06292" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id="lotus-core" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#E91E63" />
          <stop offset="60%" stopColor="#F8BBD0" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Single Floating Lotus Petal
export function LotusPetal({
  className = "w-6 h-6",
  color = "#F06292",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 40 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 5 C10 20 5 35 10 48 C15 56 25 56 30 48 C35 35 30 20 20 5 Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M20 12 C18 24 16 38 20 48"
        stroke="#FFF"
        strokeWidth="1.2"
        opacity="0.4"
      />
    </svg>
  );
}

// Interactive floating flowers particle layer
export function FloatingFlowers({ isPondStage = false }: { isPondStage?: boolean }) {
  // Array of drifting floating elements with natural random offsets
  const floatingElements = [
    { id: 1, type: "flower", x: 12, y: 72, size: "w-14 h-14", duration: 8, delay: 0, rangeX: 18, rangeY: 12 },
    { id: 2, type: "flower", x: 84, y: 76, size: "w-16 h-16", duration: 9.5, delay: 1, rangeX: -16, rangeY: 10 },
    { id: 3, type: "flower", x: 26, y: 84, size: "w-12 h-12", duration: 7, delay: 2, rangeX: 14, rangeY: -10 },
    { id: 4, type: "flower", x: 70, y: 86, size: "w-14 h-14", duration: 8.5, delay: 0.5, rangeX: -12, rangeY: -14 },
    { id: 5, type: "petal", x: 18, y: 35, size: "w-6 h-9", duration: 11, delay: 0.2, rangeX: 25, rangeY: 20 },
    { id: 6, type: "petal", x: 80, y: 40, size: "w-7 h-10", duration: 12, delay: 1.5, rangeX: -22, rangeY: 25 },
    { id: 7, type: "petal", x: 45, y: 60, size: "w-5 h-8", duration: 10, delay: 2.5, rangeX: 16, rangeY: -18 },
    { id: 8, type: "petal", x: 62, y: 25, size: "w-6 h-9", duration: 13, delay: 3, rangeX: -18, rangeY: 22 },
    { id: 9, type: "flower", x: 6, y: 88, size: "w-20 h-20", duration: 9, delay: 1.8, rangeX: 10, rangeY: 8 },
    { id: 10, type: "flower", x: 90, y: 88, size: "w-20 h-20", duration: 10.5, delay: 2.2, rangeX: -10, rangeY: 8 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {floatingElements.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
          animate={{
            x: [0, item.rangeX, 0, -item.rangeX * 0.7, 0],
            y: [0, item.rangeY, 0, -item.rangeY * 0.8, 0],
            rotate: [0, item.rangeX > 0 ? 8 : -8, 0, item.rangeX > 0 ? -5 : 5, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          {item.type === "flower" ? (
            <div className="relative group">
              {/* Soft water ripple beneath floating lotus flowers */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.35, 0.05, 0.35],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
                className="absolute inset-0 -m-3 rounded-full border border-pink-300/40 pointer-events-none"
              />
              <LotusFlower className={item.size} opacity={isPondStage ? 0.95 : 0.85} />
            </div>
          ) : (
            <LotusPetal className={item.size} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

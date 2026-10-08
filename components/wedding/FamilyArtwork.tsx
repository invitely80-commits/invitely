"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FamilyArtworkProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function FamilyArtwork({ src, alt, priority = false }: FamilyArtworkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-[760px] mx-auto my-1 sm:my-2 select-none"
    >
      {/* 
        Layer 3: Family scene illustration
        - Zero card styling: no borders, no shadows, no rounded corners, no cards
        - Transparent feathered alpha edges melt naturally into the continuous parchment canvas
        - Architectural subject remains tack-sharp in center
      */}
      <div className="relative w-full aspect-[16/9.2] mx-auto flex items-center justify-center">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 96vw, (max-width: 1024px) 720px, 760px"
          className="object-contain object-center"
        />
      </div>
    </motion.div>
  );
}

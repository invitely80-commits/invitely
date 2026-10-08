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
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[540px] sm:max-w-[620px] mx-auto my-5 sm:my-7 select-none"
    >
      {/* Aspect ratio container preserving full architectural composition without cropping */}
      <div className="relative w-full aspect-[16/9.2] overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 580px, 620px"
          className="object-contain object-center [mask-image:radial-gradient(ellipse_92%_90%_at_50%_50%,black_82%,transparent_100%)]"
        />

        {/* Soft atmospheric warmth blending with parchment base */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#F8F3E8]/10 to-[#F8F3E8]/40 pointer-events-none" />
      </div>
    </motion.div>
  );
}

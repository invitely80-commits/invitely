"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function BotanicalDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {/* 1. TOP-LEFT PALM FRONDS */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: -20 }}
        animate={{ opacity: 0.85, x: 0, y: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-6 -left-8 w-44 sm:w-64 md:w-80 h-56 sm:h-80 md:h-96"
      >
        <Image
          src="/wedding/decorations/palm-left.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 256px, 320px"
          className="object-contain object-top-left"
        />
      </motion.div>

      {/* 2. TOP-RIGHT PALM FRONDS */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: -20 }}
        animate={{ opacity: 0.85, x: 0, y: 0 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-6 -right-8 w-44 sm:w-64 md:w-84 h-56 sm:h-80 md:h-96"
      >
        <Image
          src="/wedding/decorations/palm-right.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 256px, 336px"
          className="object-contain object-top-right"
        />
      </motion.div>

      {/* 3. TOP HANGING JASMINE GARLAND (MOGRA THORANAM) */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 0.75, y: 0 }}
        transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-12 sm:left-24 w-20 sm:w-28 h-40 sm:h-56"
      >
        <Image
          src="/wedding/decorations/jasmine-garland.webp"
          alt=""
          fill
          sizes="112px"
          className="object-contain object-top"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 0.75, y: 0 }}
        transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-12 sm:right-24 w-20 sm:w-28 h-40 sm:h-56 scale-x-[-1]"
      >
        <Image
          src="/wedding/decorations/jasmine-garland.webp"
          alt=""
          fill
          sizes="112px"
          className="object-contain object-top"
        />
      </motion.div>

      {/* 4. MID-LEFT BOTANICAL SPRAY (BETWEEN FAMILIES) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.65, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute top-[42%] -left-8 sm:-left-4 w-32 sm:w-48 h-40 sm:h-64"
      >
        <Image
          src="/wedding/decorations/palm-left.webp"
          alt=""
          fill
          sizes="192px"
          className="object-contain object-left"
        />
      </motion.div>

      {/* 5. MID-RIGHT BOTANICAL SPRAY */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 0.65, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="absolute top-[46%] -right-8 sm:-right-4 w-32 sm:w-48 h-40 sm:h-64"
      >
        <Image
          src="/wedding/decorations/palm-right.webp"
          alt=""
          fill
          sizes="192px"
          className="object-contain object-right"
        />
      </motion.div>

      {/* 6. BOTTOM-LEFT CORNER BOUGAINVILLEA & PALM ACCENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute -bottom-10 -left-6 w-48 sm:w-64 h-48 sm:h-64"
      >
        <Image
          src="/wedding/decorations/flowers.webp"
          alt=""
          fill
          sizes="256px"
          className="object-contain object-bottom-left"
        />
      </motion.div>

      {/* 7. BOTTOM-RIGHT CORNER PALM & FLORAL ACCENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 0.75, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute -bottom-8 -right-6 w-44 sm:w-60 h-44 sm:h-60"
      >
        <Image
          src="/wedding/decorations/palm-right.webp"
          alt=""
          fill
          sizes="240px"
          className="object-contain object-bottom-right"
        />
      </motion.div>
    </div>
  );
}

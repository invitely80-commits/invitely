"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function BotanicalFrame() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none"
      aria-hidden="true"
    >
      {/* 1. TOP-LEFT BOTANICAL SPRAY (TRUE ALPHA, ANCHORED TO CANVAS EDGE) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-32 sm:w-48 md:w-56 h-48 sm:h-72 md:h-84"
      >
        <Image
          src="/wedding/decorations/palm-left.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 160px, 224px"
          className="object-contain object-top-left"
        />
      </motion.div>

      {/* 2. TOP-RIGHT BOTANICAL SPRAY (TRUE ALPHA) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 w-32 sm:w-48 md:w-56 h-48 sm:h-72 md:h-84"
      >
        <Image
          src="/wedding/decorations/palm-right.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 160px, 224px"
          className="object-contain object-top-right"
        />
      </motion.div>

      {/* 3. MID-LEFT BOTANICAL SPRAY (FLANKING FIRST FAMILY LINEAGE) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute top-[27%] left-0 w-28 sm:w-40 md:w-48 h-40 sm:h-60 md:h-72"
      >
        <Image
          src="/wedding/decorations/palm-mid-left.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 140px, 192px"
          className="object-contain object-left"
        />
      </motion.div>

      {/* 4. MID-RIGHT BOTANICAL SPRAY */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="absolute top-[32%] right-0 w-28 sm:w-40 md:w-48 h-40 sm:h-60 md:h-72"
      >
        <Image
          src="/wedding/decorations/palm-mid-right.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 140px, 192px"
          className="object-contain object-right"
        />
      </motion.div>

      {/* 5. LOWER-LEFT BOTANICAL SPRAY (FLANKING SECOND FAMILY LINEAGE) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute top-[77%] left-0 w-28 sm:w-44 md:w-52 h-44 sm:h-64 md:h-76"
      >
        <Image
          src="/wedding/decorations/palm-bottom-left.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 140px, 208px"
          className="object-contain object-left"
        />
      </motion.div>

      {/* 6. LOWER-RIGHT BOTANICAL SPRAY */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="absolute top-[81%] right-0 w-28 sm:w-44 md:w-52 h-44 sm:h-64 md:h-76"
      >
        <Image
          src="/wedding/decorations/palm-bottom-right.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 140px, 208px"
          className="object-contain object-right"
        />
      </motion.div>
    </div>
  );
}

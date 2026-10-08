"use client";

import React from "react";
import { motion } from "framer-motion";
import { FamilyArtwork } from "./FamilyArtwork";
import { FloralDivider } from "./FloralDivider";

export interface LineageEntry {
  paternal: string;
  maternal?: string;
}

export interface FamilyData {
  id: string;
  name: string;
  artwork: string;
  artworkAlt: string;
  grandparents: string[];
  parents: string[];
}

interface FamilySectionProps {
  family: FamilyData;
  isFirst?: boolean;
}

export function FamilySection({ family, isFirst = false }: FamilySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-2xl mx-auto text-center px-4 sm:px-6 my-6 sm:my-8"
      aria-labelledby={`family-heading-${family.id}`}
    >
      {/* 1. FAMILY PRE-HEADER */}
      <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.38em] text-[#63534B] font-medium mb-1.5 select-none">
        The Family Of
      </p>

      {/* 2. FAMILY MAIN NAME */}
      <h2
        id={`family-heading-${family.id}`}
        className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-[0.24em] text-[#821919] font-normal uppercase leading-tight select-none"
      >
        {family.name}
      </h2>

      {/* 3. FLORET BULLET */}
      <div className="flex items-center justify-center my-2 text-[#821919]" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 opacity-80">
          <path d="M12 2L14.2 8.5L20.8 6.5L16.2 12L20.8 17.5L14.2 15.5L12 22L9.8 15.5L3.2 17.5L7.8 12L3.2 6.5L9.8 8.5L12 2Z" />
        </svg>
      </div>

      {/* 4. HERITAGE ARCHITECTURAL ARTWORK */}
      <FamilyArtwork
        src={family.artwork}
        alt={family.artworkAlt}
        priority={isFirst}
      />

      {/* 5. GRANDPARENTS LINEAGE */}
      <div className="space-y-1.5 max-w-md mx-auto pt-1">
        <h3 className="font-serif italic text-base sm:text-lg text-[#821919] font-light">
          Grandparents
        </h3>

        <div className="space-y-2.5 font-serif text-xs sm:text-sm text-[#2D231E] leading-relaxed">
          {family.grandparents.map((names, idx) => (
            <p key={idx} className="tracking-wide">
              {names}
            </p>
          ))}
        </div>
      </div>

      {/* 6. FLORAL SEPARATOR BETWEEN GRANDPARENTS & PARENTS */}
      <FloralDivider variant="mini" />

      {/* 7. PARENTS LINEAGE */}
      <div className="space-y-1 max-w-md mx-auto">
        <h3 className="font-serif italic text-base sm:text-lg text-[#821919] font-light">
          Parents
        </h3>

        <div className="font-serif text-xs sm:text-sm text-[#2D231E] leading-relaxed">
          {family.parents.map((names, idx) => (
            <p key={idx} className="tracking-wide">
              {names}
            </p>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

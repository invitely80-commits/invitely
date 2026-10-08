"use client";

import React from "react";
import { motion } from "framer-motion";
import { FamilyArtwork } from "./FamilyArtwork";

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
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 w-full text-center px-2 sm:px-6 my-1 select-none"
      aria-labelledby={`family-heading-${family.id}`}
    >
      {/* 1. UNDERSTATED PRE-HEADER LABEL */}
      <p className="font-serif text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-[#7A6A60] font-normal mb-0.5">
        The Family Of
      </p>

      {/* 2. PROMINENT FAMILY NAME DIRECTLY ANCHORED TO ARTWORK */}
      <h2
        id={`family-heading-${family.id}`}
        className="font-serif text-3xl sm:text-4xl md:text-[42px] tracking-[0.24em] text-[#821919] font-normal uppercase leading-tight my-0.5"
      >
        {family.name}
      </h2>

      {/* 3. DELICATE DIAMOND FLORET MOTIF */}
      <div className="flex items-center justify-center my-1 text-[#821919]" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5 opacity-80">
          <path d="M8 1L10 6.5L15 8L10 9.5L8 15L6 9.5L1 8L6 6.5L8 1Z" />
        </svg>
      </div>

      {/* 4. PRIMARY FAMILY ARTWORK (OCCUPIES FULL COLUMN, PURE EMBEDDING) */}
      <FamilyArtwork
        src={family.artwork}
        alt={family.artworkAlt}
        priority={isFirst}
      />

      {/* 5. GRANDPARENTS LINEAGE WITH FLORET RULE */}
      {family.grandparents && family.grandparents.length > 0 && (
        <div className="max-w-md mx-auto pt-1 sm:pt-1.5">
          <h3 className="font-serif italic text-base sm:text-lg text-[#821919] font-normal tracking-wide">
            Grandparents
          </h3>

          {/* Reference: thin rule with centered diamond floret: ─── ❖ ─── */}
          <div className="flex items-center justify-center my-1 text-[#821919]" aria-hidden="true">
            <div className="w-10 sm:w-14 h-[0.75px] bg-[#821919]/50" />
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-2 h-2 mx-1.5 opacity-80">
              <path d="M8 1L10 6.5L15 8L10 9.5L8 15L6 9.5L1 8L6 6.5L8 1Z" />
            </svg>
            <div className="w-10 sm:w-14 h-[0.75px] bg-[#821919]/50" />
          </div>

          <div className="space-y-1.5 font-serif text-xs sm:text-[13.5px] md:text-sm text-[#2D231E] leading-relaxed tracking-wide">
            {family.grandparents.map((names, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {names}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 6. FLORAL BULLET SEPARATOR BETWEEN GRANDPARENTS & PARENTS */}
      {family.grandparents &&
        family.grandparents.length > 0 &&
        family.parents &&
        family.parents.length > 0 && (
          <div className="flex items-center justify-center my-2 text-[#821919]" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5 opacity-75">
              <path d="M8 1L10 6.5L15 8L10 9.5L8 15L6 9.5L1 8L6 6.5L8 1Z" />
            </svg>
          </div>
        )}

      {/* 7. PARENTS LINEAGE */}
      {family.parents && family.parents.length > 0 && (
        <div className="max-w-md mx-auto">
          <h3 className="font-serif italic text-base sm:text-lg text-[#821919] font-normal tracking-wide mb-0.5">
            Parents
          </h3>

          <div className="space-y-1 font-serif text-xs sm:text-[13.5px] md:text-sm text-[#2D231E] leading-relaxed tracking-wide">
            {family.parents.map((names, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {names}
              </p>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}

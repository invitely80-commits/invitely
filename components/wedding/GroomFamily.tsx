"use client";

import React from "react";
import Image from "next/image";

export interface FamilyData {
  id: string;
  name: string;
  artwork?: string;
  artworkAlt?: string;
  grandparents: string[];
  parents: string[];
}

interface GroomFamilyProps {
  family: FamilyData;
}

export function GroomFamily({ family }: GroomFamilyProps) {
  return (
    <section className="relative z-20 w-full text-center px-[4cqw] mt-[3.2cqw]">
      {/* 1. PRE-HEADER LABEL */}
      <p className="font-cormorant text-[1.4cqw] uppercase tracking-[0.32em] text-[#7A6A60] font-normal mb-[0.2cqw]">
        The Family Of
      </p>

      {/* 2. FAMILY / GROOM NAME */}
      <h2 className="font-cormorant text-[5.2cqw] tracking-[0.2em] text-[#821919] font-medium uppercase leading-tight my-0">
        {family.name}
      </h2>

      {/* 3. DIAMOND FLORET */}
      <div className="flex items-center justify-center my-[0.8cqw] text-[#C29B63]" aria-hidden="true">
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-[1.6cqw] h-[1.6cqw] opacity-85 max-w-[16px] max-h-[16px]"
          style={{ width: "1.6cqw", height: "1.6cqw", maxWidth: "16px", maxHeight: "16px" }}
        >
          <path d="M8 1L10 6.5L15 8L10 9.5L8 15L6 9.5L1 8L6 6.5L8 1Z" />
        </svg>
      </div>

      {/* 4. HERITAGE HOUSE ILLUSTRATION */}
      <div className="relative w-[88cqw] mx-auto aspect-[880/305] my-[0.4cqw]">
        <Image
          src={family.artwork || "/wedding/scenes/heritage-house-clean.webp"}
          alt={family.artworkAlt || `Ancestral Heritage Home of ${family.name}'s Family`}
          fill
          priority
          sizes="88cqw"
          className="object-contain"
        />
      </div>

      {/* 5. GRANDPARENTS LINEAGE */}
      {family.grandparents && family.grandparents.length > 0 && (
        <div className="max-w-[62cqw] mx-auto pt-[0.6cqw]">
          <h3 className="font-cormorant italic text-[2.1cqw] text-[#8B2626] font-normal tracking-[0.02em] m-0">
            Grandparents
          </h3>

          {/* Thin ornament rule: ─── ❖ ─── */}
          <div className="flex items-center justify-center my-[0.5cqw] text-[#C29B63]" aria-hidden="true">
            <div className="w-[10cqw] h-[1px] bg-[#C29B63]/70" />
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-[1.3cqw] h-[1.3cqw] mx-[0.8cqw] opacity-85 max-w-[14px] max-h-[14px]"
              style={{ width: "1.3cqw", height: "1.3cqw", maxWidth: "14px", maxHeight: "14px" }}
            >
              <path d="M8 1L10 6.5L15 8L10 9.5L8 15L6 9.5L1 8L6 6.5L8 1Z" />
            </svg>
            <div className="w-[10cqw] h-[1px] bg-[#C29B63]/70" />
          </div>

          <div className="font-cormorant text-[1.65cqw] text-[#332A24] leading-[1.38] tracking-[0.015em] space-y-[0.35cqw]">
            {family.grandparents.map((names, idx) => (
              <p key={idx} className="whitespace-pre-line m-0">
                {names}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 6. FLORET BULLET BETWEEN GRANDPARENTS & PARENTS */}
      {family.parents && family.parents.length > 0 && (
        <>
          <div className="flex items-center justify-center my-[0.6cqw] text-[#C29B63]" aria-hidden="true">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-[1.3cqw] h-[1.3cqw] opacity-80 max-w-[14px] max-h-[14px]"
              style={{ width: "1.3cqw", height: "1.3cqw", maxWidth: "14px", maxHeight: "14px" }}
            >
              <path d="M8 1L10 6.5L15 8L10 9.5L8 15L6 9.5L1 8L6 6.5L8 1Z" />
            </svg>
          </div>

          {/* 7. PARENTS LINEAGE */}
          <div className="max-w-[62cqw] mx-auto">
            <h3 className="font-cormorant italic text-[2.1cqw] text-[#8B2626] font-normal tracking-[0.02em] m-0">
              Parents
            </h3>
            <div className="font-cormorant text-[1.65cqw] text-[#332A24] leading-[1.38] tracking-[0.015em] pt-[0.3cqw]">
              {family.parents.map((names, idx) => (
                <p key={idx} className="whitespace-pre-line m-0">
                  {names}
                </p>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

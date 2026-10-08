"use client";

import React from "react";
import Image from "next/image";

interface SectionTheWeddingProps {
  weddingDate?: string;
  ceremonyTime?: string;
  venueName?: string;
  venueCity?: string;
  events?: Array<{
    id?: string;
    title: string;
    date: string;
    time?: string;
    venue?: string;
  }>;
}

/**
 * SectionTheWedding
 * 
 * Page 2 — The Wedding Ceremony.
 * Tightened editorial composition inside the continuous parchment invitation.
 * Directly connects the title, ceremony details, large temple lake mandap, and 3 event vignettes.
 */
export function SectionTheWedding({
  weddingDate = "12 JAN 2027",
  ceremonyTime = "9:00 AM – 11:30 AM",
  venueName = "The Leela Palace",
  venueCity = "Bengaluru",
  events = [],
}: SectionTheWeddingProps) {
  // Find key event dates or fallbacks
  const engagement = events.find((e) => e.title.toLowerCase().includes("engage")) || {
    title: "ENGAGEMENT",
    date: "11 JAN 2027",
  };
  const muhurtham = events.find((e) => e.title.toLowerCase().includes("muhurth")) || {
    title: "MUHURTHAM",
    date: weddingDate,
  };
  const reception = events.find((e) => e.title.toLowerCase().includes("recept")) || {
    title: "RECEPTION",
    date: weddingDate,
  };

  return (
    <section
      id="wedding"
      aria-label="The Wedding Ceremony"
      className="relative z-20 w-full flex flex-col items-center pt-[2cqw]"
    >
      {/* 1. TITLE & CEREMONY DETAILS (TIGHT & CONNECTED) */}
      <div className="w-full text-center px-[6cqw]">
        <h2 className="font-cormorant text-[5.8cqw] leading-tight text-[#821919] font-normal tracking-[0.02em] m-0">
          The Wedding
        </h2>

        {/* Delicate divider with 8-petal mandala rosette */}
        <div className="w-[30cqw] max-w-[200px] mx-auto my-[1.1cqw] flex items-center justify-center text-[#C29B63]" aria-hidden="true">
          <div className="flex-1 h-[0.75px] bg-gradient-to-r from-transparent to-[#C29B63]" />
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[2.2cqw] h-[2.2cqw] mx-[1.2cqw] opacity-90 max-w-[18px] max-h-[18px]"
            style={{ width: "2.2cqw", height: "2.2cqw", maxWidth: "18px", maxHeight: "18px" }}
          >
            <circle cx="12" cy="12" r="2.2" />
            <path d="M12 2C11.2 5 12.8 5 12 8C11.2 5 12.8 5 12 2Z" />
            <path d="M12 22C11.2 19 12.8 19 12 16C11.2 19 12.8 19 12 22Z" />
            <path d="M2 12C5 11.2 5 12.8 8 12C5 11.2 5 12.8 2 12Z" />
            <path d="M22 12C19 11.2 19 12.8 16 12C19 11.2 19 12.8 22 12Z" />
          </svg>
          <div className="flex-1 h-[0.75px] bg-gradient-to-l from-transparent to-[#C29B63]" />
        </div>

        {/* Date, Time, Venue directly following heading */}
        <p className="font-cormorant text-[1.85cqw] text-[#332A24] font-medium tracking-[0.04em] m-0">
          {weddingDate} • {ceremonyTime}
        </p>
        <p className="font-cormorant text-[1.55cqw] text-[#7A6A60] tracking-[0.03em] mt-[0.3cqw] m-0">
          {venueName}, {venueCity}
        </p>
      </div>

      {/* 2. LARGE SACRED MANDAP ILLUSTRATION (INTEGRATED INTO PARCHMENT) */}
      <div className="relative w-[92cqw] aspect-[1774/887] my-[2.5cqw]">
        <Image
          src="/wedding/scenes/heritage-mandap-clean.webp"
          alt="Sacred Temple Lake Wedding Mandap"
          fill
          priority
          sizes="92cqw"
          className="object-contain"
        />
      </div>

      {/* 3. SUPPORTING EVENT PREVIEWS (EDITORIAL VIGNETTES) */}
      <div className="w-[90cqw] grid grid-cols-3 gap-[2cqw] text-center pt-[0.5cqw]">
        {/* Vignette 1: Engagement */}
        <div className="flex flex-col items-center">
          <div className="relative w-[24cqw] aspect-[4/3] mb-[1cqw]">
            <Image
              src="/wedding/events/heritage-engagement-clean.webp"
              alt="Engagement ceremony illustration"
              fill
              sizes="25cqw"
              className="object-contain"
            />
          </div>
          <h3 className="font-cormorant uppercase text-[1.6cqw] tracking-[0.22em] text-[#821919] font-medium m-0">
            {engagement.title}
          </h3>
          <p className="font-cormorant text-[1.3cqw] text-[#7A6A60] mt-[0.25cqw] mb-[0.6cqw]">
            {engagement.date}
          </p>
          <div className="w-[8cqw] h-[0.75px] bg-[#C29B63]/60 mx-auto" />
        </div>

        {/* Vignette 2: Muhurtham */}
        <div className="flex flex-col items-center">
          <div className="relative w-[24cqw] aspect-[4/3] mb-[1cqw]">
            <Image
              src="/wedding/events/heritage-muhurtham-clean.webp"
              alt="Muhurtham sacred ceremony illustration"
              fill
              sizes="25cqw"
              className="object-contain"
            />
          </div>
          <h3 className="font-cormorant uppercase text-[1.6cqw] tracking-[0.22em] text-[#821919] font-medium m-0">
            {muhurtham.title}
          </h3>
          <p className="font-cormorant text-[1.3cqw] text-[#7A6A60] mt-[0.25cqw] mb-[0.6cqw]">
            {muhurtham.date}
          </p>
          <div className="w-[8cqw] h-[0.75px] bg-[#C29B63]/60 mx-auto" />
        </div>

        {/* Vignette 3: Reception */}
        <div className="flex flex-col items-center">
          <div className="relative w-[24cqw] aspect-[4/3] mb-[1cqw]">
            <Image
              src="/wedding/events/heritage-reception-clean.webp"
              alt="Reception banquet celebration illustration"
              fill
              sizes="25cqw"
              className="object-contain"
            />
          </div>
          <h3 className="font-cormorant uppercase text-[1.6cqw] tracking-[0.22em] text-[#821919] font-medium m-0">
            {reception.title}
          </h3>
          <p className="font-cormorant text-[1.3cqw] text-[#7A6A60] mt-[0.25cqw] mb-[0.6cqw]">
            {reception.date}
          </p>
          <div className="w-[8cqw] h-[0.75px] bg-[#C29B63]/60 mx-auto" />
        </div>
      </div>
    </section>
  );
}

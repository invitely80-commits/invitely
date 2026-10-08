"use client";

import React from "react";
import Image from "next/image";

interface SectionVenueProps {
  venueName?: string;
  venueCity?: string;
  venueAddress?: string;
  mapsUrl?: string;
  description?: string;
}

/**
 * SectionVenue
 * 
 * Page 4 — The Venue.
 * Tightened hierarchy directly connecting title, palace illustration,
 * description, and an elegant stationery text link to Google Maps.
 */
export function SectionVenue({
  venueName = "THE LEELA PALACE",
  venueCity = "BENGALURU",
  venueAddress = "23, HAL Old Airport Road, Kodihalli, Bengaluru, Karnataka 560008",
  mapsUrl,
  description = "A palatial sanctuary reflecting the grandeur of South Indian royal architecture, lush courtyards, and tranquil lotus lagoons.",
}: SectionVenueProps) {
  const targetMapsUrl =
    mapsUrl && mapsUrl.trim()
      ? mapsUrl
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venueName}, ${venueAddress}`)}`;

  return (
    <section
      id="venue"
      aria-label="The Venue"
      className="relative z-20 w-full flex flex-col items-center pt-[2cqw]"
    >
      {/* 1. TOP HEADER & VENUE DETAILS (TIGHT & CONNECTED) */}
      <div className="w-full text-center px-[6cqw]">
        <h2 className="font-cormorant text-[5.8cqw] leading-tight text-[#821919] font-normal tracking-[0.02em] m-0">
          The Venue
        </h2>

        {/* 8-Petal Rosette rule */}
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

        {/* Palace Name & City */}
        <h3 className="font-cormorant uppercase text-[3.6cqw] tracking-[0.22em] text-[#821919] font-medium m-0">
          {venueName}
        </h3>
        <p className="font-cormorant uppercase text-[1.75cqw] tracking-[0.25em] text-[#7A6A60] mt-[0.3cqw] mb-[0.6cqw]">
          {venueCity}
        </p>

        {/* Address */}
        <p className="font-cormorant text-[1.55cqw] text-[#4A3E38] leading-[1.35] max-w-[55cqw] mx-auto m-0">
          {venueAddress}
        </p>

        {/* Small palace insignia floret */}
        <div className="flex items-center justify-center my-[1.2cqw] text-[#C29B63]" aria-hidden="true">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-[1.4cqw] h-[1.4cqw] opacity-85 max-w-[15px] max-h-[15px]"
            style={{ width: "1.4cqw", height: "1.4cqw", maxWidth: "15px", maxHeight: "15px" }}
          >
            <path d="M8 1L10 6.5L15 8L10 9.5L8 15L6 9.5L1 8L6 6.5L8 1Z" />
          </svg>
        </div>
      </div>

      {/* 2. PRIMARY PALACE ILLUSTRATION (CONNECTED DIRECTLY TO VENUE HEADER) */}
      <div className="relative w-[92cqw] aspect-[1662/946] my-[1.5cqw]">
        <Image
          src="/wedding/scenes/heritage-palace-clean.webp"
          alt={`${venueName} Grand Courtyard and Lotus Pool`}
          fill
          priority
          sizes="92cqw"
          className="object-contain"
        />
      </div>

      {/* 3. SHORT DESCRIPTION & STATIONERY VIEW ON MAP ACTION */}
      <div className="w-full text-center px-[8cqw] pt-[1cqw]">
        {description && (
          <p className="font-cormorant italic text-[1.5cqw] text-[#55453B] leading-[1.4] max-w-[62cqw] mx-auto m-0">
            &ldquo;{description}&rdquo;
          </p>
        )}

        {/* Small ornamental stationery text link (No heavy SaaS pill button) */}
        <div className="mt-[2.2cqw]">
          <a
            href={targetMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-[0.8cqw] pb-[0.3cqw] border-b border-[#821919]/50 hover:border-[#821919] text-[#821919] font-cormorant uppercase text-[1.6cqw] tracking-[0.24em] font-medium transition-colors cursor-pointer"
          >
            <span>View on Google Maps</span>
            <span className="transform group-hover:translate-x-1 transition-transform" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

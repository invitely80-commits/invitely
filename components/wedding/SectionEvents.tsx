"use client";

import React from "react";
import Image from "next/image";

export interface WeddingEventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl?: string;
  description: string;
  imageUrl?: string;
}

interface SectionEventsProps {
  events?: WeddingEventItem[];
}

export const ALL_HERITAGE_EVENTS: WeddingEventItem[] = [
  {
    id: "haldi",
    title: "HALDI",
    date: "09 JAN 2027",
    time: "10:00 AM – 1:00 PM",
    venue: "The Courtyard Pavilion",
    address: "The Leela Palace, Bengaluru",
    description: "A joyful turmeric ceremony bathed in yellow marigolds, laughter, and fragrant floral blessings.",
    imageUrl: "/wedding/events/heritage-haldi-clean.webp",
  },
  {
    id: "sangeet",
    title: "SANGEET",
    date: "10 JAN 2027",
    time: "6:30 PM Onwards",
    venue: "The Grand Ballroom",
    address: "The Leela Palace, Bengaluru",
    description: "An evening of celebratory music, classical and folk performances, and dance under fairy lights.",
    imageUrl: "/wedding/events/heritage-sangeet-clean.webp",
  },
  {
    id: "engagement",
    title: "ENGAGEMENT",
    date: "11 JAN 2027",
    time: "5:00 PM – 8:00 PM",
    venue: "Lotus Temple Terrace",
    address: "The Leela Palace, Bengaluru",
    description: "The auspicious exchange of rings, traditional kalasha blessings, and formal alliance of our families.",
    imageUrl: "/wedding/events/heritage-engagement-clean.webp",
  },
  {
    id: "muhurtham",
    title: "MUHURTHAM",
    date: "12 JAN 2027",
    time: "9:00 AM – 11:30 AM",
    venue: "The Sacred Mandapam",
    address: "The Leela Palace, Bengaluru",
    description: "The sacred Vedic wedding ceremony, tying of the Mangalsutra, and seven sacred vows around the holy fire.",
    imageUrl: "/wedding/events/heritage-muhurtham-clean.webp",
  },
  {
    id: "reception",
    title: "RECEPTION",
    date: "12 JAN 2027",
    time: "7:00 PM Onwards",
    venue: "The Royal Gardens",
    address: "The Leela Palace, Bengaluru",
    description: "An evening banquet to celebrate the newlyweds with family, friends, music, and an exquisite traditional feast.",
    imageUrl: "/wedding/events/heritage-reception-clean.webp",
  },
];

function resolveEventArtwork(title: string, customUrl?: string, index: number = 0): string {
  if (customUrl && customUrl.trim()) return customUrl;
  const lower = title.toLowerCase();
  if (lower.includes("haldi")) return "/wedding/events/heritage-haldi-clean.webp";
  if (lower.includes("sangeet")) return "/wedding/events/heritage-sangeet-clean.webp";
  if (lower.includes("engage")) return "/wedding/events/heritage-engagement-clean.webp";
  if (lower.includes("muhurth")) return "/wedding/events/heritage-muhurtham-clean.webp";
  if (lower.includes("recept")) return "/wedding/events/heritage-reception-clean.webp";

  const fallbackList = [
    "/wedding/events/heritage-haldi-clean.webp",
    "/wedding/events/heritage-sangeet-clean.webp",
    "/wedding/events/heritage-engagement-clean.webp",
    "/wedding/events/heritage-muhurtham-clean.webp",
    "/wedding/events/heritage-reception-clean.webp",
  ];
  return fallbackList[index % fallbackList.length];
}

/**
 * SectionEvents
 * 
 * Page 3 — The Celebrations.
 * Renders all 5 wedding events in an alternating editorial layout
 * inside the continuous parchment invitation.
 */
export function SectionEvents({ events }: SectionEventsProps) {
  // If user provides custom events with fewer than 5 items, supplement with the 5 heritage events
  // or render all 5 heritage events if none or minimal provided
  const displayEvents =
    events && events.length >= 5
      ? events
      : events && events.length > 0
      ? [
          ...events,
          ...ALL_HERITAGE_EVENTS.filter(
            (def) => !events.some((e) => e.title.toLowerCase().includes(def.id))
          ),
        ]
      : ALL_HERITAGE_EVENTS;

  return (
    <section
      id="events"
      aria-label="The Celebrations"
      className="relative z-20 w-full flex flex-col items-center pt-[2cqw]"
    >
      {/* 1. SECTION HEADER */}
      <div className="w-full text-center px-[6cqw] mb-[3.5cqw]">
        <h2 className="font-cormorant text-[5.8cqw] leading-tight text-[#821919] font-normal tracking-[0.02em] m-0">
          The Celebrations
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

        <p className="font-cormorant text-[1.8cqw] text-[#3E322A] tracking-[0.03em] m-0">
          A celebration of love, family and togetherness
        </p>
      </div>

      {/* 2. ALL 5 EVENTS — EDITORIAL ALTERNATING RHYTHM */}
      <div className="w-[88cqw] space-y-[4.5cqw]">
        {displayEvents.map((event, idx) => {
          const artwork = resolveEventArtwork(event.title, event.imageUrl, idx);
          const isEven = idx % 2 === 0;

          return (
            <article
              key={event.id || idx}
              className="w-full flex flex-col md:flex-row items-center gap-[3.5cqw] px-[1.5cqw]"
            >
              {/* Event Vignette (Controlled size, feathered alpha) */}
              <div
                className={`relative w-[60cqw] md:w-[36cqw] aspect-[4/3] flex-shrink-0 ${
                  !isEven ? "md:order-2" : "md:order-1"
                }`}
              >
                <Image
                  src={artwork}
                  alt={`${event.title} ceremony illustration`}
                  fill
                  sizes="40cqw"
                  className="object-contain"
                />
              </div>

              {/* Event Details */}
              <div
                className={`flex-1 text-center ${
                  isEven ? "md:text-left" : "md:text-right"
                } ${!isEven ? "md:order-1" : "md:order-2"}`}
              >
                <h3 className="font-cormorant uppercase text-[3.1cqw] tracking-[0.2em] text-[#821919] font-medium m-0 leading-tight">
                  {event.title}
                </h3>
                <p className="font-cormorant text-[1.75cqw] text-[#332A24] font-medium tracking-[0.04em] mt-[0.4cqw] mb-[0.2cqw]">
                  {event.date} {event.time ? `• ${event.time}` : ""}
                </p>
                <p className="font-cormorant text-[1.5cqw] text-[#7A6A60] tracking-[0.02em] m-0">
                  {event.venue} {event.address ? `• ${event.address}` : ""}
                </p>
                {event.description && (
                  <p className="font-cormorant italic text-[1.45cqw] text-[#55453B] leading-[1.38] mt-[0.8cqw] mb-0">
                    &ldquo;{event.description}&rdquo;
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

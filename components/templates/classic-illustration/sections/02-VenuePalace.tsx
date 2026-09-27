"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { type InviteEvent } from "@/lib/validations";

interface VenuePalaceProps {
  primaryEvent?: InviteEvent;
}

export function VenuePalace({ primaryEvent }: VenuePalaceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const palaceScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 1.04]);

  const venueName = primaryEvent?.venue || "THE LEELA PALACE";
  const city = primaryEvent?.address.split(",").slice(-2)[0]?.trim().toUpperCase() || "BENGALURU";
  const address = primaryEvent?.address || "23, HAL Old Airport Road, Kodihalli, Bengaluru, Karnataka 560008";
  const mapUrl =
    primaryEvent?.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${venueName}, ${address}`,
    )}`;

  return (
    <section
      id="venue"
      ref={sectionRef}
      className="relative w-full py-28 px-4 sm:px-6 bg-[#F7F2E7] text-[#2B1B17] overflow-hidden select-none border-t border-[#D4AF37]/25"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl mx-auto mb-12 space-y-3"
        >
          <div className="text-[#801818] mb-1">
            <svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 mx-auto opacity-90">
              <path d="M16 2 C18 8, 24 14, 30 16 C24 18, 18 24, 16 30 C14 24, 8 18, 2 16 C8 14, 14 8, 16 2 Z" />
            </svg>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#801818] tracking-wide">
            The Venue
          </h2>

          <div className="text-[#801818] flex items-center justify-center my-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
          </div>

          <p className="font-serif text-sm sm:text-base text-[#554339] italic">
            A beautiful setting for a brighter beginning
          </p>
        </motion.div>

        {/* Palace Heritage Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center space-y-3 mb-10"
        >
          {/* Palace Crest Icon */}
          <div className="w-16 h-10 mx-auto text-[#801818] opacity-80 flex items-center justify-center">
            <svg viewBox="0 0 64 36" fill="currentColor" className="w-full h-full">
              <path d="M32 2 L26 12 L38 12 Z" />
              <path d="M22 14 H42 V18 H22 Z" />
              <path d="M16 20 H48 V26 H16 Z" />
              <path d="M10 28 H54 V34 H10 Z" />
              <circle cx="32" cy="8" r="2" fill="#FFF" />
            </svg>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#801818] uppercase font-normal">
            {venueName}
          </h3>
          <p className="font-serif text-xs sm:text-sm tracking-[0.35em] text-[#554339] uppercase font-medium">
            {city}
          </p>

          <div className="text-[#801818] flex items-center justify-center my-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
          </div>

          <p className="font-serif text-xs sm:text-sm text-[#4A382E] max-w-md mx-auto leading-relaxed">
            {address}
          </p>
        </motion.div>

        {/* Illustrated Palace Painting Artwork */}
        <motion.div
          style={{ scale: palaceScale }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/50 mb-8"
        >
          <Image
            src="/images/templates/classic-illustration/venue_palace.jpg"
            alt={venueName}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Antique Illustrated Map with Navigation Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative w-full aspect-[16/8] sm:aspect-[21/8] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-lg flex flex-col items-center justify-center text-center p-6"
        >
          {/* Map Parchment Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/templates/classic-illustration/venue_map.jpg"
              alt="Venue Map Route"
              fill
              className="object-cover object-center brightness-[0.95]"
            />
            <div className="absolute inset-0 bg-[#F7F2E7]/25 backdrop-blur-[0.5px]" />
          </div>

          {/* Interactive Pin & Action */}
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#801818] text-white flex items-center justify-center shadow-lg border-2 border-white">
              <MapPin className="w-5 h-5" />
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#801818] hover:bg-[#601212] text-white font-serif text-xs sm:text-sm tracking-[0.25em] uppercase font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
            >
              <span>View On Map</span>
              <span className="text-sm">→</span>
            </a>

            <p className="font-serif text-xs text-[#554339] tracking-wider italic">
              Get directions on Google Maps
            </p>

            <div className="text-[#801818] flex items-center justify-center pt-1">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

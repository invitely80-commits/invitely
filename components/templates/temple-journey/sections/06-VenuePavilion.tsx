"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Navigation, Compass } from "lucide-react";
import { type InviteEvent } from "@/lib/validations";
import { AntiqueDivider } from "../TempleVisualAssets";

interface VenuePavilionProps {
  primaryEvent?: InviteEvent;
}

export function VenuePavilion({ primaryEvent }: VenuePavilionProps) {
  const venue = primaryEvent?.venue || "Sri Venkateswara Kalyana Mandapam";
  const address = primaryEvent?.address || "Temple Road, Mylapore, Chennai, Tamil Nadu";
  const mapUrl =
    primaryEvent?.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${venue}, ${address}`,
    )}`;

  return (
    <section className="relative w-full py-28 px-6 bg-[#FAF7F0] text-[#241E19] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[11px] font-sans font-bold tracking-[0.35em] uppercase text-[#7E1D1D]">
              06 • The Destination
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#16120E] mt-2">
              The Temple Grounds &amp; Venue
            </h2>
            <AntiqueDivider className="w-48 mx-auto my-4 text-[#7E1D1D]/70" />
            <p className="font-serif text-sm sm:text-base text-[#66574F] italic max-w-xl mx-auto">
              We look forward to welcoming you into these sacred grounds filled with grace and celebrations.
            </p>
          </motion.div>
        </div>

        {/* 2-Column Split: Architectural Image & Venue Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Architectural Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/50 group"
          >
            <Image
              src="/images/templates/temple-journey/venue_pavilion.jpg"
              alt={venue}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 text-white font-serif text-xs tracking-widest uppercase text-[#E8D5A0]">
              Heritage Kalyana Mandapam Grounds
            </div>
          </motion.div>

          {/* Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#D4AF37]/40 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#7E1D1D]">
                <MapPin className="w-5 h-5 text-[#7E1D1D] shrink-0" />
                <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold">
                  Location &amp; Directions
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#16120E] leading-snug">
                {venue}
              </h3>

              <p className="font-serif text-base text-[#66574F] leading-relaxed">
                {address}
              </p>

              <div className="pt-4 border-t border-[#D4AF37]/25 space-y-2 text-xs sm:text-sm text-[#4A3E36]">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#D4AF37]" />
                  <span>Ample valet parking available at the temple entrance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#D4AF37]" />
                  <span>Assistance available for elderly guests &amp; families</span>
                </div>
              </div>
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl bg-[#7E1D1D] hover:bg-[#601515] text-[#FAF7F0] font-sans text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Map</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

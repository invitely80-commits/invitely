"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { type InviteEvent } from "@/lib/validations";
import { ThemedEventCard } from "@/components/templates/ThemedEventCard";
import { AntiqueDivider, ToranGarland } from "../TempleVisualAssets";

interface MandapamWeddingProps {
  events: InviteEvent[];
  gallery?: string[];
}

export function MandapamWedding({ events, gallery = [] }: MandapamWeddingProps) {
  return (
    <section className="relative w-full py-28 px-4 sm:px-6 bg-[#F5F2EB] text-[#241E19] overflow-hidden">
      {/* Decorative Toran garland on top */}
      <div className="absolute top-0 left-0 right-0 z-10 opacity-70">
        <ToranGarland className="w-full h-8 text-[#2E5A36]" />
      </div>

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
              04 • The Sacred Mandapam
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#16120E] mt-2">
              The Auspicious Ceremonies
            </h2>
            <AntiqueDivider className="w-48 mx-auto my-4 text-[#7E1D1D]/70" />
            <p className="font-serif text-sm sm:text-base text-[#66574F] italic max-w-xl mx-auto">
              Gather with us beneath the flower-garlanded mandapam as we partake in timeless customs, joyous music, and sacred rites.
            </p>
          </motion.div>

          {/* Panoramic Mandapam Feature Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative w-full aspect-[21/9] sm:aspect-[24/9] rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/50 mt-8 group"
          >
            <Image
              src="/images/templates/temple-journey/mandapam_center.jpg"
              alt="Grand Wedding Mandapam"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[#F5F2EB]">
              <span className="font-serif text-xs sm:text-sm tracking-widest uppercase text-[#E8D5A0]">
                || कल्याण मण्डपम् ||
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-white/80 font-sans hidden sm:inline">
                Fragrance of Marigold &amp; Sacred Chants
              </span>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Ceremony Cards in Zigzag Layout */}
        <div className="space-y-12 sm:space-y-16">
          {events.map((event, idx) => (
            <ThemedEventCard
              key={event.id || idx}
              event={event}
              index={idx}
              theme="temple-journey"
              gallery={gallery}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

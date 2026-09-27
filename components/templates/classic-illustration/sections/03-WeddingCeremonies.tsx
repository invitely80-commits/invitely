"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { type InviteEvent } from "@/lib/validations";

interface WeddingCeremoniesProps {
  events?: InviteEvent[];
}

const DEFAULT_CEREMONIES = [
  {
    key: "haldi",
    title: "HALDI",
    date: "09 JAN 2027",
    time: "10:00 AM",
    image: "/images/templates/classic-illustration/ceremony_haldi.png",
  },
  {
    key: "sangeet",
    title: "SANGEET",
    date: "10 JAN 2027",
    time: "06:30 PM",
    image: "/images/templates/classic-illustration/ceremony_sangeet.png",
  },
  {
    key: "engagement",
    title: "ENGAGEMENT",
    date: "10 JAN 2027",
    time: "07:30 PM",
    image: "/images/templates/classic-illustration/ceremony_engagement.png",
  },
  {
    key: "muhurtham",
    title: "MUHURTHAM",
    date: "12 JAN 2027",
    time: "09:30 AM",
    image: "/images/templates/classic-illustration/ceremony_muhurtham.png",
  },
  {
    key: "reception",
    title: "RECEPTION",
    date: "12 JAN 2027",
    time: "07:00 PM",
    image: "/images/templates/classic-illustration/ceremony_reception.png",
  },
];

export function WeddingCeremonies({ events = [] }: WeddingCeremoniesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const mandapamScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.03]);

  // Combine user events with our illustrated ceremony cards
  const displayCeremonies = DEFAULT_CEREMONIES.map((def, idx) => {
    const userEvent = events[idx];
    return {
      ...def,
      title: userEvent?.title ? userEvent.title.toUpperCase() : def.title,
      date: userEvent?.date
        ? new Date(userEvent.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).toUpperCase()
        : def.date,
      time: userEvent?.time || def.time,
      venue: userEvent?.venue,
    };
  });

  return (
    <section
      id="wedding"
      ref={sectionRef}
      className="relative w-full py-28 px-4 sm:px-6 bg-[#F7F2E7] text-[#2B1B17] overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-3"
        >
          <div className="text-[#801818] mb-1">
            <svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 mx-auto opacity-90">
              <path d="M16 2 C18 8, 24 14, 30 16 C24 18, 18 24, 16 30 C14 24, 8 18, 2 16 C8 14, 14 8, 16 2 Z" />
            </svg>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#801818] tracking-wide">
            The Wedding
          </h2>

          <div className="text-[#801818] flex items-center justify-center my-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
          </div>

          <p className="font-serif text-sm sm:text-base text-[#554339] italic">
            A celebration of love, family and togetherness
          </p>
        </motion.div>

        {/* Panoramic Mandapam Centerpiece Banner */}
        <motion.div
          style={{ scale: mandapamScale }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative w-full aspect-[16/7] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border border-[#D4AF37]/40 mb-16"
        >
          <Image
            src="/images/templates/classic-illustration/mandapam_stage.jpg"
            alt="Sacred Wedding Mandapam Stage"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* 5 Illustrated Ceremony Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 pt-4">
          {displayCeremonies.map((ceremony, idx) => (
            <motion.div
              key={ceremony.key}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.12 }}
              className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-white/40 transition-colors duration-300 relative group"
            >
              {/* Illustrated Vignette */}
              <div className="relative w-full aspect-[4/3] mb-4 group-hover:scale-105 transition-transform duration-500 ease-out">
                <Image
                  src={ceremony.image}
                  alt={ceremony.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Ceremony Title */}
              <h3 className="font-serif text-sm sm:text-base tracking-[0.25em] text-[#2B1B17] font-semibold uppercase mb-1">
                {ceremony.title}
              </h3>

              {/* Date & Time */}
              <p className="font-serif text-xs sm:text-sm text-[#735A4B] tracking-wider mb-2">
                {ceremony.date}
              </p>

              {ceremony.time && (
                <p className="text-[11px] text-[#801818] tracking-widest font-sans font-medium uppercase mb-2">
                  {ceremony.time}
                </p>
              )}

              {/* Red Emblem Accent */}
              <div className="text-[#801818] flex items-center justify-center mt-auto pt-2">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AntiqueDivider, SacredLotus } from "../TempleVisualAssets";

const RITUALS_DATA = [
  {
    step: "01",
    sanskrit: "माल्यार्पणम्",
    title: "Maalai Maatral",
    subtitle: "The Garland Exchange",
    desc: "Exchanging fragrant garlands of fresh roses and jasmine three times, symbolizing mutual respect, acceptance, and the sweet union of two souls.",
  },
  {
    step: "02",
    sanskrit: "ऊञ्जल",
    title: "Oonjal & Kanyadanam",
    subtitle: "The Swing of Life",
    desc: "The couple sways gently upon the swing as auspicious songs fill the air, representing steadiness, harmony, and grace through life's shifting seasons.",
  },
  {
    step: "03",
    sanskrit: "माङ्गल्यधारणम्",
    title: "Mangalya Dharanam",
    subtitle: "The Sacred Thali",
    desc: "Accompanied by the resonant thavil and auspicious nadaswaram, the three sacred knots are tied, sealing an unbreakable lifelong covenant.",
  },
  {
    step: "04",
    sanskrit: "सप्तपदी",
    title: "Saptapadi",
    subtitle: "The Seven Steps",
    desc: "Walking seven sacred circumambulations around the holy agni fire, praying for sustenance, vigor, prosperity, wisdom, progeny, and eternal friendship.",
  },
];

export function SacredRituals() {
  return (
    <section className="relative w-full py-28 px-6 bg-[#16120E] text-[#F5F2EB] overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#FF9E1B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#7E1D1D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[11px] font-sans font-bold tracking-[0.35em] uppercase text-[#D4AF37]">
              05 • Vedic Sanctity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-white mt-2">
              The Sacred Rituals
            </h2>
            <AntiqueDivider className="w-48 mx-auto my-4 text-[#D4AF37]" />
            <p className="font-serif text-sm sm:text-base text-[#E8D5A0]/80 italic max-w-xl mx-auto">
              Every mantra chanted and every petal offered carries millennia of timeless spiritual blessing.
            </p>
          </motion.div>
        </div>

        {/* Feature Rituals Still Life Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative w-full aspect-[16/7] sm:aspect-[21/8] rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 mb-16"
        >
          <Image
            src="/images/templates/temple-journey/sacred_rituals.jpg"
            alt="Traditional South Indian Wedding Ritual Thali"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16120E] via-transparent to-black/40" />
          <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8">
            <span className="font-serif text-xs sm:text-sm tracking-widest uppercase text-[#D4AF37] block">
              Akshata • Mangalsutra • Sacred Agni
            </span>
          </div>
        </motion.div>

        {/* 4 Ritual Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {RITUALS_DATA.map((ritual, idx) => (
            <motion.div
              key={ritual.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="bg-[#1D1713] p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-colors duration-300 relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-xs tracking-widest text-[#D4AF37] uppercase font-bold">
                  {ritual.step} • {ritual.sanskrit}
                </span>
                <SacredLotus className="w-5 h-5 text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white group-hover:text-[#E8D5A0] transition-colors">
                {ritual.title}
              </h3>
              <p className="text-xs uppercase tracking-wider text-[#D4AF37]/80 font-sans mt-0.5 mb-3">
                {ritual.subtitle}
              </p>

              <p className="text-sm leading-relaxed text-[#F5F2EB]/70 font-serif">
                {ritual.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

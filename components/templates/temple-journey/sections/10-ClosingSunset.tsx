"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GopuramCrest, AntiqueDivider } from "../TempleVisualAssets";

interface ClosingSunsetProps {
  brideName: string;
  groomName: string;
  weddingDate: string;
}

export function ClosingSunset({
  brideName,
  groomName,
  weddingDate,
}: ClosingSunsetProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#0F0B09] py-24 px-6 text-[#F5F2EB]">
      {/* Sunset Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/templates/temple-journey/sunset_closing.jpg"
          alt="Temple Silhouette at Sunset"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.7] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0706] via-transparent to-[#16120E]" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="space-y-4"
        >
          <GopuramCrest className="w-12 h-12 mx-auto text-[#D4AF37] drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]" />

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-wide">
            || शुभमस्तु ||
          </h2>

          <p className="font-serif text-xs sm:text-sm tracking-[0.3em] uppercase text-[#E8D5A0] font-medium">
            May Auspiciousness Abound
          </p>

          <AntiqueDivider className="w-56 mx-auto my-6 text-[#D4AF37]" />

          <div className="space-y-2">
            <p className="font-serif text-2xl sm:text-4xl text-white font-normal">
              {brideName} <span className="italic text-[#D4AF37] font-light">&amp;</span> {groomName}
            </p>
            <p className="text-xs sm:text-sm text-[#E8D5A0]/80 tracking-[0.2em] uppercase font-sans">
              {weddingDate}
            </p>
          </div>

          <p className="font-serif text-sm sm:text-base text-[#F5F2EB]/80 italic max-w-md mx-auto pt-4 leading-relaxed">
            &ldquo;Thank you for being a part of our sacred heritage and joyful journey.&rdquo;
          </p>

          {/* Return to Entrance Button */}
          <div className="pt-8">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#D4AF37]/40 text-[#E8D5A0] text-xs uppercase tracking-[0.25em] font-sans font-medium transition-all duration-300"
            >
              <span>Return to Temple Entrance</span>
              <span className="text-sm">↑</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

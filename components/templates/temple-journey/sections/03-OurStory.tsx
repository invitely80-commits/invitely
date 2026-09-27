"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AntiqueDivider, SacredLotus } from "../TempleVisualAssets";

interface OurStoryProps {
  brideName: string;
  groomName: string;
  description: string;
  storyImage?: string;
}

export function OurStory({
  brideName,
  groomName,
  description,
  storyImage,
}: OurStoryProps) {
  const brideFirst = brideName.split(" ")[0];
  const groomFirst = groomName.split(" ")[0];

  return (
    <section className="relative w-full py-28 px-6 bg-[#FAF7F0] text-[#241E19] overflow-hidden">
      {/* Subtle Sandalwood Background Texture Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7E1D1D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Couple Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            {/* Double Border Architectural Framing */}
            <div className="relative p-3 bg-white shadow-2xl rounded-2xl border border-[#D4AF37]/40">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-stone-100">
                <Image
                  src={storyImage || "/images/templates/temple-journey/couple_story.jpg"}
                  alt={`${brideName} and ${groomName}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Gold Filigree Badge Overlap */}
              <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center justify-center w-24 h-24 rounded-full bg-[#7E1D1D] text-[#E8D5A0] shadow-xl border-2 border-[#D4AF37]">
                <div className="text-center">
                  <SacredLotus className="w-5 h-5 mx-auto mb-0.5 text-[#D4AF37]" />
                  <span className="font-serif text-xs font-semibold tracking-widest uppercase">
                    {brideFirst[0]} &amp; {groomFirst[0]}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-bold tracking-[0.35em] uppercase text-[#7E1D1D]">
                03 • Our Sacred Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#16120E] leading-tight">
                Two Souls, One Divine Promise
              </h2>
            </div>

            <AntiqueDivider className="w-full text-[#7E1D1D]/70 my-4" />

            <div className="prose prose-stone text-base sm:text-lg leading-relaxed text-[#4A3E36] font-serif">
              <p>
                {description ||
                  "With the eternal blessings of our ancestors, deities, and cherished elders, we come together in reverence and boundless joy. Hand in hand, we step into this sacred chapter with gratitude in our hearts."}
              </p>
            </div>

            {/* Milestones / Traditional Moments Timeline */}
            <div className="mt-8 pt-6 border-t border-[#D4AF37]/30 space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-[#7E1D1D]/10 text-[#7E1D1D] flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5 border border-[#7E1D1D]/20">
                  I
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#16120E]">
                    The Serendipitous Beginning
                  </h4>
                  <p className="text-xs sm:text-sm text-[#66574F] mt-1 leading-relaxed">
                    Quiet conversations that blossomed into enduring respect, laughter, and an unshakable friendship.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-[#7E1D1D]/10 text-[#7E1D1D] flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5 border border-[#7E1D1D]/20">
                  II
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#16120E]">
                    Families United
                  </h4>
                  <p className="text-xs sm:text-sm text-[#66574F] mt-1 leading-relaxed">
                    Both families exchanging betel leaves, coconuts, and blessings, uniting our lineages as one.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-[#7E1D1D]/10 text-[#7E1D1D] flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5 border border-[#7E1D1D]/20">
                  III
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#16120E]">
                    The Seven Sacred Steps
                  </h4>
                  <p className="text-xs sm:text-sm text-[#66574F] mt-1 leading-relaxed">
                    Preparing to walk around the sacred agni fire to forge an eternal covenant across seven lifetimes.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

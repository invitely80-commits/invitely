"use client";

import React from "react";
import { motion } from "framer-motion";
import { AntiqueDivider, KolamCorner } from "../TempleVisualAssets";

interface BlessingsProps {
  brideName: string;
  groomName: string;
}

export function Blessings({ brideName, groomName }: BlessingsProps) {
  return (
    <section className="relative w-full py-24 px-6 bg-[#1A1410] text-[#F5F2EB] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative bg-[#120E0B] p-8 sm:p-14 rounded-3xl border border-[#D4AF37]/40 shadow-2xl text-center space-y-6"
        >
          {/* Corner Kolam Accents */}
          <div className="absolute top-4 left-4 pointer-events-none hidden sm:block">
            <KolamCorner className="w-12 h-12 text-[#D4AF37]/30" />
          </div>
          <div className="absolute bottom-4 right-4 pointer-events-none hidden sm:block rotate-180">
            <KolamCorner className="w-12 h-12 text-[#D4AF37]/30" />
          </div>

          <span className="text-[11px] font-sans font-bold tracking-[0.35em] uppercase text-[#D4AF37]">
            08 • Heartfelt Blessings
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white">
            With Love &amp; Gratitude
          </h2>

          <div className="p-4 sm:p-6 rounded-xl bg-[#1A1410]/80 border border-[#D4AF37]/20 max-w-xl mx-auto">
            <p className="font-serif text-sm sm:text-base text-[#E8D5A0] tracking-widest leading-relaxed">
              || मङ्गलम् भगवान् विष्णुः मङ्गलम् गरुडध्वजः |<br />
              मङ्गलम् पुण्डरीकाक्षः मङ्गलाय तनो हरिः ||
            </p>
          </div>

          <p className="font-serif text-base sm:text-lg text-[#F5F2EB]/80 italic leading-relaxed max-w-xl mx-auto">
            &ldquo;Your prayers, warm blessings, and loving presence are the most treasured gifts we could ever ask for as we begin our life together.&rdquo;
          </p>

          <AntiqueDivider className="w-48 mx-auto text-[#D4AF37]/60" />

          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-sans font-medium">
            Warmly Invited By The Families of<br />
            <span className="text-white text-sm font-serif normal-case tracking-normal block mt-1">
              {brideName} &amp; {groomName}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { AntiqueDivider } from "../TempleVisualAssets";

interface TempleGalleryProps {
  gallery?: string[];
}

const DEFAULT_GALLERY = [
  "/images/templates/temple-journey/gallery_1.jpg",
  "/images/templates/temple-journey/couple_story.jpg",
  "/images/templates/temple-journey/sacred_rituals.jpg",
  "/images/templates/temple-journey/mandapam_center.jpg",
];

export function TempleGallery({ gallery = [] }: TempleGalleryProps) {
  const images = gallery.length > 0 ? gallery : DEFAULT_GALLERY;
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className="relative w-full py-28 px-6 bg-[#F5F2EB] text-[#241E19] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[11px] font-sans font-bold tracking-[0.35em] uppercase text-[#7E1D1D]">
              07 • Cherished Moments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#16120E] mt-2">
              The Temple Gallery
            </h2>
            <AntiqueDivider className="w-48 mx-auto my-4 text-[#7E1D1D]/70" />
            <p className="font-serif text-sm sm:text-base text-[#66574F] italic max-w-xl mx-auto">
              Glimpses of beauty, laughter, heirloom silks, and sacred heritage.
            </p>
          </motion.div>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.slice(0, 4).map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setActiveImage(src)}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-[#D4AF37]/40 cursor-pointer group bg-stone-200"
            >
              <Image
                src={src}
                alt={`Wedding moment ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white">
                  <ZoomIn className="w-5 h-5 text-[#E8D5A0]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>
            <div
              className="relative max-w-4xl max-h-[85vh] w-full h-full aspect-[4/3] sm:aspect-[16/10]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage}
                alt="Enlarged view"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

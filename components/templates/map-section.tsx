"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, ExternalLink, ChevronDown, ChevronUp, Map as MapIcon } from "lucide-react";
import { getMapsContext } from "@/lib/maps-utils";
import { cn } from "@/lib/utils";

interface MapSectionProps {
  address: string;
  mapUrl?: string | null;
  className?: string;
  buttonClassName?: string;
  accentColor?: string;
}

export function MapSection({
  address,
  mapUrl,
  className,
  buttonClassName,
  accentColor = "#7A1F3D", // Default to maroon
}: MapSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { embedUrl, googleMapsUrl, appleMapsUrl } = getMapsContext(mapUrl, address);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-3">
        {embedUrl && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300",
              isOpen 
                ? "bg-stone-100 text-stone-900" 
                : "border border-stone-200 hover:border-stone-400 text-stone-600",
              buttonClassName
            )}
          >
            {isOpen ? <ChevronUp className="size-3" /> : <MapIcon className="size-3" />}
            {isOpen ? "Hide Map" : "View Map"}
          </button>
        )}

        <div className="flex gap-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border border-stone-200 hover:border-stone-400 text-stone-600 transition-all duration-300",
              buttonClassName
            )}
          >
            <Navigation className="size-3" />
            Google Maps
          </a>
          
          <a
            href={appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border border-stone-200 hover:border-stone-400 text-stone-600 transition-all duration-300",
              buttonClassName
            )}
          >
            <ExternalLink className="size-3" />
            Apple Maps
          </a>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && embedUrl && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-2xl border border-stone-100 shadow-sm bg-stone-50"
          >
            <iframe
              src={embedUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.2] contrast-[0.9] hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

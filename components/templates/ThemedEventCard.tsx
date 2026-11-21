"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { type InviteEvent } from "@/lib/validations";
import { type InviteTheme } from "@/lib/invites";
import { MapSection } from "@/components/templates/map-section";
import { cn } from "@/lib/utils";

interface ThemedEventCardProps {
  event: InviteEvent;
  index: number;
  theme: InviteTheme;
  gallery?: string[];
  className?: string;
}

const CEREMONY_FALLBACK_IMAGES = [
  "/images/events/ceremony-1.jpg",
  "/images/events/ceremony-2.jpg",
  "/images/events/ceremony-3.jpg",
  "/images/events/ceremony-4.jpg",
];

export function ThemedEventCard({
  event,
  index,
  theme: _theme,
  gallery = [],
  className,
}: ThemedEventCardProps) {
  const isEven = index % 2 === 0;

  // Prioritize explicit event image, then gallery index, then generated thematic ceremony artwork
  const userPhoto = event.imageUrl || gallery[index];
  const fallbackPhoto = CEREMONY_FALLBACK_IMAGES[index % CEREMONY_FALLBACK_IMAGES.length];
  const activePhoto = userPhoto || fallbackPhoto;
  const isCustomUserPhoto = Boolean(userPhoto);

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  // Theme-specific styling tokens (South Indian Heritage)
  const getThemeStyling = () => {
    return {
      cardContainer: "border border-[#C5A059]/40 bg-[#F8F3E8] shadow-[0_24px_60px_rgba(130,25,25,0.08)] rounded-2xl",
      photoFrame: "border-2 border-[#C5A059]/60 shadow-[0_15px_40px_rgba(130,25,25,0.12)] rounded-xl",
      tagBg: "bg-[#821919] text-[#FAF5EB] border border-[#C5A059]/50 tracking-wider",
      dateText: "text-[#821919]",
      dividerColor: "bg-[#C5A059]/45",
      titleText: "text-[#2D231E]",
      bodyText: "text-[#63534B]",
      metaIcon: "text-[#C5A059]",
      mapButton: "border-[#C5A059]/50 text-[#821919] hover:border-[#821919] hover:bg-[#821919]/5",
    };
  };

  const st = getThemeStyling();

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-[32px] p-6 sm:p-8 md:p-10 transition-all duration-700 hover:shadow-2xl relative overflow-hidden",
        st.cardContainer,
        className,
      )}
    >
      <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* EVENT DETAILS SIDE */}
        <div
          className={cn(
            "lg:col-span-6 space-y-6 text-left",
            isEven ? "lg:order-1" : "lg:order-2",
          )}
        >
          {/* Ceremony Badge & Date */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-sm",
                st.tagBg,
              )}
            >
              Ceremony {index + 1}
            </span>
            <div className={cn("h-3 w-px", st.dividerColor)} />
            <p className={cn("text-xs font-semibold uppercase tracking-wider", st.dateText)}>
              {formattedDate}
            </p>
          </div>

          {/* Ceremony Title */}
          <div>
            <h3
              className={cn(
                "font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight leading-tight",
                st.titleText,
              )}
            >
              {event.title || "Ceremony Union"}
            </h3>
            {event.time && (
              <div className="mt-2.5 flex items-center gap-2 text-xs font-medium opacity-85">
                <Clock className={cn("size-3.5", st.metaIcon)} />
                <span>{event.time}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <p className={cn("text-sm leading-relaxed tracking-wide font-light", st.bodyText)}>
              {event.description}
            </p>
          )}

          {/* Venue & Location */}
          <div className="space-y-2 pt-1 border-t border-current/10">
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className={cn("size-4 shrink-0 mt-0.5", st.metaIcon)} />
              <div>
                <p className="font-semibold">{event.venue}</p>
                {event.address && (
                  <p className="mt-0.5 opacity-75 leading-relaxed">{event.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Map Actions */}
          <div className="pt-2">
            <MapSection
              address={event.address || event.venue}
              mapUrl={event.mapUrl}
              buttonClassName={st.mapButton}
            />
          </div>
        </div>

        {/* CEREMONY PHOTO SIDE */}
        <div
          className={cn(
            "lg:col-span-6 w-full",
            isEven ? "lg:order-2" : "lg:order-1",
          )}
        >
          <div
            className={cn(
              "relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-[24px] group",
              st.photoFrame,
            )}
          >
            <Image
              src={activePhoto}
              alt={event.title || `Ceremony ${index + 1}`}
              fill
              unoptimized={activePhoto.startsWith("blob:")}
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />

            {/* Badges on Photo */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1.5">
                <Sparkles className="size-3 text-gold" />
                {isCustomUserPhoto ? "Ceremony Photo" : "Ritual Visual"}
              </span>
              <span className="text-[10px] font-mono text-white/80 drop-shadow">
                0{index + 1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

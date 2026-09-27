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
  theme,
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

  // Theme-specific styling tokens
  const getThemeStyling = () => {
    switch (theme) {
      case "royal":
        return {
          cardContainer: "border border-[#C9A84C]/30 bg-[#1C0A0A]/70 backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.6)]",
          photoFrame: "border-2 border-[#C9A84C]/60 shadow-[0_15px_40px_rgba(201,168,76,0.15)] ring-1 ring-[#C9A84C]/20",
          tagBg: "bg-[#8B1A1A]/90 text-[#E8D5A0] border border-[#C9A84C]/40",
          dateText: "text-[#E8D5A0]",
          dividerColor: "bg-[#C9A84C]/40",
          titleText: "text-[#FDFBF7]",
          bodyText: "text-white/80",
          metaIcon: "text-[#E8D5A0]",
          mapButton: "border-[#E8D5A0]/30 text-[#E8D5A0] hover:border-[#E8D5A0]/80 hover:bg-[#C9A84C]/10",
        };
      case "south-indian":
        return {
          cardContainer: "border border-[#C9A84C]/40 bg-[#FFFDF9] shadow-[0_20px_60px_rgba(139,26,26,0.06)]",
          photoFrame: "border-2 border-[#C9A84C]/60 shadow-[0_15px_40px_rgba(139,26,26,0.12)]",
          tagBg: "bg-[#8B1A1A] text-[#FAF7F2] border border-[#C9A84C]/50",
          dateText: "text-[#8B1A1A]",
          dividerColor: "bg-[#C9A84C]/50",
          titleText: "text-[#2D1B1B]",
          bodyText: "text-[#4A4A4A]",
          metaIcon: "text-[#C9A84C]",
          mapButton: "border-[#C9A84C]/40 text-[#8B1A1A] hover:border-[#8B1A1A]/60 hover:bg-[#8B1A1A]/5",
        };
      case "temple-journey":
        return {
          cardContainer: "border border-[#D4AF37]/40 bg-[#FFFFFF] shadow-[0_24px_60px_rgba(36,30,25,0.08)] rounded-2xl",
          photoFrame: "border-2 border-[#D4AF37]/60 shadow-[0_15px_40px_rgba(126,29,29,0.12)] rounded-xl",
          tagBg: "bg-[#7E1D1D] text-[#FAF7F0] border border-[#D4AF37]/50 tracking-wider",
          dateText: "text-[#7E1D1D]",
          dividerColor: "bg-[#D4AF37]/45",
          titleText: "text-[#16120E]",
          bodyText: "text-[#4A3E36]",
          metaIcon: "text-[#D4AF37]",
          mapButton: "border-[#D4AF37]/50 text-[#7E1D1D] hover:border-[#7E1D1D] hover:bg-[#7E1D1D]/5",
        };
      case "classic-illustration":
        return {
          cardContainer: "border border-[#C5A059]/40 bg-[#FFFDF9] shadow-[0_24px_60px_rgba(128,24,24,0.08)] rounded-2xl",
          photoFrame: "border-2 border-[#C5A059]/60 shadow-[0_15px_40px_rgba(128,24,24,0.12)] rounded-xl",
          tagBg: "bg-[#801818] text-[#FBF6EB] border border-[#C5A059]/50 tracking-wider",
          dateText: "text-[#801818]",
          dividerColor: "bg-[#C5A059]/45",
          titleText: "text-[#2B1B17]",
          bodyText: "text-[#5C4D43]",
          metaIcon: "text-[#C5A059]",
          mapButton: "border-[#C5A059]/50 text-[#801818] hover:border-[#801818] hover:bg-[#801818]/5",
        };
      case "hindu":
        return {
          cardContainer: "border border-[#E8D5A0]/25 bg-[#1A0F0A]/85 backdrop-blur-xl shadow-[0_25px_60px_rgba(232,213,160,0.07)]",
          photoFrame: "border-2 border-[#E8D5A0]/45 shadow-[0_15px_40px_rgba(232,213,160,0.1)] ring-1 ring-gold-accent/20",
          tagBg: "bg-[#8B2500]/90 text-[#E8D5A0] border border-[#E8D5A0]/30",
          dateText: "text-[#E8D5A0]",
          dividerColor: "bg-[#E8D5A0]/40",
          titleText: "text-[#FDFBF7]",
          bodyText: "text-white/80",
          metaIcon: "text-[#E8D5A0]",
          mapButton: "border-[#E8D5A0]/30 text-[#E8D5A0] hover:border-[#E8D5A0]/80 hover:bg-[#E8D5A0]/10",
        };
      case "muslim":
        return {
          cardContainer: "border border-[#D4AF37]/30 bg-[#0A1A10]/85 backdrop-blur-xl shadow-[0_25px_60px_rgba(212,175,55,0.08)]",
          photoFrame: "border-2 border-[#D4AF37]/50 shadow-[0_15px_40px_rgba(212,175,55,0.1)]",
          tagBg: "bg-[#062414] text-[#E8D5A0] border border-[#D4AF37]/40",
          dateText: "text-[#E8D5A0]",
          dividerColor: "bg-[#D4AF37]/40",
          titleText: "text-[#FDFBF7]",
          bodyText: "text-white/80",
          metaIcon: "text-[#D4AF37]",
          mapButton: "border-[#D4AF37]/30 text-[#E8D5A0] hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/10",
        };
      case "christian":
        return {
          cardContainer: "border border-stone-200/90 bg-white/85 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.04)]",
          photoFrame: "border border-stone-200 shadow-[0_15px_35px_rgba(0,0,0,0.06)]",
          tagBg: "bg-stone-900 text-stone-100",
          dateText: "text-stone-700",
          dividerColor: "bg-stone-300",
          titleText: "text-stone-900",
          bodyText: "text-stone-600",
          metaIcon: "text-stone-500",
          mapButton: "border-stone-300 text-stone-700 hover:border-stone-600 hover:bg-stone-50",
        };
      case "sikh":
        return {
          cardContainer: "border border-[#FF9933]/30 bg-[#0A111F]/85 backdrop-blur-xl shadow-[0_25px_60px_rgba(255,153,51,0.07)]",
          photoFrame: "border-2 border-[#FF9933]/45 shadow-[0_15px_40px_rgba(255,153,51,0.1)]",
          tagBg: "bg-[#0C1B33] text-[#FF9933] border border-[#FF9933]/40",
          dateText: "text-[#FF9933]",
          dividerColor: "bg-[#FF9933]/40",
          titleText: "text-[#FDFBF7]",
          bodyText: "text-white/80",
          metaIcon: "text-[#FF9933]",
          mapButton: "border-[#FF9933]/30 text-[#FF9933] hover:border-[#FF9933]/80 hover:bg-[#FF9933]/10",
        };
      case "civil":
        return {
          cardContainer: "border border-black/10 bg-[#FAFAFA] shadow-[0_15px_40px_rgba(0,0,0,0.03)]",
          photoFrame: "border border-black/15 shadow-[0_15px_30px_rgba(0,0,0,0.05)]",
          tagBg: "bg-black text-white",
          dateText: "text-stone-900 font-semibold",
          dividerColor: "bg-black/15",
          titleText: "text-black",
          bodyText: "text-stone-600",
          metaIcon: "text-stone-400",
          mapButton: "border-black/20 text-black hover:border-black/60 hover:bg-black/5",
        };
      case "luxury":
        return {
          cardContainer: "border border-[#C9A84C]/40 bg-[#080808]/90 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.85)]",
          photoFrame: "border-2 border-[#C9A84C]/60 shadow-[0_20px_50px_rgba(201,168,76,0.15)] ring-1 ring-white/10",
          tagBg: "bg-black/90 text-[#E8D5A0] border border-[#C9A84C]/50",
          dateText: "text-[#E8D5A0]",
          dividerColor: "bg-[#C9A84C]/50",
          titleText: "text-white",
          bodyText: "text-white/75",
          metaIcon: "text-[#C9A84C]",
          mapButton: "border-[#C9A84C]/35 text-[#E8D5A0] hover:border-[#C9A84C]/80 hover:bg-[#C9A84C]/10",
        };
      case "minimal":
      default:
        return {
          cardContainer: "border border-stone-200/80 bg-white/75 backdrop-blur-sm shadow-[0_15px_40px_rgba(0,0,0,0.02)]",
          photoFrame: "border border-stone-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.04)]",
          tagBg: "bg-stone-800 text-stone-100",
          dateText: "text-stone-700",
          dividerColor: "bg-stone-200",
          titleText: "text-stone-900",
          bodyText: "text-stone-600",
          metaIcon: "text-stone-400",
          mapButton: "border-stone-300 text-stone-700 hover:border-stone-600 hover:bg-stone-50",
        };
    }
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

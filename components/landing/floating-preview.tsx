"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Heart, MapPin } from "lucide-react";

import { formatDisplayDate } from "@/lib/utils";

export function FloatingPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.75, ease: "easeOut", delay: 0.12 }}
      className="invite-glow relative mx-auto max-w-[420px]"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6.5, ease: "easeInOut" }}
        className="surface-card relative overflow-hidden rounded-[36px] p-4"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,191,191,0.4),_transparent_40%),linear-gradient(180deg,_rgba(252,249,242,0.95),_rgba(252,249,242,0.9))]" />
        <div className="relative rounded-[28px] border border-gold/10 bg-white/40 p-4 shadow-sm">
          <div className="relative h-64 overflow-hidden rounded-[24px]">
            <Image
              src="/images/templates/hindu/hero_god_tier.png"
              alt="Couple portrait preview"
              fill
              className="object-cover"
              sizes="420px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/60 via-burgundy/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/70">The Wedding Of</p>
              <h3 className="mt-2 font-heading text-4xl font-medium tracking-tight">Aanvi & Siddharth</h3>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 px-2 py-4 text-[13px] font-medium text-stone-600 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-gold/60" />
              <span>{formatDisplayDate("2026-11-22")}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-gold/60" />
              <span>Jaipur</span>
            </div>
            <div className="flex items-center gap-2 text-burgundy/80">
              <Heart className="size-4 fill-current opacity-70" />
              <span>RSVP</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


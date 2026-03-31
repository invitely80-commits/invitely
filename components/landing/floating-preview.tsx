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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(246,221,224,0.85),_transparent_40%),linear-gradient(180deg,_rgba(255,250,243,0.94),_rgba(255,241,226,0.88))]" />
        <div className="relative rounded-[28px] border border-gold/25 bg-white/70 p-4">
          <div className="relative h-60 overflow-hidden rounded-[24px]">
            <Image
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80"
              alt="Couple portrait preview"
              fill
              className="object-cover"
              sizes="420px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/55 via-maroon/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.35em] text-white/80">The Wedding Of</p>
              <h3 className="mt-2 font-heading text-4xl">Mira & Kabir</h3>
            </div>
          </div>
          <div className="grid gap-4 px-2 py-5 text-sm text-stone-700 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-3">
              <CalendarDays className="size-4 text-gold" />
              <span>{formatDisplayDate("2026-11-22")}</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-3">
              <MapPin className="size-4 text-gold" />
              <span>Jaipur</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-3">
              <Heart className="size-4 text-gold" />
              <span>Live RSVP</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


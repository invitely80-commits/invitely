"use client";

import React, { useState, useActionState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Hotel, Send, Users, Clock, Sparkles } from "lucide-react";
import { submitRsvpAction, type RsvpActionState } from "@/lib/actions/rsvp-actions";
import { type InviteEvent } from "@/lib/validations";
import { AntiqueDivider, TempleBell } from "../TempleVisualAssets";

interface TempleRsvpDoorsProps {
  inviteId: string;
  events?: InviteEvent[];
  askAccommodation?: boolean;
  preview?: boolean;
  coupleNames?: string;
  enableRsvp?: boolean;
}

const initialRsvpState: RsvpActionState = {};

export function TempleRsvpDoors({
  inviteId,
  events = [],
  askAccommodation = false,
  preview = false,
  coupleNames = "The Couple",
  enableRsvp = true,
}: TempleRsvpDoorsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [selectedTime, setSelectedTime] = useState<string>(
    events.length > 0
      ? `${events[0].title} (${events[0].time || "Ceremony"})`
      : "Full Celebration",
  );
  const [needsAccom, setNeedsAccom] = useState<string>("no");
  const [previewSubmitted, setPreviewSubmitted] = useState<boolean>(false);

  const actionFn = async (
    prevState: RsvpActionState,
    formData: FormData,
  ): Promise<RsvpActionState> => {
    if (preview) {
      setPreviewSubmitted(true);
      return {
        success: true,
        message: "Preview Mode: RSVP successfully recorded!",
      };
    }
    return submitRsvpAction(inviteId, prevState, formData);
  };

  const [state, formAction, isPending] = useActionState(actionFn, initialRsvpState);

  if (!enableRsvp) {
    return null;
  }

  return (
    <section className="relative w-full py-28 px-4 sm:px-6 bg-[#16120E] text-[#F5F2EB] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[11px] font-sans font-bold tracking-[0.35em] uppercase text-[#D4AF37]">
            09 • The Temple Gateway
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white">
            Sacred RSVP
          </h2>
          <AntiqueDivider className="w-48 mx-auto my-3 text-[#D4AF37]" />
          <p className="font-serif text-sm sm:text-base text-[#E8D5A0]/80 italic">
            Open the carved temple doors to confirm your auspicious presence with us.
          </p>
        </div>

        {/* The 3D Temple Doors Stage */}
        <div className="relative w-full max-w-2xl mx-auto [perspective:1400px]">
          {/* Outer Carved Stone Arch Frame */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-[0_25px_70px_rgba(0,0,0,0.8)] bg-[#120E0B] p-2 sm:p-4">
            {/* Hanging Bells Decoration along arch top */}
            <div className="flex justify-around items-center px-4 sm:px-8 py-3 border-b border-[#D4AF37]/20 bg-[#1A1410]">
              <TempleBell className="w-5 h-8 text-[#D4AF37] opacity-80" />
              <TempleBell className="w-6 h-10 text-[#D4AF37]" />
              <TempleBell className="w-7 h-12 text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
              <TempleBell className="w-6 h-10 text-[#D4AF37]" />
              <TempleBell className="w-5 h-8 text-[#D4AF37] opacity-80" />
            </div>

            {/* Inner Stage Container */}
            <div className="relative min-h-[520px] rounded-2xl overflow-hidden bg-[#0F0B09] flex flex-col justify-center">
              {/* INTERIOR CONTENT: The RSVP Form & Inner Sanctum */}
              <div className="relative z-10 p-6 sm:p-10 w-full max-w-lg mx-auto">
                {state.success || previewSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h3 className="font-serif text-3xl font-normal text-white">
                      RSVP Confirmed
                    </h3>
                    <p className="text-sm text-[#F5F2EB]/80 leading-relaxed font-serif">
                      {state.message ||
                        "Your presence has been lovingly recorded. We eagerly await welcoming you!"}
                    </p>
                    <p className="text-xs tracking-widest uppercase text-[#D4AF37] font-sans">
                      With Warmth, {coupleNames}
                    </p>
                  </motion.div>
                ) : (
                  <form action={formAction} className="space-y-5 text-left">
                    <div className="text-center mb-6">
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#E8D5A0] font-normal">
                        Will You Grace Our Union?
                      </h3>
                      <p className="text-xs uppercase tracking-widest text-[#F5F2EB]/60 font-sans mt-1">
                        Please respond before the ceremonies
                      </p>
                    </div>

                    {/* Guest Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold"
                      >
                        Your Full Name(s) *
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        placeholder="e.g. Ramesh &amp; Family"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#D4AF37]/30 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>

                    {/* Guest Count */}
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>Number of Attendees</span>
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setGuestCount(num)}
                            className={`py-2 rounded-lg text-xs font-serif transition-colors border ${
                              guestCount === num
                                ? "bg-[#7E1D1D] text-white border-[#D4AF37]"
                                : "bg-white/5 text-[#F5F2EB]/70 border-white/10 hover:border-[#D4AF37]/40"
                            }`}
                          >
                            {num} {num === 5 ? "+" : ""}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="guestCount" value={guestCount} />
                    </div>

                    {/* Ceremony Selection */}
                    {events.length > 0 && (
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Attending Ceremony</span>
                        </label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#1A1410] border border-[#D4AF37]/30 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="Full Celebration">All Auspicious Events</option>
                          {events.map((e, i) => (
                            <option
                              key={i}
                              value={`${e.title} (${e.time || "Scheduled Time"})`}
                            >
                              {e.title} - {e.date} {e.time ? `(${e.time})` : ""}
                            </option>
                          ))}
                        </select>
                        <input
                          type="hidden"
                          name="attendanceTime"
                          value={selectedTime}
                        />
                      </div>
                    )}

                    {/* Accommodation (if enabled) */}
                    {askAccommodation && (
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                          <Hotel className="w-3.5 h-3.5" />
                          <span>Require Guest Accommodation?</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {["no", "yes"].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setNeedsAccom(val)}
                              className={`py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors border ${
                                needsAccom === val
                                  ? "bg-[#7E1D1D] text-white border-[#D4AF37]"
                                  : "bg-white/5 text-[#F5F2EB]/60 border-white/10"
                              }`}
                            >
                              {val === "yes" ? "Yes, Required" : "No, Self-Arranged"}
                            </button>
                          ))}
                        </div>
                        <input
                          type="hidden"
                          name="needsAccommodation"
                          value={needsAccom}
                        />
                      </div>
                    )}

                    {state.error && (
                      <p className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-800">
                        {state.error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7E1D1D] via-[#A82A2A] to-[#7E1D1D] text-white font-sans text-xs tracking-[0.25em] uppercase font-bold hover:brightness-110 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 border border-[#D4AF37]/50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isPending ? "Recording Presence..." : "Confirm Blessing & RSVP"}</span>
                    </button>
                  </form>
                )}
              </div>

              {/* OVERLAY: THE DUAL CARVED WOODEN TEMPLE DOORS */}
              <AnimatePresence>
                {!isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex cursor-pointer select-none"
                    onClick={() => setIsOpen(true)}
                  >
                    {/* Left Door Leaf */}
                    <motion.div
                      exit={{ rotateY: -85, x: "-15%" }}
                      transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
                      className="relative w-1/2 h-full [transform-origin:left_center] [transform-style:preserve-3d] shadow-2xl overflow-hidden border-r border-[#16120E]"
                    >
                      <Image
                        src="/images/templates/temple-journey/temple_doors.jpg"
                        alt="Left Temple Door"
                        fill
                        className="object-cover object-left"
                      />
                      <div className="absolute inset-0 bg-black/25 hover:bg-black/10 transition-colors" />
                    </motion.div>

                    {/* Right Door Leaf */}
                    <motion.div
                      exit={{ rotateY: 85, x: "15%" }}
                      transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
                      className="relative w-1/2 h-full [transform-origin:right_center] [transform-style:preserve-3d] shadow-2xl overflow-hidden border-l border-[#16120E]"
                    >
                      <Image
                        src="/images/templates/temple-journey/temple_doors.jpg"
                        alt="Right Temple Door"
                        fill
                        className="object-cover object-right"
                      />
                      <div className="absolute inset-0 bg-black/25 hover:bg-black/10 transition-colors" />
                    </motion.div>

                    {/* Center Latch & Tap to Open Prompt */}
                    <motion.div
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none p-6 text-center"
                    >
                      <div className="px-6 py-4 rounded-2xl bg-black/75 backdrop-blur-md border border-[#D4AF37] shadow-2xl flex flex-col items-center space-y-2 animate-bounce">
                        <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                        <span className="font-serif text-base sm:text-lg text-white font-normal">
                          Touch to Open Temple Doors
                        </span>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8D5A0] font-sans">
                          Enter Sanctum to RSVP
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

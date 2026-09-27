"use client";

import React, { useState, useActionState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Hotel, Send, Users, Clock, X } from "lucide-react";
import { submitRsvpAction, type RsvpActionState } from "@/lib/actions/rsvp-actions";
import { type InviteEvent } from "@/lib/validations";

interface RsvpDoorWelcomeProps {
  inviteId: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  city: string;
  events?: InviteEvent[];
  askAccommodation?: boolean;
  preview?: boolean;
  enableRsvp?: boolean;
}

const initialRsvpState: RsvpActionState = {};

export function RsvpDoorWelcome({
  inviteId,
  brideName,
  groomName,
  weddingDate,
  city,
  events = [],
  askAccommodation = false,
  preview = false,
  enableRsvp = true,
}: RsvpDoorWelcomeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [selectedTime, setSelectedTime] = useState<string>(
    events.length > 0
      ? `${events[0].title} (${events[0].time || "Scheduled Time"})`
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

  const groomFirst = groomName.split(" ")[0];
  const brideFirst = brideName.split(" ")[0];

  return (
    <section
      id="welcome"
      className="relative w-full min-h-screen bg-[#F7F2E7] text-[#2B1B17] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* 1. TOP FLOATING NAVIGATION BAR */}
      <header className="relative z-30 w-full px-6 py-5 flex items-center justify-between max-w-6xl mx-auto transition-all duration-300">
        <div className="font-serif text-lg sm:text-2xl tracking-[0.25em] text-[#801818] font-bold drop-shadow-sm">
          {groomFirst[0]} &amp; {brideFirst[0]}
        </div>

        <nav className="flex items-center gap-3 sm:gap-7 font-serif text-xs sm:text-sm tracking-wider text-[#4A382E] bg-white/70 backdrop-blur-md px-5 sm:px-7 py-2.5 rounded-full border border-[#D4AF37]/35 shadow-sm">
          <a href="#welcome" className="text-[#801818] font-semibold border-b-2 border-[#801818] pb-0.5">
            RSVP
          </a>
          <a href="#venue" className="hover:text-[#801818] transition-colors cursor-pointer hidden sm:inline">
            Venue
          </a>
          <a href="#wedding" className="hover:text-[#801818] transition-colors cursor-pointer">
            Wedding
          </a>
          <a href="#family" className="hover:text-[#801818] transition-colors cursor-pointer hidden sm:inline">
            Family
          </a>
          <a href="#sanctum" className="hover:text-[#801818] transition-colors cursor-pointer text-[#801818] font-semibold">
            Invitation
          </a>
        </nav>
      </header>

      {/* 2. SECTION 1 WELCOME HEADER TYPOGRAPHY */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 pt-6 sm:pt-10 text-center space-y-4">
        {/* Sacred Floral Diamond Crest */}
        <div className="text-[#801818] mb-1">
          <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7 mx-auto opacity-90 drop-shadow-sm">
            <path d="M16 2 C18 8, 24 14, 30 16 C24 18, 18 24, 16 30 C14 24, 8 18, 2 16 C8 14, 14 8, 16 2 Z" />
            <circle cx="16" cy="16" r="2.5" fill="#FFF" />
          </svg>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl text-[#801818] font-normal tracking-[0.12em] uppercase">
          RSVP
        </h1>

        <p className="font-serif text-sm sm:text-base text-[#554339] italic max-w-lg mx-auto leading-relaxed">
          &ldquo;Together with our families, we joyfully request the honour of your presence and blessings.&rdquo;
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 text-[#801818] pt-1">
          <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#801818]" />
          <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
        </div>

        <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#735A4B] font-medium">
          {weddingDate} &bull; {city}
        </p>
      </div>

      {/* 3. ORNATE TRADITIONAL TEMPLE DOORWAY (INTERACTIVE HERO) */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        {/* Door Container with Hover & Click Effect */}
        <motion.div
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => {
            if (enableRsvp) setIsModalOpen(true);
          }}
          className="relative w-full aspect-[3/4] max-w-[460px] sm:max-w-[490px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(43,27,23,0.22)] border-2 border-[#D4AF37]/50 cursor-pointer group will-change-transform"
        >
          {/* Temple Doorway Image */}
          <Image
            src="/images/templates/classic-illustration/temple_rsvp_doors.jpg"
            alt="Traditional Temple RSVP Entrance"
            fill
            priority
            sizes="(max-width: 640px) 90vw, 490px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Golden Warm Ambient Lighting Overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/15 to-black/40 pointer-events-none" />

          {/* Central Callout Over the Carved Doors */}
          <div className="absolute inset-x-0 bottom-16 sm:bottom-20 z-20 flex flex-col items-center justify-center px-6 text-center space-y-4">
            <div className="bg-[#FAF5EC]/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#D4AF37]/60 shadow-xl space-y-2 group-hover:bg-[#FAF5EC] transition-colors duration-300">
              <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#801818] font-semibold">
                We&apos;d love to have you with us
              </p>

              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#801818] group-hover:bg-[#601212] text-white font-serif text-xs uppercase tracking-[0.25em] font-medium transition-all shadow-md group-hover:shadow-lg"
              >
                <span>Click the door to RSVP</span>
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Subtle Indicator */}
        <p className="font-serif text-xs tracking-widest text-[#735A4B] mt-4 uppercase opacity-80">
          Touch doorway above to register attendance
        </p>
      </div>

      {/* 4. RSVP MODAL / DRAWER FORM */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-lg bg-[#FAF5EC] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-10 shadow-2xl text-left my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-200/60 hover:bg-stone-200 text-[#2B1B17] flex items-center justify-center transition-colors"
                aria-label="Close RSVP form"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Form Header */}
              <div className="text-center space-y-2 mb-6">
                <div className="text-[#801818] mb-1">
                  <svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 mx-auto opacity-90">
                    <path d="M16 2 C18 8, 24 14, 30 16 C24 18, 18 24, 16 30 C14 24, 8 18, 2 16 C8 14, 14 8, 16 2 Z" />
                  </svg>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#801818] font-normal">
                  Will You Grace Our Union?
                </h2>

                <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#554339]">
                  Please respond with your blessings
                </p>
              </div>

              {state.success || previewSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#2B1B17] font-normal">
                    RSVP Confirmed
                  </h3>
                  <p className="text-sm font-serif text-[#554339] max-w-md mx-auto">
                    {state.message || "Your attendance details have been recorded. We look forward to celebrating together!"}
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-[#801818] text-white font-serif text-xs uppercase tracking-[0.2em]"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form action={formAction} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs uppercase tracking-wider text-[#801818] font-semibold">
                      Your Full Name(s) *
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Ramesh &amp; Family"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/40 text-[#2B1B17] placeholder-stone-400 text-sm focus:outline-none focus:border-[#801818]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#801818] font-semibold flex items-center gap-1.5">
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
                              ? "bg-[#801818] text-white border-[#801818]"
                              : "bg-white text-[#554339] border-stone-200 hover:border-[#801818]"
                          }`}
                        >
                          {num} {num === 5 ? "+" : ""}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="guestCount" value={guestCount} />
                  </div>

                  {events.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-[#801818] font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Attending Ceremony</span>
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/40 text-[#2B1B17] text-sm focus:outline-none focus:border-[#801818]"
                      >
                        <option value="Full Celebration">All Auspicious Events</option>
                        {events.map((e, i) => (
                          <option key={i} value={`${e.title} (${e.time || "Scheduled Time"})`}>
                            {e.title} - {e.date} {e.time ? `(${e.time})` : ""}
                          </option>
                        ))}
                      </select>
                      <input type="hidden" name="attendanceTime" value={selectedTime} />
                    </div>
                  )}

                  {askAccommodation && (
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-[#801818] font-semibold flex items-center gap-1.5">
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
                                ? "bg-[#801818] text-white border-[#801818]"
                                : "bg-white text-[#554339] border-stone-200"
                            }`}
                          >
                            {val === "yes" ? "Yes, Required" : "No, Self-Arranged"}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="needsAccommodation" value={needsAccom} />
                    </div>
                  )}

                  {state.error && (
                    <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-200">
                      {state.error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 rounded-xl bg-[#801818] hover:bg-[#601212] text-white font-serif text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 mt-4"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isPending ? "Recording Presence..." : "Confirm Blessing & RSVP"}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Scroll Indicator to Venue */}
      <div className="relative z-10 w-full pb-6 text-center">
        <a
          href="#venue"
          className="inline-flex flex-col items-center gap-1 text-[10px] tracking-[0.3em] uppercase text-[#735A4B] font-sans hover:text-[#801818] transition-colors"
        >
          <span>Explore The Venue</span>
          <span className="text-xs animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
}

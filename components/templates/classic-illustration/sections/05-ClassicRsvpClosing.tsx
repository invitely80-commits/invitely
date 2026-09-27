"use client";

import React, { useState, useActionState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Hotel, Send, Users, Clock } from "lucide-react";
import { submitRsvpAction, type RsvpActionState } from "@/lib/actions/rsvp-actions";
import { type InviteEvent } from "@/lib/validations";

interface ClassicRsvpClosingProps {
  inviteId: string;
  events?: InviteEvent[];
  askAccommodation?: boolean;
  preview?: boolean;
  coupleNames?: string;
  enableRsvp?: boolean;
  weddingDate?: string;
}

const initialRsvpState: RsvpActionState = {};

export function ClassicRsvpClosing({
  inviteId,
  events = [],
  askAccommodation = false,
  preview = false,
  coupleNames = "The Couple",
  enableRsvp = true,
  weddingDate = "12 · 01 · 2027",
}: ClassicRsvpClosingProps) {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="rsvp"
      className="relative w-full py-28 px-4 sm:px-6 bg-[#F7F2E7] text-[#2B1B17] overflow-hidden select-none border-t border-[#D4AF37]/30"
    >
      <div className="max-w-2xl mx-auto text-center space-y-16">
        {/* RSVP CARD */}
        {enableRsvp && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="bg-[#FAF5EC] p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/45 shadow-xl space-y-6 text-left"
          >
            <div className="text-center space-y-2 mb-6">
              <div className="text-[#801818] mb-1">
                <svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 mx-auto opacity-90">
                  <path d="M16 2 C18 8, 24 14, 30 16 C24 18, 18 24, 16 30 C14 24, 8 18, 2 16 C8 14, 14 8, 16 2 Z" />
                </svg>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#801818] font-normal">
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
              </div>
            ) : (
              <form action={formAction} className="space-y-5">
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
                  className="w-full py-4 rounded-xl bg-[#801818] hover:bg-[#601212] text-white font-serif text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isPending ? "Recording Presence..." : "Confirm Blessing & RSVP"}</span>
                </button>
              </form>
            )}
          </motion.div>
        )}

        {/* CLOSING BLESSING & SHUBHAMASTU */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-4 pt-6"
        >
          <div className="text-[#801818] mb-1">
            <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7 mx-auto opacity-90">
              <path d="M16 2 C18 8, 24 14, 30 16 C24 18, 18 24, 16 30 C14 24, 8 18, 2 16 C8 14, 14 8, 16 2 Z" />
            </svg>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl text-[#801818] font-normal tracking-wide">
            || शुभमस्तु ||
          </h3>

          <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#554339]">
            May Auspiciousness Abound
          </p>

          <p className="font-serif text-xl sm:text-2xl text-[#2B1B17] font-normal pt-2">
            {coupleNames}
          </p>

          <p className="font-serif text-xs tracking-[0.25em] text-[#735A4B] uppercase">
            {weddingDate}
          </p>

          <p className="font-serif text-xs sm:text-sm text-[#554339] italic max-w-sm mx-auto pt-3">
            &ldquo;Thank you for gracing our auspicious new beginning with your prayers and blessings.&rdquo;
          </p>

          {/* Return to Top Button */}
          <div className="pt-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/70 hover:bg-white text-[#801818] border border-[#D4AF37]/40 text-xs font-serif tracking-[0.25em] uppercase font-semibold transition-all shadow-sm hover:shadow"
            >
              <span>Return to Top</span>
              <span>↑</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

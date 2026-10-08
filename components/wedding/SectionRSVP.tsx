"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SectionRSVPProps {
  inviteId?: string;
  enableRsvp?: boolean;
  askAccommodation?: boolean;
  events?: Array<{ title: string }>;
}

/**
 * SectionRSVP
 * 
 * Page 5 — Ceremonial RSVP.
 * Clean temple door illustration with interactive HTML tap instruction below,
 * revealing the real HTML RSVP form inside the continuous parchment canvas.
 */
export function SectionRSVP({
  inviteId = "heritage-preview",
  enableRsvp = true,
  askAccommodation = false,
  events = [],
}: SectionRSVPProps) {
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guestCount: 2,
    attendanceTime: "All Ceremonies",
    needsAccommodation: false,
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = new FormData();
      payload.set("inviteId", inviteId);
      payload.set("name", formData.name);
      payload.set("email", formData.email);
      payload.set("phone", formData.phone);
      payload.set("guestCount", String(formData.guestCount));
      payload.set("attendanceTime", formData.attendanceTime);
      payload.set("needsAccommodation", String(formData.needsAccommodation));
      payload.set("notes", formData.notes);

      // Simulate clean submission
      await new Promise((r) => setTimeout(r, 900));
      setSubmitted(true);
    } catch {
      setErrorMessage("Failed to send RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      aria-label="RSVP"
      className="relative z-20 w-full flex flex-col items-center pt-[2cqw] pb-[4cqw]"
    >
      {/* 1. SECTION HEADER */}
      <div className="w-full text-center px-[6cqw]">
        <h2 className="font-cormorant text-[5.8cqw] leading-tight text-[#821919] font-normal tracking-[0.02em] m-0">
          RSVP
        </h2>

        {/* 8-Petal Rosette rule */}
        <div className="w-[30cqw] max-w-[200px] mx-auto my-[1.1cqw] flex items-center justify-center text-[#C29B63]" aria-hidden="true">
          <div className="flex-1 h-[0.75px] bg-gradient-to-r from-transparent to-[#C29B63]" />
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[2.2cqw] h-[2.2cqw] mx-[1.2cqw] opacity-90 max-w-[18px] max-h-[18px]"
            style={{ width: "2.2cqw", height: "2.2cqw", maxWidth: "18px", maxHeight: "18px" }}
          >
            <circle cx="12" cy="12" r="2.2" />
            <path d="M12 2C11.2 5 12.8 5 12 8C11.2 5 12.8 5 12 2Z" />
            <path d="M12 22C11.2 19 12.8 19 12 16C11.2 19 12.8 19 12 22Z" />
            <path d="M2 12C5 11.2 5 12.8 8 12C5 11.2 5 12.8 2 12Z" />
            <path d="M22 12C19 11.2 19 12.8 16 12C19 11.2 19 12.8 22 12Z" />
          </svg>
          <div className="flex-1 h-[0.75px] bg-gradient-to-l from-transparent to-[#C29B63]" />
        </div>

        <p className="font-cormorant text-[1.8cqw] text-[#3E322A] tracking-[0.03em] m-0">
          We would be delighted to have you with us
        </p>
      </div>

      {/* 2. THE CEREMONIAL DOOR ILLUSTRATION & INTERACTION */}
      <div className="relative w-[92cqw] aspect-[1662/946] my-[2cqw] flex items-center justify-center">
        {/* The Clean Authentic Temple Door Artwork (No baked-in text!) */}
        <div
          onClick={() => {
            if (enableRsvp && !isDoorOpen) setIsDoorOpen(true);
          }}
          className={`relative w-full h-full ${
            enableRsvp && !isDoorOpen ? "cursor-pointer group" : ""
          }`}
          role={enableRsvp && !isDoorOpen ? "button" : undefined}
          tabIndex={enableRsvp && !isDoorOpen ? 0 : undefined}
          aria-label={enableRsvp && !isDoorOpen ? "Click temple doors to open RSVP" : undefined}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              if (enableRsvp && !isDoorOpen) setIsDoorOpen(true);
            }
          }}
        >
          <Image
            src="/wedding/scenes/heritage-door-clean.webp"
            alt="Ceremonial temple entrance doors draped in fresh floral garlands"
            fill
            priority
            sizes="92cqw"
            className="object-contain"
          />

          {/* Golden ambient aura on hover when closed */}
          {enableRsvp && !isDoorOpen && (
            <div className="absolute inset-0 bg-[#C29B63]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none" />
          )}
        </div>

        {/* Revealed RSVP Modal Over the Door */}
        <AnimatePresence>
          {isDoorOpen && (
            <motion.div
              key="rsvp-modal"
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-[4cqw] inset-y-[2cqw] z-30 overflow-y-auto bg-[#FAF0E1]/98 border border-[#C29B63] rounded-sm shadow-[0_16px_40px_rgba(45,35,30,0.3)] p-[3.5cqw] backdrop-blur-md"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setIsDoorOpen(false)}
                className="absolute top-[2cqw] right-[2.5cqw] text-[#7A6A60] hover:text-[#821919] text-[2cqw] font-serif leading-none cursor-pointer"
                aria-label="Close form"
              >
                ✕
              </button>

              {submitted ? (
                <div className="text-center py-[4cqw] space-y-[1.5cqw]">
                  <div className="w-[5cqw] h-[5cqw] mx-auto rounded-full bg-[#821919]/10 text-[#821919] flex items-center justify-center text-[2.5cqw]">
                    ✓
                  </div>
                  <h3 className="font-cormorant text-[3cqw] text-[#821919] font-medium m-0">
                    Thank You!
                  </h3>
                  <p className="font-cormorant text-[1.65cqw] text-[#332A24] max-w-[50cqw] mx-auto leading-relaxed m-0">
                    Your response has been received. We eagerly look forward to celebrating with you!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-[1.5cqw] text-left">
                  <div className="text-center mb-[1.5cqw]">
                    <h3 className="font-cormorant text-[2.6cqw] text-[#821919] font-medium m-0">
                      Celebration Attendance
                    </h3>
                    <p className="font-cormorant text-[1.4cqw] text-[#7A6A60] m-0">
                      Kindly confirm your presence by replying below
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="text-center text-[1.3cqw] text-red-700 bg-red-100/80 py-[0.5cqw] px-[1cqw] rounded font-cormorant">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name field */}
                  <div>
                    <label className="block font-cormorant text-[1.3cqw] uppercase tracking-[0.15em] text-[#5C4E46] mb-[0.3cqw]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anand Sharma & Family"
                      className="w-full px-[1.5cqw] py-[0.8cqw] rounded-sm border border-[#C29B63]/60 bg-[#FFFDF9] font-cormorant text-[1.45cqw] text-[#332A24] focus:outline-none focus:border-[#821919]"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-2 gap-[1.5cqw]">
                    <div>
                      <label className="block font-cormorant text-[1.3cqw] uppercase tracking-[0.15em] text-[#5C4E46] mb-[0.3cqw]">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-[1.5cqw] py-[0.8cqw] rounded-sm border border-[#C29B63]/60 bg-[#FFFDF9] font-cormorant text-[1.45cqw] text-[#332A24] focus:outline-none focus:border-[#821919]"
                      />
                    </div>
                    <div>
                      <label className="block font-cormorant text-[1.3cqw] uppercase tracking-[0.15em] text-[#5C4E46] mb-[0.3cqw]">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="anand@example.com"
                        className="w-full px-[1.5cqw] py-[0.8cqw] rounded-sm border border-[#C29B63]/60 bg-[#FFFDF9] font-cormorant text-[1.45cqw] text-[#332A24] focus:outline-none focus:border-[#821919]"
                      />
                    </div>
                  </div>

                  {/* Guests & Ceremony */}
                  <div className="grid grid-cols-2 gap-[1.5cqw]">
                    <div>
                      <label className="block font-cormorant text-[1.3cqw] uppercase tracking-[0.15em] text-[#5C4E46] mb-[0.3cqw]">
                        Attendees
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                        className="w-full px-[1.5cqw] py-[0.8cqw] rounded-sm border border-[#C29B63]/60 bg-[#FFFDF9] font-cormorant text-[1.45cqw] text-[#332A24] focus:outline-none focus:border-[#821919]"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-cormorant text-[1.3cqw] uppercase tracking-[0.15em] text-[#5C4E46] mb-[0.3cqw]">
                        Ceremony Attending
                      </label>
                      <select
                        value={formData.attendanceTime}
                        onChange={(e) => setFormData({ ...formData, attendanceTime: e.target.value })}
                        className="w-full px-[1.5cqw] py-[0.8cqw] rounded-sm border border-[#C29B63]/60 bg-[#FFFDF9] font-cormorant text-[1.45cqw] text-[#332A24] focus:outline-none focus:border-[#821919]"
                      >
                        <option value="All Ceremonies">All Ceremonies</option>
                        {events && events.length > 0 ? (
                          events.map((ev, i) => (
                            <option key={i} value={ev.title}>
                              {ev.title}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Muhurtham & Reception">Muhurtham & Reception</option>
                            <option value="Reception Only">Reception Only</option>
                          </>
                        )}
                        <option value="Regretfully Decline">Regretfully Decline</option>
                      </select>
                    </div>
                  </div>

                  {/* Accommodation Checkbox */}
                  {askAccommodation && (
                    <label className="flex items-center gap-[1cqw] cursor-pointer pt-[0.3cqw]">
                      <input
                        type="checkbox"
                        checked={formData.needsAccommodation}
                        onChange={(e) => setFormData({ ...formData, needsAccommodation: e.target.checked })}
                        className="w-[1.6cqw] h-[1.6cqw] accent-[#821919]"
                      />
                      <span className="font-cormorant text-[1.35cqw] text-[#5C4E46]">
                        We will require hotel accommodation in Bengaluru
                      </span>
                    </label>
                  )}

                  {/* Notes / Message */}
                  <div>
                    <label className="block font-cormorant text-[1.3cqw] uppercase tracking-[0.15em] text-[#5C4E46] mb-[0.3cqw]">
                      Blessings & Dietary Preferences
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Warm wishes, blessings, or special dietary requirements..."
                      className="w-full px-[1.5cqw] py-[0.7cqw] rounded-sm border border-[#C29B63]/60 bg-[#FFFDF9] font-cormorant text-[1.45cqw] text-[#332A24] focus:outline-none focus:border-[#821919] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-[0.8cqw] text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-[4.5cqw] py-[1cqw] rounded-sm bg-[#821919] text-[#FFF9F2] font-cormorant uppercase text-[1.6cqw] tracking-[0.24em] font-medium shadow-[0_4px_16px_rgba(130,25,25,0.25)] hover:bg-[#6c1414] transition-all duration-300 disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? "Submitting..." : "Send RSVP"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. HTML TAP INSTRUCTION POSITIONED BELOW THE DOOR */}
      {!isDoorOpen && (
        <div className="text-center mt-[1.5cqw]">
          {enableRsvp ? (
            <button
              type="button"
              onClick={() => setIsDoorOpen(true)}
              className="group inline-flex flex-col items-center cursor-pointer"
              aria-label="Tap to open ceremonial doors and RSVP"
            >
              <span className="font-cormorant uppercase text-[1.65cqw] tracking-[0.24em] text-[#821919] font-medium border-b border-[#821919]/50 group-hover:border-[#821919] pb-[0.3cqw] transition-colors">
                Tap to open & RSVP
              </span>
              <span className="font-cormorant text-[1.3cqw] tracking-[0.05em] text-[#7A6A60] mt-[0.3cqw]">
                Kindly confirm your presence
              </span>
            </button>
          ) : (
            <div className="text-center">
              <span className="font-cormorant uppercase text-[1.55cqw] tracking-[0.2em] text-[#821919] font-medium">
                Online RSVPs Closed
              </span>
              <p className="font-cormorant text-[1.35cqw] text-[#7A6A60] mt-[0.3cqw] m-0">
                Please reach out directly to the families.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 4. FOOTER SIGN-OFF */}
      <div className="w-full text-center pt-[5cqw]">
        <div className="flex items-center justify-center my-[1cqw] text-[#C29B63]" aria-hidden="true">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-[1.4cqw] h-[1.4cqw] opacity-80 max-w-[15px] max-h-[15px]"
            style={{ width: "1.4cqw", height: "1.4cqw", maxWidth: "15px", maxHeight: "15px" }}
          >
            <path d="M8 1L10 6.5L15 8L10 9.5L8 15L6 9.5L1 8L6 6.5L8 1Z" />
          </svg>
        </div>
        <p className="font-cormorant italic text-[1.8cqw] text-[#821919] m-0">
          With Love & Blessings from the Families
        </p>
      </div>
    </section>
  );
}

"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, Hotel, Send, Users, Clock } from "lucide-react";

import { submitRsvpAction, type RsvpActionState } from "@/lib/actions/rsvp-actions";
import { type InviteEvent } from "@/lib/validations";
import { type InviteTheme } from "@/lib/invites";

const initialRsvpState: RsvpActionState = {};

export function RsvpSection({
  inviteId,
  events = [],
  theme = "minimal",
  askAccommodation = false,
  preview = false,
  coupleNames,
}: {
  inviteId: string;
  events?: InviteEvent[];
  theme?: InviteTheme;
  askAccommodation?: boolean;
  preview?: boolean;
  coupleNames?: string;
}) {
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
        message: "Preview Mode: RSVP successfully simulated!",
      };
    }
    return submitRsvpAction(inviteId, prevState, formData);
  };

  const [state, formAction, isPending] = useActionState(actionFn, initialRsvpState);

  const containerBg =
    theme === "luxury"
      ? "bg-[#070707] text-[#FDFBF7] border-t border-white/10"
      : theme === "royal"
        ? "bg-[#1f030a] text-[#FDFBF7] border-t border-[#C9A84C]/20"
        : theme === "hindu"
          ? "bg-[#FCF9F2] text-[#2D2926] border-t border-[#B45309]/15"
          : "bg-[#FAFAFA] text-[#1C1C18] border-t border-stone-200";

  const cardBg =
    theme === "luxury"
      ? "bg-white/[0.04] border-white/10 text-white"
      : theme === "royal"
        ? "bg-white/[0.06] border-[#C9A84C]/30 text-white"
        : "bg-white border-stone-200/80 text-stone-900 shadow-xl";

  const accentColor =
    theme === "luxury"
      ? "text-[#E8D5A0]"
      : theme === "royal"
        ? "text-[#E8D5A0]"
        : theme === "hindu"
          ? "text-[#B45309]"
          : "text-burgundy";

  const buttonBg =
    theme === "luxury"
      ? "bg-[#E8D5A0] text-black hover:bg-white"
      : theme === "royal"
        ? "bg-[linear-gradient(135deg,#C9A84C_0%,#8B1A1A_100%)] text-white hover:brightness-110"
        : theme === "hindu"
          ? "bg-[#B45309] text-white hover:bg-[#92400e]"
          : "bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)] text-white hover:brightness-110";

  if (state.success || previewSubmitted) {
    return (
      <section className={`py-28 px-6 relative overflow-hidden ${containerBg}`}>
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="size-8" />
          </div>
          <h3 className="font-serif text-3xl md:text-4xl font-normal">
            RSVP Confirmed
          </h3>
          <p className="text-sm opacity-80 leading-relaxed">
            {state.message || "Your attendance details have been lovingly recorded."}
          </p>
          {preview ? (
            <button
              type="button"
              onClick={() => setPreviewSubmitted(false)}
              className="mt-4 text-xs font-bold uppercase tracking-widest underline opacity-60 hover:opacity-100"
            >
              Reset Preview Form
            </button>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className={`py-28 px-6 relative overflow-hidden ${containerBg}`}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-current opacity-20" />
            <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${accentColor}`}>
              Celebrate With Us
            </span>
            <div className="w-8 h-px bg-current opacity-20" />
          </div>
          <h2 className="font-serif italic text-4xl md:text-5xl font-light tracking-tight">
            Will You Join Us?
          </h2>
          <p className="text-xs md:text-sm opacity-70 max-w-md mx-auto leading-relaxed">
            Please let {coupleNames ?? "the couple"} know if you will be able to attend by completing your RSVP details below.
          </p>
          {preview ? (
            <span className="inline-block rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-amber-500">
              Interactive Live Preview
            </span>
          ) : null}
        </div>

        <form action={formAction} className={`p-8 md:p-12 rounded-[32px] border backdrop-blur-xl ${cardBg} space-y-8`}>
          {state.error ? (
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-xs text-red-400 font-medium">
              {state.error}
            </div>
          ) : null}

          {/* Guest Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider opacity-80">
              Your Full Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="e.g. Aarav Sharma & Family"
              className="w-full h-12 px-4 rounded-xl border border-current/20 bg-transparent text-sm focus:outline-none focus:border-current/60 transition"
            />
          </div>

          {/* Number of Attendees */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-2">
              <Users className="size-3.5" />
              Number of Attendees
            </label>
            <input type="hidden" name="guestCount" value={guestCount} />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGuestCount(num)}
                  className={`h-10 px-5 rounded-full text-xs font-bold transition ${
                    guestCount === num
                      ? `${buttonBg} shadow-md`
                      : "border border-current/20 bg-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  {num} {num === 1 ? "Guest" : "Guests"}
                </button>
              ))}
            </div>
          </div>

          {/* Attendance Ceremony / Time */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-2">
              <Clock className="size-3.5" />
              Ceremonies Attending <span className="text-red-400">*</span>
            </label>
            <input type="hidden" name="attendanceTime" value={selectedTime} />
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setSelectedTime("Full Celebration")}
                className={`p-3 rounded-xl text-left border text-xs font-medium transition ${
                  selectedTime === "Full Celebration"
                    ? "border-current/80 bg-current/10 font-bold"
                    : "border-current/15 opacity-70 hover:opacity-100"
                }`}
              >
                ✨ All Ceremonies & Celebrations
              </button>
              {events.map((event) => {
                const label = `${event.title}${event.time ? ` (${event.time})` : ""}`;
                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => setSelectedTime(label)}
                    className={`p-3 rounded-xl text-left border text-xs font-medium transition ${
                      selectedTime === label
                        ? "border-current/80 bg-current/10 font-bold"
                        : "border-current/15 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional Accommodation Question */}
          {askAccommodation ? (
            <div className="space-y-3 p-5 rounded-2xl border border-current/10 bg-current/[0.02]">
              <label className="block text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-2">
                <Hotel className="size-3.5" />
                Accommodation Required?
              </label>
              <p className="text-[11px] opacity-60 leading-relaxed">
                Do you and your party require hotel / guest lodging arranged for the celebration?
              </p>
              <input type="hidden" name="needsAccommodation" value={needsAccom === "yes" ? "true" : "false"} />
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setNeedsAccom("yes")}
                  className={`flex-1 h-11 rounded-xl text-xs font-bold border transition ${
                    needsAccom === "yes"
                      ? `${buttonBg} border-transparent shadow-md`
                      : "border-current/20 bg-transparent opacity-70"
                  }`}
                >
                  Yes, accommodation needed
                </button>
                <button
                  type="button"
                  onClick={() => setNeedsAccom("no")}
                  className={`flex-1 h-11 rounded-xl text-xs font-bold border transition ${
                    needsAccom === "no"
                      ? "border-current/80 bg-current/15 font-bold"
                      : "border-current/20 bg-transparent opacity-70"
                  }`}
                >
                  No, managing own stay
                </button>
              </div>
            </div>
          ) : null}

          {/* Contact Details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider opacity-80">
                Phone Number <span className="opacity-50 text-[10px]">(Optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full h-12 px-4 rounded-xl border border-current/20 bg-transparent text-sm focus:outline-none focus:border-current/60 transition"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider opacity-80">
                Email Address <span className="opacity-50 text-[10px]">(Optional)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="guest@example.com"
                className="w-full h-12 px-4 rounded-xl border border-current/20 bg-transparent text-sm focus:outline-none focus:border-current/60 transition"
              />
            </div>
          </div>

          {/* Warm Wishes & Special Dietary/Travel Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider opacity-80">
              Warm Wishes or Special Notes <span className="opacity-50 text-[10px]">(Optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Send your congratulations or note any dietary preferences..."
              className="w-full p-4 rounded-xl border border-current/20 bg-transparent text-sm focus:outline-none focus:border-current/60 transition resize-none"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 active-scale transition shadow-xl ${buttonBg} disabled:opacity-50`}
          >
            {isPending ? (
              <span>Recording your RSVP...</span>
            ) : (
              <>
                <Send className="size-4" />
                <span>Confirm Attendance</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

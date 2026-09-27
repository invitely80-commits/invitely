"use client";

import React from "react";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

import { HeroIllustration } from "./sections/01-HeroIllustration";
import { FamilyBlessings } from "./sections/02-FamilyBlessings";
import { WeddingCeremonies } from "./sections/03-WeddingCeremonies";
import { VenuePalace } from "./sections/04-VenuePalace";
import { ClassicRsvpClosing } from "./sections/05-ClassicRsvpClosing";

interface ClassicIllustrationTemplateProps {
  invite: TemplateInvite;
  preview?: boolean;
}

export function ClassicIllustrationTemplate({
  invite,
  preview = false,
}: ClassicIllustrationTemplateProps) {
  const d = {
    brideName: invite.data.brideName || "Ananya",
    groomName: invite.data.groomName || "Shreyas",
    weddingDate: invite.data.weddingDate
      ? formatDisplayDate(invite.data.weddingDate)
      : "12 · 01 · 2027",
    city:
      invite.data.events[0]?.address.split(",").slice(-2)[0]?.trim() ||
      invite.data.events[0]?.venue ||
      "Bengaluru",
    events: invite.data.events || [],
    enableRsvp: invite.data.enableRsvp !== false,
    askAccommodation: invite.data.askAccommodation,
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F7F2E7] text-[#2B1B17] overflow-x-clip selection:bg-[#801818] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Cinzel:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* SEQUENCE 1: 3D PARALLAX HERO (GOPURAM -> LOTUS POND COUPLE) */}
      <HeroIllustration
        brideName={d.brideName}
        groomName={d.groomName}
        weddingDate={d.weddingDate}
        city={d.city}
      />

      {/* SEQUENCE 2: FAMILY BLESSINGS & ANCESTRAL HOMES */}
      <FamilyBlessings
        brideName={d.brideName}
        groomName={d.groomName}
      />

      {/* SEQUENCE 3: THE WEDDING & SACRED MANDAPAM CEREMONIES */}
      <WeddingCeremonies
        events={d.events}
      />

      {/* SEQUENCE 4: THE VENUE & ILLUSTRATED PALACE MAP */}
      <VenuePalace
        primaryEvent={d.events[0]}
      />

      {/* SEQUENCE 5: RSVP & CLOSING BLESSINGS */}
      <ClassicRsvpClosing
        inviteId={invite.id}
        events={d.events}
        askAccommodation={d.askAccommodation}
        preview={preview}
        coupleNames={`${d.groomName} & ${d.brideName}`}
        enableRsvp={d.enableRsvp}
        weddingDate={d.weddingDate}
      />
    </div>
  );
}

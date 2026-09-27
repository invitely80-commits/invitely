"use client";

import React from "react";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

import { RsvpDoorWelcome } from "./sections/01-RsvpDoorWelcome";
import { VenuePalace } from "./sections/02-VenuePalace";
import { WeddingCeremonies } from "./sections/03-WeddingCeremonies";
import { FamilyBlessings } from "./sections/04-FamilyBlessings";
import { HeroCoverSanctum } from "./sections/05-HeroCoverSanctum";

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
    description: invite.data.description || "",
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

      {/* SECTION 1: RSVP / WELCOME DOORWAY */}
      <RsvpDoorWelcome
        inviteId={invite.id}
        brideName={d.brideName}
        groomName={d.groomName}
        weddingDate={d.weddingDate}
        city={d.city}
        events={d.events}
        askAccommodation={d.askAccommodation}
        preview={preview}
        enableRsvp={d.enableRsvp}
      />

      {/* SECTION 2: THE VENUE & ILLUSTRATED PALACE MAP */}
      <VenuePalace
        primaryEvent={d.events[0]}
      />

      {/* SECTION 3: THE WEDDING & SACRED MANDAPAM CEREMONIES */}
      <WeddingCeremonies
        events={d.events}
      />

      {/* SECTION 4: FAMILY BLESSINGS & ANCESTRAL HOMES */}
      <FamilyBlessings
        brideName={d.brideName}
        groomName={d.groomName}
        description={d.description}
      />

      {/* SECTION 5: FINAL HERO / INVITATION COVER (GOPURAM -> SACRED PUSHKARINI) */}
      <HeroCoverSanctum
        brideName={d.brideName}
        groomName={d.groomName}
        weddingDate={d.weddingDate}
        city={d.city}
      />
    </div>
  );
}

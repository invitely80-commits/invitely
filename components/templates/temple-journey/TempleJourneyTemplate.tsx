"use client";

import React, { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

import { HeroArrival } from "./sections/01-HeroArrival";
import { EnteringTemple } from "./sections/02-EnteringTemple";
import { OurStory } from "./sections/03-OurStory";
import { MandapamWedding } from "./sections/04-MandapamWedding";
import { SacredRituals } from "./sections/05-SacredRituals";
import { VenuePavilion } from "./sections/06-VenuePavilion";
import { TempleGallery } from "./sections/07-TempleGallery";
import { Blessings } from "./sections/08-Blessings";
import { TempleRsvpDoors } from "./sections/09-TempleRsvpDoors";
import { ClosingSunset } from "./sections/10-ClosingSunset";

interface TempleJourneyTemplateProps {
  invite: TemplateInvite;
  preview?: boolean;
}

export function TempleJourneyTemplate({
  invite,
  preview = false,
}: TempleJourneyTemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const d = {
    brideName: invite.data.brideName || "Devi",
    groomName: invite.data.groomName || "Karthik",
    weddingDate: formatDisplayDate(invite.data.weddingDate),
    city:
      invite.data.events[0]?.address.split(",").slice(-2)[0]?.trim() ||
      "Chennai, India",
    heroImage: invite.data.heroImage || "",
    storyImage: invite.data.gallery?.[0] || "",
    description: invite.data.description,
    events: invite.data.events || [],
    gallery: invite.data.gallery || [],
    enableRsvp: invite.data.enableRsvp !== false,
    askAccommodation: invite.data.askAccommodation,
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#120E0B] text-[#F5F2EB] selection:bg-[#7E1D1D] selection:text-white"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Cinzel:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* 01. Arrival / Hero */}
      <HeroArrival
        brideName={d.brideName}
        groomName={d.groomName}
        weddingDate={d.weddingDate}
        city={d.city}
        heroImage={d.heroImage}
        scrollYProgress={smoothProgress}
      />

      {/* 02. Entering the Temple */}
      <EnteringTemple />

      {/* 03. Our Story */}
      <OurStory
        brideName={d.brideName}
        groomName={d.groomName}
        description={d.description}
        storyImage={d.storyImage}
      />

      {/* 04. The Wedding / Mandapam */}
      <MandapamWedding events={d.events} gallery={d.gallery} />

      {/* 05. The Sacred Rituals */}
      <SacredRituals />

      {/* 06. The Venue & Kalyana Mandapam */}
      <VenuePavilion primaryEvent={d.events[0]} />

      {/* 07. The Temple Gallery */}
      <TempleGallery gallery={d.gallery} />

      {/* 08. Blessings & Well Wishes */}
      <Blessings brideName={d.brideName} groomName={d.groomName} />

      {/* 09. Carved Temple Doors RSVP */}
      <TempleRsvpDoors
        inviteId={invite.id}
        events={d.events}
        askAccommodation={d.askAccommodation}
        preview={preview}
        coupleNames={`${d.brideName} & ${d.groomName}`}
        enableRsvp={d.enableRsvp}
      />

      {/* 10. Closing / Sunset Waters */}
      <ClosingSunset
        brideName={d.brideName}
        groomName={d.groomName}
        weddingDate={d.weddingDate}
      />
    </div>
  );
}

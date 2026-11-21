"use client";

import React from "react";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { WeddingInvitationShell } from "@/components/wedding/WeddingInvitationShell";
import { WeddingInvitationCanvas } from "@/components/wedding/WeddingInvitationCanvas";
import { SectionFamilies } from "@/components/wedding/SectionFamilies";
import { SectionDivider } from "@/components/wedding/SectionDivider";
import { type FamilyData } from "@/components/wedding/GroomFamily";
import { SectionTheWedding } from "@/components/wedding/SectionTheWedding";
import { SectionEvents, ALL_HERITAGE_EVENTS } from "@/components/wedding/SectionEvents";
import { SectionVenue } from "@/components/wedding/SectionVenue";
import { SectionRSVP } from "@/components/wedding/SectionRSVP";

export const DEFAULT_HERITAGE_MUSIC = "/wedding/music/south-indian-heritage.mp3";

export const DEMO_HERITAGE_DATA = {
  groomName: "SHREYAS",
  brideName: "ANANYA",
  weddingDate: "12 JAN 2027",
  ceremonyTime: "9:00 AM – 11:30 AM",
  venueName: "The Leela Palace",
  venueCity: "Bengaluru",
  venueAddress: "23, HAL Old Airport Road, Kodihalli, Bengaluru, Karnataka 560008",
  mapsUrl: "https://maps.google.com/?q=The+Leela+Palace+Bengaluru",
  subtitle: "Two families, one beautiful beginning",
  musicUrl: DEFAULT_HERITAGE_MUSIC,
  groomGrandparents: [
    "Late Sri Venkataraman Iyer\n& Smt. Lakshmi Ammal",
    "Sri Raghavan Iyer\n& Smt. Meenakshi Iyer",
  ],
  groomParents: [
    "Sri Suresh Iyer\n& Smt. Kavitha Suresh",
  ],
  brideGrandparents: [
    "Late Sri Narayanan Rao\n& Smt. Rukmini Rao",
    "Sri Krishnamurthy Sharma\n& Smt. Radha Sharma",
  ],
  brideParents: [
    "Sri Prakash Sharma\n& Smt. Anitha Prakash",
  ],
};

function parseLineageLines(text?: string, fallback: string[] = []): string[] {
  if (!text || !text.trim()) return fallback;
  const raw = text.trim();
  if (raw.includes("\n\n")) {
    return raw.split("\n\n").map((s) => s.trim()).filter(Boolean);
  }
  const lines = raw.split("\n").map((s) => s.trim()).filter(Boolean);
  const result: string[] = [];
  for (const line of lines) {
    if (line.startsWith("&") && result.length > 0) {
      result[result.length - 1] += "\n" + line;
    } else {
      result.push(line);
    }
  }
  return result.length > 0 ? result : fallback;
}

interface SouthIndianHeritageTemplateProps {
  invite: TemplateInvite;
  preview?: boolean;
}

/**
 * SouthIndianHeritageTemplate
 * 
 * Master Reusable Template for South Indian Heritage Wedding.
 * Renders all 5 sections inside ONE continuous luxury stationery canvas.
 */
export function SouthIndianHeritageTemplate({
  invite,
  preview: _preview = false,
}: SouthIndianHeritageTemplateProps) {
  const data = invite?.data;
  const groomName = (data?.groomName?.trim() || DEMO_HERITAGE_DATA.groomName).toUpperCase();
  const brideName = (data?.brideName?.trim() || DEMO_HERITAGE_DATA.brideName).toUpperCase();
  const weddingDate = data?.weddingDate?.trim() || DEMO_HERITAGE_DATA.weddingDate;

  const groomGrandparents = parseLineageLines(
    data?.familyDetails?.groomGrandparents,
    DEMO_HERITAGE_DATA.groomGrandparents
  );

  const groomParents = parseLineageLines(
    data?.familyDetails?.groomParents,
    DEMO_HERITAGE_DATA.groomParents
  );

  const brideGrandparents = parseLineageLines(
    data?.familyDetails?.brideGrandparents,
    DEMO_HERITAGE_DATA.brideGrandparents
  );

  const brideParents = parseLineageLines(
    data?.familyDetails?.brideParents,
    DEMO_HERITAGE_DATA.brideParents
  );

  const subtitle = data?.description?.trim() || DEMO_HERITAGE_DATA.subtitle;

  const groomFamily: FamilyData = {
    id: "groom",
    name: groomName,
    artwork: "/wedding/scenes/heritage-house-clean.webp",
    artworkAlt: `Ancestral Heritage Home of ${groomName}'s Family`,
    grandparents: groomGrandparents,
    parents: groomParents,
  };

  const brideFamily: FamilyData = {
    id: "bride",
    name: brideName,
    artwork: "/wedding/scenes/heritage-temple-clean.webp",
    artworkAlt: `Heritage Sanctuary of ${brideName}'s Family`,
    grandparents: brideGrandparents,
    parents: brideParents,
  };

  const firstEvent = data?.events?.[0];
  const venueName = firstEvent?.venue || DEMO_HERITAGE_DATA.venueName;
  const venueAddress = firstEvent?.address || DEMO_HERITAGE_DATA.venueAddress;
  const mapsUrl = firstEvent?.mapUrl || DEMO_HERITAGE_DATA.mapsUrl;

  const rawMusicUrl = (data as { musicUrl?: string })?.musicUrl;
  const musicUrl = rawMusicUrl && rawMusicUrl.trim() !== "" ? rawMusicUrl : DEFAULT_HERITAGE_MUSIC;

  return (
    <WeddingInvitationShell musicUrl={musicUrl}>
      {/* ================================================== */}
      {/* THE CONTINUOUS LUXURY INVITATION CANVAS            */}
      {/* ================================================== */}
      <WeddingInvitationCanvas>
        {/* 01 — FAMILIES (APPROVED BENCHMARK) */}
        <SectionFamilies
          groomFamily={groomFamily}
          brideFamily={brideFamily}
          subtitle={subtitle}
        />

        <SectionDivider />

        {/* 02 — THE WEDDING CEREMONY */}
        <SectionTheWedding
          weddingDate={weddingDate}
          ceremonyTime={firstEvent?.time || DEMO_HERITAGE_DATA.ceremonyTime}
          venueName={venueName}
          venueCity={DEMO_HERITAGE_DATA.venueCity}
          events={data?.events || ALL_HERITAGE_EVENTS}
        />

        <SectionDivider />

        {/* 03 — EVENTS TIMELINE (ALL 5 EVENTS) */}
        <SectionEvents events={data?.events} />

        <SectionDivider />

        {/* 04 — THE VENUE & INTERACTIVE MAP */}
        <SectionVenue
          venueName={venueName}
          venueCity={DEMO_HERITAGE_DATA.venueCity}
          venueAddress={venueAddress}
          mapsUrl={mapsUrl}
        />

        <SectionDivider />

        {/* 05 — CEREMONIAL RSVP DOOR & FORM */}
        <SectionRSVP
          inviteId={invite?.id}
          enableRsvp={data?.enableRsvp ?? true}
          askAccommodation={data?.askAccommodation ?? false}
          events={data?.events || ALL_HERITAGE_EVENTS}
        />
      </WeddingInvitationCanvas>
    </WeddingInvitationShell>
  );
}

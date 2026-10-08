"use client";

import React from "react";
import { WeddingInvitationShell } from "./WeddingInvitationShell";
import { WeddingInvitationCanvas } from "./WeddingInvitationCanvas";
import { SectionFamilies } from "./SectionFamilies";
import { SectionDivider } from "./SectionDivider";
import { type FamilyData } from "./GroomFamily";
import { SectionTheWedding } from "./SectionTheWedding";
import { SectionEvents } from "./SectionEvents";
import { SectionVenue } from "./SectionVenue";
import { SectionRSVP } from "./SectionRSVP";

export const PAGE1_FAMILIES: FamilyData[] = [
  {
    id: "shreyas",
    name: "SHREYAS",
    artwork: "/wedding/scenes/heritage-house-clean.webp",
    artworkAlt: "Ancestral Wooden Heritage House of Shreyas' Family",
    grandparents: [
      "Late Sri Venkataraman Iyer\n& Smt. Lakshmi Ammal",
      "Sri Raghavan Iyer\n& Smt. Meenakshi Iyer",
    ],
    parents: [
      "Sri Suresh Iyer\n& Smt. Kavitha Suresh",
    ],
  },
  {
    id: "ananya",
    name: "ANANYA",
    artwork: "/wedding/scenes/heritage-temple-clean.webp",
    artworkAlt: "Heritage Sanctuary of Ananya's Family",
    grandparents: [
      "Late Sri Narayanan Rao\n& Smt. Rukmini Rao",
      "Sri Krishnamurthy Sharma\n& Smt. Radha Sharma",
    ],
    parents: [
      "Sri Prakash Sharma\n& Smt. Anitha Prakash",
    ],
  },
];

interface WeddingPageProps {
  families?: FamilyData[];
  subtitle?: string;
}

export function WeddingPage({
  families = PAGE1_FAMILIES,
  subtitle = "Two families, one beautiful beginning",
}: WeddingPageProps) {
  return (
    <WeddingInvitationShell>
      <WeddingInvitationCanvas>
        {/* 01 — FAMILIES */}
        <SectionFamilies
          groomFamily={families[0]}
          brideFamily={families[1]}
          subtitle={subtitle}
        />

        <SectionDivider />

        {/* 02 — THE WEDDING */}
        <SectionTheWedding />

        <SectionDivider />

        {/* 03 — THE CELEBRATIONS */}
        <SectionEvents />

        <SectionDivider />

        {/* 04 — THE VENUE */}
        <SectionVenue />

        <SectionDivider />

        {/* 05 — RSVP */}
        <SectionRSVP />
      </WeddingInvitationCanvas>
    </WeddingInvitationShell>
  );
}

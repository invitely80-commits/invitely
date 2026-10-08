"use client";

import React from "react";
import { IntroText } from "./IntroText";
import { GroomFamily, type FamilyData } from "./GroomFamily";
import { Divider } from "./Divider";
import { BrideFamily } from "./BrideFamily";

interface SectionFamiliesProps {
  groomFamily: FamilyData;
  brideFamily: FamilyData;
  subtitle?: string;
}

/**
 * SectionFamilies
 * 
 * Page 1 — Family Introduction.
 * Renders the approved family lineage composition inside the continuous invitation canvas.
 */
export function SectionFamilies({
  groomFamily,
  brideFamily,
  subtitle,
}: SectionFamiliesProps) {
  return (
    <section
      id="families"
      aria-label="Family Introduction"
      className="relative z-20 w-full flex flex-col items-center pt-[5cqw]"
    >
      <IntroText
        headingLine1="With the blessings"
        headingLine2="of our families"
        subtitle={subtitle}
      />
      <GroomFamily family={groomFamily} />
      <Divider />
      <BrideFamily family={brideFamily} />
    </section>
  );
}

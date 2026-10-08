"use client";

import React from "react";
import Image from "next/image";

interface BotanicalLayerProps {
  mode?: "full" | "top" | "bottom";
}

/**
 * BotanicalLayer
 * 
 * Renders the perimeter botanical framing assets and delicate floating rose petals
 * matching the reference invitation styling.
 */
export function BotanicalLayer({ mode = "full" }: BotanicalLayerProps) {
  const showTop = mode === "full" || mode === "top";
  const showBottom = mode === "full" || mode === "bottom";
  const showSides = mode === "full";

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {/* 1. TOP-LEFT CORNER BOTANICAL SPRAY */}
      {showTop && (
        <div className="absolute top-0 left-0 w-[17cqw] aspect-[148/260] opacity-95">
          <Image
            src="/wedding/decorations/palm-left.webp"
            alt=""
            fill
            priority
            sizes="20cqw"
            className="object-contain object-top-left"
          />
        </div>
      )}

      {/* 2. TOP-RIGHT CORNER BOTANICAL SPRAY */}
      {showTop && (
        <div className="absolute top-0 right-0 w-[18cqw] aspect-[158/210] opacity-95">
          <Image
            src="/wedding/decorations/palm-right.webp"
            alt=""
            fill
            priority
            sizes="20cqw"
            className="object-contain object-top-right"
          />
        </div>
      )}

      {/* 3. MID-LEFT BOTANICAL SPRAY (framing the groom family lineage) */}
      {showSides && (
        <div className="absolute top-[41%] left-0 w-[15cqw] aspect-[1/1.1] opacity-90">
          <Image
            src="/wedding/decorations/palm-mid-left.webp"
            alt=""
            fill
            sizes="18cqw"
            className="object-contain object-left"
          />
        </div>
      )}

      {/* 4. MID-RIGHT BOTANICAL SPRAY (framing the central divider) */}
      {showSides && (
        <div className="absolute top-[46%] right-0 w-[15cqw] aspect-[1/1.1] opacity-90">
          <Image
            src="/wedding/decorations/palm-mid-right.webp"
            alt=""
            fill
            sizes="18cqw"
            className="object-contain object-right"
          />
        </div>
      )}

      {/* 5. BOTTOM-LEFT BOTANICAL SPRAY */}
      {showBottom && (
        <div className="absolute bottom-0 left-0 w-[18cqw] aspect-[1/1.1] opacity-95">
          <Image
            src="/wedding/decorations/palm-bottom-left.webp"
            alt=""
            fill
            sizes="20cqw"
            className="object-contain object-bottom-left"
          />
        </div>
      )}

      {/* 6. BOTTOM-RIGHT BOTANICAL SPRAY */}
      {showBottom && (
        <div className="absolute bottom-0 right-0 w-[17cqw] aspect-[1/1.1] opacity-95">
          <Image
            src="/wedding/decorations/palm-bottom-right.webp"
            alt=""
            fill
            sizes="20cqw"
            className="object-contain object-bottom-right"
          />
        </div>
      )}

      {/* 7. FLOATING ROSE PETALS (exact positions matching reference PDF) */}
      <div className="absolute top-[6.5%] left-[73%] w-[1.8cqw] aspect-square rotate-12 opacity-85">
        <Image src="/wedding/decorations/petals.webp" alt="" fill sizes="3cqw" className="object-contain" />
      </div>
      <div className="absolute top-[13.5%] left-[25%] w-[1.5cqw] aspect-square -rotate-45 opacity-80">
        <Image src="/wedding/decorations/petals.webp" alt="" fill sizes="3cqw" className="object-contain" />
      </div>
      <div className="absolute top-[17.5%] right-[28%] w-[1.6cqw] aspect-square rotate-45 opacity-80">
        <Image src="/wedding/decorations/petals.webp" alt="" fill sizes="3cqw" className="object-contain" />
      </div>
      <div className="absolute top-[37.5%] left-[26%] w-[2.2cqw] aspect-square -rotate-12 opacity-85">
        <Image src="/wedding/decorations/petals.webp" alt="" fill sizes="3cqw" className="object-contain" />
      </div>
      <div className="absolute top-[42%] right-[20%] w-[1.6cqw] aspect-square rotate-90 opacity-80">
        <Image src="/wedding/decorations/petals.webp" alt="" fill sizes="3cqw" className="object-contain" />
      </div>
      <div className="absolute top-[61%] left-[22%] w-[1.8cqw] aspect-square 45 opacity-80">
        <Image src="/wedding/decorations/petals.webp" alt="" fill sizes="3cqw" className="object-contain" />
      </div>
      <div className="absolute top-[71%] right-[19%] w-[1.7cqw] aspect-square -rotate-30 opacity-85">
        <Image src="/wedding/decorations/petals.webp" alt="" fill sizes="3cqw" className="object-contain" />
      </div>
      <div className="absolute top-[88%] left-[14%] w-[2.4cqw] aspect-square 12 opacity-90">
        <Image src="/wedding/decorations/petals.webp" alt="" fill sizes="3cqw" className="object-contain" />
      </div>
    </div>
  );
}

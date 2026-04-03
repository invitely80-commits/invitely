import React from "react";
import { Sparkles } from "lucide-react";
import type { Metadata } from "next";

import { SiteHeader } from "@/components/landing/site-header";
import { themeOptions } from "@/lib/invites";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import TemplatesGrid from "@/components/templates/TemplatesGrid";

/**
 * Templates Page — SERVER COMPONENT
 *
 * BEFORE: Entire page was "use client" (163 lines + all imports = ~80KB+ client JS)
 * AFTER:  Server-rendered shell. Only TemplatesGrid is a client island (~5KB).
 *
 * Performance gains:
 *   ✓ Zero framer-motion on this page (was importing 6 hooks, using 2)
 *   ✓ SiteHeader renders as server component (was dragged into client boundary)
 *   ✓ Hero section is pure HTML/CSS (was using motion.div + motion.p)
 *   ✓ ScrollIndicator is CSS-only (was framer infinite loop)
 *   ✓ Grain overlay uses inline data URL (was fetching external texture)
 *   ✓ No `style jsx global` runtime CSS injection
 */

export const metadata: Metadata = {
  title: "Wedding Templates | Heritage Collection",
  description:
    "Explore our curated collection of premium digital wedding invitation templates. Hindu, Muslim, Christian, Sikh, Civil, Royal, and Luxury designs crafted for every celebration.",
};

// Pre-filter templates at build time (runs on server only)
const templates = themeOptions.filter((t) => t.value !== "minimal");

export default function TemplatesPage() {
  return (
    <main className="page-shell relative bg-ivory selection:bg-gold-accent/30 overflow-x-hidden">
      {/* Static grain overlay (inline data URL, no external fetch) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.2] mix-blend-overlay z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <SiteHeader ctaHref="/sign-up" ctaLabel="Get Started" />

      {/* Hero: Unfolding Invitation Reveal (CSS-only animation) */}
      <section className="relative h-[100vh] flex flex-col items-center justify-center z-10 px-6 sm:px-8 text-center bg-transparent">
        <div className="hero-reveal relative p-8 sm:p-12 bg-white/5 backdrop-blur-xl rounded-[40px] sm:rounded-[64px] border border-white/10">
          <div className="inline-flex items-center gap-3 rounded-full bg-charcoal/5 border border-charcoal/10 px-6 py-2 text-[9px] font-mono-lux tracking-[0.5em] uppercase text-charcoal/50 mb-10 sm:mb-12">
            <Sparkles className="h-4 w-4 text-gold-accent" />
            <span>High Heritage Collection</span>
          </div>

          <h1 className="font-serif-lux text-fluid-h1 tracking-tighter text-charcoal leading-[0.82] mix-blend-multiply">
            Choose Your <br />
            <span className="italic text-gold-accent font-light">Digital Heirloom</span>
          </h1>

          <p className="hero-subtitle mt-10 sm:mt-12 text-base sm:text-lg text-charcoal/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Every union is a cinematic legacy. Scroll to unfold through our
            3D heritage collection and select a canvas that honors your ritual.
          </p>
        </div>

        <div className="absolute bottom-16">
          <ScrollIndicator />
        </div>
      </section>

      {/* Client Island: Grid + Background + CTA (only interactive part) */}
      <TemplatesGrid templates={templates} />
    </main>
  );
}

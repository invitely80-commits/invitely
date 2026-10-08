"use client";

import React, { useState, useEffect } from "react";

const SECTIONS = [
  { id: "families", label: "01 Families", shortLabel: "Families" },
  { id: "wedding", label: "02 The Wedding", shortLabel: "Wedding" },
  { id: "events", label: "03 Events", shortLabel: "Events" },
  { id: "venue", label: "04 Venue", shortLabel: "Venue" },
  { id: "rsvp", label: "05 RSVP", shortLabel: "RSVP" },
];

export function WeddingNavigation() {
  const [activeSection, setActiveSection] = useState("families");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Invitation Sections Navigation"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#FAF0E1]/90 backdrop-blur-md border border-[#C29B63]/40 shadow-[0_8px_24px_rgba(45,35,30,0.14)] rounded-full px-3 py-1.5 flex items-center gap-1.5 sm:gap-2 transition-all duration-300"
    >
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`px-2.5 py-1 rounded-full font-cormorant text-xs sm:text-sm tracking-wide transition-all duration-300 ${
              isActive
                ? "bg-[#821919] text-[#FFF9F2] font-medium shadow-sm"
                : "text-[#5C4E46] hover:text-[#821919] hover:bg-[#F3E1CB]/50"
            }`}
          >
            <span className="hidden sm:inline">{section.label}</span>
            <span className="sm:hidden">{section.shortLabel}</span>
          </button>
        );
      })}
    </nav>
  );
}

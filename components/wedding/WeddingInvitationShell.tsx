"use client";

import React from "react";
import { WeddingNavigation } from "./WeddingNavigation";
import { WeddingMusicPlayer } from "./WeddingMusicPlayer";

interface WeddingInvitationShellProps {
  children: React.ReactNode;
  musicUrl?: string;
  autoPlay?: boolean;
  className?: string;
}

/**
 * WeddingInvitationShell
 * 
 * Provides the global environment for the 5-page South Indian Heritage Wedding invitation:
 * - Continuous warm backdrop (#EDE3D2)
 * - Global typography injection (Cormorant Garamond, Cinzel)
 * - Non-intrusive section navigation (#families, #wedding, #events, #venue, #rsvp)
 * - Ambient music control with seamless autoplay
 * - Smooth scroll behavior
 */
export function WeddingInvitationShell({
  children,
  musicUrl,
  autoPlay = true,
  className = "",
}: WeddingInvitationShellProps) {
  return (
    <div
      className={`min-h-screen w-full bg-[#EDE3D2] py-4 sm:py-8 md:py-12 px-2 sm:px-4 flex flex-col items-center selection:bg-[#821919] selection:text-white ${className}`}
      style={{ scrollBehavior: "smooth" }}
    >
      {/* 1. TYPOGRAPHY IMPORT */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Cinzel:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* 2. SUBTLE FLOATING MUSIC PLAYER */}
      <WeddingMusicPlayer musicUrl={musicUrl} autoPlay={autoPlay} />

      {/* 3. THE CONTINUOUS INVITATION CANVAS */}
      <div className="w-full flex flex-col items-center pb-20">
        {children}
      </div>

      {/* 4. SUBTLE FLOATING INVITATION NAVIGATION */}
      <WeddingNavigation />
    </div>
  );
}

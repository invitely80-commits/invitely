"use client";

import React, { useState, useRef } from "react";

interface WeddingMusicPlayerProps {
  musicUrl?: string;
}

export function WeddingMusicPlayer({ musicUrl }: WeddingMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      {musicUrl && <audio ref={audioRef} src={musicUrl} loop preload="none" />}
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        className="w-10 h-10 rounded-full bg-[#FAF0E1]/90 backdrop-blur-md border border-[#C29B63]/40 shadow-[0_4px_16px_rgba(45,35,30,0.12)] flex items-center justify-center text-[#821919] hover:bg-[#F3E1CB] transition-all duration-300"
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 animate-spin-slow">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-75">
            <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l4.27 4.27L20.27 21 21 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2V7z" />
          </svg>
        )}
      </button>
    </div>
  );
}

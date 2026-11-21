"use client";

import React, { useState, useRef, useEffect } from "react";

export const DEFAULT_WEDDING_MUSIC = "/wedding/music/south-indian-heritage.mp3";

interface WeddingMusicPlayerProps {
  musicUrl?: string;
}

export function WeddingMusicPlayer({ musicUrl = DEFAULT_WEDDING_MUSIC }: WeddingMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeUrl = musicUrl?.trim() ? musicUrl : DEFAULT_WEDDING_MUSIC;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [activeUrl]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback interrupted or blocked:", err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 group">
      <audio
        ref={audioRef}
        src={activeUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        title={isPlaying ? "Pause wedding music" : "Play wedding music"}
        className="relative flex items-center gap-2 px-3 h-9 sm:h-10 rounded-full bg-[#FAF0E1]/95 backdrop-blur-md border border-[#C29B63]/50 shadow-[0_4px_20px_rgba(45,35,30,0.15)] text-[#821919] hover:bg-[#F5E6D0] hover:border-[#821919]/40 hover:shadow-[0_6px_24px_rgba(130,25,25,0.2)] transition-all duration-300"
      >
        {isPlaying ? (
          <div className="flex items-end gap-[3px] h-3.5 w-3.5 pb-0.5" aria-hidden="true">
            <span
              className="w-[3px] bg-[#821919] rounded-full inline-block"
              style={{ animation: "weddingMusicBar 0.8s ease-in-out infinite" }}
            />
            <span
              className="w-[3px] bg-[#821919] rounded-full inline-block"
              style={{ animation: "weddingMusicBar 1.1s ease-in-out infinite 0.2s" }}
            />
            <span
              className="w-[3px] bg-[#821919] rounded-full inline-block"
              style={{ animation: "weddingMusicBar 0.9s ease-in-out infinite 0.4s" }}
            />
          </div>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#821919] opacity-90" aria-hidden="true">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        )}
        <span className="text-[11px] font-medium tracking-wider uppercase font-cinzel text-[#821919] select-none">
          {isPlaying ? "Playing" : "Music"}
        </span>
      </button>

      <style>{`
        @keyframes weddingMusicBar {
          0%, 100% { height: 25%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
}

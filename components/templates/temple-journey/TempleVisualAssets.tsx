import React from "react";

export function GopuramCrest({ className = "w-10 h-10 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      <path d="M32 2L28 10H36L32 2Z" opacity="0.9" />
      <path d="M26 12H38V16H26V12Z" />
      <path d="M22 18H42V24H22V18Z" opacity="0.95" />
      <path d="M18 26H46V34H18V26Z" />
      <path d="M14 36H50V46H14V36Z" opacity="0.95" />
      <path d="M10 48H54V60H10V48Z" />
      <circle cx="32" cy="54" r="3" fill="#FFF" opacity="0.4" />
      <circle cx="22" cy="54" r="2" fill="#FFF" opacity="0.3" />
      <circle cx="42" cy="54" r="2" fill="#FFF" opacity="0.3" />
    </svg>
  );
}

export function KuthuvilakkuDiya({ className = "w-8 h-12 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 80" fill="currentColor" className={className} aria-hidden="true">
      {/* Flame */}
      <path
        d="M20 2C20 2 24 9 24 13C24 15.2 22.2 17 20 17C17.8 17 16 15.2 16 13C16 9 20 2 20 2Z"
        fill="#FF9E1B"
      />
      <circle cx="20" cy="13" r="2" fill="#FFE57F" />
      {/* Top bird/ornament */}
      <path d="M18 18H22V22H18Z" />
      <path d="M14 22H26L24 25H16L14 22Z" />
      {/* Main bowl */}
      <ellipse cx="20" cy="27" rx="14" ry="4" opacity="0.95" />
      <path d="M10 27C10 32 15 35 20 35C25 35 30 32 30 27H10Z" />
      {/* Central Stem with tiers */}
      <rect x="18" y="35" width="4" height="26" />
      <ellipse cx="20" cy="42" rx="8" ry="2.5" />
      <ellipse cx="20" cy="50" rx="10" ry="2.5" />
      {/* Base */}
      <path d="M12 61H28L34 76C34 77.1 33.1 78 32 78H8C6.9 78 6 77.1 6 76L12 61Z" />
      <ellipse cx="20" cy="74" rx="12" ry="2" fill="#FFF" opacity="0.2" />
    </svg>
  );
}

export function TempleBell({ className = "w-6 h-10 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 56" fill="currentColor" className={className} aria-hidden="true">
      <line x1="16" y1="0" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
      <circle cx="16" cy="16" r="3" />
      <path d="M16 18C12 18 10 24 9 32C8 38 6 42 5 44H27C26 42 24 38 23 32C22 24 20 18 16 18Z" />
      <ellipse cx="16" cy="44" rx="11" ry="3.5" opacity="0.9" />
      <circle cx="16" cy="48" r="2.5" fill="#E8D5A0" />
    </svg>
  );
}

export function SacredLotus({ className = "w-8 h-8 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      <path d="M32 10C30 22 30 36 32 46C34 36 34 22 32 10Z" />
      <path d="M32 46C24 36 20 25 24 16C28 26 31 38 32 46Z" opacity="0.9" />
      <path d="M32 46C40 36 44 25 40 16C36 26 33 38 32 46Z" opacity="0.9" />
      <path d="M32 46C18 42 12 32 16 24C21 34 29 42 32 46Z" opacity="0.75" />
      <path d="M32 46C46 42 52 32 48 24C43 34 35 42 32 46Z" opacity="0.75" />
      <path d="M22 47C26 51 38 51 42 47C38 49 26 49 22 47Z" />
    </svg>
  );
}

export function AntiqueDivider({ className = "w-full max-w-md mx-auto my-6 text-[#C5A059]" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]" />
      <SacredLotus className="w-5 h-5 shrink-0 opacity-80" />
      <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]" />
    </div>
  );
}

export function ToranGarland({ className = "w-full h-8 text-[#2E5A36]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 32" fill="none" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M0 6 Q 50 16, 100 6 Q 150 16, 200 6 Q 250 16, 300 6 Q 350 16, 400 6" stroke="#C5A059" strokeWidth="1.5" />
      {[50, 150, 250, 350].map((x, i) => (
        <g key={i}>
          <path d={`M${x - 8} 11 C${x - 12} 20, ${x - 4} 28, ${x} 32 C${x + 4} 28, ${x + 12} 20, ${x + 8} 11 Z`} fill="#2E5A36" opacity="0.85" />
          <circle cx={x} cy="10" r="4.5" fill="#FF8A00" />
          <circle cx={x} cy="10" r="2.5" fill="#FFD54F" />
        </g>
      ))}
    </svg>
  );
}

export function KolamCorner({ className = "w-16 h-16 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} aria-hidden="true">
      <path d="M4 4 Q 32 4, 32 32 Q 32 60, 60 60" opacity="0.6" />
      <path d="M4 14 Q 24 14, 24 34 Q 24 54, 44 54" opacity="0.4" />
      <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="32" cy="16" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="16" cy="32" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="28" cy="28" r="2.5" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

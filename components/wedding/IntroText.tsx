"use client";

import React from "react";

interface IntroTextProps {
  headingLine1?: string;
  headingLine2?: string;
  subtitle?: string;
}

export function IntroText({
  headingLine1 = "With the blessings",
  headingLine2 = "of our families",
  subtitle = "Two families, one beautiful beginning",
}: IntroTextProps) {
  return (
    <header className="relative z-20 w-full pt-[5cqw] text-center px-[8cqw]">
      {/* 1. PRIMARY HEADLINE (CRIMSON MAROON CORMORANT GARAMOND, SEMIBOLD) */}
      <h1 className="font-cormorant text-[5.0cqw] leading-[1.14] text-[#821919] font-medium tracking-[0.015em] m-0">
        <span className="block">{headingLine1}</span>
        <span className="block">{headingLine2}</span>
      </h1>

      <div className="flex items-center justify-center my-[1.2cqw] text-[#C29B63]" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[2.8cqw] h-[2.8cqw] opacity-90 max-w-[24px] max-h-[24px]"
          style={{ width: "2.8cqw", height: "2.8cqw", maxWidth: "24px", maxHeight: "24px" }}
        >
          <circle cx="12" cy="12" r="2.2" />
          <path d="M12 2C11.2 5 12.8 5 12 8C11.2 5 12.8 5 12 2Z" />
          <path d="M12 22C11.2 19 12.8 19 12 16C11.2 19 12.8 19 12 22Z" />
          <path d="M2 12C5 11.2 5 12.8 8 12C5 11.2 5 12.8 2 12Z" />
          <path d="M22 12C19 11.2 19 12.8 16 12C19 11.2 19 12.8 22 12Z" />
          <path d="M4.9 4.9C7.2 6.5 6.5 7.2 8.5 8.5C7.2 6.5 6.5 7.2 4.9 4.9Z" />
          <path d="M19.1 19.1C16.8 17.5 17.5 16.8 15.5 15.5C16.8 17.5 17.5 16.8 19.1 19.1Z" />
          <path d="M19.1 4.9C17.5 7.2 16.8 6.5 15.5 8.5C17.5 7.2 16.8 6.5 19.1 4.9Z" />
          <path d="M4.9 19.1C6.5 16.8 7.2 17.5 8.5 15.5C6.5 16.8 7.2 17.5 4.9 19.1Z" />
        </svg>
      </div>

      {/* 3. UNDERSTATED SUBTITLE */}
      <p className="font-cormorant text-[1.8cqw] leading-tight text-[#382E26] font-normal tracking-[0.035em] m-0">
        {subtitle}
      </p>
    </header>
  );
}

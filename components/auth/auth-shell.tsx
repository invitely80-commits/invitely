import Link from "next/link";
import { Sparkles } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  children,
  footerText,
  footerHref,
  footerLabel,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerHref: string;
  footerLabel: string;
}) {
  return (
    <div className="mx-auto w-full max-w-xl relative">
      {/* Decorative top-right spotlight */}
      <div className="absolute -top-12 -right-12 size-40 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 size-40 rounded-full bg-burgundy/5 blur-3xl pointer-events-none" />

      <div className="surface-card rounded-[36px] p-8 sm:p-12 relative overflow-hidden">
        {/* Subtle background mandala / invitation card styling */}
        <div className="absolute inset-0 bg-mandala opacity-[0.03] pointer-events-none" />
        
        <div className="relative flex items-center justify-between">
          <Link 
            href="/" 
            className="font-serif-lux text-3xl font-bold tracking-wider text-burgundy hover:text-gold transition duration-300 active-scale"
          >
            Invitely
          </Link>
          <div className="rounded-full bg-gold/5 border border-gold/20 p-2 text-gold animate-spin-slow">
            <Sparkles className="size-4" />
          </div>
        </div>

        <h1 className="mt-10 font-heading text-4xl sm:text-5xl font-bold tracking-tight-display text-burgundy leading-[1.1]">
          {title}
        </h1>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-stone-500 max-w-[45ch]">
          {subtitle}
        </p>

        <div className="mt-8 relative z-10">{children}</div>

        <p className="mt-10 text-xs sm:text-sm text-stone-400 font-medium tracking-wide border-t border-gold/10 pt-6">
          {footerText}{" "}
          <Link 
            href={footerHref} 
            className="font-bold text-burgundy hover:text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold transition duration-300 active-scale inline-block"
          >
            {footerLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}


"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { type InviteTheme } from "@/lib/invites";
import { buttonStyles } from "@/components/ui/button";

export function TemplatePreviewBar({ theme }: { theme: InviteTheme }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "circOut" }}
      className="fixed inset-x-0 bottom-8 z-[100] flex justify-center px-6 pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-white/20 bg-burgundy/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-8 sm:py-4">
        <Link
          href="/templates"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-12 sm:w-12"
          title="Back to all templates"
        >
          <ArrowLeft className="size-5" />
        </Link>

        <div className="h-8 w-px bg-white/10 sm:h-10 mx-2" />

        <div className="hidden flex-col sm:flex">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80">Previewing Mood</p>
          <p className="text-sm font-semibold text-white capitalize">{theme}</p>
        </div>

        <Link
          href={`/dashboard/invite/new?template=${theme}`}
          className={buttonStyles({
            size: "lg",
            className: "h-10 rounded-full bg-gold px-6 text-xs font-bold uppercase tracking-widest text-burgundy border-none hover:bg-gold/90 sm:h-12 sm:px-10",
          })}
        >
          <Sparkles className="mr-2 size-4" />
          Use this template
        </Link>
      </div>
    </motion.div>
  );
}

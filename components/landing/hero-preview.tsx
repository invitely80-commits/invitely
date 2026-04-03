"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Parallax } from "@/components/landing/motion";

export function HeroPreview() {
  return (
    <Parallax offset={30} className="relative hidden lg:block">
      <div className="relative h-[600px] w-[500px] overflow-hidden rounded-[40px] shadow-[0_50px_100px_rgba(87,0,19,0.15)] ring-1 ring-white/20">
        <Image
          src="/images/wedding-stage.png"
          alt="Premium Wedding Stage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/20 to-transparent" />
        
        {/* Floating Micro-Card: Vellum Stationery Style */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-16 -left-16 bg-silk/90 backdrop-blur-2xl p-8 rounded-[38px] w-72 shadow-[0_48px_80px_rgba(87,0,19,0.12)] border border-white/60 ring-1 ring-burgundy/5"
        >
          <div className="flex flex-col items-center text-center gap-5">
            <div className="h-12 w-12 rounded-full bg-burgundy/5 flex items-center justify-center text-burgundy/40">
              <Heart className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div className="space-y-1.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-400">Honored Guests</p>
              <h4 className="text-2xl font-serif-lux italic text-burgundy leading-tight">Save the Date</h4>
              <p className="text-[11px] font-mono-lux tracking-widest text-gold-accent font-bold uppercase pt-2">12 . 10 . 2026</p>
            </div>
            
            <div className="h-px w-12 bg-burgundy/10" />
            
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-burgundy/30">Presence Requested</p>
          </div>
        </motion.div>
      </div>
    </Parallax>
  );
}

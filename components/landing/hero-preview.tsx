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
        
        {/* Floating Micro-Card */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-12 -left-12 surface-card p-6 rounded-3xl w-64 shadow-2xl border-white/40"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Save the Date</p>
              <p className="text-sm font-bold text-burgundy">12th October 2026</p>
            </div>
          </div>
          <div className="mt-4 h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-gold rounded-full" />
          </div>
          <p className="mt-2 text-[10px] text-stone-400 text-center">85% Guest Response Rate</p>
        </motion.div>
      </div>
    </Parallax>
  );
}

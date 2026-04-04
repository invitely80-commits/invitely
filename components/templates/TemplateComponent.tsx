"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

const DEFAULT_DATA = {
  brideFirstName: "Victoria", brideLastName: "Blackwood",
  groomFirstName: "Alexander", groomLastName: "Sterling",
  weddingDate: "Saturday, August 15, 2026",
  city: "Monte Carlo",
  hashtag: "#VictoryInLove",
  heroImage: "/images/templates/luxury/hero_god_tier.png",
  storyImage: "/images/templates/luxury/hero_god_tier.png",
  ritualsImage: "/images/templates/luxury/hero_god_tier.png",
};

export function TemplateComponent({
  invite,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transforms
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.2]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, 150]);
  
  const d = {
    ...DEFAULT_DATA,
    brideFirstName: invite.data.brideName.split(" ")[0],
    groomFirstName: invite.data.groomName.split(" ")[0],
    weddingDate: formatDisplayDate(invite.data.weddingDate),
    city: invite.data.events[0]?.address.split(",").slice(-2)[0]?.trim() || "Monte Carlo",
    hashtag: invite.data.description.match(/#\w+/)?.[0] || DEFAULT_DATA.hashtag,
  };

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#FDFBF7] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Inter:wght@100;200;300;400;500&display=swap');
        .font-serif { font-family: 'Bodoni Moda', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .tracking-editorial { letter-spacing: 0.6em; }
        .kerning-loose { letter-spacing: 0.3em; }
        .text-shadow-lux { 
          text-shadow: 0 0 30px rgba(255,215,0,0.3), 0 0 60px rgba(255,215,0,0.1); 
        }
      `}</style>

      {/* ── HERO: LUXURY ABSTRACT ─────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image src={d.heroImage} alt="Luxury Abstract" fill priority className="object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
        </motion.div>
        
        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative z-10 text-center px-6 max-w-5xl space-y-20">
          <div className="space-y-8">
             <div className="flex items-center justify-center gap-10 opacity-30">
              <div className="w-16 h-px bg-white" />
              <p className="text-white font-sans text-[8px] uppercase tracking-editorial font-light">The Exclusive Collection</p>
              <div className="w-16 h-px bg-white" />
            </div>
          </div>
          
          <h1 className="font-serif italic text-5xl md:text-9xl text-white font-light leading-[0.9] kerning-loose text-shadow-lux">
            The Art of <br />
            <span className="opacity-70 italic">Forever</span>
          </h1>

          <div className="space-y-8 pt-6">
            <h2 className="font-serif text-3xl md:text-6xl text-[#E8D5A0] kerning-loose font-extralight drop-shadow-2xl">
              {d.brideFirstName} <span className="opacity-30 italic">&amp;</span> {d.groomFirstName}
            </h2>
            <div className="flex flex-col items-center gap-3 text-white/50 font-sans text-[10px] uppercase tracking-editorial font-light">
              <span className="opacity-40">Witnessed in</span>
              <span className="text-white opacity-80">{d.weddingDate} <span className="mx-6 text-white/20">|</span> {d.city}</span>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
          >
             <div className="w-px h-32 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── THE STORY: DARK MINIMALISM ─────────────────────────────── */}
      <section className="relative py-72 px-6 md:px-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-40 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-20"
          >
            <h2 className="font-serif italic text-4xl md:text-8xl text-white font-light leading-tight tracking-tighter">
              A silence <br /> spoken in gold
            </h2>

            <div className="space-y-12 font-sans text-sm md:text-lg text-white/50 font-extralight leading-relaxed tracking-[0.1em] max-w-xl opacity-90">
              <p>True luxury is not in what is seen, but in what is felt. A shared glance across a quiet room. The weight of a promise that needs no words.</p>
              <p>Join Alexander and Victoria for an evening of whispered elegance, where the world fades away and only love remains in focus.</p>
            </div>
            
            <div className="pt-12">
              <div className="w-32 h-px bg-white/10 mb-10" />
              <p className="font-serif text-2xl italic text-[#E8D5A0] tracking-widest">{d.hashtag}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3 }}
            className="relative"
          >
            <div className="absolute -inset-10 border border-white/5 rounded-full blur-3xl -z-10" />
            <div className="relative aspect-[3/4] overflow-hidden grayscale contrast-125 opacity-70 hover:opacity-100 transition-all duration-1000 shadow-[0_60px_120px_rgba(0,0,0,0.5)]">
              <Image src={d.storyImage} alt="Luxury Detail" fill className="object-cover scale-110 hover:scale-100 transition-transform duration-[7s]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── THE EVENING: OBSIDIAN & COLD ───────────────────────────── */}
      <section className="relative py-64 bg-[#050505] text-[#FDFBF7] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none scale-125">
          <Image src={d.heroImage} alt="" fill className="object-cover" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-40">
          <div className="space-y-10">
            <span className="font-sans text-[9px] tracking-[1em] uppercase opacity-30">The Itinerary of Excellence</span>
            <h2 className="font-serif italic text-4xl md:text-7xl font-light tracking-wide text-[#E8D5A0]">Bespoke Evening</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-32 py-24 text-left border-y border-white/5">
            {[
              { title: 'The Arrival', time: '19:00', desc: 'Pre-ceremony aperitifs at the Mirror Lounge.' },
              { title: 'The Covenant', time: '20:30', desc: 'A service of light and sound in the Obsidian Hall.' },
              { title: 'The Soiree', time: '22:00', desc: 'Curated dining and jazz under the Mediterranean stars.' },
              { title: 'The Departure', time: '01:00', desc: 'A moonlit farewell following the formal celebration.' },
            ].map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="space-y-8 py-10"
              >
                <div className="flex items-center justify-between opacity-30 border-b border-white/10 pb-4">
                  <p className="font-sans text-[10px] tracking-editorial uppercase">{event.time}</p>
                  <div className="w-1 h-1 bg-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-4xl font-light tracking-tighter text-white opacity-90">{event.title}</h3>
                  <p className="font-sans text-[11px] opacity-40 font-extralight leading-relaxed max-w-sm tracking-wide">
                    {event.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINALE: ETERNAL ABSTRACT ─────────────────────────────── */}
      <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-20"
          >
            <div className="flex flex-col items-center gap-12 opacity-40">
               <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
               <div className="w-5 h-5 border-[0.5px] border-white rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#E8D5A0] rounded-full" />
               </div>
            </div>

            <h2 className="font-serif italic text-4xl md:text-9xl text-white font-light leading-none tracking-tighter mix-blend-screen">
              Beyond Time. <br />
              <span className="opacity-20 italic">Forever Us.</span>
            </h2>

            <div className="space-y-6 pt-16">
              <p className="font-sans text-[12px] uppercase tracking-[1em] text-[#E8D5A0] font-medium drop-shadow-xl">{d.brideFirstName} & {d.groomFirstName}</p>
              <div className="w-16 h-px bg-white/10 mx-auto" />
              <p className="font-sans text-[8px] uppercase tracking-[1.2em] text-white/10 italic">A Legacy by Invitely</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

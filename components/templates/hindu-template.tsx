"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";
import { MapSection } from "@/components/templates/map-section";

const DEFAULT_DATA = {
  brideFirstName: "Ananya", brideLastName: "Sharma",
  groomFirstName: "Rohan", groomLastName: "Mehta",
  weddingDate: "Saturday, November 21, 2026",
  city: "Udaipur",
  hashtag: "#AnanyaRohanUnion",
  heroImage: "/images/templates/hindu/hero_god_tier.png",
  storyImage: "/images/templates/hindu/story_god_tier.png",
  ritualsImage: "/images/templates/hindu/story_god_tier.png",
};

export function HinduTemplate({
  invite,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transforms
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.15]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, 150]);
  
  const d = {
    ...DEFAULT_DATA,
    brideFirstName: invite.data.brideName.split(" ")[0],
    groomFirstName: invite.data.groomName.split(" ")[0],
    weddingDate: formatDisplayDate(invite.data.weddingDate),
    city: invite.data.events[0]?.address.split(",").slice(-2)[0]?.trim() || "Udaipur",
    hashtag: invite.data.description.match(/#\w+/)?.[0] || DEFAULT_DATA.hashtag,
    heroImage: invite.data.heroImage || invite.data.gallery[0] || DEFAULT_DATA.heroImage,
    storyImage: invite.data.gallery[0] || DEFAULT_DATA.storyImage,
  };

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] text-[#2D2926] overflow-x-hidden w-full min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Inter:wght@200;300;400;500&display=swap');
        .font-serif { font-family: 'Bodoni Moda', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .tracking-editorial { letter-spacing: 0.45em; }
        .kerning-loose { letter-spacing: 0.12em; }
        .text-shadow-cinematic { 
          text-shadow: 0 4px 15px rgba(0,0,0,0.6), 0 2px 5px rgba(0,0,0,0.4); 
        }
      `}</style>

      {/* ── HERO: CINEMATIC MANDAP ─────────────────────────────────── */}
      <section className="relative h-[100dvh] w-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full">
          <Image src={d.heroImage} alt="Mandap" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </motion.div>
        
        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative z-10 text-center px-6 max-w-5xl space-y-16">
          <div className="space-y-6">
            <div className="w-16 h-px bg-white/60 mx-auto" />
            <p className="text-white font-sans text-[10px] uppercase tracking-editorial font-bold text-shadow-cinematic">Bespoke Hindu Union</p>
            <div className="w-16 h-px bg-white/60 mx-auto" />
          </div>
          
          <h1 className="font-serif italic text-5xl md:text-[5.5rem] lg:text-[7rem] text-white font-normal leading-[1.0] kerning-loose text-shadow-cinematic">
            By Divine Hands, <br />
            <span className="opacity-95 text-[#FDFBF7]">Two Destinies Align</span>
          </h1>

          <div className="space-y-6 pt-4">
            <h2 className="font-serif text-3xl md:text-6xl text-[#E8D5A0] kerning-loose font-medium text-shadow-cinematic tracking-tighter">
              {d.brideFirstName} <span className="opacity-60 italic">&amp;</span> {d.groomFirstName}
            </h2>
            <div className="flex items-center justify-center gap-6 text-white/80 font-sans text-[10px] uppercase tracking-editorial font-medium drop-shadow-lg scale-90 md:scale-100">
              <span>{d.weddingDate}</span>
              <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full shadow-[0_0_10px_rgba(201,168,76,0.5)]" />
              <span>{d.city}</span>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <div className="w-px h-24 bg-gradient-to-b from-[#C9A84C] to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── THE SACRED VOWS: EDITORIAL LAYOUT ───────────────────────── */}
      <section className="relative py-32 md:py-64 px-6 md:px-24 bg-[#FCFAFB]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 md:space-y-16"
          >
            <div className="flex items-center gap-8">
              <span className="text-[#B45309] text-[10px] tracking-editorial uppercase font-sans font-bold">The Vows</span>
              <div className="w-12 h-px bg-[#B45309]/30" />
            </div>
            
            <h2 className="font-serif italic text-4xl md:text-7xl text-[#3A2416] font-light leading-tight">
              An ancient love <br /> reimagined
            </h2>

            <div className="space-y-8 font-sans text-sm md:text-base text-[#5A4A42] font-light leading-relaxed tracking-wider opacity-90 max-w-lg">
              {invite.data.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            
            <div className="pt-8 md:pt-12">
              <p className="font-serif text-xl italic text-[#B45309]">{d.hashtag}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-[#B45309]/10 rounded-sm" />
            <div className="relative aspect-[3/4] overflow-hidden grayscale-[30%] hover:grayscale-0 transition-all duration-1000">
              <Image src={d.storyImage} alt="Rituals" fill className="object-cover scale-105 hover:scale-100 transition-transform duration-[3s]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AGNI: THE SACred WITNESS ─────────────────────────────── */}
      <section className="relative py-32 md:py-52 bg-[#2D1B1B] text-[#FEFBF6] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none scale-125">
          <Image src={d.heroImage} alt="" fill className="object-cover grayscale" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-24 md:space-y-32">
          <div className="space-y-8">
            <span className="font-sans text-[10px] tracking-editorial uppercase opacity-50">Witnessed by Fire</span>
            <h2 className="font-serif italic text-4xl md:text-6xl font-light tracking-wide text-gold-accent">Sacred Traditions</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
            {invite.data.events.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="space-y-6 group"
              >
                <div className="w-12 h-px bg-[#E8D5A0]/60 mx-auto group-hover:w-20 transition-all duration-500" />
                <div className="space-y-3">
                  <p className="font-sans text-[10px] tracking-editorial uppercase text-[#E8D5A0] font-medium">
                    {event.time} @ {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl font-light tracking-widest text-[#FDFBF7]">{event.title}</h3>
                </div>
                <p className="font-sans text-[13px] text-white/70 font-light leading-relaxed max-w-[260px] mx-auto tracking-wide">
                  {event.description || event.address || event.venue}
                </p>
                <MapSection 
                  address={event.address} 
                  mapUrl={event.mapUrl} 
                  buttonClassName="border-[#E8D5A0]/20 text-[#E8D5A0]/60 hover:border-[#E8D5A0]/40"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINALE: BEYOND THE HORIZON ─────────────────────────────── */}
      <section className="relative h-screen bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="flex items-center justify-center gap-12 opacity-30">
              <div className="w-12 h-px bg-white" />
              <div className="w-2 h-2 rounded-full bg-[#E8D5A0]" />
              <div className="w-12 h-px bg-white" />
            </div>

            <h2 className="font-serif italic text-4xl md:text-7xl text-white font-light leading-snug kerning-loose">
              Join our forever, <br />
              <span className="text-[#E8D5A0]/80">in the heart of heritage.</span>
            </h2>

            <div className="space-y-3 pt-4">
              <p className="font-sans text-xs uppercase tracking-editorial text-[#E8D5A0]">Ananya & Rohan</p>
              <p className="font-sans text-[10px] uppercase tracking-editorial text-white/30">{d.weddingDate}</p>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
          <p className="font-sans text-[8px] uppercase tracking-[0.6em] text-white/40">Exclusively at Invitely</p>
        </div>
      </section>
    </div>
  );
}

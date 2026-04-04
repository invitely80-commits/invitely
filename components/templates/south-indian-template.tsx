"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";
import { LightRays, GopuramSilhouette, RitualIcon, AnimatedBirds } from "./visuals/SouthIndianVisual";

const DEFAULT_DATA = {
  brideFirstName: "Priya", brideLastName: "Iyer",
  groomFirstName: "Arjun", groomLastName: "Venkat",
  weddingDate: "Sunday, December 15, 2026",
  city: "Chennai",
  hashtag: "#PriyaArjunUnion",
  heroImage: "/images/templates/south-indian/hero_god_tier.png",
  storyImage: "/images/templates/south-indian/story.png",
  ritualsImage: "/images/templates/south-indian/rituals.png",
};

export function SouthIndianTemplate({
  invite,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transforms
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, 150]);
  
  const gopuramY = useTransform(smoothProgress, [0.7, 1], [100, -50]);

  const d = {
    ...DEFAULT_DATA,
    brideFirstName: invite.data.brideName.split(" ")[0],
    groomFirstName: invite.data.groomName.split(" ")[0],
    weddingDate: formatDisplayDate(invite.data.weddingDate),
    city: invite.data.events[0]?.address.split(",").slice(-2)[0]?.trim() || "India",
    hashtag: invite.data.description.match(/#\w+/)?.[0] || DEFAULT_DATA.hashtag,
    heroImage: invite.data.heroImage || invite.data.gallery[0] || DEFAULT_DATA.heroImage,
    storyImage: invite.data.gallery[0] || DEFAULT_DATA.storyImage,
  };

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] text-[#2D2926] overflow-x-hidden w-full min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Inter:wght@200;300;400&display=swap');
        .font-serif { font-family: 'Bodoni Moda', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .tracking-editorial { letter-spacing: 0.4em; }
        .kerning-loose { letter-spacing: 0.15em; }
        .text-shadow-cinematic { 
          text-shadow: 0 4px 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6); 
        }
      `}</style>

      {/* ── HERO: CINEMATIC ENTRY ──────────────────────────────────── */}
      <section className="relative h-[100dvh] w-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full">
          <Image src={d.heroImage} alt="Temple" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        </motion.div>
        <LightRays />
        
        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative z-10 text-center px-6 max-w-5xl space-y-12">
          <div className="space-y-4">
            <div className="w-24 h-px bg-white/80 mx-auto shadow-sm" />
            <p className="text-white font-sans text-[11px] uppercase tracking-editorial font-bold text-shadow-cinematic">Wedding Invitation</p>
            <div className="w-24 h-px bg-white/80 mx-auto shadow-sm" />
          </div>
          
          <h1 className="font-serif italic text-4xl md:text-[5rem] lg:text-[7rem] text-white font-normal leading-[1.1] kerning-loose text-shadow-cinematic">
            A union written in tradition, <br />
            <span className="opacity-95 text-[#FDFBF7]">celebrated in love</span>
          </h1>

          <div className="space-y-6 pt-8">
            <h2 className="font-serif text-3xl md:text-6xl text-[#E8D5A0] kerning-loose font-medium text-shadow-cinematic tracking-tight">
              {d.brideFirstName} <span className="opacity-60 italic">&amp;</span> {d.groomFirstName}
            </h2>
            <p className="font-sans text-xs md:text-[13px] text-white/90 font-bold uppercase tracking-editorial pt-2 text-shadow-cinematic drop-shadow-2xl">
              {d.weddingDate}
            </p>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-white/40 text-[9px] uppercase tracking-editorial font-sans">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-[#C9A84C] to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── OUR STORY: MINIMAL EDITORIAL ────────────────────────────── */}
      <section className="relative py-32 md:py-48 px-6 md:px-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 border border-[#C9A84C]/20 translate-x-4 translate-y-4" />
            <div className="relative aspect-[4/5] overflow-hidden grayscale-[40%] hover:grayscale-0 transition-all duration-1000">
              <Image src={d.storyImage} alt="Couple" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-px bg-[#C9A84C]" />
              <span className="text-[#8B1A1A] text-[10px] tracking-editorial uppercase font-sans font-medium">Our Story</span>
            </div>
            
            <h2 className="font-serif italic text-4xl md:text-6xl text-[#2D1B1B] font-light leading-snug">
              Where two souls <br /> became one
            </h2>

            <div className="space-y-8 font-sans text-sm md:text-base text-[#4A4A4A] font-light leading-relaxed tracking-wide opacity-80 max-w-xl">
              {invite.data.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            
            <div className="w-32 h-px bg-[#C9A84C]/30 pt-8 md:pt-16" />
          </motion.div>
        </div>
      </section>

      {/* ── THE CELEBRATION: LOGISTICS ─────────────────────────────── */}
      <section className="relative py-32 md:py-48 bg-white border-t border-black/5 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-24">
          <div className="space-y-8">
            <span className="font-sans text-[10px] tracking-editorial uppercase opacity-40">Events</span>
            <h2 className="font-serif italic text-4xl md:text-6xl font-light tracking-wide">The Celebration</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24 py-8 md:py-16">
            {invite.data.events.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="text-left space-y-6 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-[#C9A84C]/60 group-hover:w-12 transition-all duration-700" />
                  <p className="font-sans text-[11px] tracking-editorial uppercase text-[#8B1A1A] font-bold">
                    {event.time} @ {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                  </p>
                </div>
                <div className="space-y-4 pl-12">
                  <h3 className="font-serif text-2xl md:text-3xl font-normal tracking-tight text-[#2D1B1B]">{event.title}</h3>
                  <p className="font-sans text-[13px] text-[#4A4A4A] font-light leading-relaxed max-w-sm tracking-wide">
                    {event.description || `${event.venue}, ${event.address}`}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HERITAGE: THE DEEP MAROON RITUALS ───────────────────────── */}
      <section className="relative py-32 md:py-48 bg-[#4A1A1A] text-[#FDFBF7] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none scale-110">
          <Image src={d.heroImage} alt="" fill className="object-cover grayscale brightness-50" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="font-sans text-[11px] tracking-editorial uppercase text-[#E8D5A0] font-bold">Heritage</span>
            <h2 className="font-serif italic text-4xl md:text-7xl font-normal text-white">Rooted in Tradition</h2>
            <p className="font-sans text-[15px] md:text-lg text-white/80 tracking-wide max-w-2xl mx-auto leading-relaxed font-light">
              Each ritual carries the weight of centuries — a sacred language <br /> spoken through fire, flowers, and song.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-24 gap-y-32 py-12">
            {[
              { type: 'fire', title: 'The Sacred Fire', desc: 'Seven steps around the agni, each a vow etched in eternity' },
              { type: 'jasmine', title: 'Jasmine & Garlands', desc: 'Fragrant threads binding two families into one story' },
              { type: 'mangalsutra', title: 'Mangalsutra', desc: 'The golden thread of promise, tied with love and prayer' },
              { type: 'nadaswaram', title: 'Nadaswaram', desc: 'Ancient melodies blessing the union with divine grace' },
            ].map((r, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="flex flex-col items-center gap-8 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-[#C9A84C]/20 scale-0 group-hover:scale-150 transition-transform duration-700" />
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <RitualIcon type={r.type as any} size={80} />
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#E8D5A0] kerning-loose">{r.title}</h3>
                  <p className="font-sans text-[13px] md:text-sm text-white/70 font-light tracking-wide leading-relaxed max-w-[280px] mx-auto">
                    {r.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING: SUNSET SILHOUETTE ─────────────────────────────── */}
      <section className="relative h-screen bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: gopuramY }} className="absolute bottom-0 w-full flex justify-center text-white/5 pointer-events-none">
          <GopuramSilhouette className="w-[120%] md:w-[60%] lg:w-[40%] max-h-[80vh] opacity-10" />
        </motion.div>
        
        <AnimatedBirds />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-16 py-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="flex items-center justify-center gap-8 opacity-40">
              <div className="w-16 h-px bg-white" />
              <RitualIcon type="fire" size={24} />
              <div className="w-16 h-px bg-white" />
            </div>

            <h2 className="font-serif italic text-4xl md:text-6xl text-white font-light leading-tight kerning-loose px-4">
              We await your presence <br />
              to bless this new beginning
            </h2>

            <div className="space-y-2 pt-8">
              <p className="font-sans text-xs uppercase tracking-editorial text-[#E8D5A0]">{d.brideFirstName} & {d.groomFirstName}</p>
              <p className="font-sans text-[10px] uppercase tracking-editorial text-white/40">{d.weddingDate} · {d.city}</p>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <p className="font-sans text-[8px] uppercase tracking-[0.5em] text-white">Made with love</p>
          <div className="w-12 h-px bg-white/20" />
        </div>
      </section>
    </div>
  );
}

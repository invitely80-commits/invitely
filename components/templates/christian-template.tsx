"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

const DEFAULT_DATA = {
  brideFirstName: "Sarah", brideLastName: "D'Souza",
  groomFirstName: "David", groomLastName: "Mendes",
  weddingDate: "Sunday, December 20, 2026",
  city: "Goa",
  hashtag: "#SarahDavidEverAfter",
  heroImage: "/images/templates/christian/hero_god_tier.png",
  storyImage: "/images/templates/christian/hero_god_tier.png",
  ritualsImage: "/images/templates/christian/hero_god_tier.png",
};

export function ChristianTemplate({
  invite,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transforms
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.12]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, 100]);
  
  const d = {
    ...DEFAULT_DATA,
    brideFirstName: invite.data.brideName.split(" ")[0],
    groomFirstName: invite.data.groomName.split(" ")[0],
    weddingDate: formatDisplayDate(invite.data.weddingDate),
    city: invite.data.events[0]?.address.split(",").slice(-2)[0]?.trim() || "Goa",
    hashtag: invite.data.description.match(/#\w+/)?.[0] || DEFAULT_DATA.hashtag,
    heroImage: invite.data.heroImage || invite.data.gallery[0] || DEFAULT_DATA.heroImage,
    storyImage: invite.data.gallery[0] || DEFAULT_DATA.storyImage,
  };

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] text-[#2D2926] overflow-x-hidden w-full min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Inter:wght@100;200;300;400&display=swap');
        .font-serif { font-family: 'Bodoni Moda', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .tracking-editorial { letter-spacing: 0.5em; }
        .kerning-loose { letter-spacing: 0.2em; }
        .text-shadow-ethereal { 
          text-shadow: 0 2px 10px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1); 
        }
      `}</style>

      {/* ── HERO: ETHEREAL CHAPEL ─────────────────────────────────── */}
      <section className="relative h-[100dvh] w-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full">
          <Image src={d.heroImage} alt="Altar" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/60" />
        </motion.div>
        
        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative z-10 text-center px-6 max-w-5xl space-y-16">
          <div className="space-y-6">
            <p className="text-charcoal/60 font-sans text-[10px] uppercase tracking-editorial font-bold">Sacred Union</p>
            <div className="w-12 h-px bg-charcoal/30 mx-auto" />
          </div>
          
          <h1 className="font-serif italic text-5xl md:text-[5.5rem] lg:text-[7rem] text-[#1A1A1A] font-normal leading-[1.1] kerning-loose text-shadow-ethereal">
            Grace Found Us, <br />
            <span className="opacity-70 italic text-[#2F4F4F]">Love Bound Us</span>
          </h1>

          <div className="space-y-8 pt-4">
            <h2 className="font-serif text-3xl md:text-5xl text-[#2F4F4F] kerning-loose font-medium">
              {d.brideFirstName} <span className="opacity-40 italic">&amp;</span> {d.groomFirstName}
            </h2>
            <p className="font-sans text-[11px] uppercase tracking-editorial text-charcoal/60 font-medium">
              {d.weddingDate} <span className="mx-6 opacity-30">|</span> {d.city}
            </p>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <div className="w-px h-24 bg-gradient-to-b from-charcoal/20 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── THE JOURNEY: SILK & PEARL ──────────────────────────────── */}
      <section className="relative py-32 md:py-64 px-6 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 md:space-y-16"
          >
            <h2 className="font-serif italic text-4xl md:text-7xl text-[#1A1A1A] font-light leading-tight">
              A light that <br /> never fades
            </h2>

            <div className="space-y-8 font-sans text-sm md:text-base text-[#4A4A4A] font-light leading-relaxed tracking-widest opacity-80 max-w-lg">
              {invite.data.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            
            <div className="pt-8 md:pt-12">
              <div className="w-16 h-px bg-charcoal/10 mb-8" />
              <p className="font-serif text-lg italic text-charcoal/40 tracking-widest uppercase">{d.hashtag}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#F5F5F5] translate-x-8 translate-y-8 -z-10" />
            <div className="relative aspect-square overflow-hidden grayscale-[100%] hover:grayscale-0 transition-all duration-1000 shadow-xl">
              <Image src={d.storyImage} alt="Couple" fill className="object-cover scale-110 hover:scale-100 transition-transform duration-[5s]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── THE CELEBRATION: MINIMAL ELEGANCE ────────────────────────── */}
      <section className="relative py-32 md:py-52 bg-[#F9F9F9] text-[#1A1A1A] overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-24 md:space-y-32">
          <div className="space-y-8">
            <span className="font-sans text-[10px] tracking-editorial uppercase opacity-40">The Order of Service</span>
            <h2 className="font-serif italic text-4xl md:text-6xl font-light tracking-wide">The Celebration</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 md:gap-x-32 gap-y-24 md:gap-y-40 py-8 md:py-16">
            {invite.data.events.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="text-left space-y-6"
              >
                <div className="flex items-center gap-6">
                  <p className="font-sans text-[11px] tracking-editorial uppercase text-charcoal/60 font-medium">
                    {event.time} @ {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                  </p>
                  <div className="flex-1 h-px bg-black/10" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl md:text-[2.25rem] font-normal tracking-tight text-[#1A1A1A]">{event.title}</h3>
                  <p className="font-sans text-[13px] text-charcoal/70 font-light leading-relaxed max-w-sm tracking-wide">
                    {event.description || `${event.venue}, ${event.address}`}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── FINALE: ETERNAL PEACE ─────────────────────────────── */}
      <section className="relative h-screen bg-white flex items-center justify-center overflow-hidden">
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="w-px h-24 bg-charcoal/10 mx-auto" />
            
            <h2 className="font-serif italic text-4xl md:text-7xl text-[#1A1A1A] font-light leading-snug tracking-tighter">
              Walking into <br />
              <span className="opacity-40 italic">the light, together.</span>
            </h2>

            <div className="space-y-4 pt-12">
              <p className="font-sans text-[10px] uppercase tracking-[0.6em] text-charcoal/40">{d.brideFirstName} & {d.groomFirstName}</p>
              <p className="font-sans text-[8px] uppercase tracking-[0.8em] text-charcoal/20">Invitely Boutique Template</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

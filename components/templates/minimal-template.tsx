"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";
import { MapSection } from "@/components/templates/map-section";

const DEFAULT_DATA = {
  brideFirstName: "Aarohi", brideLastName: "Verma",
  groomFirstName: "Vihaan", groomLastName: "Reddy",
  weddingDate: "Saturday, June 20, 2026",
  city: "Bangalore",
  hashtag: "#AarohiVihaanUnion",
  heroImage: "/images/templates/minimal/hero.png",
  storyImage: "/images/templates/minimal/story.png",
  ritualsImage: "/images/templates/minimal/rituals.png",
};

export function MinimalTemplate({
  invite,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transforms
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.05]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, 50]);
  
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
    <div ref={containerRef} className="bg-white text-charcoal overflow-x-hidden w-full min-h-screen selection:bg-black selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Inter:wght@100;200;300;400&display=swap');
        .font-serif { font-family: 'Bodoni Moda', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .tracking-editorial { letter-spacing: 0.6em; }
        .kerning-loose { letter-spacing: 0.3em; }
        .text-shadow-ethereal { 
           text-shadow: 0 2px 10px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02); 
        }
      `}</style>

      {/* ── HERO: PURE MINIMAL ──────────────────────────────────── */}
      <section className="relative h-[100dvh] w-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full">
          <Image src={d.heroImage} alt="Minimal" fill priority className="object-cover opacity-40 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/80" />
        </motion.div>
        
        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative z-10 text-center px-6 max-w-5xl space-y-12">
          <div className="space-y-4">
             <div className="w-12 h-px bg-black/20 mx-auto" />
             <p className="text-[11px] uppercase tracking-editorial font-bold opacity-60 text-black">Modern Minimal Collection</p>
             <div className="w-12 h-px bg-black/20 mx-auto" />
          </div>
          
          <h1 className="font-serif italic text-5xl md:text-[6rem] lg:text-[8rem] text-black font-normal leading-[1.0] kerning-loose text-shadow-ethereal">
            Simply, <br />
            <span className="opacity-60 italic">Ours.</span>
          </h1>

          <div className="space-y-8 pt-4">
            <h2 className="font-serif text-3xl md:text-6xl text-black/90 kerning-loose font-light">
              {d.brideFirstName} <span className="opacity-30 italic">&amp;</span> {d.groomFirstName}
            </h2>
            <div className="flex flex-col items-center gap-6 text-black/60 font-sans text-[11px] uppercase tracking-editorial font-medium">
              <span>{d.weddingDate}</span>
              <span className="opacity-40">{d.city}</span>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 8, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
             <div className="w-px h-32 bg-black/10" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── THE STORY: THE VOID & THE LIGHT ─────────────────────────── */}
      <section className="relative py-32 md:py-64 px-6 md:px-24 bg-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
           <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <h2 className="font-serif italic text-4xl md:text-6xl text-black font-extralight leading-tight">
              A love found <br /> in the quiet
            </h2>

            <div className="space-y-8 font-sans text-sm md:text-base text-black/60 font-light leading-relaxed tracking-widest max-w-lg">
              {invite.data.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            
            <div className="pt-8">
              <p className="font-serif text-lg italic text-black/30 tracking-widest uppercase">{d.hashtag}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden grayscale contrast-75 bg-black/5">
              <Image src={d.storyImage} alt="Minimal Detail" fill className="object-cover scale-110 hover:scale-100 transition-transform duration-[8s] opacity-80" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── THE MOMENTS: SILENT GRID ────────────────────────────────── */}
      <section className="relative py-32 md:py-52 bg-white text-black overflow-hidden border-t border-black/5">
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-24 md:space-y-40">
          <div className="space-y-10">
            <span className="font-sans text-[9px] tracking-[1em] uppercase opacity-20">The Timeline of Union</span>
            <h2 className="font-serif italic text-4xl md:text-6xl font-light tracking-wide text-black/70">The Moments</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 md:gap-x-24 gap-y-24 md:gap-40 py-8 md:py-16">
            {invite.data.events.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
                className="text-left space-y-4"
              >
                <div className="flex items-center gap-4 border-b border-black/10 pb-2">
                   <p className="font-sans text-[11px] tracking-editorial uppercase opacity-60 text-black font-medium">
                    {event.time} @ {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                   </p>
                   <div className="w-1.5 h-1.5 bg-black/20 rounded-full" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl md:text-3xl font-normal tracking-tight text-black">{event.title}</h3>
                  <p className="font-sans text-[13px] text-black/60 font-light leading-relaxed max-w-sm tracking-wide">
                    {event.description || `${event.venue}, ${event.address}`}
                  </p>
                  <MapSection 
                    address={event.address} 
                    mapUrl={event.mapUrl} 
                    buttonClassName="border-black/10 text-black/60 hover:border-black/30"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── FINALE: ETERNAL WHITE ─────────────────────────────────── */}
      <section className="relative h-screen bg-white flex items-center justify-center overflow-hidden">
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-24">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="w-px h-40 bg-black/5 mx-auto" />
            
            <h2 className="font-serif italic text-4xl md:text-8xl text-black font-light leading-none tracking-tighter mix-blend-multiply opacity-70">
              One Love. <br />
              <span className="opacity-10 italic">Pure Silence.</span>
            </h2>

            <div className="space-y-6 pt-16">
              <p className="font-sans text-[11px] uppercase tracking-[1em] text-black/40 font-light">{d.brideFirstName} & {d.groomFirstName}</p>
              <p className="font-sans text-[8px] uppercase tracking-[1.2em] text-black/10 italic">Invitely Minimalist</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

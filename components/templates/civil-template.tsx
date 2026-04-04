"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

const DEFAULT_DATA = {
  brideFirstName: "Sophie", brideLastName: "Bennett",
  groomFirstName: "James", groomLastName: "Wilson",
  weddingDate: "Friday, June 12, 2026",
  city: "London",
  hashtag: "#SophieJamesCivilUnion",
  heroImage: "/images/templates/civil/hero.png",
  storyImage: "/images/templates/civil/story.png",
  ritualsImage: "/images/templates/civil/rituals.png",
};

export function CivilTemplate({
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
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, 80]);
  
  const d = {
    ...DEFAULT_DATA,
    brideFirstName: invite.data.brideName.split(" ")[0],
    groomFirstName: invite.data.groomName.split(" ")[0],
    weddingDate: formatDisplayDate(invite.data.weddingDate),
    city: invite.data.events[0]?.address.split(",").slice(-2)[0]?.trim() || "London",
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
        .tracking-editorial { letter-spacing: 0.55em; }
        .kerning-loose { letter-spacing: 0.25em; }
        .text-shadow-ethereal { 
           text-shadow: 0 4px 15px rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.05); 
        }
      `}</style>

      {/* ── HERO: MINIMALIST CHAPEL ─────────────────────────────────── */}
      <section className="relative h-[100dvh] w-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full">
          <Image src={d.heroImage} alt="Chapel" fill priority className="object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/80" />
        </motion.div>
        
        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative z-10 text-center px-6 max-w-5xl space-y-16">
          <div className="space-y-6">
            <p className="text-charcoal/60 font-sans text-[11px] uppercase tracking-editorial font-bold">Civil Union Invitation</p>
            <div className="w-12 h-px bg-charcoal/30 mx-auto" />
          </div>
          
          <h1 className="font-serif italic text-5xl md:text-[6rem] lg:text-[7.5rem] text-charcoal font-normal leading-[1.0] kerning-loose text-shadow-ethereal">
            Fine Moments, <br />
            <span className="opacity-70 italic text-[#2D2926]">Eternal Vows</span>
          </h1>

          <div className="space-y-8 pt-4">
            <h2 className="font-serif text-3xl md:text-[3.5rem] text-charcoal/90 kerning-loose font-medium">
              {d.brideFirstName} <span className="opacity-40 italic">&amp;</span> {d.groomFirstName}
            </h2>
            <div className="flex items-center justify-center gap-12 text-charcoal/60 font-sans text-[11px] uppercase tracking-editorial font-medium">
              <span>{d.weddingDate}</span>
              <div className="w-1.5 h-1.5 bg-charcoal/20 rounded-full" />
              <span>{d.city}</span>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 8, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <div className="w-px h-24 bg-gradient-to-b from-charcoal/10 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── THE JOURNEY: MODERN MINIMALISM ───────────────────────────── */}
      <section className="relative py-32 md:py-64 px-6 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#F5F5F5] translate-x-12 translate-y-12 -z-10" />
            <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-xl">
              <Image src={d.storyImage} alt="Couple" fill className="object-cover scale-110 hover:scale-100 transition-transform duration-[5s]" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 md:space-y-16"
          >
            <h2 className="font-serif italic text-4xl md:text-7xl text-charcoal font-light leading-tight">
              A light that <br /> never fades
            </h2>

            <div className="space-y-8 font-sans text-sm md:text-base text-charcoal/60 font-light leading-relaxed tracking-widest opacity-80 max-w-lg">
              {invite.data.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            
            <div className="pt-8">
              <div className="w-24 h-px bg-charcoal/5 mb-8" />
              <p className="font-serif text-lg italic text-charcoal/30 tracking-widest uppercase">{d.hashtag}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── THE LOGISTICS: CLEAN GRID ──────────────────────────────── */}
      <section className="relative py-32 md:py-52 bg-[#FAFAFA] text-charcoal overflow-hidden border-y border-charcoal/5">
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-24 md:space-y-32">
          <div className="space-y-8">
            <span className="font-sans text-[10px] tracking-editorial uppercase opacity-40">The Order of Day</span>
            <h2 className="font-serif italic text-4xl md:text-6xl font-light tracking-wide text-charcoal/70">The Ceremony</h2>
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
                  <p className="font-sans text-[11px] font-bold tracking-editorial uppercase text-charcoal/60">
                    {event.time} @ {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                  </p>
                  <div className="flex-1 h-px bg-charcoal/20" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl md:text-4xl font-normal tracking-tight text-charcoal">{event.title}</h3>
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
            <div className="w-px h-32 bg-charcoal/5 mx-auto" />
            
            <h2 className="font-serif italic text-4xl md:text-8xl text-charcoal font-light leading-snug tracking-tighter opacity-80">
              Two hearts, <br />
              <span className="opacity-30 italic">one quiet journey.</span>
            </h2>

            <div className="space-y-4 pt-12">
              <p className="font-sans text-[11px] uppercase tracking-[0.8em] text-charcoal/30">{d.brideFirstName} & {d.groomFirstName}</p>
              <p className="font-sans text-[8px] uppercase tracking-[1em] text-charcoal/10 italic">A Boutique Civil Collection</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

const DEFAULT_DATA = {
  brideFirstName: "Zoya", brideLastName: "Khan",
  groomFirstName: "Omar", groomLastName: "Farooq",
  weddingDate: "Friday, December 18, 2026",
  city: "Lucknow",
  hashtag: "#ZoyaOmarNikah",
  heroImage: "/images/templates/muslim/hero_god_tier.png", // Placeholder
  storyImage: "/images/templates/muslim/hero_god_tier.png",
  ritualsImage: "/images/templates/muslim/hero_god_tier.png",
};

export function MuslimTemplate({
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
  
  const d = {
    ...DEFAULT_DATA,
    brideFirstName: invite.data.brideName.split(" ")[0],
    groomFirstName: invite.data.groomName.split(" ")[0],
    weddingDate: formatDisplayDate(invite.data.weddingDate),
    city: invite.data.events[0]?.address.split(",").slice(-2)[0]?.trim() || "Lucknow",
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
          text-shadow: 0 2px 10px rgba(0,0,0,0.4), 0 5px 25px rgba(0,0,0,0.3); 
        }
      `}</style>

      {/* ── HERO: GRAND MOGHUL PALACE ──────────────────────────────── */}
      <section className="relative h-[100dvh] w-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full">
          <Image src={d.heroImage} alt="Moghul Palace" fill priority className="object-cover brightness-[0.9]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        </motion.div>
        
        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative z-10 text-center px-6 max-w-5xl space-y-16">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="w-12 h-px bg-white" />
              <p className="text-white font-sans text-[10px] uppercase tracking-editorial font-medium">Nikah Invitation</p>
              <div className="w-12 h-px bg-white" />
            </div>
          </div>
          
          <h1 className="font-serif italic text-5xl md:text-8xl text-white font-light leading-[1.0] kerning-loose text-shadow-cinematic">
            By Allah&apos;s Grace, <br />
            <span className="opacity-90 italic">A Covenant of Love</span>
          </h1>

          <div className="space-y-4 pt-4">
            <h2 className="font-serif text-3xl md:text-5xl text-[#E8D5A0] kerning-loose font-medium text-shadow-cinematic">
              {d.brideFirstName} <span className="opacity-60 italic">&amp;</span> {d.groomFirstName}
            </h2>
            <div className="flex items-center justify-center gap-4 text-white/80 font-sans text-[9px] uppercase tracking-editorial font-light drop-shadow-md">
              <span>{d.weddingDate}</span>
              <div className="w-px h-6 bg-white/20" />
              <span>{d.city}</span>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <div className="w-px h-24 bg-gradient-to-b from-[#E8D5A0] to-transparent opacity-40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── THE COVENANT: GEOMETRIC LAYOUT ────────────────────────────── */}
      <section className="relative py-32 md:py-64 px-6 md:px-24 bg-[#FBF9F7]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="order-2 lg:order-1 relative"
          >
            <div className="absolute inset-0 bg-[#064E3B]/5 -m-6 sm:-m-12 rounded-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden grayscale-[50%] hover:grayscale-0 transition-all duration-1000 shadow-2xl">
              <Image src={d.storyImage} alt="Details" fill className="object-cover scale-105 hover:scale-100 transition-transform duration-[4s]" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 space-y-12 md:space-y-16"
          >
            <div className="flex items-center gap-8">
              <span className="text-[#064E3B] text-[10px] tracking-editorial uppercase font-sans font-bold">The Nikah</span>
              <div className="w-16 h-px bg-[#064E3B]/20" />
            </div>
            
            <h2 className="font-serif italic text-4xl md:text-7xl text-[#1A2E2A] font-light leading-tight">
              A promise witnessed <br /> by the stars
            </h2>

            <div className="space-y-8 font-sans text-sm md:text-base text-[#2A3E3A] font-light leading-relaxed tracking-wider opacity-85 max-w-lg">
              {invite.data.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            
            <div className="pt-8 md:pt-12">
              <div className="w-24 h-px bg-[#E8D5A0]/60 mb-6" />
              <p className="font-serif text-xl italic text-[#064E3B]">{d.hashtag}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRADITIONS: EMERALD & GOLD ──────────────────────────────── */}
      <section className="relative py-32 md:py-52 bg-[#1A2E2A] text-[#FDFBF7] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none scale-150">
          <Image src={d.heroImage} alt="" fill className="object-cover grayscale brightness-200" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-24 md:space-y-32">
          <div className="space-y-8">
            <span className="font-sans text-[10px] tracking-editorial uppercase opacity-40">Sacred Rituals</span>
            <h2 className="font-serif italic text-4xl md:text-6xl font-light tracking-wide text-[#E8D5A0]">Bespoke Traditions</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24 py-8 md:py-16">
            {invite.data.events.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="space-y-8 group"
              >
                <div className="relative flex justify-center">
                   <div className="w-12 h-px bg-[#E8D5A0]/20 group-hover:w-20 transition-all duration-700" />
                </div>
                <div className="space-y-4">
                  <p className="font-sans text-[9px] tracking-editorial uppercase text-[#E8D5A0] font-medium">
                    {event.time} @ {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                  </p>
                  <h3 className="font-serif text-2xl font-light tracking-widest">{event.title}</h3>
                </div>
                <p className="font-sans text-xs opacity-50 font-extralight leading-relaxed max-w-[240px] mx-auto">
                  {event.description || `${event.venue}, ${event.address}`}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── FINALE: THE ETERNAL MOON ─────────────────────────────── */}
      <section className="relative h-screen bg-[#0A0F0D] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="flex items-center justify-center gap-16 opacity-20">
              <div className="w-16 h-px bg-white" />
              <div className="w-3 h-3 rounded-full border border-white rotate-45" />
              <div className="w-16 h-px bg-white" />
            </div>

            <h2 className="font-serif italic text-4xl md:text-7xl text-white font-light leading-snug kerning-loose">
              May this love <br />
              <span className="text-[#E8D5A0]/90 italic">last beyond time.</span>
            </h2>

            <div className="space-y-4 pt-4 px-12">
              <div className="w-full h-px bg-white/10" />
              <div className="flex justify-between items-center font-sans text-[10px] uppercase tracking-editorial text-white/40">
                <span>{d.brideFirstName} & {d.groomFirstName}</span>
                <span>{d.weddingDate}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
          <p className="font-sans text-[8px] uppercase tracking-[0.7em] text-white/30">Curated for Legacy by Invitely</p>
        </div>
      </section>
    </div>
  );
}

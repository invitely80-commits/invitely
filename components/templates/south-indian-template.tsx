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
  heroImage: "/images/templates/south-indian/gopuram_vibrant.png",
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
  };

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] text-[#2D2926] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Inter:wght@200;300;400&display=swap');
        .font-serif { font-family: 'Bodoni Moda', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .tracking-editorial { letter-spacing: 0.4em; }
        .kerning-loose { letter-spacing: 0.15em; }
        .text-shadow-cinematic { 
          text-shadow: 0 2px 4px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2); 
        }
      `}</style>

      {/* ── HERO: CINEMATIC ENTRY ──────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image src={d.heroImage} alt="Temple" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </motion.div>
        <LightRays />
        
        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative z-10 text-center px-6 max-w-5xl space-y-12">
          <div className="space-y-4">
            <div className="w-24 h-px bg-white/60 mx-auto" />
            <p className="text-white font-sans text-[10px] uppercase tracking-editorial font-medium text-shadow-cinematic">Wedding Invitation</p>
            <div className="w-24 h-px bg-white/60 mx-auto" />
          </div>
          
          <h1 className="font-serif italic text-4xl md:text-7xl lg:text-8xl text-white font-medium leading-[1.1] kerning-loose text-shadow-cinematic">
            A union written in tradition, <br />
            <span className="">celebrated in love</span>
          </h1>

          <div className="space-y-3 pt-8">
            <h2 className="font-serif text-3xl md:text-4xl text-[#E8D5A0] kerning-loose font-semibold text-shadow-cinematic">
              {d.brideFirstName} <span className="opacity-60 italic">&amp;</span> {d.groomFirstName}
            </h2>
            <p className="font-sans text-xs md:text-sm text-white font-medium uppercase tracking-editorial pt-2 text-shadow-cinematic">
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
      <section className="relative py-48 px-6 md:px-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
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
              <p>Under the ancient arches of a temple older than memory, their eyes met — not by chance, but by the quiet hand of fate.</p>
              <p>What began as stolen glances across a crowded kolam grew into whispered conversations, shared laughter over filter coffee, and prayers offered side by side.</p>
              <p>Now, as jasmine garlands are woven and sacred fires lit, they step into forever — with tradition as their guide and love as their compass.</p>
            </div>
            
            <div className="w-32 h-px bg-[#C9A84C]/30 pt-16" />
          </motion.div>
        </div>
      </section>

      {/* ── HERITAGE: THE DEEP MAROON RITUALS ───────────────────────── */}
      <section className="relative py-48 bg-[#4A1A1A] text-[#FDFBF7] overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none scale-110">
          <Image src="/images/templates/south-indian/gopuram_vibrant.png" alt="" fill className="object-cover" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="font-sans text-[10px] tracking-editorial uppercase opacity-60">Heritage</span>
            <h2 className="font-serif italic text-4xl md:text-6xl font-light">Rooted in Tradition</h2>
            <p className="font-sans text-sm md:text-base opacity-70 tracking-wide max-w-2xl mx-auto leading-relaxed">
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
                  <div className="absolute inset-0 blur-2xl bg-[#C9A84C]/10 scale-0 group-hover:scale-150 transition-transform duration-700" />
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <RitualIcon type={r.type as any} size={80} />
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-light text-[#E8D5A0] kerning-loose">{r.title}</h3>
                  <p className="font-sans text-xs md:text-sm opacity-60 font-extralight tracking-wide leading-relaxed max-w-[280px]">
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

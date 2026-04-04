"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

const DEFAULT_DATA = {
  brideFirstName: "Gurleen", brideLastName: "Kaur",
  groomFirstName: "Ishwar", groomLastName: "Singh",
  weddingDate: "Sunday, December 6, 2026",
  city: "Amritsar",
  hashtag: "#GurleenIshwarAnandKaraj",
  heroImage: "/images/templates/sikh/hero_god_tier.png",
  storyImage: "/images/templates/sikh/hero_god_tier.png",
  ritualsImage: "/images/templates/sikh/hero_god_tier.png",
};

export function SikhTemplate({
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
    city: invite.data.events[0]?.address.split(",").slice(-2)[0]?.trim() || "Amritsar",
    hashtag: invite.data.description.match(/#\w+/)?.[0] || DEFAULT_DATA.hashtag,
  };

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] text-[#2D2926] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Inter:wght@200;300;400;500&display=swap');
        .font-serif { font-family: 'Bodoni Moda', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .tracking-editorial { letter-spacing: 0.5em; }
        .kerning-loose { letter-spacing: 0.15em; }
        .text-shadow-hero { 
          text-shadow: 0 4px 15px rgba(0,0,0,0.5), 0 2px 5px rgba(0,0,0,0.3); 
        }
      `}</style>

      {/* ── HERO: GOLDEN REFLECTION ─────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image src={d.heroImage} alt="Golden Temple" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        </motion.div>
        
        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative z-10 text-center px-6 max-w-5xl space-y-16">
          <div className="space-y-6">
            <div className="w-24 h-px bg-[#E8D5A0] mx-auto" />
            <p className="text-white font-sans text-[10px] uppercase tracking-editorial font-medium">Satnam Waheguru</p>
            <div className="w-24 h-px bg-[#E8D5A0] mx-auto" />
          </div>
          
          <h1 className="font-serif italic text-5xl md:text-8xl text-white font-light leading-[1.0] kerning-loose text-shadow-hero">
            By His Divine Command, <br />
            <span className="opacity-90 italic">Two Souls, One Light</span>
          </h1>

          <div className="space-y-6 pt-6">
            <h2 className="font-serif text-3xl md:text-5xl text-[#E8D5A0] kerning-loose font-medium text-shadow-hero">
              {d.brideFirstName} <span className="opacity-60 italic">&amp;</span> {d.groomFirstName}
            </h2>
            <div className="flex items-center justify-center gap-6 text-white/80 font-sans text-[10px] uppercase tracking-editorial font-light drop-shadow-md">
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

      {/* ── THE ANAND KARAJ: HERITAGE LAYOUT ───────────────────────── */}
      <section className="relative py-64 px-6 md:px-24 bg-[#F9F7F5]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-16"
          >
             <div className="flex items-center gap-8">
              <span className="text-[#B45309] text-[10px] tracking-editorial uppercase font-sans font-bold">The Anand Karaj</span>
              <div className="w-16 h-px bg-[#B45309]/20" />
            </div>
            
            <h2 className="font-serif italic text-4xl md:text-7xl text-[#1A1A1A] font-light leading-tight">
              A love that <br /> serves and glows
            </h2>

            <div className="space-y-10 font-sans text-sm md:text-base text-[#4A4A4A] font-light leading-relaxed tracking-wider opacity-85 max-w-lg">
              <p>In the presence of the Guru, where the soul finds its ultimate rest, they step into a new chapter—not just as partners, but as companions in service and in love.</p>
              <p>They invite you to Amritsar, to witness the four circumambulations (Laavan) that bind their destinies in the light of the eternal.</p>
            </div>
            
            <div className="pt-12">
              <p className="font-serif text-xl italic text-[#B45309]">{d.hashtag}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5 }}
            className="relative"
          >
             <div className="absolute inset-0 bg-[#004A7C]/5 translate-x-12 translate-y-12 -z-10" />
            <div className="relative aspect-[4/5] overflow-hidden grayscale-[40%] hover:grayscale-0 transition-all duration-1000 shadow-2xl">
              <Image src={d.storyImage} alt="Rituals" fill className="object-cover scale-105 hover:scale-100 transition-transform duration-[6s]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRADITIONS: SAFFRON & BLUE ─────────────────────────────── */}
      <section className="relative py-52 bg-[#002B49] text-[#FDFBF7] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none scale-150">
          <Image src="/images/templates/south-indian/gopuram_vibrant.png" alt="" fill className="object-cover grayscale brightness-200" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-32">
          <div className="space-y-8">
            <span className="font-sans text-[10px] tracking-editorial uppercase opacity-40">Sacred Vows</span>
            <h2 className="font-serif italic text-4xl md:text-6xl font-light tracking-wide text-[#E8D5A0]">Bespoke Traditions</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-24 py-16">
            {[
              { title: 'The Baraat', time: '9:00 AM', desc: 'A grand procession of joy and drums.' },
              { title: 'The Pheras', time: '11:00 AM', desc: 'Sacred circles in the presence of Guru Granth Sahib.' },
              { title: 'The Langar', time: '1:00 PM', desc: 'A community feast shared in gratitude and humility.' },
            ].map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="space-y-10 group"
              >
                <div className="relative flex justify-center">
                   <div className="w-12 h-px bg-[#E8D5A0]/20 group-hover:w-20 transition-all duration-700" />
                </div>
                <div className="space-y-4">
                  <p className="font-sans text-[9px] tracking-editorial uppercase text-[#E8D5A0] font-medium">{event.time}</p>
                  <h3 className="font-serif text-2xl font-light tracking-widest">{event.title}</h3>
                </div>
                <p className="font-sans text-xs opacity-50 font-extralight leading-relaxed max-w-[240px] mx-auto tracking-wide">
                  {event.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINALE: ETERNAL PEACE ─────────────────────────────── */}
      <section className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="flex items-center justify-center gap-16 opacity-30">
              <div className="w-16 h-px bg-white" />
              <div className="w-3 h-3 rounded-full border border-white" />
              <div className="w-16 h-px bg-white" />
            </div>

            <h2 className="font-serif italic text-4xl md:text-8xl text-white font-light leading-snug tracking-tighter">
              Joined in faith, <br />
              <span className="text-[#E8D5A0]/90 italic">Guided by grace.</span>
            </h2>

            <div className="space-y-4 pt-12">
              <p className="font-sans text-[11px] uppercase tracking-[0.8em] text-[#E8D5A0]">{d.brideFirstName} & {d.groomFirstName}</p>
              <p className="font-sans text-[8px] uppercase tracking-[0.6em] text-white/20">Invitely Luxury Heritage</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

const DEFAULT_DATA = {
  brideFirstName: "Meera", brideLastName: "Rathore",
  groomFirstName: "Aditya", groomLastName: "Singh",
  weddingDate: "Sunday, November 29, 2026",
  city: "Udaipur",
  hashtag: "#TheRoyalUnion",
  heroImage: "/images/templates/royal/hero_god_tier.png",
  storyImage: "/images/templates/royal/hero_god_tier.png",
  ritualsImage: "/images/templates/royal/hero_god_tier.png",
};

export function RoyalTemplate({
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
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, 120]);
  
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
        .tracking-editorial { letter-spacing: 0.5em; }
        .kerning-loose { letter-spacing: 0.15em; }
        .text-shadow-royal { 
          text-shadow: 0 4px 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6); 
        }
      `}</style>

      {/* ── HERO: OPULENT PALACE ─────────────────────────────────── */}
      <section className="relative h-[100dvh] w-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full">
          <Image src={d.heroImage} alt="Palace" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
        </motion.div>
        
        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative z-10 text-center px-6 max-w-5xl space-y-16">
          <div className="space-y-6">
            <div className="w-24 h-px bg-[#C9A84C] mx-auto" />
            <p className="text-[#E8D5A0] font-sans text-[11px] uppercase tracking-editorial font-bold drop-shadow-xl">Imperial Collection</p>
            <div className="w-24 h-px bg-[#C9A84C] mx-auto" />
          </div>
          
          <h1 className="font-serif italic text-5xl md:text-[6rem] lg:text-[7.5rem] text-white font-normal leading-[1.0] kerning-loose text-shadow-royal">
            A Legacy of Crowns, <br />
            <span className="opacity-95 italic text-[#FDFBF7]">A Covenant of Hearts</span>
          </h1>

          <div className="space-y-8 pt-6">
            <h2 className="font-serif text-3xl md:text-[4rem] text-[#E8D5A0] kerning-loose font-medium text-shadow-royal tracking-tight">
              {d.brideFirstName} <span className="opacity-60 italic">&amp;</span> {d.groomFirstName}
            </h2>
            <div className="flex items-center justify-center gap-8 text-white/90 font-sans text-[11px] uppercase tracking-editorial font-medium drop-shadow-2xl">
              <span>{d.weddingDate}</span>
              <div className="w-2 h-2 bg-[#C9A84C] rotate-45 shadow-[0_0_10px_rgba(201,168,76,0.6)]" />
              <span>{d.city}</span>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 py-8"
          >
            <div className="w-px h-24 bg-gradient-to-b from-[#C9A84C] to-transparent opacity-60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── THE LINEAGE: VELVET & GOLD ─────────────────────────────── */}
      <section className="relative py-32 md:py-64 px-6 md:px-24 bg-[#FCFAFB]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 md:space-y-16"
          >
            <div className="flex items-center gap-8">
              <span className="text-[#8B1A1A] text-[10px] tracking-editorial uppercase font-sans font-bold">The Royal Story</span>
              <div className="w-16 h-px bg-[#8B1A1A]/20" />
            </div>
            
            <h2 className="font-serif italic text-4xl md:text-7xl text-[#2D2D2D] font-light leading-tight">
              Where empires end <br /> and love begins
            </h2>

            <div className="space-y-8 font-sans text-sm md:text-base text-[#4A4A4A] font-light leading-relaxed tracking-widest opacity-85 max-w-lg">
              {invite.data.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            
            <div className="pt-8 md:pt-12">
              <div className="inline-block p-4 border border-[#C9A84C]/30 bg-[#C9A84C]/5">
                <p className="font-serif text-xl italic text-[#8B1A1A]">{d.hashtag}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5 }}
            className="relative"
          >
             <div className="absolute inset-0 bg-[#C9A84C]/10 translate-x-12 translate-y-12 -z-10" />
            <div className="relative aspect-[4/5] overflow-hidden grayscale-[40%] hover:grayscale-0 transition-all duration-1000 shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
              <Image src={d.storyImage} alt="Details" fill className="object-cover scale-110 hover:scale-100 transition-transform duration-[6s]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── THE FESTIVITIES: ROYAL PROTOCOL ────────────────────────── */}
      <section className="relative py-32 md:py-52 bg-[#8B1A1A] text-[#FDFBF7] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none scale-150">
          <Image src="/images/templates/south-indian/gopuram_vibrant.png" alt="" fill className="object-cover grayscale brightness-200" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-24 md:space-y-32">
          <div className="space-y-8">
            <span className="font-sans text-[10px] tracking-editorial uppercase opacity-40">Imperial Ceremonies</span>
            <h2 className="font-serif italic text-4xl md:text-6xl font-light tracking-wide text-[#E8D5A0]">The Celebration</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24 py-8">
            {invite.data.events.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="space-y-10 group"
              >
                <div className="flex flex-col items-center">
                   <p className="font-serif text-[22px] md:text-[26px] tracking-widest text-[#E8D5A0] opacity-80 font-thin italic">
                     {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                   </p>
                   <div className="w-px h-12 bg-[#E8D5A0]/40 my-4" />
                </div>
                <div className="space-y-4 text-center">
                   <h3 className="font-serif text-2xl md:text-3xl font-normal tracking-widest uppercase text-white">{event.title}</h3>
                  <div className="space-y-3">
                    <p className="font-sans text-[11px] text-[#E8D5A0] tracking-widest uppercase font-medium">
                      {event.time} @ {event.venue}
                    </p>
                    <p className="font-sans text-[13px] text-white/70 font-light leading-relaxed max-w-[260px] mx-auto tracking-wide">
                      {event.description || event.address}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINALE: ETERNAL DYNASTY ─────────────────────────────── */}
      <section className="relative h-screen bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="flex items-center justify-center gap-20 opacity-30">
              <div className="w-16 h-px bg-[#C9A84C]" />
              <div className="w-4 h-4 border border-[#C9A84C] rotate-45" />
              <div className="w-16 h-px bg-[#C9A84C]" />
            </div>

            <h2 className="font-serif italic text-4xl md:text-8xl text-white font-light leading-snug tracking-tighter">
              Bound by honor, <br />
              <span className="text-[#E8D5A0]/60 italic">United by love.</span>
            </h2>

            <div className="space-y-6 pt-16">
              <p className="font-sans text-[11px] uppercase tracking-[0.8em] text-[#E8D5A0] font-medium">{d.brideFirstName} & {d.groomFirstName}</p>
              <p className="font-sans text-[9px] uppercase tracking-[1em] text-white/10 italic">In service of heritage</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

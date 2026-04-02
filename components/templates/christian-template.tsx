"use client";

import Image from "next/image";
import Link from "next/link";
import { Church, MapPin, Sparkles, Heart, Bell } from "lucide-react";
import { motion } from "framer-motion";

import { buttonStyles } from "@/components/ui/button";
import { getGoogleCalendarUrl } from "@/lib/calendar";
import { getCoupleNames } from "@/lib/invites";
import { formatDisplayDate } from "@/lib/utils";
import { type TemplateInvite } from "@/components/templates/render-invite";

export function ChristianTemplate({
  invite,
  preview = false,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  const coupleNames = getCoupleNames(invite.data);
  const primaryEvent = invite.data.events[0];
  const heroImage = invite.data.heroImage || invite.data.gallery[0];

  return (
    <div className="overflow-hidden rounded-[40px] bg-white text-stone-900 shadow-2xl relative min-h-screen font-sans">
      {/* Delicate Lace Texture Placeholder */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-[0.1]" />
      
      <section className="relative px-6 py-24 sm:px-12 sm:py-32 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-12">
             <div className="h-12 w-12 rounded-full ring-1 ring-stone-200 flex items-center justify-center text-stone-300">
                <Bell className="h-5 w-5" />
             </div>
          </div>
          
          <h1 className="font-heading text-6xl text-stone-900 sm:text-9xl leading-none tracking-tighter">
            {coupleNames}
          </h1>
          
          <div className="mt-12 h-px w-24 bg-stone-200 mx-auto" />
          
          <p className="mt-12 text-2xl font-serif tracking-tight text-stone-400 italic max-w-2xl mx-auto leading-relaxed">
            &quot;{invite.data.description}&quot;
          </p>

          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="mt-24 relative mx-auto w-full max-w-5xl aspect-[1.4] rounded-[60px] overflow-hidden grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-8 border-white ring-1 ring-stone-100"
          >
             {heroImage ? (
                <Image src={heroImage} alt={coupleNames} fill className="object-cover scale-105 hover:scale-100 transition-transform duration-[3s]" priority sizes="1000px" />
             ) : (
                <div className="flex h-full items-center justify-center bg-stone-50">
                   <Heart className="size-20 text-stone-200" />
                </div>
             )}
          </motion.div>
        </motion.div>
      </section>

      {/* Ceremony Details */}
      <section className="px-6 py-32 border-t border-stone-50 overflow-hidden">
        <div className="max-w-6xl mx-auto grid gap-24 lg:grid-cols-2 lg:items-center">
           <div className="space-y-12">
              <div className="inline-block px-5 py-2 rounded-full border border-stone-100 text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">
                 The Invitation
              </div>
              <h2 className="font-heading text-5xl sm:text-7xl text-stone-900 leading-tight">Joining Together <br/> in Holy Matrimony</h2>
              <p className="text-xl text-stone-500 leading-relaxed max-w-md font-medium">
                 We invite you to share our joy as we exchange our vows and begin our new life together.
              </p>
           </div>

           <div className="grid gap-8">
              {[
                { label: "Date", value: formatDisplayDate(invite.data.weddingDate), sub: primaryEvent?.time },
                { label: "Church", value: primaryEvent?.venue, sub: primaryEvent?.address },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-10 rounded-[40px] bg-stone-50 border border-stone-100 flex flex-col gap-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[.4em] text-stone-400">{item.label}</p>
                  <p className="font-heading text-4xl text-stone-800">{item.value}</p>
                  <p className="text-sm font-medium text-stone-500">{item.sub}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 py-32 bg-stone-900 text-white rounded-t-[80px]">
        <div className="max-w-6xl mx-auto">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
              <h2 className="font-heading text-5xl sm:text-8xl text-white">The Program</h2>
              <div className="hidden md:block h-px flex-1 bg-white/10 mx-10 mb-8" />
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-8">Celebration Timeline</p>
           </div>

           <div className="grid gap-2 items-start">
              {invite.data.events.map((event, i) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative py-12 border-t border-white/5 last:border-b hover:bg-white/5 transition-colors duration-500 px-6 rounded-3xl"
                >
                  <div className="flex flex-col md:grid md:grid-cols-[1fr_2fr_1fr] items-baseline md:items-center gap-8">
                     <span className="text-xl font-heading text-white/40">
                        {event.time || "Event"}
                     </span>
                     <div>
                        <h3 className="font-heading text-4xl sm:text-5xl group-hover:text-stone-300 transition-colors">{event.title}</h3>
                        <p className="mt-4 text-white/50 text-base leading-relaxed max-w-md">{event.description}</p>
                     </div>
                     <div className="flex items-center gap-3 text-stone-400 font-medium">
                        <MapPin className="size-4" />
                        <span className="text-sm">{event.venue}</span>
                     </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}

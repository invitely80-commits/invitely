"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Shield, Crown } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { getGoogleCalendarUrl } from "@/lib/calendar";
import { getCoupleNames } from "@/lib/invites";
import { formatDisplayDate } from "@/lib/utils";
import { type TemplateInvite } from "@/components/templates/render-invite";

export function SikhTemplate({
  invite,
  preview = false,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  const coupleNames = getCoupleNames(invite.data);
  const primaryEvent = invite.data.events[0];
  const heroImage = invite.data.heroImage || invite.data.gallery[0];

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
      }
    })
  };

  return (
    <div className="overflow-hidden rounded-[40px] bg-sky-950 text-white shadow-2xl relative min-h-screen">
      {/* Decorative Border Pattern */}
      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 opacity-80" />
      
      <section className="relative px-6 py-24 sm:px-12 sm:py-32 flex flex-col items-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={variants}
          custom={0}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-8 gap-4">
             <Shield className="h-10 w-10 text-orange-400" strokeWidth={1} />
          </div>
          
          <h2 className="text-[12px] font-bold uppercase tracking-[0.5em] text-orange-400/80 mb-6 font-sans">
             Anand Karaj
          </h2>
          
          <h1 className="font-heading text-7xl text-white sm:text-[10rem] leading-none mb-10 tracking-tight">
            {coupleNames}
          </h1>
          
          <p className="mt-12 text-2xl font-serif text-white/60 italic max-w-2xl mx-auto leading-relaxed px-6">
            &quot;{invite.data.description}&quot;
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={variants}
          custom={1}
          className="relative w-full max-w-6xl aspect-[1.8] rounded-[48px] overflow-hidden border-8 border-white/5 ring-1 ring-orange-500/20 shadow-2xl"
        >
           {heroImage ? (
              <Image src={heroImage} alt={coupleNames} fill className="object-cover" priority sizes="1200px" />
           ) : (
              <div className="flex h-full items-center justify-center bg-orange-950/20">
                 <Crown className="size-20 text-orange-400/20" />
              </div>
           )}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sky-950/80" />
        </motion.div>
      </section>

      {/* Ceremony Hub */}
      <section className="px-6 pb-32 sm:px-12">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">
           <div className="p-12 rounded-[48px] bg-white text-sky-950 flex flex-col items-start gap-8 shadow-2xl hover:scale-[1.02] transition-transform duration-500">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/60">Auspicious Date</span>
              <h2 className="font-heading text-5xl sm:text-6xl text-sky-950">
                 {formatDisplayDate(invite.data.weddingDate)}
              </h2>
              {primaryEvent && (
                <div className="flex items-center gap-4 text-sky-950/60 font-bold uppercase tracking-widest text-xs border-l border-sky-950/10 pl-6">
                   <p>{primaryEvent.venue}</p>
                </div>
              )}
              {!preview && primaryEvent && (
                 <Link 
                   href={getGoogleCalendarUrl(primaryEvent, coupleNames)}
                   className="mt-4 h-14 rounded-2xl bg-orange-500 px-8 flex items-center text-white font-bold text-xs uppercase tracking-widest hover:bg-orange-600 shadow-xl shadow-orange-500/20"
                 >
                   Mark the Date
                 </Link>
              )}
           </div>

           <div className="p-12 rounded-[48px] bg-orange-500 text-white flex flex-col items-start gap-8 shadow-2xl hover:scale-[1.02] transition-transform duration-500 hover:bg-orange-600">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">Gurdwara Sahib</span>
              <h2 className="font-heading text-5xl sm:text-6xl text-white">
                 {primaryEvent?.venue || "Sacred Venue"}
              </h2>
              <p className="text-white/70 font-medium leading-relaxed">
                 {primaryEvent?.address}
              </p>
           </div>
        </div>
      </section>

      {/* Program Timeline */}
      <section className="px-6 pb-40 sm:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-10 opacity-[0.02] pointer-events-none">
           <Shield size={600} strokeWidth={0.5} />
        </div>
        <div className="max-w-6xl mx-auto">
           <h2 className="font-heading text-6xl text-white mb-20">Programe</h2>
           <div className="grid gap-8">
              {invite.data.events.map((event, i) => (
                <motion.div 
                  key={event.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group relative p-12 rounded-[40px] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex flex-col gap-6"
                >
                   <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-400">
                         {formatDisplayDate(event.date)} {event.time ? `• ${event.time}` : ""}
                      </span>
                   </div>
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                      <div className="max-w-xl">
                        <h3 className="font-heading text-4xl sm:text-5xl group-hover:text-orange-400 transition-colors">{event.title}</h3>
                        <p className="mt-4 text-white/50 text-sm leading-relaxed">{event.description}</p>
                      </div>
                      <div className="flex items-center gap-4 text-white/40 font-bold uppercase tracking-widest text-xs bg-white/5 px-6 py-4 rounded-2xl ring-1 ring-white/5">
                         <MapPin className="size-4" />
                         <span>{event.venue}</span>
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

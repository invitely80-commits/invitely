"use client";

import Image from "next/image";
import Link from "next/link";
import { Moon, Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import { getGoogleCalendarUrl } from "@/lib/calendar";
import { getCoupleNames } from "@/lib/invites";
import { formatDisplayDate } from "@/lib/utils";
import { type TemplateInvite } from "@/components/templates/render-invite";

export function MuslimTemplate({
  invite,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  const coupleNames = getCoupleNames(invite.data);
  const primaryEvent = invite.data.events[0];
  const heroImage = invite.data.heroImage || invite.data.gallery[0];

  return (
    <div className="overflow-hidden rounded-[40px] bg-[#064e3b] text-ivory shadow-2xl relative min-h-screen">
      {/* Geomatric Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <section className="relative px-6 py-16 sm:px-12 sm:py-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-10 gap-6">
             <div className="h-px w-20 bg-gold/30 self-center" />
             <Moon className="h-10 w-10 text-gold fill-gold" strokeWidth={1} />
             <div className="h-px w-20 bg-gold/30 self-center" />
          </div>
          
          <h1 className="font-heading text-6xl text-gold sm:text-9xl leading-tight">
            {coupleNames}
          </h1>
          <p className="mt-8 text-xl font-medium tracking-wide text-white/70 italic max-w-2xl mx-auto">
            &quot;{invite.data.description}&quot;
          </p>

          <div className="mt-16 relative mx-auto w-full max-w-3xl aspect-[16/9] rounded-[40px] overflow-hidden border-[8px] border-gold/20 shadow-2xl">
             {heroImage ? (
                <Image src={heroImage} alt={coupleNames} fill className="object-cover" priority sizes="800px" />
             ) : (
                <div className="flex h-full items-center justify-center bg-emerald-900/50">
                   <Star className="size-20 text-gold/20" />
                </div>
             )}
          </div>
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="px-6 py-20 bg-white/5 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2">
           <div className="flex flex-col items-center text-center p-10 rounded-[40px] bg-emerald-950/40 border border-white/5 ring-1 ring-white/10">
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold/60 mb-4">Date of Nikah</p>
              <p className="font-heading text-5xl text-gold">{formatDisplayDate(invite.data.weddingDate)}</p>
              <div className="mt-8 flex gap-4">
                 <Link 
                   href={getGoogleCalendarUrl(primaryEvent, coupleNames)}
                   className="h-14 rounded-2xl bg-gold px-8 flex items-center text-emerald-950 font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                 >
                   Remind Me
                 </Link>
              </div>
           </div>

           <div className="flex flex-col items-center text-center p-10 rounded-[40px] bg-emerald-950/40 border border-white/5 ring-1 ring-white/10">
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold/60 mb-4">Celebration Hub</p>
              <p className="font-heading text-5xl text-gold">{primaryEvent?.venue}</p>
              <div className="mt-8 text-sm text-white/50 font-medium">
                 {primaryEvent?.address}
              </div>
           </div>
        </div>
      </section>

      {/* Events Loop */}
      <section className="px-6 py-24 sm:px-12">
        <div className="max-w-6xl mx-auto">
           <div className="flex items-center gap-6 mb-16">
              <h2 className="font-heading text-5xl text-white">The Celebration</h2>
              <div className="h-px flex-1 bg-white/10" />
           </div>

           <div className="grid gap-10">
              {invite.data.events.map((event, i) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-[40px] bg-white text-emerald-950 p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10"
                >
                  <div className="absolute top-0 right-0 p-10 opacity-[0.03] transform translate-x-12 translate-y-12 rotate-45 pointer-events-none">
                     <Star size={200} />
                  </div>
                  
                  <div className="max-w-md">
                     <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600/50">
                        {formatDisplayDate(event.date)} {event.time ? `• ${event.time}` : ""}
                     </span>
                     <h3 className="mt-3 font-heading text-4xl group-hover:text-gold transition-colors">{event.title}</h3>
                     <p className="mt-4 text-sm text-stone-500 font-medium leading-relaxed">{event.description}</p>
                  </div>

                  <div className="flex items-center gap-4 text-left border-l border-emerald-950/10 pl-10 h-full">
                     <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <MapPin className="size-5" />
                     </div>
                     <div>
                        <p className="font-bold">{event.venue}</p>
                        <p className="text-xs text-stone-400 mt-1">{event.address}</p>
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

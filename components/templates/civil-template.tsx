"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, Camera } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { getGoogleCalendarUrl } from "@/lib/calendar";
import { getCoupleNames } from "@/lib/invites";
import { formatDisplayDate } from "@/lib/utils";
import { type TemplateInvite } from "@/components/templates/render-invite";

export function CivilTemplate({
  invite,
  preview = false,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  const coupleNames = getCoupleNames(invite.data);
  const primaryEvent = invite.data.events[0];
  const heroImage = invite.data.heroImage || invite.data.gallery[0];
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div ref={containerRef} className="overflow-hidden rounded-[40px] bg-white text-stone-900 shadow-2xl relative min-h-screen font-sans selection:bg-stone-900 selection:text-white">
      
      {/* Editorial Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
           {heroImage ? (
              <Image src={heroImage} alt={coupleNames} fill className="object-cover brightness-[0.85]" priority sizes="100vw" />
           ) : (
              <div className="h-full w-full bg-stone-100" />
           )}
           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-white">
           <motion.div 
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="flex flex-col items-center gap-6"
           >
              <div className="h-20 w-px bg-white/20 mb-4" />
              <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/50">The Union of</p>
              <h1 className="font-heading text-6xl sm:text-[12rem] leading-none tracking-tight">
                {coupleNames}
              </h1>
              <div className="mt-12 flex items-center gap-8 text-white/80 font-medium">
                 <p>{formatDisplayDate(invite.data.weddingDate)}</p>
                 <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                 <p>{primaryEvent?.venue}</p>
              </div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-24 h-12 w-px bg-white/40"
              />
           </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="px-6 py-40 sm:px-12 bg-stone-50 border-y border-stone-100">
         <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
               <Camera className="h-12 w-12 text-stone-200 mx-auto" strokeWidth={1} />
               <h2 className="font-heading text-5xl sm:text-7xl text-stone-900 leading-tight tracking-tighter">A Day of Simple Elegance <br/> and Deep Meaning</h2>
               <p className="text-2xl text-stone-400 leading-relaxed max-w-2xl mx-auto italic font-serif">
                  &quot;{invite.data.description}&quot;
               </p>
               
               <div className="mt-20 grid md:grid-cols-2 gap-10">
                  <div className="text-left space-y-6 p-10 rounded-[40px] bg-white shadow-xl shadow-stone-200/20 border border-stone-100">
                     <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">Where we marry</p>
                     <h3 className="font-heading text-4xl text-stone-900">{primaryEvent?.venue}</h3>
                     <p className="text-sm text-stone-500 font-medium leading-relaxed">{primaryEvent?.address}</p>
                     
                     {!preview && primaryEvent && (
                       <Link 
                         href={`https://maps.google.com/maps?q=${encodeURIComponent(primaryEvent.address)}`}
                         target="_blank"
                         className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-900 border-b border-stone-900 pb-1 pt-4 hover:gap-4 transition-all"
                       >
                         Open Direction <ArrowUpRight className="h-3 w-3" />
                       </Link>
                     )}
                  </div>

                  <div className="text-left space-y-6 p-10 rounded-[40px] bg-white shadow-xl shadow-stone-200/20 border border-stone-100">
                     <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">When we marry</p>
                     <h3 className="font-heading text-4xl text-stone-900">{formatDisplayDate(invite.data.weddingDate)}</h3>
                     <p className="text-sm text-stone-500 font-medium leading-relaxed">At {primaryEvent?.time || "noon"}. Joining us for a day of celebration.</p>
                     
                     {!preview && (
                        <div className="pt-4">
                           <Link 
                              href={getGoogleCalendarUrl(primaryEvent, coupleNames)}
                              className="inline-flex h-12 items-center rounded-2xl bg-stone-900 px-8 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-stone-800 transition-all active:scale-95"
                           >
                              Add to Calendar
                           </Link>
                        </div>
                     )}
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Program Timeline */}
      <section className="px-6 py-40 sm:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
           <div className="flex items-center gap-6 mb-24">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-300">Program Outline</span>
              <div className="h-px flex-1 bg-stone-100" />
           </div>

           <div className="grid gap-px bg-stone-100 overflow-hidden rounded-[60px] border border-stone-100">
              {invite.data.events.map((event, i) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-white p-12 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-12 group hover:bg-stone-50 transition-colors"
                >
                   <div className="flex items-start gap-12">
                      <span className="font-heading text-4xl text-stone-200">{i + 1}</span>
                      <div className="space-y-4">
                         <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                            {event.time} • {formatDisplayDate(event.date)}
                         </span>
                         <h3 className="font-heading text-5xl text-stone-900 group-hover:tracking-tight transition-all duration-700">{event.title}</h3>
                         <p className="text-stone-500 font-medium leading-relaxed max-w-sm">{event.description}</p>
                      </div>
                   </div>
                   <div className="flex flex-col items-start md:items-end gap-3 text-stone-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                      <MapPin className="size-5" />
                      <span>{event.venue}</span>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}

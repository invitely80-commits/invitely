"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarPlus, MapPin, Sparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { buttonStyles } from "@/components/ui/button";
import { getGoogleCalendarUrl } from "@/lib/calendar";
import { getCoupleNames } from "@/lib/invites";
import { formatDisplayDate } from "@/lib/utils";
import { type TemplateInvite } from "@/components/templates/render-invite";

export function HinduTemplate({
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
    <div className="overflow-hidden rounded-[40px] bg-[#FFF9F2] text-stone-800 shadow-2xl relative min-h-screen">
      {/* Mandala Background Pattern */}
      <div className="bg-mandala absolute inset-0 opacity-[0.04] scale-150 rotate-12 pointer-events-none" />
      
      <section className="relative px-6 py-16 sm:px-12 sm:py-20">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            custom={0}
            variants={variants}
            className="flex flex-col items-start gap-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm text-orange-700 font-bold tracking-wide">
              <Sparkles className="size-4" />
              Shubh Vivah
            </div>
            <h1 className="font-heading text-6xl text-orange-900 sm:text-8xl leading-tight">
              {coupleNames}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-stone-600 font-medium italic">
              &quot;{invite.data.description}&quot;
            </p>
            
            <div className="grid gap-4 w-full sm:grid-cols-2">
               <div className="p-6 rounded-3xl bg-white border border-stone-100 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">The Auspicious Day</p>
                  <p className="mt-2 font-heading text-3xl text-orange-800">{formatDisplayDate(invite.data.weddingDate)}</p>
               </div>
               {primaryEvent && (
                 <div className="p-6 rounded-3xl bg-white border border-stone-100 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">The Sacred Venue</p>
                    <p className="mt-2 font-heading text-3xl text-orange-800">{primaryEvent.venue}</p>
                 </div>
               )}
            </div>

            {!preview && primaryEvent && (
              <Link
                href={getGoogleCalendarUrl(primaryEvent, coupleNames)}
                className={buttonStyles({
                  size: "lg",
                  className: "rounded-2xl bg-orange-600 text-white hover:bg-orange-700 px-8 h-14",
                })}
                target="_blank"
                rel="noreferrer"
              >
                <CalendarPlus className="size-5" />
                Add to Calendar
              </Link>
            )}
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            custom={2}
            variants={variants}
            className="relative"
          >
            <div className="absolute -inset-4 bg-orange-100/50 rounded-[44px] blur-2xl -z-10" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] border-[12px] border-white shadow-2xl">
              {heroImage ? (
                <Image src={heroImage} alt={coupleNames} fill className="object-cover" priority sizes="600px" />
              ) : (
                <div className="flex h-full items-center justify-center bg-orange-50 text-orange-200">
                  <Sparkles className="size-20" />
                </div>
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 pb-20 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl text-orange-950 mb-12">Rituals & Celebrations</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {invite.data.events.map((event, i) => (
              <motion.div
                key={event.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={variants}
                className="p-8 rounded-[36px] bg-white border border-stone-100 shadow-sm flex flex-col gap-6 group hover:shadow-xl transition-shadow"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400">
                    {formatDisplayDate(event.date)} {event.time ? `• ${event.time}` : ""}
                  </span>
                  <h3 className="mt-3 font-heading text-3xl text-orange-900">{event.title}</h3>
                </div>
                
                <div className="flex items-start gap-4 text-stone-600">
                  <div className="mt-1 h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                     <MapPin className="size-4" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">{event.venue}</p>
                    <p className="text-sm leading-relaxed">{event.address}</p>
                  </div>
                </div>

                {event.description && (
                  <p className="text-sm leading-relaxed text-stone-500 font-medium">
                    {event.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {invite.data.gallery.length > 0 && (
        <section className="px-6 pb-20 sm:px-12 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-4xl text-orange-950 mb-12">Glimpses of Love</h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {invite.data.gallery.map((image, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-3xl border-4 border-white shadow-lg"
                >
                  <Image
                    src={image}
                    alt={`${coupleNames} gallery ${i}`}
                    width={500}
                    height={700}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

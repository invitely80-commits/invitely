"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useTransform,
  useScroll
} from "framer-motion";
import { 
  CalendarPlus, 
  MapPin, 
  Navigation, 
  Heart, 
  Calendar,
  Share2,
  ChevronRight,
  Sparkles
} from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { getGoogleCalendarUrl } from "@/lib/calendar";
import { getCoupleNames } from "@/lib/invites";
import { formatDisplayDate } from "@/lib/utils";
import { type TemplateInvite } from "@/components/templates/render-invite";

// Physics-Based Spring Constants
const hapticSpring = { type: "spring", stiffness: 500, damping: 15 } as any;
const slowSpring = { type: "spring", stiffness: 100, damping: 30 } as any;

/**
 * Luxury Card with 3D Hover Tilt
 */
const LuxuryCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

export function TemplateComponent({
  invite,
  preview = false,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const coupleNames = getCoupleNames(invite.data);
  const primaryEvent = invite.data.events[0];
  const { scrollYProgress } = useScroll();
  
  // Ambient SVG scale/rotation based on scroll
  const ambientRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="relative min-h-screen font-sans selection:bg-gold-accent/30 overflow-x-hidden">
      {/* 1. Global Grain Texture */}
      <div className="grain-overlay pointer-events-none" />

      {/* 2. Ambient Rotating Backgrounds */}
      <motion.div 
        style={{ rotate: ambientRotate }}
        className="fixed inset-0 pointer-events-none z-0 opacity-5"
      >
        <svg className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] text-charcoal fill-current animate-pulse-slow" viewBox="0 0 100 100">
           <path d="M50 0 L55 35 L90 40 L60 55 L70 90 L50 70 L30 90 L40 55 L10 40 L45 35 Z" />
        </svg>
        <svg className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] text-charcoal fill-current" viewBox="0 0 100 100">
           <path d="M50 0 L55 35 L90 40 L60 55 L70 90 L50 70 L30 90 L40 55 L10 40 L45 35 Z" opacity="0.5" />
        </svg>
      </motion.div>

      {/* 3. Virtual Envelope Reveal */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal p-6"
          >
            <motion.div 
              layoutId="envelope"
              className="relative w-full max-w-lg aspect-[4/3] bg-vellum rounded-lg shadow-2xl flex flex-col items-center justify-center text-center p-12 overflow-hidden"
              style={{ perspective: "1000px" }}
            >
               {/* Wax Seal / Button */}
               <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={hapticSpring}
                onClick={() => setIsOpen(true)}
                className="group relative z-10 flex flex-col items-center gap-4"
               >
                  <div className="w-20 h-20 rounded-full bg-burgundy flex items-center justify-center shadow-[0_0_30px_rgba(87,0,19,0.3)] transition-shadow group-hover:shadow-[0_0_40px_rgba(87,0,19,0.5)]">
                    <Heart className="text-white fill-white size-8" />
                  </div>
                  <span className="font-mono-lux tracking-[0.4em] uppercase text-xs text-charcoal/60">Tap to Unfold</span>
               </motion.button>

               {/* Envelope Flaps */}
               <motion.div 
                className="absolute top-0 inset-x-0 h-1/2 bg-silk/80 origin-top shadow-md z-0"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: 0 }}
               />
               <div className="absolute inset-0 border-[1.5rem] border-silk/20 pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Main Content (The Heirloom) */}
      <motion.main 
        initial={{ opacity: 0, y: 40 }}
        animate={isOpen ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 py-20 lg:py-32"
      >
         {/* Hero Header: Bento-Luxury Grid Start */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-8">
               <motion.div
                 initial={{ clipPath: "inset(100% 0 0 0)" }}
                 animate={isOpen ? { clipPath: "inset(0% 0 0 0)" } : {}}
                 transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               >
                 <span className="font-mono-lux tracking-[0.5em] uppercase text-xs text-charcoal/40 block mb-6 px-1">
                   {invite.data.events[0]?.title || "Wedding Invitation"}
                 </span>
                 <h1 className="font-serif-lux text-fluid-h1 tracking-tighter text-charcoal leading-[0.9] mix-exclusion">
                    {coupleNames.split(" & ").map((name, i) => (
                      <React.Fragment key={name}>
                        {i > 0 && <span className="block text-gold-accent ml-[0.5ch]">&</span>}
                        <span className="block">{name}</span>
                      </React.Fragment>
                    ))}
                 </h1>
               </motion.div>
               
               <motion.p 
                initial={{ opacity: 0 }}
                animate={isOpen ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
                className="max-w-md text-lg text-charcoal/60 leading-relaxed font-medium mix-blend-difference"
               >
                 {invite.data.description}
               </motion.p>
            </div>

            <div className="lg:col-span-5 relative">
               <LuxuryCard className="aspect-[3/4] group">
                 {invite.data.heroImage ? (
                   <Image 
                    src={invite.data.heroImage} 
                    alt={coupleNames} 
                    fill 
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                    priority
                   />
                 ) : (
                   <div className="flex h-full items-center justify-center bg-silk">
                     <Sparkles className="size-12 text-gold-accent" />
                   </div>
                 )}
               </LuxuryCard>
            </div>
         </div>

         {/* Core Details Bento Section */}
         <div className="mt-20 lg:mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* 5. Date Tile */}
            <motion.div 
              whileInView={{ y: -20, opacity: 1 }}
              initial={{ y: 0, opacity: 0 }}
              viewport={{ once: true }}
              className="lg:mt-12"
            >
              <LuxuryCard className="p-10 flex flex-col justify-between h-full bg-vellum/90">
                 <div className="space-y-4">
                    <Calendar className="size-6 text-burgundy" />
                    <h3 className="font-mono-lux uppercase tracking-widest text-[10px] text-charcoal/40">The Auspicious Date</h3>
                    <p className="font-serif-lux text-5xl text-charcoal tracking-tighter">
                      {formatDisplayDate(invite.data.weddingDate)}
                    </p>
                 </div>
                 {!preview && primaryEvent && (
                   <Link 
                    href={getGoogleCalendarUrl(primaryEvent, coupleNames)}
                    target="_blank"
                    className="mt-12 inline-flex items-center gap-3 font-mono-lux text-[10px] uppercase tracking-[0.2em] text-burgundy hover:text-charcoal transition-colors group"
                   >
                     Add to Calendar <ChevronRight className="size-3 group-hover:translate-x-1 transition-transform" />
                   </Link>
                 )}
              </LuxuryCard>
            </motion.div>

            {/* 6. Venue Detail (Overlapping) */}
            <motion.div 
              whileInView={{ y: 20, opacity: 1 }}
              initial={{ y: 80, opacity: 0 }}
              viewport={{ once: true }}
            >
              <LuxuryCard className="p-10 bg-charcoal text-silk">
                 <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <MapPin className="size-6 text-gold-accent" />
                      <Navigation className="size-5 text-silk/20" />
                    </div>
                    <h3 className="font-mono-lux uppercase tracking-widest text-[10px] text-silk/40">The Grand Venue</h3>
                    <div className="space-y-2">
                       <p className="font-serif-lux text-4xl tracking-tight leading-none">{primaryEvent?.venue}</p>
                       <p className="text-sm text-silk/60 leading-relaxed pt-2">{primaryEvent?.address}</p>
                    </div>
                    <Link 
                      href={`https://maps.google.com/maps?q=${encodeURIComponent(primaryEvent?.address || "")}`}
                      target="_blank"
                      className="inline-flex items-center gap-4 bg-silk text-charcoal px-6 py-4 rounded-full font-mono-lux text-[10px] uppercase tracking-widest w-full justify-center transition-all hover:bg-gold-accent"
                    >
                      Open in Maps
                    </Link>
                 </div>
              </LuxuryCard>
            </motion.div>

            {/* 7. Gallery Stack (Desktop Only / Mobile Carousel) */}
            <div className="hidden lg:block lg:mt-24">
              <div className="relative h-[400px] w-full">
                {invite.data.gallery.slice(0, 3).map((img, i) => (
                  <motion.div
                    key={i}
                    style={{ 
                      zIndex: 3 - i,
                      top: i * 20,
                      left: i * 20
                    }}
                    whileHover={{ scale: 1.05, zIndex: 10, rotate: i % 2 === 0 ? 2 : -2 }}
                    className="absolute inset-x-0 bottom-0 top-0 rounded-3xl overflow-hidden border-8 border-white shadow-xl"
                  >
                    <Image src={img} alt="Gallery" fill className="object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
         </div>

         {/* Full Timeline Section */}
         <section className="mt-40 space-y-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-charcoal/10 pb-12">
               <h2 className="font-serif-lux text-fluid-h2 tracking-tighter text-charcoal">Rituals Of Love</h2>
               <p className="font-mono-lux text-xs uppercase tracking-[0.3em] text-charcoal/40">Sequence of Events</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {invite.data.events.map((event, i) => (
                 <motion.div 
                   key={event.id}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   viewport={{ once: true }}
                   className="space-y-6"
                 >
                    <div className="flex items-center gap-4">
                       <span className="w-12 h-[1px] bg-gold-accent" />
                       <span className="font-mono-lux text-[10px] uppercase tracking-widest text-charcoal/60">{event.time}</span>
                    </div>
                    <div className="space-y-3">
                       <h4 className="font-serif-lux text-3xl text-charcoal tracking-tight">{event.title}</h4>
                       <p className="text-sm text-charcoal/50 leading-relaxed font-medium">{event.description}</p>
                    </div>
                    <div className="pt-4 flex items-center gap-3 text-charcoal/80">
                      <MapPin className="size-4 text-burgundy" />
                      <span className="text-sm font-semibold">{event.venue}</span>
                    </div>
                 </motion.div>
               ))}
            </div>
         </section>

         {/* Mobile-Only Gallery Carousel */}
         <section className="lg:hidden mt-32 -mx-6">
            <div className="px-6 mb-10">
               <h2 className="font-serif-lux text-fluid-h2 tracking-tighter text-charcoal">Gallery</h2>
            </div>
            <div className="flex overflow-x-auto gap-4 px-6 snap-x no-scrollbar pb-12">
               {invite.data.gallery.map((img, i) => (
                 <div key={i} className="min-w-[85vw] snap-center aspect-[3/4] relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
                    <Image src={img} alt="Gallery" fill className="object-cover" />
                 </div>
               ))}
            </div>
         </section>
      </motion.main>

      {/* 8. Floating Bottom Dock (Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: hapticSpring, delay: 1.5 }}
            className="fixed bottom-8 inset-x-6 z-50 lg:hidden"
          >
            <div className="flex bg-charcoal/90 backdrop-blur-2xl rounded-full p-2 items-center justify-between shadow-2xl border border-white/10">
               <button className="flex-1 flex flex-col items-center gap-1 py-2 text-silk hover:text-gold-accent transition-colors">
                  <Heart className="size-5" />
                  <span className="text-[8px] uppercase tracking-tighter">RSVP</span>
               </button>
               <div className="w-[1px] h-8 bg-white/10" />
               <button 
                onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(primaryEvent?.address || "")}`)}
                className="flex-1 flex flex-col items-center gap-1 py-2 text-silk hover:text-gold-accent transition-colors"
               >
                  <Navigation className="size-5" />
                  <span className="text-[8px] uppercase tracking-tighter">Navigate</span>
               </button>
               <div className="w-[1px] h-8 bg-white/10" />
               <button 
                onClick={() => window.open(getGoogleCalendarUrl(primaryEvent!, coupleNames))}
                className="flex-1 flex flex-col items-center gap-1 py-2 text-silk hover:text-gold-accent transition-colors"
               >
                  <CalendarPlus className="size-5" />
                  <span className="text-[8px] uppercase tracking-tighter">Calendar</span>
               </button>
               <div className="w-[1px] h-8 bg-white/10" />
               <button className="flex-1 flex flex-col items-center gap-1 py-2 text-silk hover:text-gold-accent transition-colors">
                  <Share2 className="size-5" />
                  <span className="text-[8px] uppercase tracking-tighter">Share</span>
               </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 0.05; transform: scale(1); } 50% { opacity: 0.08; transform: scale(1.05); } }
      `}</style>
    </div>
  );
}

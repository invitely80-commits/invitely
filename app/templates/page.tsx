"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { 
  motion, 
  AnimatePresence,
  useMotionValue
} from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";

import { SiteHeader } from "@/components/landing/site-header";
import { themeOptions, type InviteTheme } from "@/lib/invites";
import { TraditionCard } from "@/components/templates/TraditionCard";
import { CultureBackground } from "@/components/templates/CultureBackground";

// Physics-Based Spring Constants
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hapticSpring = { type: "spring", stiffness: 500, damping: 15 } as any;

/**
 * Custom Cursor Component
 */
const CustomCursor = ({ side }: { side: "left" | "right" | "center" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (side === "center") return null;

  return (
    <motion.div
      style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      className="fixed top-0 left-0 z-[100] pointer-events-none p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      {side === "left" ? <ChevronLeft className="size-6" /> : <ChevronRight className="size-6" />}
      <span className="font-mono-lux text-[8px] tracking-[0.3em] uppercase ml-2">Drag</span>
    </motion.div>
  );
};

export default function TemplatesPage() {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<InviteTheme>("hindu");
  const [cursorSide, setCursorSide] = useState<"left" | "right" | "center">("center");

  // Filter templates (excluding luxury which is our god-tier base)
  const templates = useMemo(() => themeOptions.filter(t => t.value !== "minimal"), []);

  // Custom Cursor Side Detection
  const handleMouseMove = (e: React.MouseEvent) => {
    const width = window.innerWidth;
    const x = e.clientX;
    if (x < width * 0.3) setCursorSide("left");
    else if (x > width * 0.7) setCursorSide("right");
    else setCursorSide("center");
  };

  /**
   * Handle Scroll / Snap detection
   */
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const width = carouselRef.current.clientWidth;
    const index = Math.round(scrollLeft / (width * 0.6)); // Approximate card width
    const currentTheme = templates[index]?.value;
    if (currentTheme && currentTheme !== activeTheme) {
      setActiveTheme(currentTheme);
    }
  };

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="page-shell min-h-screen relative overflow-hidden bg-ivory cursor-none selection:bg-gold-accent/30"
    >
      {/* 1. Infrastructure */}
      <div className="grain-overlay" />
      <CultureBackground activeTheme={activeTheme} />
      <AnimatePresence>
        <CustomCursor side={cursorSide} />
      </AnimatePresence>

      <SiteHeader ctaHref="/sign-up" ctaLabel="Get Started" />

      {/* 2. Hero Header with Staggered Clip-Path Reveal */}
      <section className="relative pt-48 pb-20 px-8 text-center min-h-[50vh] flex flex-col items-center justify-center z-10">
        <motion.div
           initial={{ clipPath: "inset(100% 0 0 0)" }}
           animate={{ clipPath: "inset(0% 0 0 0)" }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-6 py-2 text-[10px] font-mono-lux tracking-[0.4em] uppercase text-white/50 mb-10 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-gold-accent" />
            <span>Curated Heritage Moods</span>
          </div>
          
          <h1 className="font-serif-lux text-fluid-h1 tracking-tighter text-white leading-[0.85] mix-exclusion">
             Choose Your <br />
             <span className="italic-heading text-gold-accent font-light">Digital Heirloom</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 text-lg text-white/60 max-w-2xl mx-auto font-medium leading-relaxed px-4"
        >
          Every celebration is a legacy in the making. Select a visual tradition to translate your 
          shared history into a cinematic digital experience.
        </motion.p>
      </section>

      {/* 3. Horizontal 3D Perspective Carousel */}
      <section className="relative z-20 pb-32">
        <motion.div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-16 px-[10vw] sm:px-[25vw] overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory py-20 items-center h-[70vh]"
          style={{ perspective: "2000px" }}
        >
          {templates.map((template) => (
             <div key={template.value} className="snap-center flex-shrink-0">
               <TraditionCard 
                  theme={template.value}
                  title={template.label}
                  description={template.description}
                  isActive={activeTheme === template.value}
                  onNavigate={() => router.push(`/templates/${template.value}`)}
               />
             </div>
          ))}

          {/* Spacer for end of carousel */}
          <div className="w-[10vw] sm:w-[25vw] flex-shrink-0 h-10" />
        </motion.div>

        {/* Navigation Indicator / Scroll Aid */}
        <div className="flex justify-center items-center gap-6 mt-12">
           <LayoutGrid className="size-4 text-white/20" />
           <div className="flex gap-2">
             {templates.map((t) => (
                <motion.div 
                   key={t.value}
                   animate={{ 
                     width: activeTheme === t.value ? 40 : 8,
                     backgroundColor: activeTheme === t.value ? "var(--color-gold-accent)" : "rgba(255,255,255,0.1)"
                   }}
                   className="h-[4px] rounded-full"
                />
             ))}
           </div>
           <span className="font-mono-lux text-[8px] text-white/40 tracking-widest uppercase">Select Mood</span>
        </div>
      </section>

      {/* 4. Bespoke Heritage Section (Re-styled) */}
      <section className="px-8 pb-40 z-10 relative">
        <motion.div 
          className="max-w-7xl mx-auto bg-white/5 backdrop-blur-3xl rounded-[64px] border border-white/10 p-16 sm:p-24 text-center overflow-hidden relative group"
          whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          <div className="absolute inset-0 bg-mandala opacity-[0.03] scale-150 rotate-45 pointer-events-none group-hover:scale-125 transition-transform duration-[3s]" />
          
          <div className="relative z-10">
             <h2 className="font-serif-lux text-5xl sm:text-7xl tracking-tighter text-white mb-8">A custom legacy?</h2>
             <p className="mt-8 text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
               If your heritage requires a bespoke visual translation, our creative engineers are 
               ready to orchestrate a unique masterpiece for your union.
             </p>
             <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={hapticSpring}
                className="mt-16 h-16 rounded-full bg-silk px-12 text-[10px] font-mono-lux font-bold uppercase tracking-[0.4em] text-charcoal hover:bg-gold-accent transition-all"
             >
               Request Bespoke Orchestration
             </motion.button>
          </div>
        </motion.div>
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .italic-heading { font-style: italic; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </main>
  );
}

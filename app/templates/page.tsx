"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence,
  useSpring,
  useMotionValue
} from "framer-motion";
import { Sparkles, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";

import { SiteHeader } from "@/components/landing/site-header";
import { themeOptions, type InviteTheme } from "@/lib/invites";
import { TraditionCard } from "@/components/templates/TraditionCard";
import { CultureBackground } from "@/components/templates/CultureBackground";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hapticSpring = { type: "spring", stiffness: 500, damping: 15 } as any;

export default function TemplatesPage() {
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<InviteTheme>("hindu");
  
  // Filter templates
  const templates = useMemo(() => themeOptions.filter(t => t.value !== "minimal"), []);

  // Vertical Scroll tracking for the horizontal translation
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Map 0 -> 1 progress to the horizontal shift
  // Total cards * 400px (width) + gaps. Let's use percentage.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(templates.length - 1) * 75}%`]);
  
  // Smooth the x movement
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  // Detect active theme based on scroll progress
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const step = 1 / templates.length;
      const index = Math.min(
        Math.floor(v / step),
        templates.length - 1
      );
      const currentTheme = templates[index]?.value;
      if (currentTheme && currentTheme !== activeTheme) {
        setActiveTheme(currentTheme);
      }
    });
  }, [scrollYProgress, templates, activeTheme]);

  return (
    <main className="page-shell relative bg-ivory selection:bg-gold-accent/30 overflow-x-hidden">
      {/* 1. Infrastructure */}
      <div className="grain-overlay pointer-events-none" />
      <CultureBackground activeTheme={activeTheme} />
      <SiteHeader ctaHref="/sign-up" ctaLabel="Get Started" />

      {/* 2. Hero Section: Fixed until scroll triggers */}
      <section className="relative h-[100vh] flex flex-col items-center justify-center z-10 px-8 text-center">
        <motion.div
           initial={{ clipPath: "inset(100% 0 0 0)" }}
           animate={{ clipPath: "inset(0% 0 0 0)" }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-6 py-2 text-[9px] font-mono-lux tracking-[0.4em] uppercase text-white/40 mb-10 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-gold-accent" />
            <span>Digital Heirloom Collection</span>
          </div>
          
          <h1 className="font-serif-lux text-fluid-h1 tracking-tighter text-white leading-[0.85] mix-exclusion">
             Choose Your <br />
             <span className="italic text-gold-accent font-light">Exquisite Mood</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-10 text-lg text-white max-w-2xl mx-auto font-medium leading-relaxed mix-blend-difference"
        >
          Every ritual is a verse. Every union is a legacy. Scroll to navigate through our 
          curated heritage moods and translate your story into digital stationery.
        </motion.p>

        <div className="absolute bottom-20">
          <ScrollIndicator />
        </div>
      </section>

      {/* 3. Cinematic Horizontal Scroll Container */}
      {/* Total length = number of templates * 100vh height to scroll through */}
      <section ref={targetRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div 
            style={{ x: springX }}
            className="flex gap-20 px-[25vw]"
          >
            {templates.map((template, i) => (
               <div key={template.value} className="flex-shrink-0">
                 <TraditionCard 
                    theme={template.value}
                    title={template.label}
                    description={template.description}
                    isActive={activeTheme === template.value}
                    onNavigate={() => router.push(`/templates/${template.value}`)}
                 />
               </div>
            ))}
          </motion.div>

          {/* Persistent Page Indicator (e.g., II / VII) */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-8 z-30">
             <div className="font-mono-lux text-[10px] tracking-[0.5em] text-white/30 uppercase">
                {String(templates.findIndex(t => t.value === activeTheme) + 1).padStart(2, "0")}
                <span className="mx-4 text-white/10">|</span>
                {String(templates.length).padStart(2, "0")}
             </div>
             <div className="flex gap-2">
                 {templates.map((t) => (
                    <motion.div 
                      key={t.value}
                      animate={{ 
                        width: activeTheme === t.value ? 24 : 6,
                        opacity: activeTheme === t.value ? 1 : 0.2
                      }}
                      className="h-[2px] bg-gold-accent rounded-full"
                    />
                 ))}
             </div>
          </div>
        </div>
      </section>

      {/* 4. Bespoke Heritage Section */}
      <section className="px-8 py-40 z-10 relative bg-charcoal">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-[64px] border border-white/5 p-16 sm:p-24 text-center overflow-hidden relative group bg-white/[0.02] backdrop-blur-3xl"
        >
          <div className="absolute inset-0 bg-mandala opacity-[0.02] scale-125 rotate-12 pointer-events-none" />
          
          <div className="relative z-10">
             <h2 className="font-serif-lux text-5xl sm:text-7xl tracking-tighter text-silk mb-8">Bespoke Translation</h2>
             <p className="mt-8 text-xl text-silk/30 max-w-2xl mx-auto leading-relaxed">
               If your heritage requires a custom visual architecture, our engineers are 
               ready to orchestrate a digital masterpiece specifically for your lineage.
             </p>
             <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={hapticSpring}
                className="mt-16 h-16 rounded-full bg-silk px-12 text-[9px] font-mono-lux font-bold uppercase tracking-[0.4em] text-charcoal hover:bg-gold-accent transition-all shadow-2xl"
             >
               Request Bespoke Orchestration
             </motion.button>
          </div>
        </motion.div>
      </section>

      <style jsx global>{`
        .italic-heading { font-style: italic; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
      `}</style>
    </main>
  );
}

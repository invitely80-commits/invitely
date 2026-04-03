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
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import { SiteHeader } from "@/components/landing/site-header";
import { themeOptions, type InviteTheme } from "@/lib/invites";
import { TraditionCard } from "@/components/templates/TraditionCard";
import { CultureBackground } from "@/components/templates/CultureBackground";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hapticSpring = { type: "spring", stiffness: 400, damping: 25 } as any;

/**
 * 3D Cover Flow Card Container
 */
const CoverFlowCard = ({ children, i, scrollXProgress }: { children: React.ReactNode, i: number, scrollXProgress: any }) => {
  const step = 1 / 6; // Normalized step for 7 templates (approx)
  const range = [ (i - 1) * step, i * step, (i + 1) * step ];
  
  const rotateY = useTransform(scrollXProgress, range, [45, 0, -45]);
  const scale = useTransform(scrollXProgress, range, [0.8, 1.05, 0.8]);
  const z = useTransform(scrollXProgress, range, [-200, 100, -200]);
  const opacity = useTransform(scrollXProgress, range, [0.4, 1, 0.4]);

  return (
    <motion.div
      style={{ rotateY, scale, z, opacity, transformStyle: "preserve-3d" }}
      className="flex-shrink-0"
    >
      {children}
    </motion.div>
  );
};

export default function TemplatesPage() {
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<InviteTheme>("hindu");
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => { setIsLoaded(true); }, []);

  const templates = useMemo(() => themeOptions.filter(t => t.value !== "minimal"), []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(templates.length - 1) * 80}%`]);
  const springX = useSpring(x, { stiffness: 80, damping: 25 });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const step = 1 / templates.length;
      const index = Math.min(Math.floor(v / step), templates.length - 1);
      const currentTheme = templates[index]?.value;
      if (currentTheme && currentTheme !== activeTheme) {
        setActiveTheme(currentTheme);
      }
    });
  }, [scrollYProgress, templates, activeTheme]);

  return (
    <main className="page-shell relative bg-ivory selection:bg-gold-accent/30 overflow-x-hidden transition-colors duration-1000">
      
      {/* 1. Global Vellum Grain & Atmosphere */}
      <CultureBackground activeTheme={activeTheme} />
      <div className="fixed inset-0 pointer-events-none opacity-[0.2] mix-blend-overlay z-50 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <SiteHeader ctaHref="/sign-up" ctaLabel="Get Started" />

      {/* 2. Unfolding Invitation Reveal Header */}
      <section className="relative h-[100vh] flex flex-col items-center justify-center z-10 px-8 text-center bg-transparent">
        <motion.div
           initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
           animate={isLoaded ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
           transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
           className="relative p-12 bg-white/5 backdrop-blur-xl rounded-[64px] border border-white/10"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-charcoal/5 border border-charcoal/10 px-6 py-2 text-[9px] font-mono-lux tracking-[0.5em] uppercase text-charcoal/50 mb-12">
            <Sparkles className="h-4 w-4 text-gold-accent" />
            <span>High Heritage Collection</span>
          </div>
          
          <h1 className="font-serif-lux text-fluid-h1 tracking-tighter text-charcoal leading-[0.82] mix-blend-multiply">
             Choose Your <br />
             <span className="italic text-gold-accent font-light italic-heading">Digital Heirloom</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="mt-12 text-lg text-charcoal/60 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Every union is a cinematic legacy. Scroll to unfold through our 
            3D heritage collection and select a canvas that honors your ritual.
          </motion.p>
        </motion.div>

        <div className="absolute bottom-16">
          <ScrollIndicator />
        </div>
      </section>

      {/* 3. 3D Cover Flow Scroll Section */}
      <section ref={targetRef} className="relative h-[600vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div 
            style={{ x: springX }}
            className="flex gap-[15vw] px-[30vw]"
          >
            {templates.map((template, i) => (
               <CoverFlowCard key={template.value} i={i} scrollXProgress={scrollYProgress}>
                 <TraditionCard 
                    theme={template.value}
                    title={template.label}
                    description={template.description}
                    isActive={activeTheme === template.value}
                    onNavigate={() => router.push(`/templates/${template.value}`)}
                 />
               </CoverFlowCard>
            ))}
          </motion.div>

          {/* Luxury Serial Tracker */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-30">
             <div className="flex gap-4">
                 {templates.map((t) => (
                    <motion.div 
                      key={t.value}
                      animate={{ 
                        scale: activeTheme === t.value ? 1.5 : 1,
                        opacity: activeTheme === t.value ? 1 : 0.2
                      }}
                      className="w-1.5 h-1.5 bg-gold-accent rounded-full"
                    />
                 ))}
             </div>
             <div className="font-mono-lux text-[9px] tracking-[0.6em] text-charcoal/30 flex items-center gap-4">
                <span>INDEX</span>
                <span className="text-charcoal/50 font-bold">{String(templates.findIndex(t => t.value === activeTheme) + 1).padStart(2, "0")}</span>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Bespoke Heritage Closure */}
      <section className="px-8 py-52 z-10 relative bg-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-[80px] border border-white/5 p-20 sm:p-32 text-center overflow-hidden relative group bg-white/[0.01] backdrop-blur-3xl"
        >
          <div className="absolute inset-0 bg-mandala opacity-[0.01] scale-150 rotate-45" />
          
          <div className="relative z-10 space-y-12">
             <h2 className="font-serif-lux text-6xl sm:text-8xl tracking-tighter text-silk">Bespoke Lineage</h2>
             <p className="mt-8 text-xl text-silk/20 max-w-3xl mx-auto leading-relaxed">
               Our creative engineers can orchestrate a unique architecture for unions that demand 
               a one-of-a-kind digital translation.
             </p>
             <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={hapticSpring}
                className="mt-12 h-18 bg-silk text-charcoal rounded-full px-16 text-[10px] font-mono-lux font-bold uppercase tracking-[0.5em] hover:bg-gold-accent transition-all shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
             >
               Request Bespoke Collection
             </motion.button>
          </div>
        </motion.div>
      </section>

      <style jsx global>{`
        .italic-heading { font-style: italic; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 18s linear infinite; }
      `}</style>
    </main>
  );
}

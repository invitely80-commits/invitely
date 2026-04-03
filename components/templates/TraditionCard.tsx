import React from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "framer-motion";
import { Sparkles, Heart, Crown, CircleDashed } from "lucide-react";
import { type InviteTheme } from "@/lib/invites";

/**
 * Haptic Spring Physics (stiffness: 400, damping: 25)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hapticSpring = { type: "spring", stiffness: 400, damping: 25 } as any;

const TraditionVisual = ({ theme }: { theme: InviteTheme }) => {
  const sampleNames = {
    hindu: "Aria & Julian",
    muslim: "Zayn & Myra",
    christian: "Ethan & Clara",
    minimal: "L & K",
    royal: "Siddharth & Meera",
    lux: "The Legacy",
    default: "Our Union"
  };

  const name = sampleNames[theme as keyof typeof sampleNames] || sampleNames.default;

  switch (theme) {
    case "hindu":
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#570013] to-[#800020] overflow-hidden flex flex-col items-center justify-center p-12">
          <div className="absolute inset-0 bg-mandala opacity-[0.1] scale-150 rotate-12" />
          <div className="relative z-10 text-center space-y-6">
            <div className="w-20 h-20 border border-gold-accent/30 rounded-full mx-auto flex items-center justify-center backdrop-blur-xl">
               <Sparkles className="text-gold-accent shrink-0 size-8" strokeWidth={1} />
            </div>
            <h4 className="font-serif-lux text-5xl text-gold-accent tracking-tighter mix-blend-overlay uppercase leading-none">
              {name}
            </h4>
            <div className="h-[1px] w-32 bg-gold-accent/20 mx-auto" />
            <p className="font-mono-lux text-[9px] tracking-[0.5em] text-gold-accent/40 uppercase">Auspicious Vows</p>
          </div>
        </div>
      );
    case "muslim":
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b] to-[#065f46] overflow-hidden flex flex-col items-center justify-center p-12">
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]" />
          <div className="relative z-10 text-center space-y-8">
            <Crown className="text-gold-accent/40 shrink-0 size-16 mx-auto" strokeWidth={1} />
            <h4 className="font-serif-lux text-6xl text-gold-accent tracking-tighter leading-tight mix-blend-color-dodge">
               {name.split(" & ").map((n, i) => (
                 <span key={n} className="block">{n}{i === 0 && <span className="text-gold-accent/20 mx-2 tracking-normal">&</span>}</span>
               ))}
            </h4>
          </div>
          <div className="absolute top-0 right-0 p-10 opacity-20">
             <div className="w-32 h-32 border border-silk rounded-full" />
          </div>
        </div>
      );
    case "christian":
      return (
        <div className="absolute inset-0 bg-[#fefefe] overflow-hidden flex flex-col items-center justify-center p-12">
          <div className="absolute inset-0 opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          <div className="relative z-10 text-center space-y-6">
            <Heart className="text-stone-300 shrink-0 size-10 mx-auto" strokeWidth={1} />
            <h4 className="font-serif-lux text-5xl text-charcoal tracking-tighter mix-blend-difference">
              {name}
            </h4>
            <div className="flex items-center gap-6 justify-center">
               <span className="h-[1px] w-16 bg-stone-100" />
               <span className="font-mono-lux text-[10px] tracking-[0.4em] text-stone-400 uppercase">Eternal Bond</span>
               <span className="h-[1px] w-16 bg-stone-100" />
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 bg-charcoal overflow-hidden flex flex-col items-center justify-center p-12">
           <div className="relative z-10 text-center space-y-10">
             <div className="w-24 h-24 border border-gold-accent/20 rounded-full flex items-center justify-center p-4">
               <CircleDashed className="size-full text-gold-accent/30 animate-spin-slow" strokeWidth={0.5} />
             </div>
             <h4 className="font-serif-lux text-4xl text-silk/30 tracking-widest leading-none uppercase">{name}</h4>
           </div>
        </div>
      );
  }
};

export const TraditionCard = ({ 
  theme, 
  title, 
  description, 
  isActive, 
  onNavigate 
}: { 
  theme: InviteTheme; 
  title: string; 
  description: string; 
  isActive: boolean;
  onNavigate: () => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const borderGradient = theme === "hindu" || theme === "muslim" || theme === "royal"
    ? "linear-gradient(to bottom right, oklch(75% 0.15 70), oklch(40% 0.1 75))" // Gold
    : "linear-gradient(to bottom right, oklch(90% 0.01 70), oklch(60% 0.01 75))"; // Silver

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-[320px] sm:w-[440px] aspect-[4/5] rounded-[56px] overflow-hidden flex-shrink-0 cursor-none group transition-shadow duration-700"
    >
      {/* Glassmorphism 2.0 Base */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/[0.03] transition-colors group-hover:bg-white/[0.06] z-10" />

      {/* 1px Luxury Border Gradient */}
      <div className="absolute inset-0 p-[1.5px] rounded-[56px] z-20 pointer-events-none"
           style={{ background: borderGradient, maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "xor" }} />

      <div className="absolute inset-0 z-0">
        <TraditionVisual theme={theme} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-10 opacity-60" />

      {/* Floating Stationery Details */}
      <div style={{ transform: "translateZ(100px)" }} className="relative z-30 h-full p-12 flex flex-col justify-end text-silk">
         <motion.div 
          animate={isActive ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={hapticSpring}
          className="space-y-6"
         >
           <div className="space-y-2">
             <span className="font-mono-lux tracking-[0.6em] text-[10px] uppercase text-gold-accent/80 block">Heritage Vol. I</span>
             <h3 className="font-serif-lux text-5xl tracking-tighter leading-[0.8]">{title}</h3>
           </div>
           
           <p className="text-sm text-silk/50 font-medium leading-relaxed max-w-[85%]">{description}</p>
           
           <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             transition={hapticSpring}
             onClick={onNavigate}
             className="mt-8 h-14 bg-silk text-charcoal rounded-full font-mono-lux text-[10px] tracking-[0.4em] uppercase hover:bg-gold-accent transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center"
           >
             Preview Mood
           </motion.button>
         </motion.div>
      </div>
    </motion.div>
  );
};

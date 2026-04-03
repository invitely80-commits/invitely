import React from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "framer-motion";
import { Sparkles, Heart, Crown, CircleDashed } from "lucide-react";
import { type InviteTheme } from "@/lib/invites";

const hapticSpring = { type: "spring", stiffness: 500, damping: 15 };

/**
 * High-end CSS Card Visuals for each tradition
 */
const TraditionVisual = ({ theme }: { theme: InviteTheme }) => {
  switch (theme) {
    case "hindu":
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#570013] to-[#800020] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-mandala opacity-10 scale-150 rotate-12" />
          <div className="relative z-10 text-gold-accent/40 scale-[2.5]">
            <Sparkles strokeWidth={1} />
          </div>
          <div className="absolute bottom-10 left-10 text-gold-accent font-serif-lux text-4xl tracking-tighter mix-blend-overlay">ॐ</div>
        </div>
      );
    case "muslim":
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b] to-[#065f46] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
          <div className="relative z-10 text-gold-accent/30 scale-[2.5]">
             <Crown strokeWidth={1} />
          </div>
          <div className="absolute top-10 right-10 border border-gold-accent/20 rounded-full p-4">
             <div className="w-8 h-8 rounded-full border-t border-gold-accent/50" />
          </div>
        </div>
      );
    case "christian":
      return (
        <div className="absolute inset-0 bg-[#fdfdfd] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          <div className="relative z-10 text-stone-200 scale-[2.5]">
             <Heart strokeWidth={1} />
          </div>
          <div className="absolute inset-10 border border-stone-100 flex items-center justify-center">
             <div className="w-[80%] h-[1px] bg-stone-100 rotate-45" />
          </div>
        </div>
      );
    case "royal":
      return (
        <div className="absolute inset-0 bg-burgundy overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 bg-mandala opacity-5 scale-[2]" />
           <div className="relative z-10 text-gold-accent/40 scale-[3]">
             <Crown strokeWidth={1} />
           </div>
        </div>
      );
    case "minimal":
      return (
        <div className="absolute inset-0 bg-ivory overflow-hidden flex items-center justify-center">
           <div className="w-32 h-32 rounded-full border border-stone-200/50 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-stone-200/30" />
           </div>
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono-lux text-[8px] tracking-[5px] text-stone-300">MODERNIST</div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 bg-charcoal overflow-hidden flex items-center justify-center">
           <div className="relative z-10 text-silk/20 scale-[2]">
             <CircleDashed strokeWidth={1} className="animate-spin-slow" />
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
      animate={{ 
        scale: isActive ? 1.05 : 0.95,
        filter: isActive ? "grayscale(0%)" : "grayscale(50%)",
        opacity: isActive ? 1 : 0.6
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-[320px] sm:w-[420px] aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl bg-white/10 flex-shrink-0 cursor-none group"
    >
      <div className="absolute inset-0 z-0">
        <TraditionVisual theme={theme} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent z-10" />

      <div style={{ transform: "translateZ(80px)" }} className="relative z-20 h-full p-12 flex flex-col justify-end text-silk">
         <motion.div 
          animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          className="space-y-4"
         >
           <span className="font-mono-lux tracking-[0.5em] text-[10px] uppercase text-gold-accent/80 block">Tradition</span>
           <h3 className="font-serif-lux text-5xl tracking-tighter leading-none">{title}</h3>
           <p className="text-sm text-silk/60 font-medium leading-relaxed max-w-[80%]">{description}</p>
           
           <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             transition={hapticSpring}
             onClick={onNavigate}
             className="mt-8 px-8 py-4 bg-silk text-charcoal rounded-full font-mono-lux text-[10px] tracking-widest uppercase hover:bg-gold-accent transition-colors"
           >
             Explore Style
           </motion.button>
         </motion.div>
      </div>

      {/* Gloss Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none group-hover:from-white/10 transition-colors" />
    </motion.div>
  );
};

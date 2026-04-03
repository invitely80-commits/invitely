import React from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "framer-motion";
import { Sparkles, Heart, Crown, CircleDashed } from "lucide-react";
import { type InviteTheme } from "@/lib/invites";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hapticSpring = { type: "spring", stiffness: 500, damping: 15 } as any;

/**
 * High-end CSS Card Visuals: Stationery Enrichment
 */
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
          <div className="absolute inset-0 bg-mandala opacity-[0.08] scale-150 rotate-12" />
          <div className="relative z-10 text-center space-y-6">
            <div className="w-16 h-16 border border-gold-accent/30 rounded-full mx-auto flex items-center justify-center">
               <Sparkles className="text-gold-accent shrink-0 size-6" strokeWidth={1} />
            </div>
            <h4 className="font-serif-lux text-4xl text-gold-accent tracking-tighter mix-blend-overlay uppercase">
              {name}
            </h4>
            <div className="h-[1px] w-24 bg-gold-accent/20 mx-auto" />
            <p className="font-mono-lux text-[8px] tracking-[0.4em] text-gold-accent/40 uppercase">Auspicious Celebration</p>
          </div>
          <div className="absolute bottom-10 left-10 text-gold-accent/10 font-serif-lux text-8xl tracking-tighter pointer-events-none">ॐ</div>
        </div>
      );
    case "muslim":
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b] to-[#065f46] overflow-hidden flex flex-col items-center justify-center p-12">
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:32px_32px]" />
          <div className="relative z-10 text-center space-y-8">
            <Crown className="text-gold-accent/30 shrink-0 size-12 mx-auto" strokeWidth={1} />
            <h4 className="font-serif-lux text-5xl text-gold-accent tracking-tighter leading-tight">
               {name.split(" & ").map((n, i) => (
                 <span key={n} className="block">{n}{i === 0 && <span className="text-gold-accent/20 mx-2">&</span>}</span>
               ))}
            </h4>
            <p className="font-mono-lux text-[10px] tracking-[0.6em] text-gold-accent/40 uppercase">Nikkah Ceremony</p>
          </div>
          <div className="absolute top-0 right-0 p-8">
             <div className="w-24 h-24 border border-gold-accent/10 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 border-t border-r border-gold-accent/20 rounded-tr-full" />
             </div>
          </div>
        </div>
      );
    case "christian":
      return (
        <div className="absolute inset-0 bg-[#fdfdfd] overflow-hidden flex flex-col items-center justify-center p-12">
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          <div className="relative z-10 text-center space-y-6">
            <Heart className="text-stone-300 shrink-0 size-8 mx-auto" strokeWidth={1} />
            <h4 className="font-serif-lux text-4xl text-charcoal tracking-tighter mix-blend-difference">
              {name}
            </h4>
            <div className="flex items-center gap-4 justify-center">
               <span className="h-[0.5px] w-12 bg-stone-200" />
               <span className="font-mono-lux text-[9px] tracking-[0.3em] text-stone-400 uppercase">The Union</span>
               <span className="h-[0.5px] w-12 bg-stone-200" />
            </div>
          </div>
          <div className="absolute inset-8 border border-stone-100 flex items-center justify-center pointer-events-none">
             <div className="w-[85%] h-[0.5px] bg-stone-100/50 rotate-45" />
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 bg-charcoal overflow-hidden flex items-center justify-center p-12">
           <div className="relative z-10 text-center space-y-4">
             <CircleDashed className="size-12 text-gold-accent/20 animate-spin-slow mx-auto" strokeWidth={1} />
             <h4 className="font-serif-lux text-3xl text-silk/40 tracking-tighter">{name}</h4>
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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
        scale: isActive ? 1.02 : 0.9,
        filter: isActive ? "grayscale(0%)" : "grayscale(30%) brightness(0.7)",
        opacity: isActive ? 1 : 0.4
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-[300px] sm:w-[400px] aspect-[4/5] rounded-[48px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] bg-white/10 flex-shrink-0 cursor-none group"
    >
      <div className="absolute inset-0 z-0">
        <TraditionVisual theme={theme} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent z-10" />

      <div style={{ transform: "translateZ(60px)" }} className="relative z-20 h-full p-10 flex flex-col justify-end text-silk">
         <motion.div 
          animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
         >
           <span className="font-mono-lux tracking-[0.5em] text-[9px] uppercase text-gold-accent/80 block">Curated Collection</span>
           <h3 className="font-serif-lux text-4xl tracking-tighter leading-none">{title}</h3>
           <p className="text-xs text-silk/50 font-medium leading-relaxed max-w-[90%]">{description}</p>
           
           <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             transition={hapticSpring}
             onClick={onNavigate}
             className="mt-6 px-8 py-3.5 bg-silk text-charcoal rounded-full font-mono-lux text-[9px] tracking-widest uppercase hover:bg-gold-accent transition-all shadow-xl"
           >
             Explore Template
           </motion.button>
         </motion.div>
      </div>

      {/* Material Gloss Ripple */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/10 pointer-events-none" />
    </motion.div>
  );
};

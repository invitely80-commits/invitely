import React from "react";
import { motion } from "framer-motion";

export const ScrollIndicator = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="w-[24px] h-[40px] rounded-full border-2 border-white/20 flex justify-center p-1.5"
      >
        <motion.div 
          animate={{ 
            y: [0, 12, 0],
            opacity: [1, 0, 1]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-1 h-1 rounded-full bg-gold-accent"
        />
      </motion.div>
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="font-mono-lux text-[8px] tracking-[0.4em] uppercase text-white"
      >
        Scroll to Experience
      </motion.span>
    </div>
  );
};

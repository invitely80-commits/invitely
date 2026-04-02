"use client";

import { motion, useScroll, useTransform, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  scale?: number;
}

export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  direction = "up", 
  distance = 20, 
  scale = 1,
  ...props 
}: FadeInProps) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale,
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const Parallax = ({ children, offset = 50, ...props }: { 
  children: React.ReactNode; 
  offset?: number;
} & HTMLMotionProps<"div">) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }} {...props}>
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ children, delay = 0, ...props }: { children: React.ReactNode; delay?: number } & HTMLMotionProps<"div">) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    {...props}
  >
    {children}
  </motion.div>
);

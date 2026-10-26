"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

export const EASE = [0.2, 0, 0, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  duration?: number;
}

export function Reveal({ children, delay = 0, className, y = 28, duration = 0.7 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { EASE } from "./Reveal";

/** 1.5rem accent hairline that scales in from the left when it enters the viewport. */
export function ScaleLine({ delay = 0, className }: { delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className={cn("block h-px w-6 origin-left bg-pf-accent/30", className)}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : undefined}
      transition={{ duration: 0.7, ease: EASE, delay }}
    />
  );
}

"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

const MAX_X = 10;
const MAX_Y = 6;

export function HeroBackdrop() {
  const reduceMotion = usePrefersReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 55, damping: 22 });
  const y = useSpring(pointerY, { stiffness: 55, damping: 22 });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      pointerX.set(-nx * MAX_X);
      pointerY.set(-ny * MAX_Y);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, pointerX, pointerY]);

  return (
    <motion.div aria-hidden="true" className="absolute -inset-6" style={{ x, y }}>
      <motion.div
        className="absolute inset-0"
        animate={reduceMotion ? undefined : { scale: [1, 1.016, 1], y: [0, -5, 0] }}
        transition={{ duration: 13, ease: "easeInOut", repeat: Infinity }}
      >
        <Image
          src="/images/hero/grid.svg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="pf-noise absolute inset-0 opacity-[0.045] mix-blend-overlay" />
      </motion.div>
    </motion.div>
  );
}

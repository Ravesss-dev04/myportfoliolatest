"use client";

import { useRef, type ReactNode } from "react";
import { DESKTOP_QUERY, useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";
import { SCROLL_TOLERANCE, useScrollCapture, type ScrollDirection } from "@/lib/hooks/useScrollCapture";

interface SkillsStageProps {
  list: ReactNode;
  visual: ReactNode;
}

export function SkillsStage({ list, visual }: SkillsStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const reduceMotion = usePrefersReducedMotion();

  useScrollCapture({
    stageRef,
    scrollerRef,
    enabled: isDesktop && !reduceMotion,
    canConsume: (direction: ScrollDirection) => {
      const el = scrollerRef.current;
      if (!el) return false;
      return direction === 1
        ? el.scrollTop + el.clientHeight < el.scrollHeight - SCROLL_TOLERANCE
        : el.scrollTop > SCROLL_TOLERANCE;
    },
    consume: (deltaY) => {
      const el = scrollerRef.current;
      if (el) el.scrollTop += deltaY;
    },
  });

  return (
    <div
      ref={stageRef}
      className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:h-screen lg:grid-cols-2 lg:gap-16"
    >
      <div
        ref={scrollerRef}
        role="region"
        aria-label="Skills list"
        tabIndex={0}
        className="no-scrollbar rounded-sm lg:h-screen lg:overflow-y-auto lg:pb-[28vh] lg:pt-28 lg:[mask-image:linear-gradient(to_bottom,transparent_0,black_9%,black_86%,transparent_100%)]"
      >
        {list}
      </div>
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:pt-16">{visual}</div>
    </div>
  );
}

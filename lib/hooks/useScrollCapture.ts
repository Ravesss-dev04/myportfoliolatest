"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";

export type ScrollDirection = 1 | -1;

/** Pixel tolerance for "aligned to the viewport top" and for scroller boundaries. */
export const SCROLL_TOLERANCE = 1.5;

interface ScrollCaptureOptions {
  /** The 100vh stage that gets pinned while it consumes scroll input. */
  stageRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  /** Whether the stage still has something to do in this direction. Returning false releases to the page. */
  canConsume: (direction: ScrollDirection) => boolean;
  consume: (deltaY: number, direction: ScrollDirection) => void;
  /** Optional inner scroller; native scrolling inside it is redirected to the page until the stage is aligned. */
  scrollerRef?: RefObject<HTMLElement | null>;
}

function normalizeWheelDelta(event: WheelEvent): number {
  if (event.deltaMode === 1) return event.deltaY * 16;
  if (event.deltaMode === 2) return event.deltaY * window.innerHeight;
  return event.deltaY;
}

/**
 * Pins a full-viewport stage while it consumes wheel/touch input, then always
 * releases to the page at its first/last boundary.
 */
export function useScrollCapture({ stageRef, enabled, canConsume, consume, scrollerRef }: ScrollCaptureOptions) {
  const handleDelta = useEffectEvent((deltaY: number, target: EventTarget | null, preventDefault: () => void) => {
    const stage = stageRef.current;
    if (!stage || deltaY === 0) return;

    const direction: ScrollDirection = deltaY > 0 ? 1 : -1;
    if (!canConsume(direction)) return;

    const top = stage.getBoundingClientRect().top;

    if (Math.abs(top) <= SCROLL_TOLERANCE) {
      preventDefault();
      consume(deltaY, direction);
      return;
    }

    const crossesAlignment =
      (direction === 1 && top > 0 && top - deltaY <= 0) || (direction === -1 && top < 0 && top - deltaY >= 0);

    if (crossesAlignment) {
      preventDefault();
      window.scrollBy({ top, behavior: "instant" });
      return;
    }

    const scroller = scrollerRef?.current;
    if (scroller && target instanceof Node && scroller.contains(target)) {
      preventDefault();
      window.scrollBy({ top: deltaY, behavior: "instant" });
    }
  });

  useEffect(() => {
    const stage = stageRef.current;
    if (!enabled || !stage) return;

    let lastTouchY: number | null = null;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      handleDelta(normalizeWheelDelta(event), event.target, () => event.preventDefault());
    };

    const onTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY;
      if (y === undefined || lastTouchY === null) return;
      const deltaY = lastTouchY - y;
      lastTouchY = y;
      handleDelta(deltaY, event.target, () => event.preventDefault());
    };

    const onTouchEnd = () => {
      lastTouchY = null;
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
    };
  }, [enabled, stageRef]);
}

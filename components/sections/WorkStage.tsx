"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { EditorialAnchor, EditorialLink } from "@/components/ui/Button";
import { EASE } from "@/components/ui/Reveal";
import { SpecPill } from "@/components/ui/SpecPill";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { DESKTOP_QUERY, useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";
import { useScrollCapture, type ScrollDirection } from "@/lib/hooks/useScrollCapture";

const STEP_THROTTLE_MS = 420;
const OPACITY_BY_DISTANCE = [1, 0.55, 0.28, 0.08];

function tileStyle(offset: number): CSSProperties {
  const distance = Math.abs(offset);
  return {
    transform: `translateY(${offset * 52}px) translateZ(${offset * -38}px) rotateX(${offset * 3.5}deg) scale(${1 - distance * 0.055})`,
    opacity: OPACITY_BY_DISTANCE[Math.min(distance, OPACITY_BY_DISTANCE.length - 1)],
    filter: distance === 0 ? "none" : "blur(1.5px) brightness(0.5)",
    zIndex: 50 - distance,
    transition:
      "transform 0.42s cubic-bezier(0.4,0,0.2,1), opacity 0.42s cubic-bezier(0.4,0,0.2,1), filter 0.42s cubic-bezier(0.4,0,0.2,1)",
  };
}

function projectNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function secondaryLink(project: Project) {
  if (project.links.live) return { href: project.links.live, label: "Live site" };
  if (project.links.repo) return { href: project.links.repo, label: "Repository" };
  return null;
}

interface WorkStageProps {
  projects: Project[];
  header: ReactNode;
  mobileList: ReactNode;
}

export function WorkStage({ projects, header, mobileList }: WorkStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const lastStepAt = useRef(0);
  const [active, setActive] = useState(0);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const reduceMotion = usePrefersReducedMotion();
  const last = projects.length - 1;

  useScrollCapture({
    stageRef,
    enabled: isDesktop && !reduceMotion,
    canConsume: (direction: ScrollDirection) => {
      // Swallow trailing inertia from the step that just happened so the page doesn't fling past the stage.
      if (performance.now() - lastStepAt.current < STEP_THROTTLE_MS) return true;
      return direction === 1 ? active < last : active > 0;
    },
    consume: (_deltaY, direction) => {
      const now = performance.now();
      if (now - lastStepAt.current < STEP_THROTTLE_MS) return;
      const next = Math.min(last, Math.max(0, active + direction));
      if (next === active) return;
      lastStepAt.current = now;
      setActive(next);
    },
  });

  const project = projects[active];
  const secondary = secondaryLink(project);

  return (
    <div ref={stageRef} className="relative pt-24 sm:pt-32 lg:flex lg:h-screen lg:flex-col lg:pb-10 lg:pt-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{header}</div>

      <div className="mx-auto mt-12 w-full max-w-7xl px-5 sm:px-8 lg:hidden">{mobileList}</div>

      <div className="relative mx-auto hidden min-h-0 w-full max-w-7xl flex-1 grid-cols-2 gap-16 px-8 pt-8 lg:grid">
        <div aria-hidden="true" className="relative flex items-center justify-center [perspective:1200px]">
          {projects.map((item, index) => {
            const offset = index - active;
            return (
              <button
                key={item.slug}
                type="button"
                tabIndex={-1}
                onClick={() => setActive(index)}
                className={cn(
                  "absolute aspect-[16/10] w-[88%] max-w-[36rem] overflow-hidden rounded-2xl border border-white/[0.08] bg-pf-surface-elevated shadow-modal will-change-transform",
                  offset === 0 ? "cursor-default" : "cursor-pointer",
                )}
                style={tileStyle(offset)}
              >
                <Image src={item.cover.src} alt="" fill sizes="40vw" className="object-cover" />
                <span className="absolute inset-0 bg-linear-to-t from-pf-surface/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-5 font-mono text-[10px] font-bold tracking-[0.22em] text-pf-accent/60">
                  {projectNumber(index)}
                </span>
              </button>
            );
          })}
        </div>

        <div aria-hidden="true" className="flex flex-col justify-center">
          <div className="flex items-center gap-1">
            {projects.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                tabIndex={-1}
                onClick={() => setActive(index)}
                className="py-3 pr-1"
              >
                <span
                  className="relative block h-[3px] overflow-hidden rounded-full bg-white/15 transition-[width] duration-500 ease-pf"
                  style={{ width: index === active ? "2rem" : "0.75rem" }}
                >
                  {index === active ? (
                    <motion.span
                      layoutId="work-pip-fill"
                      className="absolute inset-0 rounded-full bg-pf-accent/80"
                      transition={{ duration: 0.42, ease: EASE }}
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>

          <div className="relative mt-6 min-h-[22rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.38, ease: EASE }}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-pf-accent/55">
                  Project {projectNumber(active)} · {project.tag}
                </p>
                <h3 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-white xl:text-[2.75rem]">
                  {project.title}
                </h3>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55">{project.description}</p>
                <SpecPill label="Stack" className="mt-6 max-w-md">
                  {project.stack.join(" · ")}
                </SpecPill>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <EditorialLink href={`/work/${project.slug}`} tabIndex={-1}>
                    Case study
                    <ArrowRight size={15} strokeWidth={1.6} />
                  </EditorialLink>
                  {secondary ? (
                    <EditorialAnchor
                      href={secondary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={-1}
                    >
                      {secondary.label}
                      <ArrowUpRight size={14} strokeWidth={1.6} />
                    </EditorialAnchor>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">
            {projectNumber(active)} / {projectNumber(last)}
            <span className="mx-3 text-white/15">—</span>
            {reduceMotion ? "Select a project above" : "Scroll to explore"}
          </p>
        </div>

        {/* Semantic list for assistive tech; becomes a visible panel when a keyboard user tabs into it. */}
        <div className="pf-card absolute bottom-6 right-8 z-20 w-80 p-4 [&:not(:focus-within)]:sr-only">
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-pf-accent/60">
            Featured projects
          </h3>
          <ul className="mt-3 space-y-3">
            {projects.map((item, index) => {
              const itemSecondary = secondaryLink(item);
              return (
                <li key={item.slug}>
                  <p className="text-sm font-semibold text-white/85">{item.title}</p>
                  <p className="sr-only">
                    {item.summary} Stack: {item.stack.join(", ")}.
                  </p>
                  <div className="mt-1 flex gap-4">
                    <Link href={`/work/${item.slug}`} className="pf-link text-xs" onFocus={() => setActive(index)}>
                      Case study<span className="sr-only">: {item.title}</span>
                    </Link>
                    {itemSecondary ? (
                      <a
                        href={itemSecondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pf-link text-xs"
                        onFocus={() => setActive(index)}
                      >
                        {itemSecondary.label}
                        <span className="sr-only">: {item.title} (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

export interface TerminalLine {
  kind: "command" | "output" | "status";
  text: string;
}

interface StackTerminalProps {
  title: string;
  lines: TerminalLine[];
}

const CHAR_DELAY = 32;
const OUTPUT_DELAY = 110;
const COMMAND_PAUSE = 380;

export function StackTerminal({ title, lines }: StackTerminalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduceMotion = usePrefersReducedMotion();
  const [cursor, setCursor] = useState({ line: 0, char: 0 });

  const done = reduceMotion || cursor.line >= lines.length;

  useEffect(() => {
    if (!inView || done) return;
    const current = lines[cursor.line];
    let delay: number;
    let next: { line: number; char: number };

    if (current.kind === "command" && cursor.char < current.text.length) {
      delay = cursor.char === 0 ? COMMAND_PAUSE : CHAR_DELAY;
      next = { line: cursor.line, char: cursor.char + 1 };
    } else {
      delay = current.kind === "command" ? COMMAND_PAUSE / 2 : OUTPUT_DELAY;
      next = { line: cursor.line + 1, char: 0 };
    }

    const timer = window.setTimeout(() => setCursor(next), delay);
    return () => window.clearTimeout(timer);
  }, [inView, done, cursor, lines]);

  const visibleLines = done ? lines : lines.slice(0, cursor.line + 1);

  return (
    <div ref={ref} className="relative w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(100,70,220,0.14)_0%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-pf-shell/90 shadow-panel"
      >
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-3.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.12em] text-white/40">{title}</span>
        </div>

        <div className="min-h-[22rem] px-5 py-5 font-mono text-[11.5px] leading-6 sm:text-[12px]">
          {visibleLines.map((line, index) => {
            const isCurrent = !done && index === cursor.line;
            const text = isCurrent && line.kind === "command" ? line.text.slice(0, cursor.char) : line.text;

            if (line.kind === "command") {
              return (
                <p key={index} className={index > 0 ? "mt-3 text-white/85" : "text-white/85"}>
                  <span className="mr-2 text-pf-accent/60">$</span>
                  {text}
                  {isCurrent ? <Caret /> : null}
                </p>
              );
            }

            if (line.kind === "status") {
              return (
                <p key={index} className="flex items-center gap-2 text-pf-accent-bright/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-pf-accent/60 animate-pf-pulse" />
                  {text}
                </p>
              );
            }

            return (
              <p key={index} className="whitespace-pre-wrap text-white/50">
                {text}
              </p>
            );
          })}
          {done ? (
            <p className="mt-3 text-white/85">
              <span className="mr-2 text-pf-accent/60">$</span>
              <Caret />
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Caret() {
  return <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[2px] bg-pf-accent/70 animate-pf-caret" />;
}

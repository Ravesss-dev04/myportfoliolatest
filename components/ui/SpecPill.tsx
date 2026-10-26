import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { PulseDot } from "./PulseDot";

interface SpecPillProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

export function SpecPill({ label, children, className }: SpecPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-start gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5",
        className,
      )}
    >
      <PulseDot className="mt-[5px]" />
      <p className="font-mono text-[11px] leading-relaxed tracking-[0.04em] text-white/55">
        {label ? <span className="mr-1.5 uppercase tracking-[0.18em] text-pf-accent/60">{label}:</span> : null}
        {children}
      </p>
    </div>
  );
}

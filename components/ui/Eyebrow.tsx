import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[10.5px] font-semibold uppercase tracking-[0.2em] text-pf-accent/50", className)}>
      {children}
    </p>
  );
}

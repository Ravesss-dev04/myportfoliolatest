import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ id, eyebrow, title, description, align = "left", className }: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "mx-auto text-center", "max-w-2xl", className)}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          id={id}
          className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-4xl"
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <p className={cn("mt-5 max-w-xl text-sm leading-relaxed text-white/55", centered && "mx-auto")}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

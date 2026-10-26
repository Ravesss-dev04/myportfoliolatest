import { cn } from "@/lib/cn";

interface PulseDotProps {
  className?: string;
  delay?: string;
}

export function PulseDot({ className, delay }: PulseDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-pf-accent/60 animate-pf-pulse", className)}
      style={delay ? { animationDelay: delay } : undefined}
    />
  );
}

import { cn } from "@/lib/cn";

interface MonogramProps {
  initials: string;
  className?: string;
}

export function Monogram({ initials, className }: MonogramProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/20 bg-white/[0.03] font-display text-[15px] font-semibold tracking-[-0.02em] text-white",
        className,
      )}
    >
      {initials}
    </span>
  );
}

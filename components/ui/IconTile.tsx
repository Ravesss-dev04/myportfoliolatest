import type { IconName } from "@/content/types";
import { cn } from "@/lib/cn";
import { iconMap } from "./icons";

interface IconTileProps {
  icon: IconName;
  size?: number;
  tileSize?: "default" | "large";
  className?: string;
}

/** Hover brightening is driven by a parent `group` so the whole row/card reacts. */
export function IconTile({ icon, size = 18, tileSize = "default", className }: IconTileProps) {
  const Icon = iconMap[icon];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center border border-white/10 bg-white/[0.04] text-pf-accent",
        tileSize === "large" ? "h-14 w-14 rounded-2xl" : "h-10 w-10 rounded-xl",
        "transition-colors duration-180 ease-pf group-hover:border-white/20 group-hover:text-white",
        className,
      )}
    >
      <Icon size={size} strokeWidth={1.6} />
    </span>
  );
}

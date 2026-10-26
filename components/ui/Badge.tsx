import type { ReactNode } from "react";
import type { ProjectStatus } from "@/content/types";
import { cn } from "@/lib/cn";

export type BadgeVariant = "neutral" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClass: Record<BadgeVariant, string> = {
  neutral: "",
  success: "pf-badge--success",
  warning: "pf-badge--warning",
  danger: "pf-badge--danger",
  info: "pf-badge--info",
};

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return <span className={cn("pf-badge", variantClass[variant], className)}>{children}</span>;
}

const statusMeta: Record<ProjectStatus, { label: string; variant: BadgeVariant }> = {
  live: { label: "Live", variant: "success" },
  "in-progress": { label: "In progress", variant: "warning" },
  archived: { label: "Archived", variant: "danger" },
  "open-source": { label: "Open source", variant: "info" },
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const meta = statusMeta[status];
  return (
    <Badge variant={meta.variant} className={className}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {meta.label}
    </Badge>
  );
}

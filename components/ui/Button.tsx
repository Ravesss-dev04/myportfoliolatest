import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClass: Record<ButtonVariant, string> = {
  primary: "pf-button-primary",
  secondary: "pf-button-secondary",
  ghost: "pf-button-ghost",
};

type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant };

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(variantClass[variant], className)} {...props} />;
}

const editorialClass =
  "group/editorial relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-sm border border-white/28 px-7 py-2.5 text-sm font-semibold tracking-wide text-white transition-[border-color,transform] duration-180 ease-pf hover:border-white/55 active:scale-[0.98]";

function EditorialInner({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-full bg-white/[0.07] transition-transform duration-300 ease-pf group-hover/editorial:translate-y-0"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );
}

type EditorialLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  children: ReactNode;
};

/** Signature editorial CTA rendered as a Next.js link (internal routes and hash links). */
export function EditorialLink({ className, children, ...props }: EditorialLinkProps) {
  return (
    <Link className={cn(editorialClass, className)} {...props}>
      <EditorialInner>{children}</EditorialInner>
    </Link>
  );
}

type EditorialAnchorProps = ComponentProps<"a"> & { children: ReactNode };

/** Signature editorial CTA as a plain anchor (mailto:, downloads, external URLs). */
export function EditorialAnchor({ className, children, ...props }: EditorialAnchorProps) {
  return (
    <a className={cn(editorialClass, className)} {...props}>
      <EditorialInner>{children}</EditorialInner>
    </a>
  );
}

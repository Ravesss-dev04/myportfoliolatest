"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { EditorialAnchor } from "@/components/ui/Button";
import { EASE } from "@/components/ui/Reveal";
import { navItems, type SectionId } from "@/content/navigation";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

interface MobileNavProps {
  open: boolean;
  active: SectionId | null;
  onNavigate: () => void;
}

export function MobileNav({ open, active, onNavigate }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-nav"
          key="mobile-nav"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="absolute inset-x-0 top-16 border-b border-white/[0.08] bg-pf-surface/95 backdrop-blur-md lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 pb-8 pt-4 sm:px-8">
            <ul className="divide-y divide-white/[0.06]">
              {navItems.map((item, index) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    onClick={onNavigate}
                    aria-current={active === item.id ? "location" : undefined}
                    className={cn(
                      "flex min-h-14 items-center justify-between text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-180",
                      active === item.id ? "text-white" : "text-white/60 hover:text-white",
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-[10px] tracking-[0.22em] text-pf-accent/45">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </span>
                    <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" className="text-white/30" />
                  </Link>
                </li>
              ))}
            </ul>
            <EditorialAnchor
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
              className="mt-6 w-full"
            >
              Download resume
            </EditorialAnchor>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

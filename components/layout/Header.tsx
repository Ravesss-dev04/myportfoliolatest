"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { EditorialAnchor } from "@/components/ui/Button";
import { EASE } from "@/components/ui/Reveal";
import { navItems, type SectionId } from "@/content/navigation";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { MobileNav } from "./MobileNav";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function useScrolled(threshold = 8) {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const elements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = navItems.find((item) => visible.has(item.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/[0.08]">
      {/* Blur lives on its own layer so the mobile drawer's backdrop-filter isn't nested inside another one. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 backdrop-blur-[2px] transition-colors duration-300 ease-pf",
          scrolled || open ? "bg-pf-surface/75" : "bg-transparent",
        )}
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Link
            href="/"
            className="group flex min-h-11 items-center gap-3 rounded-sm"
            aria-label={`${profile.name} — home`}
            onClick={() => setOpen(false)}
          >
            {profile.portrait ? (
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                width={36}
                height={36}
                sizes="36px"
                loading="eager"
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
            ) : null}
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="whitespace-nowrap font-display text-[13px] font-semibold text-white/90 transition-colors duration-180 group-hover:text-white">
                {profile.name}
              </span>
              <span className="whitespace-nowrap font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-white/45">
                {profile.role}
              </span>
            </span>
          </Link>
        </motion.div>

        <motion.nav
          aria-label="Primary"
          className="hidden items-center lg:flex"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          <ul className="flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative flex h-11 items-center text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-180 ease-pf hover:text-white",
                      "after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-center after:bg-white/60 after:transition-transform after:duration-300 after:ease-pf hover:after:scale-x-100",
                      isActive ? "text-white after:scale-x-100" : "text-white/60 after:scale-x-0",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span aria-hidden="true" className="mx-7 h-5 w-px bg-white/15" />
          <EditorialAnchor
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-[12px]"
          >
            Resume
          </EditorialAnchor>
        </motion.nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/10 text-white/80 transition-colors duration-180 hover:border-white/25 hover:text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.6} />}
        </button>
      </div>

      <MobileNav open={open} active={active} onNavigate={() => setOpen(false)} />
    </header>
  );
}

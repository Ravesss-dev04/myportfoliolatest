import { ArrowRight } from "lucide-react";
import { EditorialLink } from "@/components/ui/Button";
import { PulseDot } from "@/components/ui/PulseDot";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";
import { HeroBackdrop } from "./HeroBackdrop";

function HeroCtas() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <EditorialLink href="#work">
        View my work
        <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
      </EditorialLink>
      <EditorialLink href="#contact" className="border-white/15">
        Get in touch
      </EditorialLink>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-pf-surface"
    >
      <HeroBackdrop />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-pf-surface/58" />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-pf-surface to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-pf-surface via-pf-surface/70 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-pf-surface/75 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-pf-surface/75 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_78%_34%,rgba(100,70,220,0.2)_0%,transparent_78%),radial-gradient(ellipse_45%_38%_at_16%_72%,rgba(49,86,181,0.12)_0%,transparent_80%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pb-36 pt-32 text-center sm:px-8 lg:pb-40">
        <Reveal delay={0.1}>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-pf-accent/70">
            <PulseDot />
            Available for work
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <h1
            id="hero-title"
            className="mx-auto mt-7 max-w-4xl text-balance font-display text-[2.6rem] font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-5xl md:text-[3.75rem] lg:text-[4.5rem]"
          >
            {profile.positioning}
          </h1>
        </Reveal>

        <Reveal delay={0.38}>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            {profile.heroSubcopy}
          </p>
        </Reveal>

        <Reveal delay={0.46} className="mt-10 lg:hidden">
          <HeroCtas />
        </Reveal>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden lg:block">
        <div className="mx-auto flex max-w-7xl items-end justify-between px-8 pb-14">
          <Reveal delay={0.5}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-pf-accent/40">
              {profile.location} · {profile.timezone}
            </p>
          </Reveal>
          <Reveal delay={0.55} className="pointer-events-auto max-w-sm text-right">
            <p className="mb-4 text-sm leading-relaxed text-white/45">{profile.heroTagline}</p>
            <div className="flex justify-end">
              <HeroCtas />
            </div>
          </Reveal>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full lg:bottom-12"
      >
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/20">
          <span className="mt-2 h-1.5 w-1 rounded-full bg-pf-accent/70 animate-pf-scroll" />
        </span>
      </a>
    </section>
  );
}

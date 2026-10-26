import Image from "next/image";
import { GitHubRepoCount } from "@/components/ui/GitHubRepoCount";
import { PulseDot } from "@/components/ui/PulseDot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/content/profile";

function PortraitFrame() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-pf-surface-elevated">
      {profile.portrait ? (
        <Image
          src={profile.portrait.src}
          alt={profile.portrait.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover grayscale-[35%]"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(139,112,242,0.16)_0%,transparent_75%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[9rem] font-semibold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(179,161,255,0.35)] sm:text-[11rem]">
              {profile.initials}
            </span>
          </div>
        </div>
      )}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-pf-surface via-pf-surface/60 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-pf-surface/70 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/5 bg-linear-to-r from-pf-surface/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/5 bg-linear-to-l from-pf-surface/70 to-transparent" />
      </div>

      <p className="absolute bottom-5 left-5 flex items-center gap-2.5 text-[10px] uppercase tracking-[0.18em] text-white/45">
        <PulseDot />
        {profile.name} · {profile.city}
      </p>
    </div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-0 bg-pf-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader id="about-title" eyebrow="About" title={profile.aboutHeadline} />

          <div className="mt-8 max-w-xl space-y-5">
            {profile.bio.map((paragraph, index) => (
              <Reveal key={index} delay={0.18 + index * 0.06}>
                <p className="text-sm leading-relaxed text-white/55 sm:text-[15px]">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06]">
            {profile.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={0.24 + index * 0.07} className="flex flex-col-reverse bg-pf-surface p-5 sm:p-6">
                <dt className="mt-2 text-[11px] leading-snug text-white/45">{stat.label}</dt>
                {stat.source === "github-public-repos" ? (
                  <GitHubRepoCount />
                ) : (
                  <dd className="font-mono text-2xl font-medium tracking-[-0.02em] text-white sm:text-[1.75rem]">
                    {stat.value}
                  </dd>
                )}
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={0.12} className="lg:col-span-5 lg:pt-6">
          <div className="mx-auto max-w-md lg:max-w-none">
            <PortraitFrame />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

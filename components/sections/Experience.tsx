import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ScaleLine } from "@/components/ui/ScaleLine";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/content/experience";
import { cn } from "@/lib/cn";

const cascadeOffsets = ["lg:pt-[32%]", "lg:pt-[14%]", "lg:pt-[22%]", "lg:pt-[6%]"];

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative isolate overflow-hidden bg-pf-surface py-24 sm:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image src="/images/backgrounds/topography.svg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-pf-surface/78" />
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-pf-surface to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-pf-surface to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          id="experience-title"
          eyebrow="Experience"
          title="Building Real-World Systems."
          description="My professional experience, technical contributions, and academic background in building modern web applications and digital solutions."
        />

        <ol className="mt-16 grid lg:mt-10 lg:grid-cols-3">
          {experience.map((entry, index) => (
            <li
              key={`${entry.org}-${entry.start}`}
              className={cn(
                "border-b border-white/[0.07] py-8 lg:border-b-0 lg:border-r lg:py-0 lg:pr-8 lg:last:border-r-0",
                index > 0 && "lg:pl-8",
                cascadeOffsets[index % cascadeOffsets.length],
              )}
            >
              <div className="lg:border-t lg:border-white/[0.10] lg:pt-6 lg:pb-4">
                <Reveal delay={index * 0.08}>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-pf-accent/55">
                    <time>{entry.start}</time> — <time>{entry.end}</time>
                  </p>
                </Reveal>
                <ScaleLine delay={0.1 + index * 0.08} className="mt-4" />
                <Reveal delay={0.06 + index * 0.08}>
                  <h3 className="mt-4 text-[15px] font-semibold leading-snug text-white/90">
                    {entry.role}
                    <span className="block font-normal text-white/50">@ {entry.org}</span>
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {entry.achievements.map((achievement) => (
                      <li key={achievement} className="text-sm leading-relaxed text-white/50">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

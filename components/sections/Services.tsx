import { IconTile } from "@/components/ui/IconTile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/content/services";

export function Services() {
  return (
    <section id="how-i-work" aria-labelledby="services-title" className="relative bg-pf-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          id="services-title"
          eyebrow="ENGINEERING APPROACH"
          title="From idea to production, with purpose."
          description="I approach development with a focus on thoughtful architecture, reliable functionality, and user experiences that feel as good as they work."
        />

        <ol className="mt-12 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <li key={service.title}>
              <Reveal delay={index * 0.08} className="h-full">
                <article className="group h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-pf-accent/[0.06] via-pf-surface-elevated/75 to-pf-surface-elevated/45 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-[transform,border-color,background-color,box-shadow] duration-200 ease-pf hover:-translate-y-0.5 hover:border-pf-accent/30 hover:shadow-[0_12px_34px_rgba(89,70,166,0.12)] sm:p-7">
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs tracking-[0.16em] text-pf-accent-bright/65">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <IconTile
                      icon={service.icon}
                      size={26}
                      tileSize="large"
                      className="border-pf-accent/20 bg-pf-accent/10 text-pf-accent-bright shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] group-hover:border-pf-accent/35"
                    />
                  </div>
                  <h3 className="mt-6 text-[17px] font-semibold text-white/90">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-pf-text-muted">{service.body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

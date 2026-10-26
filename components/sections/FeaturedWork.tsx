import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { EditorialAnchor, EditorialLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecPill } from "@/components/ui/SpecPill";
import { featuredProjects } from "@/content/projects";
import type { Project } from "@/content/types";
import { WorkStage } from "./WorkStage";
function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
      <EditorialLink
        href={`/work/${project.slug}`}
      >
        Case study
        <span className="sr-only">: {project.title}</span>
        <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
      </EditorialLink>
      {project.links.live ? (
        <EditorialAnchor
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
        >
          Live site<span className="sr-only"> for {project.title} (opens in a new tab)</span>
          <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
        </EditorialAnchor>
      ) : null}
      {project.links.repo ? (
        <EditorialAnchor
          href={project.links.repo}
          target="_blank"
          rel="noopener noreferrer"
        >
          Repository<span className="sr-only"> for {project.title} (opens in a new tab)</span>
          <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
        </EditorialAnchor>
      ) : null}
    </div>
  );
}

function MobileProjectList() {
  return (
    <ul className="space-y-5">
      {featuredProjects.map((project, index) => (
        <li key={project.slug}>
          <Reveal delay={index * 0.07}>
            <article className="relative isolate overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7">
              <div aria-hidden="true" className="absolute inset-0 -z-10">
                <Image src={project.cover.src} alt="" fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-pf-surface/80" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_0%,rgba(100,70,220,0.14)_0%,transparent_70%)]" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-pf-surface to-transparent" />
              </div>

              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-pf-accent/55">
                Project {String(index + 1).padStart(2, "0")} · {project.tag}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-white">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{project.summary}</p>
              <SpecPill label="Stack" className="mt-5">
                {project.stack.join(" · ")}
              </SpecPill>
              <ProjectLinks project={project} />
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-pf-surface">
      <WorkStage
        projects={featuredProjects}
        header={
          <SectionHeader
            id="work-title"
            eyebrow="Featured work"
            title="Selected case studies"
            description="Production systems where security, hardware and product design had to meet in the middle."
          />
        }
        mobileList={<MobileProjectList />}
      />
    </section>
  );
}

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { StatusBadge } from "@/components/ui/Badge";
import { EditorialAnchor } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SpecPill } from "@/components/ui/SpecPill";
import { getNextProject, getProject, projects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title: `${project.title} — Case study`,
      description: project.summary,
    },
  };
}

function DetailSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-white/[0.06] py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              id={id}
              className="mt-4 font-display text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-4xl"
            >
              {title}
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);

  return (
    <article>
      <header className="relative isolate flex min-h-[78vh] flex-col justify-end overflow-hidden pb-16 pt-32 sm:pb-20">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image src={project.cover.src} alt="" fill preload sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-pf-surface/70" />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-pf-surface to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-pf-surface via-pf-surface/80 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-pf-surface/75 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_40%,rgba(100,70,220,0.16)_0%,transparent_80%)]" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Reveal delay={0.05}>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-pf-accent/50">
                <li>
                  <Link href="/" className="inline-flex min-h-11 items-center transition-colors duration-180 hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#work" className="inline-flex min-h-11 items-center transition-colors duration-180 hover:text-white">
                    Work
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/60">
                  {project.title}
                </li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-pf-accent/55">
                {project.tag} · {project.year}
              </p>
              <StatusBadge status={project.status} />
            </div>
            <h1 className="mt-5 max-w-4xl text-balance font-display text-[2.6rem] font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-5xl md:text-[3.75rem]">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">{project.summary}</p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-wrap gap-3">
              <SpecPill label="Role">{project.role}</SpecPill>
              <SpecPill label="Timeline">{project.timeline}</SpecPill>
              <SpecPill label="Stack">{project.stack.join(" · ")}</SpecPill>
            </div>
          </Reveal>

          {project.links.live || project.links.repo ? (
            <Reveal delay={0.34}>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.live ? (
                  <EditorialAnchor href={project.links.live} target="_blank" rel="noopener noreferrer">
                    Visit live site
                    <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </EditorialAnchor>
                ) : null}
                {project.links.repo ? (
                  <EditorialAnchor
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-white/15"
                  >
                    View repository
                    <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </EditorialAnchor>
                ) : null}
              </div>
            </Reveal>
          ) : null}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <DetailSection id="overview-title" eyebrow="Overview" title="The short version">
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-[15px] leading-relaxed text-white/60">{project.overview}</p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/45">
              <span className="font-semibold text-white/70">Outcome — </span>
              {project.outcome}
            </p>
          </Reveal>
        </DetailSection>

        <DetailSection id="problem-title" eyebrow="Problem" title="What needed solving">
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-[15px] leading-relaxed text-white/60">{project.problem}</p>
          </Reveal>
        </DetailSection>

        <DetailSection id="approach-title" eyebrow="Approach" title="How I tackled it">
          <ul className="max-w-2xl space-y-4">
            {project.approach.map((step, index) => (
              <li key={step}>
                <Reveal delay={0.06 + index * 0.07} className="flex gap-4">
                  <span aria-hidden="true" className="mt-[9px] h-px w-6 shrink-0 bg-pf-accent/30" />
                  <p className="text-sm leading-relaxed text-white/60">{step}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </DetailSection>

        {project.architecture ? (
          <DetailSection id="architecture-title" eyebrow="Architecture" title="How it fits together">
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-sm leading-relaxed text-white/60">{project.architecture.summary}</p>
            </Reveal>
            {project.architecture.diagram ? (
              <Reveal delay={0.16}>
                <figure className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-pf-surface-elevated">
                  <Image
                    src={project.architecture.diagram.src}
                    alt={project.architecture.diagram.alt}
                    width={project.architecture.diagram.width ?? 1600}
                    height={project.architecture.diagram.height ?? 1000}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="h-auto w-full"
                  />
                </figure>
              </Reveal>
            ) : null}
          </DetailSection>
        ) : null}

        <DetailSection id="features-title" eyebrow="Key features" title="What it does">
          <ol className="border-t border-white/[0.06]">
            {project.features.map((feature, index) => (
              <li key={feature.title} className="group relative border-b border-white/[0.06]">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-5 left-0 w-px origin-top scale-y-0 bg-pf-accent/60 transition-transform duration-300 ease-pf group-hover:scale-y-100"
                />
                <Reveal delay={index * 0.06} y={20} className="flex gap-5 py-6 pl-4 sm:pl-5">
                  <span className="w-6 shrink-0 pt-0.5 font-mono text-[10px] font-bold tracking-[0.22em] text-pf-accent/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="w-px shrink-0 self-stretch bg-white/[0.08]" />
                  <div>
                    <h3 className="text-[15px] font-semibold text-white/85 transition-colors duration-180 group-hover:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/45 transition-colors duration-180 group-hover:text-white/60">
                      {feature.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </DetailSection>

        <DetailSection id="results-title" eyebrow="Results" title="What changed">
          <dl className="grid gap-4 sm:grid-cols-2">
            {project.results.map((result, index) => (
              <Reveal key={result.label} delay={index * 0.07} className="pf-card flex flex-col-reverse p-6">
                <dt className="mt-2 text-sm leading-snug text-white/50">{result.label}</dt>
                <dd className="font-mono text-3xl font-medium tracking-[-0.02em] text-white">{result.value}</dd>
              </Reveal>
            ))}
          </dl>
        </DetailSection>

        {project.gallery.length > 0 ? (
          <DetailSection id="gallery-title" eyebrow="Gallery" title="A closer look">
            <ul className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image, index) => (
                <li key={`${image.src}-${index}`}>
                  <Reveal delay={index * 0.07}>
                    <figure className="overflow-hidden rounded-2xl border border-white/[0.08] bg-pf-surface-elevated">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width ?? 1600}
                        height={image.height ?? 1000}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                        className="h-auto w-full"
                      />
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          </DetailSection>
        ) : null}

        <nav aria-label="Project navigation" className="border-t border-white/[0.06] py-16 sm:py-20">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <Link
              href="/#work"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/55 transition-colors duration-180 hover:text-white"
            >
              <ArrowLeft size={15} strokeWidth={1.6} aria-hidden="true" />
              All work
            </Link>
            <Link href={`/work/${next.slug}`} className="group block text-left sm:text-right">
              <Eyebrow>Next project</Eyebrow>
              <span className="mt-3 inline-flex items-center gap-3 font-display text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
                {next.title}
                <ArrowRight
                  size={22}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="text-pf-accent/60 transition-transform duration-180 ease-pf group-hover:translate-x-1"
                />
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </article>
  );
}

import { profile } from "@/content/profile";
import { getProject, projects } from "@/content/projects";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  return renderOgImage({
    eyebrow: project ? `Case study · ${project.tag}` : profile.name,
    title: project ? project.title : profile.positioning,
    footer: project ? `${project.summary.slice(0, 90)}${project.summary.length > 90 ? "…" : ""}` : profile.roleLong,
  });
}

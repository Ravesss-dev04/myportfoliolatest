import type { SkillGroup } from "./types";

// TODO: adjust groups, descriptions and tools to match your real stack
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "monitor",
    description: "Building interfaces with Next.js, React.js, TypeScript and Tailwind CSS.",
    items: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Figma", "Framer Motion"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    description: "Building Node.js applications with routing and REST APIs.",
    items: ["Node.js", "Routing", "REST API"],
  },
  {
    id: "database",
    title: "Database",
    icon: "database",
    description: "Managing data with Prisma, PostgreSQL and MySQL.",
    items: ["Prisma", "PostgreSQL", "MySQL"],
  },
  {
    id: "tools",
    title: "Tools",
    icon: "wrench",
    description: "Using Git for version control and Figma for interface design.",
    items: ["Git", "Figma"],
  },
];

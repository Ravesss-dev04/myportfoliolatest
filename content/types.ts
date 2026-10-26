export type IconName =
  | "activity"
  | "award"
  | "cloud"
  | "code"
  | "database"
  | "fingerprint"
  | "gauge"
  | "layers"
  | "lock"
  | "monitor"
  | "nfc"
  | "palette"
  | "rocket"
  | "server"
  | "shield"
  | "terminal"
  | "workflow"
  | "wrench";

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  initials: string;
  role: string;
  roleLong: string;
  location: string;
  city: string;
  timezone: string;
  availability: string;
  positioning: string;
  heroSubcopy: string;
  heroTagline: string;
  aboutHeadline: string;
  bio: string[];
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  siteUrl: string;
  portrait: ImageAsset | null;
  stats: Stat[];
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  items: string[];
}

export type ProjectStatus = "live" | "in-progress" | "archived" | "open-source";

export interface ProjectFeature {
  title: string;
  body: string;
}

export interface ProjectLinks {
  live?: string;
  repo?: string;
}

export interface Project {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  description: string;
  status: ProjectStatus;
  featured: boolean;
  year: string;
  role: string;
  timeline: string;
  stack: string[];
  overview: string;
  problem: string;
  approach: string[];
  architecture?: {
    summary: string;
    diagram?: ImageAsset;
  };
  features: ProjectFeature[];
  results: Stat[];
  outcome: string;
  links: ProjectLinks;
  cover: ImageAsset;
  gallery: ImageAsset[];
}

export interface ExperienceEntry {
  role: string;
  org: string;
  start: string;
  end: string;
  kind: "work" | "education";
  achievements: string[];
}

export interface Service {
  title: string;
  icon: IconName;
  body: string;
}

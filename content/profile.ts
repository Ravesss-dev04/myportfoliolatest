import type { Profile } from "./types";

export const profile: Profile = {
  name: "Raven Prevendido",
  initials: "RP",
  // TODO: confirm your title / role
  role: "Full Stack Web Developer",
  roleLong: "Full Stack Web Developer · Security-minded Systems Engineer",
  // TODO: confirm location, time zone and availability
  location: "Manila, PH",
  city: "Manila",
  timezone: "UTC+8 (PHT)",
  availability: "Open to remote roles",
  positioning:
    "I Build Web Systems That Connect Users, Data, and Real-World Business Operations.",
  // TODO: tune hero copy to your voice
  heroSubcopy:
    "I build web systems that do more than look good — they connect users, data, and real-world processes into software people can actually rely on.",
  heroTagline: "Currently taking on remote product and platform work for 2026.",
  aboutHeadline: "Engineering that holds up when it meets the real world.",
  // TODO: replace with your own 2–3 sentence bio
  bio: [
    "I'm a Web Developer who enjoys turning ideas into working systems. I build web applications that connect users, data, and real-world processes — from the interface people interact with to the backend that keeps everything running",
    "I work across frontend, backend, databases, APIs, authentication, and system integrations. I care about building things that are practical, reliable, and easy to use, while keeping the code clean enough for the next developer to understand and maintain.",
  ],
  // TODO: replace with your real contact details and links
  email: "hello@alexreyes.dev",
  github: "https://github.com/Ravesss-dev04",
  linkedin: "https://www.linkedin.com/in/alexreyes",
  // TODO: replace public/resume.pdf with your real resume
  resumeUrl: "/resume.pdf",
  // TODO: set to your production domain (used for metadata, sitemap and JSON-LD)
  siteUrl: "https://alexreyes.dev",
  portrait: {
    src: "/images/profile.jpg",
    alt: "Portrait of Raven Prevendido",
    width: 480,
    height: 357,
  },
  // TODO: update with real numbers
  stats: [
    { value: "5+", label: "Connect with me " },
    { value: "—", label: "My Total Project Repository", source: "github-public-repos" },
    { value: "1 year", label: "years of experience as web developer" },
  ],
};

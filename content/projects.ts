import type { Project } from "./types";

const placeholderGallery = (title: string) => [
  // TODO: replace placeholder gallery images with real screenshots
  { src: "/images/placeholders/dashboard.svg", alt: `${title} — dashboard overview`, width: 1600, height: 1000 },
  { src: "/images/placeholders/mobile.svg", alt: `${title} — mobile flow`, width: 1600, height: 1000 },
];

export const projects: Project[] = [
  {
    slug: "rok-provenance",
    title: "ROK Provenance",
    tag: "NFC Product Authentication",
    summary:
      "An NFC product-authentication platform for luxury goods that combines cryptographic verification, fraud detection, and blockchain-anchored audit logs to help establish product authenticity and traceable provenance.",
    description:
      "An NFC product-authentication platform for luxury goods that combines cryptographic verification, fraud detection, and blockchain-anchored audit logs to help establish product authenticity and traceable provenance.",
    status: "live",
    featured: true,
    year: "2025",
    // TODO: confirm your role and timeline
    role: "Lead full-stack engineer",
    timeline: "9 months · 2025",
    stack: ["Next.js", "TypeScript", "Prisma", "MySQL"],
    overview:
      "RÖK Provenance pairs tamper-evident NFC tags with a web platform that verifies authenticity on every tap. Brands enrol products, vault operators manage custody, and buyers get an instant, cryptographically-backed answer to a simple question: is this real?",
    problem:
      "Counterfeit high-value goods were passing as genuine because authenticity relied on paper certificates and static QR codes that are trivially cloned. Brand owners had no visibility into where verifications happened, no way to detect cloned tags in the wild, and no audit trail they could hand to insurers or regulators.",
    approach: [
      "Modelled provenance as an append-only event log in MariaDB via Prisma, so every enrolment, transfer and verification is reconstructable and attributable.",
      "Replaced passwords with WebAuthn / FIDO2 passkeys for all staff roles, with step-up re-authentication for destructive actions and exports.",
      "Streamed reader telemetry over MQTT into a scoring pipeline that flags cloned tags, impossible-travel patterns and abnormal verification bursts.",
      "Designed separate, role-scoped dashboards for super-admins, business owners and vault users so each sees only the controls they need.",
    ],
    architecture: {
      summary:
        "Next.js App Router serves both the public verification flow and the authenticated dashboards. Server Actions and Route Handlers sit behind an RBAC layer; Prisma talks to MariaDB; an MQTT bridge ingests reader heartbeats; Stripe handles subscription billing; audit exports are signed server-side and verifiable offline.",
      // TODO: replace with a real architecture diagram
      diagram: {
        src: "/images/placeholders/architecture.svg",
        alt: "Architecture diagram showing NFC readers, MQTT bridge, Next.js app, MariaDB and Stripe",
        width: 1600,
        height: 1000,
      },
    },
    features: [
      {
        title: "Tap-to-verify authenticity",
        body: "Each NFC tap is validated server-side against the tag's enrolment record and rolling counter, returning a verdict in under a second.",
      },
      {
        title: "Passkey-only staff access",
        body: "WebAuthn / FIDO2 sign-in for every privileged role, with step-up checks before exports, transfers or permission changes.",
      },
      {
        title: "Fraud & anomaly detection",
        body: "Impossible-travel checks, clone detection and velocity rules score every verification and surface incidents for review.",
      },
      {
        title: "Live reader telemetry",
        body: "MQTT heartbeats from in-store readers feed a fleet view with health, firmware and last-seen status.",
      },
      {
        title: "Signed audit exports",
        body: "Custody history exports are cryptographically signed so insurers and auditors can verify them independently.",
      },
      {
        title: "Role-based dashboards",
        body: "Purpose-built views for super-admins, business owners and vault users, enforced by server-side RBAC on every action.",
      },
    ],
    // TODO: replace with real, measurable outcomes
    results: [
      { value: "<800ms", label: "Median tap-to-verdict time" },
      { value: "0", label: "Password credentials stored" },
      { value: "12k+", label: "Verifications in the first quarter" },
      { value: "100%", label: "Custody events with signed audit trail" },
    ],
    outcome: "Gave brand owners a verifiable chain of custody and real-time visibility into counterfeit attempts.",
    links: { live: "https://nfc-card-authi.vercel.app/" },
    cover: {
      src: "/rokauthimage.jpg",
      alt: "ROK Provenance product authentication platform",
      width: 1600,
      height: 1000,
    },
    gallery: placeholderGallery("RÖK Provenance"),
  },
  {
    // TODO: replace with a real project
    slug: "sentinel-watch",
    title: "OnTap Portal",
    tag: "NFC Digital Identity",
    summary:
      "A digital business card management platform that lets users create, manage, and share professional profiles, business information, and digital portfolios through NFC-enabled experiences.",
    description:
      "A digital business card management platform that lets users create, manage, and share professional profiles, business information, and digital portfolios through NFC-enabled experiences.",
    status: "in-progress",
    featured: true,
    year: "2025",
    role: "Solo engineer",
    timeline: "4 months · ongoing",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma ORM", "MySQL", "REST APIs"],
    overview:
      "Sentinel Watch is a focused alternative to heavyweight SIEM tooling for small teams. It ingests logs, scores events and presents a calm incident queue instead of an endless stream of alerts.",
    problem:
      "A small operations team was drowning in alert fatigue: thousands of low-signal events per day, with genuine credential-stuffing attempts buried among them.",
    approach: [
      "Built a streaming ingest worker that normalises logs from multiple sources into a single typed event schema.",
      "Layered deterministic rules with simple statistical baselines per account and per network to rank anomalies.",
      "Designed an incident queue UI that groups related events and explains why each one was flagged.",
    ],
    features: [
      { title: "Unified event schema", body: "Logs from auth, edge and app sources normalised into one typed, queryable model." },
      { title: "Explainable scoring", body: "Every flag ships with the rules and baselines that triggered it — no black boxes." },
      { title: "Incident grouping", body: "Related events collapse into a single incident with a timeline and suggested next steps." },
    ],
    results: [
      { value: "−82%", label: "Alerts requiring human review" },
      { value: "6 min", label: "Median time to triage" },
      { value: "40M", label: "Events processed per month" },
    ],
    outcome: "Cut alert volume by over 80% while surfacing the incidents that actually mattered.",
    links: { live: "https://portal.ontap.ph/" },
    cover: {
      src: "/portal.jpg",
      alt: "OnTap Portal digital business card management platform",
      width: 1600,
      height: 1000,
    },
    gallery: placeholderGallery("Sentinel Watch"),
  },
  {
    // TODO: replace with a real project
    slug: "fieldnote",
    title: "Burnbox Solution Advertising",
    tag: "Advertising & CMS",
    summary:
      "A business website and admin CMS for a printing and advertising company, featuring product catalogs, quotation calculations, store navigation, customer inquiries, and content management.",
    description:
      "A business website and admin CMS for a printing and advertising company, featuring product catalogs, quotation calculations, store navigation, customer inquiries, and content management.",
    status: "live",
    featured: true,
    year: "2024",
    role: "Full-stack engineer",
    timeline: "6 months · 2024",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "MySQL"],
    overview:
      "Fieldnote replaced paper inspection forms for a facilities contractor. Inspectors capture findings on-site, and managers see results the moment a device reconnects.",
    problem:
      "Paper forms were transcribed days later, photos lived on personal phones, and disputes over what was inspected — and when — were common.",
    approach: [
      "Designed a local-first data layer on IndexedDB with an operation log that syncs idempotently to the server.",
      "Resolved conflicts with field-level last-writer-wins plus explicit review for safety-critical fields.",
      "Kept the UI usable with gloves on: large targets, high contrast and a single primary action per screen.",
    ],
    features: [
      { title: "Full offline mode", body: "Every inspection flow works without a connection, including photos and signatures." },
      { title: "Conflict-aware sync", body: "An operation log syncs idempotently and flags safety-critical conflicts for review." },
      { title: "Tamper-evident reports", body: "Completed inspections are timestamped and hashed before they leave the device." },
    ],
    results: [
      { value: "3 days → 0", label: "Report turnaround" },
      { value: "1,400+", label: "Inspections completed" },
      { value: "99.7%", label: "Sync success without manual action" },
    ],
    outcome: "Eliminated transcription delays and gave managers same-day visibility into field work.",
    links: { live: "https://burnbox.vercel.app/" },
    cover: {
      src: "/bbbox.jpg",
      alt: "Burnbox Solution Advertising business website",
      width: 1600,
      height: 1000,
    },
    gallery: placeholderGallery("Fieldnote"),
  },
  {
    // TODO: replace with a real project
    slug: "ledgerline",
    title: "Smartpet",
    tag: "NFC Pet Identification",
    summary:
      "An NFC-enabled pet identification platform that lets owners create and manage digital pet profiles, making pet photos and essential information accessible through a simple tap or scan.",
    description:
      "An NFC-enabled pet identification platform that lets owners create and manage digital pet profiles, making pet photos and essential information accessible through a simple tap or scan.",
    status: "archived",
    featured: true,
    year: "2023",
    role: "Full-stack engineer",
    timeline: "5 months · 2023",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma ORM", "MySQL", "REST APIs"],
    overview:
      "Ledgerline helped small agencies move from spreadsheets to automated, usage-aware billing without hiring a finance team.",
    problem:
      "Agencies were invoicing manually from spreadsheets, missing billable hours and spending days reconciling payments at month end.",
    approach: [
      "Mapped agency pricing models onto Stripe products, prices and metered usage records.",
      "Built idempotent webhook handlers with a replayable event store for every billing state change.",
      "Designed a reconciliation dashboard that matches payouts, invoices and refunds automatically.",
    ],
    features: [
      { title: "Usage-based plans", body: "Metered billing for hours, seats or deliverables, synced to Stripe automatically." },
      { title: "Replayable webhooks", body: "Every Stripe event is stored and can be replayed safely to recover from incidents." },
      { title: "One-click reconciliation", body: "Payouts, invoices and refunds matched automatically with exceptions surfaced." },
    ],
    results: [
      { value: "−90%", label: "Time spent on month-end close" },
      { value: "$1.2M", label: "Invoiced through the platform" },
      { value: "0", label: "Duplicate charges after launch" },
    ],
    outcome: "Turned a multi-day manual process into a short, verifiable monthly routine.",
    links: { live: "https://smartpet.ontap.ph/" },
    cover: {
      src: "/smarpet.jpg",
      alt: "Smartpet NFC pet identification platform",
      width: 1600,
      height: 1000,
    },
    gallery: placeholderGallery("Ledgerline"),
  },
  {
    // TODO: replace with a real project
    slug: "tokenforge",
    title: "Tokenforge",
    tag: "Open-source CLI",
    summary: "A CLI that compiles design tokens into typed CSS variables, Tailwind themes and documentation.",
    description:
      "One JSON source of truth for colour, type and motion tokens, compiled into every format a product team needs.",
    status: "open-source",
    featured: false,
    year: "2024",
    role: "Author & maintainer",
    timeline: "Ongoing",
    stack: ["TypeScript", "Node.js", "Zod", "Vitest"],
    overview:
      "Tokenforge keeps design and engineering in sync by generating CSS variables, Tailwind v4 themes and a token reference site from a single schema.",
    problem: "Design tokens drifted between Figma, CSS and documentation within weeks of every redesign.",
    approach: [
      "Defined a strict, versioned token schema validated with Zod.",
      "Wrote pluggable emitters for CSS, Tailwind and Markdown documentation.",
    ],
    features: [
      { title: "Typed token schema", body: "Tokens are validated at build time with descriptive errors." },
      { title: "Multiple emitters", body: "CSS variables, Tailwind v4 @theme blocks and docs from one source." },
    ],
    results: [
      { value: "400+", label: "Weekly downloads" },
      { value: "3", label: "Teams using it in production" },
    ],
    outcome: "Removed token drift for the teams that adopted it.",
    links: { repo: "https://github.com/alexreyes/tokenforge" },
    cover: {
      src: "/images/projects/tokenforge.svg",
      alt: "Abstract cover artwork for Tokenforge: a grid of colour swatches and code brackets",
      width: 1600,
      height: 1000,
    },
    gallery: placeholderGallery("Tokenforge"),
  },
  {
    // TODO: replace with a real project
    slug: "homelab-infra",
    title: "Homelab Infra",
    tag: "Infrastructure as Code",
    summary: "A fully reproducible homelab — VMs, DNS, backups and monitoring — defined in code and rebuilt from scratch in under an hour.",
    description:
      "Terraform and Docker definitions for a small self-hosted platform, with zero-trust remote access and automated, tested backups.",
    status: "live",
    featured: false,
    year: "2023",
    role: "Personal project",
    timeline: "Ongoing",
    stack: ["Terraform", "Docker", "Linux", "Nginx", "Grafana"],
    overview:
      "A testbed for infrastructure practices I use at work: everything is declarative, versioned and restorable.",
    problem: "Hand-configured servers were impossible to rebuild after a disk failure.",
    approach: [
      "Codified every host and service with Terraform and Docker Compose.",
      "Added nightly encrypted backups with automated restore tests.",
    ],
    features: [
      { title: "Declarative everything", body: "Hosts, DNS and services are defined in version-controlled code." },
      { title: "Tested backups", body: "Restores run automatically every week to prove backups actually work." },
    ],
    results: [
      { value: "<1h", label: "Full rebuild from bare metal" },
      { value: "99.9%", label: "Uptime over the last year" },
    ],
    outcome: "A platform I can destroy and rebuild without fear.",
    links: { repo: "https://github.com/alexreyes/homelab" },
    cover: {
      src: "/images/projects/homelab-infra.svg",
      alt: "Abstract cover artwork for Homelab Infra: server rack outlines and network links",
      width: 1600,
      height: 1000,
    },
    gallery: placeholderGallery("Homelab Infra"),
  },
];

const featuredProjectOrder = ["sentinel-watch", "fieldnote", "rok-provenance", "ledgerline"];
const projectOrder = [
  ...featuredProjectOrder,
  ...projects.map((project) => project.slug).filter((slug) => !featuredProjectOrder.includes(slug)),
];

export const featuredProjects = projectOrder
  .map((slug) => getProject(slug))
  .filter((project): project is Project => project !== undefined && project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const orderedProjects = projectOrder
    .map((projectSlug) => getProject(projectSlug))
    .filter((project): project is Project => Boolean(project));

  const index = orderedProjects.findIndex((project) => project.slug === slug);
  return orderedProjects[(index + 1) % orderedProjects.length];
}

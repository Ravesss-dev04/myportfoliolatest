import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { profile } from "@/content/profile";
import { Monogram } from "./Monogram";

const socials = [
  { label: "GitHub", href: profile.github, icon: <GithubIcon size={17} /> },
  { label: "LinkedIn", href: profile.linkedin, icon: <LinkedinIcon size={16} /> },
  { label: "Email", href: `mailto:${profile.email}`, icon: <Mail size={17} strokeWidth={1.6} aria-hidden="true" /> },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-pf-surface text-white/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Monogram initials={profile.initials} className="opacity-30" />
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em]">
            {profile.name} · {profile.role}
          </p>
        </div>

        <ul className="flex items-center gap-1">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-white/40 transition-colors duration-180 ease-pf hover:text-white/60"
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>

        <p className="font-mono text-[10.5px] tracking-[0.14em]">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  );
}

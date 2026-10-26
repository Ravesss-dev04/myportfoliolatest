import { Badge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { SkillsStage } from "./SkillsStage";
import { StackTerminal, type TerminalLine } from "./StackTerminal";

function buildTerminalLines(): TerminalLine[] {
  const handle = profile.name.toLowerCase().replace(/\s+/g, "-");
  const width = Math.max(...skillGroups.map((group) => group.title.length)) + 3;

  return [
    { kind: "command", text: "whoami" },
    { kind: "output", text: `${handle} — ${profile.role.toLowerCase()}` },
    { kind: "command", text: "stack --list" },
    ...skillGroups.map<TerminalLine>((group) => ({
      kind: "output",
      text: `${group.title.padEnd(width)}${group.items.slice(0, 3).join(" · ").toLowerCase()}`,
    })),
    { kind: "command", text: "status" },
    { kind: "status", text: `available — ${profile.location.toLowerCase()}` },
  ];
}

function SkillList() {
  return (
    <div>
      <SectionHeader
        id="skills-title"
        eyebrow="Skills"
        title="A full-stack toolkit, tuned for systems that have to be trusted."
        description="From the interface to the database to the audit log — the tools I reach for, and why."
      />

      <ol className="mt-12 border-t border-white/[0.06]">
        {skillGroups.map((group, index) => (
          <li key={group.id} className="group relative border-b border-white/[0.06]">
            <span
              aria-hidden="true"
              className="absolute inset-y-6 left-0 w-px origin-top scale-y-0 bg-pf-accent/60 transition-transform duration-300 ease-pf group-hover:scale-y-100"
            />
            <Reveal delay={index * 0.07} y={20} className="flex gap-4 py-7 pl-4 sm:gap-5 sm:pl-5">
              <span className="w-6 shrink-0 pt-3 font-mono text-[10px] font-bold tracking-[0.22em] text-pf-accent/45">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="w-px shrink-0 self-stretch bg-white/[0.08]" />
              <IconTile icon={group.icon} />
              <div className="min-w-0 pt-0.5">
                <h3 className="text-[15px] font-semibold text-white/85 transition-colors duration-180 group-hover:text-white">
                  {group.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/45 transition-colors duration-180 group-hover:text-white/60">
                  {group.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${group.title} technologies`}>
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge>{item}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-x-clip bg-pf-surface py-24 sm:py-32 lg:py-0">
      <SkillsStage
        list={<SkillList />}
        visual={<StackTerminal title="~/stack — zsh" lines={buildTerminalLines()} />}
      />
    </section>
  );
}

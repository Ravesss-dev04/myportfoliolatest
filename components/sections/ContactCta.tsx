import { Download, Mail } from "lucide-react";
import { EditorialAnchor } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/content/profile";
import { ContactForm } from "./ContactForm";

const arcs = [
  { size: "max(25vw, 150px)", delay: "0s" },
  { size: "max(40vw, 270px)", delay: "0.8s" },
  { size: "max(55vw, 390px)", delay: "1.6s" },
  { size: "max(70vw, 510px)", delay: "2.4s" },
  { size: "max(85vw, 630px)", delay: "3.2s" },
];

function ConcentricArcs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {arcs.map((arc) => (
        <span
          key={arc.size}
          className="absolute bottom-0 left-1/2 aspect-square -translate-x-1/2 translate-y-1/2 rounded-full border border-[rgba(139,112,242,0.14)] bg-white/5"
          style={{ width: arc.size }}
        >
          <span
            className="absolute -inset-px rounded-full border border-[rgba(139,112,242,0.28)] opacity-0 animate-pf-arc"
            style={{ animationDelay: arc.delay }}
          />
        </span>
      ))}
      <span className="absolute bottom-0 left-1/2 h-[45vh] w-[70vw] translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(100,70,220,0.18)_0%,transparent_70%)] animate-pf-glow" />
    </div>
  );
}

export function ContactCta() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-pf-surface pb-40 pt-24 sm:pb-52 sm:pt-32"
    >
      <ConcentricArcs />

      <div className="mx-auto flex max-w-7xl flex-col items-center px-5 text-center sm:px-8">
        <SectionHeader
          id="contact-title"
          align="center"
          eyebrow="Let's build something"
          title="Have a system that needs to be trusted?"
          description="Tell me about the product, the constraints and the timeline. I'll reply with honest thoughts on how I can help — or who can."
        />

        <Reveal delay={0.18} className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row">
            <EditorialAnchor href={`mailto:${profile.email}`}>
              <Mail size={15} strokeWidth={1.6} aria-hidden="true" />
              Email me
            </EditorialAnchor>
            <EditorialAnchor href={profile.resumeUrl} download className="border-white/15">
              <Download size={15} strokeWidth={1.6} aria-hidden="true" />
              Download resume
            </EditorialAnchor>
          </div>
        </Reveal>

        <Reveal delay={0.26} className="mt-14 w-full max-w-2xl">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

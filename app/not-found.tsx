import { ArrowLeft } from "lucide-react";
import { EditorialLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden px-5 pt-24 sm:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(100,70,220,0.16)_0%,transparent_80%)]"
      />
      <div className="mx-auto max-w-xl text-center">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.025em] text-white sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-white/55">
          The link may be outdated, or the page may have moved. Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex justify-center">
          <EditorialLink href="/">
            <ArrowLeft size={15} strokeWidth={1.6} aria-hidden="true" />
            Back home
          </EditorialLink>
        </div>
      </div>
    </section>
  );
}

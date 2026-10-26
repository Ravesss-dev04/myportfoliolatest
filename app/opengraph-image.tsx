import { profile } from "@/content/profile";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${profile.name} — ${profile.roleLong}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: `${profile.name} · ${profile.location}`,
    title: profile.positioning,
    footer: profile.roleLong,
  });
}

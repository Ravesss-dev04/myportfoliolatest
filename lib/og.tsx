import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const ogSize = { width: 1200, height: 630 };

interface OgImageOptions {
  eyebrow: string;
  title: string;
  footer: string;
}

export function renderOgImage({ eyebrow, title, footer }: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0d1117",
          backgroundImage:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(168,180,194,0.13) 0%, transparent 80%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          color: "#e2e8f0",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 6,
              fontSize: 28,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            {profile.initials}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(168,180,194,0.7)",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 64, lineHeight: 1.12, color: "#ffffff", maxWidth: 1000 }}>{title}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "rgba(255,255,255,0.55)" }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "rgba(168,180,194,0.7)" }} />
          {footer}
        </div>
      </div>
    ),
    ogSize,
  );
}

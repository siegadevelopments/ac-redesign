import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_TAGLINE } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoDataUrl = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "logo-mark.png")
).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#15212F", // --color-surface-inverse
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", position: "absolute", inset: 0 }}>
          <svg width="1200" height="630" style={{ position: "absolute" }}>
            <line x1="0" y1="200" x2="1200" y2="160" stroke="#2F3D4F" strokeWidth="1" />
            <line x1="0" y1="460" x2="1200" y2="500" stroke="#2F3D4F" strokeWidth="1" />
          </svg>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logoDataUrl} width={44} height={40} alt="" style={{ marginRight: 16 }} />
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 600,
              // Wordmark colours match src/components/ui/Logo.tsx, which keeps
              // them fixed so the logo doesn't drift with the palette.
              color: "#F8FAFC",
            }}
          >
            Apprising <span style={{ color: "#0C9488", marginLeft: 12 }}>Creatives</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 56,
            fontWeight: 600,
            color: "#F4F0E8", // --color-ink-inverse
            maxWidth: 900,
            lineHeight: 1.15,
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    size
  );
}

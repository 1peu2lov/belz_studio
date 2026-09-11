import { ImageResponse } from "next/og";

import { brandMark, loadPirulenFont } from "@/lib/brandMark";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — studio créatif à ${siteConfig.location.city}`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const pirulen = await loadPirulenFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brandMark.background,
          color: brandMark.foreground,
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Pirulen",
            fontSize: 92,
            lineHeight: 1.05,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>Belz</span>
          <span>Studio</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontSize: 28,
            lineHeight: 1.35,
            color: brandMark.muted,
            letterSpacing: "-0.01em",
          }}
        >
          <span>Studio créatif à {siteConfig.location.city}</span>
          <span>Sites web · Identité visuelle · Design</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Pirulen",
          data: pirulen,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}

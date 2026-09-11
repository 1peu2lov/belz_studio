import { ImageResponse } from "next/og";

import { brandMark, loadPirulenFont } from "@/lib/brandMark";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default async function AppleIcon() {
  const pirulen = await loadPirulenFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brandMark.background,
          color: brandMark.foreground,
          fontFamily: "Pirulen",
          fontSize: 92,
          letterSpacing: "0.06em",
        }}
      >
        B
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

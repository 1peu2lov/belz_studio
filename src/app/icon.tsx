import { ImageResponse } from "next/og";

import { brandMark, loadPirulenFont } from "@/lib/brandMark";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default async function Icon() {
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
          fontSize: 16,
          letterSpacing: "0.04em",
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

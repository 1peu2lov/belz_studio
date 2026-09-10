import localFont from "next/font/local";

/**
 * Supreme — typographie principale (corps, UI, titres secondaires).
 * Source : Fontshare / Indian Type Foundry.
 */
export const supreme = localFont({
  src: [
    {
      path: "./supreme/Supreme-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./supreme/Supreme-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./supreme/Supreme-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-supreme",
  display: "swap",
});

/**
 * Pirulen — display pour les très gros titres.
 * Source : Typodermic (Ray Larabie). Vérifier la licence webfont pour la prod.
 */
export const pirulen = localFont({
  src: [
    {
      path: "./pirulen/Pirulen-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pirulen",
  display: "swap",
});

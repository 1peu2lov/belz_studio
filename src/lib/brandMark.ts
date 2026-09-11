import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const brandMark = {
  background: "#080c0d",
  foreground: "#f9f9f9",
  muted: "rgba(249, 249, 249, 0.58)",
} as const;

export async function loadPirulenFont(): Promise<Buffer> {
  return readFile(join(process.cwd(), "src/fonts/pirulen/Pirulen-Regular.otf"));
}

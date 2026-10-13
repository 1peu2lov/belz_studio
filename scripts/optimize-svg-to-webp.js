/* eslint-disable no-console */
// Simple SVG -> WebP converter using sharp. Run with: node scripts/optimize-svg-to-webp.js
// Generates optimized WebP renditions for known heavy SVGs at sensible widths.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

const tasks = [
  {
    input: "public/Projets/Tournis/TOURNIS_card.svg",
    output: "public/Projets/Tournis/TOURNIS_card.webp",
    width: 900, // ~2x card display width
    quality: 82,
  },
  {
    input: "public/Projets/Tournis/logo-entier.svg",
    output: "public/Projets/Tournis/logo-entier.webp",
    width: 1600, // generous for intro visual
    quality: 85,
  },
  {
    input: "public/Projets/Cacolac/cacola_card.svg",
    output: "public/Projets/Cacolac/cacola_card.webp",
    width: 900,
    quality: 82,
  },
];

async function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
}

async function convert({ input, output, width, quality }) {
  const inPath = path.join(root, input);
  const outPath = path.join(root, output);
  await ensureDir(outPath);

  try {
    const img = sharp(inPath, { density: 220 }); // improve SVG rasterization
    const pipeline = img.resize({ width, withoutEnlargement: true }).webp({
      quality,
      nearLossless: false,
      effort: 4,
    });
    await pipeline.toFile(outPath);
    const { size } = await fs.stat(outPath);
    console.log(`OK  ${input} -> ${output} (${Math.round(size / 1024)} KiB)`);
  } catch (err) {
    console.error(`ERR ${input} -> ${output}:`, err);
    process.exitCode = 1;
  }
}

async function main() {
  for (const t of tasks) {
    // Skip if already exists (idempotent)
    try {
      await fs.access(path.join(root, t.output));
      console.log(`SKIP ${t.output} already exists`);
      // continue converting anyway if you want to refresh, but default is skip
      continue;
    } catch {
      // proceed
    }
    await convert(t);
  }
}

await main();


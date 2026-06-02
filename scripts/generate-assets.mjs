#!/usr/bin/env node
/**
 * Gera assets estáticos a partir das fontes:
 *
 *   - public/og-image.png        (1200x630 — logo horizontal centralizada sobre branco)
 *   - public/favicon-32x32.png   (rasterizado do favicon.svg)
 *   - public/favicon-16x16.png   (rasterizado do favicon.svg)
 *   - public/apple-touch-icon.png        (180x180)
 *   - public/android-chrome-192x192.png  (192x192)
 *   - public/android-chrome-512x512.png  (512x512)
 *
 * Rodar manualmente quando a logo ou o favicon.svg mudarem:
 *
 *     node scripts/generate-assets.mjs
 *
 * Também roda automaticamente antes de `npm run build` via "prebuild" no
 * package.json.
 */

import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

const LOGO = join(ROOT, "src/assets/logo/divulga-logo.png");
const FAVICON_SVG = join(PUBLIC, "favicon.svg");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OG_LOGO_PROPORTION = 0.55; // logo ocupa 55% da largura final

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function generateOgImage() {
  console.log("🎨 og-image.png (1200x630, logo centralizada no branco)");
  const logoBuffer = await readFile(LOGO);

  // Redimensiona a logo pra ~55% da largura final, mantendo aspect ratio
  const targetLogoWidth = Math.round(OG_WIDTH * OG_LOGO_PROPORTION);
  const resizedLogo = await sharp(logoBuffer)
    .resize({ width: targetLogoWidth, withoutEnlargement: false })
    .png()
    .toBuffer();

  // Compõe sobre canvas branco
  await sharp({
    create: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([{ input: resizedLogo, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC, "og-image.png"));
}

async function generateFavicons() {
  const svgBuffer = await readFile(FAVICON_SVG);

  const targets = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "android-chrome-192x192.png", size: 192 },
    { name: "android-chrome-512x512.png", size: 512 },
  ];

  for (const { name, size } of targets) {
    console.log(`🎨 ${name} (${size}x${size})`);
    await sharp(svgBuffer)
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(join(PUBLIC, name));
  }
}

async function main() {
  await ensureDir(PUBLIC);
  await generateOgImage();
  await generateFavicons();
  console.log("✅ assets gerados em public/");
}

main().catch((err) => {
  console.error("❌ erro:", err);
  process.exit(1);
});

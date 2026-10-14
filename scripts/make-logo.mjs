// Builds the transparent wordmark logo and favicons from scripts/logo-source.jpg
import sharp from "sharp";
import fs from "node:fs";

const SRC = "scripts/logo-source.jpg";
const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// Background colour = top-left pixel; ink colour = brightest pixel.
const bi = (100 * W + 100) * 3;
const bg = [data[bi], data[bi + 1], data[bi + 2]];
let ink = bg, best = 0;
for (let i = 0; i < data.length; i += 3) {
  const l = data[i] + data[i + 1] + data[i + 2];
  if (l > best) { best = l; ink = [data[i], data[i + 1], data[i + 2]]; }
}
const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;
const lo = lum(...bg), hi = lum(...ink);

// Luminance -> alpha, solid ink colour.
const rgba = Buffer.alloc(W * H * 4);
let x0 = W, y0 = H, x1 = 0, y1 = 0;
for (let p = 0; p < W * H; p++) {
  const l = lum(data[p * 3], data[p * 3 + 1], data[p * 3 + 2]);
  const px = p % W, py = (p / W) | 0;
  const edge = px < 20 || py < 20 || px >= W - 20 || py >= H - 20; // thin border in the source
  const a = edge ? 0 : Math.max(0, Math.min(1, (l - lo) / (hi - lo)));
  rgba.set([ink[0], ink[1], ink[2], Math.round(a * 255)], p * 4);
  if (a > 0.3) {
    const x = p % W, y = (p / W) | 0;
    if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
}
console.log("bg", bg, "ink", ink, "bbox", x0, y0, x1, y1);

const pad = 12;
const box = { left: Math.max(0, x0 - pad), top: Math.max(0, y0 - pad), width: Math.min(W, x1 + pad) - Math.max(0, x0 - pad), height: Math.min(H, y1 + pad) - Math.max(0, y0 - pad) };
const full = sharp(rgba, { raw: { width: W, height: H, channels: 4 } });

fs.mkdirSync("public", { recursive: true });
await full.clone().extract(box).png().toFile("src/assets/logo.png");

// Favicon: the "g" of the wordmark on the brand background, as a rounded square.
const g = { left: 44, top: 384, width: 100, height: 172 };
const bgHex = { r: bg[0], g: bg[1], b: bg[2], alpha: 1 };
const glyph = await full.clone().extract({ left: g.left, top: g.top, width: g.width, height: g.height }).png().toBuffer();
const tile = async (size) => {
  const inner = Math.round(size * 0.66);
  const gl = await sharp(glyph).resize({ width: inner, height: inner, fit: "inside" }).toBuffer();
  const r = Math.round(size * 0.22);
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}"/></svg>`);
  return sharp({ create: { width: size, height: size, channels: 4, background: bgHex } })
    .composite([{ input: gl, gravity: "center" }, { input: mask, blend: "dest-in" }])
    .png().toBuffer();
};
for (const s of [16, 32, 48, 180, 512]) fs.writeFileSync(`public/favicon-${s}.png`, await tile(s));
fs.copyFileSync("public/favicon-32.png", "public/favicon.png");

// Social / share image: the full original artwork.
await sharp(SRC).resize(1200, 1200).jpeg({ quality: 88 }).toFile("public/og-image.jpg");
console.log("done");

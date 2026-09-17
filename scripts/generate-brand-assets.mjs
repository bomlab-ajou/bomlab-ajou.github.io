/**
 * Generates the site's icons and link-preview image:
 *
 *   src/app/favicon.ico            16, 32 and 48px, for tabs and anything that asks for /favicon.ico
 *   src/app/icon.png               128px, for high-density displays
 *   src/app/apple-icon.png         180px, emblem on white because iOS turns transparency black
 *   public/opengraph-image.png     1200x630, shown when a link is shared (KakaoTalk, Slack, X)
 *
 * The icons use Next.js file-based metadata. The preview image lives in public/
 * instead and is referenced from src/lib/metadata.ts: Next.js only applies a
 * file-based `opengraph-image` to pages that don't set their own `openGraph`,
 * and every page here does, to get its own canonical URL and preview title.
 *
 * The outputs are committed, so this only needs to run again when the emblem
 * or the text in src/content/site.ts changes:
 *
 *   npm run generate:brand
 *
 * These are static files rather than `icon.tsx` / `opengraph-image.tsx` routes
 * on purpose. A static export writes generated routes without a file
 * extension, and GitHub Pages picks the Content-Type from the extension, so
 * crawlers would be handed the images as application/octet-stream.
 *
 * Needs Node 22.18+ (it imports site.ts directly). Rendering uses `next/og`,
 * which Next.js already installs, so there is nothing extra to add.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../src/content/site.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(root, "package.json"));
const { ImageResponse } = require("next/og");
const { createElement: h } = require("react");

const brand = (file) => readFileSync(join(root, "scripts/brand", file));

const fonts = [
  { name: "Inter", data: brand("fonts/inter-400.ttf"), weight: 400, style: "normal" },
  { name: "Inter", data: brand("fonts/inter-600.ttf"), weight: 600, style: "normal" },
  { name: "Mono", data: brand("fonts/jetbrains-mono-500.ttf"), weight: 500, style: "normal" },
];

/**
 * Ajou University's emblem, taken from the favicon the university serves at
 * https://www.ajou.ac.kr/_res/ajou/kr/img/favicon.png (128x128, transparent).
 * It is the largest copy on the site, so nothing here is drawn above 128px.
 */
const EMBLEM_SIZE = 128;
const emblem = `data:image/png;base64,${brand("ajou-emblem.png").toString("base64")}`;

// Light-theme tokens from src/app/globals.css.
const color = {
  canvas: "#ffffff",
  ink: "#18181b",
  muted: "#6b7280",
  line: "#e6e6e9",
  accent: "#1d4ed8",
};

async function render(element, width, height) {
  const response = new ImageResponse(element, { width, height, fonts });
  return Buffer.from(await response.arrayBuffer());
}

function emblemImage(size, background = "transparent") {
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background,
      },
    },
    h("img", { src: emblem, width: size, height: size }),
  );
}

/** Packs PNG images into an .ico container; every current browser reads PNG entries. */
function toIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  const entries = [];
  let offset = header.length + pngs.length * 16;
  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

function label(text, textColor) {
  return h(
    "div",
    { style: { fontFamily: "Mono", fontSize: 19, letterSpacing: 2.6, color: textColor } },
    text,
  );
}

/** The expanded name, with the letters that spell BOM picked out in the accent colour. */
function title() {
  const initial = (letter) => h("span", { style: { color: color.accent } }, letter);
  const rest = (text) => h("span", { style: { whiteSpace: "pre" } }, text);
  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        fontWeight: 600,
        fontSize: 92,
        lineHeight: 1.04,
        letterSpacing: -3,
      },
    },
    h("div", { style: { display: "flex" } }, initial("B"), rest("ody, "), initial("O"), rest("bject,")),
    h("div", { style: { display: "flex" } }, rest("and "), initial("M"), rest("otion Lab")),
  );
}

function openGraphCard() {
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: color.canvas,
        color: color.ink,
        fontFamily: "Inter",
        // Generous vertical padding: X crops large cards to 2:1.
        padding: "68px 80px 64px",
      },
    },
    h(
      "div",
      { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
      h(
        "div",
        { style: { display: "flex", alignItems: "center" } },
        h("img", { src: emblem, width: 52, height: 52 }),
        h(
          "div",
          { style: { marginLeft: 16, fontWeight: 600, fontSize: 32, letterSpacing: -0.6 } },
          site.name,
        ),
      ),
      label(site.university.toUpperCase(), color.muted),
    ),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      title(),
      h(
        "div",
        { style: { marginTop: 30, fontSize: 33, lineHeight: 1.36, color: color.muted, maxWidth: 900 } },
        site.tagline,
      ),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1.5px solid ${color.line}`,
          paddingTop: 26,
        },
      },
      label(site.department.toUpperCase(), color.muted),
      label(site.url.replace(/^https?:\/\//, ""), color.accent),
    ),
  );
}

const icoFrames = [];
for (const size of [16, 32, 48]) {
  icoFrames.push({ size, data: await render(emblemImage(size), size, size) });
}
writeFileSync(join(root, "src/app/favicon.ico"), toIco(icoFrames));
writeFileSync(
  join(root, "src/app/icon.png"),
  await render(emblemImage(EMBLEM_SIZE), EMBLEM_SIZE, EMBLEM_SIZE),
);
// Emblem at its native size on a 180px white square; iOS rounds the corners itself.
writeFileSync(
  join(root, "src/app/apple-icon.png"),
  await render(emblemImage(EMBLEM_SIZE, color.canvas), 180, 180),
);
writeFileSync(join(root, "public/opengraph-image.png"), await render(openGraphCard(), 1200, 630));

console.log("Wrote src/app/{favicon.ico,icon.png,apple-icon.png} and public/opengraph-image.png");

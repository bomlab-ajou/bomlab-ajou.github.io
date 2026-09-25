import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const versions = new Map<string, string>();

/**
 * Appends a short content hash to a file served from `public/`, so replacing a
 * file under the same name also changes its URL. Without this, browsers keep
 * playing a cached copy after a deploy: GitHub Pages serves media with a plain
 * `max-age`, and videos in particular are held on to.
 *
 * Reads the file at build time, so call it only from server components.
 */
export function versioned(src: string): string {
  if (!src.startsWith("/")) return src;
  const cached = versions.get(src);
  if (cached) return cached;
  const file = join(process.cwd(), "public", src);
  const hash = createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 10);
  const url = `${src}?v=${hash}`;
  versions.set(src, url);
  return url;
}

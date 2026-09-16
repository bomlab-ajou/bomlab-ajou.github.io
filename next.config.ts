import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/` — deployable to Cloudflare Pages,
  // GitHub Pages, or any plain web server (including the NAS).
  output: "export",

  // `/research` -> `/research/index.html`, so directory-index servers
  // (Apache/nginx on the NAS) resolve routes without extra rewrite rules.
  trailingSlash: true,

  // No Node server at runtime, so the default image optimizer is unavailable.
  images: { unoptimized: true },
};

export default nextConfig;

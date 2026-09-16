import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Route handlers must be explicitly static when `output: "export"` is set.
export const dynamic = "force-static";

const routes = ["", "/research", "/publications", "/members", "/news", "/join"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    // `trailingSlash: true` is set in next.config.ts, so the canonical URLs
    // that this sitemap advertises must end in a slash too.
    url: `${site.url}${route}/`.replace(/([^:])\/\/+/g, "$1/"),
    lastModified,
    changeFrequency: route === "" || route === "/news" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

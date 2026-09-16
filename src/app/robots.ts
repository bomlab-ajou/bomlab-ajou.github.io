import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Route handlers must be explicitly static when `output: "export"` is set.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

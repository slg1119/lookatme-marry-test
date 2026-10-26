import type { MetadataRoute } from "next";
import { getSiteUrl, isPublicSite } from "../lib/seo";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();
  if (!isPublicSite(site)) return { rules: { userAgent: "*", disallow: "/" } };
  // Let crawlers read the noindex on /test and /result. API responses are not content.
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: new URL("/sitemap.xml", site!).href,
  };
}

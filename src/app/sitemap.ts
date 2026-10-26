import type { MetadataRoute } from "next";
import { getSiteUrl, isPublicSite, publicPaths } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  if (!isPublicSite(site)) return [];
  return publicPaths().map((path) => ({ url: new URL(path, site!).href }));
}

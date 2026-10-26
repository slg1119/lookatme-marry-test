import { afterEach, describe, expect, it, vi } from "vitest";
import { getSiteUrl, isPublicSite, pageMetadata, publicPaths } from "./seo";
import robots from "../app/robots";
import sitemap from "../app/sitemap";

afterEach(() => vi.unstubAllEnvs());

describe("search publication policy", () => {
  it.each([undefined, "", "  "])(
    "uses the confirmed public domain when production SITE_URL is %s",
    (value) => {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("SITE_URL", value);
      vi.stubEnv("VERCEL_ENV", "production");
      vi.stubEnv("SITE_NOINDEX", "false");
      expect(getSiteUrl()?.href).toBe("https://test.lookatme.my/");
      expect(isPublicSite()).toBe(true);
      expect(sitemap()[0]?.url).toBe("https://test.lookatme.my/");
      const metadata = pageMetadata({
        title: "test",
        description: "test",
        path: "/",
      });
      expect(metadata.openGraph).toMatchObject({
        images: [{ url: "https://test.lookatme.my/og/home?v=20261026-open-design" }],
      });
    },
  );
  it("keeps production-built previews unindexed without emitting localhost image URLs", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SITE_URL", "");
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(isPublicSite()).toBe(false);
    const metadata = pageMetadata({
      title: "test",
      description: "test",
      path: "/",
    });
    expect(metadata.openGraph).toMatchObject({
      images: [{ url: "https://test.lookatme.my/og/home?v=20261026-open-design" }],
    });
  });
  it("keeps an unconfigured site out of the index and emits no invented canonical", () => {
    vi.stubEnv("SITE_URL", "");
    expect(getSiteUrl()).toBeNull();
    expect(isPublicSite()).toBe(false);
    expect(sitemap()).toEqual([]);
    expect(robots().rules).toEqual({ userAgent: "*", disallow: "/" });
    expect(
      pageMetadata({ title: "test", description: "test", path: "/" })
        .alternates,
    ).toBeUndefined();
  });
  it.each([
    "https://u:p@example.com",
    "https://example.com/path",
    "https://example.com/?token=private",
    "https://example.com/#frag",
    "file:///tmp/page",
  ])("rejects an unsafe or unsupported origin %s", (value) => {
    expect(() => getSiteUrl(value)).toThrow();
  });
  it("publishes only the home, guide and all eight generic styles", () => {
    vi.stubEnv("SITE_URL", "https://marry.example");
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("SITE_NOINDEX", "false");
    const entries = sitemap();
    expect(entries).toHaveLength(10);
    expect(new Set(entries.map(({ url }) => url)).size).toBe(10);
    expect(entries.filter(({ url }) => url.includes("/type/"))).toHaveLength(8);
    expect(publicPaths()).not.toContain("/result");
    expect(publicPaths()).not.toContain("/test");
    expect(robots().rules).toEqual({
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    });
    expect(robots().sitemap).toBe("https://marry.example/sitemap.xml");
  });
  it("does not index individual answers even on a public deployment", () => {
    vi.stubEnv("SITE_URL", "https://marry.example");
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("SITE_NOINDEX", "false");
    const metadata = pageMetadata({
      title: "result",
      description: "result",
      path: "/result",
      privatePage: true,
    });
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
    expect(metadata.alternates).toBeUndefined();
  });
  it("gives public pages their own canonical and social image", () => {
    vi.stubEnv("SITE_URL", "https://marry.example");
    const metadata = pageMetadata({
      title: "style",
      description: "style",
      path: "/type/quiet-garden",
      imageId: "quiet-garden",
    });
    expect(metadata.alternates).toEqual({
      canonical: "https://marry.example/type/quiet-garden",
    });
    expect(metadata.openGraph).toMatchObject({
      images: [
        {
          url: "https://marry.example/og/quiet-garden?v=20261026-open-design",
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
    });
  });
  it("keeps preview deployments unindexed even when they inherit the public origin", () => {
    vi.stubEnv("SITE_URL", "https://marry.example");
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(isPublicSite()).toBe(false);
    expect(sitemap()).toEqual([]);
  });
  it("supports an explicit staging override and excludes local HTTP origins", () => {
    vi.stubEnv("SITE_NOINDEX", "true");
    expect(isPublicSite(new URL("https://marry.example"))).toBe(false);
    vi.stubEnv("SITE_NOINDEX", "false");
    expect(isPublicSite(new URL("http://localhost:4173"))).toBe(false);
  });
});

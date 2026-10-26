import type { Metadata } from "next";
import { PROFILES } from "./quiz";

export const SITE_NAME = "marry test";
export const PRODUCTION_SITE_URL = "https://test.lookatme.my";
export const HOME_TITLE = "결혼 성향 테스트, 나와 잘 살 사람은?";
export const HOME_DESCRIPTION =
  "12개의 일상 질문으로 나의 결혼 스타일과 내가 바라는 동반자를 알아보세요. 약 3분, 가입 없이 참여하고 8가지 결혼 스타일, 관계 취향, 첫 만남에서 나눌 대화 질문을 만나보세요.";

export function getSiteUrl(value = process.env.SITE_URL): URL | null {
  const origin =
    value?.trim() ||
    (process.env.NODE_ENV === "production" ? PRODUCTION_SITE_URL : null);
  if (!origin) return null;
  const url = new URL(origin);
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  )
    throw new Error(
      "SITE_URL must be an HTTP(S) origin without a path, query or credentials.",
    );
  return url;
}

export function isPublicSite(url = getSiteUrl()): boolean {
  return Boolean(
    url &&
    url.protocol === "https:" &&
    !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) &&
    process.env.VERCEL_ENV !== "preview" &&
    process.env.SITE_NOINDEX !== "true",
  );
}

export function publicPaths(): string[] {
  return ["/", "/about", ...PROFILES.map(({ id }) => `/type/${id}`)];
}

export function pageMetadata({
  title,
  description,
  path,
  imageId = "home",
  privatePage = false,
}: {
  title: string;
  description: string;
  path: string;
  imageId?: string;
  privatePage?: boolean;
}): Metadata {
  const site = getSiteUrl();
  const index = isPublicSite(site) && !privatePage;
  const imageUrl = new URL(
    `/og/${imageId}?v=20261026`,
    site ?? PRODUCTION_SITE_URL,
  ).href;
  const images = [
    {
      url: imageUrl,
      ...(imageUrl.startsWith("https:") ? { secureUrl: imageUrl } : {}),
      type: "image/png",
      width: 1200,
      height: 630,
      alt: `${title} | ${SITE_NAME}`,
    },
  ];
  return {
    title,
    description,
    ...(site && !privatePage
      ? { alternates: { canonical: new URL(path, site).href } }
      : {}),
    robots: {
      index,
      follow: !privatePage,
      googleBot: { index, follow: !privatePage, "max-image-preview": "large" },
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      images,
      ...(site && !privatePage ? { url: new URL(path, site).href } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images,
    },
  };
}

export function websiteSchema() {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    inLanguage: "ko-KR",
    description: HOME_DESCRIPTION,
    ...(site ? { "@id": `${site.href}#website`, url: site.href } : {}),
  };
}

export function webpageSchema(path: string, name: string, description: string) {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    inLanguage: "ko-KR",
    ...(site
      ? {
          "@id": new URL(`${path}#webpage`, site).href,
          url: new URL(path, site).href,
          isPartOf: { "@id": `${site.href}#website` },
        }
      : {}),
  };
}

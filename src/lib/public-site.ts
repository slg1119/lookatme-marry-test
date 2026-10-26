// Shared by server metadata and client-side sharing. Never use the current
// browser URL, which may contain private state or a preview/localhost origin.
export const PRODUCTION_SITE_URL = "https://test.lookatme.my";
export const SOCIAL_IMAGE_VERSION = "20261026-open-design";

export function socialImageUrl(
  id: string,
  origin: string | URL = PRODUCTION_SITE_URL,
): string {
  return new URL(`/og/${id}?v=${SOCIAL_IMAGE_VERSION}`, origin).href;
}

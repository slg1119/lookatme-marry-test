import type { Profile } from "./quiz";
import { PRODUCTION_SITE_URL, socialImageUrl } from "./public-site";

export interface KakaoSharePayload {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
    link: { mobileWebUrl: string; webUrl: string };
  };
  buttons: Array<{
    title: string;
    link: { mobileWebUrl: string; webUrl: string };
  }>;
}

export interface KakaoSdk {
  isInitialized(): boolean;
  init(key: string): void;
  Share: { sendDefault(payload: KakaoSharePayload): void };
}

declare global {
  interface Window {
    Kakao?: KakaoSdk;
  }
}

// Same loader/feed pattern as LookAtMe tarot. Official 2.8.4 SRI verified at:
// https://developers.kakao.com/docs/en/tutorial/js-share
export const KAKAO_SDK_URL =
  "https://t1.kakaocdn.net/kakao_js_sdk/2.8.4/kakao.min.js";
export const KAKAO_SDK_INTEGRITY =
  "sha384-BGX7Wb16GmRFagri4bLJV2DgipVZaU2AI812GZtHtHzzDQJnfHasDXN5houxv45w";
let loading: Promise<KakaoSdk | null> | undefined;

export function loadKakaoShare(
  key: string | undefined,
): Promise<KakaoSdk | null> {
  if (!key?.trim() || typeof window === "undefined")
    return Promise.resolve(null);
  const initialize = () => {
    const sdk = window.Kakao;
    if (!sdk) return null;
    if (!sdk.isInitialized()) sdk.init(key);
    return sdk;
  };
  if (window.Kakao) {
    try {
      return Promise.resolve(initialize());
    } catch {
      return Promise.resolve(null);
    }
  }
  if (loading) return loading;
  loading = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.integrity = KAKAO_SDK_INTEGRITY;
    script.crossOrigin = "anonymous";
    script.async = true;
    let settled = false;
    const finish = (sdk: KakaoSdk | null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      script.onload = script.onerror = null;
      if (!sdk) {
        script.remove();
        loading = undefined;
      }
      resolve(sdk);
    };
    const timer = setTimeout(() => finish(null), 10_000);
    script.onload = () => {
      try {
        finish(initialize());
      } catch {
        finish(null);
      }
    };
    script.onerror = () => finish(null);
    document.head.append(script);
  });
  return loading;
}

export function createKakaoSharePayload(profile: Profile): KakaoSharePayload {
  const url = new URL(`/type/${profile.id}`, PRODUCTION_SITE_URL).href;
  const start = new URL("/test", PRODUCTION_SITE_URL).href;
  return {
    objectType: "feed",
    content: {
      title: `나의 결혼 스타일은 ${profile.name}`,
      description: profile.tagline,
      imageUrl: socialImageUrl(profile.id),
      imageWidth: 1200,
      imageHeight: 630,
      link: { mobileWebUrl: url, webUrl: url },
    },
    buttons: [
      { title: "결과 보기", link: { mobileWebUrl: url, webUrl: url } },
      {
        title: "나도 테스트하기",
        link: { mobileWebUrl: start, webUrl: start },
      },
    ],
  };
}

// Keep this synchronous inside the click event so mobile browsers can open
// Kakao. Calling the SDK opens a chooser; it does not prove message delivery.
export function sendKakaoShare(sdk: KakaoSdk, profile: Profile): void {
  sdk.Share.sendDefault(createKakaoSharePayload(profile));
}

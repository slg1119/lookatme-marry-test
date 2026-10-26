import { afterEach, describe, expect, it, vi } from "vitest";
import { PROFILES } from "./quiz";
import {
  createKakaoSharePayload,
  loadKakaoShare,
  sendKakaoShare,
} from "./kakao-share";

afterEach(() => vi.unstubAllGlobals());

describe("Kakao result sharing", () => {
  it.each(PROFILES)(
    "shares only the public $id profile with its matching image",
    (profile) => {
      vi.stubGlobal("window", {
        location: {
          href: "http://localhost:4173/result?answers=private#scores",
        },
      });
      const payload = createKakaoSharePayload(profile);
      const url = `https://test.lookatme.my/type/${profile.id}`;
      expect(payload).toEqual({
        objectType: "feed",
        content: {
          title: `나의 결혼 스타일은 ${profile.name}`,
          description: profile.tagline,
          imageUrl: `https://test.lookatme.my/og/${profile.id}?v=20261026-korean-copy`,
          imageWidth: 1200,
          imageHeight: 630,
          link: { mobileWebUrl: url, webUrl: url },
        },
        buttons: [
          { title: "결과 보기", link: { mobileWebUrl: url, webUrl: url } },
          {
            title: "테스트 하기",
            link: {
              mobileWebUrl: "https://test.lookatme.my/test",
              webUrl: "https://test.lookatme.my/test",
            },
          },
        ],
      });
      expect(JSON.stringify(payload)).not.toMatch(
        /localhost|answers|scores|submissionId|"partner":/,
      );
    },
  );
  it("does not load scripts without a key or outside the browser", async () => {
    expect(await loadKakaoShare(undefined)).toBeNull();
    expect(await loadKakaoShare("fixture-key")).toBeNull();
  });
  it.each([false, true])(
    "reuses an existing SDK and initializes only when needed (%s)",
    async (initialized) => {
      const sdk = {
        isInitialized: () => initialized,
        init: vi.fn(),
        Share: { sendDefault: vi.fn() },
      };
      vi.stubGlobal("window", { Kakao: sdk });
      expect(await loadKakaoShare("fixture-key")).toBe(sdk);
      expect(sdk.init).toHaveBeenCalledTimes(initialized ? 0 : 1);
    },
  );
  it("fails safely when SDK initialization rejects the key", async () => {
    vi.stubGlobal("window", {
      Kakao: {
        isInitialized: () => false,
        init: () => {
          throw new Error("Invalid key");
        },
      },
    });
    expect(await loadKakaoShare("fixture-key")).toBeNull();
  });
  it("dispatches synchronously to preserve the click activation without claiming delivery", () => {
    const sdk = {
      isInitialized: () => true,
      init: vi.fn(),
      Share: { sendDefault: vi.fn() },
    };
    expect(sendKakaoShare(sdk, PROFILES[0])).toBeUndefined();
    expect(sdk.Share.sendDefault).toHaveBeenCalledExactlyOnceWith(
      createKakaoSharePayload(PROFILES[0]),
    );
  });
});

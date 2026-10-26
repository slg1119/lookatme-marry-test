import { test, expect, type Page } from "@playwright/test";
import { KAKAO_SDK_URL, KAKAO_SDK_INTEGRITY, type KakaoSharePayload } from "../src/lib/kakao-share";

declare global {
  interface Window {
    kakaoCalls: KakaoSharePayload[];
    kakaoInitCount: number;
    kakaoHadActivation: boolean;
  }
}

async function installSdk(page: Page, reject = false) {
  await page.addInitScript((reject) => {
    let initialized = false;
    window.kakaoCalls = [];
    window.kakaoInitCount = 0;
    window.Kakao = {
      isInitialized: () => initialized,
      init: () => { initialized = true; window.kakaoInitCount += 1; },
      Share: {
        sendDefault: (payload) => {
          if (reject) throw new Error("QA popup unavailable");
          window.kakaoHadActivation = navigator.userActivation.isActive;
          window.kakaoCalls.push(payload);
        },
      },
    };
  }, reject);
}

test("Kakao shares only the public type, image and two destinations directly from a click", async ({ page }, info) => {
  await installSdk(page);
  let writes = 0;
  await page.route("**/api/marry-test/results", async (route) => { writes += 1; await route.abort(); });
  await page.goto("/type/everyday-soulmate?answers=private#scores");
  const button = page.getByRole("button", { name: "카카오톡으로 공유", exact: true });
  await expect(button).toBeEnabled();
  await button.click();
  const payload = await page.evaluate(() => window.kakaoCalls[0]);
  expect(payload.content).toEqual({
    title: "나의 결혼 스타일은 일상의 단짝",
    description: "별일 없는 하루도, 둘이라서 특별하게.",
    imageUrl: "https://test.lookatme.my/og/everyday-soulmate?v=20261026-light",
    imageWidth: 1200, imageHeight: 630,
    link: { mobileWebUrl: "https://test.lookatme.my/type/everyday-soulmate", webUrl: "https://test.lookatme.my/type/everyday-soulmate" },
  });
  expect(payload.buttons.map(({ title, link }) => [title, link.webUrl])).toEqual([
    ["결과 보기", "https://test.lookatme.my/type/everyday-soulmate"],
    ["나도 테스트하기", "https://test.lookatme.my/test"],
  ]);
  expect(JSON.stringify(payload)).not.toMatch(/private|answers|scores|submissionId|localhost/);
  expect(await page.evaluate(() => window.kakaoHadActivation)).toBe(true);
  await button.click();
  expect(await page.evaluate(() => window.kakaoInitCount)).toBe(1);
  expect(writes).toBe(0);
  await page.getByRole("button", { name: "알림 닫기", exact: true }).click();
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".result-card-wrap").screenshot({ path: `qa/${info.project.name}-kakao-share.png` });
  const original = page.viewportSize()!;
  await page.setViewportSize({ width: 320, height: original.height });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  await expect(button).toBeVisible();
});

test("SDK loads only on a result with official integrity and recovers from failure", async ({ page }) => {
  let requests = 0;
  await page.route(KAKAO_SDK_URL, async (route) => { requests += 1; await route.abort(); });
  await page.goto("/");
  expect(requests).toBe(0);
  await page.goto("/type/quiet-garden");
  await expect(page.getByRole("button", { name: "카카오톡 다시 연결" })).toBeEnabled();
  expect(requests).toBe(1);
  await expect(page.locator(`script[src="${KAKAO_SDK_URL}"]`)).toHaveCount(0);
  await expect(page.getByRole("button", { name: "결과 공유", exact: true })).toBeEnabled();
  await expect(page.getByRole("button", { name: "카드 저장", exact: true })).toBeEnabled();
  await page.evaluate(() => {
    window.kakaoCalls = [];
    window.Kakao = { isInitialized: () => true, init: () => {}, Share: { sendDefault: (payload) => { window.kakaoCalls.push(payload); } } };
  });
  await page.getByRole("button", { name: "카카오톡 다시 연결" }).click();
  await page.getByRole("button", { name: "카카오톡으로 공유", exact: true }).click();
  expect(await page.evaluate(() => window.kakaoCalls[0].content.imageUrl)).toContain("/og/quiet-garden?");
  await expect(page.locator(".kakao-share-error")).toHaveCount(0);
});

test("a stalled SDK times out with a retry and leaves other share actions available", async ({ page }) => {
  await page.clock.install();
  await page.route(KAKAO_SDK_URL, () => {});
  await page.goto("/type/steady-teammate", { waitUntil: "domcontentloaded" });
  const script = page.locator(`script[src="${KAKAO_SDK_URL}"]`);
  await expect(script).toHaveCount(1);
  await expect(script).toHaveAttribute("integrity", KAKAO_SDK_INTEGRITY);
  await expect(script).toHaveAttribute("crossorigin", "anonymous");
  await expect(page.getByRole("button", { name: "카카오톡 준비 중…" })).toBeDisabled();
  await page.clock.fastForward(10_001);
  await expect(page.getByRole("button", { name: "카카오톡 다시 연결" })).toBeEnabled();
  await expect(script).toHaveCount(0);
  await expect(page.getByRole("button", { name: "결과 공유", exact: true })).toBeEnabled();
});

test("a synchronous SDK error keeps the existing copy fallback usable", async ({ page }) => {
  await installSdk(page, true);
  await page.goto("/type/everyday-soulmate?answers=private");
  await page.getByRole("button", { name: "카카오톡으로 공유", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("카카오톡을 열지 못했어요");
  await page.evaluate(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => {} } });
  });
  await page.getByRole("button", { name: "결과 공유", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("결과 링크를 복사했어요");
});

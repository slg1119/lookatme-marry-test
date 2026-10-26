import { test, expect } from "@playwright/test";
import { calculateResult, PROFILES } from "../src/lib/quiz";
import { socialImageUrl } from "../src/lib/public-site";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";

test("controlled API failure retries the same completed answers and public types never submit", async ({
  page,
}) => {
  const submissions: {
    submissionId: string;
    answers: number[];
    quizVersion: string;
  }[] = [];
  let fail = true;
  await page.route("**/api/marry-test/results", async (route) => {
    const body = route.request().postDataJSON();
    submissions.push(body);
    if (fail) {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ message: "Controlled test failure" }),
      });
      return;
    }
    const result = calculateResult(body.answers);
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        id: "0cc2b0c3-aab1-4c7a-a6cf-6ca9ada63a65",
        submissionId: body.submissionId,
        quizVersion: body.quizVersion,
        createdAt: "2026-10-26T03:00:00.000Z",
        result: {
          profileId: result.profile.id,
          self: result.self,
          partner: result.partner,
        },
      }),
    });
  });
  await page.goto("/test");
  for (let i = 0; i < 12; i++) {
    await page
      .getByRole("radio")
      .nth(i % 4)
      .check();
    await page
      .getByRole("button", {
        name: i === 11 ? "나의 결과 만나보기" : "다음 질문",
        exact: true,
      })
      .click();
  }
  await expect(page.getByTestId("result-storage")).toHaveClass(/error/);
  await expect(page.getByTestId("result-storage")).toHaveText("저장 다시 시도");
  const first = submissions[0];
  expect(first.answers).toEqual(Array.from({ length: 12 }, (_, i) => i % 4));
  fail = false;
  await page
    .getByRole("button", { name: "저장 다시 시도", exact: true })
    .click();
  await expect(page.getByTestId("result-storage")).toContainText(
    "결과가 안전하게 저장됐어요.",
  );
  await page.reload();
  await expect(page.getByTestId("result-storage")).toContainText(
    "결과가 안전하게 저장됐어요.",
  );
  expect(submissions.length).toBeGreaterThanOrEqual(3);
  for (const submission of submissions) expect(submission).toEqual(first);
  const count = submissions.length;
  await page.goto(`/type/${calculateResult(first.answers).profile.id}`);
  await expect(page.getByTestId("result-storage")).toHaveCount(0);
  await expect(page.locator(".axis-list")).toHaveCount(0);
  await expect(page.locator(".partner-section li")).toHaveCount(0);
  expect(submissions).toHaveLength(count);
});

test("native sharing sends one readable message with a separate, public-only link line", async ({
  page,
}) => {
  await page.goto("/type/reliable-companion?utm_source=private-value#private-state");
  await page.evaluate(() => {
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: async (data: ShareData) => {
        (window as typeof window & { sharedResult?: ShareData }).sharedResult = data;
      },
    });
  });
  await page.getByRole("button", { name: "결과 공유", exact: true }).click();
  const payload = await page.evaluate(
    () => (window as typeof window & { sharedResult?: ShareData }).sharedResult,
  );
  expect(payload?.text).toBe(
    `나의 결혼 스타일은 ‘나란한 동반자’\n각자의 하루를 존중하고, 필요한 순간 나란히.\n\n당신의 결혼 스타일은?\n${new URL("/type/reliable-companion", page.url())}`,
  );
  expect(payload?.url).toBeUndefined();
  expect(payload?.text?.match(/https?:\/\//g)).toHaveLength(1);
});

test("narrow and tablet layouts keep primary controls inside the viewport", async ({
  page,
}) => {
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ["/", "/test", "/type/quiet-garden", "/about"]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("h1")).toBeVisible();
      const overflow = await page
        .locator(
          "main button, main a, main input, main h1, main h2, main p, main fieldset",
        )
        .evaluateAll((elements) =>
          elements.flatMap((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            if (
              !rect.width ||
              !rect.height ||
              style.visibility === "hidden" ||
              style.position === "absolute"
            )
              return [];
            return rect.left < -1 || rect.right > innerWidth + 1
              ? [
                  {
                    text: element.textContent?.slice(0, 60),
                    left: rect.left,
                    right: rect.right,
                  },
                ]
              : [];
          }),
        );
      expect(overflow, `${path} at ${width}px`).toEqual([]);
    }
  }
});

test("every public style exports its artwork and preserves canonical SEO", async ({
  page,
  request,
}, info) => {
  await mkdir("qa/redesign", { recursive: true });
  const pngSize = (png: Buffer) => [png.readUInt32BE(16), png.readUInt32BE(20)];
  for (const profile of PROFILES) {
    await page.goto(`/type/${profile.id}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      profile.name,
    );
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count()) {
      await expect(canonical).toHaveAttribute(
        "href",
        `https://test.lookatme.my/type/${profile.id}`,
      );
    } else {
      // An unconfigured development server deliberately emits no canonical.
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
    }
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      socialImageUrl(profile.id),
    );
    const pending = page.waitForEvent("download");
    await page.getByRole("button", { name: "카드 저장", exact: true }).click();
    const download = await pending;
    expect(download.suggestedFilename()).toBe(`marry-test-${profile.id}.png`);
    const png = await readFile((await download.path())!);
    expect(pngSize(png)).toEqual([1080, 1350]);
    expect(png.length).toBeGreaterThan(20000);
    if (info.project.name === "desktop") {
      await writeFile(`qa/redesign/card-${profile.id}.png`, png);
      const og = await request.get(`/og/${profile.id}`);
      expect(og.status()).toBe(200);
      expect(pngSize(await og.body())).toEqual([1200, 630]);
      await writeFile(`qa/redesign/og-${profile.id}.png`, await og.body());
    }
  }
  const homeOg = await request.get("/og/home");
  expect(homeOg.status()).toBe(200);
  expect(pngSize(await homeOg.body())).toEqual([1200, 630]);
  if (info.project.name === "desktop")
    await writeFile("qa/redesign/og-home.png", await homeOg.body());
  expect((await request.get("/og/not-a-profile")).status()).toBe(404);
  const sitemap = await request.get("/sitemap.xml");
  const sitemapText = await sitemap.text();
  const robots = await (await request.get("/robots.txt")).text();
  if (sitemapText.includes("<loc>")) {
    for (const profile of PROFILES)
      expect(sitemapText).toContain(`/type/${profile.id}`);
    expect(robots).toContain("Sitemap:");
  } else expect(robots).toContain("Disallow: /");
});

test("about and longest public title remain accessible with keyboard and reduced motion", async ({
  page,
}, info) => {
  const scans = [];
  for (const path of ["/about", "/type/free-spirited-friend"]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    scans.push({
      path,
      violations: results.violations,
      incomplete: results.incomplete,
    });
    expect(results.violations).toEqual([]);
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    ).toBe("auto");
    await page.getByRole("link", { name: "본문으로 이동" }).focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
    const shortControls = await page
      .locator("header button, header a, footer button, footer a, main .button")
      .evaluateAll((elements) =>
        elements
          .filter(
            (el) =>
              el.getBoundingClientRect().height > 0 &&
              el.getBoundingClientRect().height < 44,
          )
          .map((el) => el.textContent),
      );
    expect(shortControls).toEqual([]);
  }
  await writeFile(
    `qa/${info.project.name}-additional-accessibility.json`,
    JSON.stringify(scans, null, 2),
  );
});

import { test, expect, type Page } from "@playwright/test";

test.skip(
  process.env.MARRY_API_E2E !== "1",
  "Requires the real local NestJS API and PostgreSQL; see README.",
);

async function complete(page: Page) {
  await page
    .getByRole("button", { name: "나의 결혼상대 알아보기", exact: true })
    .click();
  for (let i = 0; i < 12; i++) {
    await page
      .getByRole("radio")
      .nth(i < 6 ? 0 : 3)
      .check();
    await page
      .getByRole("button", {
        name: i === 11 ? "나의 결과 만나보기" : "다음 질문",
        exact: true,
      })
      .click();
  }
}

test("real API: complete, save, reload idempotently; shared page never submits", async ({
  page,
}, info) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto("/");
  const response = page.waitForResponse(
    (r) => r.url().endsWith("/marry-test/results") && r.status() === 201,
  );
  await complete(page);
  await expect(page.getByTestId("result-storage")).toContainText(
    "결과가 안전하게 저장됐어요.",
  );
  const receipt = await (await response).json();
  expect(receipt.result).toEqual({
    profileId: "everyday-soulmate",
    self: { pace: -100, closeness: -100, care: -100 },
    partner: { pace: 100, closeness: 100, care: 100 },
  });
  const reloadResponse = page.waitForResponse(
    (r) => r.url().endsWith("/marry-test/results") && r.status() === 201,
  );
  await page.reload();
  await expect(page.getByTestId("result-storage")).toContainText(
    "결과가 안전하게 저장됐어요.",
  );
  const reloaded = await (await reloadResponse).json();
  expect(reloaded.id).toBe(receipt.id);
  expect(reloaded.submissionId).toBe(receipt.submissionId);
  await page.screenshot({
    path: `qa/${info.project.name}-api-saved.png`,
    fullPage: true,
    animations: "disabled",
    scale: "css",
  });
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith("/marry-test/results"))
      requests.push(request.method());
  });
  await page.goto("/type/everyday-soulmate");
  await expect(page.getByTestId("result-storage")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { level: 1 }),
  ).toBeVisible();
  expect(requests).toEqual([]);
  expect(pageErrors).toEqual([]);
  await info.attach("real-api-receipt", {
    body: JSON.stringify(receipt),
    contentType: "application/json",
  });
});

test("real API: network failure keeps answers and retry uses the same submission key", async ({
  page,
}, info) => {
  const submissions: string[] = [];
  let fail = true;
  await page.route("**/api/marry-test/results", async (route) => {
    submissions.push(route.request().postDataJSON().submissionId);
    if (fail) await route.abort("failed");
    else await route.continue();
  });
  await page.goto("/");
  await complete(page);
  await expect(page.getByTestId("result-storage")).toHaveClass(/error/);
  await expect(
    page.getByRole("button", { name: "저장 다시 시도", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: `qa/${info.project.name}-api-retry.png`,
    fullPage: true,
    animations: "disabled",
    scale: "css",
  });
  fail = false;
  await page
    .getByRole("button", { name: "저장 다시 시도", exact: true })
    .click();
  await expect(page.getByTestId("result-storage")).toContainText(
    "결과가 안전하게 저장됐어요.",
  );
  expect(submissions.length).toBeGreaterThanOrEqual(2);
  expect(new Set(submissions).size).toBe(1);
  expect(
    await page.evaluate(
      () => JSON.parse(sessionStorage.getItem("marry-test:v1")!).answers,
    ),
  ).toHaveLength(12);
});

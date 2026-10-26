import { test, expect } from "@playwright/test";

test("Next.js renders share content on the server and preserves legacy hash links", async ({
  page,
  request,
}) => {
  const home = await request.get("/");
  expect(home.status()).toBe(200);
  expect(await home.text()).toContain("어떤 사람과,");
  const shared = await request.get("/type/everyday-soulmate");
  expect(shared.status()).toBe(200);
  const html = await shared.text();
  expect(html).toContain("일상의 단짝");
  expect(html).toContain("<title>일상의 단짝 | marry test</title>");
  await page.goto("/#/type/everyday-soulmate");
  await expect(page).toHaveURL(
    (url) => url.pathname === "/type/everyday-soulmate" && !url.hash,
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "일상의 단짝",
  );
  await page.goto("/#/test");
  await expect(page).toHaveURL((url) => url.pathname === "/test" && !url.hash);
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "1",
  );
});

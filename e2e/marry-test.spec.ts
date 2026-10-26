import { test as base, expect, type Page, type TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { calculateResult } from '../src/lib/quiz';

const evidence = path.resolve('qa');
const test = base.extend<{ browserHealth: void }>({
  browserHealth: [async ({ page, context }, use, info) => {
    const errors: string[] = [];
    const observe = (target: Page) => {
      target.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
      target.on('console', message => { if (message.type() === 'error' && !(message.location().url.includes('/type/not-a-profile') && message.text().includes('404'))) errors.push(`console: ${message.text()}`); });
    };
    // UI suite is independent of a running API; real PostgreSQL flow lives in result-storage.spec.ts.
    await context.route('**/api/marry-test/results', async route => {
      const body = route.request().postDataJSON();
      const result = calculateResult(body.answers);
      await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({
        id: '0cc2b0c3-aab1-4c7a-a6cf-6ca9ada63a65', submissionId: body.submissionId,
        quizVersion: body.quizVersion, createdAt: '2026-10-26T03:00:00.000Z',
        result: {profileId: result.profile.id, self: result.self, partner: result.partner},
      }) });
    });
    observe(page);
    context.on('page', observe);
    await use();
    await info.attach('browser-errors', { body: JSON.stringify(errors), contentType: 'application/json' });
    expect(errors, 'Browser runtime and console errors').toEqual([]);
  }, { auto: true }],
});

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth })))
    .toEqual(expect.objectContaining({ content: await page.evaluate(() => window.innerWidth) }));
}

async function screenshot(page: Page, info: TestInfo, name: string) {
  await mkdir(evidence, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(evidence, `${info.project.name}-${name}.png`), fullPage: true, animations: 'disabled', scale: 'css' });
  await noOverflow(page);
  if (name === 'home' && info.project.name === 'desktop') {
    await page.screenshot({ path: path.join(evidence, 'desktop-preview.png'), animations: 'disabled', scale: 'css' });
  }
  if (['home', 'question', 'result'].includes(name)) {
    const viewport = page.viewportSize()!;
    await page.setViewportSize({ width: 320, height: viewport.height });
    await noOverflow(page);
    await page.setViewportSize(viewport);
  }
}

async function completeTest(page: Page) {
  await page.getByRole('button', { name: '나의 결혼상대 알아보기', exact: true }).click();
  for (let i = 0; i < 12; i++) {
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', String(i + 1));
    await page.getByRole('radio').nth(i < 6 ? 0 : 3).check();
    await page.getByRole('button', { name: i === 11 ? '나의 결과 만나보기' : '다음 질문', exact: true }).click();
  }
  await expect(page).toHaveURL(/\/result$/);
  await expect(page.getByRole('heading', { name: '곁에 이런 사람이 있다면' })).toBeVisible();
}

test('12 answers, editing, refresh, resume, result navigation, and restart', async ({ page }, info) => {
  await page.goto('/');
  await screenshot(page, info, 'home');
  await page.getByRole('button', { name: '나의 결혼상대 알아보기', exact: true }).click();
  await expect(page.getByRole('button', { name: '다음 질문', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: '이전 질문', exact: true })).toBeDisabled();
  await page.getByRole('radio').nth(0).check();
  await page.getByRole('button', { name: '다음 질문', exact: true }).click();
  await page.getByRole('button', { name: '이전 질문', exact: true }).click();
  await expect(page.getByRole('radio').nth(0)).toBeChecked();
  await page.getByRole('radio').nth(3).check();
  await page.getByRole('button', { name: '다음 질문', exact: true }).click();
  await page.getByRole('radio').nth(1).check();
  await page.reload();
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');
  await expect(page.getByRole('radio').nth(1)).toBeChecked();
  await page.getByRole('button', { name: '잠시 쉬어가기', exact: true }).click();
  await page.getByRole('button', { name: /2개의 답변이 남아 있어요/ }).click();
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');
  await page.getByRole('button', { name: '다음 질문', exact: true }).click();
  await screenshot(page, info, 'question');
  for (let i = 2; i < 12; i++) {
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', String(i + 1));
    await page.getByRole('radio').nth(i % 4).check();
    await page.getByRole('button', { name: i === 11 ? '나의 결과 만나보기' : '다음 질문', exact: true }).click();
  }
  await expect(page).toHaveURL(/\/result$/);
  await expect(page.getByRole('heading', { name: '내 마음의 세 가지 방향' })).toBeVisible();
  await expect(page.locator('.partner-section li')).toHaveCount(3);
  await expect(page.locator('.conversation-grid article')).toHaveCount(3);
  await screenshot(page, info, 'result');
  await page.getByRole('link', { name: '본문으로 이동' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/result$/);
  await expect(page.locator('#main-content')).toBeFocused();
  await page.getByRole('button', { name: '결혼 스타일', exact: true }).click();
  await expect(page).toHaveURL(/\/#types$/);
  await expect(page.locator('#types')).toBeInViewport();
  await page.getByRole('button', { name: '지난 결과 다시 보기' }).click();
  await expect(page).toHaveURL(/\/result$/);
  await page.getByRole('button', { name: '처음부터 다시 해보기' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: '돌아가기', exact: true }).click();
  await expect(page).toHaveURL(/\/result$/);
  await page.getByRole('button', { name: '처음부터 다시 해보기' }).click();
  await page.getByRole('button', { name: '처음부터 시작', exact: true }).click();
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
  await expect(page.locator('input[type="radio"]:checked')).toHaveCount(0);
  await expect(page.getByRole('button', { name: '다음 질문', exact: true })).toBeDisabled();
});

test('all eight previews, modal dismissal, and test information', async ({ page }, info) => {
  await page.goto('/');
  const cards = page.locator('.type-card');
  await expect(cards).toHaveCount(8);
  for (let i = 0; i < 8; i++) {
    const name = await cards.nth(i).locator('h3').innerText();
    await cards.nth(i).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog').getByRole('heading', { name, exact: true })).toBeVisible();
    await noOverflow(page);
    if (i === 0) await screenshot(page, info, 'preview-modal');
    if (i % 2 === 0) await page.getByRole('button', { name: '닫기', exact: true }).click();
    else await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await expect(cards).toHaveCount(8);
  await page.getByRole('button', { name: '테스트 안내', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('답변과 결과를 룩앳미 서버에 익명으로 저장해요');
  await page.getByRole('button', { name: '알겠어요', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: '3분이면 충분해요', exact: true }).click();
  await expect(page).toHaveURL(/\/test$/);
});

test('PNG download and privacy-preserving copy/manual share paths', async ({ page, context }, info) => {
  await page.goto('/?utm_source=private-value');
  await completeTest(page);
  const traits = await page.locator('.partner-section li').allTextContents();
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (text: string) => { (window as typeof window & { copiedLink?: string }).copiedLink = text; } } });
  });
  await page.getByRole('button', { name: '결과 공유', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('결과 링크를 복사했어요');
  const link = await page.evaluate(() => (window as typeof window & { copiedLink?: string }).copiedLink!);
  expect(new URL(link).search).toBe('');
  expect(new URL(link).pathname).toMatch(/^\/type\/[a-z-]+$/);
  expect(new URL(link).hash).toBe('');
  expect(link).not.toContain('private-value');
  const shared = await context.newPage();
  await shared.goto(link);
  await expect(shared.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(shared.getByRole('heading', { name: '내 마음의 세 가지 방향' })).toHaveCount(0);
  await expect(shared.locator('.partner-section li')).toHaveCount(0);
  for (const trait of traits) await expect(shared.locator('main')).not.toContainText(trait);
  await expect(shared.getByRole('heading', { name: '나에게 맞는 동반자는?' })).toBeVisible();
  await screenshot(shared, info, 'shared');
  await shared.close();
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('QA clipboard unavailable'); } } }));
  await page.getByRole('button', { name: '결과 공유', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '공유할 결과 링크' })).toHaveValue(link);
  await page.getByRole('button', { name: '확인했어요' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: '카드 저장', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^marry-test-[a-z-]+\.png$/);
  const filename = path.join(evidence, `${info.project.name}-download.png`);
  await download.saveAs(filename);
  const png = await readFile(filename);
  expect(png.subarray(1, 4).toString()).toBe('PNG');
  expect(png.readUInt32BE(16)).toBe(1080);
  expect(png.readUInt32BE(20)).toBe(1350);
  await expect(page.getByRole('status')).toContainText('결과 카드를 저장했어요');
});

test('malformed URLs and invalid session data recover without a crash', async ({ page }) => {
  await page.goto('/type/not-a-profile');
  await expect(page.getByRole('heading', { name: '이 이야기는 아직 없어요.' })).toBeVisible();
  await page.goto('/result');
  await expect(page.getByRole('button', { name: '나의 결혼상대 알아보기', exact: true })).toBeVisible();
  const invalidSessions = ['not-json', JSON.stringify({ answers: [99], step: 0 }), JSON.stringify({ answers: [0], step: 9 }), JSON.stringify({ answers: [null], step: 0 }), JSON.stringify({ answers: Array(13).fill(0), step: 0 })];
  for (const session of invalidSessions) {
    await page.evaluate(value => sessionStorage.setItem('marry-test:v1', value), session);
    await page.goto('/test');
    await page.reload();
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
    await expect(page.getByRole('button', { name: '다음 질문', exact: true })).toBeDisabled();
  }
  await page.evaluate(() => sessionStorage.setItem('marry-test:v1', JSON.stringify({ answers: [0], step: 1, complete: true })));
  await page.goto('/result');
  await page.reload();
  await expect(page.getByRole('button', { name: '나의 결혼상대 알아보기', exact: true })).toBeVisible();
});

test('WCAG A/AA scans on home, modal, question, and completed result', async ({ page }, info) => {
  const scans: { state: string; violations: unknown[]; incomplete: unknown[] }[] = [];
  const scan = async (state: string) => {
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    scans.push({ state, violations: result.violations, incomplete: result.incomplete });
  };
  await page.goto('/');
  await scan('home');
  await page.locator('.type-card').first().click();
  await scan('preview');
  await page.getByRole('button', { name: '닫기', exact: true }).click();
  await page.getByRole('button', { name: '나의 결혼상대 알아보기', exact: true }).click();
  await scan('question');
  for (let i = 0; i < 12; i++) {
    await page.getByRole('radio').nth(i % 4).check();
    await page.getByRole('button', { name: i === 11 ? '나의 결과 만나보기' : '다음 질문', exact: true }).click();
  }
  await scan('result');
  await writeFile(path.join(evidence, `${info.project.name}-accessibility.json`), JSON.stringify(scans, null, 2));
  const failures = scans.flatMap(scan => scan.violations.map(violation => {
    const item = violation as { id: string; nodes: { target: string[] }[] };
    return { state: scan.state, rule: item.id, targets: item.nodes.map(node => node.target) };
  }));
  expect(failures, 'Full accessibility detail is saved in qa/<device>-accessibility.json').toEqual([]);
});

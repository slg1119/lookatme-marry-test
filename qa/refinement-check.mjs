import { chromium, webkit, devices } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const results = [];
for (const [name, engine, use] of [
  ['desktop', chromium, { viewport: { width: 1440, height: 1000 } }],
  ['android', chromium, { ...devices['Pixel 7'], viewport: { width: 412, height: 915 } }],
  ['iphone', webkit, { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } }],
]) {
  const browser = await engine.launch();
  try {
    const errors = [];
    const observe = page => {
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    };
    const coldContext = await browser.newContext({ ...use, reducedMotion: 'reduce', acceptDownloads: true });
    const cold = await coldContext.newPage();
    observe(cold);
    await cold.goto('http://127.0.0.1:4173/#/type/everyday-soulmate');
    const downloading = cold.waitForEvent('download');
    await cold.getByRole('button', { name: '카드 저장', exact: true }).click();
    const download = await downloading;
    const pngPath = `qa/${name}-download.png`;
    await download.saveAs(pngPath);
    const png = await readFile(pngPath);
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(png.readUInt32BE(16), 1080);
    assert.equal(png.readUInt32BE(20), 1350);
    const fontsReady = await cold.evaluate(() =>
      document.fonts.check('500 57px "Noto Serif KR"', '일상의 단짝') &&
      document.fonts.check('30px "Pretendard Variable"', '나와 잘 살 사람을 알아가는 작은 여행') &&
      document.fonts.check('500 36px "DM Sans Variable"', 'marry test'));
    assert.equal(fontsReady, true);
    await coldContext.close();

    const context = await browser.newContext({ ...use, reducedMotion: 'reduce' });
    const page = await context.newPage();
    observe(page);
    await page.goto('http://127.0.0.1:4173/');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `qa/${name}-home.png`, fullPage: true, animations: 'disabled', scale: 'css' });
    if (name === 'desktop') await page.screenshot({ path: 'qa/desktop-preview.png', animations: 'disabled', scale: 'css' });
    const art = await page.evaluate(() => {
      document.querySelector('.paper-caption').scrollIntoView({ block: 'center', behavior: 'instant' });
      const note = document.querySelector('.art-note').getBoundingClientRect();
      const coveredCharacters = [];
      const textBottom = Math.max(...Array.from(document.querySelectorAll('.paper-caption > *'), element => {
        const text = element.firstChild;
        for (let i = 0; i < text.textContent.length; i++) {
          const character = document.createRange();
          character.setStart(text, i);
          character.setEnd(text, i + 1);
          const bounds = character.getBoundingClientRect();
          const top = document.elementFromPoint((bounds.left + bounds.right) / 2, (bounds.top + bounds.bottom) / 2);
          if (top?.closest('.art-note')) coveredCharacters.push(text.textContent[i]);
        }
        const range = document.createRange();
        range.selectNodeContents(element);
        return range.getBoundingClientRect().bottom;
      }));
      return { noteTop: note.top, captionTextBottom: textBottom, rotatedBoundingBoxGap: note.top - textBottom, coveredCharacters };
    });
    assert.deepEqual(art.coveredCharacters, [], `${name}: note obscures caption characters`);
    await page.setViewportSize({ width: 320, height: use.viewport.height });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    assert.equal(overflow, false);
    await page.setViewportSize(use.viewport);
    let accessibility;
    if (name === 'desktop') {
      const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      accessibility = { violations: scan.violations, incomplete: scan.incomplete };
      assert.equal(scan.violations.length, 0);
    }
    assert.deepEqual(errors, []);
    results.push({ name, coldSharedDownload: pngPath, png: { width: 1080, height: 1350 }, fontsReady, art, narrow320Overflow: overflow, errors, ...(accessibility ? { accessibility } : {}) });
    console.log(`${name}: cold PNG, fonts, hero text visibility, 320px overflow passed`);
  } finally {
    await browser.close();
  }
}
await writeFile('qa/refinement-results.json', JSON.stringify({ date: new Date().toISOString(), results }, null, 2));

// Админка по коду: резервные копии, ручное восстановление, сброс только через код.
// Run: node tests/admin.test.mjs (static server on :8080)
import { createRequire } from 'module';
import assert from 'assert/strict';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080/';
const SHOTS = process.env.SHOTS_DIR || 'docs/screenshots';
const results = [];
const step = async (name, fn) => {
  try { await fn(); results.push(['OK', name]); console.log(`  ✔ ${name}`); } catch (e) { results.push(['FAIL', name]); console.log(`  ✘ ${name}\n    ${String(e.message).split('\n').join('\n    ')}`); }
};
const browser = await chromium.launch();
console.log('Админка');
const ctx = await browser.newContext({ viewport: { width: 360, height: 800 } });
const page = await ctx.newPage();
const errors = []; page.on('pageerror', (e) => errors.push(e.message));
await page.goto(BASE);

const play = async (n) => {
  await page.evaluate(() => window.__game.go('topic:math-1-1'));
  if (await page.$('[data-testid=skip-explain]')) { await page.click('[data-testid=skip-explain]'); await page.click('[data-testid=explain-next]'); }
  for (let i = 0; i < n; i += 1) {
    await page.waitForSelector('[data-testid=option]:not([disabled])');
    await page.locator('[data-testid=option]').first().click();
    await page.click('[data-testid=next-question]');
  }
};
const openAdmin = async (code = '6725') => {
  await page.evaluate(() => window.__game.go('admin'));
  if (await page.$('[data-testid=admin-code]')) { await page.fill('[data-testid=admin-code]', code); await page.click('[data-testid=admin-enter]'); }
};

await step('Без кода в админку не попасть; сброса прогресса нет в настройках у ребёнка', async () => {
  await page.click('[data-testid=start]');
  await page.fill('[data-testid=child-name]', 'Маша'); await page.fill('[data-testid=kitten-name]', 'Пушок'); await page.click('[data-testid=setup-done]');
  await page.evaluate(() => window.__game.go('settings'));
  assert.equal(await page.$('[data-testid=reset]'), null, 'кнопки сброса нет в настройках');
  await openAdmin('1111');
  assert.equal((await page.textContent('[data-testid=admin-error]')).trim(), 'Неверный код');
  assert.equal(await page.$('[data-testid=admin]'), null);
  await page.evaluate(() => window.__game.go('reset'));
  assert.ok(await page.$('[data-testid=admin-lock]'), 'сброс просит код');
});

await step('Код 6725 → админка; прогресс пропал → восстановление из резервной копии', async () => {
  await play(10); // finish topic 1 → a backup is made
  const before = await page.evaluate(() => JSON.stringify({ t: window.__game.progress.topics['math-1-1'], c: window.__game.progress.coins }));
  // simulate a lost save (browser cleared the main key, backups survive in IndexedDB)
  await page.evaluate(() => { localStorage.removeItem('kidsgame.progress.v1'); localStorage.removeItem('kidsgame.backups.v1'); });
  await page.reload();
  assert.equal((await page.textContent('[data-testid=start]')).trim(), 'Начать игру', 'прогресс пропал');
  await page.click('[data-testid=admin-open]');
  await page.fill('[data-testid=admin-code]', '6725'); await page.click('[data-testid=admin-enter]');
  await page.waitForSelector('[data-testid=admin-backups]');
  assert.match(await page.textContent('[data-testid=admin-backups] li'), /Маша.*тем пройдено: 1/);
  await page.locator('[data-testid=admin-restore]').first().click();
  await page.waitForSelector('[data-testid=admin-msg]');
  const after = await page.evaluate(() => JSON.stringify({ t: window.__game.progress.topics['math-1-1'], c: window.__game.progress.coins }));
  assert.equal(after, before, 'прогресс восстановлен как был');
  await page.reload();
  assert.equal((await page.textContent('[data-testid=start]')).trim(), 'Продолжить', 'восстановленное сохранилось');
});

await step('Ручное восстановление: остров 2, город 3, 2 темы → всё раньше пройдено, нужный город открыт', async () => {
  await openAdmin();
  await page.fill('[data-testid=admin-child]', 'Петя'); await page.fill('[data-testid=admin-kitten]', 'Барсик');
  await page.selectOption('[data-testid=admin-island]', '2');
  await page.selectOption('[data-testid=admin-city]', '2');
  await page.selectOption('[data-testid=admin-topics]', '2');
  await page.click('[data-testid=admin-apply]');
  await page.waitForSelector('[data-testid=admin-msg]');
  await page.screenshot({ path: `${SHOTS}/admin-mobile.png`, fullPage: true });
  const r = await page.evaluate(() => { const p = window.__game.progress; return { name: p.profile.childName, isl: p.islandsPassed, n: Object.values(p.topics).filter((t) => t.done).length, coins: p.coins }; });
  assert.equal(r.name, 'Петя');
  assert.deepEqual(r.isl, { 1: true });
  assert.equal(r.n, 21 + 4 + 5 + 2, 'остров 1 (21) + математика 2 (4) + английский 2 (5) + 2 темы науки');
  assert.equal(r.coins, r.n * 10);
  await page.evaluate(() => window.__game.go('city:science-2'));
  assert.match(await page.textContent('[data-testid=next-topic]'), /Тема 3/);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 360, 'без горизонтальной прокрутки');
});

await step('Сброс из админки оставляет копию — её можно вернуть', async () => {
  await openAdmin();
  page.once('dialog', (d) => d.accept());
  await page.click('[data-testid=reset]');
  await page.waitForSelector('[data-testid=start]');
  assert.equal((await page.textContent('[data-testid=start]')).trim(), 'Начать игру');
  await openAdmin();
  assert.match(await page.textContent('[data-testid=admin-backups] li'), /Петя/);
  await page.locator('[data-testid=admin-restore]').first().click();
  await page.waitForSelector('[data-testid=admin-msg]');
  assert.equal(await page.evaluate(() => window.__game.progress.profile.childName), 'Петя');
  assert.deepEqual(errors, []);
});

await browser.close();
const ok = results.filter((r) => r[0] === 'OK').length;
console.log(`\n${ok}/${results.length} проверок пройдено`);
process.exit(ok === results.length ? 0 : 1);

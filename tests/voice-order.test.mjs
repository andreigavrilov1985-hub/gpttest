// Котёнок говорит вслух; у каждой попытки свой порядок вопросов.
// Run: node tests/voice-order.test.mjs (static server on :8080)
import { createRequire } from 'module';
import { readFileSync } from 'fs';
import assert from 'assert/strict';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080/';
const results = [];
const step = async (name, fn) => {
  try { await fn(); results.push(['OK', name]); console.log(`  ✔ ${name}`); } catch (e) { results.push(['FAIL', name]); console.log(`  ✘ ${name}\n    ${String(e.message).split('\n').join('\n    ')}`); }
};
// fake Russian voice: every line "lasts" 1.5 s
const fakeVoice = () => {
  window.__said = [];
  const voice = { lang: 'ru-RU', name: 'Test' };
  let cur = null; let timer = null;
  Object.defineProperty(window, 'speechSynthesis', { value: {
    getVoices: () => [voice], addEventListener() {},
    cancel() { clearTimeout(timer); if (cur) { const c = cur; cur = null; c.onerror && c.onerror(); } },
    speak(u) { cur = u; window.__said.push(u.text); timer = setTimeout(() => { cur = null; u.onend && u.onend(); }, 1500); },
  } });
  window.SpeechSynthesisUtterance = function U(t) { this.text = t; };
};
async function newPage(browser, voice) {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 800 } });
  const page = await ctx.newPage();
  page.errors = []; page.on('pageerror', (e) => page.errors.push(e.message));
  if (voice) await page.addInitScript(fakeVoice);
  await page.goto(BASE);
  await page.click('[data-testid=start]');
  await page.fill('[data-testid=child-name]', 'Маша'); await page.fill('[data-testid=kitten-name]', 'Пушок');
  await page.click('[data-testid=setup-done]');
  return page;
}

const browser = await chromium.launch();
console.log('Голос котёнка и порядок вопросов');

await step('Порядок вопросов: каждая попытка перемешана и не равна прошлой; вопросы к одному тексту идут подряд', async () => {
  const page = await newPage(browser, false);
  const bank = JSON.parse(readFileSync('data/english-island5.json', 'utf8'));
  for (const id of ['math-1-1', 'english-5-3', 'english-5-5']) {
    const topic = id.startsWith('math') ? JSON.parse(readFileSync('data/math-island1.json', 'utf8')).topics[0] : bank.topics.find((t) => t.id === id);
    const orders = [];
    for (let k = 0; k < 6; k += 1) {
      await page.evaluate((t) => window.__game.go(`topic:${t}`), id);
      orders.push(await page.evaluate(() => window.__game.progress.session.order));
    }
    for (const o of orders) assert.deepEqual([...o].sort(), topic.questions.map((q) => q.id).sort(), 'все 10 вопросов');
    for (let k = 1; k < orders.length; k += 1) if (id === 'math-1-1') assert.notDeepEqual(orders[k], orders[k - 1], 'повтор не совпадает с прошлой попыткой');
    assert.ok(new Set(orders.map((o) => o.join())).size >= 2, 'порядок меняется');
    const pas = Object.fromEntries(topic.questions.map((q) => [q.id, q.passage || null]));
    for (const o of orders) {
      const seen = []; // passage blocks must be contiguous and keep their own order
      o.forEach((qid, i) => { const ps = pas[qid]; if (ps && (i === 0 || pas[o[i - 1]] !== ps)) { assert.ok(!seen.includes(ps), `текст ${ps} разорван`); seen.push(ps); } });
      const src = topic.questions.map((q) => q.id);
      for (const ps of seen) { const inO = o.filter((x) => pas[x] === ps); assert.deepEqual(inO, src.filter((x) => pas[x] === ps)); }
    }
  }
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

await step('Голос: котёнок читает свою фразу, реакцию на ответ и субтитры мультика; мультик ждёт, пока он договорит', async () => {
  const page = await newPage(browser, true);
  await page.evaluate(() => { window.__said.length = 0; window.__game.go('topic:math-5-1'); });
  const cap0 = await page.textContent('[data-testid=scene-caption]');
  await page.waitForTimeout(1200);
  const t = Number(await page.getAttribute('[data-testid=scene-stage]', 'data-t'));
  assert.ok(t < 1400, `мультик ждёт голос у следующего субтитра (t=${t})`);
  assert.equal(await page.textContent('[data-testid=scene-caption]'), cap0);
  await page.waitForFunction(() => window.__said.length >= 2, null, { timeout: 8000 });
  await page.click('[data-testid=skip-explain]'); await page.click('[data-testid=explain-next]');
  await page.waitForSelector('[data-testid=option]');
  const n = await page.evaluate(() => window.__said.length);
  await page.locator('[data-testid=option]').first().click();
  await page.waitForFunction((k) => window.__said.length > k, n);
  const last = await page.evaluate(() => window.__said[window.__said.length - 1]);
  assert.ok((await page.textContent('[data-testid=fb-line]')).includes(last.split(' ')[0]), 'озвучена фраза-реакция');
  // switch off in settings
  await page.evaluate(() => window.__game.go('settings'));
  await page.click('[data-testid=voice-toggle]');
  assert.equal(await page.getAttribute('[data-testid=voice-toggle]', 'aria-pressed'), 'false');
  const m = await page.evaluate(() => window.__said.length);
  await page.evaluate(() => window.__game.go('topic:math-1-1'));
  await page.waitForTimeout(800);
  assert.equal(await page.evaluate(() => window.__said.length), m, 'выключенный котёнок молчит');
  assert.equal(await page.evaluate(() => window.__game.progress.settings.voice), false, 'настройка сохранена');
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

await step('Нет русского голоса: настройки предупреждают, игра работает текстом', async () => {
  const page = await newPage(browser, false);
  await page.waitForTimeout(2300);
  await page.evaluate(() => window.__game.go('settings'));
  assert.ok(await page.$('[data-testid=voice-missing]'));
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

await browser.close();
const ok = results.filter((r) => r[0] === 'OK').length;
console.log(`\n${ok}/${results.length} проверок пройдено`);
process.exit(ok === results.length ? 0 : 1);

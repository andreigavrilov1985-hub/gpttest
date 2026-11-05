// Acceptance test, round 2 / stage 1: kitten phrases (ТЗ 1.4) and answer reactions (ТЗ 2.5).
// Run with the local server on BASE_URL:  node tests/round2.test.mjs
import { createRequire } from 'module';
import { readFileSync, mkdirSync } from 'fs';
import assert from 'assert/strict';
import { PHRASES, MIN, checkPhraseNorms, totalPhrases } from '../js/cat-phrases.js';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080/';
const SHOTS = process.env.SHOTS_DIR || 'docs/screenshots';
mkdirSync(SHOTS, { recursive: true });

const SUBJECTS = ['math', 'english', 'science', 'geography', 'logic'];
const qById = {};
for (const s of SUBJECTS) {
  const b = JSON.parse(readFileSync(`data/${s}-island1.json`, 'utf8'));
  for (const t of b.topics) for (const q of t.questions) qById[q.id] = q;
}
const results = [];
const step = async (name, fn) => {
  try {
    await fn();
    results.push(['OK', name]);
    console.log(`  ✔ ${name}`);
  } catch (e) {
    results.push(['FAIL', name]);
    console.log(`  ✘ ${name}\n    ${String(e.message).split('\n').join('\n    ')}`);
  }
};

// Counts started oscillators, so sound on/off can be checked without speakers.
const audioStub = () => {
  window.__tones = 0;
  class FakeParam { setValueAtTime() {} linearRampToValueAtTime() {} exponentialRampToValueAtTime() {} }
  class FakeNode { connect(n) { return n || this; } }
  window.AudioContext = class {
    constructor() { this.currentTime = 0; this.state = 'running'; this.destination = new FakeNode(); }
    resume() {}
    createOscillator() { const o = new FakeNode(); o.frequency = new FakeParam(); o.start = () => { window.__tones += 1; }; o.stop = () => {}; return o; }
    createGain() { const g = new FakeNode(); g.gain = new FakeParam(); return g; }
  };
};

async function newPage(browser, { viewport = { width: 360, height: 800 }, reducedMotion = 'no-preference', storage } = {}) {
  const ctx = await browser.newContext({ viewport, reducedMotion, deviceScaleFactor: 1 });
  await ctx.addInitScript(audioStub);
  if (storage) await ctx.addInitScript((s) => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('kidsgame.progress.v1', s); sessionStorage.setItem('seeded', '1'); } }, storage);
  const page = await ctx.newPage();
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') page.errors.push(`${m.type()}: ${m.text()}`); });
  await page.goto(BASE);
  await page.waitForSelector('[data-testid=start]');
  return page;
}

async function toFirstQuestion(page) {
  await page.click('[data-testid=start]');
  await page.fill('[data-testid=child-name]', 'Маша');
  await page.fill('[data-testid=kitten-name]', 'Пушок');
  await page.click('[data-testid=setup-done]');
  await page.click('[data-testid=go-island]');
  await page.click('[data-testid=continue]');
  await page.click('[data-testid=next-topic]');
  while (await page.$('[data-testid=explain-next]')) await page.click('[data-testid=explain-next]');
  await page.waitForSelector('[data-testid=option]');
}

const fullLine = (page, sel) => page.$eval(sel, (el) => el.dataset.full || el.getAttribute('data-say') || el.textContent);

async function answer(page, mode, { delay = 0 } = {}) {
  await page.waitForSelector('[data-testid=option]:not([disabled])');
  const qid = await page.evaluate(() => { const s = window.__game.progress.session; return s.order[s.idx]; });
  const q = qById[qid];
  const opts = await page.$$eval('[data-testid=option] .option__text', (els) => els.map((e) => e.textContent));
  const right = q.options[q.answer];
  const k = mode === 'right' ? opts.indexOf(right) : opts.findIndex((o) => o !== right);
  if (delay) await page.waitForTimeout(delay);
  await page.locator('[data-testid=option]').nth(k).click();
  const fb = await page.waitForSelector('[data-testid=feedback]');
  return {
    reaction: await fb.getAttribute('data-reaction'),
    group: await fb.getAttribute('data-group'),
    fast: (await fb.getAttribute('data-fast')) === 'true',
    line: await page.textContent('[data-testid=fb-line]'),
  };
}

async function nextVisible(page) {
  await page.waitForTimeout(250);
  const box = await page.locator('[data-testid=next-question]').boundingBox();
  const vp = page.viewportSize();
  assert.ok(box && box.y >= 0 && box.y + box.height <= vp.height + 1, `«Дальше» в пределах экрана (y=${box && Math.round(box.y)})`);
  assert.ok(box.x >= 0 && box.x + box.width <= vp.width + 1, '«Дальше» не выходит за ширину');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert.ok(overflow <= 1, `нет горизонтальной прокрутки (${overflow}px)`);
  // the effects layer never blocks taps
  const pe = await page.evaluate(() => { const c = document.querySelector('.fx-layer'); return c ? getComputedStyle(c).pointerEvents : 'none'; });
  assert.equal(pe, 'none');
}

const browser = await chromium.launch();
console.log('Round 2 / stage 1 acceptance test');

await step(`Фразы: все ${Object.keys(MIN).length} групп есть и не короче нормы (всего ≥ 300)`, async () => {
  assert.deepEqual(checkPhraseNorms(), []);
  assert.ok(totalPhrases() >= 300, `всего ${totalPhrases()}`);
  for (const [g, list] of Object.entries(PHRASES)) {
    assert.equal(new Set(list).size, list.length, `повтор внутри группы ${g}`);
    for (const t of list) {
      const words = t.replace(/\{\w+\}/g, 'X').split(/\s+/).filter((w) => /[\wА-яЁё]/.test(w)).length;
      assert.ok(words >= 2 && words <= 12, `${g}: «${t}» — ${words} слов`);
    }
  }
  console.log(`    фраз: ${totalPhrases()}, групп: ${Object.keys(PHRASES).length}`);
});

await step('Тема из 10 вопросов: фразы не повторяются подряд, разных ≥ 8, ошибок в консоли нет', async () => {
  const page = await newPage(browser);
  await toFirstQuestion(page);
  const lines = [];
  for (let i = 0; i < 10; i += 1) {
    lines.push(await fullLine(page, '.guide--mini [data-testid=cat-line]'));
    const r = await answer(page, i % 3 === 2 ? 'wrong' : 'right');
    lines.push(r.line.replace(/\s*\+1 🪙\s*$/, '').trim());
    await page.click('[data-testid=next-question]');
  }
  for (let i = 1; i < lines.length; i += 1) assert.notEqual(lines[i], lines[i - 1], `повтор подряд: «${lines[i]}»`);
  const distinct = new Set(lines).size;
  assert.ok(distinct >= 8, `разных фраз: ${distinct}`);
  console.log(`    показано фраз: ${lines.length}, разных: ${distinct}`);
  await page.waitForSelector('[data-testid=cat-fact]');
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

await step('20 правильных и 10 неправильных: ≥5 разных правильных реакций, ≥3 неправильных, без повтора подряд; «Дальше» на экране', async () => {
  const page = await newPage(browser);
  await toFirstQuestion(page);
  const right = [];
  const wrong = [];
  let shot5 = false;
  const plan = [...Array(20).fill('right'), ...Array(10).fill('wrong')];
  for (let i = 0; i < plan.length; i += 1) {
    const r = await answer(page, plan[i], { delay: plan[i] === 'right' && i % 4 === 1 ? 0 : 60 });
    (plan[i] === 'right' ? right : wrong).push(r.reaction);
    if (plan[i] === 'right' && i + 1 === 3) assert.ok(await page.$('[data-testid=streak-burst]'), 'большая анимация серии 3');
    if (i + 1 === 5 && !shot5) {
      await page.waitForTimeout(450);
      await page.screenshot({ path: `${SHOTS}/r2-mobile-streak5.png` });
      shot5 = true;
    }
    if (i === 21) {
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${SHOTS}/r2-mobile-wrong.png` });
    }
    await nextVisible(page);
    await page.click('[data-testid=next-question]');
    // finish topics on the way
    if (await page.$('[data-testid=result-continue]')) {
      await page.click('[data-testid=result-continue]');
      await page.click('[data-testid=next-topic]');
      while (await page.$('[data-testid=explain-next]')) await page.click('[data-testid=explain-next]');
    }
  }
  const noRepeat = (l) => l.every((x, i) => i === 0 || x !== l[i - 1]);
  assert.ok(new Set(right).size >= 5, `правильных реакций: ${new Set(right).size}`);
  assert.ok(new Set(wrong).size >= 3, `неправильных реакций: ${new Set(wrong).size}`);
  assert.ok(noRepeat(right), `правильные подряд: ${right.join(',')}`);
  assert.ok(noRepeat(wrong), `неправильные подряд: ${wrong.join(',')}`);
  console.log(`    правильные: ${[...new Set(right)].join(', ')}\n    неправильные: ${[...new Set(wrong)].join(', ')}`);
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

await step('Быстрый правильный ответ → усиленная реакция и фраза из группы «быстрый ответ»', async () => {
  const page = await newPage(browser);
  await toFirstQuestion(page);
  const r = await answer(page, 'right');
  assert.equal(r.fast, true);
  assert.equal(r.group, 'correctFast');
  assert.ok(PHRASES.correctFast.some((p) => r.line.startsWith(p.replace(/\{name\}/g, 'Маша').slice(0, 10))));
  await page.context().close();
});

await step('Бездействие 20 секунд → котёнок засыпает и говорит фразу из группы «бездействие»', async () => {
  const page = await newPage(browser);
  await toFirstQuestion(page);
  await page.waitForSelector('.guide--mini[data-idle="1"]', { timeout: 23000 });
  assert.equal(await page.getAttribute('.guide--mini svg', 'data-emotion'), 'sleepy');
  const line = await fullLine(page, '.guide--mini [data-testid=cat-line]');
  assert.ok(PHRASES.idle.map((p) => p.replace(/\{name\}/g, 'Маша')).includes(line), line);
  await page.screenshot({ path: `${SHOTS}/r2-mobile-idle.png` });
  await page.context().close();
});

await step('Звук: по умолчанию включён, выключается в настройках, выбор сохраняется', async () => {
  const page = await newPage(browser);
  await toFirstQuestion(page);
  await answer(page, 'right');
  assert.ok(await page.evaluate(() => window.__tones) > 0, 'звук на правильный ответ');
  await page.click('[data-testid=next-question]');
  await page.click('.bar [data-go=settings]');
  await page.click('[data-testid=sound-toggle]');
  assert.match(await page.textContent('[data-testid=sound-toggle]'), /выключен/);
  await page.reload();
  await page.click('[data-testid=start]');
  await page.waitForSelector('[data-testid=option]');
  const before = await page.evaluate(() => window.__tones);
  await answer(page, 'right');
  assert.equal(await page.evaluate(() => window.__tones), before, 'тишина при выключенном звуке');
  await page.context().close();
});

await step('Старое сохранение (до раунда 2) открывается: прогресс на месте, звук включён', async () => {
  const old = {
    version: 1, profile: { childName: 'Аня', kittenName: 'Мурзик', kitten: { main: 'grey', pattern: 'plain' } }, coins: 12,
    topics: { 'math-1-1': { answers: Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`math-1-1-${i + 1}`, true])), done: true, attempts: 1, stars: 3, best: 1 } },
    cities: {}, session: null,
  };
  const page = await newPage(browser, { storage: JSON.stringify(old) });
  assert.ok((await fullLine(page, '[data-testid=cat-line]')).length > 3);
  await page.click('[data-testid=start]');
  await page.click('[data-testid=go-island]');
  await page.click('[data-testid=continue]');
  assert.equal((await page.textContent('[data-testid=coins]')).trim(), '12');
  assert.match(await page.textContent('[data-testid=topic-1]'), /100%/);
  assert.equal(await page.evaluate(() => window.__game.progress.settings.sound), true);
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

await step('prefers-reduced-motion: котёнок не прыгает, частиц нет, ответ работает', async () => {
  const page = await newPage(browser, { reducedMotion: 'reduce' });
  await toFirstQuestion(page);
  await answer(page, 'right');
  const anim = await page.$eval('[data-testid=feedback] .kitten__all', (el) => getComputedStyle(el).animationName);
  assert.equal(anim, 'none');
  const text = await page.textContent('[data-testid=fb-line]');
  assert.ok(text.length > 3, 'фраза сразу целиком');
  await page.context().close();
});

await step('Скриншоты: правильный ответ (360×800 и десктоп), карта с фразой', async () => {
  for (const [prefix, viewport] of [['mobile', { width: 360, height: 800 }], ['desktop', { width: 1366, height: 900 }]]) {
    const page = await newPage(browser, { viewport });
    await toFirstQuestion(page);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${SHOTS}/r2-${prefix}-question.png` });
    await answer(page, 'right', { delay: 50 });
    await page.waitForTimeout(380);
    await page.screenshot({ path: `${SHOTS}/r2-${prefix}-correct.png` });
    await page.context().close();
  }
});

await browser.close();
const failed = results.filter((r) => r[0] === 'FAIL').length;
if (failed) process.exitCode = 1;
console.log(`\n${results.length - failed}/${results.length} проверок пройдено`);

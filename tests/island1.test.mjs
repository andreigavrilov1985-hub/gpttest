// Acceptance test for stage 1 (ТЗ, section 10). Run: npm test  (server must run on BASE_URL)
// Uses the pre-installed Playwright Chromium.
import { createRequire } from 'module';
import { readFileSync, mkdirSync } from 'fs';
import assert from 'assert/strict';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080/';
const SHOTS = process.env.SHOTS_DIR || 'docs/screenshots';
mkdirSync(SHOTS, { recursive: true });

const SUBJECTS = ['math', 'english', 'science', 'geography', 'logic'];
const banks = {};
for (const s of SUBJECTS) banks[s] = JSON.parse(readFileSync(`data/${s}-island1.json`, 'utf8'));
const qById = {};
const passageText = new Set();
for (const s of SUBJECTS) for (const t of banks[s].topics) {
  for (const q of t.questions) qById[q.id] = { q, t };
  for (const p of t.passages) if (p.kind === 'listening') passageText.add(p.text);
}

// Fake Web Speech API: one English voice; records every spoken text.
const speechStub = () => {
  window.__spoken = [];
  const voice = { name: 'Test English (UK)', lang: 'en-GB', default: true, localService: true, voiceURI: 'test' };
  window.SpeechSynthesisUtterance = function SpeechSynthesisUtterance(text) { this.text = text; };
  Object.defineProperty(window, 'speechSynthesis', {
    value: {
      getVoices: () => [voice],
      speak(u) { window.__spoken.push({ text: u.text, lang: u.lang }); setTimeout(() => u.onend && u.onend(), 20); },
      cancel() {}, addEventListener() {},
    },
  });
};
const noSpeech = () => {
  window.SpeechSynthesisUtterance = function SpeechSynthesisUtterance() {};
  Object.defineProperty(window, 'speechSynthesis', { value: { getVoices: () => [], speak() {}, cancel() {}, addEventListener() {} } });
};

const results = [];
const step = async (name, fn) => {
  try {
    await fn();
    results.push(['OK', name]);
    console.log(`  ✔ ${name}`);
  } catch (e) {
    results.push(['FAIL', name]);
    console.log(`  ✘ ${name}\n    ${e.message.split('\n').join('\n    ')}`);
    process.exitCode = 1;
  }
};

async function newPage(browser, { viewport = { width: 360, height: 800 }, stub = speechStub } = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  await ctx.addInitScript(stub);
  const page = await ctx.newPage();
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') page.errors.push(m.text()); });
  await page.goto(BASE);
  await page.waitForSelector('[data-testid=start]');
  return page;
}

async function setup(page) {
  await page.click('[data-testid=start]');
  await page.fill('[data-testid=child-name]', 'Маша');
  await page.fill('[data-testid=kitten-name]', 'Пушок');
  await page.click('text=Полоски');
  await page.click('[data-testid=setup-done]');
  await page.waitForSelector('[data-testid=go-island]');
}

const currentQid = (page) => page.evaluate(() => {
  const s = window.__game.progress.session;
  return s.order[s.idx];
});

/** Answers the visible question. mode: 'right' | 'wrong'. Returns the question id. */
async function answer(page, mode) {
  await page.waitForSelector('[data-testid=option]:not([disabled])');
  const qid = await currentQid(page);
  const { q } = qById[qid];
  const shownText = await page.textContent('[data-testid=q-text]');
  assert.equal(shownText.trim(), q.text.trim(), `question text shown as in the bank (${qid})`);
  const opts = await page.$$eval('[data-testid=option] .option__text', (els) => els.map((e) => e.textContent));
  assert.deepEqual([...opts].sort(), [...q.options].sort(), `3 options of ${qid}`);
  const right = q.options[q.answer];
  const k = mode === 'right' ? opts.indexOf(right) : opts.findIndex((o) => o !== right);
  await page.locator('[data-testid=option]').nth(k).click();
  const fb = await page.waitForSelector('[data-testid=feedback]');
  assert.equal(await fb.getAttribute('data-correct'), String(mode === 'right'));
  const fbText = await fb.textContent();
  assert.ok(fbText.includes(q.why), 'shows «Почему»');
  if (mode === 'wrong') assert.ok(fbText.includes(right), 'shows the right answer after a mistake');
  return qid;
}

async function playTopic(page, mode, { onQuestion } = {}) {
  // explanation screens
  await page.waitForSelector('[data-testid=explain-next], [data-testid=scene-next]');
  await skipExplain(page);
  for (let i = 0; i < 10; i += 1) {
    const m = typeof mode === 'function' ? mode(i) : mode;
    const qid = await answer(page, m);
    if (onQuestion) await onQuestion(qid, i);
    await page.click('[data-testid=next-question]');
  }
  await page.waitForSelector('[data-testid=topic-pct]');
  const pct = await page.textContent('[data-testid=topic-pct]');
  await page.click('[data-testid=result-continue]');
  return pct;
}

async function playCity(page, subject, mode = 'right', hooks = {}) {
  const n = banks[subject].topics.length;
  for (let t = 0; t < n; t += 1) {
    await page.click('[data-testid=next-topic]');
    await playTopic(page, mode, hooks);
  }
}

// Goes through the explanation (text steps or an animated scene) to the questions.
async function skipExplain(page) {
  for (let guard = 0; guard < 30; guard += 1) {
    if (await page.$('[data-testid=option]')) return;
    const btn = (await page.$('[data-testid=scene-next]')) || (await page.$('[data-testid=explain-next]'));
    if (!btn) { await page.waitForTimeout(100); continue; }
    await btn.click();
  }
}

const browser = await chromium.launch();
console.log('Stage 1 acceptance test');

// ---------------------------------------------------------------- 1
await step('Остров 2 закрыт, пока не пройден остров 1', async () => {
  const page = await newPage(browser);
  await setup(page);
  for (const i of [2, 3, 4, 5]) assert.equal(await page.getAttribute(`[data-testid=island-${i}]`, 'data-state'), 'locked');
  assert.equal(await page.getAttribute('[data-testid=island-1]', 'data-state'), 'open');
  await page.evaluate(() => window.__game.go('island:2'));
  await page.waitForSelector('[data-testid=go-island]'); // redirected back to the map
  await page.click('[data-testid=go-island]');
  for (const s of SUBJECTS.slice(1)) assert.equal(await page.getAttribute(`[data-testid=city-${s}]`, 'data-state'), 'locked');
  await page.context().close();
});

// ---------------------------------------------------------------- 2
await step('Ниже 70% в городе → дополнительные задания по слабым темам, затем город пройден', async () => {
  const page = await newPage(browser);
  await setup(page);
  await page.click('[data-testid=go-island]');
  await page.click('[data-testid=continue]');
  // topic 1: all right, topics 2–4: 3 right, 7 wrong → (10 + 9) / 40 = 47.5%
  await page.click('[data-testid=next-topic]');
  await playTopic(page, 'right');
  for (let t = 1; t < 4; t += 1) {
    await page.click('[data-testid=next-topic]');
    await playTopic(page, (i) => (i < 3 ? 'right' : 'wrong'));
  }
  await page.waitForSelector('[data-testid=start-practice]');
  await page.screenshot({ path: `${SHOTS}/mobile-07-practice-offer.png` });
  const ring = await page.textContent('.ring span');
  assert.equal(ring.trim(), '48%');
  await page.click('[data-testid=start-practice]');
  const s = await page.evaluate(() => window.__game.progress.session);
  assert.equal(s.kind, 'practice');
  assert.equal(s.order.length, 30, 'three weak topics × 10 questions');
  assert.ok(s.order.every((id) => !id.startsWith('math-1-1-')), 'only weak topics');
  const source = [2, 3, 4].flatMap((t) => Array.from({ length: 10 }, (_, i) => `math-1-${t}-${i + 1}`));
  assert.notDeepEqual(s.order, source, 'order differs from the original');
  // the island is not passed and island 2 stays locked
  for (let i = 0; i < 30; i += 1) {
    await answer(page, 'right');
    await page.click('[data-testid=next-question]');
  }
  await page.waitForSelector('[data-testid=city-pct]');
  assert.equal((await page.textContent('[data-testid=city-pct]')).trim(), '100%');
  await page.click('[data-testid=result-continue]');
  assert.equal(await page.getAttribute('[data-testid=city-math]', 'data-state'), 'passed');
  assert.equal(await page.getAttribute('[data-testid=city-english]', 'data-state'), 'open');
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

// ---------------------------------------------------------------- 3
let mainPage;
await step('Остров 1 целиком правильными ответами (5 городов, 21 тема, 210 вопросов)', async () => {
  const page = await newPage(browser);
  mainPage = page;
  await setup(page);
  await page.click('[data-testid=go-island]');
  await page.click('[data-testid=continue]');
  const passageIds = new Set();
  let answered = 0;
  for (const [ci, subject] of SUBJECTS.entries()) {
    if (ci > 0) await page.click('[data-testid=continue]'); // island screen → next city
    await playCity(page, subject, 'right', {
      onQuestion: async (qid) => {
        answered += 1;
        const { q, t } = qById[qid];
        if (q.passage) passageIds.add(`${t.id}/${q.passage}`);
      },
    });
    await page.click('[data-testid=back-to-island]');
    assert.equal(await page.getAttribute(`[data-testid=city-${subject}]`, 'data-state'), 'passed');
  }
  assert.equal(answered, 210);
  await page.waitForSelector('[data-testid=next-island]');
  const coins = await page.textContent('[data-testid=coins]');
  assert.equal(coins.trim(), '210');
  await page.evaluate(() => window.__game.go('map'));
  await page.waitForSelector('[data-testid=island-2][data-state=open]');
  assert.equal(await page.getAttribute('[data-testid=island-1]', 'data-state'), 'passed');
  assert.deepEqual(page.errors, []);
});

// ---------------------------------------------------------------- 4
await step('После перезагрузки прогресс сохранён (остров 1 пройден, остров 2 открыт, монеты)', async () => {
  const page = mainPage;
  await page.reload();
  await page.waitForSelector('[data-testid=start]');
  assert.equal(await page.evaluate(() => window.__game.progress.profile.childName), 'Маша');
  assert.ok((await page.getAttribute('.start__hello', 'data-say')).length > 3, 'kitten greets');
  await page.click('[data-testid=start]');
  await page.waitForSelector('[data-testid=island-2][data-state=open]');
  assert.equal(await page.getAttribute('[data-testid=island-1]', 'data-state'), 'passed');
  assert.equal((await page.textContent('[data-testid=coins]')).trim(), '210');
  await page.click('[data-testid=go-island]');
  await page.waitForSelector('[data-testid=city-math][data-state=open]');
  await page.context().close();
});

// ---------------------------------------------------------------- 5
await step('Перезагрузка посреди темы → продолжение с того же вопроса', async () => {
  const page = await newPage(browser);
  await setup(page);
  await page.click('[data-testid=go-island]');
  await page.click('[data-testid=continue]');
  await page.click('[data-testid=next-topic]');
  await skipExplain(page);
  for (let i = 0; i < 4; i += 1) {
    await answer(page, 'right');
    await page.click('[data-testid=next-question]');
  }
  const before = await currentQid(page);
  await page.reload();
  await page.click('[data-testid=start]');
  await page.waitForSelector('[data-testid=q-counter]');
  assert.equal((await page.textContent('[data-testid=q-counter]')).trim(), '5/10');
  assert.equal(await currentQid(page), before);
  await page.context().close();
});

// ---------------------------------------------------------------- 6
await step('Варианты A/B/C перемешиваются при каждом показе', async () => {
  const page = await newPage(browser);
  await setup(page);
  await page.click('[data-testid=go-island]');
  await page.click('[data-testid=continue]');
  await page.click('[data-testid=next-topic]');
  await skipExplain(page);
  const orders = new Set();
  for (let i = 0; i < 12; i += 1) {
    await page.evaluate(() => window.__game.go('resume'));
    await page.waitForSelector('[data-testid=option]');
    orders.add((await page.$$eval('.option__text', (e) => e.map((x) => x.textContent))).join('|'));
  }
  assert.ok(orders.size >= 3, `different orders seen: ${orders.size}`);
  // explanation can be reopened from a question and returns to the same question
  await page.click('[data-testid=reopen-explain]');
  await page.waitForSelector('[data-testid=explain-card], [data-testid=scene]');
  await skipExplain(page);
  await page.waitForSelector('[data-testid=q-counter]');
  assert.equal((await page.textContent('[data-testid=q-counter]')).trim(), '1/10');
  await page.context().close();
});

// ---------------------------------------------------------------- 7
await step('Аудирование: текст звучит (en-GB), кнопка «Повторить» повторяет, текст не показан', async () => {
  const page = await newPage(browser);
  await setup(page);
  await page.evaluate(() => {
    // jump straight to English topic 5 for this check: mark math as passed and English 1–4 as done
    const p = window.__game.progress;
    const mark = (id, n) => { p.topics[id] = { answers: Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`${id}-${i + 1}`, true])), done: true, attempts: 1, stars: 3 }; };
    for (let t = 1; t <= 4; t += 1) mark(`math-1-${t}`);
    for (let t = 1; t <= 4; t += 1) mark(`english-1-${t}`);
    localStorage.setItem('kidsgame.progress.v1', JSON.stringify(p));
  });
  await page.reload();
  await page.click('[data-testid=start]');
  await page.click('[data-testid=go-island]');
  await page.click('[data-testid=city-english]');
  await page.click('[data-testid=next-topic]');
  await skipExplain(page);
  await page.waitForSelector('[data-testid=listen-play]:not([disabled])');
  await page.waitForFunction(() => window.__spoken.length >= 1);
  let spoken = await page.evaluate(() => window.__spoken);
  const t5 = banks.english.topics[4];
  assert.equal(spoken[0].text, t5.passages[0].text, 'first audio text spoken automatically');
  assert.equal(spoken[0].lang, 'en-GB');
  const html = await page.content();
  for (const p of t5.passages) assert.ok(!html.includes(p.text.slice(0, 40)), 'listening text is not in the page');
  await page.screenshot({ path: `${SHOTS}/mobile-06-listening.png` });
  await page.click('[data-testid=listen-play]');
  await page.click('[data-testid=listen-play]');
  await page.waitForFunction(() => window.__spoken.length >= 3);
  spoken = await page.evaluate(() => window.__spoken);
  assert.equal(spoken[1].text, t5.passages[0].text, 'repeat #1');
  assert.equal(spoken[2].text, t5.passages[0].text, 'repeat #2');
  assert.match(await page.textContent('[data-testid=listen-play]'), /Повторить|Звучит/);
  console.log(`    spoken ${spoken.length}× «${spoken[0].text.slice(0, 50)}…»`);
  await page.context().close();
});

// ---------------------------------------------------------------- 8
await step('Нет английского голоса → понятное сообщение и пропуск темы без штрафа', async () => {
  const page = await newPage(browser, { stub: noSpeech });
  await setup(page);
  await page.evaluate(() => {
    const p = window.__game.progress;
    const mark = (id) => { p.topics[id] = { answers: Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`${id}-${i + 1}`, i < 7])), done: true, attempts: 1, stars: 2 }; };
    for (let t = 1; t <= 4; t += 1) mark(`math-1-${t}`);
    for (let t = 1; t <= 4; t += 1) mark(`english-1-${t}`);
    localStorage.setItem('kidsgame.progress.v1', JSON.stringify(p));
  });
  await page.reload();
  await page.click('[data-testid=start]');
  await page.click('[data-testid=go-island]');
  await page.click('[data-testid=city-english]');
  await page.click('[data-testid=next-topic]');
  await skipExplain(page);
  await page.waitForSelector('[data-testid=skip-listening]', { timeout: 5000 });
  assert.match(await page.textContent('#listen-status'), /нет английского голоса/);
  const html = await page.content();
  for (const p of banks.english.topics[4].passages) assert.ok(!html.includes(p.text.slice(0, 40)));
  await page.screenshot({ path: `${SHOTS}/mobile-06b-no-voice.png` });
  await page.click('[data-testid=skip-listening]');
  await page.waitForSelector('[data-testid=back-to-island]'); // 28/40 = 70% → city passed
  assert.equal((await page.textContent('.ring span')).trim(), '70%');
  await page.context().close();
});

// ---------------------------------------------------------------- 9
await step('Авторская метка «© 2026 Андрей Г» на месте; без неё игра не запускается', async () => {
  const page = await newPage(browser);
  assert.ok((await page.textContent('footer.mark')).includes('© 2026 Андрей Г'));
  const ctx = await browser.newContext();
  const p2 = await ctx.newPage();
  await p2.route('**/index.html', (r) => r.continue());
  await p2.route(BASE, async (r) => {
    const res = await r.fetch();
    const body = (await res.text()).replaceAll('© 2026 Андрей Г', '© 2026');
    await r.fulfill({ response: res, body });
  });
  await p2.goto(BASE);
  await p2.waitForTimeout(800);
  assert.match(await p2.textContent('body'), /повреждена/);
  await ctx.close();
  await page.context().close();
});

// ---------------------------------------------------------------- 10
await step('PWA: manifest и service worker, офлайн после первой загрузки', async () => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(BASE);
  const manifest = await page.evaluate(async () => (await fetch('manifest.webmanifest')).json());
  assert.ok(manifest.icons.some((i) => i.sizes === '512x512'));
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForFunction(async () => (await caches.keys()).length > 0 && (await (await caches.open((await caches.keys())[0])).keys()).length > 40);
  await ctx.setOffline(true);
  await page.reload();
  await page.waitForSelector('[data-testid=start]');
  const ok = await page.evaluate(async () => (await fetch('data/logic-island5.json')).ok);
  assert.ok(ok, 'data available offline');
  await ctx.close();
});

// ---------------------------------------------------------------- screenshots
await step('Скриншоты 360×800 и десктоп', async () => {
  for (const [prefix, viewport] of [['mobile', { width: 360, height: 800 }], ['desktop', { width: 1366, height: 900 }]]) {
    const page = await newPage(browser, { viewport });
    await page.screenshot({ path: `${SHOTS}/${prefix}-01-start.png` });
    await page.click('[data-testid=start]');
    await page.fill('[data-testid=child-name]', 'Маша');
    await page.fill('[data-testid=kitten-name]', 'Пушок');
    await page.click('text=Полоски');
    await page.screenshot({ path: `${SHOTS}/${prefix}-02-kitten.png` });
    await page.click('[data-testid=setup-done]');
    await page.waitForSelector('[data-testid=go-island]');
    await page.screenshot({ path: `${SHOTS}/${prefix}-03-map.png` });
    await page.click('[data-testid=go-island]');
    await page.waitForSelector('[data-testid=continue]');
    await page.screenshot({ path: `${SHOTS}/${prefix}-04-island.png` });
    await page.click('[data-testid=continue]');
    await page.click('[data-testid=next-topic]');
    await page.waitForSelector('[data-testid=explain-card], [data-testid=scene]');
    await page.screenshot({ path: `${SHOTS}/${prefix}-05-explanation.png` });
    await skipExplain(page);
    await page.waitForSelector('[data-testid=option]');
    await page.screenshot({ path: `${SHOTS}/${prefix}-08-question.png` });
    await answer(page, 'wrong');
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${SHOTS}/${prefix}-09-feedback.png`, fullPage: prefix === 'mobile' });
    await page.context().close();
  }
});

await browser.close();
if (results.some((r) => r[0] === 'FAIL')) process.exitCode = 1;
const failed = results.filter((r) => r[0] === 'FAIL').length;
console.log(`\n${results.length - failed}/${results.length} проверок пройдено`);

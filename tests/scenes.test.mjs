// Acceptance test, round 2 / stage 2: scene engine and 5 pilot scenes of island 1 (ТЗ 3.6).
// Also writes reports/explainers-terms.md (term → scene step).  Run: node tests/scenes.test.mjs
import { createRequire } from 'module';
import { writeFileSync, readFileSync } from 'fs';
import assert from 'assert/strict';
import { sceneSeconds } from '../js/explainer.js';
import { cartoonSeconds } from '../js/cartoon.js';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080/';
const { SCENES: IDS } = await import('../explainers/index.js');
const scenes = {};
for (const id of IDS) scenes[id] = (await import(`../explainers/${id}.js`)).default;

const results = [];
const step = async (name, fn) => {
  try { await fn(); results.push(['OK', name]); console.log(`  ✔ ${name}`); } catch (e) {
    results.push(['FAIL', name]); console.log(`  ✘ ${name}\n    ${String(e.message).split('\n').join('\n    ')}`);
  }
};

async function newPage(browser, viewport) {
  const page = await (await browser.newContext({ viewport })).newPage();
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') page.errors.push(m.text()); });
  await page.goto(BASE);
  await page.click('[data-testid=start]');
  await page.fill('[data-testid=child-name]', 'Маша');
  await page.fill('[data-testid=kitten-name]', 'Пушок');
  await page.click('[data-testid=setup-done]');
  await page.waitForSelector('[data-testid=go-island]');
  // cartoons play 4× faster in the test only (the engine reads this flag); pause/replay checks are unaffected
  await page.evaluate(() => { window.__cartoonSpeed = 4; });
  return page;
}
const stepNo = async (page) => Number(await page.getAttribute('[data-testid=scene]', 'data-step'));
const noOverflow = async (page, where) => {
  const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert.ok(o <= 1, `горизонтальная прокрутка ${o}px: ${where}`);
};
const isCartoon = (id) => scenes[id].kind === 'cartoon';
const units = (id) => (isCartoon(id) ? scenes[id].episodes : scenes[id].steps);
const isInteractive = (s) => s.params?.interactive || s.block === 'sentenceBlocks' || s.params?.choices;

async function interact(page, s) {
  const stage = '[data-testid=scene-stage]';
  if (s.block === 'sentenceBlocks') {
    for (const w of s.params.words) await page.click(`${stage} .blk-pool .blk-cube[data-w="${w}"]`);
    assert.match(await page.textContent(`${stage} .blk-status`), /собрано/);
  } else if (s.params?.choices) {
    await page.click(`${stage} [data-c="${s.params.answer}"]`);
    assert.equal((await page.textContent('[data-testid=seq-answer]')).trim(), String(s.params.answer));
  } else if (s.block === 'fractionPie' || s.block === 'fractionBar') {
    const before = await page.textContent('[data-testid=frac-num]');
    await page.click(`${stage} .blk-part.tap:not(.on)`);
    assert.equal(Number(await page.textContent('[data-testid=frac-num]')), Number(before) + 1, 'числитель растёт при нажатии');
  } else {
    await page.click(`${stage} .tap`);
  }
  assert.equal(await page.getAttribute(stage, 'data-touched'), '1');
}

const stageT = (page) => page.$eval('[data-testid=scene-stage]', (el) => Number(el.dataset.t || 0));

/** Cartoon: every episode plays to the end (full=true) or starts (full=false); pause, replay, tap interaction. */
async function checkCartoon(page, id, full) {
  const eps = scenes[id].episodes;
  for (let i = 0; i < eps.length; i += 1) {
    await page.waitForSelector(`[data-testid=scene][data-step="${i}"]`);
    await noOverflow(page, `${id} серия ${i + 1}`);
    await page.waitForFunction(() => Number(document.querySelector('[data-testid=scene-stage]').dataset.t) > 300);
    if (i === 0) {
      await page.click('[data-testid=scene-pause]');
      const t1 = await stageT(page);
      await page.waitForTimeout(700);
      assert.equal(await stageT(page), t1, 'пауза останавливает мультик');
      assert.equal((await page.textContent('[data-testid=scene-pause]')).trim(), '▶');
      await page.click('[data-testid=scene-pause]');
      await page.waitForFunction((t) => Number(document.querySelector('[data-testid=scene-stage]').dataset.t) > t + 200, t1);
      await page.click('[data-testid=scene-replay]');
      assert.ok(await stageT(page) < 400, 'повтор начинает серию сначала');
    }
    if (eps[i].interact && full) await page.waitForSelector('[data-testid=scene-stage][data-ended="1"]', { timeout: (eps[i].duration || 15000) + 8000 });
    if (eps[i].interact) {
      const it = eps[i].interact;
      const first = it.type === 'tapEat' ? it.targets[0] : Object.keys(it.items)[0];
      await page.waitForTimeout(800);
      await page.click(`[data-testid=scene-stage] [data-a="${first}"]`, { force: true });
      assert.equal(await page.getAttribute('[data-testid=scene-stage]', 'data-touched'), '1', 'нажатие работает');
      if (it.type === 'tapEat') assert.equal((await page.textContent(`[data-testid=scene-stage] [data-a="${it.counter}"]`)).trim(), '1');
      else if (it.items[first].say) assert.equal(await page.textContent('[data-testid=scene-caption]'), it.items[first].say);
    }
    if (full) {
      await page.waitForSelector('[data-testid=scene-stage][data-ended="1"]', { timeout: (eps[i].duration || 15000) + 8000 });
      const caps = eps[i].beats.filter((b) => b[1] === 'cap');
      if (caps.length && !eps[i].interact) assert.equal(await page.textContent('[data-testid=scene-caption]'), caps[caps.length - 1][2], 'последний субтитр');
    }
    if (i < eps.length - 1) await page.click('[data-testid=scene-next]');
  }
}

const browser = await chromium.launch();
console.log('Round 2 / stage 2: scenes');

await step('Список сценок explainers/index.js совпадает с файлами', async () => {
  const { SCENES } = await import('../explainers/index.js');
  const { readdirSync } = await import('fs');
  const files = readdirSync('explainers').filter((f) => f !== 'index.js').map((f) => f.replace(/\.js$/, '')).sort();
  assert.deepEqual([...SCENES].sort(), files);
});

await step('Данные сценок: шагов 3–6, есть интерактив, у каждого шага подпись и термины, ≤ 90 секунд', async () => {
  for (const id of IDS) {
    const sc = scenes[id];
    if (isCartoon(id)) {
      assert.ok(sc.episodes.length >= 3 && sc.episodes.length <= 6, `${id}: серий ${sc.episodes.length}`);
      assert.ok(sc.episodes.some((e) => e.interact), `${id}: нет интерактива`);
      for (const e of sc.episodes) {
        assert.ok(e.terms && e.terms.length, `${id}: термины серии`);
        for (const b of e.beats.filter((x) => x[1] === 'cap')) assert.ok(b[2].length <= 90, `${id}: длинный субтитр «${b[2]}»`);
      }
      const sec = Math.round(cartoonSeconds(sc));
      assert.ok(sec <= 90, `${id}: ${sec} с`);
      console.log(`    ${id}: мультик, ${sc.episodes.length} серий, ~${sec} с`);
      continue;
    }
    assert.ok(sc.steps.length >= 3 && sc.steps.length <= 6, `${id}: шагов ${sc.steps.length}`);
    assert.ok(sc.steps.some(isInteractive), `${id}: нет интерактива`);
    for (const s of sc.steps) {
      assert.ok(s.caption && s.caption.length < 200, `${id}: подпись`);
      assert.ok(s.terms && s.terms.length, `${id}: термины шага`);
    }
    assert.ok(sc.memo.length >= 3, `${id}: памятка`);
    const sec = Math.round(sceneSeconds(sc));
    assert.ok(sec <= 90, `${id}: ${sec} с`);
    console.log(`    ${id}: ${sc.steps.length} шагов, ~${sec} с`);
  }
});

for (const [label, viewport] of [['телефон 360×800', { width: 360, height: 800 }], ['ноутбук 1366×900', { width: 1366, height: 900 }]]) {
  await step(`${label}: вперёд/назад, повтор шага, интерактив, пропуск → памятка, без горизонтальной прокрутки`, async () => {
    const page = await newPage(browser, viewport);
    for (const id of IDS) {
      const sc = scenes[id];
      await page.evaluate((t) => window.__game.go(`topic:${t}`), id);
      await page.waitForSelector('[data-testid=scene][data-step="0"]');
      if (isCartoon(id)) {
        await checkCartoon(page, id, viewport.width < 500);
        continue;
      }
      for (let i = 0; i < sc.steps.length; i += 1) {
        assert.equal(await stepNo(page), i);
        assert.equal(await page.textContent('[data-testid=scene-caption]'), sc.steps[i].caption);
        await noOverflow(page, `${id} шаг ${i + 1}`);
        const run = Number(await page.getAttribute('[data-testid=scene-stage]', 'data-run'));
        await page.click('[data-testid=scene-replay]');
        assert.equal(Number(await page.getAttribute('[data-testid=scene-stage]', 'data-run')), run + 1, 'повтор шага');
        if (isInteractive(sc.steps[i])) await interact(page, sc.steps[i]);
        if (i < sc.steps.length - 1) await page.click('[data-testid=scene-next]');
      }
      await page.click('[data-testid=scene-back]');
      assert.equal(await stepNo(page), units(id).length - 2, 'назад');
      await page.click('[data-testid=skip-explain]');
      await page.waitForSelector('[data-testid=memo]');
      assert.equal(await page.$$eval('[data-testid=memo] li', (l) => l.length), sc.memo.length);
      await noOverflow(page, `${id} памятка`);
      await page.click('[data-testid=memo-to-scene]');
      await page.waitForSelector('[data-testid=scene][data-step="0"]');
    }
    assert.deepEqual(page.errors, []);
    await page.context().close();
  });
}

await step('Из вопроса: «Подсказка от котёнка» открывает сценку и памятку, возврат к тому же вопросу', async () => {
  const page = await newPage(browser, { width: 360, height: 800 });
  for (const id of IDS) {
    await page.evaluate((t) => window.__game.go(`topic:${t}`), id);
    await page.click('[data-testid=skip-explain]');
    await page.click('[data-testid=explain-next]'); // «К вопросам!» from the memo
    await page.waitForSelector('[data-testid=option]');
    await page.locator('[data-testid=option]').first().click();
    await page.click('[data-testid=next-question]');
    assert.equal((await page.textContent('[data-testid=q-counter]')).trim(), '2/10');
    await page.click('[data-testid=reopen-explain]');
    await page.waitForSelector('[data-testid=scene][data-step="0"]');
    await page.click('[data-testid=scene-next]');
    await page.click('[data-testid=scene-to-question]');
    assert.equal((await page.textContent('[data-testid=q-counter]')).trim(), '2/10', 'тот же вопрос');
    await page.click('[data-testid=reopen-explain]');
    await page.click('[data-testid=skip-explain]');
    await page.waitForSelector('[data-testid=memo]');
    await page.click('[data-testid=explain-next]');
    assert.equal((await page.textContent('[data-testid=q-counter]')).trim(), '2/10', 'из памятки — к тому же вопросу');
  }
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

await step('Тема без сценки: прежний текст шагами с котёнком, пропуск → памятка из текста', async () => {
  const page = await newPage(browser, { width: 360, height: 800 });
  await page.evaluate(() => window.__game.go('topic:math-2-1'));
  await page.waitForSelector('[data-testid=explain-card]');
  assert.equal(await page.$('[data-testid=scene]'), null);
  await page.click('[data-testid=skip-explain]');
  await page.waitForSelector('[data-testid=memo]');
  const bank = JSON.parse(readFileSync('data/math-island2.json', 'utf8'));
  assert.equal(await page.$$eval('[data-testid=memo] li', (l) => l.length), bank.topics[0].explanation.length);
  await page.context().close();
});

await step('Таблица «термин — шаг сценки» записана в reports/explainers-terms.md', async () => {
  const out = ['# Термины мультиков острова 1', '', 'Каждый термин из вопросов темы определён в указанной серии мультика и/или в памятке (памятка: своя у мультика или объяснение темы из банка вопросов).', ''];
  for (const id of IDS) {
    const bank = JSON.parse(readFileSync(`data/${id.split('-')[0]}-island1.json`, 'utf8'));
    const t = bank.topics.find((x) => x.id === id);
    out.push(`## ${id} — ${t.title}`, '', '| Термин | Шаг / серия | Подпись или субтитры |', '|---|---|---|');
    if (isCartoon(id)) {
      scenes[id].episodes.forEach((e, i) => e.terms.forEach((term) => out.push(`| ${term} | серия ${i + 1} «${e.title}» | ${e.beats.filter((b) => b[1] === 'cap').map((b) => b[2]).join(' ').replace(/\|/g, '/')} |`)));
      if (id === 'math-1-2') out.push('', 'Только в памятке: умножение дробей, деление дроби на целое, дробь больше 1, 3/8 = 0,375.');
    } else scenes[id].steps.forEach((s, i) => s.terms.forEach((term) => out.push(`| ${term} | ${i + 1} | ${s.caption.replace(/\|/g, '/')} |`)));
    out.push('');
  }
  writeFileSync('reports/explainers-terms.md', `${out.join('\n')}\n`);
});

await browser.close();
const failed = results.filter((r) => r[0] === 'FAIL').length;
if (failed) process.exitCode = 1;
console.log(`\n${results.length - failed}/${results.length} проверок пройдено`);

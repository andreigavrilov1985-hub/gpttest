import { CONFIG, SUBJECT_INFO, ISLAND_INFO } from './config.js';
import * as P from './progress.js';
import { kittenSVG, KITTEN_COLORS, PATTERNS } from './kitten.js';
import { getEnglishVoice, speak, stopSpeaking, getRussianVoice, kittenSpeak, setKittenTone, kittenTone, listRussianVoices } from './speech.js';
import { AUTHOR_MARK, verifyAuthorMark } from './author.js';
import { phrase, typeInto, devCheckPhrases } from './cat.js';
import * as FX from './reactions.js';
import { loadScene, mountStep } from './explainer.js';
import { createCartoon } from './cartoon.js';

const app = document.getElementById('app');
let progress = P.loadProgress();
let view = { name: 'start' };
let idleTimer = 0;
let wrongRun = 0; // wrong answers in a row (for the "second mistake" phrases)
const startInfo = { comeback: false };

// ---------- helpers ----------
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Explanations may contain <b>…</b> from Notion; everything else is escaped.
const rich = (s) => esc(s).replace(/&lt;(\/?)b&gt;/g, '<$1b>').replace(/\n/g, '<br>');
const pct = (x) => `${Math.round(x * 100)}%`;
const save = () => P.saveProgress(progress);
const look = () => progress.profile?.kitten || { main: 'ginger', pattern: 'plain' };
const kid = () => progress.profile?.childName || 'друг';
const kitty = () => progress.profile?.kittenName || 'Котёнок';

const vars = (extra = {}) => ({ name: progress.profile?.childName || '', ...extra });
const say = (group, extra) => phrase(group, vars(extra));

function h(html) {
  stopSpeaking();
  if (typeof cartoonPlayer !== 'undefined' && cartoonPlayer) { cartoonPlayer.destroy(); cartoonPlayer = null; }
  clearTimeout(idleTimer);
  FX.clearEffects();
  app.innerHTML = html;
  app.scrollTop = 0;
  window.scrollTo(0, 0);
  const reduced = FX.reducedMotion();
  app.querySelectorAll('[data-say]').forEach((el) => typeInto(el, el.dataset.say, { reduced }));
  // the kitten reads its line aloud (in a cartoon the subtitles are read instead)
  const line = app.querySelector('[data-say]');
  if (line && voiceOn() && !app.querySelector('.scene--cartoon')) kittenSpeak(line.dataset.say);
  const focus = app.querySelector('[data-autofocus]');
  if (focus) focus.focus({ preventScroll: true });
}

function topBar({ back = null, title = '' } = {}) {
  return `<header class="bar">
    ${back ? `<button class="icon-btn" data-go="${back}" aria-label="Назад">←</button>` : '<span class="bar__spacer"></span>'}
    <div class="bar__title">${esc(title)}</div>
    <div class="coins" title="Монеты" aria-label="Монеты"><span class="coin"></span><b data-testid="coins">${progress.coins || 0}</b></div>
    <button class="icon-btn" data-go="settings" aria-label="Настройки">⚙</button>
  </header>`;
}

/** Kitten with a speech bubble. `line` is typed letter by letter; `info` is shown at once below it. */
function bubble(line, mood = 'idle', size = 92, { info = '', cls = '', acc } = {}) {
  return `<div class="guide ${cls}">
    <div class="guide__cat" data-testid="cat">${kittenSVG(look(), mood, size, { accessory: acc })}</div>
    <div class="guide__bubble"><span class="guide__name">${esc(kitty())}</span>
      <span class="guide__say" data-say="${esc(line)}" data-testid="cat-line" title="Нажми, чтобы показать сразу"></span>
      ${info ? `<span class="guide__info">${info}</span>` : ''}</div>
  </div>`;
}

function setCat(container, mood, acc) {
  const holder = container && container.querySelector('.guide__cat');
  if (holder) holder.innerHTML = kittenSVG(look(), mood, holder.firstElementChild?.getAttribute('width') || 64, { accessory: acc });
}

function stars(n, max = 3) {
  let s = '';
  for (let i = 0; i < max; i += 1) s += `<span class="star ${i < n ? 'star--on' : ''}">★</span>`;
  return `<span class="stars" aria-label="Звёзд: ${n} из ${max}">${s}</span>`;
}

// ---------- screens ----------

function renderStart() {
  document.body.dataset.screen = 'start';
  const hasProfile = !!progress.profile;
  const isComeback = !!startInfo.comeback;
  h(`<main class="screen start">
    <div class="start__sea" aria-hidden="true"></div>
    <h1 class="start__title">Острова<br><span>Знаний</span></h1>
    <p class="start__sub">Пять островов, двадцать пять городов и котёнок-проводник</p>
    <div class="start__cat">${kittenSVG(look(), 'excited', 170)}</div>
    ${hasProfile ? `<p class="start__hello" data-say="${esc(say(isComeback ? 'comeback' : 'greeting'))}" data-testid="cat-line"></p>` : ''}
    <button class="btn btn--big" data-go="${hasProfile ? 'map' : 'setup'}" data-testid="start" data-autofocus>${hasProfile ? 'Продолжить' : 'Начать игру'}</button>
  </main>`);
}

function renderSetup() {
  document.body.dataset.screen = 'setup';
  const cur = progress.profile || {};
  const k = cur.kitten || { main: 'ginger', second: 'white', pattern: 'plain' };
  const swatches = (name, sel) => KITTEN_COLORS.map((c) => `<label class="swatch" style="--c:${c.main}" title="${c.name}">
      <input type="radio" name="${name}" value="${c.id}" ${sel === c.id ? 'checked' : ''}><span></span><em>${c.name}</em></label>`).join('');
  h(`${progress.profile ? topBar({ back: 'map', title: 'Мой котёнок' }) : ''}
  <main class="screen setup">
    <h2>Познакомимся!</h2>
    <form id="setup-form" class="card form" autocomplete="off">
      <label class="field">Как тебя зовут?
        <input name="childName" maxlength="20" required value="${esc(cur.childName || '')}" placeholder="Твоё имя" data-testid="child-name"></label>
      <div class="setup__preview" id="preview">${kittenSVG(k, 'cheer', 130)}</div>
      <label class="field">Как зовут котёнка?
        <input name="kittenName" maxlength="16" required value="${esc(cur.kittenName || '')}" placeholder="Например, Пушок" data-testid="kitten-name"></label>
      <fieldset class="field"><legend>Основной цвет</legend><div class="swatches">${swatches('main', k.main)}</div></fieldset>
      <fieldset class="field"><legend>Узор</legend><div class="chips">
        ${PATTERNS.map((p) => `<label class="chip"><input type="radio" name="pattern" value="${p.id}" ${k.pattern === p.id ? 'checked' : ''}><span>${p.name}</span></label>`).join('')}
      </div></fieldset>
      <fieldset class="field" id="second-field"><legend>Цвет узора</legend><div class="swatches">${swatches('second', k.second || 'white')}</div></fieldset>
      <button class="btn btn--big" type="submit" data-testid="setup-done">Готово!</button>
    </form>
  </main>`);
  const form = document.getElementById('setup-form');
  const readLook = () => {
    const fd = new FormData(form);
    return { main: fd.get('main'), second: fd.get('second'), pattern: fd.get('pattern') };
  };
  const refresh = () => {
    const l = readLook();
    document.getElementById('preview').innerHTML = kittenSVG(l, 'cheer', 130);
    document.getElementById('second-field').hidden = l.pattern === 'plain';
  };
  form.addEventListener('change', refresh);
  refresh();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const childName = String(fd.get('childName')).trim();
    const kittenName = String(fd.get('kittenName')).trim();
    if (!childName || !kittenName) return;
    progress.profile = { childName, kittenName, kitten: readLook() };
    save();
    go('map');
  });
}

async function renderMap() {
  document.body.dataset.screen = 'map';
  const cur = P.currentIsland(progress);
  await P.loadIsland(cur);
  const isl = P.islandStatus(progress, cur);
  const doneCities = isl.cities.filter((c) => c.passed).length;
  // island positions on the sea (percent of the map box)
  const pos = { 1: [22, 78], 2: [70, 66], 3: [30, 46], 4: [74, 28], 5: [34, 13] };
  const islands = CONFIG.ISLANDS.map((i) => {
    const unlocked = P.isIslandUnlocked(progress, i);
    const passed = !!progress.islandsPassed?.[i];
    const state = passed ? 'passed' : unlocked ? 'open' : 'locked';
    return `<button class="island island--${state} island--n${i}" style="left:${pos[i][0]}%;top:${pos[i][1]}%"
      ${unlocked ? `data-go="island:${i}"` : 'aria-disabled="true"'} data-testid="island-${i}" data-state="${state}">
      <span class="island__shape"></span>
      <span class="island__label"><b>${i}</b> ${ISLAND_INFO[i].name}</span>
      ${state === 'locked' ? '<span class="island__lock" aria-label="Закрыт">🔒</span>' : ''}
      ${passed ? '<span class="island__badge" aria-label="Пройден">✓</span>' : ''}
    </button>`;
  }).join('');
  const path = '<svg class="map__path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M24 80 C 45 82, 60 76, 70 68 S 40 52, 32 48 S 64 34, 74 30 S 45 18, 36 15" /></svg>';
  h(`${topBar({ title: 'Карта мира' })}
  <main class="screen map">
    ${bubble(say(`island${cur}`, { island: cur }), 'excited', 92, { info: `Остров ${cur}: ${ISLAND_INFO[cur].name}. Пройдено городов: <b>${doneCities} из 5</b>.` })}
    <div class="map__sea">${path}${islands}</div>
    <button class="btn btn--big" data-go="island:${cur}" data-testid="go-island">Плыть на остров ${cur}</button>
  </main>`);
}

async function renderIsland(i) {
  document.body.dataset.screen = 'island';
  if (!P.isIslandUnlocked(progress, i)) return go('map');
  await P.loadIsland(i);
  const isl = P.islandStatus(progress, i);
  let justPassed = false;
  if (isl.passed && !progress.islandsPassed?.[i]) {
    P.markIslandPassed(progress, i);
    justPassed = true;
    save();
  }
  const firstVisit = !progress.seenIslands?.[i];
  progress.seenIslands = { ...(progress.seenIslands || {}), [i]: true };
  if (firstVisit) save();
  const cities = isl.cities.map((c, n) => {
    const subject = CONFIG.SUBJECTS[n];
    const info = SUBJECT_INFO[subject];
    const unlocked = P.cityUnlocked(progress, i, subject);
    const state = c.passed ? 'passed' : unlocked ? 'open' : 'locked';
    const p = c.finished ? pct(c.pct) : `${c.finished}/${c.bank.topics.length} тем`;
    return `<li><button class="city city--${state}" style="--city:${info.color}" ${unlocked ? `data-go="city:${c.id}"` : 'aria-disabled="true"'}
      data-testid="city-${subject}" data-state="${state}">
      <span class="city__icon" aria-hidden="true">${info.icon}</span>
      <span class="city__text"><b>${info.city}</b><small>${info.name}</small></span>
      <span class="city__meta">${state === 'locked' ? '🔒' : `<span class="city__pct">${p}</span>`}${c.passed ? '<span class="city__done">пройден</span>' : ''}</span>
    </button></li>`;
  }).join('');
  const next = isl.current;
  const line = isl.passed ? say('islandDone', { island: i })
    : firstVisit ? say(`island${i}`, { island: i })
      : say(`city_${next.id.split('-')[0]}`, { city: SUBJECT_INFO[next.id.split('-')[0]].city, subject: SUBJECT_INFO[next.id.split('-')[0]].name });
  const info = isl.passed ? (i < 5 ? `Открыт остров ${i + 1}!` : 'Все острова пройдены!')
    : `Дальше: ${SUBJECT_INFO[next.id.split('-')[0]].city}. В каждом городе нужно 70%.`;
  h(`${topBar({ back: 'map', title: `Остров ${i} · ${ISLAND_INFO[i].year}` })}
  <main class="screen island-view">
    ${bubble(line, isl.passed ? 'celebrate' : 'idle', 92, { info, acc: isl.passed ? 'crown' : undefined })}
    <ol class="cities">${cities}</ol>
    ${isl.passed && i < 5 ? `<button class="btn btn--big" data-go="island:${i + 1}" data-testid="next-island">На остров ${i + 1}</button>`
    : !isl.passed ? `<button class="btn btn--big" data-go="city:${next.id}" data-testid="continue">Продолжить</button>` : ''}
  </main>`);
  if (justPassed) {
    FX.playStreak(0, { reduced: FX.reducedMotion(), label: `Остров ${i} пройден!` });
    FX.playSound('streak', soundOn());
  }
}

function renderCity(cityId) {
  document.body.dataset.screen = 'city';
  const [subject, islandStr] = cityId.split('-');
  const island = Number(islandStr);
  if (!P.cityUnlocked(progress, island, subject)) return go(`island:${island}`);
  const c = P.cityStatus(progress, subject, island);
  const info = SUBJECT_INFO[subject];
  const topics = c.bank.topics.map((t) => {
    const st = progress.topics[t.id];
    const s = P.topicScore(progress, t);
    const isNext = c.nextTopic && c.nextTopic.id === t.id;
    const state = st?.skipped ? 'skipped' : st?.done ? 'done' : isNext ? 'next' : 'locked';
    const right = state === 'done' ? `${stars(st.stars || 0)}<span class="topic__pct">${pct(s.pct)}</span>`
      : state === 'skipped' ? '<span class="topic__pct">пропущена</span>'
        : state === 'next' ? '<span class="topic__go">▶</span>' : '<span>🔒</span>';
    const clickable = state === 'next' || state === 'done' || state === 'skipped';
    return `<li><button class="topic topic--${state}" ${clickable ? `data-go="topic:${t.id}"` : 'aria-disabled="true"'} data-testid="topic-${t.n}">
      <span class="topic__n">${t.n}</span><span class="topic__title">${esc(t.title)}${t.type === 'listening' ? ' 🎧' : ''}</span>${right}</button></li>`;
  }).join('');
  let action = '';
  let line;
  let infoText;
  let mood = 'idle';
  const v = { city: info.city, subject: info.name, island };
  if (c.passed) {
    line = say('topicGood', v);
    mood = 'happy';
    infoText = `Город пройден на ${pct(c.pct)}!`;
    action = `<button class="btn btn--big" data-go="island:${island}" data-testid="back-to-island">К острову</button>`;
  } else if (c.allDone) {
    line = say('topicRetry', v);
    mood = 'excited';
    infoText = `В городе ${pct(c.pct)}, нужно 70%. Слабые темы: ${c.practice.map((t) => `«${esc(t.title)}»`).join(', ')}.`;
    action = `<button class="btn btn--big" data-go="practice:${c.id}" data-testid="start-practice">Дополнительные задания</button>`;
  } else {
    line = say(`city_${subject}`, v);
    infoText = c.finished ? `Пройдено тем: ${c.finished} из ${c.bank.topics.length}.`
      : c.bank.topics.length === 5 ? 'Здесь 5 тем по 10 вопросов, последняя — аудирование.' : `Здесь ${c.bank.topics.length} темы по 10 вопросов.`;
    const at = P.topicResumeAt(progress, c.nextTopic.id);
    action = `<button class="btn btn--big" data-go="topic:${c.nextTopic.id}" data-testid="next-topic">${at ? `Продолжить тему ${c.nextTopic.n} (${at + 1}/${c.bank.topics.find((t) => t.id === c.nextTopic.id).questions.length})` : `Тема ${c.nextTopic.n}`}</button>`;
  }
  h(`${topBar({ back: `island:${island}`, title: `${info.icon} ${info.city}` })}
  <main class="screen city-view" style="--city:${info.color}">
    <div class="city-head"><div class="ring" style="--p:${c.total ? c.correct / c.total : 0}"><span>${pct(c.total ? c.correct / c.total : 0)}</span></div>
      <div><h2>${info.name}</h2><p>Остров ${island} · порог 70%</p></div></div>
    ${bubble(line, mood, 80, { info: infoText })}
    <ol class="topics">${topics}</ol>
    ${action}
  </main>`);
}

// ---------- topic: explanation ----------

function explanationScreens(topic) {
  // Short screens: at most ~2 points or ~320 characters each.
  const items = topic.explanation;
  const screens = [];
  let curr = [];
  let len = 0;
  for (const it of items) {
    if (curr.length && (curr.length >= 2 || len + it.length > 320)) {
      screens.push(curr);
      curr = [];
      len = 0;
    }
    curr.push(it);
    len += it.length;
  }
  if (curr.length) screens.push(curr);
  return screens;
}


function renderExplain(topic, page = 0, { fromQuestion = false } = {}) {
  document.body.dataset.screen = 'explain';
  const screens = explanationScreens(topic);
  const last = page >= screens.length - 1;
  const s = progress.session;
  const nextAction = fromQuestion ? 'resume' : last ? 'begin' : `explain:${page + 1}`;
  h(`${topBar({ back: `city:${P.parseId(topic.id).subject}-${P.parseId(topic.id).island}`, title: `Тема ${topic.n}` })}
  <main class="screen explain">
    <h2 class="explain__title">${esc(topic.title)}</h2>
    ${page === 0 ? bubble(say(fromQuestion ? 'hint' : 'beforeExplain'), fromQuestion ? 'thinking' : 'excited', 80) : ''}
    <div class="explain__card card" data-testid="explain-card">
      <ul>${screens[page].map((x) => `<li>${rich(x)}</li>`).join('')}</ul>
    </div>
    <div class="dots" aria-label="Экран ${page + 1} из ${screens.length}">${screens.map((_, i) => `<span class="${i === page ? 'on' : ''}"></span>`).join('')}</div>
    <button class="linkish" data-go="memo${fromQuestion ? ':q' : ''}" data-testid="skip-explain">Пропустить объяснение →</button>
    <div class="row">
      ${page > 0 ? `<button class="btn btn--ghost" data-go="explain:${page - 1}${fromQuestion ? ':q' : ''}">Назад</button>` : ''}
      ${fromQuestion && !last ? `<button class="btn btn--ghost" data-go="resume">К вопросу</button>` : ''}
      <button class="btn" data-go="${fromQuestion && !last ? `explain:${page + 1}:q` : nextAction}" data-testid="explain-next" data-autofocus>
        ${fromQuestion ? (last ? 'К вопросу' : 'Дальше') : last ? (s && s.idx > 0 ? 'Продолжить вопросы' : 'К вопросам!') : 'Дальше'}</button>
    </div>
  </main>`);
}

// ---------- topic: animated scene (explainers/<topic>.js) ----------

function sceneTopicBack(topic) {
  const { subject, island } = P.parseId(topic.id);
  return `city:${subject}-${island}`;
}

function renderScene(topic, scene, page, { fromQuestion = false } = {}) {
  document.body.dataset.screen = 'scene';
  const n = scene.steps.length;
  const i = Math.max(0, Math.min(page, n - 1));
  const step = scene.steps[i];
  const last = i === n - 1;
  const q = fromQuestion ? ':q' : '';
  const s = progress.session;
  const finish = fromQuestion ? 'resume' : 'begin';
  const nextLabel = last ? (fromQuestion ? 'К вопросу' : s && s.idx > 0 ? 'Продолжить вопросы' : 'К вопросам!') : 'Дальше';
  const line = step.cat || (i === 0 ? say(fromQuestion ? 'hint' : 'beforeExplain') : '');
  h(`${topBar({ back: sceneTopicBack(topic), title: `Тема ${topic.n}` })}
  <main class="screen scene" data-testid="scene" data-step="${i}" data-steps="${n}">
    <h2 class="explain__title">${esc(topic.title)}</h2>
    ${bubble(line, i === 0 ? 'excited' : 'idle', 64, { cls: 'guide--scene' })}
    <div class="scene__stage card" data-testid="scene-stage"></div>
    <p class="scene__caption" data-testid="scene-caption">${esc(step.caption)}</p>
    <div class="dots" aria-label="Шаг ${i + 1} из ${n}">${scene.steps.map((_, k) => `<span class="${k === i ? 'on' : ''}"></span>`).join('')}</div>
    <div class="row scene__nav">
      <button class="btn btn--ghost" data-go="explain:${i - 1}${q}" ${i === 0 ? 'disabled' : ''} data-testid="scene-back" aria-label="Назад">←</button>
      <button class="btn btn--ghost" data-go="replay" data-testid="scene-replay" aria-label="Повторить шаг">↻</button>
      <button class="btn" data-go="${last ? finish : `explain:${i + 1}${q}`}" data-testid="scene-next" data-autofocus>${nextLabel}</button>
    </div>
    <div class="scene__extra">
      <button class="linkish" data-go="memo${q}" data-testid="skip-explain">Пропустить объяснение →</button>
      ${fromQuestion && !last ? '<button class="linkish" data-go="resume" data-testid="scene-to-question">К вопросу</button>' : ''}
    </div>
  </main>`);
  const stage = app.querySelector('[data-testid=scene-stage]');
  const mount = () => mountStep(stage, step, { kitten: (mood, size) => kittenSVG(look(), mood, size) });
  mount();
  sceneView = { topic, scene, page: i, fromQuestion, mount };
}
let sceneView = null;

function renderMemo(topic, scene, { fromQuestion = false } = {}) {
  document.body.dataset.screen = 'memo';
  // Памятка: the scene's own memo, or the topic explanation from the question bank (defines every term).
  const items = scene && scene.memo ? scene.memo : topic.explanation;
  const s = progress.session;
  h(`${topBar({ back: sceneTopicBack(topic), title: `Тема ${topic.n}` })}
  <main class="screen memo">
    <h2 class="explain__title">Памятка: ${esc(topic.title)}</h2>
    ${bubble(say('hint'), 'thinking', 64)}
    <div class="card memo__card" data-testid="memo">
      <ul>${items.map((x) => `<li>${rich(x)}</li>`).join('')}</ul>
    </div>
    <div class="row">
      <button class="btn btn--ghost" data-go="explain:0${fromQuestion ? ':q' : ''}" data-testid="memo-to-scene">Смотреть объяснение</button>
      <button class="btn" data-go="${fromQuestion ? 'resume' : 'begin'}" data-testid="explain-next" data-autofocus>${fromQuestion ? 'К вопросу' : s && s.idx > 0 ? 'Продолжить вопросы' : 'К вопросам!'}</button>
    </div>
  </main>`);
}

let cartoonPlayer = null;

function renderCartoon(topic, scene, page, { fromQuestion = false } = {}) {
  document.body.dataset.screen = 'scene';
  const n = scene.episodes.length;
  const i = Math.max(0, Math.min(page, n - 1));
  const ep = scene.episodes[i];
  const last = i === n - 1;
  const q = fromQuestion ? ':q' : '';
  const s = progress.session;
  const finish = fromQuestion ? 'resume' : 'begin';
  const nextLabel = last ? (fromQuestion ? 'К вопросу' : s && s.idx > 0 ? 'Продолжить вопросы' : 'К вопросам!') : 'Дальше';
  h(`${topBar({ back: sceneTopicBack(topic), title: `Тема ${topic.n} · мультик` })}
  <main class="screen scene scene--cartoon" data-testid="scene" data-step="${i}" data-steps="${n}">
    <h2 class="explain__title">${esc(topic.title)}</h2>
    <div class="cartoon-title">Серия ${i + 1} из ${n}: <b>${esc(ep.title)}</b></div>
    <div class="cartoon-stage card" data-testid="scene-stage"></div>
    <p class="cartoon-sub" data-testid="scene-caption" aria-live="polite"></p>
    <div class="dots" aria-label="Серия ${i + 1} из ${n}">${scene.episodes.map((_, k) => `<span class="${k === i ? 'on' : ''}"></span>`).join('')}</div>
    <div class="row scene__nav">
      <button class="btn btn--ghost" data-go="explain:${i - 1}${q}" ${i === 0 ? 'disabled' : ''} data-testid="scene-back" aria-label="Предыдущая серия">←</button>
      <button class="btn btn--ghost" data-go="cartoon-toggle" data-testid="scene-pause" aria-label="Пауза">❚❚</button>
      <button class="btn btn--ghost" data-go="replay" data-testid="scene-replay" aria-label="Смотреть ещё раз">↻</button>
      <button class="btn" data-go="${last ? finish : `explain:${i + 1}${q}`}" data-testid="scene-next">${nextLabel}</button>
    </div>
    <div class="scene__extra">
      <button class="linkish" data-go="memo${q}" data-testid="skip-explain">Пропустить мультик → памятка</button>
      ${fromQuestion && !last ? '<button class="linkish" data-go="resume" data-testid="scene-to-question">К вопросу</button>' : ''}
    </div>
  </main>`);
  const stage = app.querySelector('[data-testid=scene-stage]');
  const sub = app.querySelector('[data-testid=scene-caption]');
  const pauseBtn = app.querySelector('[data-testid=scene-pause]');
  const sync = () => {
    pauseBtn.textContent = cartoonPlayer.playing && !cartoonPlayer.ended ? '❚❚' : '▶';
    pauseBtn.setAttribute('aria-label', cartoonPlayer.playing && !cartoonPlayer.ended ? 'Пауза' : 'Смотреть');
  };
  if (cartoonPlayer) cartoonPlayer.destroy();
  cartoonPlayer = createCartoon(stage, sub, ep, {
    kitten: (mood, size) => kittenSVG(look(), mood, size),
    reduced: FX.reducedMotion(),
    speak: voiceOn() ? kittenSpeak : null,
    onEnd: () => {
      sync();
      app.querySelector('[data-testid=scene-next]')?.classList.add('pulse');
    },
  });
  cartoonPlayer.play();
  sync();
  sceneView = { mount: () => { cartoonPlayer.replay(); sync(); app.querySelector('[data-testid=scene-next]')?.classList.remove('pulse'); } };
  cartoonView = { sync };
}
let cartoonView = null;

async function showExplanation(topic, page, opts) {
  if (cartoonPlayer) { cartoonPlayer.destroy(); cartoonPlayer = null; }
  const scene = await loadScene(topic.id);
  if (scene && scene.kind === 'cartoon') return renderCartoon(topic, scene, page, opts);
  if (scene) return renderScene(topic, scene, page, opts);
  return renderExplain(topic, page, opts);
}

// ---------- questions ----------

let answering = null; // { question, topic, order: [optionIdx...], answered }

function currentSessionQuestion() {
  const s = progress.session;
  const qid = s.order[s.idx];
  const { subject, island } = P.parseId(qid);
  return { ...P.findQuestion(subject, island, qid), subject, island };
}

async function renderQuestion() {
  document.body.dataset.screen = 'question';
  const s = progress.session;
  if (!s || s.idx >= s.order.length) return finishSession();
  const { topic, question, subject, island } = currentSessionQuestion();
  const order = P.shuffle([0, 1, 2]); // options are shuffled every time the question is shown
  answering = { topic, question, order, answered: false, shownAt: performance.now() };
  const info = SUBJECT_INFO[subject];
  const passage = question.passage ? topic.passages.find((x) => x.id === question.passage) : null;
  let passageHtml = '';
  if (passage && passage.kind === 'reading') {
    passageHtml = `<div class="passage card"><div class="passage__label">Прочитай текст</div><p lang="en">${esc(passage.text)}</p></div>`;
  } else if (passage && passage.kind === 'listening') {
    passageHtml = `<div class="listen card" data-testid="listen-box">
      <div class="listen__label">🎧 Послушай и ответь</div>
      <div class="listen__status" id="listen-status">Готовлю голос…</div>
      <div class="row row--center"><button class="btn btn--listen" id="listen-btn" data-testid="listen-play" disabled>▶ Слушать</button></div>
    </div>`;
  }
  const label = s.kind === 'practice' ? 'Дополнительные задания' : `Тема ${topic.n}`;
  h(`${topBar({ back: `city:${subject}-${island}`, title: `${info.icon} ${label}` })}
  <main class="screen question" style="--city:${info.color}">
    <div class="qhead">
      <div class="progressbar" aria-label="Вопрос ${s.idx + 1} из ${s.order.length}"><span style="width:${(s.idx / s.order.length) * 100}%"></span></div>
      <span class="qhead__n" data-testid="q-counter">${s.idx + 1}/${s.order.length}</span>
      <span class="streak-chip ${progress.streak >= 2 ? '' : 'is-hidden'}" data-testid="streak">🔥 <b>${progress.streak || 0}</b></span>
      <button class="btn btn--small btn--ghost" data-go="explain:0:q" data-testid="reopen-explain" aria-label="Подсказка от котёнка">💡 Подсказка</button>
    </div>
    ${bubble(say('beforeQuestion'), 'idle', 46, { cls: 'guide--mini' })}
    ${passageHtml}
    <h2 class="qtext" data-testid="q-text" ${subject === 'english' || /^[\x00-\x7F]+$/.test(question.text) ? 'lang="en"' : ''}>${esc(question.text)}</h2>
    <div class="options" role="group" aria-label="Варианты ответа">
      ${order.map((oi, k) => `<button class="option" data-opt="${k}" data-testid="option">
        <span class="option__letter">${'ABC'[k]}</span><span class="option__text">${esc(question.options[oi])}</span></button>`).join('')}
    </div>
    <div class="feedback" id="feedback" aria-live="polite"></div>
  </main>`);
  if (passage && passage.kind === 'listening') setupListening(passage, topic);
  armIdle();
}

// After CONFIG.IDLE_MS without an answer the kitten dozes off and says something gentle.
function armIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (!answering || answering.answered) return;
    const g = app.querySelector('.guide--mini');
    if (!g) return;
    setCat(g, 'sleepy');
    const idleLine = say('idle');
    typeInto(g.querySelector('.guide__say'), idleLine, { reduced: FX.reducedMotion() });
    if (voiceOn()) kittenSpeak(idleLine);
    g.dataset.idle = '1';
  }, CONFIG.IDLE_MS);
}

const soundOn = () => progress.settings?.sound !== false;
const voiceOn = () => progress.settings?.voice !== false;
let hasVoice = false;

// A correct answer is "fast" when it comes within CONFIG.FAST_ANSWER_MS of showing the question.
// Measured from showing the question to the tap, so the reaction animation never affects it.
function isFast(question, ms) {
  return ms < CONFIG.FAST_ANSWER_MS;
}

async function setupListening(passage, topic) {
  const btn = document.getElementById('listen-btn');
  const status = document.getElementById('listen-status');
  const voice = await getEnglishVoice();
  if (!btn.isConnected) return;
  if (!voice) {
    status.innerHTML = 'На этом устройстве нет английского голоса, поэтому аудирование не может звучать. Можно пропустить тему: это не штраф.';
    status.classList.add('listen__status--warn');
    const row = btn.parentElement;
    btn.remove();
    if (progress.session.kind === 'topic') {
      row.insertAdjacentHTML('beforeend', `<button class="btn btn--ghost" data-go="skip-topic:${topic.id}" data-testid="skip-listening">Пропустить тему</button>`);
    }
    return;
  }
  status.textContent = `Голос: ${voice.name}. Нажимай «Повторить» сколько угодно.`;
  btn.disabled = false;
  let plays = 0;
  const play = () => {
    plays += 1;
    btn.textContent = '🔊 Звучит…';
    speak(passage.text, {
      onend: () => {
        if (btn.isConnected) btn.textContent = '🔁 Повторить';
      },
    });
    btn.dataset.plays = String(plays);
    setTimeout(() => {
      if (btn.isConnected && btn.textContent.startsWith('🔊')) btn.textContent = '🔁 Повторить';
    }, 600);
  };
  btn.addEventListener('click', play);
  // Play automatically the first time this text appears.
  const s = progress.session;
  const prevQid = s.order[s.idx - 1];
  const prev = prevQid ? P.findQuestion(P.parseId(prevQid).subject, P.parseId(prevQid).island, prevQid) : null;
  if (!prev || prev.question.passage !== passage.id || prev.topic.id !== topic.id) play();
}

const STREAK_MARKS = [3, 5, 10];

function onAnswer(k) {
  if (!answering || answering.answered) return;
  const elapsed = performance.now() - answering.shownAt; // before any animation starts
  answering.answered = true;
  clearTimeout(idleTimer);
  const { topic, question, order } = answering;
  const chosen = order[k];
  const correct = chosen === question.answer;
  const fast = correct && isFast(question, elapsed);
  P.recordAnswer(progress, topic.id, question.id, correct);
  progress.session.idx += 1;
  progress.streak = correct ? (progress.streak || 0) + 1 : 0;
  wrongRun = correct ? 0 : wrongRun + 1;
  save();

  const streak = progress.streak;
  const streakMark = correct && STREAK_MARKS.includes(streak) ? streak : 0;
  let group;
  if (correct) group = streakMark ? `streak${streakMark}` : fast ? 'correctFast' : 'correct';
  else group = wrongRun >= 2 ? 'wrongAgain' : 'wrong';
  const line = say(group, { streak });
  if (voiceOn()) kittenSpeak(line);
  const reaction = FX.pickReaction(correct ? 'correct' : 'wrong');
  const mood = correct
    ? (streak >= 10 ? 'celebrate' : fast || streakMark ? 'excited' : 'happy')
    : { tiltSoft: 'sad_soft', pawPoint: 'idle', softBubbles: 'sad_soft', thinkNod: 'thinking' }[reaction];
  const acc = correct ? (streak >= 10 ? 'crown' : streak >= 5 ? 'glasses' : undefined) : undefined;

  const buttons = app.querySelectorAll('.option');
  let rightEl = null;
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (order[i] === question.answer) {
      b.classList.add('option--right');
      rightEl = b;
    } else if (i === k) b.classList.add('option--wrong');
  });
  const fb = document.getElementById('feedback');
  const right = question.options[question.answer];
  fb.innerHTML = `<div class="fb fb--${correct ? 'ok' : 'no'}" data-testid="feedback" data-correct="${correct}"
      data-reaction="${reaction}" data-fast="${fast}" data-group="${group}">
    <div class="fb__cat guide__cat">${kittenSVG(look(), mood, 64, { accessory: acc })}</div>
    <div class="fb__body">
      <b class="fb__line" data-testid="fb-line">${esc(line)}${correct ? ' <span class="fb__plus">+1 🪙</span>' : ''}</b>
      ${correct ? '' : `<p class="fb__right">Правильный ответ: «${esc(right)}»</p>`}
      ${question.why ? `<p><span class="fb__why">Почему:</span> ${esc(question.why)}</p>` : ''}
    </div>
    <button class="btn" data-go="next" data-testid="next-question">Дальше</button>
  </div>`;
  const coins = app.querySelector('[data-testid="coins"]');
  if (coins) {
    coins.textContent = progress.coins;
    if (correct) FX.bump(coins.parentElement);
  }
  const chip = app.querySelector('[data-testid="streak"]');
  if (chip) {
    chip.querySelector('b').textContent = streak;
    chip.classList.toggle('is-hidden', streak < 2);
    if (correct) FX.bump(chip);
  }
  // The question's own kitten reacts too (paw points at the right answer, head tilts...)
  const mini = app.querySelector('.guide--mini');
  if (mini) mini.classList.add('is-quiet');
  const reduced = FX.reducedMotion();
  FX.playReaction(reaction, {
    kind: correct ? 'correct' : 'wrong', fast, reduced,
    optionEl: buttons[k], rightEl, scoreEl: coins, catEl: fb.querySelector('.fb__cat'),
  });
  if (streakMark) FX.playStreak(streakMark, { reduced });
  FX.playSound(streakMark ? 'streak' : correct ? (fast ? 'fast' : 'correct') : 'wrong', soundOn());
  const next = fb.querySelector('button');
  next.focus({ preventScroll: true });
  fb.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
}

function finishSession() {
  const s = progress.session;
  if (s.kind === 'topic') {
    const { subject, island } = P.parseId(s.topicId);
    const topic = P.getBank(subject, island).topics.find((t) => t.id === s.topicId);
    const score = P.finishTopic(progress, topic);
    progress.session = null;
    save();
    return renderTopicResult(topic, score);
  }
  const cityId = s.cityId;
  progress.session = null;
  save();
  const [subject, island] = cityId.split('-');
  const c = P.cityStatus(progress, subject, Number(island));
  return renderPracticeResult(c);
}

function renderTopicResult(topic, score) {
  document.body.dataset.screen = 'result';
  const { subject, island } = P.parseId(topic.id);
  const st = progress.topics[topic.id];
  const c = P.cityStatus(progress, subject, island);
  const good = score.pct >= CONFIG.PASS_THRESHOLD;
  const line = say(good ? 'topicGood' : 'topicRetry', { subject: SUBJECT_INFO[subject].name });
  h(`${topBar({ title: 'Итог темы' })}
  <main class="screen result">
    <h2>${esc(topic.title)}</h2>
    <div class="result__stars">${stars(st.stars || 0)}</div>
    <div class="result__pct" data-testid="topic-pct">${pct(score.pct)}</div>
    ${bubble(line, good ? 'celebrate' : 'excited', 90, { info: `Правильно ${score.correct} из ${score.answered}.` })}
    <div class="fact card" data-testid="cat-fact"><span class="fact__label">Факт от котёнка</span><p>${esc(say(`fact_${subject}`))}</p></div>
    <p class="muted">Город: ${pct(c.total ? c.correct / c.total : 0)} · нужно 70%</p>
    <button class="btn btn--big" data-go="city:${subject}-${island}" data-testid="result-continue" data-autofocus>Дальше</button>
  </main>`);
}

function renderPracticeResult(c) {
  document.body.dataset.screen = 'result';
  const island = Number(c.id.split('-')[1]);
  h(`${topBar({ title: 'Итог тренировки' })}
  <main class="screen result">
    <div class="result__pct" data-testid="city-pct">${pct(c.pct)}</div>
    ${bubble(say(c.passed ? 'topicGood' : 'topicRetry'), c.passed ? 'celebrate' : 'excited', 90, { info: c.passed ? 'Город пройден!' : `Уже ${pct(c.pct)}, нужно 70%.` })}
    <button class="btn btn--big" data-go="${c.passed ? `island:${island}` : `city:${c.id}`}" data-testid="result-continue" data-autofocus>Дальше</button>
  </main>`);
}

// ---------- settings ----------

function voiceControls() {
  const t = kittenTone();
  const names = listRussianVoices();
  return `<div class="voice-set" data-testid="voice-set">
      ${names.length > 1 ? `<label class="voice-set__row">Голос
        <select data-testid="voice-name" data-voice="name">${names.map((n) => `<option value="${esc(n)}"${n === t.voice ? ' selected' : ''}>${esc(n)}</option>`).join('')}</select></label>` : ''}
      <label class="voice-set__row">Ниже <input type="range" min="1" max="2" step="0.05" value="${t.pitch}" data-voice="pitch" data-testid="voice-pitch" aria-label="Высота голоса"> Тоньше</label>
      <label class="voice-set__row">Медленнее <input type="range" min="0.8" max="1.4" step="0.05" value="${t.rate}" data-voice="rate" data-testid="voice-rate" aria-label="Скорость речи"> Быстрее</label>
      <button class="btn btn--ghost" data-go="voice-test" data-testid="voice-test">▶ Послушать котёнка</button>
    </div>`;
}

function bindVoiceControls() {
  app.querySelectorAll('[data-voice]').forEach((el) => el.addEventListener('change', () => {
    const k = el.dataset.voice;
    const key = { name: 'voiceName', pitch: 'voicePitch', rate: 'voiceRate' }[k];
    progress.settings = { ...(progress.settings || {}), [key]: k === 'name' ? el.value : Number(el.value) };
    save();
    setKittenTone({ [k]: k === 'name' ? el.value : Number(el.value) });
    kittenSpeak(`Мяу! Меня зовут ${progress.profile?.kittenName || 'котёнок'}. Так хорошо?`);
  }));
}

function renderSettings() {
  document.body.dataset.screen = 'settings';
  h(`${topBar({ back: progress.profile ? 'map' : 'start', title: 'Настройки' })}
  <main class="screen settings">
    <section class="card">
      <h3>Котёнок</h3>
      <button class="btn btn--ghost" data-go="setup">Изменить имя и цвет</button>
    </section>
    <section class="card">
      <h3>Звук</h3>
      <button class="btn btn--ghost" data-go="toggle-sound" data-testid="sound-toggle" aria-pressed="${soundOn()}">${soundOn() ? '🔊 Звук включён' : '🔈 Звук выключен'}</button>
      <button class="btn btn--ghost" data-go="toggle-voice" data-testid="voice-toggle" aria-pressed="${voiceOn()}">${voiceOn() ? '🗣️ Котёнок говорит вслух' : '🤐 Котёнок молчит'}</button>
      ${voiceOn() && !hasVoice ? '<p class="muted" data-testid="voice-missing">На этом устройстве нет русского голоса — котёнок пишет фразы текстом.</p>' : ''}
      ${voiceOn() && hasVoice ? voiceControls() : ''}
    </section>
    <section class="card">
      <h3>Прогресс</h3>
      <p class="muted">Прогресс хранится только в этом браузере. Мы ничего не собираем и никуда не отправляем.</p>
      <div class="row row--wrap">
        <button class="btn btn--ghost" data-go="export" data-testid="export">Сохранить в файл</button>
        <label class="btn btn--ghost">Загрузить из файла<input type="file" accept="application/json,.json" id="import-file" hidden></label>
        <button class="btn btn--danger" data-go="reset" data-testid="reset">Сбросить прогресс</button>
      </div>
      <p class="muted" id="settings-msg" aria-live="polite"></p>
    </section>
    <section class="card about">
      <h3>Об игре</h3>
      <p>Обучающая игра для повторения школьной программы Year 6–10.</p>
      <p class="about__mark">${esc(AUTHOR_MARK)}</p>
    </section>
  </main>`);
  document.getElementById('import-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const msg = document.getElementById('settings-msg');
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!P.validateImported(data)) throw new Error('bad');
      progress = P.migrate(data);
      save();
      msg.textContent = 'Прогресс загружен.';
    } catch {
      msg.textContent = 'Этот файл не подходит.';
    }
  });
  bindVoiceControls();
}

function exportProgress() {
  const blob = new Blob([JSON.stringify(progress, null, 1)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `ostrova-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// ---------- routing ----------

// A new version of the game was downloaded in the background: switch to it at a calm moment
// (start screen or map), never in the middle of a question. Progress is kept in localStorage.
let updateReady = false;
async function go(target) {
  const [name, ...rest] = target.split(':');
  const arg = rest.join(':');
  if (updateReady && ['map', 'start', 'island'].includes(name)) { save(); location.reload(); return undefined; }
  try {
    switch (name) {
      case 'start': return renderStart();
      case 'setup': return renderSetup();
      case 'map':
        if (!progress.profile) return renderSetup();
        // resume an unfinished topic or practice
        if (progress.session && view.name === 'start') return resumeSession();
        return await renderMap();
      case 'island': return await renderIsland(Number(arg));
      case 'city': {
        const [subject, island] = arg.split('-');
        await P.loadIsland(Number(island));
        return renderCity(`${subject}-${island}`);
      }
      case 'topic': {
        const { subject, island } = P.parseId(arg);
        await P.loadIsland(island);
        const topic = P.getBank(subject, island).topics.find((t) => t.id === arg);
        P.startTopicSession(progress, topic);
        save();
        return await showExplanation(topic, 0);
      }
      case 'explain': {
        const [page, q] = arg.split(':');
        const s = progress.session;
        const topic = s.kind === 'topic' ? topicOfSession() : currentSessionQuestion().topic;
        return await showExplanation(topic, Number(page), { fromQuestion: q === 'q' });
      }
      case 'memo': {
        const s = progress.session;
        const topic = s.kind === 'topic' ? topicOfSession() : currentSessionQuestion().topic;
        return renderMemo(topic, await loadScene(topic.id), { fromQuestion: arg === 'q' });
      }
      case 'replay':
        if (sceneView) sceneView.mount();
        return undefined;
      case 'cartoon-toggle':
        if (cartoonPlayer) {
          if (cartoonPlayer.ended) cartoonPlayer.replay();
          else if (cartoonPlayer.playing) { cartoonPlayer.pause(); stopSpeaking(); }
          else cartoonPlayer.play();
          cartoonView?.sync();
        }
        return undefined;
      case 'begin':
        progress.session.stage = 'questions';
        save();
        return await renderQuestion();
      case 'resume':
      case 'next': return await renderQuestion();
      case 'practice': {
        const [subject, island] = arg.split('-');
        await P.loadIsland(Number(island));
        const c = P.cityStatus(progress, subject, Number(island));
        P.startPracticeSession(progress, c);
        save();
        return await renderQuestion();
      }
      case 'skip-topic': {
        const { subject, island } = P.parseId(arg);
        const topic = P.getBank(subject, island).topics.find((t) => t.id === arg);
        P.skipTopic(progress, topic);
        progress.session = null;
        save();
        return renderCity(`${subject}-${island}`);
      }
      case 'settings': return renderSettings();
      case 'toggle-sound':
        progress.settings = { ...(progress.settings || {}), sound: !soundOn() };
        save();
        if (soundOn()) FX.playSound('correct', true);
        return renderSettings();
      case 'voice-test':
        kittenSpeak(`Мяу! Привет! Я твой котёнок. Давай учиться вместе!`);
        return undefined;
      case 'toggle-voice':
        progress.settings = { ...(progress.settings || {}), voice: !voiceOn() };
        save();
        if (voiceOn()) kittenSpeak('Мяу! Теперь я говорю вслух.'); else stopSpeaking();
        return renderSettings();
      case 'export': return exportProgress();
      case 'reset':
        // eslint-disable-next-line no-alert
        if (window.confirm('Точно сбросить весь прогресс? Это нельзя отменить.')) {
          progress = P.emptyProgress();
          save();
          return renderStart();
        }
        return undefined;
      default: return renderStart();
    }
  } finally {
    view = { name };
  }
}

function topicOfSession() {
  const { subject, island } = P.parseId(progress.session.topicId);
  return P.getBank(subject, island).topics.find((t) => t.id === progress.session.topicId);
}

async function resumeSession() {
  const s = progress.session;
  const id = s.kind === 'topic' ? s.topicId : s.cityId;
  const { subject, island } = P.parseId(s.kind === 'topic' ? id : `${id}-0-0`);
  await P.loadIsland(island);
  if (s.kind === 'topic' && s.stage === 'explain') return showExplanation(topicOfSession(), 0);
  if (s.kind === 'topic' && !P.getBank(subject, island)) return renderMap();
  return renderQuestion();
}

app.addEventListener('click', (e) => {
  const opt = e.target.closest('[data-opt]');
  if (opt) return onAnswer(Number(opt.dataset.opt));
  const el = e.target.closest('[data-go]');
  if (el && !el.disabled) {
    e.preventDefault();
    go(el.dataset.go);
  }
  return undefined;
});

// ---------- boot ----------

function boot() {
  if (!verifyAuthorMark()) {
    document.body.innerHTML = '<p style="padding:2rem;font:1.2rem sans-serif">Игра повреждена и не может запуститься.</p>';
    return;
  }
  document.body.classList.add('ready');
  // A "comeback" is a visit after a break of CONFIG.COMEBACK_AFTER_MS or more.
  const now = Date.now();
  startInfo.comeback = !!(progress.profile && progress.lastSeen && now - progress.lastSeen >= CONFIG.COMEBACK_AFTER_MS);
  progress.lastSeen = now;
  save();
  setInterval(() => { progress.lastSeen = Date.now(); save(); }, 60000);
  if (['localhost', '127.0.0.1'].includes(location.hostname) || /[?&]debug\b/.test(location.search)) devCheckPhrases();
  setKittenTone({ pitch: progress.settings?.voicePitch, rate: progress.settings?.voiceRate, name: progress.settings?.voiceName || '' });
  getRussianVoice().then((v) => { hasVoice = !!v; });
  renderStart();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    const hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController) return; // first install: the page is already up to date
      updateReady = true;
      if (['start', 'map'].includes(document.body.dataset.screen)) { save(); location.reload(); }
    });
    navigator.serviceWorker.register('sw.js').then((r) => r.update()).catch(() => {});
  }
}

window.__game = { get progress() { return progress; }, go };
boot();

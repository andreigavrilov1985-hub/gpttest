import { CONFIG, SUBJECT_INFO, ISLAND_INFO } from './config.js';
import * as P from './progress.js';
import { kittenSVG, KITTEN_COLORS, PATTERNS } from './kitten.js';
import { getEnglishVoice, speak, stopSpeaking } from './speech.js';
import { AUTHOR_MARK, verifyAuthorMark } from './author.js';

const app = document.getElementById('app');
let progress = P.loadProgress();
let view = { name: 'start' };

// ---------- helpers ----------
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Explanations may contain <b>…</b> from Notion; everything else is escaped.
const rich = (s) => esc(s).replace(/&lt;(\/?)b&gt;/g, '<$1b>').replace(/\n/g, '<br>');
const pct = (x) => `${Math.round(x * 100)}%`;
const save = () => P.saveProgress(progress);
const look = () => progress.profile?.kitten || { main: 'ginger', pattern: 'plain' };
const kid = () => progress.profile?.childName || 'друг';
const kitty = () => progress.profile?.kittenName || 'Котёнок';
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function h(html) {
  stopSpeaking();
  app.innerHTML = html;
  app.scrollTop = 0;
  window.scrollTo(0, 0);
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

function bubble(text, mood = 'neutral', size = 92) {
  return `<div class="guide">
    <div class="guide__cat">${kittenSVG(look(), mood, size)}</div>
    <div class="guide__bubble"><span class="guide__name">${esc(kitty())}</span>${text}</div>
  </div>`;
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
  h(`<main class="screen start">
    <div class="start__sea" aria-hidden="true"></div>
    <h1 class="start__title">Острова<br><span>Знаний</span></h1>
    <p class="start__sub">Пять островов, двадцать пять городов и котёнок-проводник</p>
    <div class="start__cat">${kittenSVG(look(), 'cheer', 170)}</div>
    ${hasProfile ? `<p class="start__hello">С возвращением, ${esc(kid())}! ${esc(kitty())} ждёт тебя.</p>` : ''}
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
    ${bubble(`${esc(kid())}, мы на острове <b>${cur}</b>: ${ISLAND_INFO[cur].name}. Пройдено городов: <b>${doneCities} из 5</b>.`, 'cheer')}
    <div class="map__sea">${path}${islands}</div>
    <button class="btn btn--big" data-go="island:${cur}" data-testid="go-island">Плыть на остров ${cur}</button>
  </main>`);
}

async function renderIsland(i) {
  document.body.dataset.screen = 'island';
  if (!P.isIslandUnlocked(progress, i)) return go('map');
  await P.loadIsland(i);
  const isl = P.islandStatus(progress, i);
  if (isl.passed && !progress.islandsPassed?.[i]) {
    P.markIslandPassed(progress, i);
    save();
  }
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
  const msg = isl.passed
    ? (i < 5 ? `Ура, ${esc(kid())}! Остров пройден. Открыт остров ${i + 1}!` : `${esc(kid())}, ты прошёл все острова!`)
    : `${esc(kid())}, нас ждёт ${SUBJECT_INFO[next.id.split('-')[0]].city}. Нужно набрать 70% в каждом городе.`;
  h(`${topBar({ back: 'map', title: `Остров ${i} · ${ISLAND_INFO[i].year}` })}
  <main class="screen island-view">
    ${bubble(msg, isl.passed ? 'happy' : 'neutral')}
    <ol class="cities">${cities}</ol>
    ${isl.passed && i < 5 ? `<button class="btn btn--big" data-go="island:${i + 1}" data-testid="next-island">На остров ${i + 1}</button>`
    : !isl.passed ? `<button class="btn btn--big" data-go="city:${next.id}" data-testid="continue">Продолжить</button>` : ''}
  </main>`);
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
  let msg;
  if (c.passed) {
    msg = `Город пройден на ${pct(c.pct)}! Молодец, ${esc(kid())}!`;
    action = `<button class="btn btn--big" data-go="island:${island}" data-testid="back-to-island">К острову</button>`;
  } else if (c.allDone) {
    msg = `${esc(kid())}, в городе ${pct(c.pct)}, а нужно 70%. Давай потренируемся! Слабые темы: ${c.practice.map((t) => `«${esc(t.title)}»`).join(', ')}.`;
    action = `<button class="btn btn--big" data-go="practice:${c.id}" data-testid="start-practice">Дополнительные задания</button>`;
  } else {
    msg = c.finished ? `Пройдено тем: ${c.finished} из ${c.bank.topics.length}. Вперёд!` : `Добро пожаловать в ${info.city}! Здесь ${c.bank.topics.length} темы по 10 вопросов.`;
    if (c.bank.topics.length === 5 && !c.finished) msg = `Добро пожаловать в ${info.city}! Здесь 5 тем по 10 вопросов, последняя — аудирование.`;
    action = `<button class="btn btn--big" data-go="topic:${c.nextTopic.id}" data-testid="next-topic">Тема ${c.nextTopic.n}</button>`;
  }
  h(`${topBar({ back: `island:${island}`, title: `${info.icon} ${info.city}` })}
  <main class="screen city-view" style="--city:${info.color}">
    <div class="city-head"><div class="ring" style="--p:${c.total ? c.correct / c.total : 0}"><span>${pct(c.total ? c.correct / c.total : 0)}</span></div>
      <div><h2>${info.name}</h2><p>Остров ${island} · порог 70%</p></div></div>
    ${bubble(msg, c.passed ? 'happy' : 'neutral', 80)}
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

function introLine(topic) {
  const m = /\(([^)]+)\)/.exec(topic.explanationLabel || '');
  return m ? `${esc(kid())}, ${esc(m[1])}.` : `${esc(kid())}, сначала коротко о теме.`;
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
    ${page === 0 ? bubble(introLine(topic), 'cheer', 80) : ''}
    <div class="explain__card card" data-testid="explain-card">
      <ul>${screens[page].map((x) => `<li>${rich(x)}</li>`).join('')}</ul>
    </div>
    <div class="dots" aria-label="Экран ${page + 1} из ${screens.length}">${screens.map((_, i) => `<span class="${i === page ? 'on' : ''}"></span>`).join('')}</div>
    <div class="row">
      ${page > 0 ? `<button class="btn btn--ghost" data-go="explain:${page - 1}${fromQuestion ? ':q' : ''}">Назад</button>` : ''}
      ${fromQuestion && !last ? `<button class="btn btn--ghost" data-go="resume">К вопросу</button>` : ''}
      <button class="btn" data-go="${fromQuestion && !last ? `explain:${page + 1}:q` : nextAction}" data-testid="explain-next" data-autofocus>
        ${fromQuestion ? (last ? 'К вопросу' : 'Дальше') : last ? (s && s.idx > 0 ? 'Продолжить вопросы' : 'К вопросам!') : 'Дальше'}</button>
    </div>
  </main>`);
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
      <button class="btn btn--small btn--ghost" data-go="explain:0:q" data-testid="reopen-explain">📘 Объяснение</button>
    </div>
    ${passageHtml}
    <h2 class="qtext" data-testid="q-text" ${subject === 'english' || /^[\x00-\x7F]+$/.test(question.text) ? 'lang="en"' : ''}>${esc(question.text)}</h2>
    <div class="options" role="group" aria-label="Варианты ответа">
      ${order.map((oi, k) => `<button class="option" data-opt="${k}" data-testid="option">
        <span class="option__letter">${'ABC'[k]}</span><span class="option__text">${esc(question.options[oi])}</span></button>`).join('')}
    </div>
    <div class="feedback" id="feedback" aria-live="polite"></div>
  </main>`);
  if (passage && passage.kind === 'listening') setupListening(passage, topic);
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

const PRAISE = ['Отлично', 'Супер', 'Верно', 'Здорово', 'Так держать', 'Умница'];
const CHEER = ['Ничего страшного', 'Не беда', 'Почти', 'Бывает'];

function onAnswer(k) {
  if (!answering || answering.answered) return;
  answering.answered = true;
  const { topic, question, order } = answering;
  const chosen = order[k];
  const correct = chosen === question.answer;
  P.recordAnswer(progress, topic.id, question.id, correct);
  progress.session.idx += 1;
  save();
  const buttons = app.querySelectorAll('.option');
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (order[i] === question.answer) b.classList.add('option--right');
    else if (i === k) b.classList.add('option--wrong');
  });
  const fb = document.getElementById('feedback');
  const right = question.options[question.answer];
  fb.innerHTML = `<div class="fb fb--${correct ? 'ok' : 'no'}" data-testid="feedback" data-correct="${correct}">
    <div class="fb__cat">${kittenSVG(look(), correct ? 'happy' : 'think', 64)}</div>
    <div class="fb__body">
      <b>${correct ? `${pick(PRAISE)}, ${esc(kid())}! +1 🪙` : `${pick(CHEER)}, ${esc(kid())}! Правильный ответ: «${esc(right)}».`}</b>
      <p><span class="fb__why">Почему:</span> ${esc(question.why)}</p>
    </div>
    <button class="btn" data-go="next" data-testid="next-question">Дальше</button>
  </div>`;
  const coins = app.querySelector('[data-testid="coins"]');
  if (coins) coins.textContent = progress.coins;
  fb.querySelector('button').focus({ preventScroll: true });
  fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
  const msg = good ? `${esc(kid())}, ${score.correct} из ${score.answered}! Я тобой горжусь!`
    : `${esc(kid())}, ${score.correct} из ${score.answered}. Ничего, потренируемся и всё получится!`;
  h(`${topBar({ title: 'Итог темы' })}
  <main class="screen result">
    <h2>${esc(topic.title)}</h2>
    <div class="result__stars">${stars(st.stars || 0)}</div>
    <div class="result__pct" data-testid="topic-pct">${pct(score.pct)}</div>
    ${bubble(msg, good ? 'happy' : 'cheer', 90)}
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
    ${bubble(c.passed ? `Ура, ${esc(kid())}! Город пройден!` : `${esc(kid())}, уже ${pct(c.pct)}. Ещё немного тренировки!`, c.passed ? 'happy' : 'cheer', 90)}
    <button class="btn btn--big" data-go="${c.passed ? `island:${island}` : `city:${c.id}`}" data-testid="result-continue" data-autofocus>Дальше</button>
  </main>`);
}

// ---------- settings ----------

function renderSettings() {
  document.body.dataset.screen = 'settings';
  h(`${topBar({ back: progress.profile ? 'map' : 'start', title: 'Настройки' })}
  <main class="screen settings">
    <section class="card">
      <h3>Котёнок</h3>
      <button class="btn btn--ghost" data-go="setup">Изменить имя и цвет</button>
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
      progress = { ...P.emptyProgress(), ...data };
      save();
      msg.textContent = 'Прогресс загружен.';
    } catch {
      msg.textContent = 'Этот файл не подходит.';
    }
  });
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

async function go(target) {
  const [name, ...rest] = target.split(':');
  const arg = rest.join(':');
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
        return renderExplain(topic, 0);
      }
      case 'explain': {
        const [page, q] = arg.split(':');
        const s = progress.session;
        const topic = s.kind === 'topic' ? topicOfSession() : currentSessionQuestion().topic;
        return renderExplain(topic, Number(page), { fromQuestion: q === 'q' });
      }
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
  if (s.kind === 'topic' && s.stage === 'explain') return renderExplain(topicOfSession(), 0);
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
  renderStart();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

window.__game = { get progress() { return progress; }, go };
boot();

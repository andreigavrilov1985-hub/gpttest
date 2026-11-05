// Progress model and game rules. No DOM here.
import { CONFIG } from './config.js';

const banks = new Map(); // "math-1" -> bank json

export async function loadBank(subject, island) {
  const key = `${subject}-${island}`;
  if (!banks.has(key)) {
    const res = await fetch(`data/${subject}-island${island}.json`);
    if (!res.ok) throw new Error(`Не удалось загрузить ${key}`);
    banks.set(key, await res.json());
  }
  return banks.get(key);
}
export const getBank = (subject, island) => banks.get(`${subject}-${island}`);
export const loadIsland = (island) => Promise.all(CONFIG.SUBJECTS.map((s) => loadBank(s, island)));

export function emptyProgress() {
  return {
    version: 1, profile: null, coins: 0, topics: {}, cities: {}, session: null,
    // added in round 2 (old saves get these defaults when loaded)
    settings: { sound: true, voice: true }, streak: 0, seenIslands: {}, lastSeen: null,
  };
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (!raw) return emptyProgress();
    const p = JSON.parse(raw);
    if (!p || p.version !== 1) return emptyProgress();
    return migrate(p);
  } catch {
    return emptyProgress();
  }
}

/** Fills fields added after the first release; old saves keep all their data. */
export function migrate(p) {
  const base = emptyProgress();
  return { ...base, ...p, settings: { ...base.settings, ...(p.settings || {}) } };
}

export function saveProgress(p) {
  try {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(p));
    return true;
  } catch {
    return false;
  }
}

export function validateImported(p) {
  return p && p.version === 1 && typeof p.topics === 'object' && (p.profile === null || typeof p.profile === 'object');
}

// ---------- topic / city / island state ----------

export function topicState(p, topicId) {
  return p.topics[topicId] || null;
}

export function topicScore(p, topic) {
  const st = p.topics[topic.id];
  if (!st) return { correct: 0, answered: 0, pct: 0 };
  let correct = 0;
  let answered = 0;
  for (const q of topic.questions) {
    if (q.id in st.answers) {
      answered += 1;
      if (st.answers[q.id]) correct += 1;
    }
  }
  return { correct, answered, pct: answered ? correct / answered : 0 };
}

const topicFinished = (p, topic) => {
  const st = p.topics[topic.id];
  return !!st && (st.done || st.skipped);
};

export function cityStatus(p, subject, island) {
  const bank = getBank(subject, island);
  const id = `${subject}-${island}`;
  if (!bank) return { id, loaded: false };
  let correct = 0;
  let total = 0;
  let finished = 0;
  const weak = [];
  for (const t of bank.topics) {
    const st = p.topics[t.id];
    if (topicFinished(p, t)) finished += 1;
    if (st && st.skipped) continue;
    const s = topicScore(p, t);
    correct += s.correct;
    total += t.questions.length;
    if (st && st.done && s.pct < CONFIG.TOPIC_WEAK_THRESHOLD) weak.push(t);
  }
  const allDone = finished === bank.topics.length;
  const pct = total ? correct / total : 1;
  const passed = allDone && pct >= CONFIG.PASS_THRESHOLD;
  const nextTopic = bank.topics.find((t) => !topicFinished(p, t)) || null;
  // If the city is below the threshold but no single topic is below it
  // (can't really happen with 10-question topics), practise all of them.
  const practice = allDone && !passed ? (weak.length ? weak : bank.topics.filter((t) => !p.topics[t.id]?.skipped)) : [];
  return { id, loaded: true, bank, correct, total, pct, finished, allDone, passed, nextTopic, practice };
}

export function islandStatus(p, island) {
  const cities = CONFIG.SUBJECTS.map((s) => cityStatus(p, s, island));
  const passed = cities.every((c) => c.passed);
  const current = cities.find((c) => !c.passed) || null;
  return { island, cities, passed, current };
}

export function isIslandUnlocked(p, island) {
  if (island === 1) return true;
  return !!(p.islandsPassed && p.islandsPassed[island - 1]);
}

export function markIslandPassed(p, island) {
  p.islandsPassed = { ...(p.islandsPassed || {}), [island]: true };
}

export function currentIsland(p) {
  for (const i of CONFIG.ISLANDS) {
    if (!(p.islandsPassed && p.islandsPassed[i])) return i;
  }
  return CONFIG.ISLANDS[CONFIG.ISLANDS.length - 1];
}

export function cityUnlocked(p, island, subject) {
  // The child is led in order: a city opens after the previous city of the island is passed.
  const idx = CONFIG.SUBJECTS.indexOf(subject);
  if (idx === 0) return isIslandUnlocked(p, island);
  const prev = cityStatus(p, CONFIG.SUBJECTS[idx - 1], island);
  return prev.passed;
}

// ---------- sessions ----------

export function shuffle(arr, rnd = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Order for a practice round: shuffled, and never identical to the previous order.
export function practiceOrder(ids, previous) {
  if (ids.length < 2) return ids.slice();
  let order;
  let guard = 0;
  do {
    order = shuffle(ids);
    guard += 1;
  } while (previous && previous.join('|') === order.join('|') && guard < 20);
  return order;
}

// Order of a topic's questions: shuffled for every attempt, so two children side by side
// do not see the same question at the same time, and a retry differs from the last one.
// Questions of one text/recording (passage) stay together and in their own order.
export function topicOrder(topic, previous) {
  const blocks = [];
  const byPassage = new Map();
  for (const q of topic.questions) {
    if (!q.passage) { blocks.push([q.id]); continue; }
    if (!byPassage.has(q.passage)) { byPassage.set(q.passage, []); blocks.push(byPassage.get(q.passage)); }
    byPassage.get(q.passage).push(q.id);
  }
  if (blocks.length < 2) return blocks.flat();
  let order;
  let guard = 0;
  do {
    order = shuffle(blocks).flat();
    guard += 1;
  } while (previous && previous.join('|') === order.join('|') && guard < 20);
  return order;
}

export const unfinished = (s) => s && s.kind === 'topic' && s.idx > 0 && s.idx < s.order.length;

export function startTopicSession(p, topic) {
  const st = p.topics[topic.id] || { answers: {}, attempts: 0, done: false, skipped: false };
  p.topics[topic.id] = st;
  const cur = p.session;
  // the child left this topic in the middle and came back: continue at the same question, same order
  if (unfinished(cur) && cur.topicId === topic.id) { cur.stage = 'explain'; return cur; }
  // the child leaves another topic unfinished: keep its place to continue later
  if (unfinished(cur) && p.topics[cur.topicId]) p.topics[cur.topicId].pending = { order: cur.order, idx: cur.idx, results: cur.results };
  if (st.pending && st.pending.idx > 0 && st.pending.idx < st.pending.order.length) {
    p.session = { kind: 'topic', topicId: topic.id, stage: 'explain', ...st.pending };
    delete st.pending;
    return p.session;
  }
  delete st.pending;
  const order = topicOrder(topic, st.lastOrder);
  st.lastOrder = order;
  p.session = {
    kind: 'topic',
    topicId: topic.id,
    stage: 'explain',
    order,
    idx: 0,
    results: {},
  };
  return p.session;
}

export function startPracticeSession(p, city) {
  const cur = p.session;
  if (unfinished(cur) && p.topics[cur.topicId]) p.topics[cur.topicId].pending = { order: cur.order, idx: cur.idx, results: cur.results };
  const ids = city.practice.flatMap((t) => t.questions.map((q) => q.id));
  const previous = p.cities[city.id]?.lastPracticeOrder || null;
  const order = practiceOrder(ids, previous);
  p.cities[city.id] = { ...(p.cities[city.id] || {}), lastPracticeOrder: order,
    practiceRounds: (p.cities[city.id]?.practiceRounds || 0) + 1 };
  p.session = { kind: 'practice', cityId: city.id, stage: 'questions', order, idx: 0, results: {} };
  return p.session;
}

export function recordAnswer(p, topicId, qid, correct) {
  const st = p.topics[topicId] || { answers: {}, attempts: 0, done: false, skipped: false };
  st.answers[qid] = !!correct;
  p.topics[topicId] = st;
  if (p.session) p.session.results[qid] = !!correct;
  if (correct) p.coins = (p.coins || 0) + CONFIG.COINS_PER_CORRECT;
}

export function finishTopic(p, topic) {
  const st = p.topics[topic.id];
  delete st.pending;
  st.done = true;
  st.attempts = (st.attempts || 0) + 1;
  const s = topicScore(p, topic);
  st.best = Math.max(st.best || 0, s.pct);
  st.stars = starsFor(s.pct);
  return s;
}

export function skipTopic(p, topic) {
  const st = p.topics[topic.id] || { answers: {}, attempts: 0 };
  st.skipped = true;
  st.done = false;
  delete st.pending;
  p.topics[topic.id] = st;
}

export function starsFor(pct) {
  if (pct >= 0.9) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}

export function findQuestion(subject, island, qid) {
  const bank = getBank(subject, island);
  for (const t of bank.topics) {
    const q = t.questions.find((x) => x.id === qid);
    if (q) return { topic: t, question: q };
  }
  return null;
}

export function parseId(id) {
  const [subject, island, topic, q] = id.split('-');
  return { subject, island: Number(island), topic: Number(topic), q: Number(q) };
}

/** Where an unfinished attempt of the topic stopped (number of answered questions), or 0. */
export function topicResumeAt(p, topicId) {
  if (unfinished(p.session) && p.session.topicId === topicId) return p.session.idx;
  const pd = p.topics[topicId]?.pending;
  return pd && pd.idx > 0 && pd.idx < pd.order.length ? pd.idx : 0;
}

/** Admin: set the progress to "the child is at island I, city C (0-based), with D topics done there".
 *  Everything before that point is marked as passed with all answers right. Banks of islands 1..I must be loaded. */
export function setProgressTo(p, island, cityIdx, topicsDone) {
  p.topics = {};
  p.cities = {};
  p.islandsPassed = {};
  p.session = null;
  p.seenIslands = {};
  const full = (t) => ({ answers: Object.fromEntries(t.questions.map((q) => [q.id, true])), attempts: 1, done: true, skipped: false, best: 1, stars: 3 });
  let correct = 0;
  for (let i = 1; i <= island; i += 1) {
    p.seenIslands[i] = true;
    CONFIG.SUBJECTS.forEach((s, ci) => {
      const bank = getBank(s, i);
      if (!bank) return;
      bank.topics.forEach((t, ti) => {
        const before = i < island || ci < cityIdx || (ci === cityIdx && ti < topicsDone);
        if (before) { p.topics[t.id] = full(t); correct += t.questions.length; }
      });
    });
    if (i < island) markIslandPassed(p, i);
  }
  return correct * CONFIG.COINS_PER_CORRECT;
}

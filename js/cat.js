// Kitten "brain": picks phrases without repeats, fills placeholders, types them into a bubble.
import { PHRASES, checkPhraseNorms, totalPhrases } from './cat-phrases.js';

const RECENT = 5;            // a phrase is not reused while it is among the last 5 of its group
const TYPE_MS = 30;          // typing speed, ms per character (ТЗ: 25–35)
const recent = {};           // group -> [indexes]
let lastShown = '';          // the very last phrase shown anywhere: never shown twice in a row

export function phrase(group, vars = {}) {
  const list = PHRASES[group];
  if (!list || !list.length) return '';
  const used = recent[group] || (recent[group] = []);
  const keep = Math.min(RECENT, list.length - 1);
  let candidates = list.map((_, i) => i).filter((i) => !used.includes(i));
  const filled = (i) => fill(list[i], vars);
  const notLast = candidates.filter((i) => filled(i) !== lastShown);
  if (notLast.length) candidates = notLast;
  const i = candidates[Math.floor(Math.random() * candidates.length)];
  used.push(i);
  while (used.length > keep) used.shift();
  lastShown = filled(i);
  return lastShown;
}

export function fill(text, vars) {
  let out = text.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined && vars[k] !== '' ? String(vars[k]) : m));
  // No child name known: drop the placeholder together with its comma.
  out = out.replace(/,?\s*\{name\}\s*,?/g, (m) => (m.trim().startsWith(',') && m.trim().endsWith(',') ? ', ' : ' '))
    .replace(/\s+([!?.,])/g, '$1').replace(/\s{2,}/g, ' ').trim();
  return out.charAt(0).toUpperCase() + out.slice(1);
}

/** Types text into el; tap on el finishes instantly. Returns a function that finishes it. */
const typing = new WeakMap();
export function typeInto(el, text, { reduced = false } = {}) {
  if (!el) return () => {};
  const prev = typing.get(el);
  if (prev) prev.stop();
  el.textContent = '';
  el.setAttribute('aria-label', text);
  el.dataset.full = text;
  if (reduced || !text) {
    el.textContent = text;
    return () => {};
  }
  let i = 0;
  let timer = null;
  const finish = () => {
    clearInterval(timer);
    el.textContent = text;
    el.classList.remove('typing');
    typing.delete(el);
    el.removeEventListener('click', finish);
  };
  el.classList.add('typing');
  timer = setInterval(() => {
    i += 1;
    el.textContent = text.slice(0, i);
    if (i >= text.length) finish();
  }, TYPE_MS);
  el.addEventListener('click', finish);
  typing.set(el, { stop: finish });
  return finish;
}

/** Development check: warns in the console when a phrase group is shorter than the norm. */
export function devCheckPhrases() {
  const short = checkPhraseNorms();
  if (short.length) {
    // eslint-disable-next-line no-console
    console.warn('[котёнок] группы фраз короче нормы:', short.map(([g, h, n]) => `${g}: ${h}/${n}`).join(', '));
  } else {
    // eslint-disable-next-line no-console
    console.info(`[котёнок] фразы в норме: ${totalPhrases()} шт.`);
  }
  return short;
}

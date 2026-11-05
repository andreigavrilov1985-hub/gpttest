// Listening via the browser's Web Speech API (English voice, en-GB preferred).
import { CONFIG } from './config.js';

let cachedVoice;

function pickVoice(voices) {
  const en = voices.filter((v) => /^en([-_]|$)/i.test(v.lang));
  return en.find((v) => v.lang.replace('_', '-').toLowerCase() === CONFIG.SPEECH_LANG.toLowerCase())
    || en.find((v) => /GB|UK|British/i.test(`${v.lang} ${v.name}`))
    || en[0] || null;
}

/** Resolves to a voice, or null if this device cannot speak English. */
export function getEnglishVoice(timeoutMs = 2000) {
  if (cachedVoice !== undefined) return Promise.resolve(cachedVoice);
  if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
    cachedVoice = null;
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    const done = (v) => {
      cachedVoice = v;
      resolve(v);
    };
    const now = speechSynthesis.getVoices();
    if (now.length) return done(pickVoice(now));
    const t = setTimeout(() => done(pickVoice(speechSynthesis.getVoices())), timeoutMs);
    speechSynthesis.addEventListener('voiceschanged', () => {
      clearTimeout(t);
      done(pickVoice(speechSynthesis.getVoices()));
    }, { once: true });
  });
}

export function speak(text, { onstart, onend } = {}) {
  if (!cachedVoice) return false;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = cachedVoice;
  u.lang = cachedVoice.lang || CONFIG.SPEECH_LANG;
  u.rate = CONFIG.SPEECH_RATE;
  if (onstart) u.onstart = onstart;
  if (onend) {
    u.onend = onend;
    u.onerror = onend;
  }
  speechSynthesis.speak(u);
  return true;
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

// ---------- Kitten's voice (Russian) ----------
// The kitten reads its own lines and the cartoon subtitles aloud with a Russian voice.
// No Russian voice on the device → silent, everything still works as text.
let ruVoice;
function pickRu(voices) {
  const ru = voices.filter((v) => /^ru([-_]|$)/i.test(v.lang));
  return ru.find((v) => /female|milena|alena|irina|svetlana|google/i.test(v.name)) || ru[0] || null;
}
export function getRussianVoice(timeoutMs = 2000) {
  if (ruVoice !== undefined) return Promise.resolve(ruVoice);
  if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') { ruVoice = null; return Promise.resolve(null); }
  return new Promise((resolve) => {
    const done = (v) => { ruVoice = v; resolve(v); };
    const now = speechSynthesis.getVoices();
    if (now.length) return done(pickRu(now));
    const t = setTimeout(() => done(pickRu(speechSynthesis.getVoices())), timeoutMs);
    speechSynthesis.addEventListener('voiceschanged', () => { clearTimeout(t); done(pickRu(speechSynthesis.getVoices())); }, { once: true });
  });
}

const clean = (s) => String(s).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '').replace(/→/g, ', ').replace(/·/g, ', ').replace(/×/g, ' умножить на ').replace(/÷/g, ' разделить на ').replace(/−/g, ' минус ').replace(/²/g, ' в квадрате').replace(/³/g, ' в кубе').replace(/ = /g, ' равно ').replace(/ \+ /g, ' плюс ').replace(/≈/g, ' примерно ').replace(/°/g, ' градусов').replace(/%/g, ' процентов').replace(/\s+/g, ' ').trim();

/** Says text in the kitten's voice. Resolves when finished (or at once if there is no voice). */
export function kittenSpeak(text) {
  return new Promise((resolve) => {
    if (!ruVoice || !text) return resolve(false);
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean(text));
    u.voice = ruVoice;
    u.lang = ruVoice.lang || 'ru-RU';
    u.rate = 1.05;
    u.pitch = 1.35; // a kitten sounds a bit higher
    let doneOnce = false;
    const fin = () => { if (!doneOnce) { doneOnce = true; clearTimeout(guard); resolve(true); } };
    const guard = setTimeout(fin, 1500 + clean(text).length * 110); // never wait forever
    u.onend = fin;
    u.onerror = fin;
    speechSynthesis.speak(u);
  });
}
export const hasKittenVoice = () => !!ruVoice;

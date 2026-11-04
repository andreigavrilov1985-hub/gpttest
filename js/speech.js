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

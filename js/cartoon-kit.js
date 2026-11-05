// Cartoon kit: props and timeline helpers so each topic cartoon stays short and readable.
// Coordinates: stage 360 × 240. Every actor is drawn around (0, 0) and placed with init {x, y}.
export * from './cartoon-props.js';
import { label } from './cartoon-props.js';

const FONT = 'font-family="Nunito, sans-serif" font-weight="800"';

/** Emoji object (apple, sun, ice…). */
export const emo = (name, ch, size = 34) => `<text data-a="${name}" ${FONT} font-size="${size}" text-anchor="middle" dominant-baseline="central">${ch}</text>`;

/** Rounded card with text: word tiles, numbers, answers. Text actor: `${name}T`. */
export function card(name, text, { w = 90, h = 40, fill = '#fff', stroke = '#cfe6ef', color = '#23324a', size = 18, lang } = {}) {
  return `<g data-a="${name}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="3"/>
    <text data-a="${name}T" ${FONT} font-size="${size}" fill="${color}" text-anchor="middle" dominant-baseline="central" ${lang ? `lang="${lang}"` : ''}>${text}</text></g>`;
}

/** Speech bubble with replaceable text (`${name}T`). */
export function say(name, text, { w = 170, size = 14 } = {}) {
  return `<g data-a="${name}"><rect x="${-w / 2}" y="-20" width="${w}" height="34" rx="14" fill="#fff" stroke="#d6e5ee" stroke-width="2"/>
    <path d="M-8 14 l8 10 l6 -10 z" fill="#fff" stroke="#d6e5ee" stroke-width="2" stroke-linejoin="round"/><rect x="-10" y="10" width="20" height="5" fill="#fff"/>
    <text data-a="${name}T" ${FONT} font-size="${size}" fill="#23324a" text-anchor="middle" y="2" dominant-baseline="central">${text}</text></g>`;
}

/** Arrow drawn progressively (dash 0 → 1). Absolute coordinates. */
export const arrow = (name, x1, y1, x2, y2, color = '#ff7a59') => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = (k, s) => (x2 - 10 * Math.cos(a + s * 0.5)).toFixed(1);
  const hy = (k, s) => (y2 - 10 * Math.sin(a + s * 0.5)).toFixed(1);
  return `<g data-a="${name}"><path data-a="${name}L" data-draw d="M${x1} ${y1} L${x2} ${y2}" stroke="${color}" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M${hx(0, 1)} ${hy(0, 1)} L${x2} ${y2} L${hx(0, -1)} ${hy(0, -1)}" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
};

export const text = (name, t, opts) => label(name, t, opts);
export const ground = (y = 200, color = '#bfe8a8') => `<rect x="0" y="${y}" width="360" height="${240 - y}" fill="${color}"/>`;
export const sky = (color = '#e9f8ff') => `<rect x="0" y="0" width="360" height="240" fill="${color}"/>`;
export const at = (x, y, more = {}) => ({ x, y, ...more });
export const hid = (x, y, more = {}) => ({ x, y, o: 0, s: 0.4, ...more });

// ---- timeline helpers (each returns an array of beats) ----
export const cap = (t, s) => [[t, 'cap', s]];
export const pop = (t, names, step = 180) => [].concat(names).map((n, i) => [t + i * step, 'to', n, { o: 1, s: 1 }, 420, 'back']);
export const fade = (t, names, o = 0, dur = 350) => [].concat(names).map((n) => [t, 'to', n, { o }, dur]);
export const move = (t, name, to, dur = 700, ease = 'inOut') => [[t, 'to', name, to, dur, ease]];
export const hop = (t, name, to, dur = 700) => [[t, 'to', name, to, dur, 'hop']];
export const mood = (t, name, m) => [[t, 'mood', name, m]];
export const setText = (t, name, s) => [[t, 'text', name, s]];
export const draw = (t, name, dur = 600) => [[t, 'to', name, { dash: 1 }, dur, 'linear']];
export const mark = (t, names, cls = 'fx-gold') => [].concat(names).map((n) => [t, 'cls', n, cls]);
export const wiggle = (t, name) => [[t, 'to', name, { r: -10 }, 150], [t + 150, 'to', name, { r: 10 }, 150], [t + 300, 'to', name, { r: 0 }, 150]];
export const beat = (...lists) => lists.flat();

/** Episode builder with sane defaults. */
export const episode = (o) => ({ duration: Math.max(...o.beats.map((b) => b[0] + (b[4] || 0))) + 2200, ...o });

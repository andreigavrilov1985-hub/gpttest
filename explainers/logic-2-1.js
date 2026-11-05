// Остров 2 · Логика · Тема 1. Ряды посложнее — мини-мультфильм (примеры свои, чтобы учить способу)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const cellRow = (p, items, y, x0 = 40, gap = 56) => items.map((v, i) => card(`${p}${i}`, String(v), { w: 48, h: 40, size: 18, fill: i === items.length - 1 ? '#eef7fb' : '#fff3d6', stroke: i === items.length - 1 ? '#2bb3c9' : '#f2c46d' })).join('');
const rowInit = (p, n, y, x0 = 40, gap = 56) => Object.fromEntries(Array.from({ length: n }, (_, i) => [`${p}${i}`, hid(x0 + i * gap, y)]));
const rules = (p, list, y, x0 = 68, gap = 56) => list.map((r, i) => text(`${p}${i}`, r, { size: 13, color: '#ff7a59' })).join('');
const rulesInit = (p, n, y, x0 = 68, gap = 56) => Object.fromEntries(Array.from({ length: n }, (_, i) => [`${p}${i}`, hid(x0 + i * gap, y)]));
const names = (p, n) => Array.from({ length: n }, (_, i) => `${p}${i}`);

// серия 1: умножаем и делим
const ep1 = episode({
  title: '×3 и ÷2',
  terms: ['ряд с умножением', 'ряд с делением', 'удвоение'],
  svg: `${cellRow('a', [1, 3, 9, 27, '?'], 60)}${rules('ra', ['×3', '×3', '×3', '×3'], 30)}${cellRow('b', [64, 32, 16, 8, '?'], 170)}${rules('rb', ['÷2', '÷2', '÷2', '÷2'], 140)}${kittenActor('cat', 'thinking', 30)}`,
  init: { ...rowInit('a', 5, 60), ...rulesInit('ra', 4, 30), ...rowInit('b', 5, 170), ...rulesInit('rb', 4, 140), cat: at(318, 100) },
  caption0: 'Числа растут очень быстро — значит, их умножают!',
  beats: beat(
    pop(200, names('a', 5), 150), pop(1200, names('ra', 4), 250), cap(1400, 'Каждое число в 3 раза больше: ×3. Дальше 27 × 3 = 81.'), setText(3000, 'a4T', '81'),
    pop(4000, names('b', 5), 150), pop(5000, names('rb', 4), 250), cap(5000, 'А тут уменьшаются вдвое: ÷2. Дальше 8 ÷ 2 = 4.'), setText(6600, 'b4T', '4'), mood(6600, 'cat', 'happy'),
  ),
});

// серия 2: два ряда в одном и кубы
let cubes = '';
[1, 2, 3].forEach((n, k) => { for (let z = 0; z < n; z += 1) for (let y = 0; y < n; y += 1) for (let x = 0; x < n; x += 1) cubes += `<rect data-a="k${k}_${z}${y}${x}" x="${30 + k * 90 + x * 12 + z * 5}" y="${150 - y * 12 - z * 5}" width="11" height="11" fill="#9b5cf6" stroke="#fff"/>`; });
const ep2 = episode({
  title: 'Хитрые ряды',
  terms: ['два ряда через один', 'куб числа (n × n × n)'],
  svg: `${cellRow('c', [1, 10, 2, 20, 3, 30], 50, 30, 52)}${text('h1', 'на нечётных местах: 1, 2, 3 …', { size: 13, color: '#ff7a59' })}${text('h2', 'на чётных: 10, 20, 30 …', { size: 13, color: '#1784a6' })}
    ${cubes}${text('cb', '1, 8, 27: 1×1×1, 2×2×2, 3×3×3 — кубы', { size: 13, color: '#6d3ad1' })}${kittenActor('cat', 'excited', 28)}`,
  init: { ...rowInit('c', 6, 50, 30, 52), h1: hid(180, 92), h2: hid(180, 112), cb: hid(180, 214), cat: at(318, 160) },
  caption0: 'Иногда в одном ряду спрятаны два!',
  beats: beat(
    pop(200, names('c', 6), 150), cap(1400, 'Смотри через один: 1, 2, 3 … и 10, 20, 30 …'), pop(1600, 'h1'), pop(2400, 'h2'),
    ...[0, 2, 4].map((i, k) => move(1800 + k * 200, `c${i}`, { y: 44 }, 200)), ...[1, 3, 5].map((i, k) => move(2600 + k * 200, `c${i}`, { y: 56 }, 200)),
    cap(4400, 'Кубы: число, умноженное на себя три раза. Из кубиков строим кубы!'), pop(5600, 'cb'), mood(5600, 'cat', 'happy'),
  ),
});

// серия 3: растущие разности и треугольные числа
const tri = (k, n, x0) => {
  let s = '';
  for (let r = 0; r < n; r += 1) for (let c = 0; c <= r; c += 1) s += `<circle cx="${x0 + c * 12 - r * 6}" cy="${110 + r * 12}" r="5" fill="#ff9a3c"/>`;
  return `<g data-a="t${k}">${s}</g>`;
};
const ep3 = episode({
  title: 'Разница растёт',
  terms: ['треугольные числа', 'разница удваивается', 'простые числа'],
  svg: `${[1, 2, 3, 4].map((n, k) => tri(k, n, 60 + k * 80)).join('')}${text('tr', '1, 3, 6, 10: прибавляем 2, 3, 4… — дальше +5 = 15', { size: 12, color: '#b06200' })}
    ${cellRow('d', [2, 3, 5, 9, 17], 40)}${rules('rd', ['+1', '+2', '+4', '+8'], 12)}${text('dd', 'дальше +16 = 33', { size: 13, color: '#ff7a59' })}
    ${card('pr', 'простые: 2, 3, 5, 7, 11, 13… — делятся только на 1 и себя', { w: 340, size: 12, fill: '#eef7fb' })}${kittenActor('cat', 'thinking', 26)}`,
  init: { t0: hid(0, 0), t1: hid(0, 0), t2: hid(0, 0), t3: hid(0, 0), tr: hid(180, 170), ...rowInit('d', 5, 40), ...rulesInit('rd', 4, 12), dd: hid(180, 72), pr: hid(180, 210), cat: at(320, 0) },
  caption0: 'Точки складываются в треугольники.',
  beats: beat(
    [0, 1, 2, 3].flatMap((k) => [[300 + k * 500, 'to', `t${k}`, { o: 1, s: 1 }, 400, 'back']]), pop(2400, 'tr'),
    cap(2400, 'Каждый раз добавляется ряд на одну точку длиннее: +2, +3, +4.'),
    pop(4400, names('d', 5), 120), pop(5200, names('rd', 4), 250), cap(4400, 'А тут прибавка удваивается: 1, 2, 4, 8…'), pop(6400, 'dd'),
    cap(8000, 'Простые числа — ряд без правила «прибавь»: проверяй делимость.'), pop(8000, 'pr'), mood(8000, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { a4: { say: '27 × 3 = 81.', mood: 'celebrate' }, b4: { say: '8 ÷ 2 = 4.', mood: 'celebrate' } } };

export default { topic: 'logic-2-1', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

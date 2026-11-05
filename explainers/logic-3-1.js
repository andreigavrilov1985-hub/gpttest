// Остров 3 · Логика · Тема 1. Формулы в рядах — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: формула n-го члена
const nums = [4, 9, 14, 19];
const ep1 = episode({
  title: 'Формула ряда',
  terms: ['n-й член арифметического ряда', 'шаг (разность)', 'номер члена по значению', 'сколько чисел в ряду'],
  svg: `${nums.map((v, i) => card(`c${i}`, String(v), { w: 46, h: 40, size: 18, fill: '#fff3d6', stroke: '#f2c46d' })).join('')}${nums.map((_, i) => text(`n${i}`, `n=${i + 1}`, { size: 12, color: '#9aa5b4' })).join('')}
    ${text('st', 'шаг 5 → 5n, и чтобы при n = 1 было 4: 5n − 1', { size: 13, color: '#ff7a59' })}${card('f', 'n-й член = 5n − 1', { w: 200, size: 18, fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${text('t', '20-й: 5 × 20 − 1 = 99', { size: 16, color: '#1784a6' })}${text('k', 'какой номер у 49? 5n − 1 = 49 → n = 10', { size: 13, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 26)}`,
  init: { ...Object.fromEntries(nums.map((_, i) => [`c${i}`, hid(60 + i * 60, 40)])), ...Object.fromEntries(nums.map((_, i) => [`n${i}`, hid(60 + i * 60, 76)])), st: hid(180, 106), f: hid(180, 142), t: hid(180, 184), k: hid(180, 214), cat: at(318, 4) },
  caption0: 'Ряд 4, 9, 14, 19… Как найти любое его число без перебора?',
  beats: beat(
    pop(300, nums.map((_, i) => `c${i}`), 150), pop(1000, nums.map((_, i) => `n${i}`), 150),
    cap(1600, 'Шаг 5 — значит в формуле 5n. Подгоняем, чтобы первый был 4: 5n − 1.'), pop(2200, 'st'), pop(3400, 'f'),
    cap(4800, 'Теперь любой член: 20-й = 99. И номер найдём по значению.'), pop(4800, ['t', 'k'], 600), mood(4800, 'cat', 'happy'),
  ),
});

// серия 2: суммы (трюк Гаусса, нечётные — квадраты)
const ep2 = episode({
  title: 'Быстрые суммы',
  terms: ['сумма 1 + 2 + … + n (пары)', 'сумма первых нечётных = квадрат', 'факториал', 'ряд степеней'],
  svg: `${card('g', '1 + 2 + … + 10', { w: 170, size: 17 })}${text('pr', '(1 + 10) + (2 + 9) + … — 5 пар по 11 = 55', { size: 13, color: '#16774a' })}
    <g data-a="sq">${[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${c * 16}" y="${r * 16}" width="14" height="14" fill="${['#ff9a3c', '#2bb3c9', '#9b5cf6', '#4cc27a'][Math.max(r, c)]}"/>`).join('')).join('')}</g>
    ${text('od', '1 + 3 + 5 + 7 = 16 = 4²', { size: 15, color: '#6d3ad1' })}${card('fac', '4! = 1 × 2 × 3 × 4 = 24', { w: 220, size: 15, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 26)}`,
  init: { g: hid(110, 34), pr: hid(180, 70), sq: hid(40, 110), od: hid(230, 140), fac: hid(180, 214), cat: at(318, 4) },
  caption0: 'Как быстро сложить числа от 1 до 10?',
  beats: beat(
    pop(300, 'g'), cap(1000, 'Складываем крайние парами: 1 + 10, 2 + 9… Каждая пара — 11, пар 5.'), pop(2000, 'pr'),
    cap(3800, 'Нечётные числа складываются в квадрат: 1 + 3 + 5 + 7 = 4².'), pop(3800, 'sq'), pop(4800, 'od'),
    cap(6400, 'Факториал n! — произведение всех чисел от 1 до n.'), pop(6400, 'fac'), mood(6400, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: Object.fromEntries(nums.map((v, i) => [`c${i}`, { say: `n = ${i + 1}: 5 × ${i + 1} − 1 = ${v}` }])) };

export default { topic: 'logic-3-1', kind: 'cartoon', episodes: [ep1, ep2] };

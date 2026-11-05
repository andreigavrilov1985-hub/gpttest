// Остров 1 · Логика · Тема 1. Числовые ряды — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// Вагончики поезда с числами; котёнок прыгает по вагонам и показывает правило.
const train = (prefix, nums, y = 120) => nums.map((n, i) => `<g data-a="${prefix}${i}"><rect x="-26" y="-20" width="52" height="40" rx="8" fill="${i === nums.length - 1 ? '#eef7fb' : '#fff3d6'}" stroke="${i === nums.length - 1 ? '#2bb3c9' : '#f2c46d'}" stroke-width="3"/>
  <circle cx="-14" cy="24" r="6" fill="#5b6b83"/><circle cx="14" cy="24" r="6" fill="#5b6b83"/></g>${text(`${prefix}${i}T`, n, { size: 20 })}`).join('');
const trainInit = (prefix, n, x0 = 40, y = 120, gap = 62) => Object.fromEntries(Array.from({ length: n }, (_, i) => [[`${prefix}${i}`, at(x0 + i * gap, y, { o: 0 })], [`${prefix}${i}T`, at(x0 + i * gap, y + 7, { o: 0 })]]).flat());
const rules = (prefix, list, x0 = 71, y = 82, gap = 62) => list.map((r, i) => text(`${prefix}${i}`, r, { size: 15, color: '#ff7a59' })).join('');
const rulesInit = (prefix, n, x0 = 71, y = 82, gap = 62) => Object.fromEntries(Array.from({ length: n }, (_, i) => [`${prefix}${i}`, hid(x0 + i * gap, y)]));
const show = (t, prefix, n, step = 250) => Array.from({ length: n }, (_, i) => [[t + i * step, 'to', `${prefix}${i}`, { o: 1 }, 250], [t + i * step, 'to', `${prefix}${i}T`, { o: 1 }, 250]]).flat();

// серия 1: +2
const ep1 = episode({
  title: 'Поезд +2',
  terms: ['числовой ряд', 'правило ряда', 'продолжи ряд'],
  svg: `${train('c', ['2', '4', '6', '8', '?'])}${rules('r', ['+2', '+2', '+2', '+2'])}${kittenActor('cat', 'excited', 40)}`,
  init: { ...trainInit('c', 5), ...rulesInit('r', 4), cat: at(20, 40) },
  caption0: 'Числовой ряд — числа по порядку, как вагоны поезда.',
  beats: beat(
    show(300, 'c', 5),
    cap(1800, 'У ряда есть правило. Котёнок прыгает и проверяет…'),
    ...[0, 1, 2, 3].map((i) => [...hop(2200 + i * 800, 'cat', { x: 42 + i * 62 }, 600), ...pop(2600 + i * 800, `r${i}`)]).flat(),
    cap(5600, 'Каждый раз +2. Значит, дальше 8 + 2 = 10!'), setText(5600, 'c4T', '10'), move(5600, 'c4', { s: 1.2 }, 250), move(5850, 'c4', { s: 1 }, 250), mood(5600, 'cat', 'happy'),
  ),
});

// серия 2: −10 и ×2 (интерактив: угадай)
const ep2 = episode({
  title: 'Вычитаем и умножаем',
  terms: ['правило «вычитаем»', 'правило «умножаем»'],
  svg: `${train('a', ['100', '90', '80', '70', '?'], 70)}${rules('ra', ['−10', '−10', '−10', '−10'], 71, 36)}
    ${train('b', ['3', '6', '12', '24', '?'], 180)}${rules('rb', ['×2', '×2', '×2', '×2'], 71, 146)}
    ${card('o1', '30', { w: 52, size: 18, fill: '#2bb3c9', stroke: '#1784a6', color: '#fff' })}${card('o2', '48', { w: 52, size: 18, fill: '#2bb3c9', stroke: '#1784a6', color: '#fff' })}${card('o3', '36', { w: 52, size: 18, fill: '#2bb3c9', stroke: '#1784a6', color: '#fff' })}
    ${kittenActor('cat', 'thinking', 34)}`,
  init: { ...trainInit('a', 5, 40, 70), ...rulesInit('ra', 4, 71, 36), ...trainInit('b', 5, 40, 180), ...rulesInit('rb', 4, 71, 146), o1: hid(60, 226), o2: hid(180, 226), o3: hid(300, 226), cat: at(318, 100) },
  caption0: 'Правило бывает разным.',
  beats: beat(
    show(200, 'a', 5, 150), pop(1200, ['ra0', 'ra1', 'ra2', 'ra3'], 200),
    cap(1200, '100, 90, 80, 70: каждый раз −10. Дальше 60.'), setText(2400, 'a4T', '60'),
    show(3800, 'b', 5, 150), pop(4800, ['rb0', 'rb1', 'rb2', 'rb3'], 200),
    cap(4800, '3, 6, 12, 24: каждое число в 2 раза больше. Какое дальше? Нажми!'), pop(5800, ['o1', 'o2', 'o3'], 150),
    setText(8800, 'b4T', '48'), cap(8800, '24 × 2 = 48!'), mood(8800, 'cat', 'happy'),
  ),
  interact: {
    type: 'tapShow', cat: 'cat',
    items: {
      o1: { say: '30? Нет: 24 + 6 — это не наше правило. Правило ×2.', mood: 'thinking' },
      o2: { say: 'Верно! 24 × 2 = 48.', mood: 'celebrate' },
      o3: { say: '36? Проверь правило: каждый раз ×2.', mood: 'thinking' },
    },
  },
});

// серия 3: растущая прибавка и квадраты
const dots = (prefix, n) => {
  let s = '';
  for (let r = 0; r < n; r += 1) for (let c = 0; c < n; c += 1) s += `<circle cx="${c * 10}" cy="${r * 10}" r="4" fill="#9b5cf6"/>`;
  return `<g data-a="${prefix}">${s}</g>`;
};
const ep3 = episode({
  title: 'Хитрые ряды',
  terms: ['растущая прибавка', 'квадрат числа', 'ряд квадратов'],
  svg: `${train('g', ['2', '3', '5', '8', '12'], 60)}${rules('rg', ['+1', '+2', '+3', '+4'], 71, 26)}${text('g5', '+5 → 17', { size: 18, color: '#16774a' })}
    ${dots('q1', 1)}${dots('q2', 2)}${dots('q3', 3)}${dots('q4', 4)}${dots('q5', 5)}${text('qt', '1, 4, 9, 16, 25: число × само себя', { size: 14, color: '#6d3ad1' })}
    ${kittenActor('cat', 'excited', 32)}`,
  init: { ...trainInit('g', 5, 40, 60), ...rulesInit('rg', 4, 71, 26), g5: hid(300, 100), q1: hid(40, 160), q2: hid(80, 155), q3: hid(130, 150), q4: hid(190, 145), q5: hid(260, 140), qt: hid(180, 222), cat: at(320, 190) },
  caption0: 'Иногда прибавка растёт!',
  beats: beat(
    show(200, 'g', 5, 150), pop(1200, ['rg0', 'rg1', 'rg2', 'rg3'], 400),
    cap(1400, 'Смотри на разницу между соседями: +1, +2, +3, +4…'), pop(3200, 'g5'), cap(3200, '…значит, дальше +5: 12 + 5 = 17.'),
    cap(5200, 'А это квадраты: точки складываются в квадрат.'), pop(5200, ['q1', 'q2', 'q3', 'q4'], 400),
    cap(7200, 'Квадрат числа — число, умноженное само на себя: 5 × 5 = 25.'), pop(7200, ['q5', 'qt'], 300), mood(7200, 'cat', 'happy'),
  ),
});

// серия 4: Фибоначчи
const ep4 = episode({
  title: 'Ряд Фибоначчи',
  terms: ['ряд Фибоначчи', 'сумма двух предыдущих'],
  svg: `${train('f', ['1', '1', '2', '3', '5', '?'], 120)}${text('sum', '5 + 8 = 13', { size: 20, color: '#16774a' })}${kittenActor('cat', 'excited', 40)}`,
  init: { ...trainInit('f', 6, 30, 120, 58), sum: hid(180, 200), cat: at(150, 20) },
  caption0: 'Знаменитый ряд Фибоначчи.',
  beats: beat(
    show(200, 'f', 6, 150),
    cap(1400, 'Каждое число — сумма двух предыдущих. 1 + 1 = 2…'), move(1600, 'f0T', { y: 90 }, 400), move(1600, 'f1T', { y: 90 }, 400), move(2000, 'f0T', { y: 127 }, 300), move(2000, 'f1T', { y: 127 }, 300),
    cap(3200, '1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8…'), setText(3800, 'f5T', '8'),
    cap(5200, 'А дальше? 5 + 8 = 13!'), pop(5200, 'sum'), mood(5200, 'cat', 'happy'),
  ),
});

export default {
  topic: 'logic-1-1',
  kind: 'cartoon',
  episodes: [ep1, ep2, ep3, ep4],
  memo: [
    'Числовой ряд — числа по порядку. Правило говорит, как получить следующее число.',
    'Правило бывает: прибавляем (+2), вычитаем (−10), умножаем (×2).',
    'Если прибавка растёт (+1, +2, +3…), смотри на разницу между соседями.',
    'Квадрат числа — число, умноженное само на себя: 5 × 5 = 25. Ряд квадратов: 1, 4, 9, 16, 25.',
    'Ряд Фибоначчи: каждое число — сумма двух предыдущих: 1, 1, 2, 3, 5, 8, 13.',
  ],
};

// Остров 4 · Логика · Тема 2. Делимость и остатки — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: остаток
const sw = Array.from({ length: 23 }, (_, i) => `<g data-a="c${i}"><circle r="7" fill="${i >= 20 ? '#ff7a59' : '#2bb3c9'}"/></g>`).join('');
const ep1 = episode({
  title: 'Остаток',
  terms: ['деление с остатком', 'остаток меньше делителя'],
  svg: `${sw}${text('e', '23 = 4 × 5 + 3: остаток 3', { size: 18, color: '#16774a' })}${text('r', 'остаток всегда меньше делителя', { size: 13, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 24)}`,
  init: { ...Object.fromEntries(Array.from({ length: 23 }, (_, i) => [`c${i}`, at(30 + (i % 12) * 26, 50 + Math.floor(i / 12) * 26, { o: 0 })])), e: hid(180, 190), r: hid(180, 218), cat: at(320, 4) },
  caption0: '23 конфеты раздаём по 5.',
  beats: beat(
    Array.from({ length: 23 }, (_, i) => [200 + i * 40, 'to', `c${i}`, { o: 1 }, 150]),
    cap(1400, 'Раскладываем кучками по 5…'), Array.from({ length: 23 }, (_, i) => [1800, 'to', `c${i}`, i < 20 ? { x: 40 + Math.floor(i / 5) * 76 + (i % 5) * 12, y: 110 } : { x: 300 + (i - 20) * 14, y: 150 }, 900]),
    pop(3200, 'e'), cap(3200, '4 полные кучки и 3 лишние — это остаток.'), pop(4800, 'r'), mood(4800, 'cat', 'happy'),
  ),
});

// серия 2: признаки делимости (интерактив)
const SIGNS = [
  ['d2', 'на 2', 'последняя цифра чётная'], ['d3', 'на 3', 'сумма цифр делится на 3'], ['d4', 'на 4', 'две последние цифры делятся на 4'],
  ['d5', 'на 5', 'оканчивается на 0 или 5'], ['d9', 'на 9', 'сумма цифр делится на 9'], ['d6', 'на 6', 'делится и на 2, и на 3'],
];
const ep2 = episode({
  title: 'Признаки делимости',
  terms: SIGNS.map(([, n, r]) => `делится ${n}: ${r}`),
  svg: `${SIGNS.map(([k, n]) => card(k, `÷ ${n.slice(3)}`, { w: 90, h: 40, size: 17, fill: '#fff3d6', stroke: '#f2c46d' })).join('')}${text('ex', '252: 2 + 5 + 2 = 9 → делится на 3 и на 9', { size: 13, color: '#16774a' })}${kittenActor('cat', 'excited', 22)}`,
  init: { ...Object.fromEntries(SIGNS.map(([k], i) => [k, hid(70 + (i % 3) * 110, 50 + Math.floor(i / 3) * 70)])), ex: hid(180, 200), cat: at(320, 200) },
  caption0: 'Как узнать, делится ли число, не деля его?',
  beats: beat(SIGNS.map(([k, n, r], i) => [[500 + i * 1100, 'to', k, { o: 1, s: 1 }, 400, 'back'], [500 + i * 1100, 'cap', `Делится ${n}, если ${r}.`]]), pop(7200, 'ex'), mood(7200, 'cat', 'happy')),
  interact: { type: 'tapShow', cat: 'cat', items: Object.fromEntries(SIGNS.map(([k, n, r]) => [k, { say: `Делится ${n}, если ${r}.` }])) },
});

// серия 3: НОК в жизни
const ep3 = episode({
  title: 'Когда встретятся',
  terms: ['НОК в задачах «когда снова вместе»', 'НОД — наибольший общий делитель', 'разложение на простые множители', 'количество делителей'],
  svg: `${emo('b1', '🚌', 30)}${emo('b2', '🚎', 30)}<path d="M20 120 H340" stroke="#23324a" stroke-width="2"/>${[0, 1, 2, 3, 4].map((i) => text(`t${i}`, String(i * 5), { size: 11, color: '#5b6b83' })).join('')}
    ${text('n', 'снова вместе через НОК = 20 минут', { size: 14, color: '#16774a' })}${card('f', '40 = 2 × 2 × 2 × 5 · делители 40: 1, 2, 4, 5, 8, 10, 20, 40', { w: 340, size: 11, fill: '#eef7fb' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { b1: at(20, 92), b2: at(20, 150), ...Object.fromEntries([0, 1, 2, 3, 4].map((i) => [`t${i}`, at(20 + i * 75, 138)])), n: hid(180, 190), f: hid(180, 222), cat: at(320, 4) },
  caption0: 'Два автобуса выехали вместе: один ходит каждые 4 минуты, другой — каждые 10.',
  beats: beat(
    [1, 2, 3, 4, 5].map((k) => [400 + k * 500, 'to', 'b1', { x: 20 + k * 60 }, 300]), [1, 2].map((k) => [1000 + k * 1200, 'to', 'b2', { x: 20 + k * 150 }, 600]),
    cap(1400, 'Кратные 4: 4, 8, 12, 16, 20. Кратные 10: 10, 20.'), pop(3600, 'n'), cap(3600, 'Первое общее — 20 минут. Это НОК.'),
    pop(5400, 'f'), cap(5400, 'Разложение на простые множители помогает искать НОД, НОК и делители.'), mood(5400, 'cat', 'happy'),
  ),
});

export default { topic: 'logic-4-2', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

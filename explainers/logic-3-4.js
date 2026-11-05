// Остров 3 · Логика · Тема 4. Вероятность — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: вероятность = нужные исходы / все исходы
const ep1 = episode({
  title: 'Шансы',
  terms: ['вероятность = нужные исходы ÷ все исходы', 'невозможное — 0', 'достоверное — 1', 'монета не «помнит» прошлые броски'],
  svg: `${emo('coin', '🪙', 44)}${text('c', 'орёл: 1 из 2 = 1/2', { size: 16, color: '#b06200' })}
    ${['🍓', '🍓', '🍋', '🍋', '🍋'].map((e, i) => emo(`f${i}`, e, 28)).join('')}${text('f', 'клубника: 2 из 5 = 2/5', { size: 15, color: '#c0392b' })}
    ${card('z', 'невозможное — 0, точно будет — 1', { w: 270, size: 14, fill: '#eef7fb' })}${text('mem', 'после 5 орлов шанс орла всё равно 1/2', { size: 13, color: '#6d3ad1' })}${kittenActor('cat', 'excited', 24)}`,
  init: { coin: hid(60, 40), c: hid(200, 44), ...Object.fromEntries([0, 1, 2, 3, 4].map((i) => [`f${i}`, hid(50 + i * 34, 110)])), f: hid(260, 110), z: hid(180, 170), mem: hid(180, 210), cat: at(320, 4) },
  caption0: 'Вероятность = сколько исходов нам подходит ÷ сколько всего исходов.',
  beats: beat(
    pop(300, 'coin'), [[600, 'to', 'coin', { r: 720 }, 900]], pop(1400, 'c'), cap(1400, 'Монета: 2 исхода, нужный 1 → 1/2.'),
    pop(3000, [0, 1, 2, 3, 4].map((i) => `f${i}`), 150), pop(4000, 'f'), cap(3000, 'В корзине 5 фруктов, клубник 2 → 2/5.'),
    pop(5600, 'z'), cap(5600, 'Невозможное событие — 0, точно случится — 1.'),
    pop(7200, 'mem'), cap(7200, 'Монета не помнит прошлое: каждый бросок снова 1/2.'), mood(7200, 'cat', 'happy'),
  ),
});

// серия 2: два броска — таблица исходов
const cells = [];
for (let r = 0; r < 6; r += 1) for (let c = 0; c < 6; c += 1) cells.push([`t${r}${c}`, 120 + c * 26, 40 + r * 26, r + c + 2]);
const ep2 = episode({
  title: 'Два кубика',
  terms: ['все исходы двух кубиков: 6 × 6 = 36', 'два события подряд: 1/2 × 1/2 = 1/4'],
  svg: `${cells.map(([n, , , s]) => `<g data-a="${n}"><rect x="-12" y="-12" width="24" height="24" rx="3" fill="#fff" stroke="#cfe6ef"/><text y="5" text-anchor="middle" font-family="Nunito" font-weight="700" font-size="10" fill="#5b6b83">${s}</text></g>`).join('')}
    ${emo('d1', '🎲', 30)}${emo('d2', '🎲', 30)}${text('all', '36 исходов', { size: 14, color: '#1784a6' })}${text('s7', 'сумма 7: 6 клеток → 6/36 = 1/6', { size: 13, color: '#16774a' })}
    ${card('cc', '½ × ½ = ¼', { w: 100, h: 40, size: 15, fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { ...Object.fromEntries(cells.map(([n, x, y]) => [n, hid(x, y)])), d1: hid(50, 40), d2: hid(50, 80), all: hid(60, 130), s7: hid(220, 210), cc: hid(60, 190), cat: at(320, 4) },
  caption0: 'Бросаем два кубика. Сколько всего вариантов?',
  beats: beat(
    pop(200, ['d1', 'd2'], 200), cells.map(([n], i) => [700 + i * 40, 'to', n, { o: 1, s: 1 }, 200]), pop(2300, 'all'),
    cap(1000, 'Каждый из 6 исходов первого с каждым из 6 второго: таблица 6 × 6 = 36.'),
    cap(3600, 'Сумма 7 встречается в 6 клетках — вероятность 6/36 = 1/6.'), ...cells.filter((c) => c[3] === 7).map(([n]) => [[3600, 'cls', n, 'fx-gold']]), pop(3800, 's7'),
    cap(5800, 'Два независимых события подряд — вероятности перемножаем.'), pop(5800, 'cc'), mood(5800, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { coin: { say: 'Орёл или решка — 1 шанс из 2.' }, f0: { say: 'Клубника: 2 из 5.' }, f2: { say: 'Лимон: 3 из 5.' } } };

export default { topic: 'logic-3-4', kind: 'cartoon', episodes: [ep1, ep2] };

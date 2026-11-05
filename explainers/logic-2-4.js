// Остров 2 · Логика · Тема 4. Комбинаторика и множества — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, cutLine, draw, episode, beat } from '../js/cartoon-kit.js';

// серия 1: перестановки
const B = [['b0', '📕'], ['b1', '📗'], ['b2', '📘']];
const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
const ep1 = episode({
  title: 'Сколько способов?',
  terms: ['перестановки', '3 × 2 × 1', 'правило умножения'],
  svg: `${perms.map((p, r) => p.map((b, c) => emo(`p${r}${c}`, B[b][1], 20)).join('')).join('')}${text('f', '3 × 2 × 1 = 6 способов', { size: 16, color: '#16774a' })}
    ${card('fit', 'футболки 2 × шорты 4 = 8 комплектов', { w: 300, size: 14, fill: '#eef7fb' })}${kittenActor('cat', 'thinking', 28)}`,
  init: { ...Object.fromEntries(perms.flatMap((p, r) => p.map((_, c) => [`p${r}${c}`, hid(40 + c * 26 + (r % 3) * 110, 40 + Math.floor(r / 3) * 50)]))), f: hid(180, 150), fit: hid(180, 200), cat: at(320, 196) },
  caption0: 'Сколькими способами поставить в ряд три книги?',
  beats: beat(
    perms.flatMap((p, r) => p.map((_, c) => [400 + r * 700 + c * 120, 'to', `p${r}${c}`, { o: 1, s: 1 }, 300, 'back'])),
    cap(1200, 'Перебираем по порядку, чтобы ничего не пропустить…'),
    cap(4800, 'Получилось 6. Короче: 3 × 2 × 1 = 6.'), pop(4800, 'f'), mood(4800, 'cat', 'happy'),
    cap(7000, 'Выбор из двух групп — умножаем: 2 футболки × 4 шорт = 8 комплектов.'), pop(7000, 'fit'),
  ),
});

// серия 2: круги Эйлера
const ep2 = episode({
  title: 'Круги пересекаются',
  terms: ['пересечение множеств', 'всего = A + B − оба'],
  svg: `<g data-a="A"><circle r="62" fill="#ff9a3c" opacity=".35" stroke="#ff7a59" stroke-width="3"/></g><g data-a="Bc"><circle r="62" fill="#2bb3c9" opacity=".35" stroke="#1784a6" stroke-width="3"/></g>
    ${text('ta', 'рисуют: 7', { size: 14, color: '#c0392b' })}${text('tb', 'поют: 6', { size: 14, color: '#1784a6' })}${text('both', 'оба: 2', { size: 14, color: '#6d3ad1' })}
    ${card('f', '7 + 6 − 2 = 11 детей', { w: 200, size: 16, fill: '#e2f8ea', stroke: '#9fdcb9' })}${text('why', '«оба» посчитали дважды — вычитаем один раз', { size: 12, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 28)}`,
  init: { A: hid(140, 100), Bc: hid(220, 100), ta: hid(110, 100), tb: hid(250, 100), both: hid(180, 100), f: hid(180, 194), why: hid(180, 226), cat: at(4, 4) },
  caption0: '7 детей рисуют, 6 поют, а 2 и рисуют, и поют. Сколько всего детей?',
  beats: beat(
    pop(400, ['A', 'ta'], 200), pop(1200, ['Bc', 'tb'], 200), pop(2200, 'both'),
    cap(2600, 'Двое попали в оба круга — в серединку.'),
    cap(4400, 'Если сложить 7 + 6, этих двоих посчитаем дважды. Вычтем их один раз.'), pop(4400, ['f', 'why'], 400), mood(4400, 'cat', 'happy'),
  ),
});

// серия 3: рукопожатия, носки, вершины куба
const pos = [[90, 60], [170, 40], [210, 110], [130, 130], [60, 120]];
const lines = [];
for (let i = 0; i < 5; i += 1) for (let j = i + 1; j < 5; j += 1) lines.push([`l${i}${j}`, ...pos[i], ...pos[j]]);
const ep3 = episode({
  title: 'Рукопожатия и носки',
  terms: ['каждый с каждым', 'принцип «ящиков» (носки)', 'вершины куба'],
  svg: `${lines.map(([n, x1, y1, x2, y2]) => cutLine(n, x1, y1, x2, y2, '#ff7a59')).join('')}${pos.map((p, i) => emo(`h${i}`, '🙂', 24)).join('')}${text('hs', '5 человек: 10 рукопожатий', { size: 14, color: '#16774a' })}
    ${emo('s1', '🧦', 26)}${emo('s2', '🧦', 26)}${emo('s3', '🧦', 26)}${emo('s4', '🧦', 26)}${text('sk', '4 носка → пара', { size: 13, color: '#1784a6' })}${text('cube', 'у куба 8 вершин', { size: 13, color: '#6d3ad1' })}${kittenActor('cat', 'excited', 26)}`,
  init: { ...Object.fromEntries(pos.map((p, i) => [`h${i}`, hid(p[0], p[1])])), hs: hid(140, 170), s1: hid(250, 60), s2: hid(276, 60), s3: hid(302, 60), s4: hid(328, 60), sk: hid(290, 100), cube: hid(290, 140), cat: at(320, 196) },
  caption0: 'Пятеро здороваются за руку, каждый с каждым.',
  beats: beat(
    pop(200, pos.map((_, i) => `h${i}`), 120), ...lines.map(([n], k) => draw(900 + k * 280, n, 260)),
    cap(1200, 'Рисуем линию на каждое рукопожатие и считаем: 4 + 3 + 2 + 1 = 10.'), pop(4000, 'hs'),
    cap(5200, 'Носки трёх цветов в темноте: 3 могут быть разными, а 4-й точно даст пару.'), pop(5200, ['s1', 's2', 's3', 's4'], 300), pop(6400, 'sk'),
    cap(7600, 'А у куба 8 вершин: 4 сверху и 4 снизу.'), pop(7600, 'cube'), mood(7600, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { fit: { say: 'Каждую из 2 футболок можно надеть с любыми из 4 шорт: 2 × 4 = 8.' } } };

export default { topic: 'logic-2-4', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

// Остров 1 · Математика · Тема 3. Геометрия и измерения — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, episode, beat, cutLine } from '../js/cartoon-kit.js';

// серия 1: радиус и диаметр
const ep1 = episode({
  title: 'Круг',
  terms: ['радиус', 'диаметр'],
  svg: `<circle cx="180" cy="120" r="80" fill="#eef7fb" stroke="#1784a6" stroke-width="4"/><circle cx="180" cy="120" r="5" fill="#23324a"/>
    ${cutLine('r1', 180, 120, 260, 120, '#ff7a59')}${cutLine('r2', 180, 120, 100, 120, '#9b5cf6')}
    ${text('l1', 'радиус 5 см', { size: 13, color: '#ff7a59' })}${text('l2', 'ещё радиус', { size: 13, color: '#9b5cf6' })}
    ${card('d', 'диаметр = 5 + 5 = 10 см', { w: 230, size: 17, fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'excited', 48)}`,
  init: { l1: hid(222, 110), l2: hid(140, 142), d: hid(180, 222), cat: at(296, 150) },
  caption0: 'Вот круг. Точка в середине — центр.',
  beats: beat(
    cap(1400, 'Радиус — от центра до края. Тут он 5 см.'), draw(1400, 'r1', 800), pop(2200, 'l1'),
    cap(4000, 'Пройдём ещё радиус в другую сторону…'), draw(4000, 'r2', 800), pop(4800, 'l2'),
    cap(6400, 'Диаметр — от края до края через центр. Это два радиуса!'), pop(6400, 'd'), mood(6400, 'cat', 'happy'),
  ),
});

// серия 2: углы треугольника и прямой линии
const wedge = (name, a0, a1, color) => {
  const p = (a) => `${(180 + 70 * Math.cos(-a * Math.PI / 180)).toFixed(1)} ${(200 + 70 * Math.sin(-a * Math.PI / 180)).toFixed(1)}`;
  return `<path data-a="${name}" d="M180 200 L${p(a0)} A70 70 0 0 0 ${p(a1)} Z" fill="${color}" stroke="#fff" stroke-width="2"/>`;
};
const ep2 = episode({
  title: 'Углы',
  terms: ['угол', 'сумма углов треугольника', 'углы на прямой', 'прямой угол'],
  svg: `<path d="M40 110 L150 110 L80 30 Z" fill="#fff" stroke="#23324a" stroke-width="3" stroke-linejoin="round"/>
    ${text('a1', '50°', { size: 14, color: '#ff7a59' })}${text('a2', '60°', { size: 14, color: '#2bb3c9' })}${text('a3', '70°', { size: 14, color: '#4cc27a' })}
    <line x1="90" y1="200" x2="270" y2="200" stroke="#23324a" stroke-width="3"/>
    ${wedge('w1', 0, 50, '#ff7a59')}${wedge('w2', 50, 110, '#2bb3c9')}${wedge('w3', 110, 180, '#4cc27a')}
    ${text('sum', '50° + 60° + 70° = 180°', { size: 18, color: '#16774a' })}${card('line', 'На прямой: 110° + 70° = 180°', { w: 250, size: 15, fill: '#eef7fb' })}
    ${kittenActor('cat', 'thinking', 46)}`,
  init: { a1: hid(58, 102), a2: hid(130, 102), a3: hid(81, 52), w1: { o: 0 }, w2: { o: 0 }, w3: { o: 0 }, sum: hid(260, 70), line: hid(180, 226), cat: at(300, 100) },
  caption0: 'Угол — раскрытие между двумя линиями, в градусах (°).',
  beats: beat(
    pop(800, ['a1', 'a2', 'a3']),
    cap(2400, 'Возьмём три угла треугольника и поставим их рядом…'),
    [[2600, 'to', 'w1', { o: 1 }, 500]], [[3200, 'to', 'w2', { o: 1 }, 500]], [[3800, 'to', 'w3', { o: 1 }, 500]],
    cap(4800, 'Получилась ровная линия — это 180°!'), pop(4800, 'sum'), mood(4800, 'cat', 'happy'),
    cap(7000, 'У любого треугольника углы вместе дают 180°. Третий угол: 180 − 50 − 60 = 70.'),
    cap(9800, 'Углы рядом на прямой тоже дают 180°. Прямой угол — 90°, как уголок книги.'), pop(9800, 'line'),
  ),
});

// серия 3: площадь (квадратики, параллелограмм, треугольник)
let sq = '';
for (let r = 0; r < 2; r += 1) for (let c = 0; c < 3; c += 1) sq += `<rect data-a="q${r}${c}" x="${60 + c * 30}" y="${40 + r * 30}" width="28" height="28" rx="4" fill="#ffcf3f"/>`;
const ep3 = episode({
  title: 'Площадь',
  terms: ['площадь', 'см²', 'периметр', 'площадь параллелограмма', 'площадь треугольника', 'основание', 'высота'],
  svg: `<rect x="60" y="40" width="90" height="60" fill="none" stroke="#ff7a59" stroke-width="3"/>${sq}${text('s6', '3 × 2 = 6 см²', { size: 16 })}
    <g data-a="para"><path d="M60 200 L200 200 L240 130 L100 130 Z" fill="#cfe6ef" stroke="#1784a6" stroke-width="3"/></g>
    <g data-a="tri"><path d="M60 200 L100 200 L100 130 Z" fill="#9b5cf6" opacity=".75"/></g>
    <line data-a="hl" x1="100" y1="130" x2="100" y2="200" stroke="#23324a" stroke-width="2" stroke-dasharray="5 4"/>
    ${text('h', 'высота 5', { size: 13, anchor: 'start' })}${text('base', 'основание 8', { size: 13 })}${text('ap', 'S = 8 × 5 = 40 см²', { size: 16, color: '#16774a' })}
    ${text('at', 'S треуг. = осн. × выс. ÷ 2', { size: 13, color: '#9b5cf6' })}${kittenActor('cat', 'excited', 44)}`,
  init: {
    ...Object.fromEntries(['00', '01', '02', '10', '11', '12'].map((k) => [`q${k}`, { o: 0 }])),
    s6: hid(105, 122), para: { o: 0 }, tri: { o: 0 }, hl: { o: 0 }, h: hid(104, 168), base: hid(118, 216), ap: hid(280, 90), at: hid(258, 232), cat: at(300, 140),
  },
  caption0: 'Площадь — сколько квадратиков 1 × 1 помещается внутри.',
  beats: beat(
    ...['00', '01', '02', '10', '11', '12'].map((k, i) => [[600 + i * 300, 'to', `q${k}`, { o: 1 }, 250]]),
    pop(2500, 's6'),
    cap(2600, 'Прямоугольник 3 на 2 — это 6 квадратных сантиметров (см²).'),
    cap(4700, 'Периметр — длина забора вокруг фигуры. Площадь — место внутри.'),
    [[6600, 'to', 'para', { o: 1 }, 400], [6600, 'to', 'tri', { o: 1 }, 400], [6600, 'to', 'hl', { o: 1 }, 400]], pop(6800, ['h', 'base']),
    cap(6600, 'Параллелограмм. Отрежем треугольник слева…'),
    move(8600, 'tri', { x: 140 }, 900),
    cap(8800, '…и приставим справа. Получился прямоугольник! S = основание × высота.'), pop(9600, 'ap'),
    cap(11600, 'Треугольник — половина такого прямоугольника: основание × высота ÷ 2.'), pop(11600, 'at'), mood(11600, 'cat', 'happy'),
  ),
});

// серия 4: объём и километры
let cubes = '';
for (let l = 0; l < 2; l += 1) for (let r = 2; r >= 0; r -= 1) for (let c = 0; c < 4; c += 1) {
  const x = 50 + c * 26 + r * 12;
  const y = 150 - r * 12 - l * 26;
  cubes += `<g data-a="k${l}${r}${c}"><rect x="${x}" y="${y}" width="24" height="24" rx="3" fill="${l ? '#ffcf3f' : '#ff9a3c'}" stroke="#c97a1f" stroke-width="2"/></g>`;
}
const ep4 = episode({
  title: 'Объём и длина',
  terms: ['объём', 'см³', 'кубоид', 'километр', 'метр'],
  svg: `${cubes}${text('v1', 'слой: 4 × 3 = 12', { size: 15, anchor: 'start' })}${text('v2', '2 слоя: 24 см³', { size: 16, anchor: 'start', color: '#16774a' })}
    ${card('km', '1 км = 1000 м → 2,5 км = 2500 м', { w: 290, size: 15, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 44)}`,
  init: {
    ...Object.fromEntries([0, 1].flatMap((l) => [0, 1, 2].flatMap((r) => [0, 1, 2, 3].map((c) => [`k${l}${r}${c}`, { o: 0, y: -30 }])))),
    v1: hid(196, 150), v2: hid(196, 112), km: hid(180, 222), cat: at(304, 10),
  },
  caption0: 'Объём — сколько кубиков 1 × 1 × 1 см поместится внутрь.',
  beats: beat(
    ...[0, 1, 2].flatMap((r) => [0, 1, 2, 3].map((c, i) => [[700 + (r * 4 + i) * 120, 'to', `k0${r}${c}`, { o: 1, y: 0 }, 300, 'out']])),
    cap(2300, 'Кубоид 4 × 3 × 2. Нижний слой: 4 × 3 = 12 кубиков.'), pop(2300, 'v1'),
    ...[0, 1, 2].flatMap((r) => [0, 1, 2, 3].map((c, i) => [[4300 + (r * 4 + i) * 120, 'to', `k1${r}${c}`, { o: 1, y: 0 }, 300, 'out']])),
    cap(4300, 'Два слоя: 12 × 2 = 24 см³. Объём = длина × ширина × высота.'), pop(6000, 'v2'),
    cap(8200, 'А длинные пути меряют в километрах: в 1 км — 1000 метров.'), pop(8200, 'km'), mood(8200, 'cat', 'happy'),
  ),
});

// серия 5: координаты и отражение
const ox = 180;
const oy = 120;
const u = 22;
let grid = '';
for (let i = -7; i <= 7; i += 1) grid += `<line x1="${ox + i * u}" y1="20" x2="${ox + i * u}" y2="220" stroke="#e3edf3"/>`;
for (let j = -4; j <= 4; j += 1) grid += `<line x1="20" y1="${oy + j * u}" x2="340" y2="${oy + j * u}" stroke="#e3edf3"/>`;
const ep5 = episode({
  title: 'Координаты',
  terms: ['координатная сетка', 'ось x', 'ось y', 'координаты точки', 'отражение'],
  svg: `${grid}<line x1="20" y1="${oy}" x2="340" y2="${oy}" stroke="#ff7a59" stroke-width="3"/><line x1="${ox}" y1="20" x2="${ox}" y2="220" stroke="#23324a" stroke-width="3"/>
    ${text('lx', 'x', { size: 16, color: '#ff7a59' })}${text('ly', 'y', { size: 16 })}${kittenActor('cat', 'excited', 34)}
    ${text('p1', '(−2, 3)', { size: 15, color: '#1784a6' })}<g data-a="dotA"><circle r="7" fill="#ff7a59"/></g><g data-a="dotB"><circle r="7" fill="#9b5cf6"/></g>
    ${text('pa', '(3, 2)', { size: 14 })}${text('pb', '(3, −2)', { size: 14, color: '#9b5cf6' })}`,
  init: { lx: at(332, oy - 8), ly: at(ox + 12, 32), cat: at(ox - 17, oy - 40), p1: hid(ox - 2 * u + 44, oy - 3 * u - 24), dotA: hid(ox + 3 * u, oy - 2 * u), dotB: hid(ox + 3 * u, oy - 2 * u), pa: hid(ox + 3 * u + 30, oy - 2 * u - 8), pb: hid(ox + 3 * u + 34, oy + 2 * u + 4) },
  caption0: 'Сетка: ось x — вправо и влево, ось y — вверх и вниз. В центре 0.',
  beats: beat(
    cap(1800, 'Точка (−2, 3): котёнок идёт 2 шага влево…'),
    hop(1800, 'cat', { x: ox - u - 17 }, 500), hop(2400, 'cat', { x: ox - 2 * u - 17 }, 500),
    cap(3200, '…и 3 шага вверх. Мы слева вверху!'),
    hop(3200, 'cat', { y: oy - u - 40 }, 450), hop(3700, 'cat', { y: oy - 2 * u - 40 }, 450), hop(4200, 'cat', { y: oy - 3 * u - 40 }, 450),
    pop(4700, 'p1'), mood(4700, 'cat', 'happy'),
    cap(6400, 'Отражение — как в зеркале. Точку (3, 2) отразим через ось x…'), pop(6400, ['dotA', 'pa']),
    [[6900, 'to', 'dotB', { o: 1, s: 1 }, 200]], move(7600, 'dotB', { y: oy + 2 * u }, 1200),
    cap(8900, 'Она прыгнула вниз на столько же: стала (3, −2).'), pop(8900, 'pb'),
  ),
});

// интерактив: нажми — котёнок объяснит
ep2.interact = { type: 'tapShow', cat: 'cat', items: {
  w1: { say: 'Оранжевый угол — 50°.' }, w2: { say: 'Голубой угол — 60°.' }, w3: { say: 'Зелёный угол — 70°. Вместе 180°!' },
} };

export default { topic: 'math-1-3', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4, ep5] };

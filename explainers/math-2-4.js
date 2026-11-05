// Остров 2 · Математика · Тема 4. Углы, площадь, средние значения и вероятность — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, cutLine, mark, episode, beat } from '../js/cartoon-kit.js';

// серия 1: углы четырёхугольника и вокруг точки
const ep1 = episode({
  title: 'Углы',
  terms: ['сумма углов четырёхугольника 360°', 'углы вокруг точки 360°', 'недостающий угол'],
  svg: `<path d="M30 180 L150 190 L170 80 L60 60 Z" fill="#eef7fb" stroke="#1784a6" stroke-width="3"/>${cutLine('diag', 30, 180, 170, 80, '#ff7a59')}
    ${text('t1', '180°', { size: 15, color: '#ff7a59' })}${text('t2', '180°', { size: 15, color: '#ff7a59' })}${text('s', '180° + 180° = 360°', { size: 16, color: '#16774a' })}
    <circle cx="270" cy="130" r="50" fill="none" stroke="#d6e5ee" stroke-width="3"/><path d="M270 130 L320 130 M270 130 L230 100 M270 130 L270 180" stroke="#23324a" stroke-width="3"/>
    ${text('a1', '150°', { size: 13 })}${text('a2', '120°', { size: 13 })}${text('a3', '?', { size: 15, color: '#ff7a59' })}${text('pt', '360 − 150 − 120 = 90°', { size: 14, color: '#16774a' })}${kittenActor('cat', 'thinking', 30)}`,
  init: { t1: hid(70, 150), t2: hid(125, 115), s: hid(100, 222), a1: hid(282, 108), a2: hid(240, 150), a3: hid(300, 162), pt: hid(270, 222), cat: at(320, 4) },
  caption0: 'Сколько градусов во всех углах четырёхугольника?',
  beats: beat(
    cap(1000, 'Проведём диагональ — получилось два треугольника.'), draw(1000, 'diag', 800), pop(1800, ['t1', 't2'], 300),
    cap(3000, 'В каждом треугольнике 180°. Вместе 360°!'), pop(3000, 's'), mood(3000, 'cat', 'happy'),
    cap(5000, 'Вокруг точки — полный оборот: тоже 360°.'), pop(5000, ['a1', 'a2', 'a3'], 300),
    cap(6800, 'Недостающий угол: из 360 вычитаем известные. 360 − 150 − 120 = 90°.'), setText(6800, 'a3', '90°'), pop(6800, 'pt'),
  ),
});

// серия 2: площадь сложной фигуры
const ep2 = episode({
  title: 'Комната с нишей',
  terms: ['площадь сложной фигуры', 'разбить на прямоугольники'],
  svg: `<g data-a="big"><rect x="0" y="0" width="180" height="120" fill="#ffe3a8" stroke="#d2a861" stroke-width="3"/></g><g data-a="nook"><rect x="0" y="0" width="60" height="90" fill="#cfe6ef" stroke="#1784a6" stroke-width="3"/></g>
    ${text('l1', '6 × 4 = 24 м²', { size: 16 })}${text('l2', '2 × 3 = 6 м²', { size: 14 })}${text('sum', '24 + 6 = 30 м²', { size: 22, color: '#16774a' })}${kittenActor('cat', 'excited', 34)}`,
  init: { big: at(40, 50), nook: at(220, 80, { o: 0 }), l1: hid(130, 116), l2: hid(250, 130), sum: hid(180, 222), cat: at(300, 4) },
  caption0: 'Комната необычной формы. Как найти её площадь?',
  beats: beat(
    [[800, 'to', 'nook', { o: 1 }, 400]],
    cap(1600, 'Разрежем на два прямоугольника: большой 6 на 4…'), pop(1800, 'l1'),
    cap(3400, '…и ниша 2 на 3.'), pop(3400, 'l2'),
    cap(5000, 'Площади складываем: 24 + 6 = 30 м².'), pop(5000, 'sum'), mood(5000, 'cat', 'happy'),
  ),
});

// серия 3: медиана, размах, мода
const VAL = [3, 9, 4, 7, 5];
const SORT = [3, 4, 5, 7, 9];
const ep3 = episode({
  title: 'Медиана, размах, мода',
  terms: ['медиана', 'размах', 'мода'],
  svg: `${VAL.map((v, i) => card(`v${i}`, String(v), { w: 44, h: 40, size: 20 })).join('')}${text('md', 'медиана — середина: 5', { size: 16, color: '#ff7a59' })}${text('rg', 'размах = 9 − 3 = 6', { size: 16, color: '#1784a6' })}
    ${card('mode', '2, 3, 3, 5, 3, 8 → мода 3 (чаще всех)', { w: 300, size: 15, fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'thinking', 30)}`,
  init: { ...Object.fromEntries(VAL.map((_, i) => [`v${i}`, hid(60 + i * 60, 60)])), md: hid(180, 116), rg: hid(180, 146), mode: hid(180, 206), cat: at(320, 4) },
  caption0: 'Числа 3, 9, 4, 7, 5.',
  beats: beat(
    pop(200, VAL.map((_, i) => `v${i}`), 150),
    cap(1400, 'Сначала выстроим их по порядку.'), ...VAL.map((v, i) => move(1600, `v${i}`, { x: 60 + SORT.indexOf(v) * 60 }, 800)),
    cap(3000, 'Медиана — число посередине: 5.'), move(3000, 'v4', { y: 50, s: 1.2 }, 300), pop(3000, 'md'),
    cap(4800, 'Размах — разница между самым большим и самым маленьким: 9 − 3 = 6.'), pop(4800, 'rg'),
    cap(6800, 'Мода — число, которое встречается чаще всех.'), pop(6800, 'mode'), mood(6800, 'cat', 'happy'),
  ),
});

// серия 4: вероятность
const ep4 = episode({
  title: 'Вероятность',
  terms: ['вероятность', 'равновозможные исходы', 'вероятность «не произойдёт» = 1 − p'],
  svg: `${emo('die', '🎲', 46)}${text('d', 'граней 6, нужная одна → 1/6', { size: 15 })}
    <path d="M60 120 h90 l-10 70 h-70 z" fill="#d9a066" stroke="#a0673c" stroke-width="3"/>${[0, 1, 2].map((i) => `<g data-a="r${i}"><circle r="11" fill="#e4553b"/></g>`).join('')}${[0, 1].map((i) => `<g data-a="b${i}"><circle r="11" fill="#2bb3c9"/></g>`).join('')}
    ${text('bag', 'синих 2 из 5 → 2/5', { size: 15, color: '#1784a6' })}${card('rain', 'нет дождя: 1 − 0,3 = 0,7', { w: 190, h: 44, size: 14, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 30)}`,
  init: { die: hid(50, 50), d: hid(200, 52), r0: hid(80, 160), r1: hid(105, 160), r2: hid(130, 160), b0: hid(92, 140), b1: hid(118, 140), bag: hid(105, 216), rain: hid(258, 160), cat: at(320, 190) },
  caption0: 'Вероятность — насколько событие возможно, от 0 до 1.',
  beats: beat(
    pop(200, 'die'), [[600, 'to', 'die', { r: 360 }, 800]], cap(1000, 'У кубика 6 граней, все выпадают одинаково часто. Шестёрка — одна из шести: 1/6.'), pop(1600, 'd'),
    cap(4000, 'В мешке 3 красных и 2 синих шара. Вытянем наугад…'), pop(4000, ['r0', 'r1', 'r2', 'b0', 'b1'], 120),
    cap(5800, 'Синих 2 из 5 — вероятность 2/5.'), hop(5800, 'b1', { y: 100 }, 600), pop(6400, 'bag'),
    cap(7800, 'Если дождь с вероятностью 0,3, то без дождя: 1 − 0,3 = 0,7.'), pop(7800, 'rain'), mood(7800, 'cat', 'happy'),
  ),
});

ep3.interact = { type: 'tapShow', cat: 'cat', items: Object.fromEntries(VAL.map((v, i) => [`v${i}`, { say: v === 5 ? '5 — в середине ряда 3, 4, 5, 7, 9: это медиана!' : `${v} — не в середине. Медиана стоит посередине.` }])) };

export default { topic: 'math-2-4', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

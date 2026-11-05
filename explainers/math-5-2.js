// Остров 5 · Математика · Тема 2. Графики — мини-мультфильм (примеры свои)
import { card, text, emo, arrow, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, cutLine, episode, beat } from '../js/cartoon-kit.js';

// оси: начало (40,200), 1 клетка = 20px; x до 7, y до 8
const X = (v) => 40 + v * 20; const Y = (v) => 200 - v * 20;
const axes = `<path d="M40 210 V20 M30 200 H190" stroke="#23324a" stroke-width="2"/>`;

// серия 1: прямая по двум точкам, градиент, пересечение
const ep1 = episode({
  title: 'Прямая и градиент',
  terms: ['градиент m = подъём ÷ шаг вправо', 'y = mx + c', 'перпендикулярная прямая: градиент −1/m', 'точка пересечения — общее решение'],
  svg: `${axes}<g data-a="p1"><circle cx="${X(1)}" cy="${Y(1)}" r="5" fill="#ff7a59"/></g><g data-a="p2"><circle cx="${X(3)}" cy="${Y(5)}" r="5" fill="#ff7a59"/></g>
    ${cutLine('run', X(1), Y(1), X(3), Y(1), '#2bb3c9')}${cutLine('rise', X(3), Y(1), X(3), Y(5), '#6d3ad1')}${cutLine('ln', X(0), Y(-1), X(4.5), Y(8), '#ff7a59')}
    ${text('rt', 'вправо 2', { size: 12, color: '#1784a6' })}${text('rs', 'вверх 4', { size: 12, color: '#6d3ad1' })}
    ${card('m', 'm = 4 ÷ 2 = 2', { w: 140, size: 15 })}${card('eq', 'y = 2x − 1', { w: 140, size: 17, fill: '#fff3d6', stroke: '#f2c46d' })}${text('pp', 'перпендикуляр: m = −1/2', { size: 12, color: '#16774a' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { p1: hid(0, 0), p2: hid(0, 0), rt: hid(X(2), Y(1) + 14), rs: hid(X(3) + 30, Y(3)), m: hid(270, 70), eq: hid(270, 118), pp: hid(270, 160), cat: at(320, 4) },
  caption0: 'Прямая проходит через точки (1, 1) и (3, 5).',
  beats: beat(
    [[300, 'to', 'p1', { o: 1, s: 1 }, 300], [600, 'to', 'p2', { o: 1, s: 1 }, 300]],
    draw(1500, 'run', 500), pop(1700, 'rt'), draw(2200, 'rise', 600), pop(2500, 'rs'), cap(1500, 'Шаг вправо 2, подъём 4.'),
    pop(3400, 'm'), cap(3400, 'Градиент = подъём ÷ шаг = 2. Чем больше градиент, тем круче прямая.'),
    draw(5000, 'ln', 900), pop(5400, 'eq'), cap(5000, 'При x = 0 прямая на высоте −1: y = 2x − 1.'),
    pop(7000, 'pp'), cap(7000, 'Перпендикулярная прямая: градиент «переворачиваем» и меняем знак: −1/2.'), mood(7000, 'cat', 'happy'),
  ),
});

// серия 2: парабола
const pts = []; for (let x = 0; x <= 6.01; x += 0.25) pts.push(`${X(x)},${200 - (x * x - 6 * x + 5 + 4) * 15}`);
const ep2 = episode({
  title: 'Парабола',
  terms: ['парабола — график y = x² + …', 'вершина — самая низкая точка', 'нули — где график пересекает ось x (y = 0)', 'парабола симметрична'],
  svg: `<path d="M40 210 V20 M30 140 H200" stroke="#23324a" stroke-width="2"/><polyline data-a="par" data-draw points="${pts.join(' ')}" fill="none" stroke="#ff7a59" stroke-width="3"/>
    ${cutLine('sym', X(3), 30, X(3), 210, '#9aa5b4')}<g data-a="r1"><circle cx="${X(1)}" cy="140" r="6" fill="#2bb3c9"/></g><g data-a="r2"><circle cx="${X(5)}" cy="140" r="6" fill="#2bb3c9"/></g><g data-a="v"><circle cx="${X(3)}" cy="200" r="6" fill="#6d3ad1"/></g>
    ${card('eq', 'y = x² − 6x + 5', { w: 150, size: 14 })}${text('rt', 'нули: x = 1 и x = 5', { size: 13, color: '#1784a6' })}${text('vt', 'вершина (3, −4)', { size: 13, color: '#6d3ad1' })}${text('st', 'посередине между нулями', { size: 11, color: '#5b6b83' })}${kittenActor('cat', 'excited', 22)}`,
  init: { r1: hid(0, 0), r2: hid(0, 0), v: hid(0, 0), eq: hid(280, 40), rt: hid(280, 90), vt: hid(280, 130), st: hid(280, 152), cat: at(320, 200) },
  caption0: 'График с x² — дуга-«улыбка», парабола.',
  beats: beat(
    pop(200, 'eq'), draw(500, 'par', 1600), cap(500, 'Рисуем y = x² − 6x + 5 по точкам.'),
    pop(2600, ['r1', 'r2'], 300), pop(2900, 'rt'), cap(2600, 'Там, где y = 0, график пересекает ось x — это нули: 1 и 5.'),
    draw(4400, 'sym', 600), pop(4800, ['v', 'vt', 'st'], 200), cap(4400, 'Парабола симметрична. Вершина ровно посередине: x = 3, y = −4.'), mood(5000, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { r1: { say: 'x = 1: 1 − 6 + 5 = 0 ✔' }, r2: { say: 'x = 5: 25 − 30 + 5 = 0 ✔' }, v: { say: 'Вершина: x = 3, y = 9 − 18 + 5 = −4.' } } },
});

// серия 3: график пути
const ep3 = episode({
  title: 'График пути',
  terms: ['горизонтальная линия на графике пути — стоим', 'скорость = путь ÷ время (наклон)', 'точка пересечения двух прямых', 'y = 2ˣ растёт всё быстрее'],
  svg: `${axes}${cutLine('a', X(0), Y(0), X(2), Y(5), '#ff7a59')}${cutLine('b', X(2), Y(5), X(4), Y(5), '#2bb3c9')}${cutLine('c', X(4), Y(5), X(6), Y(8), '#ff7a59')}
    ${emo('car', '🚗', 24)}${text('t1', '100 км за 2 ч = 50 км/ч', { size: 12, color: '#b06200' })}${text('t2', 'ровно → стоим', { size: 12, color: '#1784a6' })}
    ${card('x', 'y = x + 1 и y = 2x − 2 встречаются в (3, 4)', { w: 330, size: 12, fill: '#eef7fb' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { car: at(X(0), Y(0) - 12), t1: hid(270, 60), t2: hid(270, 100), x: hid(180, 228), cat: at(320, 4) },
  caption0: 'График пути: по горизонтали время, по вертикали — сколько проехали.',
  beats: beat(
    draw(300, 'a', 1200), move(300, 'car', { x: X(2), y: Y(5) - 12 }, 1200, 'linear'), pop(1600, 't1'), cap(1600, 'Чем круче линия, тем быстрее едем: 100 км за 2 ч = 50 км/ч.'),
    draw(3200, 'b', 1000), pop(3400, 't2'), wiggle_(3600), cap(3200, 'Линия горизонтальная — путь не растёт: машина стоит.'),
    draw(5000, 'c', 900), move(5000, 'car', { x: X(6), y: Y(8) - 12 }, 900, 'linear'),
    pop(6400, 'x'), cap(6400, 'Если две прямые пересеклись — в этой точке x и y у них общие.'), mood(6400, 'cat', 'happy'),
  ),
});
function wiggle_(t) { return [[t, 'to', 'car', { r: -6 }, 150], [t + 150, 'to', 'car', { r: 6 }, 150], [t + 300, 'to', 'car', { r: 0 }, 150]]; }

export default { topic: 'math-5-2', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

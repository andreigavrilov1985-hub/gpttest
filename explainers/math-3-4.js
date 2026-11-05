// Остров 3 · Математика · Тема 4. Круг, углы и объёмы — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, cutLine, episode, beat } from '../js/cartoon-kit.js';

// серия 1: окружность и площадь круга
const ep1 = episode({
  title: 'Круг и π',
  terms: ['длина окружности C = 2πr', 'площадь круга S = πr²', 'π ≈ 3,14 ≈ 22/7'],
  svg: `<circle cx="100" cy="110" r="60" fill="#eef7fb" stroke="#1784a6" stroke-width="4"/>${cutLine('r', 100, 110, 160, 110, '#ff7a59')}${text('rt', 'r', { size: 16, color: '#ff7a59' })}
    <path data-a="rope" data-draw d="M40 200 h${(2 * Math.PI * 30).toFixed(0)}" stroke="#1784a6" stroke-width="5"/>${text('ct', 'C = 2 × π × r', { size: 18, color: '#1784a6' })}
    ${text('st', 'S = π × r × r', { size: 18, color: '#16774a' })}${text('ex', 'r = 14, π ≈ 22/7: C = 88, S = 616', { size: 13, color: '#5b6b83' })}${kittenActor('cat', 'excited', 28)}`,
  init: { rt: hid(130, 104), ct: hid(260, 70), st: hid(260, 120), ex: hid(250, 170), cat: at(318, 196) },
  caption0: 'Радиус r — от центра до края.',
  beats: beat(
    draw(300, 'r', 600), pop(800, 'rt'), cap(1800, 'Если развернуть окружность в верёвочку, её длина — чуть больше 6 радиусов: 2πr.'), draw(2400, 'rope', 1400), pop(3200, 'ct'),
    cap(5000, 'Площадь круга: π × r × r.'), pop(5000, 'st'), cap(6600, 'π ≈ 3,14 или 22/7 — так удобно, если радиус делится на 7.'), pop(6600, 'ex'), mood(6600, 'cat', 'happy'),
  ),
});

// серия 2: углы
const ep2 = episode({
  title: 'Углы и фигуры',
  terms: ['теорема Пифагора a² + b² = c²', 'накрест лежащие углы равны', 'сумма углов многоугольника (n − 2) × 180°', 'равнобедренный треугольник'],
  svg: `<path d="M30 150 L30 60 L150 150 Z" fill="#fff3d6" stroke="#d2a861" stroke-width="3"/>${text('a', '3', { size: 14 })}${text('b', '4', { size: 14 })}${text('c', '5', { size: 14, color: '#ff7a59' })}
    ${text('py', '3² + 4² = 9 + 16 = 25 = 5²', { size: 14, color: '#16774a' })}
    <path d="M190 60 H340 M190 140 H340 M230 180 L300 20" stroke="#23324a" stroke-width="3"/>${text('z', 'Z-углы равны', { size: 13, color: '#9b5cf6' })}
    ${card('poly', 'шестиугольник: (6 − 2) × 180° = 720°', { w: 300, size: 14, fill: '#eef7fb' })}${kittenActor('cat', 'thinking', 26)}`,
  init: { a: hid(18, 110), b: hid(90, 168), c: hid(100, 98), py: hid(90, 194), z: hid(300, 110), poly: hid(180, 226), cat: at(318, 4) },
  caption0: 'Прямоугольный треугольник со сторонами 3, 4 и 5.',
  beats: beat(
    pop(300, ['a', 'b', 'c'], 200), cap(1200, 'Пифагор: квадрат гипотенузы равен сумме квадратов катетов.'), pop(2000, 'py'),
    cap(4000, 'Две параллельные прямые и секущая: накрест лежащие (Z-) углы равны.'), pop(4000, 'z'),
    cap(6000, 'Сумма углов многоугольника: (n − 2) × 180°.'), pop(6000, 'poly'), mood(6000, 'cat', 'happy'),
  ),
});

// серия 3: призма, трапеция, единицы
const ep3 = episode({
  title: 'Объём и площадь',
  terms: ['объём призмы = площадь сечения × длина', 'площадь трапеции = (a + b) ÷ 2 × h', '1 м² = 10 000 см²'],
  svg: `<g data-a="pr"><path d="M30 120 L80 70 L130 120 Z" fill="#ffcf3f" stroke="#c99400" stroke-width="2"/><path d="M80 70 L200 50 L250 100 L130 120 M200 50 L130 120" stroke="#c99400" stroke-width="2" fill="none"/></g>
    ${text('pv', 'V = S сечения × длина', { size: 14, color: '#b06200' })}<path d="M190 200 L220 150 H290 L320 200 Z" fill="#cfe6ef" stroke="#1784a6" stroke-width="3"/>${text('tr', '(a + b) ÷ 2 × h', { size: 14, color: '#1784a6' })}
    ${card('m2', '1 м = 100 см → 1 м² = 100 × 100 = 10 000 см²', { w: 330, size: 13, fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'excited', 26)}`,
  init: { pr: hid(0, 0), pv: hid(110, 150), tr: hid(255, 140), m2: hid(180, 226), cat: at(318, 4) },
  caption0: 'Призма — фигура с одинаковым сечением по всей длине.',
  beats: beat(
    [[300, 'to', 'pr', { o: 1, s: 1 }, 600]], cap(1000, 'Объём призмы: площадь сечения умножить на длину.'), pop(1600, 'pv'),
    cap(3400, 'Площадь трапеции: средняя из двух параллельных сторон, умноженная на высоту.'), pop(3400, 'tr'),
    cap(5600, 'Осторожно с единицами: в 1 м² — 10 000 см²!'), pop(5600, 'm2'), mood(5600, 'cat', 'surprised'),
  ),
});

ep2.interact = { type: 'tapShow', cat: 'cat', items: { c: { say: 'Гипотенуза — самая длинная сторона, напротив прямого угла.' }, a: { say: 'Катет 3: 3² = 9.' }, b: { say: 'Катет 4: 4² = 16.' } } };

export default { topic: 'math-3-4', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

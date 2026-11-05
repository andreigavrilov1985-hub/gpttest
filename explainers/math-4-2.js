// Остров 4 · Математика · Тема 2. Квадратные выражения, неравенства, прямые — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, cutLine, episode, beat } from '../js/cartoon-kit.js';

// серия 1: разложение квадратного трёхчлена
const ep1 = episode({
  title: 'Найди два числа',
  terms: ['x² + bx + c = (x + p)(x + q): p + q = b, p × q = c', 'корни уравнения (скобка = 0)', 'разность квадратов'],
  svg: `${card('q', 'x² + 5x + 6', { w: 160, size: 22 })}${text('hint', 'ищем два числа: сумма 5, произведение 6', { size: 14, color: '#ff7a59' })}
    ${['1 и 6', '2 и 3'].map((t, i) => card(`p${i}`, t, { w: 80, size: 16, fill: i ? '#e2f8ea' : '#f3f5f8', stroke: i ? '#9fdcb9' : '#e3edf3' })).join('')}
    ${text('f', '(x + 2)(x + 3)', { size: 22, color: '#16774a' })}${text('r', '= 0, если x = −2 или x = −3', { size: 15, color: '#1784a6' })}${card('d', '(x − 5)(x + 5) = x² − 25', { w: 250, size: 15, fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'thinking', 24)}`,
  init: { q: hid(180, 30), hint: hid(180, 64), p0: hid(130, 100), p1: hid(230, 100), f: hid(180, 140), r: hid(180, 168), d: hid(180, 214), cat: at(320, 4) },
  caption0: 'Разложим x² + 5x + 6 на две скобки.',
  beats: beat(
    pop(300, ['q', 'hint'], 400), cap(1200, 'Нужны два числа: в сумме 5, в произведении 6.'),
    pop(2400, 'p0'), cap(2400, '1 и 6? Сумма 7 — не подходит.'), move(3200, 'p0', { o: 0.3 }, 300),
    pop(3800, 'p1'), cap(3800, '2 и 3: сумма 5, произведение 6. Подходят!'), pop(4600, 'f'), mood(4600, 'cat', 'happy'),
    cap(6000, 'Произведение равно 0, если одна скобка равна 0 — так находим корни.'), pop(6000, 'r'),
    cap(7800, 'Разность квадратов: (x − a)(x + a) = x² − a².'), pop(7800, 'd'),
  ),
});

// серия 2: неравенства, системы, формулы
const ep2 = episode({
  title: 'Неравенства и системы',
  terms: ['неравенство решают как уравнение', 'система: сложить уравнения', 'выразить переменную из формулы'],
  svg: `${card('in', '3x − 1 > 8 → 3x > 9 → x > 3', { w: 290, size: 16 })}<line x1="40" y1="84" x2="320" y2="84" stroke="#23324a" stroke-width="3"/><circle cx="140" cy="84" r="7" fill="#fff" stroke="#ff7a59" stroke-width="3"/><path data-a="ray" data-draw d="M147 84 H320" stroke="#ff7a59" stroke-width="6"/>${text('t3', '3', { size: 14 })}
    ${card('sys', 'a + b = 9, a − b = 1 → сложим: 2a = 10', { w: 330, size: 14, fill: '#eef7fb' })}${text('sv', 'a = 5, b = 4', { size: 16, color: '#16774a' })}${card('fm', 'P = 2a + 2b → a = (P − 2b) ÷ 2', { w: 290, size: 14, fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'excited', 22)}`,
  init: { in: hid(180, 30), t3: hid(140, 104), sys: hid(180, 140), sv: hid(180, 170), fm: hid(180, 214), cat: at(4, 196) },
  caption0: 'Неравенство решают почти как уравнение.',
  beats: beat(
    pop(300, 'in'), cap(1000, 'Ответ x > 3 — все числа правее 3 (сама 3 не входит: пустой кружок).'), pop(1600, 't3'), draw(1800, 'ray', 900),
    cap(3600, 'Систему двух уравнений удобно решать сложением: b исчезает.'), pop(3600, 'sys'), pop(4600, 'sv'),
    cap(6000, 'Выразить переменную — «вытащить» её, делая обратные действия.'), pop(6000, 'fm'), mood(6000, 'cat', 'happy'),
  ),
});

// серия 3: уравнение прямой
const gx = (x) => 60 + x * 50;
const gy = (y) => 210 - y * 20;
const ep3 = episode({
  title: 'Прямая по двум точкам',
  terms: ['градиент = (y₂ − y₁) ÷ (x₂ − x₁)', 'y = mx + c', 'параллельные прямые — одинаковый градиент'],
  svg: `<path d="M60 20 V210 H340" stroke="#23324a" stroke-width="3" fill="none"/><g data-a="A"><circle r="6" fill="#ff7a59"/></g><g data-a="B"><circle r="6" fill="#ff7a59"/></g>
    ${text('At', '(1, 3)', { size: 13 })}${text('Bt', '(4, 9)', { size: 13 })}<path data-a="run" d="M${gx(1)} ${gy(3)} H${gx(4)}" stroke="#2bb3c9" stroke-width="3" stroke-dasharray="5 4"/><path data-a="rise" d="M${gx(4)} ${gy(3)} V${gy(9)}" stroke="#16774a" stroke-width="3" stroke-dasharray="5 4"/>
    ${text('rt', 'вправо 3', { size: 13, color: '#1784a6' })}${text('ht', 'вверх 6', { size: 13, color: '#16774a' })}${card('m', 'градиент = 6 ÷ 3 = 2', { w: 200, size: 15, fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${text('par', 'y = 2x + 1 и y = 2x − 4 параллельны', { size: 12, color: '#6d3ad1' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { A: hid(gx(1), gy(3)), B: hid(gx(4), gy(9)), At: hid(gx(1) - 24, gy(3) - 8), Bt: hid(gx(4) - 26, gy(9)), run: { o: 0 }, rise: { o: 0 }, rt: hid(gx(2.5), gy(3) + 18), ht: hid(gx(4) + 34, gy(6)), m: hid(250, 230), par: hid(200, 24), cat: at(320, 4) },
  caption0: 'Прямая проходит через (1, 3) и (4, 9). Каков её градиент?',
  beats: beat(
    pop(300, ['A', 'At', 'B', 'Bt'], 200), [[1400, 'to', 'run', { o: 1 }, 400]], pop(1600, 'rt'), [[2400, 'to', 'rise', { o: 1 }, 400]], pop(2600, 'ht'),
    cap(1400, 'Считаем шаг вправо и подъём вверх.'), pop(3600, 'm'), cap(3600, 'Градиент = подъём ÷ шаг = 6 ÷ 3 = 2.'),
    cap(5400, 'Параллельные прямые имеют одинаковый градиент, а c — разное.'), pop(5400, 'par'), mood(5400, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { p0: { say: '1 + 6 = 7, а нужно 5.' }, p1: { say: '2 + 3 = 5 и 2 × 3 = 6 — подходят!', mood: 'celebrate' } } };

export default { topic: 'math-4-2', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

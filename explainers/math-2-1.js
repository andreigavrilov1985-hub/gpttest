// Остров 2 · Математика · Тема 1. Отрицательные числа, делители и степени — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// числовая прямая от −12 до 6
const X0 = 30;
const U = 20; // px на единицу
const nx = (v) => X0 + (v + 12) * U;
const line = (y = 160, from = -12, to = 6, labelsEvery = 1) => {
  let s = `<line x1="${nx(from) - 8}" y1="${y}" x2="${nx(to) + 8}" y2="${y}" stroke="#23324a" stroke-width="3" stroke-linecap="round"/>`;
  for (let v = from; v <= to; v += 1) {
    s += `<line x1="${nx(v)}" y1="${y - 6}" x2="${nx(v)}" y2="${y + 6}" stroke="#23324a" stroke-width="${v === 0 ? 3 : 1.5}"/>`;
    if (v % labelsEvery === 0) s += `<text x="${nx(v)}" y="${y + 22}" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="11" fill="${v < 0 ? '#1784a6' : '#23324a'}">${v < 0 ? '−' : ''}${Math.abs(v)}</text>`;
  }
  return s;
};

// серия 1: прыжки по прямой
const ep1 = episode({
  title: 'Прыжки через ноль',
  terms: ['отрицательное число', 'сложение с отрицательным', 'вычитание: результат меньше нуля'],
  svg: `${line(160, -12, 6, 2)}${kittenActor('cat', 'excited', 32)}${text('e1', '−5 + 8 = 3', { size: 22, color: '#16774a' })}${text('e2', '4 − 9 = −5', { size: 22, color: '#1784a6' })}
    ${text('l1', 'левее нуля — меньше нуля', { size: 13, color: '#1784a6' })}`,
  init: { cat: at(nx(-5) - 16, 120), e1: hid(280, 36), e2: hid(280, 70), l1: hid(nx(-6), 210) },
  caption0: 'Вправо от нуля — плюс, влево — минус.',
  beats: beat(
    pop(400, 'l1'), cap(1400, '−5 + 8: стоим на −5 и прыгаем на 8 шагов вправо.'),
    ...Array.from({ length: 8 }, (_, i) => hop(1800 + i * 330, 'cat', { x: nx(-4 + i) - 16 }, 300)),
    pop(4600, 'e1'), cap(4600, 'Перепрыгнули через ноль — получилось 3.'), mood(4600, 'cat', 'happy'),
    cap(6400, '4 − 9: с 4 прыгаем на 9 шагов влево.'), move(6400, 'cat', { x: nx(4) - 16 }, 500),
    ...Array.from({ length: 9 }, (_, i) => hop(7000 + i * 300, 'cat', { x: nx(3 - i) - 16 }, 280)),
    pop(9800, 'e2'), cap(9800, 'Вычли больше, чем было, — ответ меньше нуля: −5.'),
  ),
});

// серия 2: умножение на отрицательное и сравнение
const ep2 = episode({
  title: 'Минус много раз',
  terms: ['умножение отрицательного числа', 'сравнение отрицательных чисел'],
  svg: `${line(130, -12, 6, 2)}${kittenActor('cat', 'excited', 30)}${text('e', '−3 × 4 = −12', { size: 22, color: '#1784a6' })}
    ${['3', '−2', '0', '−6'].map((v, i) => card(`c${i}`, v, { w: 38, h: 34, size: 16 })).join('')}${text('sm', 'самое маленькое — левее всех: −6', { size: 14, color: '#16774a' })}`,
  init: { cat: at(nx(0) - 15, 94), e: hid(180, 40), c0: hid(70, 200), c1: hid(140, 200), c2: hid(210, 200), c3: hid(280, 200), sm: hid(180, 232) },
  caption0: '−3 × 4 — это четыре прыжка по −3.',
  beats: beat(
    ...[0, 1, 2, 3].map((i) => hop(800 + i * 700, 'cat', { x: nx(-3 * (i + 1)) - 15 }, 600)),
    pop(3800, 'e'), cap(3800, 'Ушли влево на 12: −3 × 4 = −12.'), mood(3800, 'cat', 'happy'),
    cap(5600, 'Какое число самое маленькое: 3, −2, 0, −6?'), pop(5600, ['c0', 'c1', 'c2', 'c3'], 150),
    cap(7400, 'Ставим их на прямую: кто левее, тот меньше.'),
    move(7400, 'c3', { x: nx(-6), y: 98 }, 700), move(7600, 'c1', { x: nx(-2), y: 98 }, 700), move(7800, 'c2', { x: nx(0), y: 98 }, 700), move(8000, 'c0', { x: nx(3), y: 98 }, 700),
    pop(9000, 'sm'),
  ),
});

// серия 3: делители, НОД, НОК
const sweets = (p, n) => Array.from({ length: n }, (_, i) => `<g data-a="${p}${i}"><circle r="6" fill="#ff8fb0"/></g>`).join('');
const grid = (n, cols, x0, y0) => Array.from({ length: n }, (_, i) => ({ x: x0 + (i % cols) * 15, y: y0 + Math.floor(i / cols) * 15 }));
const ep3 = episode({
  title: 'Делители и кратные',
  terms: ['делитель', 'наибольший общий делитель (НОД)', 'кратное', 'наименьшее общее кратное (НОК)'],
  svg: `${sweets('s', 12)}${text('dv', 'делители 12: 1, 2, 3, 4, 6, 12', { size: 15, color: '#ff7a59' })}
    ${card('nod', 'НОД(12, 30) = 6: самый большой общий делитель', { w: 330, size: 13, fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${card('nok', 'НОК(4, 6) = 12: 4, 8, 12… и 6, 12… встретились!', { w: 330, size: 13, fill: '#eef7fb' })}${text('d35', '35 делится и на 5, и на 7: 5 × 7 = 35', { size: 14 })}${kittenActor('cat', 'thinking', 32)}`,
  init: { ...Object.fromEntries(grid(12, 12, 40, 50).map((p, i) => [`s${i}`, at(p.x, p.y, { o: 0 })])), dv: hid(180, 120), nod: hid(180, 156), nok: hid(180, 194), d35: hid(180, 228), cat: at(318, 70) },
  caption0: 'Делитель — число, на которое делится без остатка.',
  beats: beat(
    ...Array.from({ length: 12 }, (_, i) => [[200 + i * 60, 'to', `s${i}`, { o: 1 }, 200]]),
    cap(1200, '12 конфет можно выстроить по 2, по 3, по 4, по 6…'),
    ...grid(12, 6, 120, 40).map((p, i) => move(2000, `s${i}`, p, 600)),
    ...grid(12, 4, 140, 36).map((p, i) => move(3200, `s${i}`, p, 600)),
    ...grid(12, 3, 150, 36).map((p, i) => move(4400, `s${i}`, p, 600)),
    pop(5200, 'dv'), cap(5200, 'Все делители 12: 1, 2, 3, 4, 6, 12.'),
    cap(7000, 'НОД — наибольший общий делитель. Для 12 и 30 это 6.'), pop(7000, 'nod'),
    cap(9000, 'Кратное 4 — это 4, 8, 12… НОК — первое общее кратное: для 4 и 6 это 12.'), pop(9000, 'nok'),
    pop(11200, 'd35'), mood(11200, 'cat', 'happy'),
  ),
});

// серия 4: квадрат и корень
let dots = '';
for (let r = 0; r < 9; r += 1) for (let c = 0; c < 9; c += 1) dots += `<circle data-a="q${r}${c}" cx="${c * 14}" cy="${r * 14}" r="5" class="pct-cell"/>`;
const sq7 = [];
for (let r = 0; r < 7; r += 1) for (let c = 0; c < 7; c += 1) sq7.push(`q${r}${c}`);
const ep4 = episode({
  title: 'Квадрат и корень',
  terms: ['степень', 'квадрат числа 7²', 'квадратный корень √'],
  svg: `<g data-a="g">${dots}</g>${text('a', '7² = 7 × 7 = 49', { size: 20, color: '#ff7a59' })}${text('b', '√81 = 9', { size: 20, color: '#1784a6' })}${kittenActor('cat', 'excited', 34)}`,
  init: { g: at(30, 50, { o: 0 }), a: hid(260, 80), b: hid(270, 140), cat: at(300, 180) },
  caption0: '7² читают «семь в квадрате»: 7 × 7.',
  beats: beat(
    [[300, 'to', 'g', { o: 0.35 }, 400]], ...sq7.map((n, i) => [[800 + i * 40, 'cls', n, 'fx-gold']]), pop(2800, 'a'),
    cap(2800, 'Квадрат 7 на 7 — это 49 точек.'),
    cap(4600, 'Корень √81 — обратное: какое число в квадрате даёт 81?'), [[4600, 'to', 'g', { o: 1 }, 400]],
    cap(6400, 'Квадрат из 81 точки — 9 на 9. Значит, √81 = 9.'), pop(6400, 'b'), mood(6400, 'cat', 'happy'),
  ),
});

ep2.interact = { type: 'tapShow', cat: 'cat', items: {
  c3: { show: ['sm'], say: '−6 — самое маленькое: оно левее всех.', mood: 'celebrate' },
  c1: { say: '−2 больше, чем −6: оно ближе к нулю.' }, c2: { say: '0 больше любого отрицательного числа.' }, c0: { say: '3 — положительное, оно самое большое.' },
} };

export default { topic: 'math-2-1', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

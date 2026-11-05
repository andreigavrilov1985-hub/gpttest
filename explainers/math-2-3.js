// Остров 2 · Математика · Тема 3. Алгебра: буквы вместо чисел — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const box = (name, label = 'x', color = '#ff9a3c') => card(name, label, { w: 40, h: 40, size: 20, fill: color, stroke: '#c97a1f', color: '#fff' });
const one = (name) => card(name, '1', { w: 30, h: 30, size: 14, fill: '#2bb3c9', stroke: '#1784a6', color: '#fff' });

// серия 1: подобные слагаемые
const ep1 = episode({
  title: 'Коробки с иксами',
  terms: ['буква вместо числа', 'подобные слагаемые', 'упростить выражение'],
  svg: `${[0, 1, 2, 3, 4].map((i) => box(`x${i}`)).join('')}${text('e1', '3x + 2x = 5x', { size: 22, color: '#16774a' })}
    ${[0, 1, 2, 3, 4, 5].map((i) => box(`a${i}`, 'a', '#9b5cf6')).join('')}${[0, 1, 2].map((i) => one(`u${i}`)).join('')}${text('e2', '4a + 3 + 2a = 6a + 3', { size: 20, color: '#16774a' })}
    ${kittenActor('cat', 'excited', 32)}`,
  init: { ...Object.fromEntries([0, 1, 2, 3, 4].map((i) => [`x${i}`, hid(i < 3 ? 40 + i * 44 : 200 + (i - 3) * 44, 50)])), e1: hid(180, 100),
    ...Object.fromEntries([0, 1, 2, 3, 4, 5].map((i) => [`a${i}`, hid(i < 4 ? 24 + i * 42 : 290 + (i - 4) * 42, 150)])), ...Object.fromEntries([0, 1, 2].map((i) => [`u${i}`, hid(190 + i * 32, 150)])), e2: hid(180, 210), cat: at(318, 70) },
  caption0: 'Буква x — коробка, в которой спряталось число.',
  beats: beat(
    pop(300, ['x0', 'x1', 'x2'], 150), pop(1100, ['x3', 'x4'], 150), cap(1200, '3 коробки x и ещё 2 коробки x…'),
    ...[3, 4].map((i, k) => move(2400, `x${i}`, { x: 172 + k * 44 }, 600)), pop(3200, 'e1'), cap(3200, '…вместе 5 коробок: 3x + 2x = 5x.'),
    cap(5000, 'Одинаковые буквы собираем вместе, числа — отдельно.'), pop(5000, ['a0', 'a1', 'a2', 'a3', 'u0', 'u1', 'u2', 'a4', 'a5'], 120),
    move(6600, 'a4', { x: 192, y: 150 }, 600), move(6600, 'a5', { x: 234, y: 150 }, 600), move(6600, 'u0', { x: 270, y: 150 }, 600), move(6600, 'u1', { x: 302, y: 150 }, 600), move(6600, 'u2', { x: 334, y: 150 }, 600),
    pop(7400, 'e2'), cap(7400, '4a + 2a = 6a, а 3 остаётся: 6a + 3.'), mood(7400, 'cat', 'happy'),
  ),
});

// серия 2: подставляем число
const ep2 = episode({
  title: 'Открываем коробку',
  terms: ['значение выражения', 'подстановка', 'n-й член последовательности'],
  svg: `${card('ex', '2n + 5', { w: 140, size: 24 })}${box('n', 'n', '#9b5cf6')}${text('val', 'n = 4 → 2 × 4 + 5 = 13', { size: 18, color: '#16774a' })}
    ${card('seq', 'n-й член: 3n + 1', { w: 200, size: 18, fill: '#eef7fb' })}${text('s5', '5-й член: 3 × 5 + 1 = 16', { size: 18, color: '#1784a6' })}${kittenActor('cat', 'excited', 34)}`,
  init: { ex: hid(130, 50), n: hid(270, 50), val: hid(180, 100), seq: hid(180, 160), s5: hid(180, 204), cat: at(6, 180) },
  caption0: 'Значение выражения 2n + 5, если n = 4.',
  beats: beat(
    pop(300, ['ex', 'n'], 300), cap(1300, 'Открываем коробку n — там 4! Подставляем вместо буквы.'), setText(1800, 'nT', '4'), move(1800, 'n', { s: 1.25 }, 300), move(2100, 'n', { s: 1 }, 300),
    pop(2600, 'val'), cap(2600, '2 × 4 + 5 = 13.'), mood(2600, 'cat', 'happy'),
    cap(4600, 'Формула n-го члена говорит, каким будет любой член ряда.'), pop(4600, 'seq'),
    cap(6400, 'Пятый член: подставим n = 5. 3 × 5 + 1 = 16.'), pop(6400, 's5'),
  ),
});

// серия 3: уравнения на весах
const ep3 = episode({
  title: 'Весы равновесия',
  terms: ['уравнение', 'обратное действие', 'x − 6 = 9', '3x = 18', '2x + 3 = 11'],
  svg: `<polygon points="170,200 190,200 180,140" fill="#5b6b83"/><line x1="50" y1="140" x2="310" y2="140" stroke="#5b6b83" stroke-width="6" stroke-linecap="round"/>
    ${box('x1')}${box('x2')}${[0, 1, 2].map((i) => one(`l${i}`)).join('')}${card('r', '11', { w: 56, h: 40, size: 20, fill: '#4cc27a', stroke: '#2f9a59', color: '#fff' })}
    ${text('eq', '2x + 3 = 11', { size: 22 })}${text('s1', 'убираем 3 с обеих сторон: 2x = 8', { size: 15, color: '#1784a6' })}${text('s2', 'делим на 2: x = 4', { size: 18, color: '#16774a' })}
    ${text('more', 'x − 6 = 9 → x = 9 + 6 = 15  ·  3x = 18 → x = 18 ÷ 3 = 6', { size: 12, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 32)}`,
  init: { x1: hid(70, 112), x2: hid(114, 112), l0: hid(150, 118), l1: hid(150, 88), l2: hid(118, 82), r: hid(260, 112), eq: hid(180, 30), s1: hid(180, 58), s2: hid(180, 220), more: hid(180, 236), cat: at(6, 170) },
  caption0: 'Уравнение — весы. Что сделали слева — делаем и справа.',
  beats: beat(
    pop(300, ['x1', 'x2', 'l0', 'l1', 'l2', 'r', 'eq'], 120),
    cap(1800, 'Убираем 3 единички слева — и 3 справа.'), ...[0, 1, 2].map((i) => move(2000 + i * 150, `l${i}`, { y: -20, o: 0 }, 600)), setText(2600, 'rT', '8'), pop(2600, 's1'),
    cap(4200, 'Две коробки весят 8. Значит, одна — 4!'), move(4400, 'x2', { o: 0.3 }, 400), setText(4800, 'rT', '4'), pop(4800, 's2'), mood(4800, 'cat', 'happy'),
    cap(6600, 'Обратные действия: минус убираем плюсом, умножение — делением.'), pop(6600, 'more'),
  ),
});

// серия 4: скобки, периметр, «я задумал число»
const ep4 = episode({
  title: 'Скобки и загадки',
  terms: ['раскрыть скобки', 'формула периметра', 'задача «задумал число»'],
  svg: `${[0, 1, 2].map((i) => `<g data-a="grp${i}"><rect x="-44" y="-22" width="88" height="44" rx="12" fill="#fff" stroke="#cfe6ef" stroke-width="3"/><text x="-18" y="7" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="18" fill="#ff7a59">x</text><text x="14" y="7" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="18" fill="#1784a6">+ 4</text></g>`).join('')}
    ${text('e1', '3(x + 4) = 3x + 12', { size: 20, color: '#16774a' })}<g data-a="rect"><rect x="0" y="0" width="100" height="50" fill="#ffe3a8" stroke="#d2a861" stroke-width="3"/></g>
    ${text('p', 'P = a + b + a + b = 2a + 2b', { size: 14, color: '#b06200' })}${card('rid', '13 → +2 → 15 → ÷3 → 5', { w: 230, size: 16, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 30)}`,
  init: { grp0: hid(70, 40), grp1: hid(180, 40), grp2: hid(290, 40), e1: hid(180, 90), rect: hid(30, 120), p: hid(240, 146), rid: hid(180, 214), cat: at(320, 180) },
  caption0: '3(x + 4) — это три одинаковые группы «x + 4».',
  beats: beat(
    pop(300, ['grp0', 'grp1', 'grp2'], 250),
    cap(1600, 'Иксов всего 3, четвёрок тоже 3: 3x + 12.'), pop(2400, 'e1'),
    cap(4000, 'Периметр — обойти прямоугольник: a + b + a + b = 2a + 2b.'), pop(4000, 'rect'), hop(4200, 'cat', { x: 130, y: 104 }, 600), hop(4800, 'cat', { x: 130, y: 150 }, 600), hop(5400, 'cat', { x: 20, y: 150 }, 600), pop(5000, 'p'),
    cap(6800, 'Задумал число, ×3, −2, вышло 13. Идём назад: +2, потом ÷3. Это 5!'), pop(6800, 'rid'), mood(6800, 'cat', 'happy'),
  ),
});

ep2.interact = { type: 'tapShow', cat: 'cat', items: { n: { say: 'В коробке n лежит 4. Подставь: 2 × 4 + 5 = 13.', mood: 'celebrate' } } };

export default { topic: 'math-2-3', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

// Остров 5 · Логика · Тема 4. Алгоритмы и двоичная система — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat } from '../js/cartoon-kit.js';

// серия 1: лампочки-разряды
const W = [8, 4, 2, 1];
const bulb = (n) => `<g data-a="${n}"><circle r="18" fill="#e5e7eb" stroke="#9aa5b4" stroke-width="2"/></g><g data-a="${n}on"><circle r="18" fill="#ffd166" stroke="#d4a017" stroke-width="2"/></g>`;
const ep1 = episode({
  title: 'Двоичные лампочки',
  terms: ['двоичная система — только 0 и 1', 'разряды справа налево: 1, 2, 4, 8', '5 = 101, 13 = 1101, 10 = 1010', '3 двоичные цифры дают 8 чисел'],
  svg: `${W.map((w, i) => `${bulb(`L${i}`)}${text(`w${i}`, String(w), { size: 14, color: '#5b6b83' })}${text(`d${i}`, '0', { size: 20, color: '#23324a' })}`).join('')}
    ${text('val', '= 0', { size: 22, color: '#16774a' })}${text('n8', '000 … 111 — 8 вариантов', { size: 12, color: '#6d3ad1' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { ...Object.fromEntries(W.flatMap((_, i) => [[`L${i}`, at(60 + i * 70, 80)], [`L${i}on`, at(60 + i * 70, 80, { o: 0 })], [`w${i}`, at(60 + i * 70, 40)], [`d${i}`, at(60 + i * 70, 128)]])), val: at(180, 175), n8: hid(180, 214), cat: at(320, 4) },
  caption0: 'Каждая лампочка — разряд. Горит — 1, не горит — 0.',
  beats: beat(
    cap(800, 'Число 5 = 4 + 1: зажигаем 4 и 1.'), [[800, 'to', 'L1on', { o: 1 }, 300], [1100, 'to', 'L3on', { o: 1 }, 300]], setText(1400, 'd1', '1'), setText(1400, 'd3', '1'), setText(1500, 'val', '0101 = 5'),
    cap(3200, '13 = 8 + 4 + 1 → 1101.'), [[3200, 'to', 'L0on', { o: 1 }, 300]], setText(3500, 'd0', '1'), setText(3600, 'val', '1101 = 13'),
    cap(5200, '10 = 8 + 2 → 1010.'), [[5200, 'to', 'L1on', { o: 0 }, 300], [5200, 'to', 'L3on', { o: 0 }, 300], [5400, 'to', 'L2on', { o: 1 }, 300]], setText(5500, 'd1', '0'), setText(5500, 'd3', '0'), setText(5500, 'd2', '1'), setText(5600, 'val', '1010 = 10'),
    pop(7000, 'n8'), cap(7000, 'Три лампочки: 2 × 2 × 2 = 8 разных чисел.'), mood(7000, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { L0: { say: 'Старший разряд — 8.' }, L1: { say: 'Разряд 4.' }, L2: { say: 'Разряд 2.' }, L3: { say: 'Разряд 1.' } } },
});

// серия 2: логика и алгоритм-робот
const ep2 = episode({
  title: 'Робот-алгоритм',
  terms: ['AND (И) — 1, только если оба 1', 'OR (ИЛИ) — 1, если хотя бы один 1', 'NOT (НЕ) — меняет 1 на 0', 'алгоритм — шаги по порядку, цикл повторяет шаги', 'условие «если… иначе…»'],
  svg: `${card('and', '1 AND 0 = 0', { w: 110, size: 13 })}${card('or', '1 OR 0 = 1', { w: 110, size: 13, fill: '#e2f8ea', stroke: '#9fdcb9' })}${card('not', 'NOT 1 = 0', { w: 110, size: 13, fill: '#ffe9e4', stroke: '#f3c4bd' })}
    ${emo('bot', '🤖', 40)}${text('x', 'x = 3', { size: 20, color: '#ff7a59' })}${text('loop', 'повторить 4 раза: x = x + 2', { size: 12, color: '#1784a6' })}
    ${text('if', 'если x чётное → x ÷ 2, иначе → 3x + 1:  6 → 3 → 10', { size: 11, color: '#6d3ad1' })}${kittenActor('cat', 'excited', 22)}`,
  init: { and: hid(70, 30), or: hid(185, 30), not: hid(300, 30), bot: at(60, 120), x: at(160, 120), loop: hid(230, 150), if: hid(180, 214), cat: at(320, 200) },
  caption0: 'Логические операции: AND, OR, NOT.',
  beats: beat(
    pop(300, 'and'), cap(300, 'AND — «и»: 1, только если оба 1.'), pop(1600, 'or'), cap(1600, 'OR — «или»: хватит одной единицы.'), pop(2900, 'not'), cap(2900, 'NOT — «не»: переворачивает.'),
    pop(4200, 'loop'), cap(4200, 'Алгоритм — шаги по порядку. Цикл повторяет шаг.'),
    [5, 7, 9, 11].map((v, k) => [[4800 + k * 700, 'to', 'bot', { y: 110 }, 150], [4950 + k * 700, 'to', 'bot', { y: 120 }, 150], [4950 + k * 700, 'text', 'x', `x = ${v}`]]),
    pop(7800, 'if'), cap(7800, 'Условие: робот выбирает шаг в зависимости от x.'), mood(7800, 'cat', 'happy'),
  ),
});

export default { topic: 'logic-5-4', kind: 'cartoon', episodes: [ep1, ep2] };

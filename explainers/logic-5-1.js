// Остров 5 · Логика · Тема 1. Рекуррентные ряды и степени — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat } from '../js/cartoon-kit.js';

// серия 1: правило «из предыдущего»
const S = [1, 3, 7, 15, 31];
const F = [2, 3, 5, 8, 13, 21];
const ep1 = episode({
  title: 'Ряд по правилу',
  terms: ['рекуррентный ряд — каждое число получаем из предыдущих', 'разности соседних чисел помогают найти правило'],
  svg: `${S.map((v, i) => card(`s${i}`, String(v), { w: 44, h: 36, size: 16 })).join('')}${S.slice(1).map((_, i) => text(`r${i}`, '×2 + 1', { size: 10, color: '#ff7a59' })).join('')}
    ${F.map((v, i) => card(`f${i}`, String(v), { w: 40, h: 36, size: 16, fill: '#e2f8ea', stroke: '#9fdcb9' })).join('')}${text('ft', 'каждое = сумма двух предыдущих', { size: 12, color: '#16774a' })}
    ${text('df', '1, 3, 7, 13, 21: разности 2, 4, 6, 8 → дальше +10 = 31', { size: 11, color: '#6d3ad1' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { ...Object.fromEntries(S.map((_, i) => [`s${i}`, hid(40 + i * 62, 40)])), ...Object.fromEntries(S.slice(1).map((_, i) => [`r${i}`, hid(71 + i * 62, 70)])), ...Object.fromEntries(F.map((_, i) => [`f${i}`, hid(40 + i * 52, 120)])), ft: hid(170, 150), df: hid(180, 200), cat: at(320, 4) },
  caption0: 'Начинаем с 1. Каждое следующее — удвоенное предыдущее плюс 1.',
  beats: beat(
    pop(300, 's0'), S.slice(1).map((_, i) => [[900 + i * 700, 'to', `r${i}`, { o: 1, s: 1 }, 300], [1100 + i * 700, 'to', `s${i + 1}`, { o: 1, s: 1 }, 400, 'back']]),
    cap(3800, 'Пятое число — 31.'), mark(3800, 's4'),
    pop(4800, ['f0', 'f1'], 200), F.slice(2).map((_, i) => [5400 + i * 500, 'to', `f${i + 2}`, { o: 1, s: 1 }, 400, 'back']), pop(5400, 'ft'), cap(4800, 'Другое правило: следующее = сумма двух предыдущих.'),
    pop(7600, 'df'), cap(7600, 'Не видно правила? Посчитай разности соседей.'), mood(7600, 'cat', 'happy'),
  ),
});

// серия 2: последняя цифра степени и половинки
const cyc = [7, 9, 3, 1];
const ep2 = episode({
  title: 'Хвосты степеней',
  terms: ['последние цифры степеней повторяются по кругу', '2¹⁰ = 1024', '1 + 1/2 + 1/4 + … = 2', 'нули в конце 10! — пары 2 × 5'],
  svg: `${cyc.map((d, i) => card(`c${i}`, String(d), { w: 40, h: 40, size: 18, fill: '#fff3d6', stroke: '#f2c46d' })).join('')}${text('ct', '7¹ 7² 7³ 7⁴ → 7, 9, 3, 1, и снова', { size: 12, color: '#b06200' })}
    <rect x="30" y="140" width="200" height="22" fill="#fff" stroke="#cfe6ef"/>${[100, 50, 25, 12.5, 6.25].map((w, i) => `<g data-a="h${i}"><rect x="0" y="0" width="${w}" height="22" fill="${['#2bb3c9', '#7fd3e2', '#2bb3c9', '#7fd3e2', '#2bb3c9'][i]}"/></g>`).join('')}
    ${text('ht', '1 + ½ + ¼ + … заполняет 2', { size: 13, color: '#1784a6' })}${text('p', '2¹⁰ = 1024 · 10! = 3 628 800 — два нуля', { size: 12, color: '#6d3ad1' })}${kittenActor('cat', 'excited', 22)}`,
  init: { ...Object.fromEntries(cyc.map((_, i) => [`c${i}`, hid(110 + i * 50, 40)])), ct: hid(185, 76), h0: at(30, 140, { o: 0 }), h1: at(130, 140, { o: 0 }), h2: at(180, 140, { o: 0 }), h3: at(205, 140, { o: 0 }), h4: at(217.5, 140, { o: 0 }), ht: hid(130, 180), p: hid(180, 220), cat: at(320, 120) },
  caption0: 'Какая последняя цифра у степеней семёрки?',
  beats: beat(
    pop(300, cyc.map((_, i) => `c${i}`), 400), pop(2000, 'ct'), cap(2000, 'Цифры идут по кругу из 4: значит у 7⁴ — 1, и у 3¹⁰⁰ тоже 1.'),
    [0, 1, 2, 3, 4].map((i) => [4000 + i * 500, 'to', `h${i}`, { o: 1 }, 400]), pop(6400, 'ht'), cap(4000, 'Полоска 2: берём 1, потом половину остатка, потом половину… Бесконечно, но не больше 2.'),
    pop(8000, 'p'), mood(8000, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { c0: { say: '7¹ = 7' }, c1: { say: '7² = 49 → 9' }, c2: { say: '7³ = 343 → 3' }, c3: { say: '7⁴ = 2401 → 1' } } },
});

export default { topic: 'logic-5-1', kind: 'cartoon', episodes: [ep1, ep2] };

// Остров 4 · Логика · Тема 3. Множества и круги Эйлера — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: пересечение, объединение, «ни одного»
const ep1 = episode({
  title: 'Сколько ни в одном',
  terms: ['|A ∪ B| = |A| + |B| − |A ∩ B|', 'ни в одном = всего − в объединении', 'пересечение и дополнение множеств'],
  svg: `<rect x="20" y="20" width="320" height="170" rx="16" fill="none" stroke="#9aa5b4" stroke-width="2" stroke-dasharray="6 4"/>${text('all', 'весь класс: 28', { size: 13, color: '#5b6b83' })}
    <g data-a="A"><circle r="60" fill="#ff9a3c" opacity=".35" stroke="#ff7a59" stroke-width="3"/></g><g data-a="B"><circle r="60" fill="#2bb3c9" opacity=".35" stroke="#1784a6" stroke-width="3"/></g>
    ${text('ta', 'шахматы 12', { size: 13, color: '#c0392b' })}${text('tb', 'танцы 10', { size: 13, color: '#1784a6' })}${text('tab', 'оба 4', { size: 13, color: '#6d3ad1' })}
    ${text('u', '12 + 10 − 4 = 18 хоть куда-то ходят', { size: 13, color: '#16774a' })}${text('no', 'ни в один кружок: 28 − 18 = 10', { size: 14, color: '#c0392b' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { all: hid(90, 36), A: hid(140, 110), B: hid(220, 110), ta: hid(110, 110), tb: hid(254, 110), tab: hid(180, 110), u: hid(180, 206), no: hid(180, 230), cat: at(320, 200) },
  caption0: 'В классе 28 детей. 12 ходят на шахматы, 10 на танцы, 4 — туда и туда.',
  beats: beat(
    pop(300, 'all'), pop(1000, ['A', 'ta', 'B', 'tb'], 200), pop(2000, 'tab'),
    cap(2600, 'Ходят хоть куда-то: 12 + 10 − 4 (двойной счёт убираем).'), pop(3000, 'u'),
    cap(4800, 'Ни в один кружок: из всех вычитаем объединение.'), pop(4800, 'no'), mood(4800, 'cat', 'happy'),
  ),
});

// серия 2: подмножества, «все/ни один», операции
const ep2 = episode({
  title: 'Подмножества',
  terms: ['подмножество: все квадраты — прямоугольники', 'пересечение {…} ∩ {…}', 'дополнение', 'число подмножеств = 2ⁿ', '«ни одна кошка не лает»'],
  svg: `<g data-a="rect"><ellipse rx="110" ry="60" fill="#e2f8ea" stroke="#4cc27a" stroke-width="3"/></g>${text('rt', 'прямоугольники', { size: 13, color: '#16774a' })}<g data-a="sq"><ellipse rx="44" ry="26" fill="#fff3d6" stroke="#f2c46d" stroke-width="3"/></g>${text('st', 'квадраты', { size: 12, color: '#b06200' })}
    ${card('op', '{1, 2, 3} ∩ {2, 3, 5} = {2, 3}', { w: 250, size: 14, fill: '#eef7fb' })}${card('pw', 'подмножеств у {a, b}: {}, {a}, {b}, {a, b} — 2² = 4', { w: 340, size: 12, fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'excited', 22)}`,
  init: { rect: hid(180, 80), rt: hid(180, 40), sq: hid(200, 96), st: hid(200, 100), op: hid(180, 170), pw: hid(180, 212), cat: at(320, 4) },
  caption0: 'Все квадраты — прямоугольники, но не наоборот.',
  beats: beat(
    pop(300, ['rect', 'rt'], 200), pop(1200, ['sq', 'st'], 200), cap(1200, 'Круг «квадраты» целиком внутри круга «прямоугольники» — это подмножество.'),
    pop(3400, 'op'), cap(3400, 'Пересечение — то, что есть в обоих множествах.'),
    pop(5200, 'pw'), cap(5200, 'Подмножеств у множества из n элементов — 2ⁿ (пустое тоже считаем).'), mood(5200, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { tab: { say: '4 ребёнка в обоих кругах — их нельзя считать дважды.' }, all: { say: 'Все 28 — это прямоугольник вокруг кругов.' } } };

export default { topic: 'logic-4-3', kind: 'cartoon', episodes: [ep1, ep2] };

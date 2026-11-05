// Остров 1 · Логика · Тема 4. Закономерности в рядах — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const cell = (name, inner) => `<g data-a="${name}"><rect x="-22" y="-22" width="44" height="44" rx="10" fill="#fff" stroke="#cfe6ef" stroke-width="3"/>${inner}</g>`;
const TRI = '<path d="M0 -13 L13 11 H-13 z" fill="#ff7a59"/>';
const CIR = '<circle r="12" fill="#2bb3c9"/>';

// серия 1: фигуры чередуются (интерактив: что дальше)
const row = ['t', 'c', 't', 'c', 't'];
const ep1 = episode({
  title: 'Чередование',
  terms: ['закономерность', 'чередование', 'повторяющаяся группа'],
  svg: `${row.map((k, i) => cell(`f${i}`, k === 't' ? TRI : CIR)).join('')}${cell('q', '<text text-anchor="middle" y="8" font-family="Nunito" font-weight="800" font-size="22" fill="#1784a6">?</text>')}${cell('ans', CIR)}
    ${cell('oT', TRI)}${cell('oC', CIR)}${text('rule', 'треугольник, круг — и снова', { size: 15, color: '#ff7a59' })}
    ${['🔴', '🔴', '🔵', '🔴', '🔴', '🔵', '🔴', '🔴'].map((c, i) => emo(`b${i}`, c, 22)).join('')}${text('grp', 'группа «красный, красный, синий» повторяется → 🔵', { size: 12 })}
    ${kittenActor('cat', 'thinking', 34)}`,
  init: { ...Object.fromEntries(row.map((_, i) => [`f${i}`, hid(40 + i * 52, 60)])), q: hid(300, 60), ans: hid(300, 60), oT: hid(130, 120), oC: hid(230, 120), rule: hid(180, 22),
    ...Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`b${i}`, hid(40 + i * 34, 180)])), grp: hid(180, 214), cat: at(318, 110) },
  caption0: 'Что дальше? Нажми на ответ!',
  beats: beat(
    pop(200, row.map((_, i) => `f${i}`), 200), pop(1300, 'q'), pop(1700, ['oT', 'oC'], 200),
    cap(2400, 'Смотри: треугольник, круг, треугольник, круг… Они чередуются.'), pop(2400, 'rule'),
    cap(5000, 'После треугольника — круг!'), [[5000, 'to', 'q', { o: 0 }, 300]], pop(5200, 'ans'), mood(5200, 'cat', 'happy'),
    cap(6800, 'Иногда повторяется целая группа: красный, красный, синий.'), pop(6800, Array.from({ length: 8 }, (_, i) => `b${i}`), 120), pop(8000, 'grp'),
  ),
  interact: {
    type: 'tapShow', cat: 'cat',
    items: {
      oC: { show: ['ans'], say: 'Верно! После треугольника идёт круг.', mood: 'celebrate' },
      oT: { say: 'Посмотри на последнюю фигуру: это треугольник. А после него?', mood: 'thinking' },
    },
  },
});

// серия 2: алфавит вперёд и назад, месяцы через один
const ep2 = episode({
  title: 'Буквы и месяцы',
  terms: ['порядок алфавита', 'обратный порядок', 'пропуск через один'],
  svg: `${['А', 'Б', 'В', 'Г', 'Д'].map((l, i) => card(`r${i}`, l, { w: 42, h: 40, size: 20 })).join('')}${['Z', 'Y', 'X', 'W', 'V'].map((l, i) => card(`e${i}`, l, { w: 42, h: 40, size: 20, lang: 'en', fill: '#eef7fb' })).join('')}
    ${['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен'].map((m, i) => card(`m${i}`, m, { w: 36, h: 32, size: 11, fill: i % 2 ? '#f3f5f8' : '#fff3d6', stroke: i % 2 ? '#e3edf3' : '#f2c46d' })).join('')}
    ${text('mt', 'январь, март, май, июль → сентябрь', { size: 13, color: '#b06200' })}${kittenActor('cat', 'excited', 32)}`,
  init: { ...Object.fromEntries([0, 1, 2, 3, 4].map((i) => [`r${i}`, hid(40 + i * 50, 40)])), ...Object.fromEntries([0, 1, 2, 3, 4].map((i) => [`e${i}`, hid(40 + i * 50, 100)])),
    ...Object.fromEntries(Array.from({ length: 9 }, (_, i) => [`m${i}`, hid(26 + i * 38, 170)])), mt: hid(180, 212), cat: at(310, 50) },
  caption0: 'Буквы идут по алфавиту: А, Б, В, Г — дальше Д.',
  beats: beat(
    pop(200, [0, 1, 2, 3].map((i) => `r${i}`), 200), pop(1400, 'r4'),
    cap(2400, 'А можно и задом наперёд: Z, Y, X, W — дальше V.'), pop(2400, [0, 1, 2, 3].map((i) => `e${i}`), 200), pop(3600, 'e4'),
    cap(4800, 'Месяцы через один: январь, март, май, июль… пропускаем август — сентябрь!'), pop(4800, Array.from({ length: 9 }, (_, i) => `m${i}`), 150),
    ...[0, 2, 4, 6, 8].map((i, k) => move(6400 + k * 300, `m${i}`, { y: 150 }, 300)), pop(8000, 'mt'), mood(8000, 'cat', 'happy'),
  ),
});

// серия 3: число сторон растёт, буква с числом
const poly = (name, n, color) => {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    return `${(22 * Math.cos(a)).toFixed(1)},${(22 * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
  return `<g data-a="${name}"><polygon points="${pts}" fill="${color}" stroke="#23324a" stroke-width="2"/></g>`;
};
const ep3 = episode({
  title: 'Растём на один',
  terms: ['число сторон', 'прибавка на 1', 'пары буква + число'],
  svg: `${poly('p3', 3, '#ff7a59')}${poly('p4', 4, '#ffcf3f')}${poly('p5', 5, '#4cc27a')}${poly('p6', 6, '#2bb3c9')}
    ${['3', '4', '5', '6'].map((n, i) => text(`s${i}`, `${n} стор.`, { size: 13 })).join('')}
    ${['А1', 'Б2', 'В3', 'Г4'].map((t, i) => card(`k${i}`, t, { w: 56, h: 40, size: 18, fill: i === 3 ? '#e2f8ea' : '#fff' })).join('')}${text('kt', 'буква по алфавиту, число +1', { size: 14, color: '#16774a' })}
    ${kittenActor('cat', 'excited', 32)}`,
  init: { p3: hid(60, 70), p4: hid(140, 70), p5: hid(220, 70), p6: hid(300, 70), ...Object.fromEntries([0, 1, 2, 3].map((i) => [`s${i}`, hid(60 + i * 80, 112)])),
    ...Object.fromEntries([0, 1, 2, 3].map((i) => [`k${i}`, hid(60 + i * 80, 170)])), kt: hid(180, 214), cat: at(4, 196) },
  caption0: 'У фигур 3, 4, 5 сторон…',
  beats: beat(
    pop(200, ['p3', 's0', 'p4', 's1', 'p5', 's2'], 200),
    cap(1800, 'Каждый раз на одну сторону больше. Значит, дальше 6!'), pop(2200, ['p6', 's3'], 200), mood(2200, 'cat', 'happy'),
    cap(4200, 'А1, Б2, В3: буква идёт по алфавиту, число растёт на 1.'), pop(4200, ['k0', 'k1', 'k2'], 300),
    cap(6000, 'Дальше — Г4!'), pop(6000, ['k3', 'kt'], 300),
  ),
});

export default {
  topic: 'logic-1-4',
  kind: 'cartoon',
  episodes: [ep1, ep2, ep3],
  memo: [
    'Закономерность — правило, которое повторяется. Найди повторяющуюся часть.',
    'Чередование: треугольник, круг, треугольник, круг… Иногда повторяется группа: красный, красный, синий.',
    'Буквы и дни недели идут по порядку; бывает и обратный порядок: Z, Y, X, W, V.',
    'Пропуск через один: январь, март, май, июль, сентябрь.',
    'Может расти число: у фигур 3, 4, 5 сторон — дальше 6; ряд 1, 2, 4, 7, 11: прибавляем 1, 2, 3, 4, дальше 5.',
    'Пары буква + число: А1, Б2, В3 — дальше Г4.',
  ],
};

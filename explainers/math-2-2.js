// Остров 2 · Математика · Тема 2. Дроби, десятичные дроби и проценты — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat, wedge } from '../js/cartoon-kit.js';

// серия 1: дробь → десятичная → проценты
let bar = '';
for (let i = 0; i < 10; i += 1) bar += `<rect data-a="b${i}" x="${i * 28}" y="0" width="26" height="34" rx="4" class="pct-cell"/>`;
const ep1 = episode({
  title: 'Три записи одного числа',
  terms: ['дробь в десятичную', 'десятичная в проценты', '3/5 = 0,6', '0,07 = 7%'],
  svg: `<g data-a="bar">${bar}</g>${text('f', '3/5 = 6/10 = 0,6', { size: 22, color: '#ff7a59' })}${text('p', '0,6 = 60%', { size: 20, color: '#16774a' })}
    ${card('p7', '0,07 = 7/100 = 7%', { w: 220, size: 18, fill: '#eef7fb' })}${text('rule', 'процент — сотая часть: ×100', { size: 14, color: '#5b6b83' })}${kittenActor('cat', 'excited', 34)}`,
  init: { bar: at(40, 60, { o: 0 }), f: hid(180, 130), p: hid(180, 160), p7: hid(180, 200), rule: hid(180, 230), cat: at(316, 4) },
  caption0: 'Полоска из 10 равных частей. Закрасим 3/5.',
  beats: beat(
    [[200, 'to', 'bar', { o: 1 }, 400]], ...[0, 1, 2, 3, 4, 5].map((i) => mark(900 + i * 200, `b${i}`)),
    cap(1000, '3/5 — это 6 частей из 10: каждая пятая — две десятых.'), pop(2400, 'f'),
    cap(4000, 'Десятые легко перевести в проценты: 0,6 = 60%.'), pop(4000, 'p'),
    cap(6000, 'Чтобы десятичную дробь записать в процентах, умножь на 100: 0,07 = 7%.'), pop(6000, ['p7', 'rule'], 400), mood(6000, 'cat', 'happy'),
  ),
});

// серия 2: проценты от суммы, скидка, увеличение
const ep2 = episode({
  title: 'Проценты в магазине',
  terms: ['процент от числа', 'скидка', 'увеличение на процент'],
  svg: `${emo('tag', '🏷️', 46)}${text('price', '60', { size: 28 })}${text('s1', '10% от 60 = 6', { size: 16 })}${text('s2', '5% = половина: 3', { size: 16 })}${text('s3', '15% = 6 + 3 = 9', { size: 18, color: '#16774a' })}
    ${emo('coat', '🧥', 44)}${card('old', '80', { w: 64, size: 22 })}${card('disc', '−25%', { w: 70, size: 18, fill: '#ffe9e4', stroke: '#f3c4bd', color: '#c0392b' })}${text('new', '¼ от 80 = 20 → 80 − 20 = 60', { size: 15, color: '#16774a' })}
    ${text('up', '200 + 10% = 200 + 20 = 220', { size: 15, color: '#1784a6' })}${kittenActor('cat', 'excited', 32)}`,
  init: { tag: hid(40, 40), price: hid(90, 46), s1: hid(220, 26), s2: hid(220, 50), s3: hid(220, 78), coat: hid(40, 140), old: hid(110, 140), disc: hid(190, 140), new: hid(180, 182), up: hid(180, 222), cat: at(318, 110) },
  caption0: 'Сколько будет 15% от 60?',
  beats: beat(
    pop(200, ['tag', 'price']), cap(900, 'Сначала 10%: делим на 10. 10% от 60 = 6.'), pop(1100, 's1'),
    cap(2700, '5% — половина от 10%: это 3. Вместе 15% = 9.'), pop(2700, 's2'), pop(3700, 's3'),
    cap(5200, 'Куртка за 80, скидка 25%. 25% — это четверть.'), pop(5200, ['coat', 'old', 'disc'], 250),
    move(6600, 'disc', { x: 112, y: 140 }, 600), setText(7200, 'oldT', '60'), fade(7200, 'disc'), pop(7200, 'new'), cap(7200, 'Четверть от 80 = 20. Новая цена 60.'),
    cap(9200, 'Увеличить на 10% — прибавить десятую часть: 200 → 220.'), pop(9200, 'up'), mood(9200, 'cat', 'happy'),
  ),
});

// серия 3: дробь от числа
const ep3 = episode({
  title: 'Дробь от числа',
  terms: ['дробь от числа', '5/8 от 48', 'часть класса дробью'],
  svg: `${Array.from({ length: 8 }, (_, i) => card(`g${i}`, '6', { w: 36, h: 36, size: 16, fill: i < 5 ? '#fff3d6' : '#fff', stroke: i < 5 ? '#f2c46d' : '#cfe6ef' })).join('')}
    ${text('t48', '48 = 8 кучек по 6', { size: 16 })}${text('r', '5 кучек: 5 × 6 = 30', { size: 18, color: '#16774a' })}
    ${card('cls', '18 из 24 = 18/24 = 3/4', { w: 230, size: 17, fill: '#eef7fb' })}${text('cl2', 'делим оба числа на 6', { size: 13, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 32)}`,
  init: { ...Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`g${i}`, hid(46 + i * 38, 70)])), t48: hid(180, 30), r: hid(180, 116), cls: hid(180, 170), cl2: hid(180, 202), cat: at(318, 200) },
  caption0: 'Найдём 5/8 от 48.',
  beats: beat(
    pop(400, 't48'), pop(900, Array.from({ length: 8 }, (_, i) => `g${i}`), 120),
    cap(1200, 'Знаменатель 8: делим 48 на 8 равных кучек, в каждой 6.'),
    cap(3200, 'Числитель 5: берём 5 кучек. 5 × 6 = 30.'), ...[0, 1, 2, 3, 4].map((i) => move(3400 + i * 150, `g${i}`, { y: 60 }, 300)), pop(4400, 'r'), mood(4400, 'cat', 'happy'),
    cap(6200, 'Какая часть класса пришла с портфелем? 18 из 24 = 18/24 = 3/4.'), pop(6200, ['cls', 'cl2'], 400),
  ),
});

// серия 4: смешанные числа и сравнение десятичных
const pie = (name, n, k, color) => {
  let s = `<g data-a="${name}"><circle r="22" fill="#eef3f7" stroke="#fff" stroke-width="2"/>`;
  for (let i = 0; i < k; i += 1) s += `<path d="${wedge(n, i, 22)}" fill="${color}" stroke="#fff" stroke-width="2"/>`;
  return `${s}</g>`;
};
const ep4 = episode({
  title: 'Смешанные числа',
  terms: ['смешанное число', 'сложение смешанных чисел', 'сравнение десятичных дробей'],
  svg: `${pie('a1', 1, 1, '#ff9a3c')}${pie('a2', 1, 1, '#ff9a3c')}${pie('a3', 2, 1, '#ff9a3c')}${text('pl', '+', { size: 26 })}
    ${pie('b1', 1, 1, '#4cc27a')}${pie('b2', 4, 3, '#4cc27a')}${text('e', '2 1/2 + 1 3/4 = 3 + 5/4 = 4 1/4', { size: 16, color: '#16774a' })}
    ${['0,05', '0,5', '0,45'].map((v, i) => card(`d${i}`, v, { w: 64, h: 36, size: 17 })).join('')}${text('cmp', 'десятые: 5 > 4 > 0 → больше всех 0,5', { size: 13, color: '#1784a6' })}${kittenActor('cat', 'excited', 30)}`,
  init: { a1: hid(40, 60), a2: hid(90, 60), a3: hid(140, 60), pl: hid(178, 66), b1: hid(220, 60), b2: hid(270, 60), e: hid(180, 110), d0: hid(90, 170), d1: hid(180, 170), d2: hid(270, 170), cmp: hid(180, 212), cat: at(320, 190) },
  caption0: '2 1/2 — это две целых и ещё половина.',
  beats: beat(
    pop(200, ['a1', 'a2', 'a3'], 200), pop(1000, 'pl'), pop(1300, ['b1', 'b2'], 200),
    cap(1600, 'Складываем: целые с целыми (2 + 1 = 3), доли с долями (1/2 + 3/4 = 5/4).'),
    cap(4400, '5/4 — это ещё одна целая и 1/4. Итого 4 1/4!'), pop(4400, 'e'), mood(4400, 'cat', 'happy'),
    cap(6600, 'Какое число больше: 0,05, 0,5 или 0,45? Сравниваем цифры после запятой по очереди.'), pop(6600, ['d0', 'd1', 'd2'], 200),
    move(8400, 'd1', { y: 150, s: 1.2 }, 400), pop(8400, 'cmp'),
  ),
});

ep3.interact = { type: 'tapShow', cat: 'cat', items: Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`g${i}`, { say: i < 5 ? `Кучка ${i + 1} из 5 взятых: по 6 в каждой.` : 'Эту кучку не берём: нужно только 5 из 8.' }])) };

export default { topic: 'math-2-2', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

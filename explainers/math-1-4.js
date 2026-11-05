// Остров 1 · Математика · Тема 4. Соотношения, алгебра и статистика — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat, wedge } from '../js/cartoon-kit.js';

// серия 1: отношение 2 к 3
const kids = [];
for (let g = 0; g < 3; g += 1) {
  kids.push(...[0, 1].map((i) => ({ n: `b${g}${i}`, ch: '👦', x: 50 + g * 110 + i * 26, y: 90 })));
  kids.push(...[0, 1, 2].map((i) => ({ n: `g${g}${i}`, ch: '👧', x: 37 + g * 110 + i * 26, y: 140 })));
}
const ep1 = episode({
  title: 'Отношение',
  terms: ['отношение', 'части', 'увеличить в несколько раз'],
  svg: `${[0, 1, 2].map((g) => `<g data-a="box${g}"><rect x="${22 + g * 110}" y="62" width="96" height="104" rx="14" fill="#eef7fb" stroke="#cfe6ef" stroke-width="3"/></g>`).join('')}
    ${kids.map((k) => emo(k.n, k.ch, 26)).join('')}${text('r', '2 : 3', { size: 26, color: '#ff7a59' })}
    ${text('tot', 'мальчиков 6 → девочек 9', { size: 18, color: '#16774a' })}${kittenActor('cat', 'excited', 40)}`,
  init: {
    ...Object.fromEntries([0, 1, 2].map((g) => [`box${g}`, { o: 0 }])),
    ...Object.fromEntries(kids.map((k) => [k.n, hid(k.x, k.y)])), r: hid(70, 30), tot: hid(180, 200), cat: at(312, 6),
  },
  caption0: 'Отношение 2 к 3: на каждых 2 мальчиков приходится 3 девочки.',
  beats: beat(
    [[300, 'to', 'box0', { o: 1 }, 300]], pop(400, kids.filter((k) => k.n.endsWith('0', 2) || k.n[1] === '0').map((k) => k.n), 150), pop(400, 'r'),
    cap(2600, 'Мальчиков стало 6 — это 3 раза по 2.'),
    [[2600, 'to', 'box1', { o: 1 }, 300], [3400, 'to', 'box2', { o: 1 }, 300]],
    pop(2800, kids.filter((k) => k.n.startsWith('b') && k.n[1] !== '0').map((k) => k.n), 200),
    cap(5000, 'Значит, и девочек в 3 раза больше: 3 × 3 = 9.'),
    pop(5000, kids.filter((k) => k.n.startsWith('g') && k.n[1] !== '0').map((k) => k.n), 180),
    pop(6400, 'tot'), mood(6400, 'cat', 'happy'),
    cap(8000, 'Одну часть увеличили — вторую увеличиваем во столько же раз.'),
  ),
});

// серия 2: уравнение на весах
const ep2 = episode({
  title: 'Уравнение',
  terms: ['уравнение', 'неизвестное x', 'буква в задаче'],
  svg: `<polygon points="170,200 190,200 180,140" fill="#5b6b83"/><line x1="60" y1="140" x2="300" y2="140" stroke="#5b6b83" stroke-width="6" stroke-linecap="round"/>
    <path d="M40 132 h100 l-10 10 h-80 z" fill="#ffe3a8" stroke="#d2a861" stroke-width="2"/><path d="M220 132 h100 l-10 10 h-80 z" fill="#ffe3a8" stroke="#d2a861" stroke-width="2"/>
    ${card('x', 'x', { w: 40, h: 40, size: 22, fill: '#ff9a3c', stroke: '#c97a1f', color: '#fff' })}${card('seven', '7', { w: 40, h: 40, size: 22, fill: '#2bb3c9', stroke: '#1784a6', color: '#fff' })}
    ${card('fifteen', '15', { w: 56, h: 40, size: 22, fill: '#4cc27a', stroke: '#2f9a59', color: '#fff' })}${text('eq', 'x + 7 = 15', { size: 24 })}${text('ans', 'x = 15 − 7 = 8', { size: 22, color: '#16774a' })}
    ${kittenActor('cat', 'thinking', 44)}`,
  init: { x: hid(70, 110), seven: hid(115, 110), fifteen: hid(270, 110), eq: at(180, 34, { o: 0 }), ans: hid(180, 222), cat: at(10, 160) },
  caption0: 'Буква x — коробочка, в которой спряталось число.',
  beats: beat(
    pop(400, ['x', 'seven', 'fifteen'], 300), [[1200, 'to', 'eq', { o: 1 }, 400]],
    cap(2000, 'Уравнение x + 7 = 15: весы в равновесии.'),
    cap(4000, 'Уберём 7 с левой чаши — и 7 с правой, чтобы весы не упали.'),
    move(4200, 'seven', { y: 30, o: 0 }, 800), setText(5000, 'fifteenT', '8'),
    cap(6000, 'Слева осталась x, справа — 8. Значит, x = 8!'), pop(6000, 'ans'), mood(6000, 'cat', 'happy'),
  ),
});

// серия 3: среднее — выравниваем башни
const tower = (t, h, x) => Array.from({ length: h }, (_, i) => `<g data-a="t${t}_${i}"><rect x="${x}" y="${190 - (i + 1) * 18}" width="40" height="16" rx="3" fill="${['#ff9a3c', '#2bb3c9', '#9b5cf6'][t]}"/></g>`).join('');
const ep3 = episode({
  title: 'Среднее',
  terms: ['среднее', 'среднее арифметическое'],
  svg: `<rect x="20" y="190" width="320" height="4" fill="#23324a"/>${tower(0, 4, 70)}${tower(1, 6, 160)}${tower(2, 8, 250)}
    ${text('n0', '4', { size: 20 })}${text('n1', '6', { size: 20 })}${text('n2', '8', { size: 20 })}${card('f', '(4 + 6 + 8) ÷ 3 = 18 ÷ 3 = 6', { w: 270, size: 16, fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${kittenActor('cat', 'excited', 40)}`,
  init: { n0: at(90, 212), n1: at(180, 212), n2: at(270, 212), f: hid(180, 30), cat: at(4, 6) },
  caption0: 'У троих друзей 4, 6 и 8 конфет. Среднее — «раздать поровну».',
  beats: beat(
    cap(2200, 'Две верхние конфеты из большой башни отдаём маленькой…'),
    move(2400, 't2_7', { x: -180, y: 54 }, 900), move(3100, 't2_6', { x: -180, y: 18 }, 900),
    setText(4100, 'n0', '6'), setText(4100, 'n2', '6'),
    cap(4300, 'Все башни по 6! Среднее равно 6.'), mood(4300, 'cat', 'happy'),
    cap(6400, 'Среднее арифметическое: сложить все числа и разделить на их количество.'), pop(6400, 'f'),
  ),
});

// серия 4: круговая диаграмма и формула
const ep4 = episode({
  title: 'Диаграмма и формула',
  terms: ['круговая диаграмма', 'четверть', 'формула', 'переменная'],
  svg: `<circle cx="90" cy="110" r="62" fill="#cfe6ef" stroke="#fff" stroke-width="3"/><path data-a="q" d="${wedge(4, 0, 62)}" fill="#ff7a59" stroke="#fff" stroke-width="3"/>
    ${emo('apple', '🍎', 26)}${text('frac', '¼ от 40 = 10 яблок', { size: 16 })}
    ${card('formula', 'S = a × b', { w: 130, size: 22, fill: '#fff3d6', stroke: '#f2c46d' })}${text('sub', 'a = 6, b = 4 → S = 24', { size: 16, color: '#16774a' })}
    <g data-a="rect"><rect x="0" y="0" width="96" height="64" fill="#ffe3a8" stroke="#d2a861" stroke-width="3"/></g>${text('la', 'a = 6', { size: 13 })}${text('lb', 'b = 4', { size: 13, anchor: 'start' })}
    ${kittenActor('cat', 'excited', 40)}`,
  init: { q: { o: 0, x: 90, y: 110 }, apple: hid(112, 86), frac: hid(90, 200), formula: hid(260, 40), rect: hid(212, 80), la: hid(260, 160), lb: hid(312, 116), sub: hid(260, 196), cat: at(160, 6) },
  caption0: 'Круговая диаграмма — круг, разрезанный на доли, как торт.',
  beats: beat(
    cap(1400, 'В корзине 40 фруктов. Яблоки — четверть круга.'),
    [[1400, 'to', 'q', { o: 1 }, 400]], pop(1800, 'apple'),
    cap(3400, 'Четверть от 40 — это 40 ÷ 4 = 10 яблок.'), pop(3400, 'frac'),
    cap(5600, 'Формула — правило буквами. Площадь прямоугольника S = a × b.'), pop(5600, ['formula', 'rect', 'la', 'lb'], 150),
    cap(8000, 'Подставляем числа вместо букв: 6 × 4 = 24.'), pop(8000, 'sub'), mood(8000, 'cat', 'happy'),
  ),
});

// серия 5: масштаб карты
const ep5 = episode({
  title: 'Масштаб',
  terms: ['масштаб', 'расстояние на карте'],
  svg: `<rect x="20" y="40" width="320" height="120" rx="14" fill="#e3f6d5" stroke="#9fd18b" stroke-width="3"/>
    ${emo('t1', '🏠', 30)}${emo('t2', '🏰', 30)}${[0, 1, 2, 3, 4].map((i) => `<line x1="${60 + i * 60}" y1="140" x2="${60 + i * 60}" y2="150" stroke="#23324a" stroke-width="2"/>`).join('')}
    <line x1="60" y1="145" x2="300" y2="145" stroke="#23324a" stroke-width="2"/>${[1, 2, 3, 4].map((i) => text(`k${i}`, `${i * 5} км`, { size: 13, color: '#1784a6' })).join('')}
    ${card('rule', '1 см на карте = 5 км', { w: 200, size: 16, fill: '#fff' })}${text('res', '4 см × 5 = 20 км', { size: 20, color: '#16774a' })}${kittenActor('cat', 'excited', 34)}`,
  init: { t1: at(60, 105), t2: at(300, 105), ...Object.fromEntries([1, 2, 3, 4].map((i) => [`k${i}`, hid(60 + i * 60, 132)])), rule: hid(180, 20), res: hid(180, 200), cat: at(43, 90) },
  caption0: 'Карта уменьшает мир. Масштаб говорит, во сколько раз.',
  beats: beat(
    pop(800, 'rule'),
    cap(1800, 'Между городами 4 см. Каждый сантиметр — 5 км.'),
    [1, 2, 3, 4].flatMap((i) => [...hop(2000 + (i - 1) * 800, 'cat', { x: 43 + i * 60 }, 650), ...pop(2600 + (i - 1) * 800, `k${i}`)]),
    cap(5600, '4 раза по 5 км — это 20 км!'), pop(5600, 'res'), mood(5600, 'cat', 'happy'),
  ),
});

// интерактив: нажми — котёнок объяснит
ep2.interact = { type: 'tapShow', cat: 'cat', items: {
  x: { show: ['ans'], say: 'В коробочке x спряталось 8: 8 + 7 = 15.', mood: 'celebrate' },
  fifteen: { say: 'Справа 15 — столько же, сколько x + 7 слева.' },
} };

export default { topic: 'math-1-4', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4, ep5] };

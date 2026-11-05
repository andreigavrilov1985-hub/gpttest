// Остров 2 · Наука · Тема 2. Частицы, элементы, соединения и кислоты — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: частицы в твёрдом, жидком, газе
const P = (n, color) => `<g data-a="${n}"><circle r="7" fill="${color}"/></g>`;
const solid = [];
for (let r = 0; r < 3; r += 1) for (let c = 0; c < 3; c += 1) solid.push([`s${r}${c}`, 40 + c * 16, 120 + r * 16]);
const liquid = [[150, 150], [166, 144], [182, 152], [158, 136], [176, 134], [148, 122], [190, 124], [166, 118], [184, 108]].map((p, i) => [`l${i}`, ...p]);
const gas = [[260, 60], [320, 90], [290, 140], [250, 180], [330, 170], [300, 40], [270, 110], [340, 130], [240, 140]].map((p, i) => [`g${i}`, ...p]);
const ep1 = episode({
  title: 'Частицы',
  terms: ['particles (частицы)', 'solid: колеблются на месте, плотно', 'liquid: скользят', 'gas: далеко и быстро'],
  svg: `${solid.map(([n]) => P(n, '#1784a6')).join('')}${liquid.map(([n]) => P(n, '#2bb3c9')).join('')}${gas.map(([n]) => P(n, '#9adbe8')).join('')}
    ${text('ts', 'solid', { size: 16 })}${text('tl', 'liquid', { size: 16 })}${text('tg', 'gas', { size: 16 })}${kittenActor('cat', 'excited', 32)}`,
  init: { ...Object.fromEntries(solid.map(([n, x, y]) => [n, at(x, y)])), ...Object.fromEntries(liquid.map(([n, x, y]) => [n, at(x, y, { o: 0 })])), ...Object.fromEntries(gas.map(([n, x, y]) => [n, at(x, y, { o: 0 })])),
    ts: hid(56, 200), tl: hid(170, 200), tg: hid(290, 220), cat: at(4, 4) },
  caption0: 'Всё вокруг состоит из крошечных частиц.',
  beats: beat(
    pop(300, 'ts'), cap(800, 'В solid частицы стоят плотно и только дрожат на месте.'),
    ...solid.flatMap(([n, x, y], i) => [[1200 + i * 20, 'to', n, { x: x + 2 }, 150], [1400 + i * 20, 'to', n, { x: x - 2 }, 150], [1600 + i * 20, 'to', n, { x }, 150]]),
    pop(3200, 'tl'), cap(3200, 'В liquid частицы рядом, но скользят друг мимо друга.'), ...liquid.map(([n, x, y], i) => [[3200 + i * 60, 'to', n, { o: 1 }, 200], [3600 + i * 60, 'to', n, { x: x + (i % 2 ? 8 : -8), y: y + 6 }, 1200]]),
    pop(5600, 'tg'), cap(5600, 'В gas частицы далеко друг от друга и летают очень быстро.'), ...gas.map(([n, x, y], i) => [[5600 + i * 40, 'to', n, { o: 1 }, 200], [5800 + i * 40, 'to', n, { x: 240 + ((x * 7) % 100), y: 30 + ((y * 3) % 170) }, 900]]),
    mood(6400, 'cat', 'happy'),
  ),
});

// серия 2: элемент, соединение, смесь
const atom = (n, ch, color) => `<g data-a="${n}"><circle r="15" fill="${color}"/><text y="5" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="14" fill="#fff">${ch}</text></g>`;
const ep2 = episode({
  title: 'Элемент, соединение, смесь',
  terms: ['element (один вид атомов): oxygen O', 'compound (атомы соединены): CO₂', 'mixture (смешаны, не соединены): air', 'chemical symbol'],
  svg: `${atom('o1', 'O', '#e4553b')}${atom('o2', 'O', '#e4553b')}${text('e', 'element: O', { size: 15, color: '#c0392b' })}
    ${atom('c', 'C', '#23324a')}${atom('o3', 'O', '#e4553b')}${atom('o4', 'O', '#e4553b')}${text('cp', 'compound: CO₂', { size: 15 })}
    <g data-a="air"><rect x="-70" y="-30" width="140" height="60" rx="14" fill="#eef7fb" stroke="#cfe6ef" stroke-width="3"/></g>${text('mx', 'mixture: воздух', { size: 15, color: '#1784a6' })}
    ${kittenActor('cat', 'thinking', 30)}`,
  init: { o1: hid(60, 40), o2: hid(92, 40), e: hid(200, 42), c: hid(70, 110), o3: hid(36, 110), o4: hid(104, 110), cp: hid(230, 112), air: hid(80, 186), mx: hid(240, 188), cat: at(320, 4) },
  caption0: 'Element — вещество из атомов одного вида.',
  beats: beat(
    pop(300, ['o1', 'o2', 'e'], 200), cap(800, 'Кислород — element. Его химический символ — O.'),
    pop(3000, ['o3', 'c', 'o4'], 200), cap(3000, 'Compound — разные атомы, соединённые вместе: углекислый газ CO₂.'), move(3600, 'o3', { x: 44 }, 400), move(3600, 'o4', { x: 96 }, 400), pop(4000, 'cp'),
    cap(5800, 'Mixture — вещества смешаны, но не соединены. Воздух — смесь газов.'), pop(5800, ['air', 'mx'], 300), mood(5800, 'cat', 'happy'),
  ),
});

// серия 3: кислоты и щёлочи, pH
const colors = ['#e4553b', '#ef6d3a', '#f58a3a', '#f9a83b', '#f6c53d', '#e3d64a', '#b6d65a', '#4cc27a', '#3bb38c', '#2bb3c9', '#2a94c9', '#3a75c4', '#5a5cc2', '#6d4ab8', '#7a3aa8'];
const ep3 = episode({
  title: 'Шкала pH',
  terms: ['pH', 'acid (кислота): pH < 7', 'neutral: pH 7 (вода)', 'alkali (щёлочь): pH > 7'],
  svg: `${colors.map((c, i) => `<rect x="${20 + i * 21.3}" y="90" width="21" height="40" fill="${c}"/>`).join('')}${[0, 7, 14].map((v) => `<text x="${30 + v * 21.3}" y="150" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="13" fill="#23324a">${v}</text>`).join('')}
    ${emo('lemon', '🍋', 34)}${emo('water', '💧', 34)}${emo('soap', '🧼', 34)}${text('a', 'acid < 7', { size: 15, color: '#c0392b' })}${text('n', 'neutral 7', { size: 15, color: '#16774a' })}${text('b', 'alkali > 7', { size: 15, color: '#6d3ad1' })}
    ${text('naoh', 'sodium hydroxide — щёлочь', { size: 12, color: '#6d3ad1' })}${kittenActor('cat', 'excited', 30)}`,
  init: { lemon: hid(60, 60), water: hid(180, 60), soap: hid(300, 60), a: hid(70, 176), n: hid(180, 176), b: hid(290, 176), naoh: hid(260, 204), cat: at(4, 196) },
  caption0: 'pH показывает: кислота это или щёлочь. Шкала от 0 до 14.',
  beats: beat(
    pop(800, ['lemon', 'a'], 200), cap(1200, 'Лимонный сок — acid, кислота: pH меньше 7.'),
    pop(3200, ['water', 'n'], 200), cap(3200, 'Чистая вода — нейтральная: pH ровно 7.'),
    pop(5200, ['soap', 'b'], 200), cap(5200, 'Мыло — alkali, щёлочь: pH больше 7.'), pop(6200, 'naoh'), mood(6200, 'cat', 'happy'),
  ),
});

// серия 4: химическое изменение
const ep4 = episode({
  title: 'Новое вещество',
  terms: ['chemical change: появляется новое вещество', 'iron rusting (ржавление)', 'physical change'],
  svg: `<g data-a="nail"><rect x="-60" y="-8" width="120" height="16" rx="4" fill="#9aa5b4"/><rect x="-70" y="-14" width="14" height="28" rx="3" fill="#7d8796"/></g>
    <g data-a="rust"><rect x="-60" y="-8" width="120" height="16" rx="4" fill="#b5532a"/></g>${emo('drop', '💧', 26)}${emo('air', '💨', 26)}
    ${text('ch', 'rust — новое вещество: chemical change', { size: 14, color: '#b5532a' })}${text('ph', 'лёд тает — вода та же: physical change', { size: 14, color: '#1784a6' })}${kittenActor('cat', 'surprised', 32)}`,
  init: { nail: at(180, 80), rust: at(180, 80, { o: 0 }), drop: hid(120, 40), air: hid(240, 40), ch: hid(180, 130), ph: hid(180, 190), cat: at(4, 170) },
  caption0: 'Железный гвоздь оставили под дождём.',
  beats: beat(
    pop(600, ['drop', 'air'], 300), cap(1400, 'Вода и воздух делают своё дело…'), [[2000, 'to', 'rust', { o: 1 }, 2200]],
    cap(4400, 'Появилась ржавчина — новое вещество. Это chemical change.'), pop(4400, 'ch'), mood(4400, 'cat', 'surprised'),
    cap(6600, 'А когда лёд тает, вода остаётся водой — это physical change.'), pop(6600, 'ph'), mood(6600, 'cat', 'happy'),
  ),
});

ep3.interact = { type: 'tapShow', cat: 'cat', items: {
  lemon: { show: ['a'], say: 'Лимонный сок — кислота: pH меньше 7.' }, water: { show: ['n'], say: 'Чистая вода — нейтральная: pH 7.' }, soap: { show: ['b'], say: 'Мыло — щёлочь: pH больше 7.' },
} };

export default { topic: 'science-2-2', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

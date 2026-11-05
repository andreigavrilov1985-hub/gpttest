// Остров 1 · География · Тема 4. ОАЭ и наш регион — мини-мультфильм
// Карта ОАЭ — упрощённая схема, не точная карта.
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const EM = [
  ['ad', 'Абу-Даби', 'M30 150 q60 -40 150 -50 l20 40 q-10 50 -60 70 q-80 20 -110 -10z', 110, 170],
  ['du', 'Дубай', 'M180 100 l30 -14 l14 30 l-24 22 z', 202, 112],
  ['sh', 'Шарджа', 'M210 86 l20 -12 l18 24 l-14 18 z', 230, 92],
  ['aj', 'Аджман', 'M230 74 l10 -6 l8 10 l-8 6 z', 238, 64],
  ['uq', 'Умм-эль-Кайвайн', 'M240 68 l12 -8 l8 12 l-10 6 z', 260, 56],
  ['rk', 'Рас-эль-Хайма', 'M252 60 l18 -24 l14 18 l-16 20 z', 288, 38],
  ['fu', 'Фуджейра', 'M284 64 l18 4 l-4 46 l-16 -8 z', 318, 96],
];
const ep1 = episode({
  title: 'Семь эмиратов',
  terms: ['эмират', '7 эмиратов', 'Абу-Даби — самый большой', 'Бурдж-Халифа в Дубае'],
  svg: `<rect x="0" y="0" width="360" height="240" fill="#bdeef3"/><path d="M0 240 L0 160 q100 -60 200 -80 q60 -20 100 -60 l60 40 V240 z" fill="#f7e2b5"/>
    ${EM.map(([k, , d]) => `<path data-a="${k}" d="${d}" fill="#ffd58a" stroke="#c99400" stroke-width="2"/>`).join('')}
    ${EM.map(([k, n]) => text(`${k}T`, n, { size: 10 })).join('')}${emo('burj', '🏙️', 30)}${text('bj', 'Бурдж-Халифа — самое высокое здание мира', { size: 12 })}
    ${card('count', '1', { w: 46, h: 40, size: 22, fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'excited', 34)}`,
  init: { ...Object.fromEntries(EM.flatMap(([k, , , x, y]) => [[k, { o: 0 }], [`${k}T`, hid(x, y)]])), burj: hid(206, 140), bj: hid(180, 226), count: hid(40, 30), cat: at(316, 180) },
  caption0: 'ОАЭ — Объединённые Арабские Эмираты. Это схема страны.',
  beats: beat(
    pop(800, 'count'),
    ...EM.map(([k], i) => [[900 + i * 700, 'to', k, { o: 1 }, 400], [1000 + i * 700, 'to', `${k}T`, { o: 1, s: 1 }, 300], [1000 + i * 700, 'text', 'countT', String(i + 1)]]).flat(),
    cap(1200, 'В ОАЭ семь эмиратов. Считаем вместе!'),
    cap(6200, 'Самый большой по площади — Абу-Даби. Он же столица.'), move(6200, 'ad', { s: 1.03 }, 300), move(6500, 'ad', { s: 1 }, 300),
    cap(8200, 'В Дубае стоит Бурдж-Халифа — самое высокое здание в мире.'), pop(8200, ['burj', 'bj']), mood(8200, 'cat', 'happy'),
  ),
});

// серия 2: соседи и заливы
const ep2 = episode({
  title: 'Соседи и заливы',
  terms: ['Персидский (Арабский) залив', 'Оманский залив', 'соседи: Саудовская Аравия и Оман', 'Фуджейра'],
  svg: `<rect x="0" y="0" width="360" height="240" fill="#f7e2b5"/><path data-a="pg" d="M0 0 H300 q-60 40 -100 70 q-60 20 -200 70 z" fill="#bdeef3"/><path data-a="go" d="M330 20 q10 60 30 70 V160 q-20 -40 -40 -60 z" fill="#9adbe8"/>
    <path d="M30 170 q90 -60 180 -80 q50 -16 90 -50 l20 20 q-10 70 -60 100 q-100 40 -230 30z" fill="#ffd58a" stroke="#c99400" stroke-width="3"/>${text('uae', 'ОАЭ', { size: 22 })}
    ${text('pgT', 'Персидский (Арабский) залив', { size: 13, color: '#1784a6' })}${text('goT', 'Оманский залив', { size: 12, color: '#1784a6' })}
    ${text('sa', 'Саудовская Аравия', { size: 14, color: '#5b6b83' })}${text('om', 'Оман', { size: 14, color: '#5b6b83' })}${text('fu', 'Фуджейра', { size: 12, color: '#b06200' })}${kittenActor('cat', 'excited', 34)}`,
  init: { pg: { o: 0 }, go: { o: 0 }, uae: at(180, 150), pgT: hid(150, 40), goT: hid(300, 196), sa: hid(110, 222), om: hid(320, 230), fu: hid(318, 110), cat: at(4, 150) },
  caption0: 'Где находятся ОАЭ? Смотрим по сторонам.',
  beats: beat(
    [[800, 'to', 'pg', { o: 1 }, 600]], pop(1200, 'pgT'), cap(1000, 'С севера ОАЭ омывает Персидский (Арабский) залив.'),
    [[3400, 'to', 'go', { o: 1 }, 600]], pop(3800, ['goT', 'fu']), cap(3400, 'На востоке — Оманский залив. На его берегу эмират Фуджейра.'),
    cap(6200, 'Сухопутные соседи — Саудовская Аравия и Оман.'), pop(6200, ['sa', 'om'], 400), mood(6200, 'cat', 'happy'),
  ),
});

// серия 3: пустыня, оазис, горы, дирхам
const ep3 = episode({
  title: 'Пустыня и оазис',
  terms: ['пустыня', 'оазис', 'горы Хаджар — на востоке', 'дирхам'],
  svg: `<rect x="0" y="0" width="360" height="240" fill="#ffe9c9"/><path d="M0 170 q60 -30 120 0 q60 30 120 0 q60 -30 120 0 V240 H0z" fill="#f2c46d"/>
    <path data-a="mts" d="M250 170 l30 -60 l20 30 l20 -50 l40 80 z" fill="#a77b5a"/>${text('mt', 'горы Хаджар', { size: 13 })}
    ${emo('camel', '🐪', 46)}${emo('palm', '🌴', 50)}<g data-a="pond"><ellipse rx="40" ry="10" fill="#5bbfd6"/></g>${text('oa', 'оазис: вода и растения', { size: 14, color: '#16774a' })}
    ${card('coin', '🪙 дирхам', { w: 120, size: 16, fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'excited', 36)}`,
  init: { mts: { o: 0 }, mt: hid(290, 96), camel: at(20, 150), palm: hid(160, 140), pond: hid(160, 176), oa: hid(160, 212), coin: hid(80, 40), cat: at(4, 4, { o: 0 }) },
  caption0: 'Большая часть ОАЭ — песчаная и каменистая пустыня.',
  beats: beat(
    move(600, 'camel', { x: 100 }, 2000, 'linear'),
    cap(2600, 'А вот оазис — место в пустыне, где есть вода и растут растения.'), pop(2600, ['pond', 'palm', 'oa'], 250),
    cap(5000, 'На востоке страны — горы Хаджар.'), [[5000, 'to', 'mts', { o: 1 }, 600]], pop(5400, 'mt'),
    cap(7000, 'Деньги в ОАЭ называются дирхам.'), pop(7000, 'coin'), [[7000, 'to', 'cat', { o: 1 }, 300]], mood(7000, 'cat', 'happy'),
  ),
});

// интерактив: нажми — котёнок объяснит
ep1.interact = { type: 'tapShow', cat: 'cat', items: Object.fromEntries(EM.map(([k, n]) => [k, { show: [`${k}T`], say: `Это эмират ${n}.`, mood: 'happy' }])) };

export default { topic: 'geography-1-4', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

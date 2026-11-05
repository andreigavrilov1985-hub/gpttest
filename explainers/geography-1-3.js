// Остров 1 · География · Тема 3. Страны и столицы мира — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const crown = (name) => `<g data-a="${name}"><path d="M-14 6 l4 -14 l10 9 l10 -9 l4 14 z" fill="#ffcf3f" stroke="#c99400" stroke-width="2"/></g>`;
const city = (name, label, big = false) => `<g data-a="${name}"><circle r="${big ? 9 : 7}" fill="${big ? '#9aa5b4' : '#ff7a59'}" stroke="#fff" stroke-width="3"/></g>${text(`${name}T`, label, { size: 13 })}`;

// серия 1: что такое столица (на примере ОАЭ)
const ep1 = episode({
  title: 'Что такое столица',
  terms: ['столица', 'главный город', 'самый известный город ≠ столица'],
  svg: `<rect x="0" y="0" width="360" height="240" fill="#f7ecd5"/><path d="M40 170 q60 -40 140 -60 q60 -30 120 -60 l30 40 q-40 70 -140 110 q-100 10 -150 -30z" fill="#ffe3a8" stroke="#d2a861" stroke-width="3"/>
    ${city('abu', 'Абу-Даби')}${city('dub', 'Дубай', true)}${crown('cr')}${emo('gov', '🏛️', 30)}${card('def', 'столица — главный город страны', { w: 280, size: 15, fill: '#fff' })}
    ${kittenActor('cat', 'excited', 36)}`,
  init: { abu: hid(120, 150), abuT: hid(120, 174), dub: hid(230, 100), dubT: hid(230, 124), cr: hid(120, 132), gov: hid(80, 120), def: hid(180, 24), cat: at(300, 160) },
  caption0: 'В каждой стране есть столица.',
  beats: beat(
    pop(400, ['dub', 'dubT']), cap(1000, 'Дубай — самый известный город ОАЭ. Но столица ли он?'), mood(1000, 'cat', 'thinking'),
    pop(3000, ['abu', 'abuT']), pop(3600, 'cr'), pop(3800, 'gov'), cap(3000, 'Нет! Столица ОАЭ — Абу-Даби.'),
    cap(5400, 'Столица — главный город, где работает правительство. Не всегда самый большой.'), pop(5400, 'def'), mood(5400, 'cat', 'happy'),
  ),
});

// серия 2: путешествие по столицам (интерактив: нажми на город)
const CAPS = [
  ['fr', 'Франция → Париж', 70, 60, 'Франция: столица Париж, а не Лион.'],
  ['uk', 'Великобритания → Лондон', 70, 110, 'Великобритания: столица Лондон.'],
  ['jp', 'Япония → Токио', 70, 160, 'Япония: столица Токио, а не Киото и не Осака.'],
  ['eg', 'Египет → Каир (река Нил)', 250, 60, 'Египет: столица Каир. Через страну течёт Нил.'],
  ['au', 'Австралия → Канберра', 250, 110, 'Австралия: столица Канберра, хотя Сидней больше.'],
  ['br', 'Бразилия → Бразилиа', 250, 160, 'Бразилия: столица Бразилиа, а не Рио.'],
];
const ep2 = episode({
  title: 'Столицы мира',
  terms: ['Париж', 'Лондон', 'Токио', 'Каир, Нил', 'Канберра', 'Бразилиа'],
  svg: `${CAPS.map(([k, l]) => card(k, l, { w: 172, h: 38, size: 13 })).join('')}${emo('plane', '✈️', 30)}${kittenActor('cat', 'excited', 36)}`,
  init: { ...Object.fromEntries(CAPS.map(([k, , x, y]) => [k, hid(x + 20, y)])), plane: at(20, 210), cat: at(160, 196) },
  caption0: 'Полетели! Нажимай на карточки стран.',
  beats: beat(
    ...CAPS.map(([k, , x, y, say], i) => [[600 + i * 1300, 'to', 'plane', { x: x + 20, y: y + 26 }, 800], [1300 + i * 1300, 'to', k, { o: 1, s: 1 }, 420, 'back'], [1300 + i * 1300, 'cap', say]]).flat(),
    mood(8800, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: Object.fromEntries(CAPS.map(([k, , , , say]) => [k, { show: [k], say, mood: 'happy' }])) },
});

// серия 3: самая большая страна и Тадж-Махал
const ep3 = episode({
  title: 'Рекорды и чудеса',
  terms: ['самая большая страна — Россия', 'Тадж-Махал — Индия'],
  svg: `<g data-a="ru"><rect x="-90" y="-28" width="180" height="56" rx="14" fill="#cfe6ef" stroke="#1784a6" stroke-width="3"/></g>${text('ruT', 'Россия', { size: 18 })}
    <g data-a="ca"><rect x="-55" y="-24" width="110" height="48" rx="12" fill="#f3f5f8" stroke="#9aa5b4" stroke-width="2"/></g>${text('caT', 'Канада', { size: 15, color: '#5b6b83' })}
    <g data-a="cn"><rect x="-50" y="-24" width="100" height="48" rx="12" fill="#f3f5f8" stroke="#9aa5b4" stroke-width="2"/></g>${text('cnT', 'Китай', { size: 15, color: '#5b6b83' })}
    ${emo('taj', '🕌', 50)}${text('tj', 'Тадж-Махал — Агра, Индия', { size: 14 })}${kittenActor('cat', 'surprised', 38)}`,
  init: { ru: hid(100, 80), ruT: hid(100, 86), ca: hid(280, 50), caT: hid(280, 56), cn: hid(280, 110), cnT: hid(280, 116), taj: hid(50, 190), tj: hid(190, 192), cat: at(310, 170) },
  caption0: 'Какая страна самая большая по площади?',
  beats: beat(
    pop(300, ['ca', 'caT', 'cn', 'cnT'], 150), pop(1200, ['ru', 'ruT']), move(1800, 'ru', { s: 1.15 }, 500),
    cap(1800, 'Россия! Она занимает больше всего места на карте мира.'), mood(1800, 'cat', 'excited'),
    cap(4400, 'А это Тадж-Махал — знаменитая гробница в городе Агра, в Индии.'), pop(4400, ['taj', 'tj'], 300), mood(4400, 'cat', 'happy'),
  ),
});

export default { topic: 'geography-1-3', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

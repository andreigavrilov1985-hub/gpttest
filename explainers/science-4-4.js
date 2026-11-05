// Остров 4 · Наука · Тема 4. Волны, спектр излучений и космос — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: волна переносит энергию; продольная и поперечная
const ep1 = episode({
  title: 'Волны',
  terms: ['волна переносит энергию, не вещество', 'звук — продольная волна', 'свет — электромагнитная волна', 'скорость света ~300 000 км/с'],
  svg: `<rect x="0" y="120" width="360" height="120" fill="#bdeef3"/>${emo('duck', '🦆', 34)}${text('d', 'утка качается на месте — вода не уплывает', { size: 12, color: '#1784a6' })}
    <g data-a="spring">${Array.from({ length: 14 }, (_, i) => `<line x1="${20 + i * 22}" y1="0" x2="${20 + i * 22}" y2="30" stroke="#ff7a59" stroke-width="${i % 4 === 0 ? 5 : 2}"/>`).join('')}</g>${text('lt', 'звук — продольная: сжатия вдоль направления', { size: 12, color: '#c0392b' })}
    ${card('c', 'свет летит 300 000 км в секунду', { w: 270, size: 14, fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { duck: at(180, 110), d: hid(180, 160), spring: at(0, 30, { o: 0 }), lt: hid(180, 80), c: hid(180, 210), cat: at(320, 200) },
  caption0: 'Волна бежит по воде, а утка только качается вверх-вниз.',
  beats: beat(
    ...[0, 1, 2, 3].flatMap((i) => [[300 + i * 600, 'to', 'duck', { y: 98 }, 300], [600 + i * 600, 'to', 'duck', { y: 110 }, 300]]), pop(1200, 'd'),
    cap(1600, 'Волна переносит энергию, а не вещество.'), [[3000, 'to', 'spring', { o: 1 }, 400]], move(3200, 'spring', { x: 20 }, 600), move(3800, 'spring', { x: 0 }, 600),
    cap(3200, 'Звук — продольная волна: частицы сжимаются и раздвигаются вдоль её пути.'), pop(3600, 'lt'),
    cap(5600, 'Свет — электромагнитная волна. Он летит 300 000 км в секунду.'), pop(5600, 'c'), mood(5600, 'cat', 'happy'),
  ),
});

// серия 2: спектр (интерактив)
const SPEC = [
  ['rad', 'радио', '#9aa5b4', 'радиоволны: связь, радио'], ['mic', 'микро', '#b6d65a', 'микроволны: печь, телефоны'], ['ir', 'ИК', '#ff7a59', 'инфракрасные: тепло, пульт'],
  ['vis', 'свет', '#ffcf3f', 'видимый свет: мы его видим'], ['uv', 'УФ', '#9b5cf6', 'ультрафиолет: загар и ожоги'], ['xr', 'рентген', '#6d4ab8', 'рентген: снимок костей'], ['gm', 'гамма', '#3a2a7a', 'гамма-лучи: самые энергичные'],
];
const ep2 = episode({
  title: 'Спектр излучений',
  terms: SPEC.map(([, , , d]) => d),
  svg: `${SPEC.map(([k, n, c]) => `<g data-a="${k}"><rect x="-24" y="-30" width="48" height="60" rx="6" fill="${c}"/><text y="46" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="11" fill="#23324a">${n}</text></g>`).join('')}
    ${text('en', 'энергия растёт →', { size: 14, color: '#6d3ad1' })}${kittenActor('cat', 'excited', 22)}`,
  init: { ...Object.fromEntries(SPEC.map(([k], i) => [k, hid(30 + i * 50, 90)])), en: hid(180, 170), cat: at(166, 196) },
  caption0: 'Свет — лишь часть большого семейства электромагнитных волн.',
  beats: beat(SPEC.map(([k, , , d], i) => [[600 + i * 900, 'to', k, { o: 1, s: 1 }, 400, 'back'], [600 + i * 900, 'cap', `${d[0].toUpperCase()}${d.slice(1)}.`]]), pop(7200, 'en'), mood(7200, 'cat', 'happy')),
  interact: { type: 'tapShow', cat: 'cat', items: Object.fromEntries(SPEC.map(([k, , , d]) => [k, { say: `${d[0].toUpperCase()}${d.slice(1)}.` }])) },
});

// серия 3: космос
const ep3 = episode({
  title: 'Год и галактика',
  terms: ['времена года — из-за наклона оси Земли', 'световой год — расстояние, которое свет проходит за год', 'Млечный Путь — наша галактика'],
  svg: `<rect x="0" y="0" width="360" height="240" fill="#1d2a48"/>${emo('sun', '☀️', 40)}<g data-a="earth"><circle r="16" fill="#3f8fd8"/><line x1="-8" y1="-22" x2="8" y2="22" stroke="#fff" stroke-width="2"/></g>
    ${text('tilt', 'ось наклонена → лето и зима', { size: 13, color: '#ffcf3f', stroke: '#1d2a48' })}${text('ly', 'световой год — путь света за год', { size: 13, color: '#fff', stroke: '#1d2a48' })}${emo('gal', '🌌', 40)}${text('mw', 'Млечный Путь — наша галактика', { size: 13, color: '#fff', stroke: '#1d2a48' })}${kittenActor('cat', 'excited', 22)}`,
  init: { sun: at(120, 100), earth: at(220, 100), tilt: hid(180, 30), ly: hid(180, 170), gal: hid(300, 200), mw: hid(170, 214), cat: at(320, 4) },
  caption0: 'Почему бывают лето и зима?',
  beats: beat(
    move(300, 'earth', { x: 20 }, 2400), cap(800, 'Ось Земли наклонена: то одно, то другое полушарие сильнее повёрнуто к Солнцу.'), pop(1600, 'tilt'),
    cap(3600, 'Световой год — это расстояние, а не время: столько свет пролетает за год.'), pop(3600, 'ly'),
    cap(5600, 'Наша Солнечная система — часть галактики Млечный Путь.'), pop(5600, ['gal', 'mw'], 300), mood(5600, 'cat', 'happy'),
  ),
});

export default { topic: 'science-4-4', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

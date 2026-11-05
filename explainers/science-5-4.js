// Остров 5 · Наука · Тема 4. Радиоактивность и изменение климата — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat } from '../js/cartoon-kit.js';

// серия 1: альфа, бета, гамма и преграды
const ep1 = episode({
  title: 'Три излучения',
  terms: ['радиоактивный распад — неустойчивое ядро выбрасывает излучение', 'альфа останавливает лист бумаги', 'бета — быстрые электроны', 'гамма — самое проникающее'],
  svg: `<g data-a="nuc"><circle r="22" fill="#e4553b"/><circle cx="-8" cy="-6" r="8" fill="#9aa5b4"/><circle cx="8" cy="6" r="8" fill="#9aa5b4"/></g>
    <rect x="140" y="30" width="6" height="190" fill="#f6efe2" stroke="#c9a77d"/><rect x="210" y="30" width="12" height="190" fill="#cfd8e3"/><rect x="290" y="30" width="26" height="190" fill="#7d8796"/>
    ${text('pa', 'бумага', { size: 11, color: '#b06200' })}${text('al', 'алюминий', { size: 11, color: '#5b6b83' })}${text('pb', 'свинец', { size: 11, color: '#23324a' })}
    <g data-a="a"><circle r="9" fill="#ff7a59"/><text y="4" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="11" fill="#fff">α</text></g>
    <g data-a="b"><circle r="6" fill="#2b6fc9"/><text y="3" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="8" fill="#fff">β</text></g>
    <g data-a="g"><path d="M-12 0 l4 -6 l4 12 l4 -12 l4 12 l4 -6" fill="none" stroke="#16a34a" stroke-width="3"/></g>${kittenActor('cat', 'thinking', 22)}`,
  init: { nuc: at(50, 125), pa: hid(143, 20), al: hid(216, 20), pb: hid(303, 20), a: hid(50, 70), b: hid(50, 125), g: hid(50, 180), cat: at(320, 214) },
  caption0: 'Неустойчивое ядро распадается и выбрасывает излучение.',
  beats: beat(
    [[300, 'to', 'nuc', { r: -8 }, 150], [450, 'to', 'nuc', { r: 8 }, 150], [600, 'to', 'nuc', { r: 0 }, 150]], pop(800, ['pa', 'al', 'pb'], 150),
    pop(1600, 'a'), move(1800, 'a', { x: 130 }, 900, 'linear'), cap(1600, 'Альфа — тяжёлая частица: её останавливает даже лист бумаги.'),
    pop(3400, 'b'), move(3600, 'b', { x: 200 }, 800, 'linear'), cap(3400, 'Бета — быстрые электроны: проходят бумагу, застревают в алюминии.'),
    pop(5200, 'g'), move(5400, 'g', { x: 282 }, 900, 'linear'), cap(5200, 'Гамма — волна, самая проникающая: нужен толстый свинец.'), mood(6400, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { a: { say: 'Альфа — стоп на бумаге.' }, b: { say: 'Бета — быстрый электрон.' }, g: { say: 'Гамма — самое проникающее.' } } },
});

// серия 2: период полураспада
const N = 16;
const ep2 = episode({
  title: 'Полураспад',
  terms: ['период полураспада — время, за которое распадается половина ядер', '80 г → 40 г → 20 г за два периода'],
  svg: `${Array.from({ length: N }, (_, i) => `<g data-a="u${i}"><circle r="8" fill="#e4553b"/></g>`).join('')}${text('d', 'день 0: 80 г', { size: 16, color: '#23324a' })}
    ${card('hl', 'каждые 2 дня — вдвое меньше', { w: 240, size: 14, fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'excited', 22)}`,
  init: { ...Object.fromEntries(Array.from({ length: N }, (_, i) => [`u${i}`, at(60 + (i % 8) * 30, 70 + Math.floor(i / 8) * 30)])), d: at(180, 150), hl: hid(180, 200), cat: at(320, 4) },
  caption0: 'Было 80 г радиоактивного вещества. Период полураспада — 2 дня.',
  beats: beat(
    Array.from({ length: 8 }, (_, i) => [1600, 'to', `u${i * 2 + 1}`, { o: 0.15, s: 0.6 }, 600]), setText(1600, 'd', 'день 2: 40 г'), cap(1600, 'Через 2 дня распалась половина — осталось 40 г.'),
    Array.from({ length: 4 }, (_, i) => [3600, 'to', `u${i * 4}`, { o: 0.15, s: 0.6 }, 600]), setText(3600, 'd', 'день 4: 20 г'), cap(3600, 'Ещё 2 дня — снова половина: 20 г.'),
    pop(5200, 'hl'), mood(5200, 'cat', 'happy'),
  ),
});

// серия 3: парниковый эффект
const ep3 = episode({
  title: 'Парниковый эффект',
  terms: ['парниковый эффект — газы задерживают тепло', 'углекислый газ (CO₂) — парниковый газ', 'сжигание ископаемого топлива даёт CO₂', 'ветер — возобновляемый источник'],
  svg: `<rect x="0" y="190" width="360" height="50" fill="#bfe8a8"/><path d="M0 70 Q180 30 360 70" fill="none" stroke="#9aa5b4" stroke-width="10" stroke-opacity=".5"/>
    ${emo('sun', '☀️', 34)}<g data-a="ray"><circle r="5" fill="#ffd166"/></g><g data-a="heat"><circle r="5" fill="#ff7a59"/></g>${emo('fac', '🏭', 32)}${emo('co2', '💨', 26)}${text('cl', 'CO₂', { size: 12, color: '#5b6b83' })}
    ${emo('wind', '🌬️', 30)}${text('wt', 'ветер — без CO₂', { size: 12, color: '#16774a' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { sun: at(40, 26), ray: hid(60, 40), heat: hid(160, 190), fac: hid(240, 172), co2: hid(240, 140), cl: hid(270, 60), wind: hid(80, 170), wt: hid(80, 214), cat: at(320, 4) },
  caption0: 'Солнце греет Землю, а Земля отдаёт тепло обратно в космос.',
  beats: beat(
    [[300, 'to', 'ray', { o: 1, s: 1 }, 200]], move(400, 'ray', { x: 160, y: 190 }, 1000, 'linear'),
    [[1500, 'to', 'heat', { o: 1, s: 1 }, 200]], move(1600, 'heat', { x: 200, y: 62 }, 800, 'linear'), move(2400, 'heat', { x: 240, y: 190 }, 800, 'linear'),
    cap(1600, 'Газы в воздухе задерживают часть тепла — как одеяло. Это парниковый эффект.'),
    pop(3600, ['fac', 'co2'], 200), move(3800, 'co2', { y: 70 }, 1000), pop(4600, 'cl'), cap(3600, 'Когда сжигают уголь, нефть и газ, выделяется CO₂ — одеяло толще, теплее.'),
    pop(6000, ['wind', 'wt'], 300), cap(6000, 'Ветер и солнце — возобновляемые источники: CO₂ не выделяют.'), mood(6000, 'cat', 'happy'),
  ),
});

export default { topic: 'science-5-4', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

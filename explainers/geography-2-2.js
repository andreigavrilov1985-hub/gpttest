// Остров 2 · География · Тема 2. Строение Земли, плиты и землетрясения — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, wiggle, episode, beat } from '../js/cartoon-kit.js';

// серия 1: слои Земли
const ep1 = episode({
  title: 'Земля в разрезе',
  terms: ['кора — тонкий внешний слой', 'мантия', 'ядро — железо и никель'],
  svg: `<g data-a="earth"><circle r="96" fill="#7fd08f"/><circle r="92" fill="#e4553b"/><circle r="56" fill="#ffb400"/><circle r="30" fill="#ffd95a"/>
    <path d="M0 0 L96 0 A96 96 0 0 0 0 -96 Z" fill="none"/></g>
    ${text('kr', 'кора — тонкая, как кожура', { size: 13, color: '#16774a' })}${text('mn', 'мантия', { size: 14, color: '#c0392b' })}${text('cr', 'ядро: железо и никель', { size: 13, color: '#b06200' })}${kittenActor('cat', 'surprised', 30)}`,
  init: { earth: at(120, 125, { s: 0.6, o: 0 }), kr: hid(270, 40), mn: hid(270, 110), cr: hid(270, 170), cat: at(4, 4) },
  caption0: 'Разрежем Землю, как персик.',
  beats: beat(
    [[300, 'to', 'earth', { o: 1, s: 1 }, 800, 'back']],
    cap(1400, 'Сверху — кора: самый тонкий слой.'), pop(1400, 'kr'),
    cap(3200, 'Под ней — горячая мантия.'), pop(3200, 'mn'),
    cap(4800, 'В центре — ядро. Оно в основном из железа и никеля.'), pop(4800, 'cr'), mood(4800, 'cat', 'happy'),
  ),
});

// серия 2: плиты, горы, землетрясения, цунами
const ep2 = episode({
  title: 'Плиты двигаются',
  terms: ['тектонические плиты', 'несколько см в год', 'столкновение → горы (Гималаи)', 'землетрясение', 'сейсмограф', 'цунами'],
  svg: `<g data-a="pl"><rect x="-150" y="0" width="150" height="40" fill="#c9a77d" stroke="#7a4a2a" stroke-width="2"/></g><g data-a="pr"><rect x="0" y="0" width="150" height="40" fill="#b8956a" stroke="#7a4a2a" stroke-width="2"/></g>
    <g data-a="mt"><path d="M-40 0 L-10 -50 L10 -30 L30 -60 L50 0 Z" fill="#8a6d5a"/></g>${text('sp', 'всего несколько сантиметров в год', { size: 13, color: '#5b6b83' })}
    <path data-a="seis" data-draw d="M40 210 h40 l6 -20 l6 34 l6 -30 l6 22 l6 -12 h60" stroke="#e4553b" stroke-width="3" fill="none"/>${text('st', 'сейсмограф', { size: 13, color: '#c0392b' })}
    ${emo('wave', '🌊', 46)}${text('ts', 'цунами — огромная волна', { size: 13, color: '#1784a6' })}${kittenActor('cat', 'surprised', 28)}`,
  init: { pl: at(150, 110), pr: at(210, 110), mt: hid(180, 112), sp: hid(180, 170), seis: { o: 1 }, st: hid(100, 186), wave: hid(310, 190), ts: hid(260, 230), cat: at(4, 4) },
  caption0: 'Кора разбита на огромные куски — тектонические плиты.',
  beats: beat(
    cap(1000, 'Они медленно плывут по мантии — несколько сантиметров в год.'), pop(1000, 'sp'),
    move(2400, 'pl', { x: 180 }, 1500), move(2400, 'pr', { x: 180 }, 1500), pop(3600, 'mt'), cap(2600, 'Плиты сталкиваются и сминают кору — растут горы. Так появились Гималаи!'),
    cap(5600, 'Если плиты вдруг дёрнутся вдоль разлома — земля трясётся. Это землетрясение.'), wiggle(5600, 'pl'), wiggle(5600, 'pr'), draw(5800, 'seis', 1000), pop(6400, 'st'),
    cap(8200, 'Толчок под водой может поднять цунами — огромную волну.'), pop(8200, ['wave', 'ts'], 300), mood(8200, 'cat', 'surprised'),
  ),
});

// серия 3: выветривание и эрозия
const bits = Array.from({ length: 6 }, (_, i) => `<g data-a="b${i}"><circle r="4" fill="#8a6d5a"/></g>`).join('');
const ep3 = episode({
  title: 'Камень рассыпается',
  terms: ['выветривание — разрушение на месте', 'эрозия — вода, ветер, лёд уносят частицы'],
  svg: `<g data-a="rock"><path d="M-50 30 L-40 -30 L10 -40 L50 -10 L45 30 Z" fill="#9aa5b4" stroke="#6b7686" stroke-width="3"/></g><path data-a="crack" data-draw d="M90 70 l10 20 l-6 14 l12 18" stroke="#23324a" stroke-width="3" fill="none"/>
    ${emo('sun', '☀️', 30)}${emo('snow', '❄️', 26)}${bits}<rect x="200" y="150" width="160" height="30" fill="#5bbfd6"/>${emo('wind', '💨', 30)}
    ${text('w', 'выветривание', { size: 14, color: '#5b6b83' })}${text('e', 'эрозия', { size: 14, color: '#1784a6' })}${kittenActor('cat', 'thinking', 28)}`,
  init: { rock: at(100, 100), sun: hid(40, 30), snow: hid(160, 30), ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`b${i}`, at(110 + i * 6, 130, { o: 0 })])), wind: hid(170, 130), w: hid(100, 200), e: hid(270, 210), cat: at(320, 4) },
  caption0: 'Камень днём греется, ночью мёрзнет…',
  beats: beat(
    pop(300, 'sun'), pop(1300, 'snow'), draw(2000, 'crack', 800), cap(2000, '…и трескается прямо на месте. Это выветривание.'), pop(2800, 'w'),
    ...Array.from({ length: 6 }, (_, i) => [[4400, 'to', `b${i}`, { o: 1 }, 200]]), pop(4400, 'wind'),
    ...Array.from({ length: 6 }, (_, i) => move(4800 + i * 120, `b${i}`, { x: 220 + i * 20, y: 160 }, 1400)),
    cap(4800, 'Ветер и вода уносят кусочки далеко — это эрозия.'), pop(6200, 'e'), mood(6200, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { earth: { say: 'Кора → мантия → ядро. Ядро в основном из железа и никеля.' } } };

export default { topic: 'geography-2-2', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

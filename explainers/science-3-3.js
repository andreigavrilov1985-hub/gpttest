// Остров 3 · Наука · Тема 3. Электричество, магниты и энергия — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: амперметр и вольтметр, последовательная цепь
const ep1 = episode({
  title: 'Приборы в цепи',
  terms: ['амперметр — сила тока, включают последовательно', 'вольтметр — напряжение (вольты), параллельно', 'последовательная цепь: одна лампа погасла — гаснут все'],
  svg: `<path d="M50 60 H310 V170 H50 Z" fill="none" stroke="#d2a861" stroke-width="5"/>${card('A', 'A', { w: 36, h: 36, size: 18, fill: '#eef7fb' })}${emo('b1', '💡', 34)}${emo('b2', '💡', 34)}
    <g data-a="glow1"><circle r="22" fill="#ffcf3f" opacity=".45"/></g><g data-a="glow2"><circle r="22" fill="#ffcf3f" opacity=".45"/></g>
    <path data-a="vw" d="M140 60 V20 H230 V60" fill="none" stroke="#9b5cf6" stroke-width="3" stroke-dasharray="5 4"/>${card('V', 'V', { w: 36, h: 36, size: 18, fill: '#efe7ff', stroke: '#c8b5f5' })}
    ${text('at', 'A — в разрыв цепи', { size: 13, color: '#1784a6' })}${text('vt', 'V — сбоку, параллельно', { size: 13, color: '#6d3ad1' })}${emo('bat', '🔋', 30)}${kittenActor('cat', 'thinking', 26)}`,
  init: { A: hid(50, 115), b1: at(140, 60), b2: at(230, 60), glow1: at(140, 56), glow2: at(230, 56), vw: { o: 0 }, V: hid(185, 20), at: hid(110, 200), vt: hid(270, 200), bat: at(180, 170), cat: at(318, 196) },
  caption0: 'Простая цепь: батарейка и две лампы одна за другой.',
  beats: beat(
    pop(600, ['A', 'at'], 300), cap(1000, 'Амперметр меряет силу тока. Его ставят прямо в цепь — последовательно.'),
    [[3000, 'to', 'vw', { o: 1 }, 400]], pop(3200, ['V', 'vt'], 300), cap(3000, 'Вольтметр меряет напряжение в вольтах. Его подключают параллельно лампе.'),
    cap(5400, 'Одна лампа перегорела… В последовательной цепи гаснут все!'), fade(5600, ['glow1', 'glow2'], 0, 300), mood(5600, 'cat', 'surprised'),
  ),
});

// серия 2: магниты и электромагнит (интерактив)
const mag = (n, l, r) => `<g data-a="${n}"><rect x="-40" y="-14" width="40" height="28" fill="${l === 'N' ? '#e4553b' : '#2bb3c9'}"/><rect x="0" y="-14" width="40" height="28" fill="${r === 'N' ? '#e4553b' : '#2bb3c9'}"/>
  <text x="-20" y="6" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="14" fill="#fff">${l}</text><text x="20" y="6" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="14" fill="#fff">${r}</text></g>`;
const ep2 = episode({
  title: 'Магниты',
  terms: ['одинаковые полюса отталкиваются', 'разные притягиваются', 'электромагнит: больше витков — сильнее', 'пластик — изолятор'],
  svg: `${mag('m1', 'S', 'N')}${mag('m2', 'N', 'S')}${text('t', 'N к N — отталкиваются!', { size: 15, color: '#c0392b' })}
    <g data-a="coil"><rect x="-60" y="-12" width="120" height="24" rx="4" fill="#9aa5b4"/>${Array.from({ length: 8 }, (_, i) => `<ellipse cx="${-52 + i * 15}" cy="0" rx="5" ry="15" fill="none" stroke="#d2a861" stroke-width="3"/>`).join('')}</g>
    ${text('ct', 'больше витков провода — сильнее электромагнит', { size: 13, color: '#b06200' })}${text('ins', 'пластик тока не пропускает — изолятор', { size: 12, color: '#5b6b83' })}${kittenActor('cat', 'excited', 26)}`,
  init: { m1: hid(110, 60), m2: hid(250, 60), t: hid(180, 104), coil: hid(180, 160), ct: hid(180, 196), ins: hid(180, 222), cat: at(318, 4) },
  caption0: 'Сблизим два магнита одинаковыми полюсами.',
  beats: beat(
    pop(300, ['m1', 'm2'], 200), move(1000, 'm1', { x: 140 }, 500), move(1000, 'm2', { x: 220 }, 500), move(1500, 'm1', { x: 70 }, 400, 'out'), move(1500, 'm2', { x: 290 }, 400, 'out'),
    pop(1700, 't'), cap(1700, 'Одинаковые полюса отталкиваются, разные — притягиваются.'), mood(1700, 'cat', 'surprised'),
    pop(3800, 'coil'), cap(3800, 'Провод, намотанный на железо, с током — электромагнит. Больше витков — сильнее.'), pop(4800, 'ct'),
    pop(6600, 'ins'), mood(6600, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { m1: { say: 'Справа у него N.' }, m2: { say: 'Слева у него тоже N — поэтому отталкиваются.' }, coil: { show: ['ct'], say: 'Больше витков — сильнее магнит.' } } },
});

// серия 3: потенциальная энергия и сохранение
const ep3 = episode({
  title: 'Энергия высоты',
  terms: ['гравитационная потенциальная энергия', 'закон сохранения энергии'],
  svg: `<rect x="200" y="70" width="120" height="10" fill="#a0673c"/><rect x="0" y="210" width="360" height="30" fill="#f2c46d"/>${emo('book', '📘', 34)}
    ${text('gp', 'на высоте — gravitational potential', { size: 13, color: '#6d3ad1' })}${card('law', 'энергия не исчезает, а переходит из одного вида в другой', { w: 340, size: 12, fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'excited', 28)}`,
  init: { book: at(80, 190), gp: hid(220, 40), law: hid(180, 140), cat: at(4, 4) },
  caption0: 'Котёнок поднимает книгу на полку.',
  beats: beat(
    move(600, 'book', { x: 260, y: 52 }, 1400), pop(2200, 'gp'), cap(2200, 'Поднятая вещь запасает гравитационную потенциальную энергию.'),
    cap(4400, 'Упадёт — энергия перейдёт в энергию движения. Она не исчезает!'), move(4600, 'book', { y: 190 }, 600, 'inOut'), pop(5400, 'law'), mood(5400, 'cat', 'happy'),
  ),
});

export default { topic: 'science-3-3', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

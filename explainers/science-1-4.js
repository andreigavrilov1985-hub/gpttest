// Остров 1 · Наука · Тема 4. Силы, свет, электричество и космос — мини-мультфильм
import { card, text, emo, arrow, kittenActor, ground, at, hid, cap, pop, fade, move, hop, mood, setText, draw, wiggle, episode, beat } from '../js/cartoon-kit.js';

// серия 1: гравитация и трение
const ep1 = episode({
  title: 'Силы',
  terms: ['force (сила)', 'gravity (тяжесть)', 'friction (трение)', 'newtons'],
  svg: `${ground(196)}${emo('tree', '🌳', 90)}${emo('apple', '🍎', 26)}${arrow('g', 70, 120, 70, 176, '#9b5cf6')}${text('gl', 'gravity', { size: 15, color: '#9b5cf6' })}
    ${emo('box', '📦', 40)}${text('fl', 'friction', { size: 15, color: '#ff7a59' })}${card('n', 'силу измеряют в newtons (Н)', { w: 250, size: 14, fill: '#eef7fb' })}${kittenActor('cat', 'surprised', 40)}`,
  init: { tree: at(70, 120), apple: at(80, 100), g: { o: 0 }, gl: hid(110, 150), box: at(170, 180, { o: 0 }), fl: hid(260, 220), n: hid(180, 24), cat: at(300, 120) },
  caption0: 'Сила — это толчок или притяжение.',
  beats: beat(
    cap(1000, 'Яблоко падает вниз. Его тянет к Земле gravity — сила тяжести.'), move(1200, 'apple', { y: 186 }, 700, 'inOut'), [[1300, 'to', 'g', { o: 1 }, 100]], draw(1300, 'gL', 500), pop(1800, 'gl'),
    cap(4000, 'Коробку толкнули по полу. Она тормозит и останавливается.'), [[4000, 'to', 'box', { o: 1 }, 200]], move(4200, 'box', { x: 260 }, 1800, 'out'),
    cap(6200, 'Её тормозит friction — трение о пол.'), pop(6200, 'fl'), mood(6200, 'cat', 'thinking'),
    cap(8000, 'Силу измеряют в ньютонах — newtons.'), pop(8000, 'n'),
  ),
});

// серия 2: свет и тень
const ep2 = episode({
  title: 'Свет и тень',
  terms: ['light travels in straight lines', 'shadow (тень)', 'light source (источник света)', 'reflect (отражает)'],
  svg: `${emo('lamp', '🔦', 44)}${[0, 1, 2].map((i) => arrow(`r${i}`, 70, 110, 330, 60 + i * 50, '#ffb400')).join('')}<g data-a="block"><rect x="-14" y="-40" width="28" height="80" rx="4" fill="#9b5cf6"/></g>
    <g data-a="shadow"><path d="M0 -40 L130 -70 L130 70 L0 40 Z" fill="#5b6b83" opacity=".35"/></g>${text('sh', 'shadow', { size: 15, color: '#5b6b83' })}
    ${emo('sun', '☀️', 40)}${emo('moon', '🌙', 36)}${text('src', 'Солнце светит, Луна отражает', { size: 13 })}${kittenActor('cat', 'excited', 38)}`,
  init: { lamp: hid(46, 110), r0: { o: 0 }, r1: { o: 0 }, r2: { o: 0 }, block: hid(190, 110), shadow: at(204, 110, { o: 0 }), sh: hid(290, 112), sun: hid(60, 214), moon: hid(130, 214), src: hid(240, 214), cat: at(300, 4) },
  caption0: 'Свет идёт по прямым линиям.',
  beats: beat(
    pop(200, 'lamp'), ...[0, 1, 2].map((i) => [[600 + i * 200, 'to', `r${i}`, { o: 1 }, 100]]), draw(600, 'r0L', 700), draw(800, 'r1L', 700), draw(1000, 'r2L', 700),
    cap(2600, 'Поставим предмет — он закрывает свет…'), pop(2600, 'block'), [[3200, 'to', 'shadow', { o: 1 }, 600]],
    cap(3800, '…и за ним тень (shadow): туда свет не попал.'), pop(3800, 'sh'),
    cap(6000, 'Солнце — источник света. Луна и зеркало только отражают свет.'), pop(6000, ['sun', 'moon', 'src'], 250), mood(6000, 'cat', 'happy'),
  ),
});

// серия 3: электрическая цепь (интерактив: замкни цепь)
const ep3 = episode({
  title: 'Цепь',
  terms: ['circuit (цепь)', 'complete circuit (замкнутая)', 'cell / battery'],
  svg: `<path d="M80 80 h200 v100 h-80 M160 180 h-80 v-100" fill="none" stroke="#d2a861" stroke-width="6" stroke-linecap="round"/>
    <g data-a="sw"><line x1="0" y1="0" x2="40" y2="0" stroke="#d2a861" stroke-width="6" stroke-linecap="round"/></g>${emo('bat', '🔋', 40)}${emo('bulb', '💡', 46)}<g data-a="glow"><circle r="30" fill="#ffcf3f" opacity=".5"/></g>
    ${card('btn', 'замкни', { w: 90, size: 15, fill: '#fff3d6', stroke: '#f2c46d' })}${text('gap', 'разрыв — лампа не горит', { size: 13, color: '#c0392b' })}${kittenActor('cat', 'thinking', 40)}`,
  init: { sw: at(160, 180, { r: -35 }), bat: at(80, 130), bulb: at(280, 78), glow: at(280, 72, { o: 0 }), btn: hid(180, 222), gap: hid(180, 140), cat: at(4, 4) },
  caption0: 'Батарейка, провода и лампочка. Почему лампа не горит?',
  beats: beat(
    pop(1200, 'gap'), cap(1600, 'В цепи разрыв. Ток не может пройти.'),
    cap(3600, 'Закроем разрыв — цепь замкнута!'), move(3600, 'sw', { r: 0 }, 500), fade(3600, 'gap'), [[4100, 'to', 'glow', { o: 1 }, 300]], mood(4100, 'cat', 'excited'),
    cap(5600, 'Лампа горит только в замкнутой цепи, без разрывов.'), pop(6400, 'btn'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { btn: { show: ['glow'], say: 'Цепь замкнута — лампочка горит!', mood: 'celebrate' } } },
});

// серия 4: Солнце, планеты, Луна
const orbit = (r, color) => `<circle cx="120" cy="120" r="${r}" fill="none" stroke="${color}" stroke-dasharray="4 5"/>`;
const ep4 = episode({
  title: 'Космос',
  terms: ['Mercury — ближе всех к Солнцу', 'Земля обходит Солнце за год', 'Moon orbits the Earth'],
  svg: `<rect x="0" y="0" width="360" height="240" fill="#1d2a48"/>${orbit(40, '#9aa5b4')}${orbit(85, '#6fa8dc')}${emo('sun', '☀️', 56)}
    <g data-a="merc"><circle r="7" fill="#c9b8a6"/></g><g data-a="earthO"><g data-a="earth"><circle r="13" fill="#3f8fd8"/><circle cx="-3" cy="-3" r="5" fill="#4cc27a"/></g><g data-a="moon"><circle r="5" fill="#eee"/></g></g>
    ${text('mt', 'Mercury', { size: 13, color: '#fff', stroke: '#1d2a48' })}${text('yr', '1 оборот = 1 год', { size: 15, color: '#ffcf3f', stroke: '#1d2a48' })}${text('mo', 'Moon → вокруг Земли', { size: 14, color: '#fff', stroke: '#1d2a48' })}
    ${kittenActor('cat', 'excited', 40)}`,
  init: { sun: at(120, 120), merc: at(160, 120), earthO: at(120, 120), earth: at(85, 0), moon: at(108, 0), mt: hid(170, 146), yr: hid(270, 60), mo: hid(270, 200), cat: at(300, 110) },
  caption0: 'В центре — Солнце. Вокруг него летят планеты.',
  beats: beat(
    cap(1000, 'Mercury — Меркурий — ближе всех к Солнцу.'), pop(1000, 'mt'),
    cap(3200, 'Земля облетает Солнце по кругу. Один полный круг — один год.'), move(3200, 'earthO', { r: 360 }, 4000, 'linear'), pop(3600, 'yr'),
    cap(7400, 'А вокруг Земли кружится Луна — Moon. Она отражает свет Солнца.'), move(7400, 'moon', { x: 85, y: -23 }, 700), move(8100, 'moon', { x: 62, y: 0 }, 700), move(8800, 'moon', { x: 85, y: 23 }, 700), move(9500, 'moon', { x: 108, y: 0 }, 700),
    pop(7400, 'mo'), mood(7400, 'cat', 'happy'),
  ),
});

export default { topic: 'science-1-4', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

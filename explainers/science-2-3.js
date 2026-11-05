// Остров 2 · Наука · Тема 3. Силы и движение — мини-мультфильм
import { card, text, emo, arrow, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, episode, beat } from '../js/cartoon-kit.js';

// серия 1: скорость
const ep1 = episode({
  title: 'Скорость',
  terms: ['speed = distance ÷ time', 'distance = speed × time', 'km/h'],
  svg: `<rect x="20" y="130" width="320" height="30" fill="#5b6b83"/><path d="M20 145 h320" stroke="#fff" stroke-width="3" stroke-dasharray="14 10"/>
    ${emo('bus', '🚌', 40)}${[0, 1, 2].map((i) => text(`h${i}`, `${i + 1} ч → ${(i + 1) * 50} км`, { size: 13, color: '#1784a6' })).join('')}
    ${card('f', 'speed = 150 км ÷ 3 ч = 50 км/ч', { w: 290, size: 16, fill: '#e2f8ea', stroke: '#9fdcb9' })}${text('f2', 'а путь = скорость × время', { size: 14, color: '#5b6b83' })}${kittenActor('cat', 'excited', 30)}`,
  init: { bus: at(40, 120), h0: hid(130, 100), h1: hid(220, 100), h2: hid(310, 100), f: hid(180, 196), f2: hid(180, 226), cat: at(4, 4) },
  caption0: 'Автобус едет 3 часа и проезжает 150 км.',
  beats: beat(
    ...[0, 1, 2].map((i) => [...move(800 + i * 1100, 'bus', { x: 130 + i * 90 }, 1000, 'linear'), ...pop(1800 + i * 1100, `h${i}`)]),
    cap(1200, 'Каждый час — одинаковый кусок пути.'),
    cap(4400, 'Скорость = путь ÷ время: 150 ÷ 3 = 50 км/ч.'), pop(4400, 'f'), pop(6000, 'f2'), mood(4400, 'cat', 'happy'),
  ),
});

// серия 2: масса и вес
const ep2 = episode({
  title: 'Масса и вес',
  terms: ['mass (масса, кг) не меняется', 'weight (вес, ньютоны)', 'на Луне gravity слабее: у Луны меньше масса'],
  svg: `${emo('earth', '🌍', 50)}${emo('moon', '🌕', 40)}${emo('astro', '🧑‍🚀', 40)}
    ${card('m', 'mass 60 кг', { w: 120, size: 15, fill: '#fff3d6', stroke: '#f2c46d' })}${card('w', 'weight 600 N', { w: 130, size: 15, fill: '#eef7fb' })}
    ${text('t', 'вес измеряют в newtons', { size: 14, color: '#1784a6' })}${kittenActor('cat', 'excited', 30)}`,
  init: { earth: at(70, 170), moon: at(290, 60), astro: at(70, 110), m: hid(180, 190), w: hid(180, 226), t: hid(250, 140), cat: at(4, 4) },
  caption0: 'Космонавт на Земле. Его масса — 60 кг.',
  beats: beat(
    pop(400, ['m', 'w'], 300), cap(1000, 'Вес — сила, с которой его тянет планета. Weight меряют в newtons.'), pop(2200, 't'),
    cap(4000, 'Летим на Луну!'), move(4000, 'astro', { x: 290, y: 20 }, 1600, 'inOut'),
    cap(5800, 'Масса осталась прежней — 60 кг. А вес стал примерно в 6 раз меньше.'), setText(5800, 'wT', 'weight ≈ 100 N'), move(5800, 'w', { s: 1.15 }, 300), move(6100, 'w', { s: 1 }, 300),
    cap(8000, 'У Луны меньше масса — поэтому её притяжение слабее.'), mood(8000, 'cat', 'surprised'),
  ),
});

// серия 3: равнодействующая сила
const ep3 = episode({
  title: 'Перетягивание',
  terms: ['resultant force (равнодействующая)', 'balanced forces (уравновешены)'],
  svg: `<rect x="80" y="100" width="200" height="8" rx="4" fill="#d2a861"/><g data-a="box"><rect x="-22" y="-22" width="44" height="44" rx="6" fill="#ff9a3c"/></g>
    ${arrow('R', 202, 104, 320, 104, '#e4553b')}${arrow('L', 158, 104, 108, 104, '#1784a6')}${text('rt', '12 N', { size: 16, color: '#e4553b' })}${text('lt', '5 N', { size: 16, color: '#1784a6' })}
    ${card('res', '12 − 5 = 7 N вправо', { w: 200, size: 16, fill: '#e2f8ea', stroke: '#9fdcb9' })}${text('bal', 'равные силы → движение не меняется', { size: 13, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 30)}`,
  init: { box: at(180, 104), R: { o: 0 }, L: { o: 0 }, rt: hid(280, 88), lt: hid(130, 88), res: hid(180, 160), bal: hid(180, 214), cat: at(4, 4) },
  caption0: 'Коробку тянут в разные стороны.',
  beats: beat(
    [[400, 'to', 'R', { o: 1 }, 100]], draw(400, 'RL', 500), pop(800, 'rt'), [[1200, 'to', 'L', { o: 1 }, 100]], draw(1200, 'LL', 500), pop(1600, 'lt'),
    cap(2000, 'Вправо 12 N, влево 5 N. Кто сильнее?'),
    cap(3600, 'Вычитаем: равнодействующая 7 N вправо. Коробка едет вправо!'), pop(3600, 'res'), move(4200, 'box', { x: 240 }, 1200), mood(4200, 'cat', 'happy'),
    cap(6000, 'Если силы равны, они уравновешены: что стояло — стоит, что ехало — едет так же.'), pop(6000, 'bal'),
  ),
});

// серия 4: трение, сопротивление воздуха, график
const ep4 = episode({
  title: 'Тормоза и графики',
  terms: ['friction больше на шершавой поверхности', 'air resistance — против движения', 'график путь–время: горизонталь = стоит'],
  svg: `${emo('carpet', '🟫', 30)}${emo('ice', '🧊', 30)}${emo('b1', '⚽', 26)}${emo('b2', '⚽', 26)}${text('fr', 'ковёр шершавый — трение больше', { size: 12, color: '#b06200' })}
    ${emo('para', '🪂', 40)}${arrow('ar', 280, 70, 280, 30, '#1784a6')}${text('art', 'air resistance ↑', { size: 12, color: '#1784a6' })}
    <path d="M40 220 V140 M40 220 H200" stroke="#23324a" stroke-width="3"/><path data-a="gr" data-draw d="M40 220 L100 170 L160 170 L200 140" stroke="#ff7a59" stroke-width="4" fill="none"/>
    ${text('gt', 'ровная линия — стоит на месте', { size: 12, color: '#ff7a59' })}${kittenActor('cat', 'excited', 28)}`,
  init: { carpet: at(30, 50), ice: at(30, 100), b1: at(60, 46), b2: at(60, 96), fr: hid(150, 130), para: hid(280, 100), ar: { o: 0 }, art: hid(300, 140), gt: hid(150, 236), cat: at(320, 190) },
  caption0: 'Катим мячи: по ковру и по льду.',
  beats: beat(
    move(600, 'b1', { x: 110 }, 1200, 'out'), move(600, 'b2', { x: 220 }, 2000, 'out'), pop(2400, 'fr'), cap(2400, 'По ковру мяч быстро тормозит: трение (friction) больше.'),
    pop(4200, 'para'), move(4400, 'para', { y: 120 }, 2000, 'linear'), [[4600, 'to', 'ar', { o: 1 }, 100]], draw(4600, 'arL', 500), pop(5000, 'art'),
    cap(4400, 'Air resistance — сопротивление воздуха — действует против движения.'),
    cap(7000, 'На графике путь–время ровная горизонтальная линия значит: стоит на месте.'), draw(7000, 'gr', 1600), pop(8200, 'gt'), mood(8200, 'cat', 'happy'),
  ),
});

ep3.interact = { type: 'tapShow', cat: 'cat', items: { box: { show: ['res'], say: 'Из большей силы вычитаем меньшую: 12 − 5 = 7 N вправо.' } } };

export default { topic: 'science-2-3', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

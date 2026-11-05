// Остров 1 · Наука · Тема 3. Материалы и вещества — мини-мультфильм
import { card, text, emo, arrow, kittenActor, table, at, hid, cap, pop, fade, move, hop, mood, setText, draw, wiggle, episode, beat } from '../js/cartoon-kit.js';

// серия 1: лёд → вода → пар
const ep1 = episode({
  title: 'Лёд, вода, пар',
  terms: ['solid', 'liquid', 'gas', 'melting', 'evaporation', 'freezing 0°C', 'boiling 100°C'],
  svg: `${table(200)}${emo('ice', '🧊', 58)}${emo('water', '💧', 50)}${emo('steam', '☁️', 50)}${emo('fire', '🔥', 34)}
    ${text('t', '−5°C', { size: 22, color: '#1784a6' })}${card('sol', 'solid', { w: 80, size: 16 })}${card('liq', 'liquid', { w: 80, size: 16 })}${card('gas', 'gas', { w: 80, size: 16 })}
    ${text('m', 'melting 0°C', { size: 13, color: '#ff7a59' })}${text('e', 'evaporation', { size: 13, color: '#ff7a59' })}${kittenActor('cat', 'excited', 40)}`,
  init: { ice: hid(70, 150), water: hid(180, 156), steam: hid(290, 140), fire: hid(180, 194), t: at(180, 40), sol: hid(70, 90), liq: hid(180, 90), gas: hid(290, 90), m: hid(124, 120), e: hid(234, 120), cat: at(310, 160) },
  caption0: 'Это лёд — solid, твёрдое. Он держит свою форму.',
  beats: beat(
    pop(200, ['ice', 'sol']),
    cap(2000, 'Нагреем… При 0°C лёд тает: это melting.'), setText(2000, 't', '0°C'), move(2600, 'ice', { x: 180, o: 0, s: 0.6 }, 1200), pop(3200, ['water', 'liq', 'm']),
    cap(4600, 'Вода — liquid, жидкость: течёт и принимает форму сосуда.'),
    cap(6800, 'Сильнее нагреем — вода испаряется: evaporation. При 100°C она кипит.'), pop(6800, 'fire'), setText(6800, 't', '100°C'),
    move(7400, 'water', { y: 130, o: 0 }, 1000), pop(7900, ['steam', 'gas', 'e']), move(8200, 'steam', { y: 110 }, 1500),
    cap(10000, 'Пар — gas. А если воду остудить до 0°C, она замёрзнет: freezing.'), mood(10000, 'cat', 'happy'),
  ),
});

// серия 2: растворяем соль и получаем её обратно
const salt = Array.from({ length: 6 }, (_, i) => `<g data-a="s${i}"><rect x="-3" y="-3" width="6" height="6" fill="#fff" stroke="#9aa5b4"/></g>`).join('');
const ep2 = episode({
  title: 'Соль спряталась',
  terms: ['dissolve (растворить)', 'solvent (растворитель)', 'evaporate'],
  svg: `<path d="M120 90 v100 q0 14 14 14 h92 q14 0 14 -14 v-100" fill="none" stroke="#9aa5b4" stroke-width="4"/><g data-a="w"><rect x="122" y="120" width="116" height="82" fill="#bde6f5"/></g>
    ${salt}${emo('shaker', '🧂', 40)}${card('solv', 'solvent = вода', { w: 150, size: 15, fill: '#eef7fb' })}${emo('sun', '☀️', 44)}${text('left', 'соль осталась!', { size: 15, color: '#16774a' })}
    ${kittenActor('cat', 'surprised', 40)}`,
  init: { w: at(0, 0), ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`s${i}`, at(150 + i * 12, 60, { o: 0 })])), shaker: hid(200, 40), solv: hid(290, 70), sun: hid(310, 140), left: hid(180, 226), cat: at(10, 150) },
  caption0: 'Насыплем соль в воду и помешаем.',
  beats: beat(
    pop(200, 'shaker'), ...Array.from({ length: 6 }, (_, i) => [[800 + i * 150, 'to', `s${i}`, { o: 1 }, 100], [800 + i * 150, 'to', `s${i}`, { y: 150 + (i % 3) * 14 }, 900, 'inOut']]),
    cap(2800, 'Соль исчезла из виду — она растворилась: dissolve.'), fade(2800, Array.from({ length: 6 }, (_, i) => `s${i}`), 0, 1200),
    cap(4800, 'То, в чём растворяют, — solvent, растворитель. Тут это вода.'), pop(4800, 'solv'),
    cap(7000, 'Как вернуть соль? Пусть вода испарится — evaporate!'), pop(7000, 'sun'), move(7500, 'w', { y: 80, o: 0 }, 2200),
    ...Array.from({ length: 6 }, (_, i) => [[9000, 'to', `s${i}`, { o: 1, y: 196 }, 400]]), pop(9400, 'left'), mood(9400, 'cat', 'happy'),
  ),
});

// серия 3: фильтр
const sand = Array.from({ length: 6 }, (_, i) => `<g data-a="g${i}"><circle r="4" fill="#d2a861"/></g>`).join('');
const drops = Array.from({ length: 4 }, (_, i) => `<g data-a="d${i}"><circle r="4" fill="#2bb3c9"/></g>`).join('');
const ep3 = episode({
  title: 'Фильтр',
  terms: ['filter (фильтр)', 'separate (разделить)'],
  svg: `<path d="M120 70 h120 l-46 60 v40 h-28 v-40 z" fill="#fff" stroke="#9aa5b4" stroke-width="4"/><path d="M130 76 h100 l-40 50 h-20 z" fill="#f3f5f8" stroke="#cfd6e0" stroke-dasharray="4 3"/>
    <rect x="140" y="190" width="80" height="40" rx="6" fill="none" stroke="#9aa5b4" stroke-width="3"/>${sand}${drops}${text('f', 'filter', { size: 16, color: '#5b6b83' })}
    ${text('r', 'песок не растворился — он на фильтре', { size: 14, color: '#b06200' })}${kittenActor('cat', 'thinking', 42)}`,
  init: { ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`g${i}`, at(140 + i * 16, 30, { o: 0 })])), ...Object.fromEntries(Array.from({ length: 4 }, (_, i) => [`d${i}`, at(150 + i * 20, 30, { o: 0 })])), f: hid(286, 100), r: hid(180, 52), cat: at(10, 150) },
  caption0: 'Песок с водой. Как их разделить?',
  beats: beat(
    ...Array.from({ length: 6 }, (_, i) => [[300 + i * 100, 'to', `g${i}`, { o: 1 }, 100], [700 + i * 100, 'to', `g${i}`, { y: 116 + (i % 2) * 6, x: 166 + i * 6 }, 900]]),
    ...Array.from({ length: 4 }, (_, i) => [[600 + i * 200, 'to', `d${i}`, { o: 1 }, 100], [900 + i * 300, 'to', `d${i}`, { x: 180, y: 210 }, 1500]]),
    pop(1500, 'f'), cap(1600, 'Нальём через фильтр. Вода проходит сквозь него…'),
    cap(4400, '…а песок не растворяется и остаётся на фильтре. Разделили!'), pop(4400, 'r'), mood(4400, 'cat', 'happy'),
  ),
});

// серия 4: магнит и ток (интерактив)
const ep4 = episode({
  title: 'Магнит и ток',
  terms: ['magnet (магнит)', 'iron (железо)', 'conductor (проводник)', 'insulator (изолятор)', 'copper'],
  svg: `${emo('mag', '🧲', 44)}${emo('nail', '🔩', 30)}${emo('wood', '🪵', 34)}${text('m', 'iron — да, wood — нет', { size: 14, color: '#16774a' })}
    <path d="M60 190 h240" stroke="#9aa5b4" stroke-width="3"/>${emo('bat', '🔋', 34)}${emo('bulb', '💡', 38)}
    ${card('cu', 'copper', { w: 90, size: 15, fill: '#fff3d6', stroke: '#d2a861' })}${card('rub', 'rubber', { w: 90, size: 15, fill: '#f3f5f8' })}<g data-a="glow"><circle r="22" fill="#ffcf3f" opacity=".45"/></g>
    ${text('c', 'conductor — пропускает ток', { size: 13, color: '#b06200' })}${text('i', 'insulator — не пропускает', { size: 13, color: '#5b6b83' })}${kittenActor('cat', 'excited', 38)}`,
  init: { mag: hid(60, 70), nail: hid(160, 74), wood: hid(250, 74), m: hid(180, 116), bat: hid(60, 188), bulb: hid(300, 182), glow: at(300, 178, { o: 0 }), cu: hid(140, 160), rub: hid(230, 160), c: hid(180, 222), i: hid(180, 236), cat: at(314, 4) },
  caption0: 'Магнит притягивает не всё!',
  beats: beat(
    pop(200, ['mag', 'nail', 'wood'], 200), move(1200, 'mag', { x: 110 }, 700), move(1600, 'nail', { x: 132 }, 400),
    cap(1600, 'Гвоздь из железа (iron) прыгнул к магниту. А дерево — нет.'), wiggle(2000, 'wood'), pop(2400, 'm'),
    cap(4600, 'Проводник (conductor) пропускает электрический ток. Медь (copper) — проводник.'), pop(4600, ['bat', 'bulb', 'cu'], 200), [[5600, 'to', 'glow', { o: 1 }, 300]], pop(5600, 'c'),
    cap(7600, 'Резина (rubber) и пластик — изоляторы: ток не идёт, лампа не горит.'), pop(7600, 'rub'), [[7600, 'to', 'glow', { o: 0 }, 300]], pop(8000, 'i'),
  ),
  interact: {
    type: 'tapShow', cat: 'cat',
    items: {
      cu: { show: ['glow', 'c'], say: 'Copper — медь — пропускает ток. Лампа горит!', mood: 'excited' },
      rub: { show: ['i'], say: 'Rubber — резина — ток не пропускает.', mood: 'thinking' },
    },
  },
});

// серия 5: обратимо или нет
const ep5 = episode({
  title: 'Можно вернуть?',
  terms: ['reversible change (обратимое)', 'irreversible (необратимое)'],
  svg: `${emo('choc', '🍫', 50)}<g data-a="melt"><ellipse rx="26" ry="9" fill="#7b4a2e"/><ellipse cx="-6" cy="-3" rx="8" ry="3" fill="#a06a46"/></g>${arrow('a1', 100, 70, 150, 70)}${arrow('a2', 210, 70, 260, 70)}${emo('choc2', '🍫', 50)}${text('rev', 'reversible — можно вернуть', { size: 15, color: '#16774a' })}
    ${emo('wood', '🪵', 46)}${emo('fire', '🔥', 46)}${emo('ash', '🌫️', 46)}${arrow('b1', 100, 170, 150, 170)}${arrow('b2', 210, 170, 260, 170)}${text('irr', 'горение назад не вернуть', { size: 15, color: '#c0392b' })}
    ${kittenActor('cat', 'thinking', 38)}`,
  init: { choc: hid(60, 70), melt: hid(180, 70), choc2: hid(300, 70), a1: { o: 0 }, a2: { o: 0 }, rev: hid(180, 116), wood: hid(60, 170), fire: hid(180, 170), ash: hid(300, 170), b1: { o: 0 }, b2: { o: 0 }, irr: hid(180, 216), cat: at(310, 110) },
  caption0: 'Шоколадку нагрели — она растаяла.',
  beats: beat(
    pop(200, 'choc'), [[800, 'to', 'a1', { o: 1 }, 100]], draw(800, 'a1L', 400), pop(1300, 'melt'),
    cap(2400, 'Остудили — и она снова твёрдая! Это reversible change.'), [[2400, 'to', 'a2', { o: 1 }, 100]], draw(2400, 'a2L', 400), pop(2900, ['choc2', 'rev']), mood(2900, 'cat', 'happy'),
    cap(5200, 'А дерево сгорело — пепел обратно деревом не станет.'), pop(5200, 'wood'), [[5700, 'to', 'b1', { o: 1 }, 100]], draw(5700, 'b1L', 400), pop(6100, 'fire'),
    [[6700, 'to', 'b2', { o: 1 }, 100]], draw(6700, 'b2L', 400), pop(7100, ['ash', 'irr']), mood(7100, 'cat', 'sad_soft'),
    cap(9000, 'Горение и выпечка торта — необратимые изменения.'),
  ),
});

export default {
  topic: 'science-1-3',
  kind: 'cartoon',
  episodes: [ep1, ep2, ep3, ep4, ep5],
  memo: [
    'Solid — твёрдое (держит форму), liquid — жидкость (течёт), gas — газ (заполняет всё место).',
    'Melting — таяние, freezing — замерзание (вода при 0°C), evaporation — испарение. Вода кипит при 100°C на уровне моря.',
    'Dissolve — растворить. Solvent — растворитель: то, в чём растворяют (вода).',
    'Filter задерживает нерастворившееся (песок). Соль из солёной воды получают испарением.',
    'Magnet притягивает iron (железо). Conductor (медь) пропускает ток, insulator (резина, пластик) — нет.',
    'Reversible change можно вернуть назад (таяние шоколада); горение — нельзя.',
  ],
};

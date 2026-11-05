// Остров 3 · Наука · Тема 1. Атомы, элементы, соединения и реакции — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const atom = (n, ch, color, r = 15) => `<g data-a="${n}"><circle r="${r}" fill="${color}"/><text y="5" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="13" fill="#fff">${ch}</text></g>`;

// серия 1: реакция — новое вещество, масса сохраняется
const ep1 = episode({
  title: 'Реакция',
  terms: ['химическая реакция — новое вещество', 'признаки: газ, цвет, тепло', 'масса сохраняется', 'оксид при горении'],
  svg: `<rect x="60" y="150" width="240" height="8" fill="#5b6b83"/><polygon points="175,150 185,150 180,140" fill="#5b6b83"/>
    ${atom('mg1', 'Mg', '#9aa5b4')}${atom('mg2', 'Mg', '#9aa5b4')}${atom('o1', 'O', '#e4553b')}${atom('o2', 'O', '#e4553b')}
    ${text('w1', '10 г', { size: 18 })}${text('w2', '10 г', { size: 18, color: '#16774a' })}${emo('fire', '🔥', 30)}
    ${text('pr', 'магний + кислород → оксид магния', { size: 14, color: '#b06200' })}${text('m', 'атомы не исчезают — масса та же', { size: 13, color: '#16774a' })}${kittenActor('cat', 'excited', 28)}`,
  init: { mg1: hid(110, 120), mg2: hid(150, 120), o1: hid(210, 120), o2: hid(250, 120), w1: hid(80, 180), w2: hid(280, 180), fire: hid(180, 70), pr: hid(180, 30), m: hid(180, 220), cat: at(318, 4) },
  caption0: 'Магний горит в кислороде.',
  beats: beat(
    pop(300, ['mg1', 'mg2', 'o1', 'o2'], 150), pop(1000, 'w1'), pop(1400, 'fire'),
    cap(1600, 'Атомы перестраиваются и соединяются по-новому: Mg + O → MgO.'), move(2400, 'o1', { x: 128, y: 100 }, 700), move(2400, 'o2', { x: 168, y: 100 }, 700), move(2400, 'mg2', { x: 168 }, 700), move(2400, 'mg1', { x: 128 }, 700),
    pop(3400, 'pr'), cap(3400, 'Появилось новое вещество — оксид магния. Это химическая реакция.'),
    cap(5400, 'Масса до и после одинакова: атомы не исчезают.'), pop(5400, ['w2', 'm'], 300), mood(5400, 'cat', 'happy'),
  ),
});

// серия 2: символы, группы, металл и кислота (интерактив)
const ep2 = episode({
  title: 'Таблица элементов',
  terms: ['химический символ (Na — натрий)', 'группа — столбец: похожие свойства', 'металл + кислота → водород'],
  svg: `${['H', 'Li', 'Na', 'K'].map((s, i) => card(`g${i}`, s, { w: 46, h: 40, size: 18, fill: '#fff3d6', stroke: '#f2c46d' })).join('')}${text('gt', 'один столбец = похожие свойства', { size: 13, color: '#b06200' })}
    ${card('na', 'Na — натрий', { w: 140, size: 16, fill: '#eef7fb' })}${emo('tube', '🧪', 40)}${[0, 1, 2].map((i) => `<g data-a="h${i}"><circle r="6" fill="none" stroke="#2bb3c9" stroke-width="2"/></g>`).join('')}
    ${text('ht', 'металл + кислота → водород (H₂)', { size: 14, color: '#1784a6' })}${kittenActor('cat', 'thinking', 26)}`,
  init: { g0: hid(60, 40), g1: hid(60, 86), g2: hid(60, 132), g3: hid(60, 178), gt: hid(160, 222), na: hid(220, 50), tube: hid(250, 150), h0: at(250, 130, { o: 0 }), h1: at(256, 130, { o: 0 }), h2: at(244, 130, { o: 0 }), ht: hid(220, 220), cat: at(318, 4) },
  caption0: 'У каждого элемента свой символ.',
  beats: beat(
    pop(300, 'na'), cap(800, 'Na — это натрий (от латинского Natrium).'),
    pop(2400, ['g0', 'g1', 'g2', 'g3'], 200), cap(2400, 'Элементы одного столбца (группы) ведут себя похоже.'), pop(3400, 'gt'),
    pop(5000, 'tube'), ...[0, 1, 2].map((i) => [[5400 + i * 300, 'to', `h${i}`, { o: 1 }, 100], [5400 + i * 300, 'to', `h${i}`, { y: 70 }, 1200]]),
    cap(5200, 'Металл в кислоте шипит: выделяются пузырьки водорода.'), pop(6400, 'ht'), mood(6400, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { na: { say: 'Na — натрий.' }, g2: { say: 'Na в той же группе, что Li и K: похожие свойства.' } } },
});

// серия 3: элемент, соединение, смесь
const ep3 = episode({
  title: 'Чистое или смесь',
  terms: ['элемент — атомы одного вида', 'соединение — H₂O', 'смесь — воздух, морская вода'],
  svg: `${atom('h1', 'H', '#2bb3c9', 11)}${atom('h2', 'H', '#2bb3c9', 11)}${atom('ow', 'O', '#e4553b')}${text('w', 'вода H₂O — соединение', { size: 14 })}
    ${emo('sea', '🌊', 40)}${text('s', 'морская вода — смесь: вода + соль', { size: 14, color: '#1784a6' })}${text('air', 'воздух — смесь газов', { size: 14, color: '#5b6b83' })}${kittenActor('cat', 'excited', 26)}`,
  init: { h1: hid(70, 56), h2: hid(110, 56), ow: hid(90, 80), w: hid(240, 70), sea: hid(70, 160), s: hid(230, 160), air: hid(230, 200), cat: at(318, 4) },
  caption0: 'Вода — соединение: атомы H и O связаны.',
  beats: beat(
    pop(300, ['ow', 'h1', 'h2'], 200), pop(1200, 'w'),
    cap(2600, 'А морская вода — смесь: соль просто растворена, не связана.'), pop(2600, ['sea', 's'], 300),
    pop(4400, 'air'), cap(4400, 'Воздух — тоже смесь разных газов.'), mood(4400, 'cat', 'happy'),
  ),
});

export default { topic: 'science-3-1', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

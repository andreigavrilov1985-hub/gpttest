// Остров 4 · География · Тема 4. Вода: дефицит и опреснение — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: откуда пресная вода
const ep1 = episode({
  title: 'Где пресная вода',
  terms: ['пресная вода — мало соли', 'реки и озёра', 'водоносный слой — вода под землёй', 'дефицит воды', 'орошение'],
  svg: `<rect x="0" y="0" width="360" height="110" fill="#e9f8ff"/><rect x="0" y="110" width="360" height="40" fill="#c9a77d"/><rect x="0" y="150" width="360" height="40" fill="#9adbe8"/><rect x="0" y="190" width="360" height="50" fill="#a77b5a"/>
    ${emo('lake', '🏞️', 40)}${text('aq', 'водоносный слой: вода в породе под землёй', { size: 12, color: '#1784a6' })}${emo('well', '⛲', 30)}
    ${card('def', 'дефицит: воды меньше, чем нужно людям', { w: 300, size: 13, fill: '#ffe9e4', stroke: '#f3c4bd' })}${emo('field', '🌾', 30)}${text('ir', 'орошение — полив полей', { size: 12, color: '#16774a' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { lake: hid(60, 70), aq: hid(180, 172), well: hid(280, 90), def: hid(180, 24), field: hid(170, 80), ir: hid(220, 100), cat: at(320, 4) },
  caption0: 'Пресная вода — с очень малым количеством соли.',
  beats: beat(
    pop(300, 'lake'), cap(800, 'Её берут из рек и озёр…'), pop(2000, ['aq', 'well'], 400), cap(2000, '…и из-под земли: водоносный слой — порода, пропитанная водой.'),
    pop(4000, ['field', 'ir'], 300), cap(4000, 'Много воды уходит на орошение — полив полей.'),
    pop(5600, 'def'), cap(5600, 'Если людей много, а дождей мало, воды не хватает — это дефицит.'), mood(5600, 'cat', 'sad_soft'),
  ),
});

// серия 2: опреснение и Аральское море
const salt = Array.from({ length: 4 }, (_, i) => `<g data-a="s${i}"><rect x="-3" y="-3" width="6" height="6" fill="#fff" stroke="#9aa5b4"/></g>`).join('');
const ep2 = episode({
  title: 'Опреснение',
  terms: ['опреснение — убрать соль из морской воды', 'ОАЭ: мало пресной воды, рядом море', 'Аральское море высохло из-за отвода рек', 'экономия воды'],
  svg: `<rect x="0" y="120" width="140" height="120" fill="#5bbfd6"/>${salt}${emo('plant', '🏭', 44)}${emo('tap', '🚰', 36)}
    ${text('d', 'морская вода → завод → пресная', { size: 13, color: '#1784a6' })}${card('aral', 'Аральское море высохло: воду рек отвели на поля', { w: 330, size: 12, fill: '#fff3d6', stroke: '#f2c46d' })}
    ${card('save', 'закрывай кран, когда чистишь зубы 🪥', { w: 290, size: 13, fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'excited', 22)}`,
  init: { ...Object.fromEntries([0, 1, 2, 3].map((i) => [`s${i}`, at(30 + i * 25, 160)])), plant: at(190, 160), tap: at(300, 160, { o: 0 }), d: hid(180, 104), aral: hid(180, 40), save: hid(180, 220), cat: at(4, 4) },
  caption0: 'В ОАЭ мало рек, зато рядом море. Но морская вода солёная.',
  beats: beat(
    ...[0, 1, 2, 3].map((i) => move(600 + i * 200, `s${i}`, { x: 190, y: 160 }, 800)), fade(1600, ['s0', 's1', 's2', 's3']),
    [[1800, 'to', 'tap', { o: 1 }, 400]], pop(2200, 'd'), cap(1400, 'Завод убирает соль — это опреснение. Получается пресная вода.'),
    pop(4000, 'aral'), cap(4000, 'Аральское море почти высохло: воду питавших его рек отвели на орошение.'),
    pop(6000, 'save'), cap(6000, 'Воду надо беречь.'), mood(6000, 'cat', 'happy'),
  ),
});

ep2.interact = { type: 'tapShow', cat: 'cat', items: { plant: { say: 'Опреснительный завод убирает соль из морской воды.' }, tap: { say: 'Так в ОАЭ получают большую часть питьевой воды.' } } };

export default { topic: 'geography-4-4', kind: 'cartoon', episodes: [ep1, ep2] };

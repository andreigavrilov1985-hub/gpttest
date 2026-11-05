// Остров 2 · Английский · Тема 2. Сравнения, can/must, союзы, времена — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const W = (name, w, o = {}) => card(name, w, { w: 110, size: 18, lang: 'en', ...o });

// серия 1: сравнения
const ep1 = episode({
  title: 'Больше, выше, интереснее',
  terms: ['сравнительная степень -er / more', 'превосходная степень -est / the most', 'heavy → heavier'],
  svg: `${emo('b1', '📦', 34)}${emo('b2', '📦', 50)}${W('h1', 'heavy')}${W('h2', 'heavier', { fill: '#fff3d6', stroke: '#f2c46d' })}
    ${emo('k1', '🧒', 30)}${emo('k2', '👧', 40)}${emo('k3', '👩', 52)}${W('t3', 'the tallest', { w: 130, fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${card('more', 'long words: more interesting', { w: 280, size: 15, lang: 'en', fill: '#eef7fb' })}${kittenActor('cat', 'excited', 30)}`,
  init: { b1: hid(50, 60), b2: hid(140, 56), h1: hid(50, 104), h2: hid(140, 104), k1: hid(210, 70), k2: hid(250, 64), k3: hid(296, 56), t3: hid(270, 112), more: hid(180, 200), cat: at(4, 150) },
  caption0: 'Сравниваем две вещи: добавляем -er.',
  beats: beat(
    pop(300, ['b1', 'h1', 'b2', 'h2'], 200), cap(1100, 'This box is heavier than that one. Heavy → heavier: y меняется на i.'),
    pop(3400, ['k1', 'k2', 'k3'], 200), cap(3400, 'Самый из всех — the …-est: She is the tallest girl.'), pop(4200, 't3'),
    cap(6000, 'Длинные слова сравниваем через more: more interesting.'), pop(6000, 'more'), mood(6000, 'cat', 'happy'),
  ),
});

// серия 2: can и must
const ep2 = episode({
  title: 'Можно и нужно',
  terms: ['can = могу, умею', 'must = должен, обязан', 'правило, закон'],
  svg: `${emo('car', '🚗', 50)}${emo('belt', '🔒', 34)}${W('must', 'must', { fill: '#ffe9e4', stroke: '#f3c4bd', color: '#c0392b' })}${text('m1', 'You must wear a seatbelt — обязан, это закон', { size: 13, color: '#c0392b' })}
    ${emo('swim', '🏊', 44)}${W('can', 'can', { fill: '#e2f8ea', stroke: '#9fdcb9', color: '#16774a' })}${text('m2', 'I can swim — я умею, могу', { size: 14, color: '#16774a' })}${kittenActor('cat', 'thinking', 34)}`,
  init: { car: hid(60, 60), belt: hid(110, 60), must: hid(240, 60), m1: hid(180, 104), swim: hid(60, 170), can: hid(240, 170), m2: hid(180, 212), cat: at(310, 110) },
  caption0: 'Must — «должен». Это правило, без выбора.',
  beats: beat(
    pop(300, ['car', 'belt', 'must'], 250), cap(1200, 'You must wear a seatbelt in a car. It is the law.'), pop(1800, 'm1'), mood(1800, 'cat', 'surprised'),
    pop(4000, ['swim', 'can'], 250), cap(4000, 'Can — «могу, умею»: I can swim.'), pop(4600, 'm2'), mood(4600, 'cat', 'happy'),
  ),
});

// серия 3: союзы so и but (интерактив)
const ep3 = episode({
  title: 'Слова-мостики',
  terms: ['союз (conjunction)', 'so = поэтому', 'but = но', 'and = и'],
  svg: `${card('a1', 'I was tired', { w: 140, size: 16, lang: 'en' })}${card('a2', 'I went to bed', { w: 150, size: 16, lang: 'en' })}${W('so', 'so', { w: 60, fill: '#fff3d6', stroke: '#f2c46d' })}${emo('bed', '🛏️', 34)}
    ${card('b1', 'I like tennis', { w: 130, size: 15, lang: 'en' })}${card('b2', "I don't like football", { w: 176, size: 13, lang: 'en' })}${W('but', 'but', { w: 60, fill: '#ffe9e4', stroke: '#f3c4bd' })}
    ${text('so2', 'so — поэтому (следствие)', { size: 13, color: '#b06200' })}${text('but2', 'but — но (противопоставление)', { size: 13, color: '#c0392b' })}${kittenActor('cat', 'sleepy', 30)}`,
  init: { a1: hid(80, 40), so: hid(180, 40), a2: hid(270, 40), bed: hid(330, 80), so2: hid(180, 80), b1: hid(70, 150), but: hid(166, 150), b2: hid(268, 150), but2: hid(180, 190), cat: at(4, 196) },
  caption0: 'Союзы соединяют части предложения, как мостики.',
  beats: beat(
    pop(300, ['a1', 'a2'], 200), cap(1100, 'Я устал — что из этого вышло?'), pop(2000, 'so'), cap(2000, 'I was tired, so I went to bed. So — «поэтому».'), pop(2600, ['bed', 'so2']),
    pop(4400, ['b1', 'b2'], 200), cap(4400, 'Теннис нравится, футбол — нет. Это противоположности…'), pop(5600, ['but', 'but2'], 300), cap(5600, 'I like tennis, but I don\'t like football. But — «но».'), mood(5600, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { so: { say: 'So — поэтому: из первого следует второе.' }, but: { say: 'But — но: вторая часть спорит с первой.' } } },
});

// серия 4: present perfect, наречие, if … will
const ep4 = episode({
  title: 'Уже сделал',
  terms: ['present perfect: have/has + seen/finished', 'наречие -ly (quickly)', 'if … will'],
  svg: `${emo('film', '🎬', 40)}${W('pp', 'I have seen', { w: 150, fill: '#eef7fb' })}${text('pp2', 'have/has + 3-я форма: seen, finished — «уже»', { size: 13, color: '#1784a6' })}
    ${emo('run', '🏃', 40)}${W('q', 'quick', { w: 100 })}${text('q2', '+ly: КАК?', { size: 15, color: '#b06200' })}
    ${card('iff', 'If it rains, we will stay at home.', { w: 300, size: 15, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}${emo('rain', '🌧️', 30)}${kittenActor('cat', 'excited', 30)}`,
  init: { film: hid(40, 40), pp: hid(140, 40), pp2: hid(180, 76), run: hid(40, 120), q: hid(130, 120), q2: hid(250, 124), iff: hid(180, 190), rain: hid(330, 160), cat: at(316, 4) },
  caption0: 'Present perfect — «уже сделал»: результат сейчас.',
  beats: beat(
    pop(300, ['film', 'pp'], 250), cap(1000, 'I have seen this film twice. She has finished her homework.'), pop(1600, 'pp2'),
    pop(3600, ['run', 'q'], 250), move(3800, 'run', { x: 80 }, 400), setText(4400, 'qT', 'quickly'), pop(4400, 'q2'),
    cap(4400, 'Наречие говорит, КАК делаем: quickly — быстро.'),
    pop(6400, ['rain', 'iff'], 250), cap(6400, 'If + настоящее время, will + глагол: if it rains, we will stay.'), mood(6400, 'cat', 'happy'),
  ),
});

export default { topic: 'english-2-2', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

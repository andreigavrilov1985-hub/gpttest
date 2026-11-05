// Остров 3 · Английский · Тема 1. Идиомы, корни слов, формальные слова — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const W = (name, w, o = {}) => card(name, w, { w: 120, size: 17, lang: 'en', ...o });

// серия 1: идиомы
const ep1 = episode({
  title: 'Идиомы',
  terms: ['идиома — смысл не по словам', 'a piece of cake = очень легко', 'under the weather = нездоровится'],
  svg: `${emo('cake', '🍰', 46)}${W('i1', 'a piece of cake', { w: 170 })}${text('m1', '= очень легко!', { size: 16, color: '#16774a' })}
    ${emo('sick', '🤒', 46)}${W('i2', 'under the weather', { w: 190 })}${text('m2', '= мне нездоровится', { size: 16, color: '#16774a' })}${kittenActor('cat', 'surprised', 30)}`,
  init: { cake: hid(50, 60), i1: hid(180, 60), m1: hid(180, 100), sick: hid(50, 160), i2: hid(190, 160), m2: hid(190, 200), cat: at(318, 4) },
  caption0: 'Идиома — выражение, смысл которого не сложить из отдельных слов.',
  beats: beat(
    pop(300, ['cake', 'i1'], 300), cap(1400, '«The test was a piece of cake» — не про торт! Это значит: было очень легко.'), pop(2400, 'm1'), mood(2400, 'cat', 'happy'),
    pop(4400, ['sick', 'i2'], 300), cap(4400, '«I am under the weather» — не про погоду, а «мне нездоровится».'), pop(5400, 'm2'),
  ),
});

// серия 2: корни слов (интерактив)
const ep2 = episode({
  title: 'Корни слов',
  terms: ['корень слова', 'bio = жизнь', 'aqua = вода', 'tele = далеко', 'graph = писать'],
  svg: `${card('bio', 'bio', { w: 80, size: 20, fill: '#e2f8ea', stroke: '#9fdcb9' })}${card('aqua', 'aqua', { w: 80, size: 20, fill: '#eef7fb' })}${card('tele', 'tele', { w: 80, size: 20, fill: '#fff3d6', stroke: '#f2c46d' })}
    ${text('b2', 'жизнь: biology', { size: 13 })}${text('a2', 'вода: aquarium', { size: 13 })}${text('t2', 'далеко: telephone', { size: 13 })}${emo('e1', '🌱', 30)}${emo('e2', '🐠', 30)}${emo('e3', '📞', 30)}${kittenActor('cat', 'thinking', 28)}`,
  init: { bio: hid(70, 50), aqua: hid(180, 50), tele: hid(290, 50), e1: hid(70, 100), e2: hid(180, 100), e3: hid(290, 100), b2: hid(70, 140), a2: hid(180, 140), t2: hid(290, 140), cat: at(4, 196) },
  caption0: 'Корень — главная часть слова. Знаешь корень — угадаешь слово!',
  beats: beat(
    pop(300, ['bio', 'aqua', 'tele'], 200),
    cap(1400, 'Bio — жизнь: biology — наука о живом.'), pop(1400, ['e1', 'b2']),
    cap(3200, 'Aqua — вода: aquarium.'), pop(3200, ['e2', 'a2']),
    cap(4800, 'Tele — далеко: telephone — говорить издалека.'), pop(4800, ['e3', 't2']), mood(4800, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: {
    bio: { show: ['e1', 'b2'], say: 'Bio — жизнь.' }, aqua: { show: ['e2', 'a2'], say: 'Aqua — вода.' }, tele: { show: ['e3', 't2'], say: 'Tele — далеко.' },
  } },
});

// серия 3: формальные и оттенки
const ep3 = episode({
  title: 'Формально и с оттенком',
  terms: ['формальный синоним (get → obtain)', 'положительный и отрицательный оттенок', 'thrilling, kind, mean'],
  svg: `${W('g', 'get')}${W('ob', 'obtain', { fill: '#eef7fb' })}${text('ar', '→', { size: 24, color: '#ff7a59' })}${text('fm', 'formal — официально', { size: 13, color: '#1784a6' })}
    ${W('sl', 'slim', { fill: '#e2f8ea', stroke: '#9fdcb9' })}${W('sk', 'scrawny', { fill: '#ffe9e4', stroke: '#f3c4bd' })}${text('pos', '😊 приятно', { size: 13, color: '#16774a' })}${text('neg', '😕 обидно', { size: 13, color: '#c0392b' })}
    ${card('ex', 'thrilling — very exciting; selfish ↔ generous', { w: 330, size: 13, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'excited', 28)}`,
  init: { g: hid(80, 40), ar: hid(180, 44), ob: hid(270, 40), fm: hid(180, 76), sl: hid(80, 130), sk: hid(270, 130), pos: hid(80, 164), neg: hid(270, 164), ex: hid(180, 210), cat: at(4, 196) },
  caption0: 'В официальном письме выбираем формальные слова.',
  beats: beat(
    pop(300, ['g', 'ar', 'ob'], 250), cap(1000, 'Get → obtain. Значит то же, но звучит официально.'), pop(1800, 'fm'),
    cap(3600, 'У слов есть оттенок: slim (стройный) — приятно, scrawny (тощий) — обидно.'), pop(3600, ['sl', 'pos', 'sk', 'neg'], 250),
    cap(6000, 'Смотри на оттенок и контекст.'), pop(6000, 'ex'), mood(6000, 'cat', 'happy'),
  ),
});

export default { topic: 'english-3-1', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

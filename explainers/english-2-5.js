// Остров 2 · Английский · Тема 5. Аудирование — мини-мультфильм
// Примеры свои (не из аудиозаписей), чтобы мультик учил способу, а не давал ответы.
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: похожие числа
const ep1 = episode({
  title: 'Похожие числа',
  terms: ['-teen и -ty', 'fifteen (15) / fifty (50)', 'ударение'],
  svg: `${emo('ear', '👂', 46)}${card('a', 'fifTEEN = 15', { w: 170, size: 18, lang: 'en', fill: '#eef7fb' })}${card('b', 'FIFty = 50', { w: 150, size: 18, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}
    ${text('t', '-teen долгое в конце · -ty короткое', { size: 14, color: '#5b6b83' })}${text('ex', 'thirteen 13 · thirty 30 · forty 40', { size: 14, color: '#1784a6' })}${kittenActor('cat', 'thinking', 36)}`,
  init: { ear: hid(50, 60), a: hid(190, 50), b: hid(190, 100), t: hid(180, 150), ex: hid(180, 184), cat: at(4, 170) },
  caption0: 'Некоторые числа звучат почти одинаково. Слушай конец!',
  beats: beat(
    pop(300, 'ear'), pop(900, 'a'), cap(1000, 'Fifteen — ударение в конце, долгое «-tiin»: 15.'), move(1600, 'a', { s: 1.15 }, 300), move(1900, 'a', { s: 1 }, 300),
    pop(3000, 'b'), cap(3000, 'Fifty — ударение в начале, короткое «-ti»: 50.'), move(3600, 'b', { s: 1.15 }, 300), move(3900, 'b', { s: 1 }, 300),
    pop(5000, ['t', 'ex'], 300), cap(5000, 'Так же: thirteen и thirty, fourteen и forty.'), mood(5000, 'cat', 'happy'),
  ),
});

// серия 2: объявления — правила и запреты
const ep2 = episode({
  title: 'Объявление',
  terms: ['must = обязательно', 'not allowed / do not = нельзя', 'please'],
  svg: `${emo('spk', '📢', 46)}${card('s1', 'Please keep your bags with you.', { w: 280, size: 14, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${card('s2', 'Running is not allowed.', { w: 230, size: 15, lang: 'en', fill: '#ffe9e4', stroke: '#f3c4bd' })}${emo('run', '🏃', 34)}<g data-a="no"><circle r="20" fill="none" stroke="#e8574a" stroke-width="4"/><path d="M-14 -14 L14 14" stroke="#e8574a" stroke-width="4"/></g>
    ${text('m', 'must — нужно · not allowed — нельзя', { size: 14, color: '#5b6b83' })}${kittenActor('cat', 'surprised', 34)}`,
  init: { spk: hid(40, 60), s1: hid(200, 50), s2: hid(190, 110), run: hid(320, 110), no: hid(320, 110), m: hid(180, 180), cat: at(4, 170) },
  caption0: 'В объявлениях говорят, что можно, что нужно и что нельзя.',
  beats: beat(
    pop(300, ['spk', 's1'], 300), cap(1200, 'Please keep… — просьба: так нужно делать.'),
    pop(3000, ['s2', 'run', 'no'], 250), cap(3000, 'Not allowed — запрещено! Бегать нельзя.'),
    pop(5000, 'm'), cap(5000, 'Вопрос «What is NOT allowed?» — ищи слова not allowed или don’t.'), mood(5000, 'cat', 'happy'),
  ),
});

// серия 3: планы — going to, дни, время, цена (интерактив)
const ep3 = episode({
  title: 'Планы и цифры',
  terms: ['going to = собираюсь', 'дни недели', "время o'clock", 'цена'],
  svg: `${card('p', "I'm going to visit my uncle on Friday.", { w: 320, size: 14, lang: 'en' })}
    ${card('day', 'Friday', { w: 100, size: 18, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${card('tm', "six o'clock", { w: 120, size: 17, lang: 'en', fill: '#eef7fb' })}${card('pr', 'ten dirhams', { w: 130, size: 17, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${emo('cal', '📅', 30)}${emo('clock', '🕕', 30)}${emo('coin', '🪙', 30)}${text('g', 'going to — план на будущее', { size: 14, color: '#1784a6' })}${kittenActor('cat', 'excited', 32)}`,
  init: { p: hid(180, 40), g: hid(180, 76), day: hid(70, 140), tm: hid(180, 140), pr: hid(300, 140), cal: hid(70, 180), clock: hid(180, 180), coin: hid(300, 180), cat: at(4, 190) },
  caption0: 'Going to — «собираюсь»: это план.',
  beats: beat(
    pop(300, ['p', 'g'], 400), cap(1400, 'Лови в записи: КОГДА (день, время) и СКОЛЬКО (цена, число).'),
    pop(3000, ['day', 'cal'], 200), pop(3800, ['tm', 'clock'], 200), pop(4600, ['pr', 'coin'], 200),
    cap(5400, 'Нажми на карточку — котёнок переведёт.'), mood(5400, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: {
    day: { say: 'Friday — пятница.' }, tm: { say: "Six o'clock — ровно шесть часов." }, pr: { say: 'Ten dirhams — десять дирхамов.' },
  } },
});

export default { topic: 'english-2-5', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

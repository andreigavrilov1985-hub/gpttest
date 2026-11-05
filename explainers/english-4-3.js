// Остров 4 · Английский · Тема 3. Чтение с пониманием — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: причина и следствие, доля, контраст yet
const ep1 = episode({
  title: 'Факты в тексте',
  terms: ['причина — следствие (causes)', 'доли: a quarter, half, a third', 'yet — неожиданный контраст'],
  svg: `${card('t1', 'Too much rain causes floods.', { w: 260, size: 14, lang: 'en' })}${emo('rain', '🌧️', 30)}${text('ar', '→', { size: 26, color: '#ff7a59' })}${emo('flood', '🌊', 30)}
    ${card('fr', 'a quarter = ¼ · half = ½ · a third = ⅓', { w: 300, size: 14, fill: '#eef7fb' })}${card('y', 'It is small, yet very strong.', { w: 250, size: 14, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${text('y2', 'yet — «и всё же»: неожиданно', { size: 12, color: '#b06200' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { t1: hid(180, 30), rain: hid(140, 72), ar: hid(180, 76), flood: hid(220, 72), fr: hid(180, 126), y: hid(180, 178), y2: hid(180, 208), cat: at(320, 200) },
  caption0: 'Слово causes — «вызывает»: перед ним причина, после — следствие.',
  beats: beat(
    pop(300, 't1'), pop(1200, ['rain', 'ar', 'flood'], 300),
    cap(2800, 'Доли в тексте: a quarter — четверть, half — половина.'), pop(2800, 'fr'),
    cap(4600, 'Yet показывает неожиданный контраст: маленький, а всё-таки сильный.'), pop(4600, ['y', 'y2'], 300), mood(4600, 'cat', 'happy'),
  ),
});

// серия 2: чувства героя и цель текста
const ep2 = episode({
  title: 'Чувства и цель',
  terms: ['показать чувство через детали', 'цель текста: inform / persuade / entertain', 'риторический вопрос — приём убеждения'],
  svg: `${card('d', 'Tom bit his nails and looked at the clock.', { w: 330, size: 13, lang: 'en' })}${emo('f', '😟', 36)}${text('f2', 'детали показывают: он нервничает', { size: 13, color: '#1784a6' })}
    ${['inform', 'persuade', 'entertain'].map((w, i) => card(`p${i}`, w, { w: 100, size: 15, lang: 'en', fill: ['#eef7fb', '#fff3d6', '#e2f8ea'][i] })).join('')}
    ${text('ps', '«Who wouldn\'t want a greener school?» — убеждает', { size: 12, color: '#b06200' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { d: hid(180, 30), f: hid(40, 80), f2: hid(200, 80), p0: hid(70, 150), p1: hid(180, 150), p2: hid(290, 150), ps: hid(180, 196), cat: at(320, 200) },
  caption0: 'Автор не всегда пишет «он волновался». Он показывает это деталями.',
  beats: beat(
    pop(300, 'd'), pop(1400, ['f', 'f2'], 300), cap(1400, 'Грызёт ногти, смотрит на часы — значит, нервничает.'),
    cap(3400, 'Зачем написан текст? Сообщить, убедить или развлечь.'), pop(3400, ['p0', 'p1', 'p2'], 300),
    cap(5400, 'Вопрос, на который «ответ очевиден», — приём убеждения.'), pop(5400, 'ps'), mood(5400, 'cat', 'happy'),
  ),
});

ep2.interact = { type: 'tapShow', cat: 'cat', items: { p0: { say: 'Inform — сообщить факты.' }, p1: { say: 'Persuade — убедить читателя.' }, p2: { say: 'Entertain — развлечь, рассказать историю.' } } };

export default { topic: 'english-4-3', kind: 'cartoon', episodes: [ep1, ep2] };

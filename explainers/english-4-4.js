// Остров 4 · Английский · Тема 4. Правописание и письмо — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: ошибки в предложениях
const ep1 = episode({
  title: 'Найди ошибку',
  terms: ['Standard English (we were, not we was)', "could have, а не could of", 'comma splice — два предложения через запятую', 'фрагмент — неполное предложение'],
  svg: `${card('a', 'We was happy.', { w: 160, size: 15, lang: 'en', fill: '#ffe9e4', stroke: '#f3c4bd' })}${card('b', 'I could of won.', { w: 160, size: 15, lang: 'en', fill: '#ffe9e4', stroke: '#f3c4bd' })}
    ${card('c', 'It was cold, we stayed in.', { w: 230, size: 14, lang: 'en', fill: '#ffe9e4', stroke: '#f3c4bd' })}${card('d', 'Because I was tired.', { w: 200, size: 14, lang: 'en', fill: '#ffe9e4', stroke: '#f3c4bd' })}${text('h', 'нажми — котёнок исправит', { size: 12, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { a: hid(100, 40), b: hid(270, 40), c: hid(180, 100), d: hid(180, 156), h: hid(180, 196), cat: at(320, 200) },
  caption0: 'В каждой карточке ошибка. Найдём!',
  beats: beat(
    pop(300, ['a', 'b', 'c', 'd'], 300), pop(1600, 'h'),
    setText(2400, 'aT', 'We were happy.'), cap(2400, 'We were — так в стандартном английском.'),
    setText(3800, 'bT', 'I could have won.'), cap(3800, 'Could have — а не «could of».'),
    setText(5200, 'cT', 'It was cold, so we stayed in.'), cap(5200, 'Два предложения через запятую — ошибка. Нужен союз или точка.'),
    setText(7000, 'dT', 'I slept because I was tired.'), cap(7000, '«Because I was tired.» — неполное предложение. Добавим главную часть.'), mood(7000, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: {
    a: { say: 'We were — с we всегда were.' }, b: { say: 'Could have, а не could of.' }, c: { say: 'Между двумя предложениями нужен союз или точка.' }, d: { say: 'Это фрагмент: нет главной части.' },
  } },
});

// серия 2: слова и стиль
const ep2 = episode({
  title: 'Слова и стиль',
  terms: ['affect — глагол (влиять), effect — результат', 'accommodation: cc и mm', "children's — у слов без s", 'however — контраст', 'In conclusion — вывод', 'формальный стиль'],
  svg: `${card('af', 'Rain will affect the match.', { w: 240, size: 14, lang: 'en' })}${card('ef', 'The effect was huge.', { w: 200, size: 14, lang: 'en', fill: '#eef7fb' })}
    ${card('acc', 'a-cc-o-mm-odation', { w: 210, size: 16, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${card('ch', "the children's books", { w: 210, size: 14, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${text('lk', 'However — контраст · In conclusion — итог', { size: 13, color: '#1784a6' })}${kittenActor('cat', 'excited', 22)}`,
  init: { af: hid(130, 30), ef: hid(240, 72), acc: hid(180, 120), ch: hid(180, 164), lk: hid(180, 206), cat: at(320, 200) },
  caption0: 'Affect — глагол «влиять». Effect — существительное «результат».',
  beats: beat(
    pop(300, ['af', 'ef'], 600),
    cap(2400, 'Accommodation — две c и две m.'), pop(2400, 'acc'),
    cap(4000, "Children — уже множественное, поэтому апостроф и s: children's."), pop(4000, 'ch'),
    cap(5800, 'Слова-связки: however — «однако», in conclusion — «в заключение».'), pop(5800, 'lk'), mood(5800, 'cat', 'happy'),
  ),
});

export default { topic: 'english-4-4', kind: 'cartoon', episodes: [ep1, ep2] };

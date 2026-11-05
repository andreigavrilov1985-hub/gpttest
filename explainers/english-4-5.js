// Остров 4 · Английский · Тема 5. Аудирование — мини-мультфильм (примеры свои, не из записей)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: изменения в объявлении
const ep1 = episode({
  title: 'Что изменилось?',
  terms: ['instead of — вместо', 'delayed by — задержан на', 'запоминай последнюю (новую) информацию'],
  svg: `${emo('st', '🚉', 40)}${card('p1', 'gate 3', { w: 100, size: 18, lang: 'en', fill: '#f3f5f8' })}${card('p2', 'gate 8', { w: 100, size: 18, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${card('ann', '…will now leave from gate 8 instead of gate 3.', { w: 340, size: 13, lang: 'en' })}${card('del', 'delayed by fifteen minutes = на 15 минут позже', { w: 330, size: 13, fill: '#eef7fb' })}${kittenActor('cat', 'thinking', 24)}`,
  init: { st: hid(40, 50), p1: hid(150, 50), p2: hid(270, 50), ann: hid(180, 110), del: hid(180, 170), cat: at(4, 196) },
  caption0: 'В объявлениях часто что-то меняют. Лови новую информацию!',
  beats: beat(
    pop(300, ['st', 'p1'], 300), pop(1200, 'ann'), cap(1200, '«Instead of gate 3» — вместо третьего. Новый выход — 8.'), move(2400, 'p1', { o: 0.3 }, 300), pop(2600, 'p2'),
    cap(4200, 'Delayed by — на сколько задержали.'), pop(4200, 'del'), mood(4200, 'cat', 'happy'),
  ),
});

// серия 2: интервью — советы и трудности
const ep2 = episode({
  title: 'Интервью',
  terms: ['the hardest part — самое трудное', 'my advice is… — совет', 'at first … but now… — как изменилось'],
  svg: `${emo('mic', '🎤', 40)}${card('a', 'At first I could only swim 50 metres, but now…', { w: 330, size: 12, lang: 'en' })}${card('b', 'The hardest part was getting up early.', { w: 310, size: 13, lang: 'en', fill: '#ffe9e4', stroke: '#f3c4bd' })}
    ${card('c', 'My advice is: practise a little every day.', { w: 320, size: 13, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'excited', 24)}`,
  init: { mic: hid(30, 40), a: hid(190, 40), b: hid(180, 104), c: hid(180, 164), cat: at(4, 196) },
  caption0: 'В интервью ответы часто начинаются с подсказок.',
  beats: beat(
    pop(300, ['mic', 'a'], 300), cap(1000, 'At first… but now… — сравни, как было и как стало.'),
    pop(2800, 'b'), cap(2800, 'The hardest part — самое трудное. Ответ сразу после этих слов.'),
    pop(4600, 'c'), cap(4600, 'My advice is… — дальше будет совет.'), mood(4600, 'cat', 'happy'),
  ),
});

ep2.interact = { type: 'tapShow', cat: 'cat', items: { b: { say: 'The hardest part — «самое трудное».' }, c: { say: 'My advice is — «мой совет».' } } };

export default { topic: 'english-4-5', kind: 'cartoon', episodes: [ep1, ep2] };

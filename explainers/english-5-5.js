// Остров 5 · Английский · Тема 5. Аудирование — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat } from '../js/cartoon-kit.js';

// серия 1: слушаем ключевые слова
const ep1 = episode({
  title: 'Ловим главное',
  terms: ['перед прослушиванием прочитай вопрос', 'слушай ключевые слова: числа, время, места', 'when → время, how many → число, how … feel → чувство'],
  svg: `${emo('ear', '👂', 40)}${emo('spk', '🔊', 34)}${card('q', 'When will the library open?', { w: 240, size: 13, lang: 'en' })}
    ${['The', 'new', 'library', 'will', 'open', 'next month'].map((w, i) => card(`w${i}`, w, { w: w.length * 9 + 22, h: 30, size: 12, lang: 'en', fill: '#fff' })).join('')}
    ${card('h', 'when → ищем время', { w: 170, size: 13, fill: '#fff3d6', stroke: '#f2c46d' })}${text('n', 'how many → число · how tall → размер', { size: 12, color: '#6d3ad1' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { ear: at(40, 40), spk: hid(40, 130), q: hid(200, 40), ...Object.fromEntries([0, 1, 2, 3, 4, 5].map((i) => [`w${i}`, at(80, 130, { o: 0 })])), h: hid(200, 80), n: hid(180, 210), cat: at(320, 200) },
  caption0: 'Сначала читаем вопрос и решаем, что ловить.',
  beats: beat(
    pop(300, 'q'), pop(1200, 'h'), cap(1200, 'When — «когда»: ждём слова о времени.'),
    pop(2400, 'spk'), [0, 1, 2, 3, 4, 5].map((i) => [[2600 + i * 450, 'to', `w${i}`, { o: 1, x: 120 + i * 40 - (i > 4 ? 0 : 0), y: 130 + (i % 2) * 30 }, 500], [3600 + i * 450, 'to', `w${i}`, i === 5 ? { x: 250, y: 160, s: 1.2 } : { o: 0.2 }, 500]]),
    mark(6400, 'w5'), cap(5200, 'Остальное — фон. Ключ — next month.'),
    pop(7200, 'n'), cap(7200, 'Другие вопросы — другие ключи: числа, размеры, чувства.'), mood(7200, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { w5: { say: 'next month — вот ответ на when.' }, h: { say: 'when → время.' } } },
});

// серия 2: числа на слух
const ep2 = episode({
  title: 'Числа на слух',
  terms: ['eight hundred and twenty-eight = 828', 'over fifty thousand = больше 50 000', 'in 2010 — «twenty ten»', 'mind changed: before … now …'],
  svg: `${emo('bk', '🏙️', 50)}${card('a', 'eight hundred and twenty-eight → 828 m', { w: 300, size: 12, lang: 'en' })}${card('b', 'over fifty thousand → > 50 000', { w: 260, size: 12, lang: 'en', fill: '#eef7fb' })}
    ${card('c', 'twenty ten → 2010', { w: 180, size: 13, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${card('d', 'before: boring… now: my favourite!', { w: 290, size: 12, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'excited', 22)}`,
  init: { bk: at(30, 40), a: hid(200, 30), b: hid(190, 80), c: hid(150, 130), d: hid(180, 180), cat: at(320, 214) },
  caption0: 'Числа в речи звучат длинно — переводи их в цифры.',
  beats: beat(
    pop(300, 'a'), cap(300, 'Eight hundred and twenty-eight — это 828.'), pop(1800, 'b'), cap(1800, 'Over — «больше чем».'),
    pop(3300, 'c'), cap(3300, 'Годы читают парами: twenty ten = 2010.'), pop(4800, 'd'), cap(4800, 'Слушай слова before и now — так видно, что мнение изменилось.'), mood(4800, 'cat', 'happy'),
  ),
});

export default { topic: 'english-5-5', kind: 'cartoon', episodes: [ep1, ep2] };

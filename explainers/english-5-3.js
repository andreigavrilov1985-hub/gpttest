// Остров 5 · Английский · Тема 3. Чтение с анализом — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat } from '../js/cartoon-kit.js';

// серия 1: образные средства
const ep1 = episode({
  title: 'Как пишет автор',
  terms: ['simile — сравнение с like/as', 'personification — неживое ведёт себя как живое', 'mood — настроение текста', 'yet — вводит контраст'],
  svg: `${emo('house', '🏚️', 60)}${emo('moon', '🌙', 30)}${card('sim', 'quiet like a forgotten promise → simile', { w: 320, size: 12, lang: 'en' })}
    ${card('per', 'the house itself was breathing → personification', { w: 330, size: 12, lang: 'en', fill: '#eef7fb' })}${text('md', 'mood: eerie and lonely (жутко и одиноко)', { size: 12, color: '#6d3ad1' })}
    ${card('yet', 'It was old, yet warm. → yet = контраст', { w: 280, size: 12, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { house: at(60, 70), moon: hid(120, 30), sim: hid(180, 132), per: hid(180, 172), md: hid(230, 70), yet: hid(180, 214), cat: at(320, 4) },
  caption0: 'Писатель рисует словами старый дом ночью.',
  beats: beat(
    pop(300, 'moon'), pop(1200, 'sim'), cap(1200, 'Сравнение со словом like или as — simile.'),
    [[2800, 'to', 'house', { s: 1.08 }, 600], [3400, 'to', 'house', { s: 1 }, 600], [4000, 'to', 'house', { s: 1.08 }, 600], [4600, 'to', 'house', { s: 1 }, 600]],
    pop(2800, 'per'), cap(2800, 'Дом «дышит» — неживое ведёт себя как живое: personification.'),
    pop(5000, 'md'), cap(5000, 'Вместе они создают настроение — mood.'), pop(6600, 'yet'), cap(6600, 'Yet — «однако»: дальше будет контраст.'), mood(6600, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { sim: { say: 'like/as → сравнение (simile).' }, per: { say: 'Дом дышит, как живой → personification.' } } },
});

// серия 2: факты и мнение в статье
const ep2 = episode({
  title: 'Факт или мнение',
  terms: ['факт — числа и данные из текста', 'мнение автора — что он думает', 'perhaps — автор не уверен', 'отвечай по тексту, а не по догадке'],
  svg: `${card('a', '1,000 teens · 62% sleep < 8 h', { w: 250, size: 13, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}${text('fa', 'факты — ищи числа в тексте', { size: 12, color: '#16774a' })}
    ${card('b', 'Perhaps the problem is how we use social media.', { w: 340, size: 12, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${text('op', 'мнение автора; perhaps — «возможно», он не уверен', { size: 12, color: '#b06200' })}
    ${emo('mag', '🔍', 30)}${kittenActor('cat', 'excited', 22)}`,
  init: { a: hid(160, 40), fa: hid(160, 74), b: hid(180, 130), op: hid(180, 164), mag: at(30, 210), cat: at(320, 4) },
  caption0: 'Читаем статью о сне подростков.',
  beats: beat(
    pop(300, 'a'), move(800, 'mag', { x: 160, y: 40 }, 900), pop(1600, 'fa'), cap(1600, 'Факты — числа: сколько участвовало, сколько процентов.'),
    pop(3200, 'b'), move(3400, 'mag', { x: 330, y: 100 }, 900), pop(4200, 'op'), cap(3400, 'Мнение — что думает автор. Слово perhaps показывает сомнение.'),
    cap(5800, 'Отвечай, опираясь на слова из текста.'), mood(5800, 'cat', 'happy'),
  ),
});

export default { topic: 'english-5-3', kind: 'cartoon', episodes: [ep1, ep2] };

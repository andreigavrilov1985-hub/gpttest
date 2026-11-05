// Остров 3 · Английский · Тема 3. Чтение с пониманием — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const line = (name, s, w = 320) => card(name, s, { w, h: 30, size: 13, lang: 'en' });

// серия 1: заголовок и главная мысль
const ep1 = episode({
  title: 'О чём весь текст?',
  terms: ['главная мысль', 'лучший заголовок'],
  svg: `${line('a', 'Ants live in big groups called colonies.')}${line('b', 'Each ant has a job: some find food,')}${line('c', 'some guard the nest, some care for babies.')}
    ${card('t1', 'Ants Are Small', { w: 160, size: 14, lang: 'en', fill: '#f3f5f8' })}${card('t2', 'How Ants Work Together', { w: 200, size: 14, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'thinking', 28)}`,
  init: { a: hid(180, 30), b: hid(180, 66), c: hid(180, 102), t1: hid(100, 170), t2: hid(250, 170), cat: at(4, 196) },
  caption0: 'Какой заголовок подходит лучше всего?',
  beats: beat(
    pop(300, ['a', 'b', 'c'], 300), cap(1200, 'Ищем, о чём ВСЕ предложения вместе, а не одно.'), pop(3000, ['t1', 't2'], 300),
    cap(3600, '«Муравьи маленькие» — правда, но текст не об этом.'), move(4400, 't1', { o: 0.4 }, 400),
    cap(5400, 'Текст — о том, как муравьи работают вместе. Это и есть главная мысль.'), move(5400, 't2', { s: 1.15 }, 300), mood(5400, 'cat', 'happy'),
  ),
});

// серия 2: слова-сигналы и настроение
const ep2 = episode({
  title: 'Слова подсказывают',
  terms: ['however — противопоставление', 'сильные глаголы передают настроение', 'зачем герой так сказал'],
  svg: `${line('h1', 'Phones are useful. However, they can distract us.', 340)}${card('hw', 'However', { w: 100, size: 16, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${text('h2', '→ сейчас будет «но», другая сторона', { size: 13, color: '#b06200' })}
    ${line('s1', 'The thunder roared over the house.', 300)}${emo('storm', '⛈️', 40)}${text('s2', 'roared (ревел) → громко и страшно', { size: 13, color: '#1784a6' })}${kittenActor('cat', 'surprised', 28)}`,
  init: { h1: hid(180, 30), hw: hid(80, 70), h2: hid(220, 70), s1: hid(180, 140), storm: hid(330, 140), s2: hid(180, 180), cat: at(4, 196) },
  caption0: 'Маленькие слова подсказывают, куда идёт текст.',
  beats: beat(
    pop(300, 'h1'), pop(1000, ['hw', 'h2'], 300), cap(1000, 'However — «однако»: автор показывает контраст, другую сторону.'),
    pop(3400, ['s1', 'storm'], 300), cap(3400, 'Глагол roared («ревел») говорит: гром был громким и страшным.'), pop(4600, 's2'), mood(4600, 'cat', 'surprised'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { t1: { say: 'Слишком узко: про размер муравьёв в тексте почти ничего.' }, t2: { say: 'Да! Весь текст о том, как муравьи работают вместе.', mood: 'celebrate' } } };

export default { topic: 'english-3-3', kind: 'cartoon', episodes: [ep1, ep2] };

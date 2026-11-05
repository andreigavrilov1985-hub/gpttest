// Остров 1 · Английский · Тема 3. Чтение с пониманием — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat } from '../js/cartoon-kit.js';

const word = (name, w, x, y) => `<text data-a="${name}" font-family="Nunito" font-weight="700" font-size="16" fill="#23324a" lang="en">${w}</text>`;
const sentence = (prefix, words, x0, y, gap = 7) => {
  // returns svg + init positions for each word (approx 9px per letter)
  let x = x0;
  const svg = [];
  const init = {};
  words.forEach((w, i) => {
    svg.push(word(`${prefix}${i}`, w));
    init[`${prefix}${i}`] = at(x, y, { o: 0 });
    x += w.length * 9.2 + gap;
  });
  return { svg: svg.join(''), init };
};

// серия 1: ищем ключевое слово
const s1 = sentence('w', ['Sam', 'has', 'a', 'small', 'dog', 'called', 'Max.'], 28, 70);
const ep1 = episode({
  title: 'Найди слово-ключ',
  terms: ['текст', 'вопрос к тексту', 'ключевое слово'],
  svg: `<rect x="16" y="40" width="328" height="50" rx="12" fill="#fff" stroke="#cfe6ef" stroke-width="3"/>${s1.svg}
    ${card('q', "What is the dog's name?", { w: 250, size: 17, fill: '#eef7fb', lang: 'en' })}${emo('glass', '🔍', 34)}${emo('dog', '🐶', 46)}
    ${card('ans', 'Max', { w: 90, size: 22, fill: '#e2f8ea', stroke: '#9fdcb9', lang: 'en' })}${kittenActor('cat', 'thinking', 44)}`,
  init: { ...s1.init, q: hid(180, 130), glass: hid(40, 72), dog: hid(300, 180), ans: hid(180, 190), cat: at(6, 160) },
  caption0: 'Котёнок читает текст.',
  beats: beat(
    ...Object.keys(s1.init).map((n, i) => [[200 + i * 220, 'to', n, { o: 1 }, 250]]),
    cap(2200, 'Сначала читаем вопрос: «Как зовут собаку?»'), pop(2200, 'q'),
    cap(4200, 'Ищем в тексте нужное место: dog… called…'), pop(4200, 'glass'),
    move(4400, 'glass', { x: 200 }, 900), move(5400, 'glass', { x: 300 }, 700),
    mark(6100, 'w6'), cap(6200, 'Вот оно: called Max. Ответ — Max!'), pop(6200, ['dog', 'ans']), mood(6200, 'cat', 'happy'),
    cap(8400, 'Ответ всегда прячется в тексте. Не угадывай — найди!'),
  ),
});

// серия 2: почему? — ищем because / so
const s2 = sentence('v', ['It', 'is', 'very', 'hot,', 'so', 'she', 'goes', 'swimming.'], 20, 70, 6);
const ep2 = episode({
  title: 'Почему?',
  terms: ['причина', 'so', 'because', 'why'],
  svg: `<rect x="12" y="40" width="336" height="50" rx="12" fill="#fff" stroke="#cfe6ef" stroke-width="3"/>${s2.svg}
    ${emo('sun', '☀️', 44)}${emo('swim', '🏊', 44)}${text('arrow', '→', { size: 40, color: '#ff7a59' })}${card('why', 'Why does she swim?', { w: 220, size: 17, fill: '#eef7fb', lang: 'en' })}
    ${text('tip', 'so — поэтому · because — потому что', { size: 14, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 40)}`,
  init: { ...s2.init, sun: hid(100, 160), swim: hid(260, 160), arrow: hid(180, 162), why: hid(180, 116), tip: hid(180, 222), cat: at(306, 150) },
  caption0: 'Вопрос why — «почему?»',
  beats: beat(
    ...Object.keys(s2.init).map((n, i) => [[200 + i * 180, 'to', n, { o: 1 }, 250]]),
    pop(1800, 'why'), cap(1800, 'Почему она плавает? Ищем слова so или because.'),
    mark(3800, 'v4'), cap(3800, 'So — «поэтому». До него причина, после — следствие.'),
    pop(4600, 'sun'), pop(5200, 'arrow'), pop(5800, 'swim'),
    cap(6800, 'Очень жарко → поэтому она плавает. Ответ: It is very hot.'), mood(6800, 'cat', 'happy'), pop(8600, 'tip'),
  ),
});

// серия 3: значение слова по тексту (интерактив)
const ep3 = episode({
  title: 'Что значит слово?',
  terms: ['значение слова по тексту', 'cooler', 'nectar', 'hive'],
  svg: `${card('c', 'cooler', { w: 110, size: 20, fill: '#eef7fb', lang: 'en' })}${card('n', 'nectar', { w: 110, size: 20, fill: '#fff3d6', stroke: '#f2c46d', lang: 'en' })}${card('h', 'hive', { w: 110, size: 20, fill: '#e2f8ea', stroke: '#9fdcb9', lang: 'en' })}
    ${emo('therm', '🌡️', 38)}${emo('flower', '🌸', 38)}${emo('beehive', '🍯', 38)}${emo('bee', '🐝', 26)}
    ${text('c2', 'менее жарко', { size: 14 })}${text('n2', 'сок цветов', { size: 14 })}${text('h2', 'улей', { size: 14 })}
    ${kittenActor('cat', 'excited', 40)}`,
  init: { c: hid(60, 50), n: hid(180, 50), h: hid(300, 50), therm: hid(60, 110), flower: hid(180, 110), beehive: hid(300, 110), bee: hid(180, 80), c2: hid(60, 150), n2: hid(180, 150), h2: hid(300, 150), cat: at(160, 170) },
  caption0: 'Нажми на слово — котёнок покажет, что оно значит!',
  beats: beat(
    pop(300, ['c', 'n', 'h'], 250),
    cap(2200, 'Evening, when it is cooler — вечером прохладнее, менее жарко.'), pop(2200, ['therm', 'c2']),
    cap(4600, 'A bee collects nectar — пчела собирает сладкий сок цветов.'), pop(4600, ['flower', 'bee', 'n2']),
    move(5400, 'bee', { x: 300, y: 80 }, 1200, 'hop'),
    cap(7200, 'Hive — улей, дом пчёл. Там нектар становится мёдом.'), pop(7200, ['beehive', 'h2']), mood(7200, 'cat', 'happy'),
  ),
  interact: {
    type: 'tapShow', cat: 'cat',
    items: {
      c: { show: ['therm', 'c2'], say: 'Cooler — прохладнее, менее жарко.', mood: 'happy' },
      n: { show: ['flower', 'n2'], say: 'Nectar — сладкий сок цветов.', mood: 'happy' },
      h: { show: ['beehive', 'h2'], say: 'Hive — улей, дом пчёл.', mood: 'happy' },
    },
  },
});

export default {
  topic: 'english-1-3',
  kind: 'cartoon',
  episodes: [ep1, ep2, ep3],
};

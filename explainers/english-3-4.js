// Остров 3 · Английский · Тема 4. Правописание и пунктуация — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: двоеточие, точка с запятой, прямая речь
const ep1 = episode({
  title: 'Знаки',
  terms: ['colon (:) — перед списком', 'semicolon (;) — две связанные мысли', 'кавычки и прямая речь'],
  svg: `${card('c', 'Bring two things: a pen and a ruler.', { w: 320, size: 14, lang: 'en' })}${text('c2', ': — дальше список или пояснение', { size: 13, color: '#ff7a59' })}
    ${card('s', 'It was late; we went home.', { w: 260, size: 14, lang: 'en', fill: '#eef7fb' })}${text('s2', '; — соединяет два целых предложения', { size: 13, color: '#1784a6' })}
    ${card('q', '"Is it ready?" asked Dad.', { w: 240, size: 14, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${text('q2', 'знак вопроса — внутри кавычек', { size: 13, color: '#b06200' })}${kittenActor('cat', 'thinking', 26)}`,
  init: { c: hid(180, 30), c2: hid(180, 62), s: hid(180, 100), s2: hid(180, 132), q: hid(180, 172), q2: hid(180, 204), cat: at(318, 196) },
  caption0: 'Двоеточие объявляет: сейчас будет список!',
  beats: beat(
    pop(300, 'c'), pop(1000, 'c2'),
    cap(2600, 'Точка с запятой соединяет две законченные мысли, которые связаны.'), pop(2600, ['s', 's2'], 300),
    cap(4800, 'В прямой речи знак стоит внутри кавычек: "Is it ready?" asked Dad.'), pop(4800, ['q', 'q2'], 300), mood(4800, 'cat', 'happy'),
  ),
});

// серия 2: апостроф во множественном числе и трудные слова (интерактив)
const ep2 = episode({
  title: 'Апостроф и трудные слова',
  terms: ["the boys' bikes — после s у множественного", 'i before e except after c', 'удвоение согласной (occurred)'],
  svg: `${emo('b1', '🚲', 28)}${emo('b2', '🚲', 28)}${emo('b3', '🚲', 28)}${card('ap', "the boys' bikes", { w: 170, size: 16, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${text('ap2', "много мальчиков: s'", { size: 13, color: '#b06200' })}
    ${card('w1', 'believe', { w: 100, size: 16, lang: 'en' })}${card('w2', 'ceiling', { w: 100, size: 16, lang: 'en' })}${card('w3', 'travelled', { w: 110, size: 16, lang: 'en' })}${text('hint', 'нажимай на слова', { size: 12, color: '#5b6b83' })}${kittenActor('cat', 'excited', 26)}`,
  init: { b1: hid(40, 40), b2: hid(70, 40), b3: hid(100, 40), ap: hid(230, 40), ap2: hid(230, 72), w1: hid(70, 140), w2: hid(180, 140), w3: hid(295, 140), hint: hid(180, 176), cat: at(4, 196) },
  caption0: 'Велосипеды нескольких мальчиков.',
  beats: beat(
    pop(300, ['b1', 'b2', 'b3', 'ap'], 150), cap(1000, 'Мальчиков много — boys. Апостроф ставим после s: the boys’ bikes.'), pop(1600, 'ap2'),
    pop(3400, ['w1', 'w2', 'w3', 'hint'], 200), cap(3400, 'Трудные слова тоже подчиняются правилам. Нажми на них!'), mood(3400, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: {
    w1: { say: 'Believe: i перед e…' }, w2: { say: '…кроме после c: ceiling, receive.' }, w3: { say: 'Travelled: согласную на конце удваиваем, как в occurred.' },
  } },
});

// серия 3: PEE и официальное письмо
const ep3 = episode({
  title: 'Абзац PEE и письмо',
  terms: ['PEE: Point, Evidence, Explain', 'Evidence — факт или цитата из текста', 'официальное письмо: Dear Sir/Madam,'],
  svg: `${card('p', 'P — Point: моя мысль', { w: 240, size: 14, fill: '#fff3d6', stroke: '#f2c46d' })}${card('e', 'E — Evidence: факт или цитата из текста', { w: 320, size: 13, fill: '#eef7fb' })}${card('x', 'E — Explain: почему это доказывает', { w: 300, size: 13, fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${card('dear', 'Dear Sir or Madam,', { w: 200, size: 15, lang: 'en' })}${emo('env', '✉️', 30)}${kittenActor('cat', 'thinking', 26)}`,
  init: { p: hid(180, 30), e: hid(180, 72), x: hid(180, 114), env: hid(80, 190), dear: hid(200, 190), cat: at(318, 196) },
  caption0: 'Хороший абзац строится по схеме PEE.',
  beats: beat(
    pop(300, 'p'), cap(800, 'Point — твоя мысль.'), pop(1800, 'e'), cap(1800, 'Evidence — доказательство: факт или цитата из текста.'),
    pop(3600, 'x'), cap(3600, 'Explain — объясни, почему это доказывает мысль.'),
    cap(5400, 'Официальное письмо начинаем вежливо: Dear Sir or Madam, или Dear + должность.'), pop(5400, ['env', 'dear'], 200), mood(5400, 'cat', 'happy'),
  ),
});

export default { topic: 'english-3-4', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

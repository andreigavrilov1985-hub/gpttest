// Остров 1 · Английский · Тема 1. Словарный запас: противоположности и синонимы — мини-мультфильм
import { card, text, emo, say, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, wiggle, episode, beat } from '../js/cartoon-kit.js';

const W = (name, word, color = '#1784a6', w = 96) => card(name, word, { w, size: 20, color, lang: 'en' });

// серия 1: противоположности (antonyms)
const ep1 = episode({
  title: 'Противоположности',
  terms: ['антоним (opposite)', 'hot / cold', 'fast / slow', 'open / close'],
  svg: `${emo('tea', '☕', 40)}${emo('ice', '🧊', 40)}${W('hot', 'hot', '#e4553b')}${W('cold', 'cold')}${text('vs', '↔', { size: 30, color: '#9aa5b4' })}
    ${emo('rab', '🐇', 34)}${emo('tur', '🐢', 34)}${card('fast', 'fast', { w: 76, h: 30, size: 17, color: '#e4553b', lang: 'en' })}${card('slow', 'slow', { w: 76, h: 30, size: 17, color: '#1784a6', lang: 'en' })}${emo('flag', '🏁', 30)}
    ${kittenActor('cat', 'surprised', 50)}`,
  init: {
    tea: hid(80, 60), ice: hid(280, 60), hot: hid(80, 106), cold: hid(280, 106), vs: hid(180, 106),
    rab: at(20, 170, { o: 0 }), tur: at(20, 206, { o: 0 }), fast: hid(300, 140), slow: hid(200, 222), flag: at(330, 188, { o: 0 }), cat: at(152, 30, { o: 0 }),
  },
  caption0: 'Антонимы — слова с противоположным значением.',
  beats: beat(
    pop(500, ['tea', 'hot']), cap(1200, 'Hot — горячий. Ой, котёнок обжёг лапку!'), [[1200, 'to', 'cat', { o: 1 }, 300]], wiggle(1500, 'tea'),
    pop(3200, ['ice', 'cold']), pop(3600, 'vs'), cap(3200, 'Cold — холодный. Hot ↔ cold — противоположности.'), mood(3400, 'cat', 'happy'),
    cap(5800, 'Fast — быстрый, slow — медленный. Гонка!'), [[5800, 'to', 'rab', { o: 1 }, 300], [5800, 'to', 'tur', { o: 1 }, 300], [5800, 'to', 'flag', { o: 1 }, 300]],
    move(6400, 'rab', { x: 300 }, 1200, 'out'), move(6400, 'tur', { x: 110 }, 3600, 'linear'),
    pop(7000, 'fast'), pop(8000, 'slow'),
    cap(10200, 'Так же: open ↔ close, happy ↔ sad.'), mood(10200, 'cat', 'excited'),
  ),
});

// серия 2: синонимы
const ep2 = episode({
  title: 'Синонимы',
  terms: ['синоним (means the same)', 'big = large', 'begin = start', 'tiny = very small'],
  svg: `${emo('ele', '🐘', 64)}${W('big', 'big', '#9b5cf6')}${W('large', 'large', '#9b5cf6')}${text('eq', '=', { size: 30, color: '#16774a' })}
    ${emo('ant', '🐜', 22)}${W('tiny', 'tiny', '#1784a6')}${card('vs', 'very small', { w: 120, size: 18, color: '#1784a6', lang: 'en' })}
    ${W('begin', 'begin', '#ff7a59')}${W('start', 'start', '#ff7a59')}${kittenActor('cat', 'excited', 46)}`,
  init: {
    ele: hid(180, 70), big: hid(90, 130), large: hid(270, 130), eq: hid(180, 132), ant: hid(60, 196), tiny: hid(120, 196), vs: hid(240, 196),
    begin: hid(90, 30), start: hid(270, 30), cat: at(300, 150),
  },
  caption0: 'Синонимы — слова, которые значат почти одно и то же.',
  beats: beat(
    pop(400, 'ele'), pop(1000, ['big', 'large'], 400),
    cap(1800, 'Слон big и слон large — он одинаково большой!'),
    move(3200, 'big', { x: 118 }, 600), move(3200, 'large', { x: 242 }, 600), pop(3700, 'eq'),
    cap(4000, 'big = large'), mood(4000, 'cat', 'happy'),
    cap(5600, 'Tiny — крошечный, то есть very small.'), pop(5600, ['ant', 'tiny', 'vs'], 300),
    cap(8000, 'Begin и start — оба значат «начинать».'), pop(8000, ['begin', 'start'], 300),
  ),
});

// серия 3: части речи (интерактив: нажми на слово)
const ep3 = episode({
  title: 'Слова-помощники',
  terms: ['существительное (noun)', 'глагол (verb)', 'прилагательное (adjective)'],
  svg: `${card('wTable', 'table', { w: 90, size: 20, fill: '#fff3d6', stroke: '#f2c46d', lang: 'en' })}${card('wRun', 'run', { w: 90, size: 20, fill: '#e2f8ea', stroke: '#9fdcb9', lang: 'en' })}${card('wTall', 'tall', { w: 90, size: 20, fill: '#efe7ff', stroke: '#c8b5f5', lang: 'en' })}
    ${emo('table', '🪑', 40)}${emo('runner', '🏃', 40)}${emo('giraffe', '🦒', 54)}
    ${text('n', 'noun', { size: 15, color: '#b06200' })}${text('v', 'verb', { size: 15, color: '#16774a' })}${text('a', 'adjective', { size: 15, color: '#6d3ad1' })}
    ${kittenActor('cat', 'thinking', 44)}`,
  init: {
    wTable: hid(70, 60), wRun: hid(180, 60), wTall: hid(290, 60), table: hid(70, 130), runner: hid(150, 130), giraffe: hid(290, 130),
    n: hid(70, 176), v: hid(180, 176), a: hid(290, 176), cat: at(10, 180),
  },
  caption0: 'Нажимай на слова: что они умеют?',
  beats: beat(
    pop(400, ['wTable', 'wRun', 'wTall'], 250),
    cap(2600, 'Noun — существительное: называет предмет. Table — стол.'), pop(2600, ['table', 'n']),
    cap(5000, 'Verb — глагол: действие. Run — бегать!'), pop(5000, ['runner', 'v']), move(5300, 'runner', { x: 210 }, 900),
    cap(7600, 'Adjective — прилагательное: какой предмет. Tall — высокий.'), pop(7600, ['giraffe', 'a']), move(7900, 'giraffe', { s: 1.25 }, 600),
    mood(8000, 'cat', 'happy'),
  ),
  interact: {
    type: 'tapShow', cat: 'cat',
    items: {
      wTable: { show: ['table', 'n'], say: 'Table — стол. Это noun: предмет.', mood: 'happy' },
      wRun: { show: ['runner', 'v'], say: 'Run — бегать. Это verb: действие.', mood: 'excited' },
      wTall: { show: ['giraffe', 'a'], say: 'Tall — высокий. Это adjective: какой?', mood: 'happy' },
    },
  },
});

// серия 4: одно слово — два значения
const ep4 = episode({
  title: 'Хитрое слово cold',
  terms: ['многозначное слово', 'caught a cold', 'смысл по соседним словам'],
  svg: `${W('cold', 'cold', '#1784a6', 110)}${emo('snow', '❄️', 40)}${emo('sick', '🤧', 46)}${text('m1', 'холодный', { size: 16 })}${text('m2', 'простуда', { size: 16 })}
    ${card('sent', 'I caught a cold', { w: 190, size: 20, lang: 'en' })}${kittenActor('cat', 'sad_soft', 50)}`,
  init: { cold: hid(180, 40), snow: hid(90, 110), sick: hid(270, 110), m1: hid(90, 150), m2: hid(270, 150), sent: hid(180, 200), cat: at(4, 150) },
  caption0: 'У слова cold два значения.',
  beats: beat(
    pop(300, 'cold'), cap(1200, 'Первое — холодный: cold water.'), pop(1200, ['snow', 'm1']),
    cap(3400, 'Второе — простуда. Апчхи!'), pop(3400, ['sick', 'm2']), wiggle(3800, 'cat'),
    cap(5800, 'Соседние слова подсказывают: I caught a cold — я заболел простудой.'), pop(5800, 'sent'),
    mood(7600, 'cat', 'happy'), cap(8400, 'Не знаешь слово — посмотри, что стоит рядом!'),
  ),
});

export default { topic: 'english-1-1', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

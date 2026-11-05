// Остров 4 · Английский · Тема 1. Образный язык — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const D = [
  ['si', 'simile', 'as fast as a cheetah', 'сравнение через as / like', '🐆'],
  ['me', 'metaphor', 'My room is a zoo.', 'метафора: одно названо другим', '🦓'],
  ['pe', 'personification', 'The sun smiled at us.', 'олицетворение: вещь ведёт себя как человек', '🌞'],
  ['hy', 'hyperbole', "I'm so hungry I could eat a horse!", 'гипербола: сильное преувеличение', '🐴'],
  ['al', 'alliteration', 'Busy bees buzz.', 'аллитерация: одинаковые первые звуки', '🐝'],
  ['on', 'onomatopoeia', 'bang, crash, buzz', 'звукоподражание', '💥'],
];

// серия 1: приёмы (интерактив)
const ep1 = episode({
  title: 'Приёмы писателей',
  terms: D.map(([, n, , r]) => `${n} — ${r}`),
  svg: `${D.map(([k, n, , , e]) => card(k, `${e} ${n}`, { w: 160, h: 34, size: 13, lang: 'en' })).join('')}${kittenActor('cat', 'excited', 24)}`,
  init: { ...Object.fromEntries(D.map(([k], i) => [k, hid(i % 2 ? 260 : 100, 34 + Math.floor(i / 2) * 50)])), cat: at(166, 196) },
  caption0: 'Писатели раскрашивают текст особыми приёмами.',
  beats: beat(D.map(([k, n, ex, r], i) => [[700 + i * 1300, 'to', k, { o: 1, s: 1 }, 400, 'back'], [700 + i * 1300, 'cap', `«${ex}» — ${r}.`]]), mood(8600, 'cat', 'happy')),
  interact: { type: 'tapShow', cat: 'cat', items: Object.fromEntries(D.map(([k, , ex, r]) => [k, { say: `«${ex}» — ${r}.` }])) },
});

// серия 2: оттенки смысла
const ep2 = episode({
  title: 'Что хотел сказать автор',
  terms: ['ominous — зловещий, предвещающий плохое', 'ambiguous — двусмысленный', 'sarcasm — говорят противоположное', 'euphemism — мягкое слово вместо грубого'],
  svg: `${emo('cloud', '⛈️', 40)}${card('om', 'ominous clouds — зловещие тучи', { w: 270, size: 13 })}${card('am', 'ambiguous — можно понять двумя способами', { w: 320, size: 13, fill: '#eef7fb' })}
    ${card('sa', '«Great, it\'s raining again!» — сарказм', { w: 300, size: 13, fill: '#fff3d6', stroke: '#f2c46d' })}${card('eu', 'passed away вместо died — эвфемизм', { w: 300, size: 13, fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'thinking', 24)}`,
  init: { cloud: hid(30, 40), om: hid(200, 40), am: hid(180, 92), sa: hid(180, 144), eu: hid(180, 196), cat: at(4, 196) },
  caption0: 'Слова могут передавать настроение и скрытый смысл.',
  beats: beat(
    pop(300, ['cloud', 'om'], 300), cap(800, 'Ominous — зловещий: кажется, будет что-то плохое.'),
    pop(2600, 'am'), cap(2600, 'Ambiguous — двусмысленный: можно понять по-разному.'),
    pop(4400, 'sa'), cap(4400, 'Сарказм: говорят «отлично!», а имеют в виду обратное.'),
    pop(6200, 'eu'), cap(6200, 'Эвфемизм — мягкое вежливое слово вместо неприятного.'), mood(6200, 'cat', 'happy'),
  ),
});

export default { topic: 'english-4-1', kind: 'cartoon', episodes: [ep1, ep2] };

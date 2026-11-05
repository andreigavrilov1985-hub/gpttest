// Остров 5 · Английский · Тема 1. Сложные слова — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat } from '../js/cartoon-kit.js';

// серия 1: слова-картинки (интерактив)
const W = [
  ['u', 'ubiquitous', 'везде', '📱'], ['e', 'ephemeral', 'очень недолгий', '🫧'], ['m', 'mitigate', 'смягчить', '🩹'],
  ['i', 'inevitable', 'неизбежный', '🌅'], ['s', 'scrutinise', 'изучать пристально', '🔍'], ['p', 'pragmatic', 'практичный', '🧰'],
];
const ep1 = episode({
  title: 'Слова-картинки',
  terms: W.map(([, en, ru]) => `${en} — ${ru}`),
  svg: `${W.map(([k, en, , e]) => `${emo(`${k}i`, e, 28)}${card(k, en, { w: 130, h: 34, size: 13, lang: 'en' })}`).join('')}${kittenActor('cat', 'thinking', 22)}`,
  init: { ...Object.fromEntries(W.flatMap(([k], i) => [[`${k}i`, hid(30 + (i % 2) * 165, 40 + Math.floor(i / 2) * 64)], [k, hid(110 + (i % 2) * 165, 40 + Math.floor(i / 2) * 64)]])), cat: at(320, 200) },
  caption0: 'Сложное слово легче запомнить с картинкой.',
  beats: beat(W.map(([k, en, ru], i) => [[400 + i * 1300, 'to', `${k}i`, { o: 1, s: 1 }, 400, 'back'], [500 + i * 1300, 'to', k, { o: 1, s: 1 }, 400, 'back'], [500 + i * 1300, 'cap', `${en} — ${ru}.`]]), mood(8200, 'cat', 'happy')),
  interact: { type: 'tapShow', cat: 'cat', items: Object.fromEntries(W.map(([k, en, ru]) => [k, { say: `${en} — ${ru}` }])) },
});

// серия 2: антонимы, ирония, коннотация
const ep2 = episode({
  title: 'Оттенки смысла',
  terms: ['scarce — редкий ↔ plentiful — обильный', 'benign — безвредный', 'ирония — происходит противоположное ожидаемому', 'коннотация — чувство, которое вызывает слово (home — тепло)'],
  svg: `${emo('w1', '💧', 24)}${emo('w2', '💧💧💧💧', 24)}${text('sc', 'scarce ↔ plentiful', { size: 15, color: '#1784a6' })}${card('be', 'benign = harmless (безвредный)', { w: 250, size: 13, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${emo('fs', '🚒', 32)}${emo('fire', '🔥', 30)}${text('ir', 'ирония: пожарная часть сгорела', { size: 13, color: '#c0392b' })}
    ${card('ho', 'house — здание · home — тепло и уют', { w: 280, size: 13, fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'excited', 22)}`,
  init: { w1: hid(50, 30), w2: hid(290, 30), sc: hid(170, 30), be: hid(180, 72), fs: hid(60, 130), fire: hid(60, 108), ir: hid(210, 130), ho: hid(180, 190), cat: at(320, 214) },
  caption0: 'Scarce — редкий, чего мало. Его противоположность — plentiful.',
  beats: beat(
    pop(300, ['w1', 'sc', 'w2'], 400), pop(2000, 'be'), cap(2000, 'Benign — безвредный (например, о болезни).'),
    pop(3600, 'fs'), pop(4200, 'fire'), pop(4600, 'ir'), cap(3600, 'Ирония — когда выходит наоборот: горит сама пожарная часть!'),
    pop(6200, 'ho'), cap(6200, 'Коннотация — оттенок чувства: home звучит теплее, чем house.'), mood(6200, 'cat', 'happy'),
  ),
});

export default { topic: 'english-5-1', kind: 'cartoon', episodes: [ep1, ep2] };

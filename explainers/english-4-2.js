// Остров 4 · Английский · Тема 2. Сложные времена и условные предложения — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: present perfect continuous, third conditional, reported speech
const ep1 = episode({
  title: 'Сложные времена',
  terms: ['present perfect continuous: has been …-ing', 'third conditional: If I had …, I would have …', 'косвенная речь: will → would', 'passive future: will be done'],
  svg: `${emo('clock', '⏳', 34)}${card('pp', 'He has been reading for an hour.', { w: 300, size: 14, lang: 'en' })}${text('pp2', 'началось в прошлом и всё ещё идёт', { size: 12, color: '#1784a6' })}
    ${card('tc', 'If I had studied, I would have passed.', { w: 320, size: 14, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${text('tc2', 'жаль о прошлом: had + would have', { size: 12, color: '#b06200' })}
    ${card('rs', '"I will help" → She said she would help.', { w: 320, size: 13, lang: 'en', fill: '#eef7fb' })}${card('pf', 'The work will be done by Monday.', { w: 290, size: 13, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { clock: hid(20, 30), pp: hid(190, 30), pp2: hid(190, 58), tc: hid(180, 96), tc2: hid(180, 124), rs: hid(180, 166), pf: hid(180, 210), cat: at(320, 4) },
  caption0: 'Has been reading — действие началось раньше и всё ещё идёт.',
  beats: beat(
    pop(300, ['clock', 'pp', 'pp2'], 300),
    cap(2200, 'Third conditional — сожаление о прошлом: If I had…, I would have…'), pop(2200, ['tc', 'tc2'], 400),
    cap(4400, 'В косвенной речи время сдвигается назад: will → would.'), pop(4400, 'rs'),
    cap(6200, 'Will be done — пассив в будущем: работа будет сделана.'), pop(6200, 'pf'), mood(6200, 'cat', 'happy'),
  ),
});

// серия 2: must/can't, whom, fewer/less, each … has, параллелизм
const ep2 = episode({
  title: 'Тонкости грамматики',
  terms: ["must be — уверены, что да; can't be — уверены, что нет", 'whom после предлога', 'fewer — исчисляемые, less — нет', 'each/every + has', 'параллельные формы: swimming, running, cycling'],
  svg: `${card('m', "Her bag is here, so she must be in school.", { w: 330, size: 13, lang: 'en' })}${card('c', "It can't be Tom — he is away.", { w: 260, size: 13, lang: 'en', fill: '#ffe9e4', stroke: '#f3c4bd' })}
    ${card('w', 'To whom did you write?', { w: 220, size: 13, lang: 'en', fill: '#eef7fb' })}${card('f', 'fewer apples · less water', { w: 230, size: 13, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}
    ${card('e', 'Each pupil has a pen.', { w: 200, size: 13, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'excited', 22)}`,
  init: { m: hid(180, 26), c: hid(180, 66), w: hid(180, 110), f: hid(180, 152), e: hid(180, 196), cat: at(320, 200) },
  caption0: 'Must be — мы почти уверены, что это так.',
  beats: beat(
    pop(300, 'm'), pop(1600, 'c'), cap(1600, "Can't be — почти уверены, что это НЕ так."),
    pop(3200, 'w'), cap(3200, 'Whom — «кому/кого» после предлога: to whom.'),
    pop(4800, 'f'), cap(4800, 'Fewer — для того, что можно посчитать; less — для того, что нельзя.'),
    pop(6400, 'e'), cap(6400, 'Each — каждый по одному, поэтому has.'), mood(6400, 'cat', 'happy'),
  ),
});

ep2.interact = { type: 'tapShow', cat: 'cat', items: { f: { say: 'Apples считаем — fewer. Water не считаем — less.' }, e: { say: 'Each = каждый (один) → has.' } } };

export default { topic: 'english-4-2', kind: 'cartoon', episodes: [ep1, ep2] };

// Остров 3 · Английский · Тема 5. Аудирование — мини-мультфильм (примеры свои, не из записей)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: расписание — время и место
const ep1 = episode({
  title: 'Расписание',
  terms: ['время: quarter past, half past', 'место: room, gate, car park', 'изменения в объявлении'],
  svg: `${emo('spk', '📢', 40)}${card('t1', 'quarter past ten = 10:15', { w: 240, size: 15, lang: 'en' })}${card('t2', 'half past four = 4:30', { w: 220, size: 15, lang: 'en' })}
    ${card('pl', 'in room five · at the main gate', { w: 280, size: 14, lang: 'en', fill: '#eef7fb' })}${card('ch', 'has been moved to… = перенесли на…', { w: 300, size: 14, fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'thinking', 28)}`,
  init: { spk: hid(40, 40), t1: hid(200, 40), t2: hid(200, 84), pl: hid(180, 136), ch: hid(180, 190), cat: at(4, 196) },
  caption0: 'В объявлениях часто звучат время и место.',
  beats: beat(
    pop(300, ['spk', 't1'], 200), cap(1000, 'Quarter past ten — четверть одиннадцатого: 10:15.'), pop(2400, 't2'), cap(2400, 'Half past four — половина пятого: 4:30.'),
    pop(4000, 'pl'), cap(4000, 'Лови место: in room five, at the main gate.'),
    pop(5800, 'ch'), cap(5800, 'Если слышишь «has been moved» — что-то перенесли. Запомни НОВОЕ время.'), mood(5800, 'cat', 'happy'),
  ),
});

// серия 2: причина и факты о животном
const ep2 = episode({
  title: 'Почему и как',
  terms: ['because — причина', 'факты о животных: mammal, breathe', 'названия групп животных'],
  svg: `${card('b', '…because the road is closed.', { w: 280, size: 14, lang: 'en' })}${text('b2', 'because — после него причина', { size: 13, color: '#ff7a59' })}
    ${emo('whale', '🐋', 46)}${text('wh', 'whales are mammals: breathe air', { size: 13, color: '#1784a6' })}${card('gr', 'a pack of wolves · a herd of cows', { w: 290, size: 13, lang: 'en', fill: '#eef7fb' })}${kittenActor('cat', 'excited', 26)}`,
  init: { b: hid(180, 30), b2: hid(180, 62), whale: hid(60, 130), wh: hid(220, 130), gr: hid(180, 196), cat: at(318, 196) },
  caption0: 'Вопрос Why? — ищи в записи слово because.',
  beats: beat(
    pop(300, 'b'), pop(1000, 'b2'),
    pop(3000, ['whale', 'wh'], 300), cap(3000, 'В рассказе о животных лови факты: кто это (mammal) и как дышит.'),
    pop(5200, 'gr'), cap(5200, 'У групп животных свои названия: a pack of wolves, a herd of cows.'), mood(5200, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { t1: { say: 'Quarter past ten — 10:15.' }, t2: { say: 'Half past four — 4:30.' } } };

export default { topic: 'english-3-5', kind: 'cartoon', episodes: [ep1, ep2] };

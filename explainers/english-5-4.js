// Остров 5 · Английский · Тема 4. Правописание и письмо — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat } from '../js/cartoon-kit.js';

// серия 1: абзац-бургер и приёмы убеждения
const ep1 = episode({
  title: 'Абзац-бургер',
  terms: ['topic sentence — главная мысль абзаца', 'доказательство и пример подтверждают мысль', 'rhetorical question — вопрос без ответа, для эффекта', 'rule of three — три слова подряд'],
  svg: `<g data-a="top"><path d="M-110 0 Q0 -46 110 0 Z" fill="#f2b45a"/></g><g data-a="mid"><rect x="-110" y="-12" width="220" height="24" rx="6" fill="#16a34a"/></g><g data-a="bot"><rect x="-110" y="-12" width="220" height="24" rx="10" fill="#f2b45a"/></g>
    ${text('tt', 'topic sentence', { size: 13, color: '#23324a' })}${text('mt', 'evidence + example', { size: 13, color: '#fff', stroke: '#16a34a' })}${text('bt', 'concluding sentence', { size: 13, color: '#23324a' })}
    ${card('rq', "Isn't it time we acted? → риторический вопрос", { w: 330, size: 12, lang: 'en', fill: '#eef7fb' })}${card('r3', 'Fast, fun and free → правило трёх', { w: 260, size: 12, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'excited', 22)}`,
  init: { top: hid(150, 60), mid: hid(150, 80), bot: hid(150, 108), tt: hid(150, 50), mt: hid(150, 84), bt: hid(150, 112), rq: hid(180, 170), r3: hid(180, 214), cat: at(320, 4) },
  caption0: 'Абзац похож на бургер.',
  beats: beat(
    pop(300, ['top', 'tt'], 200), cap(300, 'Сверху — главная мысль: topic sentence.'), pop(1800, ['mid', 'mt'], 200), cap(1800, 'Внутри — доказательство и пример.'), pop(3200, ['bot', 'bt'], 200), cap(3200, 'Внизу — вывод.'),
    pop(4800, 'rq'), cap(4800, 'Риторический вопрос не ждёт ответа — он заставляет задуматься.'), pop(6400, 'r3'), cap(6400, 'Три слова подряд звучат убедительно.'), mood(6400, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { top: { say: 'Topic sentence — главная мысль.' }, mid: { say: 'Evidence and example — доказательства.' }, bot: { say: 'Вывод.' } } },
});

// серия 2: письма и трудные слова
const ep2 = episode({
  title: 'Письма и слова',
  terms: ['Dear Sir or Madam → Yours faithfully', 'Dear Mr Khan → Yours sincerely', 'privilege, conscience, environment — трудные написания', 'active voice: кто делает — в начале'],
  svg: `${emo('env', '✉️', 34)}${card('f1', 'Dear Sir or Madam … Yours faithfully', { w: 280, size: 12, lang: 'en' })}${card('f2', 'Dear Mr Khan … Yours sincerely', { w: 260, size: 12, lang: 'en', fill: '#eef7fb' })}
    ${text('tip', 'имя не знаешь — faithfully, знаешь — sincerely', { size: 11, color: '#6d3ad1' })}
    ${['privi·LEGE', 'consc·IENCE', 'enviro·N·ment'].map((w, i) => card(`s${i}`, w, { w: 110, h: 34, size: 12, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })).join('')}
    ${card('act', 'The boy kicked the ball. → active', { w: 260, size: 12, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { env: hid(30, 30), f1: hid(190, 30), f2: hid(180, 72), tip: hid(180, 102), s0: hid(65, 150), s1: hid(180, 150), s2: hid(295, 150), act: hid(160, 206), cat: at(320, 214) },
  caption0: 'Как закончить официальное письмо?',
  beats: beat(
    pop(300, ['env', 'f1'], 200), pop(1800, 'f2'), pop(2600, 'tip'), cap(1800, 'Не знаешь имени — Yours faithfully. Знаешь — Yours sincerely.'),
    pop(4200, ['s0', 's1', 's2'], 250), cap(4200, 'Трудные слова: запоминай опасное место.'),
    pop(6000, 'act'), cap(6000, 'Active voice: сначала тот, кто действует.'), mood(6000, 'cat', 'happy'),
  ),
});

export default { topic: 'english-5-4', kind: 'cartoon', episodes: [ep1, ep2] };

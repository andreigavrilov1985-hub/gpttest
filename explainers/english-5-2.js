// Остров 5 · Английский · Тема 2. Грамматика: точность и стиль — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat } from '../js/cartoon-kit.js';

// серия 1: если бы… / wish / should have
const ep1 = episode({
  title: 'Мечты и сожаления',
  terms: ['If I were you — совет «на твоём месте»', 'I wish I had — мечта о другом настоящем', 'You should have … — упрёк о прошлом', 'past perfect passive: had been completed — сделано раньше другого'],
  svg: `${emo('k1', '🧒', 34)}${card('c1', 'If I were you, I would apologise.', { w: 270, size: 13, lang: 'en' })}${card('c2', 'I wish I had more time. ⏰', { w: 230, size: 13, lang: 'en', fill: '#eef7fb' })}
    ${card('c3', 'You should have told me earlier!', { w: 260, size: 13, lang: 'en', fill: '#ffe9e4', stroke: '#f3c4bd' })}${card('c4', 'The work had been completed before 9.', { w: 300, size: 13, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { k1: hid(24, 28), c1: hid(190, 28), c2: hid(170, 78), c3: hid(170, 128), c4: hid(180, 180), cat: at(320, 214) },
  caption0: 'If I were you — «на твоём месте я бы…». После I — всё равно were.',
  beats: beat(
    pop(300, ['k1', 'c1'], 300), pop(2000, 'c2'), cap(2000, 'I wish I had… — жаль, что сейчас не так.'),
    pop(3600, 'c3'), cap(3600, 'Should have + 3-я форма — упрёк: надо было раньше.'),
    pop(5200, 'c4'), cap(5200, 'Had been completed — работу закончили ещё до другого события.'), mood(5200, 'cat', 'happy'),
  ),
});

// серия 2: смешные ошибки
const ep2 = episode({
  title: 'Ловушки',
  terms: ['висячий оборот: кто идёт по улице?', 'its — принадлежность, it\'s = it is', 'neither … nor + ближайшее подлежащее', 'not only … but also', 'параллельные формы: hiking, swimming, reading', 'запятые выделяют доп. информацию'],
  svg: `${emo('rain', '🌧️', 40)}<g data-a="legs"><path d="M-6 0 L-10 18 M6 0 L10 18" stroke="#23324a" stroke-width="3"/></g>${card('dm', 'Walking down the street, the rain started. ✗', { w: 320, size: 12, lang: 'en', fill: '#ffe9e4', stroke: '#f3c4bd' })}
    ${card('ok', 'Walking down the street, I felt the rain. ✔', { w: 320, size: 12, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${card('its', 'The dog wagged its tail. (its = его)', { w: 270, size: 12, lang: 'en' })}${card('nl', 'Not only did she win, but she also broke the record.', { w: 340, size: 11, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${kittenActor('cat', 'excited', 22)}`,
  init: { rain: at(60, 50), legs: at(60, 76), dm: hid(180, 110), ok: hid(180, 150), its: hid(180, 190), nl: hid(180, 226), cat: at(320, 4) },
  caption0: 'Читаем буквально: «Идя по улице, дождь начался».',
  beats: beat(
    [[300, 'to', 'rain', { x: 200 }, 1800, 'linear'], [300, 'to', 'legs', { x: 200 }, 1800, 'linear']], pop(400, 'dm'), cap(800, 'Выходит, что по улице шёл дождь! Нужно назвать того, кто шёл.'),
    fade(2600, ['legs']), pop(2800, 'ok'), pop(4400, 'its'), cap(4400, 'Its без апострофа — «его». It\'s = it is.'),
    pop(6000, 'nl'), cap(6000, 'Not only … but also — «не только…, но и…».'), mood(6000, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { dm: { say: 'Ошибка: получается, что дождь шёл пешком.' }, its: { say: "its — его/её (о предмете), it's — it is." } } },
});

export default { topic: 'english-5-2', kind: 'cartoon', episodes: [ep1, ep2] };

// Остров 1 · Английский · Тема 5. Аудирование — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, wiggle, episode, beat } from '../js/cartoon-kit.js';

// серия 1: слушаем главные слова
const keys = [['k1', 'ten', '🔢'], ['k2', 'Lucy', '👧'], ['k3', 'beach', '🏖️'], ['k4', 'Saturday', '📅']];
const ep1 = episode({
  title: 'Лови главные слова',
  terms: ['аудирование', 'ключевые слова: числа, имена, места, время'],
  svg: `${emo('phones', '🎧', 54)}${[0, 1, 2].map((i) => `<g data-a="wave${i}"><path d="M0 -20 q14 20 0 40" stroke="#2bb3c9" stroke-width="4" fill="none" stroke-linecap="round"/></g>`).join('')}
    ${keys.map(([n, w, e]) => `${card(n, `${e} ${w}`, { w: 130, size: 17, lang: 'en' })}`).join('')}${kittenActor('cat', 'excited', 52)}`,
  init: { phones: at(60, 70), ...Object.fromEntries([0, 1, 2].map((i) => [`wave${i}`, at(100 + i * 18, 70, { o: 0 })])), ...Object.fromEntries(keys.map(([n], i) => [n, hid(110, 70)])), cat: at(28, 110) },
  caption0: 'Котёнок надел наушники. Ребёнок текст не видит — только слушает.',
  beats: beat(
    ...[0, 1, 2].map((i) => [[600 + i * 200, 'to', `wave${i}`, { o: 1 }, 300]]),
    cap(2000, 'Из потока слов лови главные: числа, имена, места, время.'),
    ...keys.map(([n], i) => [[2600 + i * 900, 'to', n, { o: 1, s: 1, x: 250, y: 40 + i * 50 }, 800, 'out']]),
    cap(6800, 'Именно о них обычно спрашивают в вопросах!'), mood(6800, 'cat', 'happy'),
  ),
});

// серия 2: время на часах
const hand = (name, len, w, color) => `<g data-a="${name}"><line x1="0" y1="0" x2="0" y2="${-len}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/></g>`;
const ep2 = episode({
  title: 'Сколько времени?',
  terms: ["o'clock (ровно)", 'half past (половина)'],
  svg: `<circle cx="120" cy="120" r="80" fill="#fff" stroke="#23324a" stroke-width="5"/>${Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 - 60) * Math.PI / 180;
    return `<text x="${(120 + 64 * Math.cos(a)).toFixed(1)}" y="${(126 + 64 * Math.sin(a)).toFixed(1)}" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="15" fill="#23324a">${i + 1}</text>`;
  }).join('')}
    ${hand('hh', 40, 7, '#23324a')}${hand('mh', 60, 4, '#ff7a59')}<circle cx="120" cy="120" r="6" fill="#23324a"/>
    ${card('t', "eight o'clock", { w: 150, size: 18, lang: 'en' })}${text('ru', 'ровно 8:00', { size: 16 })}${kittenActor('cat', 'thinking', 44)}`,
  init: { hh: at(120, 120, { r: 240 }), mh: at(120, 120, { r: 0 }), t: hid(276, 80), ru: hid(276, 118), cat: at(290, 160) },
  caption0: "O'clock значит «ровно».",
  beats: beat(
    pop(400, ['t', 'ru']), cap(1200, "Eight o'clock — ровно восемь."),
    cap(3400, 'Проходит полчаса…'), move(3400, 'mh', { r: 180 }, 1500, 'linear'), move(3400, 'hh', { r: 255 }, 1500, 'linear'),
    setText(5100, 'tT', 'half past eight'), setText(5100, 'ru', '8:30'), move(5100, 't', { s: 1.15 }, 250), move(5350, 't', { s: 1 }, 250),
    cap(5100, 'Half past eight — половина девятого, 8:30.'), mood(5100, 'cat', 'happy'),
  ),
});

// серия 3: маленькое слово not
const ep3 = episode({
  title: 'Слово not',
  terms: ['not — «не»', 'Do not …'],
  svg: `${card('s', 'Bring toys', { w: 160, size: 20, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}${card('not', 'Do not', { w: 100, size: 20, lang: 'en', fill: '#ffe9e4', stroke: '#f3c4bd', color: '#c0392b' })}
    ${emo('toy', '🧸', 50)}<g data-a="cross"><path d="M-30 -30 L30 30 M30 -30 L-30 30" stroke="#e8574a" stroke-width="7" stroke-linecap="round"/></g>
    ${emo('lunch', '🥪', 40)}${emo('water', '💧', 40)}${text('ok', 'bring your lunch and water', { size: 15 })}${kittenActor('cat', 'surprised', 44)}`,
  init: { s: hid(200, 50), not: hid(80, 50), toy: hid(110, 130), cross: hid(110, 130), lunch: hid(240, 130), water: hid(290, 130), ok: hid(250, 176), cat: at(10, 168) },
  caption0: 'Маленькое слово — большая разница!',
  beats: beat(
    pop(300, ['s', 'toy']), cap(1300, 'Bring toys — принеси игрушки.'),
    pop(3000, 'not'), move(3000, 's', { x: 230 }, 300), cap(3000, 'Do not bring toys — НЕ приноси игрушки!'), pop(3600, 'cross'), mood(3600, 'cat', 'surprised'),
    cap(5600, 'Не пропусти not: оно меняет смысл на противоположный.'),
    cap(7600, 'А обед и воду — bring: принести.'), pop(7600, ['lunch', 'water', 'ok'], 200), mood(7600, 'cat', 'happy'),
  ),
});

export default { topic: 'english-1-5', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

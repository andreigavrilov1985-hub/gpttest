// Остров 3 · Логика · Тема 3. Проценты и работа — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: проценты
let bar = '';
for (let i = 0; i < 10; i += 1) bar += `<rect data-a="b${i}" x="${i * 30}" y="0" width="28" height="30" rx="4" class="pct-cell"/>`;
const ep1 = episode({
  title: 'Проценты быстро',
  terms: ['10% — десятая часть', 'скидка и наценка', '+10% и −10% ≠ исходная цена'],
  svg: `<g data-a="bar">${bar}</g>${text('t', '10% от 300 = 30', { size: 18, color: '#16774a' })}${text('d', '−30% от 300: 300 − 90 = 210', { size: 15, color: '#c0392b' })}
    ${card('trap', '100 → +10% → 110 → −10% → 99', { w: 280, size: 15, fill: '#fff3d6', stroke: '#f2c46d' })}${text('tr', 'второй процент считают от новой цены — она меньше 100', { size: 12, color: '#b06200' })}${kittenActor('cat', 'thinking', 24)}`,
  init: { bar: at(30, 30, { o: 0 }), t: hid(180, 90), d: hid(180, 120), trap: hid(180, 180), tr: hid(180, 214), cat: at(320, 200) },
  caption0: '300 конфет — это вся полоска, 100%.',
  beats: beat(
    [[300, 'to', 'bar', { o: 1 }, 400]], [[1000, 'cls', 'b0', 'fx-gold']], cap(1000, '10% — одна десятая: 300 ÷ 10 = 30.'), pop(1600, 't'),
    ...[1, 2].map((i) => [[2800 + i * 200, 'cls', `b${i}`, 'fx-gold']]), cap(2800, 'Скидка 30% — три десятые: 90. Остаётся 210.'), pop(3400, 'd'),
    cap(5000, 'Ловушка: +10%, потом −10% — цена станет МЕНЬШЕ прежней.'), pop(5000, ['trap', 'tr'], 500), mood(5000, 'cat', 'surprised'),
  ),
});

// серия 2: работа — часть за день
const ep2 = episode({
  title: 'Задачи на работу',
  terms: ['за день — 1/n работы', 'двое одинаковых — вдвое быстрее', 'цена за штуку'],
  svg: `${[0, 1, 2, 3].map((i) => `<rect data-a="w${i}" x="${40 + i * 70}" y="40" width="66" height="34" rx="4" class="pct-cell"/>`).join('')}${emo('wk', '👷', 32)}
    ${text('p', 'работа за 4 дня → за 1 день 1/4', { size: 15, color: '#1784a6' })}${emo('wk2', '👷', 32)}${text('two', 'двое: по 1/4 + 1/4 = 1/2 в день → 2 дня', { size: 14, color: '#16774a' })}
    ${card('pen', '2 ручки = 8 → 1 ручка = 4 → 5 ручек = 20', { w: 320, size: 14, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 24)}`,
  init: { wk: at(20, 100), wk2: hid(60, 100), p: hid(180, 140), two: hid(180, 170), pen: hid(180, 214), cat: at(320, 4) },
  caption0: 'Рабочий делает всю работу за 4 дня.',
  beats: beat(
    ...[0, 1, 2, 3].map((i) => [[600 + i * 600, 'cls', `w${i}`, 'fx-gold']]), move(600, 'wk', { x: 300 }, 2400, 'linear'),
    cap(1000, 'Значит, за один день — 1/4 работы.'), pop(3200, 'p'),
    cap(4400, 'Вдвоём одинаковые рабочие делают в день 1/2 — справятся за 2 дня.'), pop(4400, ['wk2', 'two'], 300),
    cap(6400, 'Цена за одну штуку помогает в любой задаче на покупки.'), pop(6400, 'pen'), mood(6400, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { trap: { say: '110 − 10% = 110 − 11 = 99. Меньше, чем было!' } } };

export default { topic: 'logic-3-3', kind: 'cartoon', episodes: [ep1, ep2] };

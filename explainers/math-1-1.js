// Остров 1 · Математика · Тема 1. Большие числа и вычисления — мини-мультфильм
import { table, card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat } from '../js/cartoon-kit.js';

// серия 1: цифры живут в разрядах
const houses = ['млн', 'сот. тыс', 'дес. тыс', 'тыс', 'сот', 'дес', 'ед'];
const digits = ['3', '7', '2', '5', '0', '0', '0'];
const hx = (i) => 30 + i * 50;
const ep1 = episode({
  title: 'Где живут цифры',
  terms: ['разряд', 'место цифры', 'сравнение больших чисел'],
  svg: `${houses.map((h, i) => `${card(`h${i}`, h, { w: 46, h: 30, size: 10, fill: '#eef7fb' })}${card(`d${i}`, digits[i], { w: 40, h: 44, size: 26, fill: '#fff3d6', stroke: '#f2c46d' })}`).join('')}
    ${text('big', '7 → 700 000', { size: 26, color: '#ff7a59' })}${text('cmp1', '4 560 000', { size: 22 })}${text('cmp2', '4 506 000', { size: 22 })}${text('gt', '>', { size: 30, color: '#16774a' })}
    ${kittenActor('cat', 'excited', 52)}`,
  init: {
    ...Object.fromEntries(houses.map((_, i) => [`h${i}`, hid(hx(i), 150)])),
    ...Object.fromEntries(digits.map((_, i) => [`d${i}`, hid(180, 50)])),
    big: hid(180, 214), cmp1: hid(90, 60), cmp2: hid(270, 60), gt: hid(180, 60), cat: at(296, 150),
  },
  caption0: 'Число 3 725 000. Каждая цифра живёт в своём доме — разряде.',
  beats: beat(
    pop(200, houses.map((_, i) => `h${i}`), 120),
    ...digits.map((_, i) => [[1300 + i * 250, 'to', `d${i}`, { o: 1, s: 1, x: hx(i), y: 108 }, 600, 'hop']]),
    cap(3600, 'Справа налево: единицы, десятки, сотни, тысячи…'),
    move(5200, 'd1', { s: 1.35 }, 300), mark(5200, 'd1T'),
    cap(5200, 'Цифра 7 стоит в разряде сотен тысяч. Она значит 700 000!'),
    pop(5600, 'big'), mood(5600, 'cat', 'happy'),
    fade(8200, [...houses.map((_, i) => `h${i}`), ...digits.map((_, i) => `d${i}`), 'big']),
    cap(8400, 'Сравниваем числа слева направо: 4 560 000 и 4 506 000.'),
    pop(8500, ['cmp1', 'cmp2']),
    cap(10400, 'Миллионы и сотни тысяч равны, а десятков тысяч 6 > 0. Первое больше!'),
    pop(10400, 'gt'), mood(10400, 'cat', 'excited'),
  ),
});

// серия 2: округление
const ep2 = episode({
  title: 'Округляем',
  terms: ['округлить', 'округление до тысячи'],
  svg: `<line x1="40" y1="150" x2="320" y2="150" stroke="#23324a" stroke-width="4" stroke-linecap="round"/>
    <line x1="40" y1="138" x2="40" y2="162" stroke="#23324a" stroke-width="3"/><line x1="320" y1="138" x2="320" y2="162" stroke="#23324a" stroke-width="3"/><line x1="180" y1="142" x2="180" y2="158" stroke="#9aa5b4" stroke-width="3"/>
    ${text('a', '48 000', { size: 16 })}${text('b', '49 000', { size: 16 })}${text('mid', '48 500', { size: 13, color: '#9aa5b4' })}
    ${emo('pin', '📍', 30)}${text('num', '48 637', { size: 18, color: '#ff7a59' })}${card('rule', '6 ≥ 5 → вверх', { w: 150, size: 16, fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${kittenActor('cat', 'thinking', 50)}`,
  init: { a: at(40, 184), b: at(320, 184), mid: at(180, 184), pin: hid(218, 130), num: hid(218, 104), rule: hid(180, 40), cat: at(196, 92, { o: 0 }) },
  caption0: 'Округлить — заменить число близким «круглым».',
  beats: beat(
    pop(600, ['pin', 'num']),
    cap(1600, 'Округлим 48 637 до тысяч. Оно живёт между 48 000 и 49 000.'),
    cap(4200, 'Смотрим на цифру справа от тысяч: это 6.'),
    pop(4200, 'rule'),
    cap(6400, '5 или больше — округляем вверх. Меньше 5 — вниз.'),
    [[6400, 'to', 'cat', { o: 1 }, 300]],
    hop(7600, 'cat', { x: 270 }, 900), move(7600, 'pin', { x: 320 }, 900), move(7600, 'num', { x: 316, y: 80 }, 900),
    setText(8600, 'num', '49 000'),
    cap(8600, '48 637 ≈ 49 000. Готово!'), mood(8600, 'cat', 'happy'),
  ),
});

// серия 3: отрицательные числа на термометре
const ty = (v) => 150 - v * 9; // temperature → y
const ep3 = episode({
  title: 'Мороз и тепло',
  terms: ['отрицательное число'],
  svg: `<rect x="160" y="40" width="40" height="160" rx="20" fill="#fff" stroke="#9aa5b4" stroke-width="3"/><circle cx="180" cy="200" r="20" fill="#ff5c5c"/>
    <clipPath id="tubeClip"><rect x="160" y="40" width="40" height="170" rx="20"/></clipPath>
    <g clip-path="url(#tubeClip)"><g data-a="mercury"><rect x="-9" y="0" width="18" height="200" rx="9" fill="#ff5c5c"/></g></g>
    ${[-5, 0, 5, 10].map((v) => `<line x1="200" y1="${ty(v)}" x2="214" y2="${ty(v)}" stroke="#23324a" stroke-width="2"/><text x="220" y="${ty(v) + 5}" font-family="Nunito" font-weight="800" font-size="13" fill="#23324a">${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v)}</text>`).join('')}
    ${text('t', '−3°', { size: 30, color: '#1784a6' })}${emo('snow', '❄️', 34)}${emo('sun', '☀️', 38)}${text('plus', '+8°', { size: 22, color: '#ff7a59' })}
    ${kittenActor('cat', 'sad_soft', 54)}`,
  init: { mercury: at(180, ty(-3)), t: at(80, 100), snow: at(80, 54), sun: hid(300, 50), plus: hid(290, 120), cat: at(14, 130) },
  caption0: 'Утром мороз: −3 градуса. Это меньше нуля — отрицательное число.',
  beats: beat(
    cap(2600, 'Пригрело солнце: стало теплее на 8 градусов.'),
    pop(2600, ['sun', 'plus']), fade(2600, 'snow'),
    move(3600, 'mercury', { y: ty(0) }, 900), setText(4500, 't', '0°'),
    cap(4600, 'От −3 до нуля — 3 градуса…'),
    move(6200, 'mercury', { y: ty(5) }, 1200), setText(7400, 't', '+5°'), [[7400, 'to', 't', { s: 1.3 }, 250], [7650, 'to', 't', { s: 1 }, 250]],
    cap(6200, '…и ещё 5 после нуля. Стало +5 градусов!'), mood(7400, 'cat', 'happy'),
  ),
});

// серия 4: порядок действий
const ep4 = episode({
  title: 'Кто первый?',
  terms: ['порядок действий', 'скобки'],
  svg: `${card('n5', '5', { w: 44, size: 26 })}${card('p', '+', { w: 34, size: 26, fill: 'none', stroke: 'none' })}${card('m', '3 × 4', { w: 92, size: 26, fill: '#fff3d6', stroke: '#f2c46d' })}
    ${text('eq', '= 17', { size: 30, color: '#16774a' })}${text('first', 'сначала!', { size: 15, color: '#ff7a59' })}
    ${card('rule', '( ) → × ÷ → + −', { w: 200, size: 18, fill: '#eef7fb' })}${kittenActor('cat', 'thinking', 52)}`,
  init: { n5: at(90, 110), p: at(132, 110), m: at(196, 110), eq: hid(290, 112), first: hid(196, 74), rule: hid(180, 190), cat: at(10, 150) },
  caption0: 'Сколько будет 5 + 3 × 4?',
  beats: beat(
    cap(1800, 'Правило: сначала умножение и деление, потом сложение.'),
    pop(1800, 'first'), move(1800, 'm', { s: 1.15 }, 300),
    setText(3600, 'mT', '12'), move(3600, 'm', { s: 1 }, 300), fade(3600, 'first'),
    cap(3600, '3 × 4 = 12.'),
    move(5200, 'm', { x: 182 }, 500), move(5200, 'p', { x: 124 }, 500),
    cap(5600, 'Теперь 5 + 12 = 17.'), pop(5600, 'eq'), mood(5600, 'cat', 'happy'),
    cap(7800, 'А скобки — «сначала посчитай здесь». Всегда самые первые!'), pop(7800, 'rule'),
  ),
});

// серия 5: делители, простые числа и прикидка
const candy = (i) => emo(`c${i}`, '🍬', 22);
const ep5 = episode({
  title: 'Делим поровну',
  terms: ['делитель', 'общий делитель', 'простое число', 'оценка (прикидка)'],
  svg: `${Array.from({ length: 12 }, (_, i) => candy(i)).join('')}${text('t12', '12 = 6 + 6', { size: 18 })}${text('t18', '18 = 6 + 6 + 6', { size: 18 })}
    ${text('div', '6 делит и 12, и 18', { size: 20, color: '#16774a' })}${card('prime', '29 → только 1 и 29: простое', { w: 270, size: 17, fill: '#fff3d6', stroke: '#f2c46d' })}
    ${card('est', '398 × 21 ≈ 400 × 20 = 8 000', { w: 300, size: 17, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 48)}`,
  init: {
    ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`c${i}`, hid(60 + (i % 6) * 26, 50 + Math.floor(i / 6) * 30)])),
    t12: hid(140, 128), t18: hid(140, 128), div: hid(180, 128), prime: hid(180, 168), est: hid(180, 212), cat: at(290, 30),
  },
  caption0: 'Делитель — число, на которое делится без остатка.',
  beats: beat(
    pop(300, Array.from({ length: 12 }, (_, i) => `c${i}`), 60),
    cap(1600, '12 конфет раскладываем по 6 — две кучки, ничего не осталось.'),
    ...Array.from({ length: 12 }, (_, i) => move(1800, `c${i}`, { x: (i < 6 ? 50 : 200) + (i % 6) * 18 }, 600)),
    pop(2500, 't12'),
    cap(4200, '18 тоже делится на 6: три кучки. 6 — общий делитель 12 и 18.'),
    fade(4200, 't12'), pop(4300, 't18'), fade(6000, 't18'), pop(6100, 'div'),
    cap(7200, 'Простое число делится только на 1 и на само себя.'), pop(7200, 'prime'),
    cap(9600, 'Прикидка: округляем и считаем в уме.'), pop(9600, 'est'), mood(9600, 'cat', 'happy'),
  ),
});

export default { topic: 'math-1-1', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4, ep5] };

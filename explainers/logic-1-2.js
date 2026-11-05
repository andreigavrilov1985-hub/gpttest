// Остров 1 · Логика · Тема 2. Лишнее и аналогии — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, wiggle, episode, beat } from '../js/cartoon-kit.js';

const basket = '<path d="M90 150 h180 l-20 60 h-140 z" fill="#d9a066" stroke="#a0673c" stroke-width="3"/><path d="M90 150 q90 -70 180 0" fill="none" stroke="#a0673c" stroke-width="5"/>';

// серия 1: что лишнее в корзине (интерактив)
const ep1 = episode({
  title: 'Что лишнее?',
  terms: ['лишнее', 'общий признак', 'группа'],
  svg: `${basket}${emo('apple', '🍎', 40)}${emo('plum', '🫐', 38)}${emo('carrot', '🥕', 40)}${text('f', 'фрукты', { size: 16, color: '#16774a' })}${text('v', 'овощ!', { size: 16, color: '#ff7a59' })}
    ${kittenActor('cat', 'thinking', 44)}`,
  init: { apple: hid(130, 160), plum: hid(180, 160), carrot: hid(230, 160), f: hid(160, 226), v: hid(300, 110), cat: at(4, 120) },
  caption0: 'Яблоко, слива, морковь. Нажми на лишнее!',
  beats: beat(
    pop(300, ['apple', 'plum', 'carrot'], 250),
    cap(2400, 'Ищем, что общего у большинства. Яблоко и слива — фрукты.'), pop(2400, 'f'),
    cap(4600, 'А морковь — овощ. Она лишняя!'), hop(4600, 'carrot', { x: 300, y: 70 }, 800), pop(5400, 'v'), mood(5400, 'cat', 'happy'),
  ),
  interact: {
    type: 'tapShow', cat: 'cat',
    items: {
      carrot: { show: ['v'], say: 'Да! Морковь — овощ, а остальные — фрукты.', mood: 'celebrate' },
      apple: { say: 'Яблоко — фрукт, как и слива. Ищи другое!', mood: 'thinking' },
      plum: { say: 'Слива — фрукт, как и яблоко. Ищи другое!', mood: 'thinking' },
    },
  },
});

// серия 2: лишнее среди чисел и животных
const ep2 = episode({
  title: 'Найди признак',
  terms: ['чётные и нечётные числа', 'млекопитающие и птицы'],
  svg: `${emo('cat2', '🐈', 40)}${emo('dog', '🐕', 40)}${emo('bird', '🐦', 36)}${text('a', 'кошка и собака — звери, воробей — птица', { size: 13 })}
    ${['2', '4', '7', '8'].map((n, i) => card(`n${i}`, n, { w: 46, h: 44, size: 22 })).join('')}${text('e', '2, 4, 8 — чётные; 7 — нечётное', { size: 14, color: '#16774a' })}
    ${kittenActor('cat', 'thinking', 38)}`,
  init: { cat2: hid(80, 60), dog: hid(170, 60), bird: hid(260, 60), a: hid(180, 104), n0: hid(80, 160), n1: hid(140, 160), n2: hid(200, 160), n3: hid(260, 160), e: hid(180, 210), cat: at(310, 150) },
  caption0: 'Кошка, собака, воробей.',
  beats: beat(
    pop(200, ['cat2', 'dog', 'bird'], 250),
    cap(1400, 'Воробей — птица, он улетает! Кошка и собака — звери.'), hop(1600, 'bird', { x: 320, y: 20 }, 900), pop(2200, 'a'),
    cap(4200, 'А в числах? 2, 4, 7, 8.'), pop(4200, ['n0', 'n1', 'n2', 'n3'], 200),
    cap(5600, '2, 4 и 8 делятся на 2 — они чётные. 7 — нечётное, оно лишнее.'), hop(5800, 'n2', { x: 330, y: 160 }, 700), pop(6400, 'e'), mood(6400, 'cat', 'happy'),
  ),
});

// серия 3: аналогии
const ep3 = episode({
  title: 'Аналогии',
  terms: ['аналогия: A относится к B, как C к D', 'противоположности'],
  svg: `<rect x="0" y="0" width="360" height="240" fill="#e9f8ff"/><rect x="0" y="150" width="360" height="90" fill="#5bbfd6"/>
    ${emo('bird', '🐦', 40)}${emo('fish', '🐟', 40)}${text('fly', 'летает', { size: 16 })}${text('swim', 'плавает', { size: 16, color: '#0b5f74' })}
    ${card('knife', '🔪 → резать', { w: 140, size: 16 })}${card('pen', '🖊️ → писать', { w: 140, size: 16 })}${text('as', 'как', { size: 16, color: '#5b6b83' })}
    ${card('day', '☀️ день ↔ ночь 🌙', { w: 180, size: 15 })}${text('bw', 'как белый ↔ чёрный', { size: 14, color: '#5b6b83' })}${kittenActor('cat', 'excited', 36)}`,
  init: { bird: hid(60, 60), fish: hid(60, 190), fly: hid(150, 60), swim: hid(150, 196), knife: hid(90, 110), pen: hid(270, 110), as: hid(180, 112), day: hid(180, 60), bw: hid(180, 86), cat: at(310, 4) },
  caption0: 'Птица относится к «летает», как рыба к…',
  beats: beat(
    pop(300, 'bird'), move(800, 'bird', { x: 240, y: 40 }, 1500), pop(1000, 'fly'),
    pop(2400, 'fish'), move(2600, 'fish', { x: 240 }, 1500), pop(2800, 'swim'), cap(2800, '…«плавает»! Птица летает, рыба плавает.'),
    fade(4800, ['bird', 'fish', 'fly', 'swim']),
    cap(5000, 'Ножом режут, а ручкой… пишут!'), pop(5000, ['knife', 'as', 'pen'], 400),
    cap(7400, 'День и ночь противоположны, как белый и чёрный.'), fade(7400, ['knife', 'as', 'pen']), pop(7600, ['day', 'bw'], 300), mood(7600, 'cat', 'happy'),
  ),
});

// серия 4: что объединяет
const ep4 = episode({
  title: 'Общее слово',
  terms: ['обобщение', 'мебель', 'геометрические фигуры'],
  svg: `${emo('t', '🪑', 40)}${emo('s', '🛋️', 40)}${emo('w', '🗄️', 40)}${card('furn', 'мебель', { w: 120, size: 18, fill: '#fff3d6', stroke: '#f2c46d' })}
    <g data-a="tri"><path d="M0 -20 L20 16 H-20 z" fill="#ff7a59"/></g><g data-a="sq"><rect x="-18" y="-18" width="36" height="36" fill="#2bb3c9"/></g><g data-a="ci"><circle r="19" fill="#4cc27a"/></g>
    ${card('fig', 'фигуры', { w: 120, size: 18, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 38)}`,
  init: { t: hid(80, 60), s: hid(170, 60), w: hid(260, 60), furn: hid(170, 110), tri: hid(80, 170), sq: hid(170, 170), ci: hid(260, 170), fig: hid(170, 220), cat: at(314, 100) },
  caption0: 'Стол, стул, шкаф. Что их объединяет?',
  beats: beat(
    pop(300, ['t', 's', 'w'], 250), cap(1800, 'Всё это мебель!'), pop(1800, 'furn'),
    move(2400, 't', { x: 140 }, 500), move(2400, 'w', { x: 200 }, 500),
    cap(4000, 'Треугольник, квадрат, круг — это геометрические фигуры.'), pop(4000, ['tri', 'sq', 'ci'], 250), pop(5000, 'fig'), mood(5000, 'cat', 'happy'),
  ),
});

export default {
  topic: 'logic-1-2',
  kind: 'cartoon',
  episodes: [ep1, ep2, ep3, ep4],
  memo: [
    'Лишнее — то, у чего нет общего признака с остальными: яблоко и слива — фрукты, морковь — овощ.',
    'Ищи признак: живое или нет, зверь или птица, чётное или нечётное, цвет или форма, день недели или месяц.',
    'Чётные числа делятся на 2 без остатка: 2, 4, 6, 8. Нечётные — нет: 1, 3, 5, 7.',
    'Аналогия: «птица — летает, как рыба — плавает». Найди связь в первой паре и повтори её во второй.',
    'Общее слово объединяет группу: стол, стул, шкаф — мебель; треугольник, квадрат, круг — фигуры.',
  ],
};

// Остров 1 · Наука · Тема 1. Живые организмы: растения и животные — мини-мультфильм
import { card, text, emo, arrow, kittenActor, ground, at, hid, cap, pop, fade, move, hop, mood, setText, draw, wiggle, episode, beat } from '../js/cartoon-kit.js';

// серия 1: как растение делает себе пищу
const drops = [0, 1, 2].map((i) => `<g data-a="dr${i}"><circle r="5" fill="#2bb3c9"/></g>`).join('');
const ep1 = episode({
  title: 'Растение-повар',
  terms: ['root (корень)', 'stem (стебель)', 'leaf (лист)', 'photosynthesis', 'carbon dioxide', 'oxygen'],
  svg: `${ground(170, '#c99a6b')}<path d="M180 170 v-80" stroke="#3f9d4f" stroke-width="8"/><ellipse cx="150" cy="96" rx="32" ry="14" fill="#4cc27a" transform="rotate(-20 150 96)"/><ellipse cx="212" cy="80" rx="32" ry="14" fill="#4cc27a" transform="rotate(20 212 80)"/>
    <path d="M180 170 l-20 30 M180 170 l0 40 M180 170 l22 28" stroke="#8a5a3c" stroke-width="4" stroke-linecap="round"/>${drops}
    ${emo('sun', '☀️', 46)}${arrow('ray', 70, 40, 140, 86, '#ffb400')}${card('co2', 'CO₂ in', { w: 76, h: 28, size: 14, fill: '#eef3f7' })}${card('o2', 'O₂ out', { w: 76, h: 28, size: 14, fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${text('lr', 'root', { size: 14, color: '#8a5a3c' })}${text('ls', 'stem', { size: 14, color: '#3f9d4f' })}${text('ll', 'leaf', { size: 14, color: '#3f9d4f' })}${emo('food', '🍬', 28)}
    ${kittenActor('cat', 'excited', 42)}`,
  init: {
    ...Object.fromEntries([0, 1, 2].map((i) => [`dr${i}`, at(170 + i * 10, 205, { o: 0 })])), sun: hid(50, 34), ray: { o: 0 },
    co2: hid(290, 60), o2: hid(290, 110), lr: hid(228, 214), ls: hid(208, 140), ll: hid(118, 70), food: hid(180, 92), cat: at(6, 128),
  },
  caption0: 'Растению тоже нужна еда. Но оно готовит её само!',
  beats: beat(
    pop(400, 'lr'), cap(1200, 'Root — корень. Он в земле и пьёт воду.'),
    ...[0, 1, 2].map((i) => [[1400 + i * 300, 'to', `dr${i}`, { o: 1 }, 200], [1700 + i * 300, 'to', `dr${i}`, { x: 180, y: 100 }, 1600, 'inOut']]),
    pop(2400, 'ls'), cap(3300, 'Stem — стебель: держит растение и несёт воду вверх.'),
    pop(5200, ['sun', 'll']), [[5400, 'to', 'ray', { o: 1 }, 100]], draw(5400, 'rayL', 600), cap(5200, 'Leaf — лист — ловит солнечный свет.'),
    pop(7200, 'co2'), cap(7200, 'Из воздуха лист берёт углекислый газ — carbon dioxide.'),
    pop(9200, 'food'), pop(9400, 'o2'), cap(9200, 'Свет + вода + CO₂ = пища. Это photosynthesis! А кислород (O₂) выходит наружу.'), mood(9400, 'cat', 'happy'),
  ),
});

// серия 2: позвоночные, млекопитающие, насекомые
const ep2 = episode({
  title: 'Кто есть кто',
  terms: ['vertebrate (позвоночное)', 'mammal (млекопитающее)', 'insect (насекомое)', 'spider — не насекомое'],
  svg: `${emo('fish', '🐟', 54)}<g data-a="spine"><path d="M-30 0 h60" stroke="#ff7a59" stroke-width="5" stroke-linecap="round"/><path d="M-20 -8 v16 M-8 -8 v16 M4 -8 v16 M16 -8 v16" stroke="#ff7a59" stroke-width="3"/></g>
    ${text('vt', 'vertebrate: есть позвоночник', { size: 14, color: '#ff7a59' })}${emo('dol', '🐬', 54)}${text('mm', 'mammal: молоко и воздух', { size: 14, color: '#1784a6' })}
    ${emo('ant', '🐜', 50)}${emo('spi', '🕷️', 50)}${text('legs', '6 ног — insect', { size: 15, color: '#16774a' })}${text('legs8', '8 ног — не insect', { size: 15, color: '#c0392b' })}
    ${kittenActor('cat', 'thinking', 40)}`,
  init: { fish: hid(70, 50), spine: hid(70, 52), vt: hid(200, 52), dol: hid(70, 116), mm: hid(210, 118), ant: hid(70, 186), spi: hid(200, 186), legs: hid(70, 226), legs8: hid(220, 226), cat: at(310, 160) },
  caption0: 'Животных делят на группы.',
  beats: beat(
    pop(300, 'fish'), cap(800, 'У рыбы внутри есть позвоночник — это vertebrate.'), pop(1600, ['spine', 'vt']),
    pop(3800, 'dol'), cap(3800, 'Дельфин — mammal, млекопитающее: дышит воздухом и кормит детёнышей молоком.'), pop(4400, 'mm'), hop(4200, 'dol', { x: 70 }, 700),
    pop(6600, ['ant', 'legs'], 300), cap(6600, 'Insect — насекомое: у него 6 ног. Как у муравья.'),
    pop(8800, ['spi', 'legs8'], 300), cap(8800, 'У паука 8 ног — он не насекомое!'), mood(8800, 'cat', 'surprised'),
  ),
});

// серия 3: пищевая цепочка
const ep3 = episode({
  title: 'Пищевая цепочка',
  terms: ['food chain (пищевая цепочка)', 'producer (производитель)', 'herbivore (травоядное)', 'predator (хищник)'],
  svg: `${ground(170)}${emo('grass', '🌿', 50)}${emo('rab', '🐇', 50)}${emo('fox', '🦊', 50)}${arrow('a1', 110, 140, 145, 140)}${arrow('a2', 215, 140, 250, 140)}
    ${text('p', 'producer', { size: 14, color: '#16774a' })}${text('h', 'herbivore', { size: 14, color: '#1784a6' })}${text('pr', 'predator', { size: 14, color: '#c0392b' })}
    ${emo('sun', '☀️', 40)}${kittenActor('cat', 'excited', 40)}`,
  init: { grass: hid(70, 140), rab: hid(180, 140), fox: hid(290, 140), a1: { o: 0 }, a2: { o: 0 }, p: hid(70, 196), h: hid(180, 196), pr: hid(290, 196), sun: hid(40, 40), cat: at(300, 6) },
  caption0: 'Кто кого ест? Это пищевая цепочка.',
  beats: beat(
    pop(300, ['sun', 'grass']), cap(1000, 'Трава сама делает пищу из света. Она — producer, производитель.'), pop(1800, 'p'),
    pop(3600, 'rab'), [[3800, 'to', 'a1', { o: 1 }, 100]], draw(3800, 'a1L', 500), cap(3600, 'Кролик ест только траву. Он herbivore — травоядный.'), pop(4600, 'h'), wiggle(4400, 'grass'),
    pop(6400, 'fox'), [[6600, 'to', 'a2', { o: 1 }, 100]], draw(6600, 'a2L', 500), cap(6400, 'Лиса ест кролика — она predator, хищник.'), pop(7200, 'pr'),
    cap(8800, 'Grass → rabbit → fox: стрелка показывает, кто кого ест.'), mood(8800, 'cat', 'happy'),
  ),
});

// серия 4: жабры
const ep4 = episode({
  title: 'Как дышит рыба',
  terms: ['gills (жабры)', 'lungs (лёгкие)'],
  svg: `<rect x="0" y="40" width="360" height="200" fill="#bdeef3"/>${emo('fish', '🐠', 60)}${[0, 1, 2, 3].map((i) => `<g data-a="b${i}"><circle r="${4 + i}" fill="none" stroke="#1784a6" stroke-width="2"/></g>`).join('')}
    ${text('g', 'gills — жабры', { size: 18, color: '#1784a6' })}${text('l', 'а у нас — lungs, лёгкие', { size: 16 })}${kittenActor('cat', 'surprised', 44)}`,
  init: { fish: hid(120, 140), ...Object.fromEntries([0, 1, 2, 3].map((i) => [`b${i}`, at(150, 130, { o: 0 })])), g: hid(250, 120), l: hid(220, 200), cat: at(290, -4) },
  caption0: 'Рыба живёт под водой. Чем она дышит?',
  beats: beat(
    pop(300, 'fish'), move(600, 'fish', { x: 140 }, 1500),
    ...[0, 1, 2, 3].map((i) => [[1600 + i * 400, 'to', `b${i}`, { o: 1 }, 100], [1600 + i * 400, 'to', `b${i}`, { y: 50, x: 165 + i * 6 }, 1800, 'out']]),
    cap(2000, 'Жабры — gills — берут кислород прямо из воды.'), pop(2400, 'g'),
    cap(5200, 'А люди и дельфины дышат воздухом через lungs — лёгкие.'), pop(5200, 'l'), mood(5200, 'cat', 'happy'),
  ),
});

// интерактив: нажми — котёнок объяснит
ep2.interact = { type: 'tapShow', cat: 'cat', items: {
  fish: { show: ['spine', 'vt'], say: 'У рыбы есть позвоночник: vertebrate.' },
  spine: { show: ['vt'], say: 'У рыбы есть позвоночник: vertebrate.' },
  dol: { show: ['mm'], say: 'Дельфин — mammal: дышит воздухом, кормит детёнышей молоком.' },
  ant: { show: ['legs'], say: 'Муравей — insect: 6 ног.' }, spi: { show: ['legs8'], say: 'Паук: 8 ног — не насекомое.' },
} };

export default { topic: 'science-1-1', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

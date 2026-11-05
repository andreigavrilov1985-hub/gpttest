// Остров 1 · Наука · Тема 2. Тело человека — мини-мультфильм
import { card, text, emo, arrow, kittenActor, at, hid, cap, pop, fade, move, hop, mood, draw, wiggle, episode, beat } from '../js/cartoon-kit.js';

const pulse = (t, name, n = 4, gap = 500) => Array.from({ length: n }, (_, i) => [[t + i * gap, 'to', name, { s: 1.18 }, gap / 2], [t + i * gap + gap / 2, 'to', name, { s: 1 }, gap / 2]]).flat();

// серия 1: сердце и сосуды
const dots = (p, n) => Array.from({ length: n }, (_, i) => `<g data-a="${p}${i}"><circle r="5" fill="${p === 'a' ? '#e4553b' : '#7a5ccf'}"/></g>`).join('');
const ep1 = episode({
  title: 'Сердце-насос',
  terms: ['heart (сердце)', 'pumps blood', 'arteries (артерии)', 'veins (вены)'],
  svg: `<path d="M150 120 C 60 120, 60 40, 180 40 S 300 120, 210 120" fill="none" stroke="#f3b3a6" stroke-width="10" stroke-linecap="round"/>
    <path d="M150 130 C 60 130, 60 210, 180 210 S 300 130, 210 130" fill="none" stroke="#c8b5f5" stroke-width="10" stroke-linecap="round"/>
    ${emo('heart', '❤️', 56)}${dots('a', 4)}${dots('v', 4)}${text('art', 'arteries: от сердца', { size: 14, color: '#c0392b' })}${text('vei', 'veins: к сердцу', { size: 14, color: '#6d3ad1' })}
    ${kittenActor('cat', 'excited', 40)}`,
  init: { heart: at(180, 125), ...Object.fromEntries([0, 1, 2, 3].map((i) => [`a${i}`, at(210, 118, { o: 0 })])), ...Object.fromEntries([0, 1, 2, 3].map((i) => [`v${i}`, at(210, 132, { o: 0 })])), art: hid(180, 24), vei: hid(180, 232), cat: at(6, 4) },
  caption0: 'Сердце — насос. Оно гонит кровь по всему телу.',
  beats: beat(
    pulse(300, 'heart', 14, 600),
    cap(1800, 'Arteries — артерии — несут кровь ОТ сердца.'), pop(1800, 'art'),
    ...[0, 1, 2, 3].map((i) => { const t = 2000 + i * 350; return [[t, 'to', `a${i}`, { o: 1 }, 100], [t, 'to', `a${i}`, { x: 250, y: 50 }, 600], [t + 600, 'to', `a${i}`, { x: 110, y: 50 }, 800], [t + 1400, 'to', `a${i}`, { x: 150, y: 118 }, 500]]; }),
    cap(4800, 'Veins — вены — возвращают кровь К сердцу.'), pop(4800, 'vei'),
    ...[0, 1, 2, 3].map((i) => { const t = 5000 + i * 350; return [[t, 'to', `v${i}`, { o: 1 }, 100], [t, 'to', `v${i}`, { x: 250, y: 200 }, 600], [t + 600, 'to', `v${i}`, { x: 110, y: 200 }, 800], [t + 1400, 'to', `v${i}`, { x: 150, y: 132 }, 500]]; }),
    cap(7600, 'Тук-тук! Так кровь кругом бежит по телу.'), mood(7600, 'cat', 'happy'),
  ),
});

// серия 2: лёгкие
const gas = (p, n, color) => Array.from({ length: n }, (_, i) => `<g data-a="${p}${i}"><circle r="6" fill="${color}"/></g>`).join('');
const ep2 = episode({
  title: 'Дышим',
  terms: ['lungs (лёгкие)', 'oxygen (кислород)', 'carbon dioxide', 'вред дыма'],
  svg: `${emo('lungs', '🫁', 90)}${gas('o', 4, '#2bb3c9')}${gas('c', 4, '#9aa5b4')}${card('inCard', 'oxygen — вдох', { w: 150, size: 15, fill: '#eef7fb' })}${card('outCard', 'CO₂ — выдох', { w: 150, size: 15, fill: '#f3f5f8' })}
    ${emo('smoke', '🚬', 38)}<g data-a="no"><circle r="26" fill="none" stroke="#e8574a" stroke-width="5"/><path d="M-18 -18 L18 18" stroke="#e8574a" stroke-width="5"/></g>${kittenActor('cat', 'excited', 40)}`,
  init: { lungs: at(180, 130), ...Object.fromEntries([0, 1, 2, 3].map((i) => [`o${i}`, at(40 + i * 14, 40, { o: 0 })])), ...Object.fromEntries([0, 1, 2, 3].map((i) => [`c${i}`, at(180, 130, { o: 0 })])), inCard: hid(90, 214), outCard: hid(270, 214), smoke: hid(310, 60), no: hid(310, 60), cat: at(4, 120) },
  caption0: 'Lungs — лёгкие. Ими мы дышим.',
  beats: beat(
    cap(1000, 'Вдох: лёгкие берут из воздуха кислород — oxygen.'), pop(1000, 'inCard'), move(1000, 'lungs', { s: 1.15 }, 900),
    ...[0, 1, 2, 3].map((i) => [[1200 + i * 200, 'to', `o${i}`, { o: 1 }, 100], [1200 + i * 200, 'to', `o${i}`, { x: 170 + i * 8, y: 130 }, 1100], [2500 + i * 200, 'to', `o${i}`, { o: 0 }, 300]]),
    cap(3800, 'Выдох: наружу уходит углекислый газ — CO₂.'), pop(3800, 'outCard'), move(3800, 'lungs', { s: 1 }, 900),
    ...[0, 1, 2, 3].map((i) => [[4000 + i * 200, 'to', `c${i}`, { o: 1 }, 100], [4000 + i * 200, 'to', `c${i}`, { x: 300 + i * 8, y: 150 }, 1100]]),
    cap(6600, 'Дым от сигарет попадает прямо в лёгкие и вредит им.'), pop(6600, ['smoke', 'no'], 250), mood(6600, 'cat', 'sad_soft'),
  ),
});

// серия 3: еда, желудок, зубы, белок
const ep3 = episode({
  title: 'Едим и растём',
  terms: ['stomach (желудок)', 'digestive system', 'protein (белок)', 'incisors (резцы)', 'molars (коренные зубы)'],
  svg: `${emo('apple', '🍎', 40)}${emo('mouth', '👄', 40)}<g data-a="stom"><path d="M-22 -14 q10 -16 30 -6 q22 12 8 30 q-14 16 -32 4 q-14 -10 -6 -28z" fill="#ffadc9" stroke="#e37ea3" stroke-width="3"/></g>${arrow('d1', 90, 60, 140, 60)}${arrow('d2', 200, 60, 250, 60)}${text('st', 'stomach', { size: 15, color: '#16774a' })}
    ${card('inc', 'incisors ✂️ режут', { w: 150, size: 14 })}${card('mol', 'molars ⚙️ перетирают', { w: 160, size: 14 })}
    ${emo('egg', '🥚', 36)}${emo('kid', '🧒', 40)}${text('pr', 'protein — для роста', { size: 14, color: '#b06200' })}${kittenActor('cat', 'excited', 38)}`,
  init: { apple: hid(60, 60), mouth: hid(170, 60), stom: hid(290, 60), d1: { o: 0 }, d2: { o: 0 }, st: hid(290, 104), inc: hid(90, 140), mol: hid(260, 140), egg: hid(70, 200), kid: hid(150, 196), pr: hid(260, 200), cat: at(4, 150, { o: 0 }) },
  caption0: 'Куда девается еда?',
  beats: beat(
    pop(300, ['apple', 'mouth', 'stom'], 200), [[900, 'to', 'd1', { o: 1 }, 100], [2000, 'to', 'd2', { o: 1 }, 100]], draw(900, 'd1L', 500), draw(2000, 'd2L', 500),
    move(1000, 'apple', { x: 170, s: 0.5 }, 900), move(2100, 'apple', { x: 290, o: 0 }, 900),
    cap(1600, 'Рот, потом желудок — stomach. Он переваривает еду.'), pop(2800, 'st'),
    cap(4400, 'Зубы разные: incisors — резцы — откусывают, molars перетирают.'), pop(4400, ['inc', 'mol'], 400),
    cap(7000, 'Protein — белок — строительный материал: с ним мы растём.'), pop(7000, ['egg', 'kid', 'pr'], 250), move(7800, 'kid', { s: 1.3 }, 900), mood(7800, 'cat', 'happy'),
  ),
});

// серия 4: кости и бег
const ep4 = episode({
  title: 'Кости и бег',
  terms: ['bones (кости)', 'support and protect', 'сердце бьётся чаще при беге'],
  svg: `${emo('bone', '🦴', 48)}${text('b', 'bones держат и защищают', { size: 15 })}${emo('run', '🏃', 50)}${emo('heart', '❤️', 40)}
    ${card('why', 'мышцам нужно больше кислорода', { w: 260, size: 15, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 40)}`,
  init: { bone: hid(70, 50), b: hid(210, 52), run: hid(40, 140), heart: hid(260, 140), why: hid(180, 210), cat: at(300, 4) },
  caption0: 'Кости — каркас тела.',
  beats: beat(
    pop(300, ['bone', 'b'], 300), cap(1000, 'Bones держат тело и защищают органы, как шлем.'),
    pop(3200, ['run', 'heart']), move(3400, 'run', { x: 180 }, 2400, 'linear'), cap(3200, 'Котёнок побежал… Сердце стучит чаще!'),
    pulse(3400, 'heart', 8, 300),
    cap(6000, 'При беге мышцам нужно больше кислорода — сердце гонит кровь быстрее.'), pop(6000, 'why'), mood(6000, 'cat', 'happy'),
  ),
});

// интерактив: нажми — котёнок объяснит
ep3.interact = { type: 'tapShow', cat: 'cat', items: {
  inc: { say: 'Incisors — резцы: передние зубы, откусывают.' }, mol: { say: 'Molars — коренные зубы: перетирают еду.' },
  stom: { show: ['st'], say: 'Stomach — желудок: переваривает еду.' },
} };

export default { topic: 'science-1-2', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

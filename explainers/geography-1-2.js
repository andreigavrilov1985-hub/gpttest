// Остров 1 · География · Тема 2. Рельеф, вода и погода — мини-мультфильм
import { card, text, emo, arrow, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, wiggle, episode, beat } from '../js/cartoon-kit.js';

// серия 1: вулкан
const blobs = Array.from({ length: 5 }, (_, i) => `<g data-a="lv${i}"><circle r="${6 + (i % 3) * 2}" fill="#ff5a2a"/></g>`).join('');
const ep1 = episode({
  title: 'Вулкан',
  terms: ['вулкан', 'магма', 'лава'],
  svg: `<rect x="0" y="0" width="360" height="240" fill="#e9f8ff"/><rect x="0" y="180" width="360" height="60" fill="#a77b5a"/>
    <path d="M80 180 L160 70 h40 L280 180 z" fill="#8a6d5a"/><g data-a="magma"><ellipse cx="180" cy="214" rx="70" ry="18" fill="#ff7a2a"/></g>${blobs}
    <g data-a="flow"><path d="M175 72 q-20 40 -50 108 h18 q20 -60 42 -108z" fill="#ff5a2a"/></g>${emo('ash', '☁️', 50)}
    ${text('mg', 'магма — под землёй', { size: 14, color: '#c0392b' })}${text('lv', 'лава — снаружи', { size: 14, color: '#c0392b' })}${kittenActor('cat', 'surprised', 40)}`,
  init: { magma: { o: 0 }, ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`lv${i}`, at(180, 200, { o: 0 })])), flow: { o: 0 }, ash: hid(180, 40), mg: hid(270, 226), lv: hid(80, 120), cat: at(300, 120) },
  caption0: 'Вулкан — гора с отверстием на вершине.',
  beats: beat(
    [[800, 'to', 'magma', { o: 1 }, 600]], cap(1000, 'Глубоко под землёй — раскалённая жидкая порода: магма.'), pop(1400, 'mg'),
    cap(3600, 'Бах! Вулкан проснулся.'), wiggle(3600, 'cat'),
    ...Array.from({ length: 5 }, (_, i) => [[3800 + i * 120, 'to', `lv${i}`, { o: 1 }, 100], [3800 + i * 120, 'to', `lv${i}`, { x: 150 + i * 15, y: 50 - (i % 2) * 20 }, 900, 'out']]),
    pop(4300, 'ash'), [[4800, 'to', 'flow', { o: 1 }, 800]],
    cap(5400, 'Когда магма выходит наружу, её называют лавой.'), pop(5400, 'lv'), mood(5400, 'cat', 'excited'),
  ),
});

// серия 2: круговорот воды
const ep2 = episode({
  title: 'Круговорот воды',
  terms: ['испарение', 'конденсация', 'облако', 'осадки (дождь, снег, град)'],
  svg: `<rect x="0" y="0" width="360" height="240" fill="#e9f8ff"/><rect x="0" y="180" width="200" height="60" fill="#5bbfd6"/><path d="M200 180 L300 100 L360 140 V240 H200 z" fill="#9fd18b"/>
    ${emo('sun', '☀️', 46)}${[0, 1, 2].map((i) => `<g data-a="vap${i}"><path d="M0 0 q-6 -10 0 -20 q6 -10 0 -20" stroke="#9adbe8" stroke-width="4" fill="none" stroke-linecap="round"/></g>`).join('')}
    ${emo('cloud', '☁️', 66)}${Array.from({ length: 6 }, (_, i) => `<g data-a="rain${i}"><path d="M0 0 l-3 10" stroke="#2bb3c9" stroke-width="3" stroke-linecap="round"/></g>`).join('')}
    ${text('t1', 'испарение', { size: 14, color: '#1784a6' })}${text('t2', 'конденсация', { size: 14, color: '#1784a6' })}${text('t3', 'осадки', { size: 14, color: '#1784a6' })}${kittenActor('cat', 'excited', 36)}`,
  init: { sun: at(40, 36), ...Object.fromEntries([0, 1, 2].map((i) => [`vap${i}`, at(60 + i * 40, 176, { o: 0 })])), cloud: hid(240, 50), ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`rain${i}`, at(220 + i * 8, 76, { o: 0 })])),
    t1: hid(100, 130), t2: hid(240, 18), t3: hid(310, 86), cat: at(10, 190) },
  caption0: 'Солнце греет море…',
  beats: beat(
    ...[0, 1, 2].map((i) => [[600 + i * 300, 'to', `vap${i}`, { o: 1 }, 300], [600 + i * 300, 'to', `vap${i}`, { y: 110 }, 2200]]),
    cap(1200, 'Вода превращается в невидимый пар и поднимается: испарение.'), pop(1400, 't1'),
    cap(3800, 'Наверху пар остывает и становится капельками: конденсация. Получается облако!'), fade(3800, ['vap0', 'vap1', 'vap2']), pop(3800, ['cloud', 't2']),
    move(5400, 'cloud', { x: 290 }, 1200),
    ...Array.from({ length: 6 }, (_, i) => [[6600 + i * 150, 'to', `rain${i}`, { o: 1, x: 270 + i * 8 }, 100], [6600 + i * 150, 'to', `rain${i}`, { y: 130 }, 800]]),
    cap(6600, 'Из облака падают осадки: дождь, снег или град.'), pop(6800, 't3'),
    cap(9000, 'Вода стекает обратно в море — и всё по кругу!'), mood(9000, 'cat', 'happy'),
  ),
});

// серия 3: река
const ep3 = episode({
  title: 'Река',
  terms: ['исток', 'устье', 'приток'],
  svg: `<rect x="0" y="0" width="360" height="240" fill="#e3f6d5"/><path d="M20 70 L60 20 L100 70 z" fill="#8a6d5a"/><rect x="290" y="150" width="70" height="90" fill="#5bbfd6"/>
    <path data-a="river" data-draw d="M60 60 C 120 80, 100 140, 180 150 S 260 190, 300 190" fill="none" stroke="#2bb3c9" stroke-width="10" stroke-linecap="round"/>
    <path data-a="trib" data-draw d="M170 30 C 180 80, 160 110, 170 148" fill="none" stroke="#7fd0e3" stroke-width="6" stroke-linecap="round"/>
    ${text('src', 'исток — начало', { size: 14 })}${text('mouth', 'устье — впадает в море', { size: 14 })}${text('tr', 'приток', { size: 14, color: '#1784a6' })}${emo('boat', '⛵', 26)}${kittenActor('cat', 'excited', 36)}`,
  init: { src: hid(90, 90), mouth: hid(250, 222), tr: hid(210, 50), boat: at(60, 56, { o: 0 }), cat: at(300, 4) },
  caption0: 'Река начинается высоко в горах.',
  beats: beat(
    pop(600, 'src'), cap(800, 'Место, где река начинается, — исток.'),
    draw(2200, 'river', 2400), [[2200, 'to', 'boat', { o: 1 }, 200]], move(2200, 'boat', { x: 180, y: 140 }, 1400), move(3600, 'boat', { x: 290, y: 182 }, 1200),
    cap(2600, 'Река течёт вниз, к морю…'),
    draw(4300, 'trib', 900), pop(4600, 'tr'), cap(4300, 'В неё впадает маленькая речка — приток.'),
    cap(6200, 'Место, где река впадает в море, — устье.'), pop(6200, 'mouth'), mood(6200, 'cat', 'happy'),
  ),
});

// серия 4: погода и климат, рекорды
const days = ['☀️', '🌧️', '☁️', '☀️'];
const ep4 = episode({
  title: 'Погода и климат',
  terms: ['погода', 'климат', 'жарко около экватора', 'Эверест', 'Сахара'],
  svg: `${card('cal', 'пн', { w: 70, h: 50, size: 20, stroke: '#ff7a59' })}${emo('wx', '☀️', 46)}${text('w', 'погода — сегодня и завтра', { size: 14 })}
    ${card('clim', 'климат — обычная погода за много лет', { w: 300, size: 14, fill: '#eef7fb' })}
    ${emo('mount', '🏔️', 46)}${text('ev', 'Эверест ~8849 м — выше всех', { size: 13 })}${emo('desert', '🏜️', 46)}${text('sa', 'Сахара — самая большая жаркая пустыня', { size: 12 })}
    ${kittenActor('cat', 'excited', 34)}`,
  init: { cal: hid(60, 50), wx: hid(140, 50), w: hid(250, 52), clim: hid(180, 110), mount: hid(40, 160), ev: hid(160, 162), desert: hid(40, 212), sa: hid(180, 214), cat: at(318, 150) },
  caption0: 'Погода меняется каждый день.',
  beats: beat(
    pop(200, ['cal', 'wx', 'w'], 200),
    ...days.map((d, i) => [...setText(1000 + i * 700, 'wx', d), ...setText(1000 + i * 700, 'calT', ['пн', 'вт', 'ср', 'чт'][i])]).flat(),
    cap(3800, 'А климат — какая погода обычно бывает здесь много лет. Около экватора жарко.'), pop(3800, 'clim'),
    cap(6400, 'Самая высокая гора над уровнем моря — Эверест.'), pop(6400, ['mount', 'ev']),
    cap(8200, 'Самая большая жаркая пустыня — Сахара в Африке.'), pop(8200, ['desert', 'sa']), mood(8200, 'cat', 'happy'),
  ),
});

// интерактив: нажми — котёнок объяснит
ep1.interact = { type: 'tapShow', cat: 'cat', items: {
  magma: { show: ['mg'], say: 'Магма — раскалённая порода под землёй.' },
  flow: { show: ['lv'], say: 'Лава — это магма, которая вышла наружу.' },
} };

export default { topic: 'geography-1-2', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

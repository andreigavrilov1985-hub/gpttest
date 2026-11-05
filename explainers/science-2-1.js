// Остров 2 · Наука · Тема 1. Клетки и организмы — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: микроскоп
let cells = '';
for (let r = 0; r < 3; r += 1) for (let c = 0; c < 4; c += 1) cells += `<g data-a="c${r}${c}"><rect x="${c * 46}" y="${r * 36}" width="44" height="34" rx="6" fill="#c6f0b6" stroke="#4aa05c" stroke-width="2"/><circle cx="${c * 46 + 22}" cy="${r * 36 + 17}" r="6" fill="#7a5ccf"/></g>`;
const ep1 = episode({
  title: 'Под микроскопом',
  terms: ['cell (клетка) — самая маленькая единица жизни', 'microscope'],
  svg: `${emo('leaf', '🍃', 60)}${emo('mic', '🔬', 54)}<g data-a="view"><circle cx="0" cy="0" r="84" fill="#fff" stroke="#23324a" stroke-width="5"/></g><g data-a="grid">${cells}</g>
    ${text('t', 'cell — клетка', { size: 18, color: '#16774a' })}${kittenActor('cat', 'surprised', 34)}`,
  init: { leaf: at(80, 120), mic: at(250, 120, { o: 0 }), view: at(200, 120, { o: 0, s: 0.2 }), grid: at(108, 66, { o: 0 }), t: hid(300, 30), cat: at(4, 4) },
  caption0: 'Обычный листик. Что у него внутри?',
  beats: beat(
    [[800, 'to', 'mic', { o: 1 }, 400]], cap(1000, 'Посмотрим в microscope — микроскоп. Он увеличивает в сотни раз.'),
    move(2600, 'leaf', { x: 200, s: 0.3, o: 0 }, 800), [[2600, 'to', 'view', { o: 1, s: 1 }, 800], [3200, 'to', 'grid', { o: 1 }, 600]], fade(2600, 'mic'),
    cap(3800, 'Лист сложен из крошечных «кирпичиков» — клеток!'), pop(4400, 't'),
    cap(6000, 'Cell — клетка — самая маленькая единица жизни.'), mood(6000, 'cat', 'excited'),
  ),
});

// серия 2: части клетки (интерактив)
const ep2 = episode({
  title: 'Что внутри клетки',
  terms: ['nucleus (ядро)', 'cell membrane (мембрана)', 'mitochondria', 'cell wall', 'chloroplast'],
  svg: `<g data-a="wall"><rect x="-120" y="-80" width="240" height="160" rx="20" fill="none" stroke="#3f9d4f" stroke-width="8"/></g>
    <g data-a="mem"><rect x="-110" y="-70" width="220" height="140" rx="16" fill="#e3f6d5" stroke="#8ccf73" stroke-width="3"/></g>
    <g data-a="nuc"><circle r="24" fill="#9b5cf6"/><circle r="10" fill="#6d3ad1"/></g><g data-a="mito"><ellipse rx="22" ry="11" fill="#ff9a3c"/><path d="M-14 0 q4 -6 8 0 q4 6 8 0 q4 -6 8 0" stroke="#c96a12" stroke-width="2" fill="none"/></g>
    <g data-a="chl"><ellipse rx="16" ry="9" fill="#2f9a59"/></g><g data-a="chl2"><ellipse rx="16" ry="9" fill="#2f9a59"/></g>
    ${text('lab', 'нажимай на части клетки', { size: 13, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 30)}`,
  init: { wall: at(180, 120, { o: 0 }), mem: at(180, 120), nuc: hid(180, 120), mito: hid(110, 90), chl: hid(250, 80), chl2: hid(240, 160), lab: hid(180, 226), cat: at(318, 4) },
  caption0: 'Нажимай на части клетки — котёнок расскажет.',
  beats: beat(
    pop(400, 'nuc'), cap(800, 'Nucleus — ядро — командует клеткой.'),
    cap(2600, 'Cell membrane — тонкая оболочка: пропускает внутрь и наружу только нужное.'), move(2600, 'mem', { s: 1.04 }, 300), move(2900, 'mem', { s: 1 }, 300),
    pop(4600, 'mito'), cap(4600, 'Mitochondria — «батарейки»: выпускают энергию из еды (дыхание клетки).'),
    cap(6800, 'У растений есть ещё cell wall — твёрдая стенка — и chloroplasts для фотосинтеза.'), [[6800, 'to', 'wall', { o: 1 }, 500]], pop(7200, ['chl', 'chl2']), pop(8000, 'lab'), mood(7200, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: {
    nuc: { say: 'Nucleus — ядро: управляет клеткой.' }, mito: { say: 'Mitochondria: выпускают энергию из пищи.' },
    chl: { say: 'Chloroplast: здесь идёт фотосинтез. Есть только у растений.' }, chl2: { say: 'Chloroplast: здесь идёт фотосинтез.' },
    wall: { say: 'Cell wall — клеточная стенка. Только у растений.' }, mem: { say: 'Membrane: решает, что войдёт и что выйдет.' },
  } },
});

// серия 3: клетка → ткань → орган → организм
const ep3 = episode({
  title: 'Из клеток — организм',
  terms: ['tissue (ткань)', 'organ (орган)', 'organism', 'порядок: cell → tissue → organ'],
  svg: `${card('c', '🔵 cell', { w: 76, size: 14 })}${card('t', '🔵🔵🔵 tissue', { w: 110, size: 13 })}${card('o', '❤️ organ', { w: 90, size: 14 })}${card('s', '🧍 organism', { w: 110, size: 14 })}
    ${text('a1', '→', { size: 22, color: '#ff7a59' })}${text('a2', '→', { size: 22, color: '#ff7a59' })}${text('a3', '→', { size: 22, color: '#ff7a59' })}
    ${text('d', 'cell → tissue → organ → organism', { size: 14, color: '#5b6b83' })}${kittenActor('cat', 'excited', 34)}`,
  init: { c: hid(46, 110), a1: hid(92, 116), t: hid(150, 110), a2: hid(212, 116), o: hid(256, 110), a3: hid(306, 116), s: hid(300, 170), d: hid(180, 216), cat: at(4, 4) },
  caption0: 'Как из маленьких клеток получается живое существо?',
  beats: beat(
    pop(300, 'c'), cap(900, 'Одна клетка…'), pop(1800, ['a1', 't'], 200), cap(1800, 'Много похожих клеток работают вместе — это tissue, ткань.'),
    pop(3800, ['a2', 'o'], 200), cap(3800, 'Несколько тканей вместе — organ, орган. Например, сердце.'),
    pop(5800, ['a3', 's'], 200), cap(5800, 'Органы вместе — целый организм. От меньшего к большему: cell, tissue, organ.'), pop(6600, 'd'), mood(6600, 'cat', 'happy'),
  ),
});

export default { topic: 'science-2-1', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

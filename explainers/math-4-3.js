// Остров 4 · Математика · Тема 3. Тригонометрия, подобие и объёмы — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: SOH CAH TOA
const ep1 = episode({
  title: 'Синус и косинус',
  terms: ['sin = противолежащий ÷ гипотенуза', 'cos = прилежащий ÷ гипотенуза', 'tan = противолежащий ÷ прилежащий', 'sin 30° = 0,5', 'Пифагор'],
  svg: `<path d="M40 190 L240 190 L240 70 Z" fill="#fff3d6" stroke="#d2a861" stroke-width="3"/><path d="M80 190 A40 40 0 0 0 76 172" stroke="#ff7a59" stroke-width="3" fill="none"/>${text('ang', 'угол', { size: 12, color: '#ff7a59' })}
    ${text('hyp', 'гипотенуза 10', { size: 13, color: '#c0392b' })}${text('opp', 'противолежащий 6', { size: 12, color: '#1784a6' })}${text('adj', 'прилежащий 8', { size: 13, color: '#16774a' })}
    ${card('sin', 'sin = 6 ÷ 10 = 0,6', { w: 170, size: 14, fill: '#eef7fb' })}${card('cos', 'cos = 8 ÷ 10 = 0,8', { w: 170, size: 14, fill: '#e2f8ea', stroke: '#9fdcb9' })}${text('py', '6² + 8² = 36 + 64 = 100 = 10²', { size: 12, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { ang: hid(98, 180), hyp: hid(120, 116), opp: hid(296, 130), adj: hid(140, 210), sin: hid(270, 30), cos: hid(270, 64), py: hid(180, 232), cat: at(4, 4) },
  caption0: 'Стороны прямоугольного треугольника называют по отношению к углу.',
  beats: beat(
    pop(300, 'ang'), pop(800, 'hyp'), cap(800, 'Гипотенуза — напротив прямого угла, самая длинная.'),
    pop(2200, 'opp'), cap(2200, 'Противолежащий катет — напротив нашего угла.'), pop(3400, 'adj'), cap(3400, 'Прилежащий — рядом с углом.'),
    cap(4800, 'Синус — противолежащий ÷ гипотенуза, косинус — прилежащий ÷ гипотенуза.'), pop(4800, ['sin', 'cos'], 400), pop(6400, 'py'), mood(6400, 'cat', 'happy'),
  ),
});

// серия 2: подобие и масштаб площади
const ep2 = episode({
  title: 'Подобие',
  terms: ['подобные фигуры', 'длины × k → площадь × k²', 'внешний угол правильного n-угольника = 360° ÷ n'],
  svg: `<g data-a="s1"><rect x="0" y="0" width="40" height="30" fill="#2bb3c9"/></g><g data-a="s2"><rect x="0" y="0" width="80" height="60" fill="#2bb3c9" opacity=".6"/>${[1].map(() => '<path d="M40 0 V60 M0 30 H80" stroke="#fff" stroke-width="2"/>').join('')}</g>
    ${text('k', 'длины × 2', { size: 15, color: '#ff7a59' })}${text('a', 'площадь × 2² = × 4', { size: 16, color: '#16774a' })}${card('ext', 'правильный восьмиугольник: внешний угол 360° ÷ 8 = 45°', { w: 340, size: 12, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 24)}`,
  init: { s1: hid(60, 60), s2: hid(170, 45), k: hid(180, 30), a: hid(210, 130), ext: hid(180, 200), cat: at(320, 4) },
  caption0: 'Увеличим прямоугольник: все длины в 2 раза.',
  beats: beat(
    pop(300, 's1'), pop(1200, ['k', 's2'], 300), cap(1600, 'Стороны выросли вдвое, а внутри поместилось 4 прежних прямоугольника!'), pop(3000, 'a'),
    cap(4600, 'Если длины × k, то площадь × k².'), mood(4600, 'cat', 'happy'),
    cap(6200, 'А внешние углы правильного многоугольника вместе дают 360°.'), pop(6200, 'ext'),
  ),
});

// серия 3: объёмы и площади поверхности
const ep3 = episode({
  title: 'Объём цилиндра',
  terms: ['объём цилиндра = πr² × h', 'площадь части круга', 'площадь поверхности куба = 6 × сторона²'],
  svg: `<g data-a="cyl"><ellipse cx="0" cy="0" rx="50" ry="14" fill="#9adbe8" stroke="#1784a6" stroke-width="2"/><rect x="-50" y="0" width="100" height="90" fill="#cfe6ef"/><ellipse cx="0" cy="90" rx="50" ry="14" fill="#cfe6ef" stroke="#1784a6" stroke-width="2"/><path d="M-50 0 V90 M50 0 V90" stroke="#1784a6" stroke-width="2"/></g>
    ${text('v', 'V = πr² × h: площадь дна × высоту', { size: 14, color: '#1784a6' })}${text('vx', 'r = 2, h = 5 → V = 20π', { size: 15, color: '#16774a' })}
    ${card('cube', 'куб со стороной 2: 6 граней × 4 = 24', { w: 300, size: 14, fill: '#fff3d6', stroke: '#f2c46d' })}${text('q', 'половина круга r = 2: π × 4 ÷ 2 = 2π', { size: 13, color: '#6d3ad1' })}${kittenActor('cat', 'excited', 22)}`,
  init: { cyl: hid(80, 40), v: hid(240, 60), vx: hid(240, 92), cube: hid(180, 196), q: hid(180, 228), cat: at(320, 120) },
  caption0: 'Цилиндр — стопка одинаковых кругов.',
  beats: beat(
    pop(300, 'cyl'), cap(1000, 'Объём = площадь круга-дна × высоту: πr² × h.'), pop(1600, ['v', 'vx'], 500),
    cap(3600, 'Площадь поверхности куба: 6 одинаковых квадратных граней.'), pop(3600, 'cube'),
    cap(5400, 'Часть круга — та же доля от πr²: половина, четверть…'), pop(5400, 'q'), mood(5400, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { hyp: { say: 'Гипотенуза — напротив прямого угла.' }, opp: { say: 'Противолежащий — напротив нашего угла.' }, adj: { say: 'Прилежащий — рядом с углом.' } } };

export default { topic: 'math-4-3', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

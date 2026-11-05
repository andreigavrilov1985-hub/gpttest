// Остров 2 · География · Тема 1. Координаты, масштаб и высота на карте — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, cutLine, episode, beat } from '../js/cartoon-kit.js';

// серия 1: широта и долгота на глобусе
const ep1 = episode({
  title: 'Широта и долгота',
  terms: ['широта (от экватора, 0°–90°)', 'Северный полюс 90° с. ш.', 'долгота, меридианы с севера на юг', 'восточная долгота'],
  svg: `<circle cx="120" cy="120" r="90" fill="#bdeef3" stroke="#1784a6" stroke-width="3"/>
    ${cutLine('eq', 30, 120, 210, 120, '#ff7a59')}${cutLine('p1', 48, 75, 192, 75, '#ffb48a')}${cutLine('p2', 78, 45, 162, 45, '#ffb48a')}
    <path data-a="m1" data-draw d="M120 30 Q170 120 120 210" stroke="#9b5cf6" stroke-width="3" fill="none"/><path data-a="m2" data-draw d="M120 30 Q70 120 120 210" stroke="#9b5cf6" stroke-width="3" fill="none"/><line data-a="m0" data-draw x1="120" y1="30" x2="120" y2="210" stroke="#9b5cf6" stroke-width="3"/>
    ${text('e0', '0°', { size: 14, color: '#ff7a59' })}${text('np', '90° с. ш. — Северный полюс', { size: 12 })}<g data-a="dub"><circle r="6" fill="#ff7a59"/></g>${text('dubT', 'Дубай ≈ 25° с. ш., в. д.', { size: 12, color: '#c0392b' })}
    ${text('lat', 'широта: от экватора', { size: 13, color: '#ff7a59' })}${text('lon', 'меридианы: с С на Ю', { size: 13, color: '#6d3ad1' })}${kittenActor('cat', 'excited', 30)}`,
  init: { e0: hid(222, 124), np: hid(180, 22), dub: hid(150, 90), dubT: hid(270, 74), lat: hid(285, 150), lon: hid(285, 176), cat: at(320, 200) },
  caption0: 'Глобус расчерчен линиями. Они помогают найти любое место.',
  beats: beat(
    draw(600, 'eq', 800), pop(1400, 'e0'), cap(1200, 'Экватор — широта 0°.'),
    draw(2400, 'p1', 600), draw(2900, 'p2', 600), pop(3400, ['np', 'lat'], 300), cap(2400, 'Широта — насколько место севернее или южнее экватора. До полюса — 90°.'),
    draw(5400, 'm0', 600), draw(5800, 'm1', 600), draw(6200, 'm2', 600), pop(6600, 'lon'), cap(5400, 'Меридианы идут с севера на юг. Они показывают долготу.'),
    pop(8400, ['dub', 'dubT'], 300), cap(8400, 'Дубай — около 25° северной широты и к востоку от нулевого меридиана.'), mood(8400, 'cat', 'happy'),
  ),
});

// серия 2: масштаб 1 : 100 000
const ep2 = episode({
  title: 'Числовой масштаб',
  terms: ['масштаб 1 : 100 000', '1 см = 100 000 см = 1 км', '1 : 50 000 → 1 см = 500 м'],
  svg: `${card('sc', '1 : 100 000', { w: 160, h: 46, size: 24, fill: '#fff3d6', stroke: '#f2c46d' })}${text('s1', '1 см на карте = 100 000 см в жизни', { size: 14 })}${text('s2', '100 000 см = 1 000 м = 1 км', { size: 16, color: '#16774a' })}
    <path d="M40 180 h240" stroke="#23324a" stroke-width="3"/>${[0, 1, 2, 3].map((i) => `<line x1="${40 + i * 80}" y1="172" x2="${40 + i * 80}" y2="188" stroke="#23324a" stroke-width="3"/>`).join('')}
    ${text('s3', '1 : 50 000 → 1 см = 500 м; 3 см = 1,5 км', { size: 13, color: '#1784a6' })}${kittenActor('cat', 'excited', 28)}`,
  init: { sc: hid(180, 40), s1: hid(180, 84), s2: hid(180, 116), s3: hid(180, 222), cat: at(40, 136) },
  caption0: 'Масштаб может быть записан числами: 1 : 100 000.',
  beats: beat(
    pop(300, 'sc'), cap(1000, 'Это значит: 1 см на карте — 100 000 см на земле.'), pop(1400, 's1'),
    cap(3200, 'Убираем два нуля — метры, ещё три — километры: это 1 км!'), pop(3200, 's2'),
    cap(5200, 'Масштаб 1 : 50 000 — каждый см это 500 м. Котёнок шагает по карте:'), ...[1, 2, 3].map((i) => hop(5600 + (i - 1) * 700, 'cat', { x: 40 + i * 80 }, 600)), pop(7800, 's3'), mood(7800, 'cat', 'happy'),
  ),
});

// серия 3: горизонтали
const ep3 = episode({
  title: 'Горизонтали',
  terms: ['горизонтали (изолинии) — одинаковая высота', 'близко — склон крутой', 'далеко — пологий'],
  svg: `<path d="M20 200 Q120 40 200 40 Q260 40 340 200 Z" fill="#c9a77d"/>${[160, 120, 80].map((y, i) => `<line data-a="h${i}" data-draw x1="${40 + i * 30}" y1="${y}" x2="${320 - i * 20}" y2="${y}" stroke="#7a4a2a" stroke-width="2" stroke-dasharray="5 4"/>`).join('')}
    ${text('t1', '100 м', { size: 12 })}${text('t2', '200 м', { size: 12 })}${text('t3', '300 м', { size: 12 })}
    ${text('steep', 'слева линии ближе — склон крутой', { size: 13, color: '#c0392b' })}${text('gent', 'справа реже — пологий', { size: 13, color: '#16774a' })}${kittenActor('cat', 'thinking', 30)}`,
  init: { t1: hid(30, 154), t2: hid(60, 114), t3: hid(90, 74), steep: hid(140, 222), gent: hid(260, 20), cat: at(318, 160) },
  caption0: 'Это холм сбоку. Разрежем его на одинаковых высотах.',
  beats: beat(
    ...[0, 1, 2].map((i) => [...draw(600 + i * 700, `h${i}`, 600), ...pop(1100 + i * 700, `t${i + 1}`)]),
    cap(1400, 'Каждая линия соединяет точки одной высоты — это горизонталь.'),
    cap(4200, 'Где линии близко друг к другу, склон крутой.'), pop(4200, 'steep'), mood(4200, 'cat', 'surprised'),
    cap(6000, 'Где линии далеко — склон пологий, идти легко.'), pop(6000, 'gent'), mood(6000, 'cat', 'happy'),
  ),
});

ep2.interact = { type: 'tapShow', cat: 'cat', items: { sc: { show: ['s1', 's2'], say: '1 : 100 000 — 1 см на карте равен 1 км на земле.' } } };

export default { topic: 'geography-2-1', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

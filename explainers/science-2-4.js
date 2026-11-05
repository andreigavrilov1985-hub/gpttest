// Остров 2 · Наука · Тема 4. Энергия, звук и свет — мини-мультфильм
import { card, text, emo, arrow, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, cutLine, episode, beat } from '../js/cartoon-kit.js';

// серия 1: запасы и передача энергии
const ep1 = episode({
  title: 'Куда девается энергия',
  terms: ['energy store (запас энергии)', 'chemical (батарейка)', 'kinetic (движение)', 'thermal (тепло)', 'joule', 'энергия не исчезает, а передаётся'],
  svg: `${emo('bat', '🔋', 46)}${emo('bulb', '💡', 46)}${emo('heat', '🔥', 30)}${arrow('a1', 90, 70, 150, 70)}${text('l1', 'chemical', { size: 13, color: '#16774a' })}${text('l2', 'light + thermal', { size: 13, color: '#b06200' })}
    ${emo('car', '🚗', 40)}${text('k', 'kinetic — энергия движения', { size: 13, color: '#1784a6' })}${card('j', 'энергию измеряют в joules (Дж)', { w: 250, size: 14, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 30)}`,
  init: { bat: hid(60, 70), bulb: hid(190, 70), heat: hid(230, 50), a1: { o: 0 }, l1: hid(60, 108), l2: hid(210, 108), car: at(40, 160, { o: 0 }), k: hid(220, 162), j: hid(180, 218), cat: at(320, 4) },
  caption0: 'Энергия не появляется и не исчезает — она переходит из одного запаса в другой.',
  beats: beat(
    pop(400, ['bat', 'l1'], 200), cap(1600, 'В батарейке — chemical energy, химическая.'),
    [[3000, 'to', 'a1', { o: 1 }, 100]], draw(3000, 'a1L', 500), pop(3500, ['bulb', 'l2'], 200), pop(4000, 'heat'),
    cap(3500, 'Лампа превращает её в свет — и ещё в тепло (thermal energy).'),
    [[5600, 'to', 'car', { o: 1 }, 200]], move(5600, 'car', { x: 150 }, 1200), pop(6000, 'k'), cap(5600, 'У движущейся машины — kinetic energy.'),
    pop(7600, 'j'), cap(7600, 'Энергию измеряют в джоулях — joules.'), mood(7600, 'cat', 'happy'),
  ),
});

// серия 2: звуку нужна среда
const waves = (p, n, x0) => Array.from({ length: n }, (_, i) => `<g data-a="${p}${i}"><path d="M0 -14 q8 14 0 28" stroke="#2bb3c9" stroke-width="3" fill="none" stroke-linecap="round"/></g>`).join('');
const ep2 = episode({
  title: 'Звуку нужна среда',
  terms: ['sound needs a medium (материал)', 'в вакууме звука нет', 'быстрее всего в твёрдом (steel)'],
  svg: `${emo('bell', '🔔', 40)}${waves('w', 3)}<g data-a="jar"><rect x="-50" y="-50" width="100" height="100" rx="20" fill="none" stroke="#9aa5b4" stroke-width="4" stroke-dasharray="6 5"/></g>${text('vac', 'вакуум: воздуха нет — тишина', { size: 13, color: '#5b6b83' })}
    ${card('sp', 'воздух < вода < сталь (steel)', { w: 260, size: 15, fill: '#e2f8ea', stroke: '#9fdcb9' })}${text('sp2', 'чем плотнее, тем быстрее', { size: 13, color: '#16774a' })}${kittenActor('cat', 'surprised', 30)}`,
  init: { bell: at(90, 80), ...Object.fromEntries([0, 1, 2].map((i) => [`w${i}`, at(120 + i * 18, 80, { o: 0 })])), jar: at(90, 80, { o: 0 }), vac: hid(240, 84), sp: hid(180, 170), sp2: hid(180, 202), cat: at(320, 4) },
  caption0: 'Звенит колокольчик — звуковые волны бегут по воздуху.',
  beats: beat(
    ...[0, 1, 2].map((i) => [[400 + i * 300, 'to', `w${i}`, { o: 1 }, 200], [1600 + i * 100, 'to', `w${i}`, { o: 0 }, 300]]),
    cap(2400, 'Накроем колпаком и откачаем весь воздух…'), [[2400, 'to', 'jar', { o: 1 }, 500]],
    cap(4000, 'Колокольчик звенит, а звука нет! Звуку нужна среда — воздух, вода или твёрдое тело.'), pop(4400, 'vac'), mood(4400, 'cat', 'surprised'),
    cap(6800, 'Через твёрдое тело (сталь) звук бежит быстрее всего.'), pop(6800, ['sp', 'sp2'], 300), mood(6800, 'cat', 'happy'),
  ),
});

// серия 3: высота и громкость звука
const wave = (amp, freq, color) => {
  let d = 'M0 0';
  for (let x = 0; x <= 200; x += 4) d += ` L${x} ${(-amp * Math.sin((x / 200) * freq * 2 * Math.PI)).toFixed(1)}`;
  return `<path d="${d}" stroke="${color}" stroke-width="3" fill="none"/>`;
};
const ep3 = episode({
  title: 'Высоко и громко',
  terms: ['pitch (высота) зависит от frequency (частоты)', 'loudness (громкость) зависит от amplitude'],
  svg: `<g data-a="lo">${wave(16, 2, '#2bb3c9')}</g><g data-a="hi">${wave(16, 6, '#9b5cf6')}</g><g data-a="loud">${wave(36, 2, '#e4553b')}</g>
    ${text('t1', 'низкий звук: волны редкие', { size: 13, color: '#1784a6' })}${text('t2', 'высокий: частые — frequency больше', { size: 13, color: '#6d3ad1' })}${text('t3', 'громкий: волна выше — amplitude больше', { size: 13, color: '#c0392b' })}
    ${emo('note', '🎵', 30)}${kittenActor('cat', 'excited', 28)}`,
  init: { lo: at(60, 50, { o: 0 }), hi: at(60, 110, { o: 0 }), loud: at(60, 180, { o: 0 }), t1: hid(160, 80), t2: hid(170, 140), t3: hid(180, 226), note: hid(30, 50), cat: at(320, 4) },
  caption0: 'Звук — это волна. У неё два главных свойства.',
  beats: beat(
    [[300, 'to', 'lo', { o: 1 }, 400]], pop(600, ['note', 't1'], 200),
    cap(1600, 'Pitch — высота звука. Чем чаще волны (frequency), тем звук выше.'), [[2400, 'to', 'hi', { o: 1 }, 400]], pop(2800, 't2'),
    cap(4800, 'Amplitude — высота волны. Чем она больше, тем звук громче.'), [[4800, 'to', 'loud', { o: 1 }, 400]], pop(5200, 't3'), mood(5200, 'cat', 'happy'),
  ),
});

// серия 4: отражение
const ep4 = episode({
  title: 'Зеркало',
  terms: ['reflection (отражение)', 'угол падения = углу отражения'],
  svg: `<rect x="40" y="190" width="280" height="10" fill="#bfe8f2" stroke="#1784a6" stroke-width="2"/>${cutLine('n', 180, 70, 180, 190, '#9aa5b4')}
    ${cutLine('in', 70, 80, 180, 190, '#ffb400')}${cutLine('out', 180, 190, 290, 80, '#ffb400')}${text('i', 'угол падения', { size: 13, color: '#b06200' })}${text('r', 'угол отражения', { size: 13, color: '#b06200' })}
    ${card('eq', 'они равны!', { w: 120, size: 16, fill: '#e2f8ea', stroke: '#9fdcb9' })}${emo('torch', '🔦', 30)}${kittenActor('cat', 'excited', 30)}`,
  init: { i: hid(120, 160), r: hid(244, 160), eq: hid(180, 40), torch: at(60, 70), cat: at(4, 196) },
  caption0: 'Луч света падает на зеркало…',
  beats: beat(
    draw(400, 'in', 800), cap(1400, '…и отражается: отскакивает, как мяч.'), draw(1400, 'out', 800), draw(2200, 'n', 500),
    pop(2800, ['i', 'r'], 300), cap(3200, 'Угол падения равен углу отражения.'), pop(4000, 'eq'), mood(4000, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: {
  bat: { say: 'Батарейка хранит chemical energy.' }, bulb: { say: 'Лампа: электричество → свет + тепло.' }, car: { say: 'Едущая машина: kinetic energy.' },
} };

export default { topic: 'science-2-4', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

// Остров 5 · Наука · Тема 3. Электрические цепи: закон Ома и мощность — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat } from '../js/cartoon-kit.js';

const loop = '<rect x="40" y="50" width="200" height="130" rx="12" fill="none" stroke="#23324a" stroke-width="4"/>';
const charges = (k) => Array.from({ length: k }, (_, i) => `<g data-a="q${i}"><circle r="5" fill="#ffd166" stroke="#d4a017"/></g>`).join('');
// точка на контуре по доле пути 0..1
function onLoop(f) {
  const P = 2 * (200 + 130); let d = f * P;
  if (d < 200) return [40 + d, 50]; d -= 200; if (d < 130) return [240, 50 + d]; d -= 130; if (d < 200) return [240 - d, 180]; d -= 200; return [40, 180 - d];
}
const flow = (t0, k, laps, dur) => Array.from({ length: k }, (_, i) => Array.from({ length: laps * 8 }, (_, j) => {
  const [x, y] = onLoop(((i / k) + (j + 1) / 8) % 1);
  return [t0 + j * (dur / 8), 'to', `q${i}`, { x, y }, dur / 8, 'linear'];
}));

// серия 1: закон Ома
const ep1 = episode({
  title: 'Закон Ома',
  terms: ['напряжение V (вольты) — «толкает» ток', 'сила тока I (амперы) — сколько заряда течёт', 'сопротивление R (омы) — мешает току', 'V = I × R'],
  svg: `${loop}<rect x="20" y="95" width="40" height="40" fill="#fff3d6" stroke="#f2c46d" stroke-width="2"/><text x="40" y="121" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="14">🔋</text>
    <g data-a="res"><rect x="-30" y="-12" width="60" height="24" fill="#fff" stroke="#c0392b" stroke-width="3"/></g>${charges(6)}
    ${text('vl', 'V = 10 В', { size: 13, color: '#b06200' })}${text('rl', 'R = 5 Ом', { size: 13, color: '#c0392b' })}
    ${card('ohm', 'V = I × R', { w: 110, h: 44, size: 22, fill: '#e2f8ea', stroke: '#9fdcb9' })}${text('ex', 'I = 10 ÷ 5 = 2 А', { size: 13, color: '#16774a' })}${text('up', 'больше R → меньше I', { size: 12, color: '#6d3ad1' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { res: at(140, 180), ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => { const [x, y] = onLoop(i / 6); return [`q${i}`, at(x, y)]; })), vl: hid(40, 80), rl: hid(140, 206), ohm: hid(296, 60), ex: hid(296, 110), up: hid(296, 140), cat: at(320, 200) },
  caption0: 'Батарейка толкает заряды по проводу — течёт ток.',
  beats: beat(
    flow(200, 6, 2, 3000), pop(600, 'vl'), cap(600, 'Толчок батарейки — напряжение, в вольтах.'), pop(1800, 'rl'), cap(1800, 'Резистор мешает току — это сопротивление, в омах.'),
    pop(3400, 'ohm'), cap(3400, 'Закон Ома: напряжение = ток × сопротивление.'), pop(4600, 'ex'),
    [[5800, 'to', 'res', { s: 1.4 }, 400]], flow(5800, 6, 1, 3000), pop(6000, 'up'), cap(5800, 'Сопротивление выросло, а напряжение то же — ток уменьшается.'), mood(6200, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { res: { say: 'Резистор: сопротивление в омах.' }, ohm: { say: 'V = I × R. Ищем ток: I = V ÷ R.' } } },
});

// серия 2: мощность и энергия
const ep2 = episode({
  title: 'Мощность',
  terms: ['мощность P = I × V (ватты)', 'энергия = мощность × время (джоули)', 'предохранитель перегорает при слишком большом токе'],
  svg: `${emo('bulb', '💡', 54)}${card('p', 'P = I × V = 2 × 10 = 20 Вт', { w: 240, size: 14 })}${card('e', 'энергия = 100 Вт × 10 с = 1000 Дж', { w: 280, size: 14, fill: '#fff3d6', stroke: '#f2c46d' })}
    <rect x="60" y="180" width="120" height="16" rx="8" fill="#fff" stroke="#9aa5b4" stroke-width="2"/><g data-a="wire"><path d="M64 188 H176" stroke="#d4a017" stroke-width="3"/></g>${emo('zap', '💥', 30)}
    ${text('fu', 'предохранитель: ток велик — проволочка плавится', { size: 11, color: '#c0392b' })}${kittenActor('cat', 'excited', 22)}`,
  init: { bulb: hid(50, 60), p: hid(220, 40), e: hid(200, 100), wire: at(0, 0), zap: hid(120, 160), fu: hid(180, 226), cat: at(320, 200) },
  caption0: 'Мощность — сколько энергии прибор тратит каждую секунду.',
  beats: beat(
    pop(200, 'bulb'), pop(800, 'p'), cap(800, 'Мощность = ток × напряжение, в ваттах.'),
    pop(2600, 'e'), cap(2600, 'За время t энергия = мощность × время.'),
    cap(4400, 'Если ток стал опасно большим…'), pop(5200, 'zap'), fade(5200, 'wire'), pop(5400, 'fu'), cap(5200, '…предохранитель перегорает и размыкает цепь — прибор цел.'), mood(5600, 'cat', 'happy'),
  ),
});

// серия 3: последовательно и параллельно
const ep3 = episode({
  title: 'Как соединить',
  terms: ['последовательно: R = R₁ + R₂', 'параллельно: на каждой ветви то же напряжение'],
  svg: `<path d="M20 60 H160" stroke="#23324a" stroke-width="3"/>${card('r1', '3 Ом', { w: 50, h: 28, size: 13 })}${card('r2', '5 Ом', { w: 50, h: 28, size: 13 })}${text('s', 'вместе 3 + 5 = 8 Ом', { size: 13, color: '#16774a' })}
    <path d="M200 120 H220 M220 80 V160 M220 80 H330 M220 160 H330 M330 80 V160" stroke="#23324a" stroke-width="3"/>${emo('b1', '💡', 26)}${emo('b2', '💡', 26)}
    ${text('pv', 'каждая ветвь: 12 В', { size: 13, color: '#1784a6' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { r1: hid(60, 60), r2: hid(120, 60), s: hid(90, 100), b1: hid(275, 80), b2: hid(275, 160), pv: hid(275, 210), cat: at(320, 4) },
  caption0: 'Последовательно — резисторы друг за другом.',
  beats: beat(
    pop(300, ['r1', 'r2'], 300), pop(1400, 's'), cap(1400, 'Току надо пройти оба — сопротивления складываются.'),
    pop(3000, ['b1', 'b2'], 300), pop(3800, 'pv'), cap(3000, 'Параллельно — ветви рядом. На каждой ветви полное напряжение батарейки.'), mood(3800, 'cat', 'happy'),
  ),
});

export default { topic: 'science-5-3', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

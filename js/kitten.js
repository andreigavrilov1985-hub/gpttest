// The kitten guide, drawn as inline SVG. No external images.
// Emotions: idle, happy, excited, thinking, sad_soft, surprised, sleepy, celebrate.
// Each emotion has its own face and pose; the motion lives in CSS (.kitten--<emotion>).
export const KITTEN_COLORS = [
  { id: 'ginger', name: 'Рыжий', main: '#ff9a3c', dark: '#d9711a' },
  { id: 'grey', name: 'Серый', main: '#9aa5b4', dark: '#6b7686' },
  { id: 'black', name: 'Чёрный', main: '#3b3f4a', dark: '#1f222a' },
  { id: 'white', name: 'Белый', main: '#fbf7f0', dark: '#d8cfc2' },
  { id: 'cream', name: 'Кремовый', main: '#f3d29b', dark: '#d2a861' },
  { id: 'blue', name: 'Голубой', main: '#8ec5ff', dark: '#5a97d6' },
  { id: 'pink', name: 'Розовый', main: '#ffadc9', dark: '#e37ea3' },
  { id: 'mint', name: 'Мятный', main: '#9fe3c6', dark: '#5fbf98' },
];

export const PATTERNS = [
  { id: 'plain', name: 'Однотонный' },
  { id: 'stripes', name: 'Полоски' },
  { id: 'patches', name: 'Пятна' },
];

export const EMOTIONS = ['idle', 'happy', 'excited', 'thinking', 'sad_soft', 'surprised', 'sleepy', 'celebrate'];
// Names used before round 2.
const ALIASES = { neutral: 'idle', cheer: 'excited', think: 'thinking' };

const color = (id) => KITTEN_COLORS.find((c) => c.id === id) || KITTEN_COLORS[0];
let uid = 0;

function face(emotion, eye, line) {
  const open = (rx = 5.5, ry = 7, dy = 0) => `<ellipse cx="50" cy="${65 + dy}" rx="${rx}" ry="${ry}" fill="${eye}"/><ellipse cx="80" cy="${65 + dy}" rx="${rx}" ry="${ry}" fill="${eye}"/>
    <circle cx="52" cy="${62 + dy}" r="2" fill="#fff"/><circle cx="82" cy="${62 + dy}" r="2" fill="#fff"/>`;
  const arcs = (d = 'M44 66 q6 -8 12 0', d2 = 'M74 66 q6 -8 12 0') => `<path d="${d}" stroke="${eye}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="${d2}" stroke="${eye}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const smile = `<path d="M58 80 q7 9 14 0" stroke="${line}" stroke-width="3" fill="#ff7b9c" stroke-linecap="round"/>`;
  const cat = `<path d="M58 80 q3.5 4 7 0 q3.5 4 7 0" stroke="${line}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  switch (emotion) {
    case 'happy': return arcs() + smile;
    case 'excited': return `${open(6, 7.5)}<circle cx="47" cy="68" r="1.4" fill="#fff"/><circle cx="77" cy="68" r="1.4" fill="#fff"/>${smile}`;
    case 'celebrate': return `${arcs()}<path d="M56 79 q9 13 18 0 z" fill="#ff7b9c" stroke="${line}" stroke-width="2.6" stroke-linejoin="round"/>`;
    case 'thinking': return `<ellipse cx="51" cy="62" rx="5" ry="6" fill="${eye}"/><ellipse cx="81" cy="62" rx="5" ry="6" fill="${eye}"/>
      <circle cx="52.5" cy="59.5" r="1.8" fill="#fff"/><circle cx="82.5" cy="59.5" r="1.8" fill="#fff"/>
      <path d="M43 52 l13 2 M87 51 l-12 4" stroke="${line}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M60 82 h11" stroke="${line}" stroke-width="2.6" stroke-linecap="round"/>`;
    case 'sad_soft': return `${open(5, 6.5, 2)}<path d="M42 55 l12 -3 M88 55 l-12 -3" stroke="${line}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M59 84 q6 -5 12 0" stroke="${line}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    case 'surprised': return `<circle cx="50" cy="64" r="8" fill="#fff" stroke="${eye}" stroke-width="2"/><circle cx="80" cy="64" r="8" fill="#fff" stroke="${eye}" stroke-width="2"/>
      <circle cx="50" cy="64" r="4.5" fill="${eye}"/><circle cx="80" cy="64" r="4.5" fill="${eye}"/>
      <ellipse cx="65" cy="84" rx="4" ry="5" fill="#ff7b9c" stroke="${line}" stroke-width="2"/>`;
    case 'sleepy': return `${arcs('M44 64 q6 6 12 0', 'M74 64 q6 6 12 0')}${cat}`;
    default: return open() + cat;
  }
}

function accessory(kind) {
  if (kind === 'crown') {
    return `<g class="kitten__acc"><path d="M42 18 l8 14 l15 -18 l15 18 l8 -14 l-4 22 h-38 z" fill="#ffcf3f" stroke="#c99400" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="65" cy="16" r="3.5" fill="#ff5c8a"/><circle cx="42" cy="18" r="3" fill="#4fa3ff"/><circle cx="88" cy="18" r="3" fill="#4fa3ff"/></g>`;
  }
  if (kind === 'glasses') {
    return `<g class="kitten__acc"><rect x="38" y="57" width="23" height="15" rx="6" fill="#23324a"/><rect x="69" y="57" width="23" height="15" rx="6" fill="#23324a"/>
      <path d="M61 63 h8 M38 62 l-10 -3 M92 62 l10 -3" stroke="#23324a" stroke-width="3" stroke-linecap="round"/>
      <path d="M42 61 l6 0" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/></g>`;
  }
  if (kind === 'party') {
    return `<g class="kitten__acc"><path d="M52 30 l14 -28 l14 28 z" fill="#9b5cf6" stroke="#6d3ad1" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="66" cy="2" r="4" fill="#ffcf3f"/><path d="M57 22 h18 M60 14 h12" stroke="#ffcf3f" stroke-width="3"/></g>`;
  }
  return '';
}

/**
 * @param {{main:string, second?:string, pattern?:string}} look  color ids
 * @param {string} emotion one of EMOTIONS (old names neutral/cheer/think are accepted)
 * @param {number} size  width in px
 * @param {{accessory?: 'crown'|'glasses'|'party'}} opts
 */
export function kittenSVG(look = {}, emotion = 'idle', size = 120, opts = {}) {
  const mood = ALIASES[emotion] || (EMOTIONS.includes(emotion) ? emotion : 'idle');
  const a = color(look.main);
  const b = color(look.second || look.main);
  const pattern = look.pattern || 'plain';
  const eye = a.id === 'black' ? '#ffd23f' : '#2d2a32';
  const line = a.id === 'black' ? '#111' : '#3a2f2a';
  const headMarks = pattern === 'stripes'
    ? `<path d="M65 28 v12 M53 31 l3 10 M77 31 l-3 10" stroke="${b.dark}" stroke-width="5" stroke-linecap="round"/>`
    : pattern === 'patches' ? `<ellipse cx="86" cy="44" rx="15" ry="12" fill="${b.main}"/>` : '';
  const bodyMarks = pattern === 'stripes'
    ? `<path d="M30 120 q8 -4 10 6 M100 120 q-8 -4 -10 6 M56 112 q9 6 18 0" stroke="${b.dark}" stroke-width="5" fill="none" stroke-linecap="round"/>`
    : pattern === 'patches' ? `<ellipse cx="44" cy="124" rx="13" ry="10" fill="${b.main}"/>` : '';
  const acc = opts.accessory || (mood === 'celebrate' ? 'party' : '');
  const id = `k${(uid += 1)}`;
  const zzz = mood === 'sleepy' ? '<g class="kitten__zzz" fill="#5b6b83" font-family="Nunito, sans-serif" font-weight="800"><text x="104" y="30" font-size="14">z</text><text x="114" y="16" font-size="18">Z</text></g>' : '';
  const ears = (side) => {
    const left = side === 'l';
    const fill = !left && pattern === 'patches' ? b.main : a.main;
    return `<g class="kitten__ear kitten__ear--${side}">
      <path d="${left ? 'M27 48 L32 8 L58 30 Z' : 'M103 48 L98 8 L72 30 Z'}" fill="${fill}" stroke="${a.dark}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="${left ? 'M34 36 L36 18 L48 30 Z' : 'M96 36 L94 18 L82 30 Z'}" fill="#ffb3c7"/></g>`;
  };
  return `<svg class="kitten kitten--${mood}" viewBox="-6 -8 142 172" width="${size}" height="${Math.round(size * 172 / 142)}" role="img" aria-label="Котёнок" data-emotion="${mood}">
  <defs><clipPath id="hc${id}"><ellipse cx="65" cy="62" rx="44" ry="38"/></clipPath>
  <clipPath id="bc${id}"><ellipse cx="65" cy="122" rx="38" ry="32"/></clipPath></defs>
  <g class="kitten__all">
  <path class="kitten__tail" d="M100 135 q30 -6 22 -40" stroke="${a.main}" stroke-width="11" fill="none" stroke-linecap="round"/>
  <g class="kitten__body">
    <ellipse cx="65" cy="122" rx="38" ry="32" fill="${a.main}"/>
    <g clip-path="url(#bc${id})">${bodyMarks}</g>
    <ellipse cx="65" cy="130" rx="20" ry="18" fill="#fff" opacity=".55"/>
    <ellipse cx="47" cy="151" rx="11" ry="7" fill="${a.main}" stroke="${a.dark}" stroke-width="2"/>
    <ellipse cx="83" cy="151" rx="11" ry="7" fill="${a.main}" stroke="${a.dark}" stroke-width="2"/>
  </g>
  <g class="kitten__paw"><ellipse cx="100" cy="112" rx="9" ry="7" fill="${a.main}" stroke="${a.dark}" stroke-width="2"/></g>
  <g class="kitten__head">
    ${ears('l')}${ears('r')}
    <ellipse cx="65" cy="62" rx="44" ry="38" fill="${a.main}" stroke="${a.dark}" stroke-width="2.5"/>
    <g clip-path="url(#hc${id})">${headMarks}</g>
    <ellipse cx="40" cy="78" rx="8" ry="5" fill="#ff8fb0" opacity="${mood === 'excited' || mood === 'celebrate' ? '.85' : '.55'}"/>
    <ellipse cx="90" cy="78" rx="8" ry="5" fill="#ff8fb0" opacity="${mood === 'excited' || mood === 'celebrate' ? '.85' : '.55'}"/>
    <g class="kitten__face">${face(mood, eye, line)}</g>
    <path d="M61 74 h8 l-4 5 z" fill="#ff6f91"/>
    <path d="M30 72 h-16 M31 78 l-15 4 M100 72 h16 M99 78 l15 4" stroke="${line}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
    ${accessory(acc)}
  </g>
  ${zzz}
  </g>
</svg>`;
}

// The kitten guide, drawn as inline SVG. No external images.
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

const color = (id) => KITTEN_COLORS.find((c) => c.id === id) || KITTEN_COLORS[0];

/**
 * @param {{main:string, second?:string, pattern?:string}} look  color ids
 * @param {'happy'|'neutral'|'cheer'|'think'} mood
 */
export function kittenSVG(look = {}, mood = 'neutral', size = 120) {
  const a = color(look.main);
  const b = color(look.second || look.main);
  const pattern = look.pattern || 'plain';
  const eyeColor = a.id === 'black' ? '#ffd23f' : '#2d2a32';
  const line = a.id === 'black' ? '#111' : '#3a2f2a';
  const eyes = {
    happy: `<path d="M44 66 q6 -8 12 0" stroke="${eyeColor}" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M74 66 q6 -8 12 0" stroke="${eyeColor}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    cheer: `<ellipse cx="50" cy="65" rx="6" ry="7.5" fill="${eyeColor}"/><ellipse cx="80" cy="65" rx="6" ry="7.5" fill="${eyeColor}"/>
            <circle cx="52" cy="62" r="2.2" fill="#fff"/><circle cx="82" cy="62" r="2.2" fill="#fff"/>`,
    think: `<ellipse cx="50" cy="66" rx="5" ry="6" fill="${eyeColor}"/><ellipse cx="80" cy="66" rx="5" ry="6" fill="${eyeColor}"/>
            <circle cx="51.5" cy="63.5" r="1.8" fill="#fff"/><circle cx="81.5" cy="63.5" r="1.8" fill="#fff"/>
            <path d="M42 54 l14 3 M88 54 l-14 3" stroke="${line}" stroke-width="2.5" stroke-linecap="round"/>`,
    neutral: `<ellipse cx="50" cy="65" rx="5.5" ry="7" fill="${eyeColor}"/><ellipse cx="80" cy="65" rx="5.5" ry="7" fill="${eyeColor}"/>
            <circle cx="52" cy="62" r="2" fill="#fff"/><circle cx="82" cy="62" r="2" fill="#fff"/>`,
  }[mood] || '';
  const mouth = mood === 'happy' || mood === 'cheer'
    ? `<path d="M58 80 q7 9 14 0" stroke="${line}" stroke-width="3" fill="#ff7b9c" stroke-linecap="round"/>`
    : `<path d="M58 80 q3.5 4 7 0 q3.5 4 7 0" stroke="${line}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const marks = pattern === 'stripes'
    ? `<path d="M65 28 v12 M53 31 l3 10 M77 31 l-3 10" stroke="${b.dark}" stroke-width="5" stroke-linecap="round"/>
       <path d="M30 120 q8 -4 10 6 M100 120 q-8 -4 -10 6 M56 112 q9 6 18 0" stroke="${b.dark}" stroke-width="5" fill="none" stroke-linecap="round"/>`
    : pattern === 'patches'
      ? `<ellipse cx="86" cy="44" rx="15" ry="12" fill="${b.main}"/><ellipse cx="44" cy="124" rx="13" ry="10" fill="${b.main}"/>`
      : '';
  const id = Math.random().toString(36).slice(2, 7);
  return `<svg class="kitten kitten--${mood}" viewBox="0 0 130 160" width="${size}" height="${size * 160 / 130}" role="img" aria-label="Котёнок">
  <defs><clipPath id="hc${id}"><ellipse cx="65" cy="62" rx="44" ry="38"/></clipPath>
  <clipPath id="bc${id}"><ellipse cx="65" cy="122" rx="38" ry="32"/></clipPath></defs>
  <path class="kitten__tail" d="M100 135 q30 -6 22 -40" stroke="${a.main}" stroke-width="11" fill="none" stroke-linecap="round"/>
  <ellipse cx="65" cy="122" rx="38" ry="32" fill="${a.main}"/>
  <g clip-path="url(#bc${id})">${pattern !== 'plain' ? marks.split('\n').slice(1).join('\n') : ''}</g>
  <ellipse cx="65" cy="130" rx="20" ry="18" fill="#fff" opacity=".55"/>
  <ellipse cx="47" cy="151" rx="11" ry="7" fill="${a.main}" stroke="${a.dark}" stroke-width="2"/>
  <ellipse cx="83" cy="151" rx="11" ry="7" fill="${a.main}" stroke="${a.dark}" stroke-width="2"/>
  <path d="M27 48 L32 8 L58 30 Z" fill="${a.main}" stroke="${a.dark}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M103 48 L98 8 L72 30 Z" fill="${pattern === 'patches' ? b.main : a.main}" stroke="${a.dark}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M34 36 L36 18 L48 30 Z" fill="#ffb3c7"/><path d="M96 36 L94 18 L82 30 Z" fill="#ffb3c7"/>
  <ellipse cx="65" cy="62" rx="44" ry="38" fill="${a.main}" stroke="${a.dark}" stroke-width="2.5"/>
  <g clip-path="url(#hc${id})">${pattern !== 'plain' ? marks.split('\n')[0] : ''}</g>
  <ellipse cx="40" cy="78" rx="8" ry="5" fill="#ff8fb0" opacity=".55"/><ellipse cx="90" cy="78" rx="8" ry="5" fill="#ff8fb0" opacity=".55"/>
  ${eyes}
  <path d="M61 74 h8 l-4 5 z" fill="#ff6f91"/>
  ${mouth}
  <path d="M30 72 h-16 M31 78 l-15 4 M100 72 h16 M99 78 l15 4" stroke="${line}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
</svg>`;
}

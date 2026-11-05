// Drawn props for the mini-cartoons. Every prop is drawn around (0, 0) so that the
// engine can move it with translate/rotate/scale.

export function wedge(n, i, r) {
  if (n === 1) return `M${-r} 0 a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`;
  const a0 = (i / n) * 2 * Math.PI - Math.PI / 2;
  const a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M0 0 L${(r * Math.cos(a0)).toFixed(2)} ${(r * Math.sin(a0)).toFixed(2)} A${r} ${r} 0 ${large} 1 ${(r * Math.cos(a1)).toFixed(2)} ${(r * Math.sin(a1)).toFixed(2)} Z`;
}

/** Pizza slice i of n as an actor named `${prefix}${i + 1}`. */
export function pizzaSlices(prefix, n, r = 46) {
  let out = '';
  for (let i = 0; i < n; i += 1) {
    const mid = ((i + 0.5) / n) * 2 * Math.PI - Math.PI / 2;
    const px = (k) => (Math.cos(mid) * r * k).toFixed(1);
    const py = (k) => (Math.sin(mid) * r * k).toFixed(1);
    out += `<g data-a="${prefix}${i + 1}">
      <path d="${wedge(n, i, r)}" fill="#ffcf5a" stroke="#e39a2d" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="${px(0.55)}" cy="${py(0.55)}" r="5.5" fill="#e4553b"/><circle cx="${px(0.3)}" cy="${py(0.3)}" r="3.5" fill="#4cc27a"/></g>`;
  }
  return out;
}

const eyes = '<circle cx="-8" cy="-2" r="3.2" fill="#23324a"/><circle cx="8" cy="-2" r="3.2" fill="#23324a"/><path d="M-5 8 q5 5 10 0" stroke="#23324a" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
export const CRITTERS = {
  mouse: `<circle cx="-17" cy="-20" r="11" fill="#b9c2cf"/><circle cx="17" cy="-20" r="11" fill="#b9c2cf"/><circle cx="-17" cy="-20" r="6" fill="#ffb3c7"/><circle cx="17" cy="-20" r="6" fill="#ffb3c7"/>
    <circle r="22" fill="#cfd6e0"/>${eyes}<circle cx="0" cy="4" r="3" fill="#ff7b9c"/>`,
  bunny: `<ellipse cx="-9" cy="-30" rx="6" ry="17" fill="#fff"/><ellipse cx="9" cy="-30" rx="6" ry="17" fill="#fff"/><ellipse cx="-9" cy="-30" rx="3" ry="11" fill="#ffb3c7"/><ellipse cx="9" cy="-30" rx="3" ry="11" fill="#ffb3c7"/>
    <circle r="22" fill="#fff" stroke="#e6dccf" stroke-width="2"/>${eyes}<circle cx="0" cy="4" r="3" fill="#ff7b9c"/>`,
  puppy: `<ellipse cx="-20" cy="-4" rx="9" ry="16" fill="#a0673c"/><ellipse cx="20" cy="-4" rx="9" ry="16" fill="#a0673c"/>
    <circle r="22" fill="#d9a066"/>${eyes}<ellipse cx="0" cy="3" rx="5" ry="4" fill="#23324a"/>`,
};
export const critter = (name, kind) => `<g data-a="${name}">${CRITTERS[kind]}</g>`;

export const knife = (name) => `<g data-a="${name}"><rect x="-4" y="-46" width="8" height="58" rx="4" fill="#dfe7ee" stroke="#9aa5b4" stroke-width="2"/>
  <rect x="-6" y="10" width="12" height="26" rx="5" fill="#a0673c"/></g>`;

export const plate = (name, w = 70) => `<g data-a="${name}"><ellipse rx="${w / 2}" ry="${w / 7}" fill="#fff" stroke="#d6e5ee" stroke-width="3"/></g>`;

export const table = (y = 196) => `<rect x="0" y="${y}" width="360" height="${240 - y}" fill="#f2c46d"/><rect x="0" y="${y}" width="360" height="6" fill="#d2a861"/>`;

/** Line drawn progressively by the engine (dash 0 → 1). */
export const cutLine = (name, x1, y1, x2, y2, color = '#23324a') => `<line data-a="${name}" data-draw x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>`;

export const label = (name, text, { size = 18, color = '#23324a', anchor = 'middle', weight = 800 } = {}) => `<text data-a="${name}" font-family="Nunito, sans-serif" font-weight="${weight}" font-size="${size}" fill="${color}" text-anchor="${anchor}" paint-order="stroke" stroke="#fff" stroke-width="4">${text}</text>`;

/** Big fraction n/d built from two text actors and a bar: `${name}N`, `${name}D`, `${name}Bar`. */
export const fraction = (name, n = '', d = '') => `${label(`${name}N`, n, { size: 30, color: '#ff7a59' })}
  <g data-a="${name}Bar"><rect x="-18" y="-3" width="36" height="5" rx="2" fill="#23324a"/></g>${label(`${name}D`, d, { size: 30, color: '#1784a6' })}`;

export const bubble = (name, text, w = 150) => `<g data-a="${name}"><rect x="${-w / 2}" y="-22" width="${w}" height="34" rx="14" fill="#fff" stroke="#d6e5ee" stroke-width="2"/>
  <text y="0" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="14" fill="#23324a">${text}</text></g>`;

/** A row of equal pieces (chocolate bar). Pieces: `${prefix}1..n`, all drawn at local (0,0) with offsets. */
export function barPieces(prefix, n, { w = 240, h = 34, color = '#8b5a3c', x0 = 0 } = {}) {
  const pw = w / n;
  let out = '';
  for (let i = 0; i < n; i += 1) {
    out += `<g data-a="${prefix}${i + 1}"><rect x="${x0 + i * pw}" y="0" width="${pw}" height="${h}" rx="3" fill="${color}" stroke="#5e3a24" stroke-width="2"/></g>`;
  }
  return out;
}

export const kittenActor = (name, mood = 'idle', size = 70) => `<g data-a="${name}" data-kitten="${mood}" data-size="${size}"></g>`;

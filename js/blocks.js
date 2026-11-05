// Library of reusable animated explanation blocks (SVG/CSS, no external assets).
// Each block: (host: HTMLElement, params: object) => { destroy?() }
// A block renders into `host`, animates with CSS classes (.anim-*, delay via --d),
// and may contain an interactive part; interaction is never graded.

const NS = 'http://www.w3.org/2000/svg';
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const d = (i, step = 0.25, base = 0.1) => `style="--d:${(base + i * step).toFixed(2)}s"`;
const PALETTE = ['#ff7a59', '#2bb3c9', '#4cc27a', '#9b5cf6', '#ffcf3f', '#ff8fb0'];

function svg(w, h, inner, cls = '') {
  return `<svg class="blk-svg ${cls}" viewBox="0 0 ${w} ${h}" xmlns="${NS}" role="img">${inner}</svg>`;
}

// ---------- numberLine: jumps along an axis ----------
// params: { from, to, step?, start, jumps:[n...], labels?:bool, highlight?:[n] , interactive?:bool }
export function numberLine(host, p) {
  const from = p.from ?? 0;
  const to = p.to ?? 10;
  const step = p.step ?? 1;
  const W = 340;
  const x = (v) => 20 + ((v - from) / (to - from)) * (W - 40);
  let ticks = '';
  for (let v = from; v <= to + 1e-9; v += step) {
    const hl = (p.highlight || []).includes(v);
    ticks += `<line x1="${x(v)}" y1="86" x2="${x(v)}" y2="98" stroke="#23324a" stroke-width="2"/>
      <text x="${x(v)}" y="116" text-anchor="middle" class="blk-num ${hl ? 'hl' : ''}">${String(v).replace('-', '−')}</text>`;
  }
  let pos = p.start ?? from;
  let arcs = '';
  (p.jumps || []).forEach((j, i) => {
    const a = x(pos);
    const b = x(pos + j);
    const mid = (a + b) / 2;
    const hgt = Math.min(60, 18 + Math.abs(b - a) * 0.35);
    arcs += `<path class="anim-draw" ${d(i, 0.6)} d="M${a} 84 Q${mid} ${84 - hgt * 2} ${b} 84" fill="none" stroke="${PALETTE[i % PALETTE.length]}" stroke-width="3.5" stroke-linecap="round"/>
      <text class="anim-pop blk-lbl" ${d(i, 0.6, 0.4)} x="${mid}" y="${84 - hgt - 6}" text-anchor="middle">${j > 0 ? '+' : '−'}${Math.abs(j)}</text>`;
    pos += j;
  });
  host.innerHTML = svg(W, 130, `<line x1="10" y1="92" x2="${W - 10}" y2="92" stroke="#23324a" stroke-width="3" stroke-linecap="round"/>${ticks}${arcs}
    <circle class="anim-pop" ${d((p.jumps || []).length, 0.6, 0.3)} cx="${x(pos)}" cy="92" r="8" fill="#ff7a59"/>`);
  if (p.interactive) {
    host.querySelectorAll('.blk-num').forEach((t) => {
      t.classList.add('tap');
      t.addEventListener('click', () => t.classList.toggle('hl'));
    });
  }
  return {};
}

// ---------- fractionPie / fractionBar: parts and shading ----------
// params: { parts, shaded, interactive?:bool, label?:bool, color? }
function fractionLabel(host, parts, shadedCount) {
  const lbl = host.querySelector('.blk-frac');
  if (lbl) lbl.innerHTML = `<span class="num" data-testid="frac-num">${shadedCount}</span><span class="bar"></span><span class="den">${parts}</span>`;
}
export function fractionPie(host, p) {
  const n = p.parts;
  const r = 70;
  const c = 80;
  let slices = '';
  for (let i = 0; i < n; i += 1) {
    const a0 = (i / n) * 2 * Math.PI - Math.PI / 2;
    const a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const path = n === 1 ? `M${c - r} ${c} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`
      : `M${c} ${c} L${c + r * Math.cos(a0)} ${c + r * Math.sin(a0)} A${r} ${r} 0 ${large} 1 ${c + r * Math.cos(a1)} ${c + r * Math.sin(a1)} Z`;
    slices += `<path class="blk-part ${i < p.shaded ? 'on' : ''} anim-pop" data-i="${i}" d="${path}" style="--c:${p.color || '#ff9a3c'};--d:${(0.1 + i * 0.12).toFixed(2)}s"/>`;
  }
  host.innerHTML = `<div class="blk-row">${svg(160, 160, slices, 'blk-pie')}${p.label !== false ? '<div class="blk-frac"></div>' : ''}</div>`;
  wireParts(host, p);
  return {};
}
export function fractionBar(host, p) {
  const n = p.parts;
  const w = 300 / n;
  const top = p.firstLabel ? 30 : 20;
  let cells = p.firstLabel ? `<text class="anim-pop blk-lbl" style="--d:.1s" x="10" y="20">${esc(p.firstLabel)}</text>` : '';
  for (let i = 0; i < n; i += 1) {
    cells += `<rect class="blk-part ${i < p.shaded ? 'on' : ''} anim-pop" data-i="${i}" x="${10 + i * w}" y="${top}" width="${w}" height="50" rx="4"
      style="--c:${p.color || '#2bb3c9'};--d:${(0.1 + i * 0.1).toFixed(2)}s"/>`;
  }
  const rows = (p.compare || []).map((q, k) => {
    const ww = 300 / q.parts;
    let r = '';
    const y = top + 82 + k * 82;
    for (let i = 0; i < q.parts; i += 1) r += `<rect class="blk-part ${i < q.shaded ? 'on' : ''} anim-pop" x="${10 + i * ww}" y="${y}" width="${ww}" height="50" rx="4" style="--c:${q.color || '#9b5cf6'};--d:${(0.6 + k * 0.6 + i * 0.1).toFixed(2)}s"/>`;
    return r + `<text class="anim-pop blk-lbl" style="--d:${(0.5 + k * 0.6).toFixed(2)}s" x="10" y="${y - 10}">${esc(q.label || `${q.shaded}/${q.parts}`)}</text>`;
  }).join('');
  host.innerHTML = `<div class="blk-col">${svg(320, top + 60 + (p.compare || []).length * 82, cells + rows, 'blk-bar')}${p.label !== false ? '<div class="blk-frac"></div>' : ''}</div>`;
  wireParts(host, p);
  return {};
}
function wireParts(host, p) {
  const count = () => host.querySelectorAll('.blk-part.on[data-i]').length;
  fractionLabel(host, p.parts, count());
  if (!p.interactive) return;
  host.querySelectorAll('.blk-part[data-i]').forEach((el) => {
    el.classList.add('tap');
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', 'Закрасить часть');
    const toggle = () => {
      el.classList.toggle('on');
      fractionLabel(host, p.parts, count());
      host.dataset.touched = '1';
    };
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
}

// ---------- groupObjects: objects that join or split into groups ----------
// params: { icon, total, groups, interactive?:bool }  shows `total` icons, then arranges into `groups` equal groups
export function groupObjects(host, p) {
  const per = Math.floor(p.total / p.groups);
  let html = '<div class="blk-groups">';
  let k = 0;
  for (let g = 0; g < p.groups; g += 1) {
    html += `<div class="blk-group anim-pop" ${d(g, 0.35, 0.5)}>`;
    for (let i = 0; i < per; i += 1) html += `<span class="blk-obj anim-drop" ${d(k++, 0.06)}>${p.icon}</span>`;
    html += '</div>';
  }
  const rest = p.total - per * p.groups;
  if (rest) {
    html += '<div class="blk-group blk-group--rest anim-pop" style="--d:1.6s">';
    for (let i = 0; i < rest; i += 1) html += `<span class="blk-obj">${p.icon}</span>`;
    html += '</div>';
  }
  html += '</div>';
  host.innerHTML = html;
  return {};
}

// ---------- balanceScale: equation balance ----------
// params: { left:[...labels], right:[...labels], tilt?: -1|0|1, interactive?: {options:[...], answer} }
export function balanceScale(host, p) {
  const tilt = p.tilt || 0;
  const pan = (items, cx) => items.map((t, i) => `<g class="anim-drop" ${d(i, 0.2)}><rect x="${cx - 40 + (i % 3) * 27}" y="${54 - Math.floor(i / 3) * 26}" width="25" height="24" rx="5" fill="${PALETTE[(i + (cx > 160 ? 2 : 0)) % PALETTE.length]}"/>
    <text x="${cx - 27.5 + (i % 3) * 27}" y="${71 - Math.floor(i / 3) * 26}" text-anchor="middle" class="blk-chip">${esc(t)}</text></g>`).join('');
  host.innerHTML = svg(320, 170, `<polygon points="150,160 170,160 160,96" fill="#5b6b83"/>
    <g class="blk-beam" style="transform: rotate(${tilt * 7}deg); transform-origin: 160px 92px">
      <line x1="60" y1="92" x2="260" y2="92" stroke="#5b6b83" stroke-width="6" stroke-linecap="round"/>
      <path d="M30 80 h60 l-8 10 h-44 z" fill="#ffe3a8" stroke="#d2a861" stroke-width="2"/>
      <path d="M230 80 h60 l-8 10 h-44 z" fill="#ffe3a8" stroke="#d2a861" stroke-width="2"/>
      <g transform="translate(0 0)">${pan(p.left || [], 60)}</g><g>${pan(p.right || [], 260)}</g>
    </g>`, 'blk-scale');
  return {};
}

// ---------- gridShape: shapes on a grid (perimeter, area, coordinates) ----------
// params: { cols, rows, rect?:{x,y,w,h}, mode:'area'|'perimeter'|'points', points?:[{x,y,label}], axes?:bool }
export function gridShape(host, p) {
  const s = 26;
  const cols = p.cols || 10;
  const rows = p.rows || 6;
  const W = cols * s + 20;
  const H = rows * s + 20;
  let g = '';
  for (let i = 0; i <= cols; i += 1) g += `<line x1="${10 + i * s}" y1="10" x2="${10 + i * s}" y2="${10 + rows * s}" stroke="#d6e5ee"/>`;
  for (let j = 0; j <= rows; j += 1) g += `<line x1="10" y1="${10 + j * s}" x2="${10 + cols * s}" y2="${10 + j * s}" stroke="#d6e5ee"/>`;
  if (p.axes) {
    const ox = 10 + (p.originX ?? Math.floor(cols / 2)) * s;
    const oy = 10 + (p.originY ?? Math.floor(rows / 2)) * s;
    g += `<line x1="10" y1="${oy}" x2="${10 + cols * s}" y2="${oy}" stroke="#23324a" stroke-width="2.5"/><line x1="${ox}" y1="10" x2="${ox}" y2="${10 + rows * s}" stroke="#23324a" stroke-width="2.5"/>
      <text x="${10 + cols * s - 4}" y="${oy - 6}" text-anchor="end" class="blk-lbl">x</text><text x="${ox + 8}" y="22" class="blk-lbl">y</text>`;
    (p.points || []).forEach((pt, i) => {
      const cx = ox + pt.x * s;
      const cy = oy - pt.y * s;
      g += `<path class="anim-draw" ${d(i, 0.8)} d="M${ox} ${oy} H${cx} V${cy}" fill="none" stroke="${PALETTE[i]}" stroke-width="3" stroke-dasharray="5 4"/>
        <circle class="anim-pop" ${d(i, 0.8, 0.7)} cx="${cx}" cy="${cy}" r="7" fill="${PALETTE[i]}"/>
        <text class="anim-pop blk-lbl" ${d(i, 0.8, 0.8)} x="${cx + 10}" y="${cy - 8}">${esc(pt.label || `(${pt.x}, ${pt.y})`)}</text>`;
    });
  }
  if (p.rect) {
    const { x, y, w, h } = p.rect;
    if (p.mode === 'area') {
      let k = 0;
      for (let j = 0; j < h; j += 1) for (let i = 0; i < w; i += 1) g += `<rect class="anim-pop" ${d(k++, 0.08)} x="${10 + (x + i) * s + 2}" y="${10 + (y + j) * s + 2}" width="${s - 4}" height="${s - 4}" rx="4" fill="#ffcf3f"/>`;
    }
    g += `<rect class="${p.mode === 'perimeter' ? 'anim-draw' : ''}" x="${10 + x * s}" y="${10 + y * s}" width="${w * s}" height="${h * s}" fill="none" stroke="#ff7a59" stroke-width="4" style="--d:.2s"/>`;
  }
  host.innerHTML = svg(W, H, g, 'blk-grid');
  return {};
}

// ---------- wordBuilder: word parts (endings, past forms) ----------
// params: { pairs:[{base, add?, result, note?}] }  e.g. {base:'go', add:'es', result:'goes'}
export function wordBuilder(host, p) {
  host.innerHTML = `<div class="blk-words">${p.pairs.map((w, i) => `
    <div class="blk-word anim-slide" ${d(i, 0.7)} lang="en">
      <span class="blk-tile">${esc(w.base)}</span>${w.add ? `<span class="blk-plus">+</span><span class="blk-tile blk-tile--add">${esc(w.add)}</span>` : ''}
      <span class="blk-arrow">→</span><span class="blk-tile blk-tile--res anim-pop" ${d(i, 0.7, 0.45)}>${esc(w.result)}</span>
      ${w.note ? `<small class="blk-note" lang="ru">${esc(w.note)}</small>` : ''}
    </div>`).join('')}</div>`;
  return {};
}

// ---------- sentenceBlocks: tap word cubes to build a sentence ----------
// params: { words:[...] (correct order), shuffled?:[...], hint? } ; tapping cubes moves them into the sentence line
export function sentenceBlocks(host, p) {
  const pool = p.shuffled || [...p.words].reverse();
  host.innerHTML = `<div class="blk-sentence" lang="en">
    <div class="blk-line" data-testid="sentence-line" aria-live="polite"></div>
    <div class="blk-pool">${pool.map((w, i) => `<button type="button" class="blk-cube anim-pop" ${d(i, 0.12)} data-w="${esc(w)}">${esc(w)}</button>`).join('')}</div>
    <div class="blk-status" lang="ru"></div>
    <button type="button" class="blk-reset btn btn--small btn--ghost" lang="ru">Сначала</button>
  </div>`;
  const line = host.querySelector('.blk-line');
  const status = host.querySelector('.blk-status');
  const check = () => {
    const now = [...line.children].map((c) => c.dataset.w);
    host.dataset.touched = '1';
    if (now.length === p.words.length) {
      const ok = now.join(' ') === p.words.join(' ');
      status.textContent = ok ? 'Ура, предложение собрано!' : 'Почти! Нажми «Сначала» и попробуй ещё.';
      line.classList.toggle('ok', ok);
    } else status.textContent = '';
  };
  host.querySelectorAll('.blk-cube').forEach((b) => b.addEventListener('click', () => {
    b.classList.remove('anim-pop'); // do not replay the entrance animation after a move
    (b.parentElement === line ? host.querySelector('.blk-pool') : line).appendChild(b);
    check();
  }));
  host.querySelector('.blk-reset').addEventListener('click', () => {
    const pl = host.querySelector('.blk-pool');
    [...line.children].forEach((c) => pl.appendChild(c));
    line.classList.remove('ok');
    status.textContent = '';
  });
  return {};
}

// ---------- diagramFlow: chain / cycle diagrams ----------
// params: { nodes:[{icon,label}], arrows?:[labels], cycle?:bool, interactive?:bool }
export function diagramFlow(host, p) {
  const html = p.nodes.map((n, i) => `${i ? `<div class="blk-flow-arrow anim-pop" ${d(i, 0.7, 0.05)}><span>${esc((p.arrows || [])[i - 1] || '')}</span>→</div>` : ''}
    <div class="blk-flow-node anim-pop ${p.interactive ? 'tap' : ''}" ${d(i, 0.7)} tabindex="${p.interactive ? 0 : -1}" data-more="${esc(n.more || '')}">
      <span class="blk-flow-icon">${n.icon}</span><b>${esc(n.label)}</b>${n.more ? '<small class="blk-more"></small>' : ''}</div>`).join('');
  host.innerHTML = `<div class="blk-flow ${p.cycle ? 'blk-flow--cycle' : ''}">${html}
    ${p.cycle ? `<div class="blk-flow-back anim-pop" ${d(p.nodes.length, 0.7)}>↺ ${esc(p.cycleLabel || 'и снова по кругу')}</div>` : ''}</div>`;
  if (p.interactive) {
    host.querySelectorAll('.blk-flow-node').forEach((n) => n.addEventListener('click', () => {
      const more = n.querySelector('.blk-more');
      if (more) more.textContent = n.dataset.more;
      n.classList.add('open');
      host.dataset.touched = '1';
    }));
  }
  return {};
}

// ---------- mapPointer: simple world scheme ----------
// Continents are drawn as rough blobs (a scheme, not an accurate map).
const CONTINENTS = {
  'Северная Америка': { d: 'M40 40 q30 -18 70 -8 q10 20 -10 40 q-10 18 -28 22 q-14 -10 -20 -26 q-20 -10 -12 -28z', lx: 70, ly: 52 },
  'Южная Америка': { d: 'M88 104 q18 0 22 16 q-4 30 -16 46 q-10 -8 -12 -30 q-6 -20 6 -32z', lx: 98, ly: 130 },
  Европа: { d: 'M150 38 q20 -10 40 -2 q2 14 -12 20 q-16 4 -28 -4z', lx: 170, ly: 46 },
  Африка: { d: 'M152 70 q30 -6 46 10 q4 26 -12 50 q-10 12 -18 -2 q-12 -22 -16 -58z', lx: 172, ly: 98 },
  Азия: { d: 'M196 30 q50 -16 100 2 q10 20 -10 40 q-30 14 -50 8 q-30 2 -40 -20 q-6 -18 0 -30z', lx: 250, ly: 46 },
  Австралия: { d: 'M262 122 q24 -10 36 6 q-2 16 -22 18 q-16 -4 -14 -24z', lx: 280, ly: 132 },
  Антарктида: { d: 'M60 184 q120 -14 240 0 q-10 10 -120 12 q-110 -2 -120 -12z', lx: 180, ly: 190 },
};
const OCEANS = {
  Тихий: [22, 110], Атлантический: [128, 92], Индийский: [228, 120], 'Северный Ледовитый': [180, 14], Южный: [180, 172],
};
// params: { show:'continents'|'oceans'|'equator'|'directions'|'meridian', interactive?:bool }
export function mapPointer(host, p) {
  const names = Object.keys(CONTINENTS);
  let g = '<rect x="0" y="0" width="340" height="200" rx="16" fill="#bdeef3"/>';
  names.forEach((n, i) => {
    const c = CONTINENTS[n];
    g += `<path class="blk-land anim-pop ${p.interactive ? 'tap' : ''}" ${d(i, p.show === 'continents' ? 0.3 : 0.05)} data-name="${n}" d="${c.d}" fill="#7fd08f" stroke="#4aa05c" stroke-width="2"/>`;
    if (p.show === 'continents') g += `<text class="anim-pop blk-map-lbl" ${d(i, 0.3, 0.2)} x="${c.lx}" y="${c.ly}" text-anchor="middle">${n === 'Северная Америка' ? 'Сев. Америка' : n === 'Южная Америка' ? 'Юж. Америка' : n}</text>`;
  });
  if (p.show === 'oceans') {
    Object.entries(OCEANS).forEach(([n, [x, y]], i) => { g += `<text class="anim-pop blk-map-lbl blk-map-lbl--sea" ${d(i, 0.35)} x="${x}" y="${y}" text-anchor="${x < 60 ? 'start' : 'middle'}">${n}</text>`; });
  }
  if (p.show === 'equator') {
    g += '<line class="anim-draw" x1="0" y1="100" x2="340" y2="100" stroke="#ff7a59" stroke-width="3" stroke-dasharray="8 5" style="--d:.3s"/>'
      + '<text class="anim-pop blk-map-lbl" style="--d:1s" x="330" y="94" text-anchor="end">экватор 0°</text>'
      + '<text class="anim-pop blk-map-lbl" style="--d:1.4s" x="8" y="80">северное полушарие ↑</text><text class="anim-pop blk-map-lbl" style="--d:1.7s" x="8" y="124">южное полушарие ↓</text>';
  }
  if (p.show === 'meridian') {
    g += '<line class="anim-draw" x1="166" y1="0" x2="166" y2="200" stroke="#9b5cf6" stroke-width="3" stroke-dasharray="8 5" style="--d:.3s"/>'
      + '<circle class="anim-pop" style="--d:1s" cx="166" cy="40" r="6" fill="#9b5cf6"/><text class="anim-pop blk-map-lbl" style="--d:1.2s" x="172" y="36">Гринвич (Лондон), долгота 0°</text>';
  }
  host.innerHTML = `${svg(340, 200, g, 'blk-map')}${p.interactive ? '<div class="blk-status" data-testid="map-status">Нажми на любой материк</div>' : ''}`;
  if (p.interactive) {
    const st = host.querySelector('.blk-status');
    host.querySelectorAll('.blk-land').forEach((el) => el.addEventListener('click', () => {
      host.querySelectorAll('.blk-land').forEach((x) => x.classList.remove('sel'));
      el.classList.add('sel');
      st.textContent = el.dataset.name;
      host.dataset.touched = '1';
    }));
  }
  return {};
}

// ---------- compass: sides of the world ----------
export function compass(host, p) {
  host.innerHTML = svg(220, 220, `<circle cx="110" cy="110" r="90" fill="#fff" stroke="#d6e5ee" stroke-width="4"/>
    <polygon class="anim-pop" style="--d:.2s" points="110,30 122,110 98,110" fill="#ff7a59"/><polygon class="anim-pop" style="--d:.2s" points="110,190 122,110 98,110" fill="#9aa5b4"/>
    <text class="anim-pop blk-lbl" style="--d:.5s" x="110" y="24" text-anchor="middle">Север</text><text class="anim-pop blk-lbl" style="--d:.7s" x="110" y="212" text-anchor="middle">Юг</text>
    <text class="anim-pop blk-lbl" style="--d:.9s" x="208" y="114" text-anchor="end">Восток</text><text class="anim-pop blk-lbl" style="--d:1.1s" x="12" y="114">Запад</text>
    ${p.sun ? '<g class="blk-sun"><circle cx="192" cy="150" r="13" fill="#ffcf3f" stroke="#e0a800" stroke-width="2"/></g>' : ''}`, 'blk-compass');
  return {};
}

// ---------- patternSequence: items in a row with the rule shown ----------
// params: { items:[...], rule?:[labels between items], answer, interactive?:bool, choices?:[...] }
export function patternSequence(host, p) {
  const rule = (i) => (p.rule && p.rule[i] ? `<span class="blk-rule anim-pop" ${d(i, 0.5, 0.25)}>${esc(p.rule[i])}</span>` : '');
  const cells = p.items.map((it, i) => `${i ? rule(i) : ''}<span class="blk-cell anim-pop" ${d(i, 0.5)}>${esc(it)}</span>`).join('');
  host.innerHTML = `<div class="blk-seq">${cells}${rule(p.items.length)}
      <span class="blk-cell blk-cell--q anim-pop" ${d(p.items.length, 0.5)} data-testid="seq-answer">?</span></div>
    ${p.choices ? `<div class="blk-choices">${p.choices.map((c) => `<button type="button" class="blk-cube" data-c="${esc(c)}">${esc(c)}</button>`).join('')}</div><div class="blk-status"></div>` : ''}`;
  const q = host.querySelector('.blk-cell--q');
  if (p.choices) {
    const st = host.querySelector('.blk-status');
    host.querySelectorAll('[data-c]').forEach((b) => b.addEventListener('click', () => {
      host.dataset.touched = '1';
      if (String(b.dataset.c) === String(p.answer)) {
        q.textContent = p.answer;
        q.classList.add('ok');
        st.textContent = 'Точно! Правило сработало.';
      } else st.textContent = 'Проверь правило ещё раз: что происходит каждый шаг?';
    }));
  } else {
    setTimeout(() => { if (q.isConnected) { q.textContent = p.answer; q.classList.add('ok'); } }, 600 + p.items.length * 500);
  }
  return {};
}

// ---------- logicGrid: small table of yes/no ----------
// params: { rows:[...], cols:[...], marks:{'r,c':'✓'|'✗'} }
export function logicGrid(host, p) {
  let k = 0;
  host.innerHTML = `<table class="blk-table"><tr><th></th>${p.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr>
    ${p.rows.map((r, i) => `<tr><th>${esc(r)}</th>${p.cols.map((_, j) => `<td><span class="anim-pop" ${d(k++, 0.15)}>${esc((p.marks || {})[`${i},${j}`] || '')}</span></td>`).join('')}</tr>`).join('')}</table>`;
  return {};
}

// ---------- tiles: simple illustrated cards (fallback for anything else) ----------
// params: { items:[{icon, title, text}] , interactive?: bool (tap to flip) }
export function tiles(host, p) {
  host.innerHTML = `<div class="blk-tiles">${p.items.map((t, i) => `<div class="blk-card anim-pop ${p.interactive ? 'tap' : ''}" ${d(i, 0.35)} tabindex="${p.interactive ? 0 : -1}">
    <span class="blk-card__icon">${t.icon}</span><b ${t.lang ? `lang="${t.lang}"` : ''}>${esc(t.title)}</b>${t.text ? `<small ${p.interactive ? 'class="blk-hidden"' : ''}>${esc(t.text)}</small>` : ''}</div>`).join('')}</div>`;
  if (p.interactive) {
    host.querySelectorAll('.blk-card').forEach((c) => c.addEventListener('click', () => {
      c.classList.add('open');
      host.dataset.touched = '1';
    }));
  }
  return {};
}

// ---------- characterTalk: the kitten with a bubble (rendered by the engine) ----------
export function characterTalk(host, p, { kitten }) {
  host.innerHTML = `<div class="guide"><div class="guide__cat">${kitten(p.mood || 'excited', 90)}</div>
    <div class="guide__bubble"><span class="guide__say">${esc(p.text)}</span></div></div>`;
  return {};
}

export const BLOCKS = {
  numberLine, fractionPie, fractionBar, groupObjects, balanceScale, gridShape, wordBuilder,
  sentenceBlocks, diagramFlow, mapPointer, compass, patternSequence, logicGrid, tiles, characterTalk,
};

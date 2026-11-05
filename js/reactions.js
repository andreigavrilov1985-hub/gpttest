// Reactions after an answer: particle effects on one canvas (requestAnimationFrame,
// at most MAX_PARTICLES at a time), CSS classes for the kitten and options, Web Audio sounds.
// Nothing here blocks input: the overlay ignores pointer events, the "Дальше" button works at once.

const MAX_PARTICLES = 150;
export const DURATION_MS = 1600; // ТЗ: 1.2–2.0 s

export const CORRECT_REACTIONS = ['jumpSpin', 'starConfetti', 'starsToScore', 'dance', 'fireworks', 'coinRain'];
export const WRONG_REACTIONS = ['tiltSoft', 'pawPoint', 'softBubbles', 'thinkNod'];

const lastPick = {};
export function pickReaction(kind) {
  const list = kind === 'correct' ? CORRECT_REACTIONS : WRONG_REACTIONS;
  const options = list.filter((r) => r !== lastPick[kind]);
  const r = options[Math.floor(Math.random() * options.length)];
  lastPick[kind] = r;
  return r;
}

export const reducedMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------- particles ----------------
let canvas;
let ctx;
let particles = [];
let raf = 0;

function ensureCanvas() {
  if (canvas && canvas.isConnected) return;
  canvas = document.createElement('canvas');
  canvas.className = 'fx-layer';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);
}

const COLORS = ['#ffcf3f', '#ff7a59', '#2bb3c9', '#4cc27a', '#9b5cf6', '#ff8fb0'];
const rnd = (a, b) => a + Math.random() * (b - a);

function add(p) {
  if (particles.length >= MAX_PARTICLES) return;
  particles.push({ life: 0, rot: rnd(0, 6.28), vr: rnd(-0.2, 0.2), g: 0.25, size: rnd(6, 11), color: COLORS[Math.floor(Math.random() * COLORS.length)], ...p });
}

function drawStar(x, y, r, rot) {
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const rr = i % 2 ? r * 0.45 : r;
    const a = rot + (i * Math.PI) / 5;
    ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  ctx.closePath();
  ctx.fill();
}

function tick() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles = particles.filter((p) => p.life < p.ttl);
  for (const p of particles) {
    p.life += 16;
    const t = p.life / p.ttl;
    if (p.target) {
      // fly along an arc to the target (score counter)
      const e = t * t * (3 - 2 * t);
      p.x = p.x0 + (p.target.x - p.x0) * e;
      p.y = p.y0 + (p.target.y - p.y0) * e - Math.sin(e * Math.PI) * p.arc;
    } else {
      p.vy += p.g;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
    }
    p.rot += p.vr;
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, t - 0.7) / 0.3);
    ctx.fillStyle = p.color;
    if (p.shape === 'star') drawStar(p.x, p.y, p.size, p.rot);
    else if (p.shape === 'coin') {
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.size * Math.abs(Math.cos(p.rot)) + 1, p.size, 0, 0, 6.28);
      ctx.fillStyle = '#ffcf3f';
      ctx.fill();
      ctx.strokeStyle = '#e0a800';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (p.shape === 'bubble') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, 6.28);
      ctx.strokeStyle = 'rgba(43,179,201,.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }
  }
  ctx.globalAlpha = 1;
  if (particles.length) raf = requestAnimationFrame(tick);
  else raf = 0;
}

function run() {
  if (!raf) raf = requestAnimationFrame(tick);
}

export function clearEffects() {
  particles = [];
  if (ctx) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

const center = (el) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};

// ---------------- effects ----------------
function burst(from, n, opts = {}) {
  for (let i = 0; i < n; i += 1) {
    const a = rnd(-Math.PI, 0);
    const v = rnd(4, 9) * (opts.power || 1);
    add({ x: from.x, y: from.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, ttl: rnd(900, 1500), shape: opts.shape || 'star', g: opts.g ?? 0.22 });
  }
}

function toScore(from, target, n, shape = 'star') {
  for (let i = 0; i < n; i += 1) {
    add({ x0: from.x + rnd(-30, 30), y0: from.y + rnd(-10, 10), target, arc: rnd(60, 160), ttl: rnd(700, 1100) + i * 40, shape, size: rnd(7, 10) });
  }
}

function rain(n, shape = 'coin') {
  for (let i = 0; i < n; i += 1) {
    add({ x: rnd(10, window.innerWidth - 10), y: rnd(-120, -10), vx: rnd(-0.5, 0.5), vy: rnd(1, 3), g: 0.18, ttl: rnd(1200, 1700), shape, size: rnd(7, 10), vr: rnd(0.05, 0.2) });
  }
}

function fireworks(n) {
  const w = window.innerWidth;
  for (let k = 0; k < n; k += 1) {
    const c = { x: rnd(w * 0.2, w * 0.8), y: rnd(90, 220) };
    const col = COLORS[k % COLORS.length];
    for (let i = 0; i < 22; i += 1) {
      const a = (i / 22) * 6.28;
      add({ x: c.x, y: c.y, vx: Math.cos(a) * 4, vy: Math.sin(a) * 4, g: 0.06, ttl: 1100, shape: 'dot', size: 6, color: col });
    }
  }
}

function bubbles(from, n) {
  for (let i = 0; i < n; i += 1) {
    add({ x: from.x + rnd(-60, 60), y: from.y, vx: rnd(-0.3, 0.3), vy: rnd(-1.6, -0.8), g: -0.005, ttl: rnd(1100, 1600), shape: 'bubble', size: rnd(5, 10) });
  }
}

/**
 * Plays a reaction. ctx: { kind, name, fast, streak, optionEl, rightEl, scoreEl, catEl, reduced }
 * Returns the reaction name (also put on the feedback element as data-reaction).
 */
export function playReaction(name, c) {
  ensureCanvas();
  const reduced = c.reduced;
  const from = c.optionEl ? center(c.optionEl) : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const score = c.scoreEl ? center(c.scoreEl) : { x: window.innerWidth - 40, y: 30 };
  const k = c.fast ? 1.8 : 1;
  const cat = c.catEl;
  const pose = (cls) => {
    if (!cat) return;
    cat.classList.remove('do-jumpSpin', 'do-dance', 'do-tilt', 'do-nod', 'do-point');
    void cat.offsetWidth; // restart the CSS animation
    cat.classList.add(cls);
  };
  if (reduced) {
    // simplified: no particles, no shaking; only a calm glow on the right answer
    if (c.rightEl) c.rightEl.classList.add('glow-right');
    return name;
  }
  switch (name) {
    case 'jumpSpin': pose('do-jumpSpin'); burst(from, Math.round(14 * k), { power: 0.8 }); break;
    case 'starConfetti': burst(from, Math.round(40 * k), { shape: 'rect', power: 1.1 }); burst(from, Math.round(10 * k)); break;
    case 'starsToScore': toScore(from, score, Math.round(10 * k)); break;
    case 'dance': pose('do-dance'); burst(from, Math.round(12 * k), { shape: 'rect', power: 0.7 }); break;
    case 'fireworks': fireworks(Math.round(3 * k)); break;
    case 'coinRain': rain(Math.round(30 * k)); toScore(from, score, Math.round(4 * k), 'coin'); break;
    // wrong answers: soft, no flashes; the right option glows, the chosen one sways gently
    case 'tiltSoft': pose('do-tilt'); break;
    case 'pawPoint': pose('do-point'); break;
    case 'softBubbles': bubbles(from, 10); break;
    case 'thinkNod': pose('do-nod'); break;
    default: break;
  }
  if (c.kind === 'wrong') {
    if (c.optionEl) c.optionEl.classList.add('sway');
    if (c.rightEl) c.rightEl.classList.add('glow-right');
  }
  if (c.fast && c.kind === 'correct') fireworks(1);
  run();
  return name;
}

/** Big streak celebration for 3 / 5 / 10 in a row. */
export function playStreak(n, { reduced, label } = {}) {
  ensureCanvas();
  const el = document.createElement('div');
  el.className = `streak-burst streak-burst--${label ? 'island' : n >= 10 ? 10 : n >= 5 ? 5 : 3}`;
  el.dataset.testid = 'streak-burst';
  el.innerHTML = label ? `<span class="streak-burst__fire">🏝️</span><b>${label}</b>`
    : `<span class="streak-burst__fire">🔥</span><b>${n} подряд!</b>`;
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);
  setTimeout(() => el.remove(), DURATION_MS + 200);
  if (!reduced) {
    fireworks(label || n >= 10 ? 4 : n >= 5 ? 3 : 2);
    run();
  }
}

export function bump(el) {
  if (!el) return;
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}

// ---------------- sound (Web Audio, no files) ----------------
let audio;
function ac() {
  if (!audio) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audio = new AC();
  }
  if (audio.state === 'suspended') audio.resume();
  return audio;
}

function tone(a, freq, start, dur, { type = 'sine', gain = 0.12, slideTo } = {}) {
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, a.currentTime + start);
  if (slideTo) o.frequency.linearRampToValueAtTime(slideTo, a.currentTime + start + dur);
  g.gain.setValueAtTime(0.0001, a.currentTime + start);
  g.gain.exponentialRampToValueAtTime(gain, a.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + start + dur);
  o.connect(g).connect(a.destination);
  o.start(a.currentTime + start);
  o.stop(a.currentTime + start + dur + 0.05);
}

export const soundLog = []; // for tests
export function playSound(kind, enabled) {
  if (!enabled) return;
  soundLog.push(kind);
  const a = ac();
  if (!a) return;
  if (kind === 'correct') {
    tone(a, 784, 0, 0.18); tone(a, 1047, 0.09, 0.25);
  } else if (kind === 'fast') {
    tone(a, 784, 0, 0.14); tone(a, 988, 0.07, 0.14); tone(a, 1319, 0.14, 0.3);
  } else if (kind === 'streak') {
    [523, 659, 784, 1047].forEach((f, i) => tone(a, f, i * 0.08, 0.22, { gain: 0.1 }));
  } else if (kind === 'wrong') {
    tone(a, 330, 0, 0.3, { type: 'triangle', gain: 0.05, slideTo: 294 }); // quiet and neutral
  }
}

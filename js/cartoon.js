// Mini-cartoon engine: actors in one SVG stage move along a timeline; subtitles follow the action.
// A scene (one "episode") is data:
//   { svg: '<g data-a="pizza">…</g>…', w, h, init: { pizza: {x, y, s, r, o} }, duration,
//     beats: [ [ms, 'to', actor, {x,y,s,r,o,dash}, durMs, ease?], [ms, 'cap', text],
//              [ms, 'text', actor, str], [ms, 'cls', actor, cls], [ms, 'mood', actor, emotion] ],
//     interact?: { type: 'tapEat', targets: [...], to: {x, y}, counter: actor, total } }
// The clock runs on requestAnimationFrame and can be paused; replay resets to the start.

const EASE = {
  linear: (t) => t,
  inOut: (t) => (t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2),
  out: (t) => 1 - (1 - t) ** 3,
  back: (t) => { const c = 1.7; return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2; },
  hop: (t) => t, // y gets an extra arc, see below
};

const DEFAULT = { x: 0, y: 0, s: 1, r: 0, o: 1, dash: 0 };

export function createCartoon(stage, captionEl, scene, { kitten, reduced = false, onEnd } = {}) {
  stage.innerHTML = `<svg class="cartoon" viewBox="0 0 ${scene.w || 360} ${scene.h || 240}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Мультик">${scene.svg}</svg>`;
  const svg = stage.firstElementChild;
  const actors = {};
  svg.querySelectorAll('[data-a]').forEach((el) => { actors[el.dataset.a] = el; });
  const beats = [...scene.beats].sort((a, b) => a[0] - b[0]);
  const duration = scene.duration || (beats.length ? Math.max(...beats.map((b) => b[0] + (b[4] || 0))) + 600 : 1000);
  let state = {};
  let tweens = [];
  let next = 0;
  let t = 0;
  let last = 0;
  let raf = 0;
  let playing = false;
  let ended = false;

  const apply = (name) => {
    const el = actors[name];
    if (!el) return;
    const s = state[name];
    el.setAttribute('transform', `translate(${s.x.toFixed(2)} ${s.y.toFixed(2)}) rotate(${s.r.toFixed(2)}) scale(${s.s.toFixed(3)})`);
    el.style.opacity = String(Math.max(0, Math.min(1, s.o)));
    if (el.dataset.draw !== undefined) el.style.strokeDashoffset = String(1 - s.dash);
  };
  const setMood = (name, mood) => {
    const el = actors[name];
    if (el && kitten) el.innerHTML = kitten(mood, Number(el.dataset.size || 70));
  };

  function reset() {
    state = {};
    for (const name of Object.keys(actors)) {
      state[name] = { ...DEFAULT, ...(scene.init?.[name] || {}) };
      const el = actors[name];
      if (el.dataset.draw !== undefined) {
        el.setAttribute('pathLength', '1');
        el.style.strokeDasharray = '1';
      }
      if (el.dataset.kitten !== undefined) setMood(name, el.dataset.kitten || 'idle');
      if (el.dataset.text0 !== undefined) el.textContent = el.dataset.text0;
      else if (el.tagName === 'text' && el.dataset.text0 === undefined) el.dataset.text0 = el.textContent;
      el.classList.remove(...[...el.classList].filter((c) => c.startsWith('fx-')));
      apply(name);
    }
    tweens = [];
    next = 0;
    t = 0;
    ended = false;
    stage.dataset.ended = '0';
    stage.dataset.t = '0';
    delete stage.dataset.touched;
    if (captionEl) captionEl.textContent = scene.caption0 || '';
  }

  function fire(b) {
    const [, kind, name, a, dur = 500, ease = 'inOut'] = b;
    if (kind === 'cap') { if (captionEl) captionEl.textContent = name; return; }
    if (kind === 'text') { if (actors[name]) actors[name].textContent = a; return; }
    if (kind === 'cls') { if (actors[name]) actors[name].classList.add(a); return; }
    if (kind === 'mood') { setMood(name, a); return; }
    if (kind === 'to' && state[name]) {
      const from = { ...state[name] };
      const to = { ...from, ...a };
      if (reduced || dur <= 0) { state[name] = to; apply(name); return; }
      tweens = tweens.filter((tw) => tw.name !== name || !Object.keys(a).some((k) => k in tw.to));
      tweens.push({ name, from, to, keys: Object.keys(a), start: b[0], dur, ease });
    }
  }

  function step(now) {
    const dt = last ? Math.min(64, now - last) : 16;
    last = now;
    t += dt * (window.__cartoonSpeed || 1); // speed-up is used only by autotests
    advance();
    if (playing && !ended) raf = requestAnimationFrame(step);
  }

  function advance() {
    while (next < beats.length && beats[next][0] <= t) fire(beats[next++]);
    tweens = tweens.filter((tw) => {
      const p = Math.min(1, (t - tw.start) / tw.dur);
      const e = (EASE[tw.ease] || EASE.inOut)(p);
      const s = state[tw.name];
      for (const k of tw.keys) s[k] = tw.from[k] + (tw.to[k] - tw.from[k]) * e;
      if (tw.ease === 'hop') {
        // jump along an arc: base height (moving or not) minus a bump
        const baseY = tw.keys.includes('y') ? tw.from.y + (tw.to.y - tw.from.y) * e : tw.from.y;
        s.y = baseY - Math.sin(p * Math.PI) * 30;
      }
      apply(tw.name);
      return p < 1;
    });
    stage.dataset.t = String(Math.round(t));
    if (t >= duration && !ended) {
      ended = true;
      stage.dataset.ended = '1';
      if (onEnd) onEnd();
    }
  }

  function finishInstantly() {
    // used for reduced motion: jump to the final picture, show the last subtitle
    while (next < beats.length) fire(beats[next++]);
    tweens.forEach((tw) => { Object.assign(state[tw.name], tw.to); apply(tw.name); });
    tweens = [];
    t = duration;
    advance();
  }

  const api = {
    play() {
      if (ended) return;
      playing = true;
      stage.dataset.playing = '1';
      last = 0;
      cancelAnimationFrame(raf);
      if (reduced) { finishInstantly(); return; }
      raf = requestAnimationFrame(step);
    },
    pause() {
      playing = false;
      stage.dataset.playing = '0';
      cancelAnimationFrame(raf);
    },
    replay() { api.pause(); reset(); api.play(); },
    get playing() { return playing; },
    get ended() { return ended; },
    destroy() { api.pause(); },
  };

  // Interaction (works at any moment; it is part of the explanation, not graded)
  if (scene.interact && scene.interact.type === 'tapEat') {
    const it = scene.interact;
    let eaten = 0;
    it.targets.forEach((name) => {
      const el = actors[name];
      if (!el) return;
      el.classList.add('cartoon-tap');
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', 'Отдать кусочек котёнку');
      const go = () => {
        if (el.dataset.eaten) return;
        el.dataset.eaten = '1';
        eaten += 1;
        stage.dataset.touched = '1';
        tweens.push({ name, from: { ...state[name] }, to: { ...state[name], x: it.to.x, y: it.to.y, s: 0.3, o: 0 }, keys: ['x', 'y', 's', 'o'], start: t, dur: 700, ease: 'inOut' });
        if (it.counter && actors[it.counter]) actors[it.counter].textContent = String(eaten);
        if (it.say && captionEl) captionEl.textContent = it.say(eaten);
        if (it.cat) setMood(it.cat, eaten === it.total ? 'celebrate' : 'happy');
        if (!playing) { // keep the clock running for the flight even if paused or ended
          const tick = (now) => { const dt = last ? Math.min(64, now - last) : 16; last = now; t += dt; advance(); if (tweens.length) requestAnimationFrame(tick); else last = 0; };
          last = 0;
          requestAnimationFrame(tick);
        }
      };
      el.addEventListener('click', go);
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
  }

  // tapShow: tapping a target shows its actors and its subtitle (e.g. "tap the word to see what it means")
  if (scene.interact && scene.interact.type === 'tapShow') {
    const it = scene.interact;
    Object.entries(it.items).forEach(([name, cfg]) => {
      const el = actors[name];
      if (!el) return;
      el.classList.add('cartoon-tap');
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', cfg.label || 'Нажми');
      const go = () => {
        stage.dataset.touched = '1';
        (cfg.show || []).forEach((n) => {
          if (!state[n]) return;
          tweens.push({ name: n, from: { ...state[n] }, to: { ...state[n], o: 1, s: 1 }, keys: ['o', 's'], start: t, dur: 420, ease: 'back' });
        });
        if (cfg.say && captionEl) captionEl.textContent = cfg.say;
        if (cfg.mood && it.cat) setMood(it.cat, cfg.mood);
        tweens.push({ name, from: { ...state[name] }, to: { ...state[name], s: state[name].s }, keys: ['s'], start: t, dur: 1, ease: 'linear' });
        if (!playing || ended) {
          const tick = (now) => { const dt = last ? Math.min(64, now - last) : 16; last = now; t += dt; advance(); if (tweens.length) requestAnimationFrame(tick); else last = 0; };
          last = 0;
          requestAnimationFrame(tick);
        }
      };
      el.addEventListener('click', go);
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
  }

  reset();
  return api;
}

export function cartoonSeconds(cartoon) {
  return cartoon.episodes.reduce((sum, ep) => {
    const end = ep.duration || Math.max(...ep.beats.map((b) => b[0] + (b[4] || 0)));
    return sum + end / 1000 + 2; // + a moment to press «Дальше»
  }, 0);
}

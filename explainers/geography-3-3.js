// Остров 3 · География · Тема 3. Берега и ледники — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, episode, beat } from '../js/cartoon-kit.js';

// серия 1: берег — мыс, бухта, арка, стек, пляж
const ep1 = episode({
  title: 'Море грызёт берег',
  terms: ['береговая эрозия', 'мыс и бухта', 'арка → стек', 'пляж — отложение песка', 'дрейф вдоль берега'],
  svg: `<rect x="0" y="0" width="360" height="240" fill="#5bbfd6"/><path d="M0 0 H360 V60 Q300 60 280 100 Q260 140 210 120 Q180 100 160 60 Q140 30 100 50 Q60 70 0 60 Z" fill="#c9a77d"/>
    <g data-a="arch"><path d="M250 150 h40 v-30 h-10 v20 h-20 v-20 h-10 z" fill="#a77b5a"/></g><g data-a="stack"><rect x="282" y="120" width="10" height="30" fill="#a77b5a"/></g>
    <path data-a="beach" d="M100 52 Q140 40 160 62" stroke="#ffe3a8" stroke-width="8" fill="none"/>${emo('wave', '🌊', 30)}
    ${text('h', 'мыс', { size: 14 })}${text('b', 'бухта', { size: 14 })}${text('a', 'арка → стек', { size: 13 })}${text('p', 'пляж', { size: 13, color: '#b06200' })}${kittenActor('cat', 'thinking', 24)}`,
  init: { arch: { o: 1 }, stack: { o: 0 }, beach: { o: 0 }, wave: at(330, 200), h: hid(250, 96), b: hid(130, 86), a: hid(270, 170), p: hid(130, 30), cat: at(4, 196) },
  caption0: 'Волны день за днём бьют в берег — это береговая эрозия.',
  beats: beat(
    move(300, 'wave', { x: 260, y: 140 }, 1200), pop(1600, ['h', 'b'], 300), cap(1600, 'Твёрдые скалы остаются мысами, мягкие размываются в бухты.'),
    pop(3600, 'a'), cap(3600, 'Волны пробивают в мысе арку. Свод обрушится — останется скальный столб, стек.'), [[5000, 'to', 'arch', { o: 0 }, 600], [5000, 'to', 'stack', { o: 1 }, 600]],
    cap(6600, 'В бухте волны оставляют песок — это пляж. Песок сдвигается вдоль берега: дрейф.'), [[6600, 'to', 'beach', { o: 1 }, 600]], pop(6800, 'p'), mood(6800, 'cat', 'happy'),
  ),
});

// серия 2: ледник
const rocks = Array.from({ length: 5 }, (_, i) => `<g data-a="r${i}"><circle r="5" fill="#7a6a5a"/></g>`).join('');
const ep2 = episode({
  title: 'Ледник',
  terms: ['ледник — медленная «река» льда', 'U-образная долина', 'морена — обломки, которые несёт ледник', 'отложение'],
  svg: `<path d="M0 240 L0 40 L80 40 Q120 200 180 200 Q240 200 280 40 L360 40 L360 240 Z" fill="#a77b5a"/><g data-a="ice"><path d="M90 40 Q120 180 180 180 Q240 180 270 40 Z" fill="#e6f6fb" stroke="#9adbe8" stroke-width="3"/></g>
    ${rocks}${text('u', 'U-образная долина', { size: 15, color: '#fff' })}${text('m', 'морена — камни, принесённые льдом', { size: 13, color: '#fff' })}${kittenActor('cat', 'surprised', 24)}`,
  init: { ice: { o: 1 }, ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`r${i}`, at(130 + i * 25, 60, { o: 0 })])), u: hid(180, 230), m: hid(180, 24), cat: at(320, 0) },
  caption0: 'Ледник — огромная «река» изо льда. Она ползёт очень медленно.',
  beats: beat(
    ...Array.from({ length: 5 }, (_, i) => [[600, 'to', `r${i}`, { o: 1 }, 200], [800, 'to', `r${i}`, { y: 170 + (i % 2) * 8 }, 2600, 'linear']]),
    cap(1600, 'Он несёт камни и обломки — это морена.'), pop(2200, 'm'),
    cap(4000, 'Лёд растаял — камни остались: это отложение. А долина стала похожа на букву U.'), [[4000, 'to', 'ice', { o: 0 }, 1200]], pop(5000, 'u'), mood(5000, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { h: { say: 'Мыс — участок суши, выдающийся в море.' }, b: { say: 'Бухта — изгиб берега, вдающийся в сушу.' }, a: { say: 'Обрушилась арка — остался стек.' } } };

export default { topic: 'geography-3-3', kind: 'cartoon', episodes: [ep1, ep2] };

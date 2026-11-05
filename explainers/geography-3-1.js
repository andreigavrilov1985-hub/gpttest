// Остров 3 · География · Тема 1. Биомы и климатические зоны — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const BIOMES = [
  ['rf', '🌳🦜', 'тропический лес', 'жарко и влажно круглый год (Амазонка)', '#4cc27a'],
  ['sv', '🦒🌾', 'саванна', 'травянистая равнина с редкими деревьями', '#e3d64a'],
  ['ds', '🌵🐪', 'пустыня', 'очень сухо — как в ОАЭ', '#f2c46d'],
  ['tn', '❄️🦌', 'тундра', 'вечная мерзлота: почва всегда мёрзлая', '#cfe6ef'],
];

// серия 1: биомы (интерактив)
const ep1 = episode({
  title: 'Биомы',
  terms: ['биом — большая территория с похожим климатом, растениями и животными', 'тропический лес (Амазонка)', 'саванна', 'пустыня', 'вечная мерзлота'],
  svg: `${BIOMES.map(([k, e, n, , c]) => `<g data-a="${k}"><rect x="-80" y="-34" width="160" height="68" rx="14" fill="${c}" opacity=".55"/><text y="-4" text-anchor="middle" font-size="26">${e}</text><text y="24" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="13" fill="#23324a">${n}</text></g>`).join('')}
    ${kittenActor('cat', 'excited', 26)}`,
  init: { rf: hid(90, 50), sv: hid(270, 50), ds: hid(90, 140), tn: hid(270, 140), cat: at(166, 196) },
  caption0: 'Биом — большая территория с похожим климатом, растениями и животными.',
  beats: beat(
    ...BIOMES.map(([k, , n, d], i) => [...pop(800 + i * 1800, k), ...cap(800 + i * 1800, `${n[0].toUpperCase()}${n.slice(1)}: ${d}.`)]),
    mood(8000, 'cat', 'happy'), cap(8200, 'Нажимай на биомы — котёнок расскажет снова.'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: Object.fromEntries(BIOMES.map(([k, , n, d]) => [k, { say: `${n[0].toUpperCase()}${n.slice(1)}: ${d}.` }])) },
});

// серия 2: адаптации и обезлесение
const ep2 = episode({
  title: 'Как выжить',
  terms: ['адаптация — особенность, помогающая выжить', 'горб верблюда — запас жира', 'кактус хранит воду в стебле', 'обезлесение — массовая вырубка'],
  svg: `${emo('camel', '🐪', 50)}${text('c', 'горб — запас жира', { size: 14, color: '#b06200' })}${emo('cactus', '🌵', 50)}${text('k', 'стебель хранит воду', { size: 14, color: '#16774a' })}
    ${emo('t1', '🌳', 30)}${emo('t2', '🌳', 30)}${emo('t3', '🌳', 30)}${emo('axe', '🪓', 30)}${text('d', 'обезлесение — массовая вырубка лесов', { size: 13, color: '#c0392b' })}${kittenActor('cat', 'thinking', 26)}`,
  init: { camel: hid(70, 60), c: hid(70, 100), cactus: hid(260, 60), k: hid(260, 100), t1: hid(110, 170), t2: hid(150, 170), t3: hid(190, 170), axe: hid(240, 170), d: hid(180, 212), cat: at(318, 4) },
  caption0: 'Адаптация — особенность, которая помогает выжить в своём биоме.',
  beats: beat(
    pop(400, ['camel', 'c'], 300), cap(1200, 'Горб верблюда — запас жира, а не воды!'),
    pop(3000, ['cactus', 'k'], 300), cap(3000, 'Кактус хранит воду в толстом стебле.'),
    pop(5000, ['t1', 't2', 't3', 'axe'], 150), cap(5000, 'Люди вырубают леса — это обезлесение. Биомы надо беречь.'), fade(5800, ['t1', 't2'], 0, 600), pop(6000, 'd'), mood(6000, 'cat', 'sad_soft'),
  ),
});

export default { topic: 'geography-3-1', kind: 'cartoon', episodes: [ep1, ep2] };

// Остров 3 · География · Тема 4. Африка, Азия и наш регион — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: Африка (интерактив)
const AF = [
  ['ki', '🏔️ Килиманджаро', 'самая высокая гора Африки'], ['vi', '💧 озеро Виктория', 'самое большое озеро Африки'],
  ['sa', '🏜️ Сахара', 'пустыня на большей части Северной Африки'], ['ni', '🌊 Нил', 'впадает в Средиземное море'],
];
const ep1 = episode({
  title: 'Рекорды Африки',
  terms: ['Килиманджаро', 'озеро Виктория', 'Сахара', 'Нил → Средиземное море'],
  svg: `<path d="M120 20 Q200 10 230 60 Q260 120 220 180 Q190 230 160 200 Q120 150 100 110 Q80 60 120 20 Z" fill="#f7e2b5" stroke="#d2a861" stroke-width="3"/>
    ${AF.map(([k, l]) => card(k, l, { w: 170, h: 32, size: 13 })).join('')}${kittenActor('cat', 'excited', 24)}`,
  init: { ki: hid(260, 150), vi: hid(250, 110), sa: hid(150, 40), ni: hid(210, 70), cat: at(4, 196) },
  caption0: 'Отправляемся в Африку! Нажимай на карточки.',
  beats: beat(...AF.map(([k, l, d], i) => [...pop(600 + i * 1800, k), ...cap(600 + i * 1800, `${l.slice(2)} — ${d}.`)]), mood(7800, 'cat', 'happy')),
  interact: { type: 'tapShow', cat: 'cat', items: Object.fromEntries(AF.map(([k, l, d]) => [k, { say: `${l.slice(2)} — ${d}.` }])) },
});

// серия 2: Азия и наш регион
const AS = [
  ['ya', 'Янцзы — самая длинная река Азии'], ['hi', 'Гималаи — горы в Азии'], ['ga', 'Ганг течёт в Индии'],
  ['dm', 'Мёртвое море — самая низкая точка суши'], ['su', 'Суэцкий канал: Средиземное ↔ Красное море'], ['ho', 'Ормузский пролив: Персидский ↔ Оманский залив'],
];
const ep2 = episode({
  title: 'Азия и пути по морю',
  terms: ['Янцзы', 'Гималаи', 'Ганг (Индия)', 'Мёртвое море', 'Суэцкий канал', 'Ормузский пролив'],
  svg: `${AS.map(([k, l]) => card(k, l, { w: 320, h: 28, size: 12 })).join('')}${emo('ship', '🚢', 28)}${kittenActor('cat', 'excited', 24)}`,
  init: { ...Object.fromEntries(AS.map(([k], i) => [k, hid(180, 22 + i * 34)])), ship: at(20, 214), cat: at(320, 200) },
  caption0: 'Азия — самая большая часть света.',
  beats: beat(
    ...AS.map(([k, l], i) => [...pop(500 + i * 1200, k), ...cap(500 + i * 1200, `${l}.`)]),
    move(7600, 'ship', { x: 300 }, 1600), mood(7600, 'cat', 'happy'),
  ),
});

export default { topic: 'geography-3-4', kind: 'cartoon', episodes: [ep1, ep2] };

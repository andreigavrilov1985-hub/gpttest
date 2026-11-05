// Остров 2 · География · Тема 4. Население и города — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: население и плотность
const city = Array.from({ length: 12 }, (_, i) => [`c${i}`, 40 + (i % 4) * 24, 70 + Math.floor(i / 4) * 24]);
const desert = [['d0', 250, 80], ['d1', 300, 130]];
const ep1 = episode({
  title: 'Сколько людей?',
  terms: ['население', 'плотность населения: люди на 1 км²', 'низкая плотность — пустыни и горы'],
  svg: `<rect x="30" y="56" width="110" height="88" fill="none" stroke="#1784a6" stroke-width="3" stroke-dasharray="6 4"/><rect x="220" y="56" width="110" height="88" fill="#ffe3a8" stroke="#d2a861" stroke-width="3" stroke-dasharray="6 4"/>
    ${city.map(([n]) => emo(n, '🧍', 18)).join('')}${desert.map(([n]) => emo(n, '🧍', 18)).join('')}${text('k1', '1 км² города', { size: 13 })}${text('k2', '1 км² пустыни', { size: 13 })}
    ${text('pop', 'население — все люди страны или города', { size: 13, color: '#5b6b83' })}${text('den', 'плотность: сколько людей на 1 км²', { size: 15, color: '#16774a' })}${kittenActor('cat', 'excited', 28)}`,
  init: { ...Object.fromEntries([...city, ...desert].map(([n, x, y]) => [n, hid(x, y)])), k1: hid(85, 160), k2: hid(275, 160), pop: hid(180, 24), den: hid(180, 200), cat: at(320, 196) },
  caption0: 'Население — все люди, которые живут в стране или городе.',
  beats: beat(
    pop(300, 'pop'), pop(1200, ['k1', 'k2'], 200),
    pop(1800, city.map(([n]) => n), 80), pop(3000, desert.map(([n]) => n), 200),
    cap(1800, 'Возьмём по одному квадратному километру…'), cap(3400, 'В городе людей много, в пустыне — совсем мало.'),
    cap(5200, 'Плотность населения — сколько людей живёт на 1 км². Ниже всего — в пустынях и горах.'), pop(5200, 'den'), mood(5200, 'cat', 'happy'),
  ),
});

// серия 2: урбанизация и миграция
const movers = Array.from({ length: 5 }, (_, i) => `<g data-a="m${i}"><text text-anchor="middle" font-size="20">🧍</text></g>`).join('');
const ep2 = episode({
  title: 'Города растут',
  terms: ['миграция — переезд на жительство', 'урбанизация — рост городов', 'причины: работа, учёба, услуги', 'экспаты в ОАЭ'],
  svg: `${emo('vil', '🏡', 40)}<g data-a="city"><text text-anchor="middle" font-size="44">🏙️</text></g>${movers}
    ${text('mig', 'миграция — переезд на новое место жизни', { size: 13, color: '#1784a6' })}${text('urb', 'урбанизация — города растут', { size: 14, color: '#16774a' })}
    ${card('why', '💼 работа · 🎓 учёба · 🏥 услуги', { w: 260, size: 14, fill: '#eef7fb' })}${text('uae', 'в ОАЭ большинство — экспаты', { size: 13, color: '#5b6b83' })}${kittenActor('cat', 'excited', 28)}`,
  init: { vil: at(60, 100), city: at(290, 112), ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`m${i}`, at(80 + i * 8, 120, { o: 0 })])), mig: hid(180, 40), urb: hid(180, 156), why: hid(180, 196), uae: hid(180, 228), cat: at(4, 196) },
  caption0: 'Люди переезжают из деревни в город.',
  beats: beat(
    ...Array.from({ length: 5 }, (_, i) => [[400 + i * 300, 'to', `m${i}`, { o: 1 }, 200], [600 + i * 300, 'to', `m${i}`, { x: 270 + i * 6, y: 128 }, 1600, 'hop']]),
    pop(1400, 'mig'), cap(1400, 'Переезд на жительство в другое место — миграция.'),
    move(3400, 'city', { s: 1.4 }, 800), pop(3800, 'urb'), cap(3400, 'Город растёт, людей в городах всё больше — это урбанизация.'),
    cap(5600, 'Зачем едут? Работа, учёба, больницы и другие услуги.'), pop(5600, 'why'),
    cap(7400, 'В ОАЭ большинство жителей — экспаты: они приехали работать.'), pop(7400, 'uae'), mood(7400, 'cat', 'happy'),
  ),
});

// серия 3: мегаполис
const ep3 = episode({
  title: 'Мегаполис',
  terms: ['мегаполис (мегасити) — больше 10 миллионов жителей', 'Токио'],
  svg: `${emo('big', '🌆', 70)}${card('n', '> 10 000 000 жителей', { w: 220, size: 17, fill: '#fff3d6', stroke: '#f2c46d' })}${text('ex', 'например, Токио', { size: 16, color: '#1784a6' })}${kittenActor('cat', 'surprised', 30)}`,
  init: { big: hid(180, 80), n: hid(180, 150), ex: hid(180, 190), cat: at(4, 196) },
  caption0: 'Есть города-гиганты.',
  beats: beat(
    pop(300, 'big'), cap(1000, 'Мегаполис (мегасити) — город, где живёт больше 10 миллионов человек.'), pop(1600, 'n'),
    cap(3600, 'Например, Токио в Японии.'), pop(3600, 'ex'), mood(3600, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { k1: { say: 'В городе на 1 км² много людей: плотность высокая.' }, k2: { say: 'В пустыне на 1 км² почти никого: плотность низкая.' } } };

export default { topic: 'geography-2-4', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

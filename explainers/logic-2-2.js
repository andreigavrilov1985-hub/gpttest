// Остров 2 · Логика · Тема 2. Истина, ложь и выводы — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, wiggle, episode, beat } from '../js/cartoon-kit.js';

// серия 1: если … то … (и обратный вывод)
const ep1 = episode({
  title: 'Если … то …',
  terms: ['если A, то B', 'если не B, то не A', 'вывод из правила'],
  svg: `${emo('rain', '🌧️', 40)}${text('ar', '→', { size: 30, color: '#ff7a59' })}<g data-a="wet"><rect x="-50" y="-10" width="100" height="20" rx="6" fill="#5b6b83"/><ellipse cx="10" cy="0" rx="18" ry="5" fill="#2bb3c9"/></g>
    ${text('r1', 'правило: если дождь, то асфальт мокрый', { size: 13 })}<g data-a="dry"><rect x="-50" y="-10" width="100" height="20" rx="6" fill="#9aa5b4"/></g>${emo('sun', '☀️', 34)}
    ${text('r2', 'асфальт сухой → значит, дождя не было', { size: 14, color: '#16774a' })}${kittenActor('cat', 'thinking', 30)}`,
  init: { rain: hid(60, 60), ar: hid(130, 64), wet: hid(210, 64), r1: hid(180, 110), dry: hid(210, 180), sun: hid(60, 170), r2: hid(180, 220), cat: at(318, 4) },
  caption0: 'Правило: если идёт дождь, асфальт мокрый.',
  beats: beat(
    pop(300, ['rain', 'ar', 'wet'], 300), pop(1300, 'r1'),
    cap(2800, 'Сегодня асфальт сухой. Что из этого следует?'), pop(2800, ['sun', 'dry'], 300), mood(2800, 'cat', 'thinking'),
    cap(4600, 'Если бы шёл дождь, асфальт был бы мокрым. Он сухой — значит, дождя нет!'), pop(4600, 'r2'), mood(4600, 'cat', 'happy'),
  ),
});

// серия 2: «все» и «некоторые»
const ep2 = episode({
  title: 'Все и некоторые',
  terms: ['«все» — без исключений', '«некоторые» — хотя бы один', 'вывод по кругам'],
  svg: `<g data-a="big"><ellipse rx="140" ry="80" fill="#e2f8ea" stroke="#4cc27a" stroke-width="3"/></g>${text('bt', 'у кого есть перья', { size: 14, color: '#16774a' })}
    <g data-a="sm"><ellipse rx="70" ry="44" fill="#fff3d6" stroke="#f2c46d" stroke-width="3"/></g>${text('st', 'птицы', { size: 14, color: '#b06200' })}${emo('peng', '🐧', 34)}
    ${card('some', 'некоторые цветы красные = хотя бы один красный', { w: 340, size: 13, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 28)}`,
  init: { big: hid(180, 110), bt: hid(180, 44), sm: hid(200, 124), st: hid(200, 96), peng: at(330, 40, { o: 0 }), some: hid(180, 214), cat: at(4, 4) },
  caption0: 'Все птицы имеют перья.',
  beats: beat(
    pop(300, ['big', 'bt'], 200), pop(1000, ['sm', 'st'], 200), cap(1200, 'Круг «птицы» целиком внутри круга «с перьями».'),
    cap(3000, 'Пингвин — птица. Он прыгает в круг птиц…'), [[3000, 'to', 'peng', { o: 1 }, 200]], hop(3400, 'peng', { x: 200, y: 136 }, 900),
    cap(4600, '…а значит, и у него есть перья!'), mood(4600, 'cat', 'happy'),
    cap(6400, '«Некоторые» значит «хотя бы один», не обязательно все.'), pop(6400, 'some'),
  ),
});

// серия 3: рыцари и лжецы (интерактив)
const ep3 = episode({
  title: 'Рыцари и лжецы',
  terms: ['рыцарь всегда говорит правду', 'лжец всегда лжёт', '«Я лжец» не может сказать никто'],
  svg: `${emo('kn', '🛡️', 46)}${emo('li', '🎭', 46)}${text('kt', 'рыцарь: всегда правда', { size: 14, color: '#16774a' })}${text('lt', 'лжец: всегда ложь', { size: 14, color: '#c0392b' })}
    ${card('q1', '«Я лжец»?', { w: 140, size: 17, fill: '#fff3d6', stroke: '#f2c46d' })}${text('a1', 'рыцарь соврал бы, лжец сказал бы правду — невозможно!', { size: 11, color: '#c0392b' })}
    ${card('q2', '«Я рыцарь»?', { w: 150, size: 17, fill: '#eef7fb' })}${text('a2', 'так скажут оба — понять нельзя', { size: 13, color: '#1784a6' })}${kittenActor('cat', 'thinking', 28)}`,
  init: { kn: hid(90, 50), li: hid(270, 50), kt: hid(90, 96), lt: hid(270, 96), q1: hid(100, 150), a1: hid(180, 184), q2: hid(270, 150), a2: hid(180, 218), cat: at(160, 30) },
  caption0: 'На острове живут рыцари и лжецы.',
  beats: beat(
    pop(300, ['kn', 'kt', 'li', 'lt'], 200), cap(1300, 'Рыцарь всегда говорит правду, лжец всегда лжёт.'),
    pop(3200, 'q1'), cap(3200, 'Может ли кто-то сказать «Я лжец»? Рыцарь бы солгал, а лжец сказал бы правду…'), pop(4800, 'a1'), mood(4800, 'cat', 'surprised'),
    pop(6600, 'q2'), cap(6600, '«Я рыцарь» может сказать и рыцарь, и лжец. Так их не различить.'), pop(7400, 'a2'), mood(7400, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { kn: { say: 'Рыцарь: каждое его слово — правда.' }, li: { say: 'Лжец: каждое его слово — ложь.' } } },
});

// серия 4: порядок и сравнение
const kids = [['k0', 'Ира', '👧'], ['k1', 'Оля', '👩'], ['k2', 'Паша', '👦'], ['k3', 'Рома', '🧑']];
const ep4 = episode({
  title: 'Кто где сидит',
  terms: ['слева / справа', 'старше / младше', 'цепочка сравнений'],
  svg: `${kids.map(([n, , e]) => emo(n, e, 36)).join('')}${kids.map(([n, name]) => text(`${n}T`, name, { size: 13 })).join('')}
    ${text('ch', 'Ира ← Оля ← Паша ← Рома: самый правый — Рома', { size: 13, color: '#16774a' })}
    ${card('age', 'старше всех: Том > Сэм > Макс', { w: 280, size: 14, fill: '#eef7fb' })}${kittenActor('cat', 'thinking', 28)}`,
  init: { ...Object.fromEntries(kids.map(([n], i) => [n, hid(60 + i * 75, 80)])), ...Object.fromEntries(kids.map(([n], i) => [`${n}T`, hid(60 + i * 75, 118)])), ch: hid(180, 150), age: hid(180, 200), cat: at(320, 196) },
  caption0: 'Ира слева от Оли, Оля слева от Паши, Паша слева от Ромы.',
  beats: beat(
    pop(400, ['k0', 'k0T', 'k1', 'k1T'], 150), pop(1400, ['k2', 'k2T'], 150), pop(2200, ['k3', 'k3T'], 150),
    cap(3000, 'Выстраиваем цепочку слева направо — и видно, кто крайний.'), pop(3400, 'ch'),
    cap(5200, 'Со старшинством так же: строим всех по порядку.'), pop(5200, 'age'), mood(5200, 'cat', 'happy'),
  ),
});

export default { topic: 'logic-2-2', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

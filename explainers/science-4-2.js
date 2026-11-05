// Остров 4 · Наука · Тема 2. ДНК, наследственность и эволюция — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: от клетки к гену
const ep1 = episode({
  title: 'ДНК и гены',
  terms: ['ДНК — в ядре клетки', 'ген — участок ДНК для одного признака', 'у человека 46 хромосом', 'гены и среда (загар — от среды)'],
  svg: `<g data-a="cell"><circle r="70" fill="#e3f6d5" stroke="#8ccf73" stroke-width="3"/><circle r="26" fill="#c8b5f5" stroke="#9b5cf6" stroke-width="3"/></g>${text('nu', 'ядро', { size: 13, color: '#6d3ad1' })}
    <g data-a="dna"><path d="M0 0 C20 20 20 40 0 60 C-20 80 -20 100 0 120" stroke="#2bb3c9" stroke-width="4" fill="none"/><path d="M20 0 C0 20 0 40 20 60 C40 80 40 100 20 120" stroke="#ff7a59" stroke-width="4" fill="none"/></g>
    <g data-a="gene"><rect x="-6" y="-16" width="32" height="32" fill="none" stroke="#ffcf3f" stroke-width="4"/></g>${text('gt', 'ген — кусочек ДНК: например, цвет глаз', { size: 12, color: '#b06200' })}
    ${text('ch', '46 хромосом в клетках тела человека', { size: 13, color: '#1784a6' })}${text('env', 'загар — от солнца, а не от генов', { size: 12, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { cell: at(90, 110), nu: hid(90, 150), dna: at(240, 40, { o: 0 }), gene: hid(244, 100), gt: hid(240, 182), ch: hid(180, 210), env: hid(180, 232), cat: at(320, 4) },
  caption0: 'В ядре каждой клетки хранится ДНК — инструкция организма.',
  beats: beat(
    pop(300, 'nu'), [[1200, 'to', 'dna', { o: 1 }, 800]], cap(1200, 'ДНК — длинная закрученная молекула.'),
    pop(3000, ['gene', 'gt'], 300), cap(3000, 'Ген — участок ДНК, который отвечает за один признак.'),
    cap(5000, 'ДНК упакована в хромосомы: у человека их 46.'), pop(5000, 'ch'),
    cap(6800, 'Не всё от генов: загар появляется от солнца — это влияние среды.'), pop(6800, 'env'), mood(6800, 'cat', 'happy'),
  ),
});

// серия 2: естественный отбор
const moths = Array.from({ length: 6 }, (_, i) => `<g data-a="b${i}"><ellipse rx="10" ry="6" fill="${i < 3 ? '#f3f5f8' : '#3b3f4a'}" stroke="#9aa5b4"/></g>`).join('');
const ep2 = episode({
  title: 'Выживает приспособленный',
  terms: ['естественный отбор (Дарвин)', 'селекция — отбор человеком', 'окаменелости', 'вымирание', 'устойчивость бактерий к антибиотикам'],
  svg: `<rect x="20" y="40" width="200" height="120" fill="#4a3d36"/>${moths}${emo('bird', '🐦', 30)}
    ${text('t', 'тёмные незаметнее — выживают и оставляют потомство', { size: 11, color: '#16774a' })}${card('d', 'идея Чарлза Дарвина', { w: 170, size: 13, fill: '#fff3d6', stroke: '#f2c46d' })}
    ${card('ex', 'селекция — отбор человеком · вымер — никого не осталось', { w: 340, size: 11, fill: '#eef7fb' })}${kittenActor('cat', 'thinking', 22)}`,
  init: { ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`b${i}`, at(50 + i * 30, 80 + (i % 2) * 40)])), bird: at(300, 40), t: hid(180, 180), d: hid(290, 110), ex: hid(180, 214), cat: at(320, 200) },
  caption0: 'Бабочки на тёмной коре. Светлые — заметнее.',
  beats: beat(
    move(800, 'bird', { x: 50, y: 70 }, 700), fade(1500, 'b0'), move(1600, 'bird', { x: 110, y: 110 }, 600), fade(2200, 'b1'), move(2300, 'bird', { x: 110, y: 70 }, 500), fade(2800, 'b2'), move(2900, 'bird', { x: 300, y: 40 }, 700),
    cap(1200, 'Птицы ловят тех, кого лучше видно.'), pop(3600, 't'), cap(3600, 'Выжившие тёмные дают потомство — тёмных становится больше. Это естественный отбор.'),
    pop(5800, 'd'), cap(5800, 'Эту идею предложил Чарлз Дарвин. Так же бактерии становятся устойчивыми к лекарствам.'), pop(7400, 'ex'), mood(7400, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { cell: { say: 'ДНК хранится в ядре клетки.' }, gene: { show: ['gt'], say: 'Ген — участок ДНК для одного признака.' } } };

export default { topic: 'science-4-2', kind: 'cartoon', episodes: [ep1, ep2] };

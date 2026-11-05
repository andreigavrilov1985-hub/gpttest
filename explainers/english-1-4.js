// Остров 1 · Английский · Тема 4. Правописание и письмо — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, wiggle, episode, beat } from '../js/cartoon-kit.js';

const L = (name, ch, color = '#23324a') => `<text data-a="${name}" font-family="Nunito" font-weight="800" font-size="30" fill="${color}" text-anchor="middle" lang="en">${ch}</text>`;

// серия 1: большая буква и точка
const letters = 'my name is lily'.split('');
const lx = (i) => 34 + i * 20;
const ep1 = episode({
  title: 'Большие буквы',
  terms: ['заглавная (большая) буква', 'начало предложения', 'имя с большой буквы', 'точка'],
  svg: `${letters.map((ch, i) => L(`l${i}`, ch === ' ' ? '' : ch)).join('')}${L('dot', '.', '#ff7a59')}
    ${text('t1', 'начало предложения', { size: 14, color: '#ff7a59' })}${text('t2', 'имя', { size: 14, color: '#ff7a59' })}${kittenActor('cat', 'thinking', 46)}`,
  init: { ...Object.fromEntries(letters.map((_, i) => [`l${i}`, at(lx(i), 110, { o: 0 })])), dot: hid(lx(15), 110), t1: hid(lx(0) + 50, 150), t2: hid(lx(12) + 10, 150), cat: at(290, 160) },
  caption0: 'Котёнок написал: my name is lily. Что не так?',
  beats: beat(
    ...letters.map((_, i) => [[200 + i * 90, 'to', `l${i}`, { o: 1 }, 200]]),
    cap(2400, 'Предложение начинается с большой буквы!'), move(2600, 'l0', { s: 1.5, y: 100 }, 300), setText(2900, 'l0', 'M'), move(2900, 'l0', { s: 1, y: 110 }, 300), pop(3000, 't1'),
    cap(4600, 'Имена тоже пишем с большой буквы: Lily.'), move(4800, 'l11', { s: 1.5, y: 100 }, 300), setText(5100, 'l11', 'L'), move(5100, 'l11', { s: 1, y: 110 }, 300), pop(5200, 't2'),
    cap(6800, 'А в конце — точка. My name is Lily.'), pop(6800, 'dot'), mood(6800, 'cat', 'happy'),
  ),
});

// серия 2: множественное число
const ep2 = episode({
  title: 'Много коробок',
  terms: ['множественное число', '-es после x', 'y → ies'],
  svg: `${emo('b1', '📦', 34)}${emo('b2', '📦', 34)}${emo('b3', '📦', 34)}${card('box', 'box', { w: 100, size: 20, lang: 'en' })}${card('es', '+es', { w: 60, size: 18, fill: '#fff3d6', stroke: '#f2c46d', color: '#b06200' })}
    ${emo('c1', '🏙️', 34)}${emo('c2', '🏙️', 34)}${card('city', 'city', { w: 100, size: 20, lang: 'en' })}${card('ies', 'y → ies', { w: 90, size: 16, fill: '#efe7ff', stroke: '#c8b5f5', color: '#6d3ad1' })}
    ${kittenActor('cat', 'excited', 40)}`,
  init: { b1: hid(50, 60), b2: hid(50, 60), b3: hid(50, 60), box: hid(160, 60), es: hid(260, 30), c1: hid(50, 160), c2: hid(50, 160), city: hid(160, 160), ies: hid(270, 130), cat: at(300, 170) },
  caption0: 'Один предмет или много? Это множественное число.',
  beats: beat(
    pop(300, ['b1', 'box']), cap(1500, 'Одна box… а если коробок много?'),
    pop(2400, ['b2', 'b3']), move(2400, 'b2', { x: 80 }, 400), move(2400, 'b3', { x: 110, y: 50 }, 400),
    pop(3000, 'es'), move(3600, 'es', { x: 230, y: 60 }, 600, 'hop'), setText(4200, 'boxT', 'boxes'), fade(4200, 'es'),
    cap(4200, 'После x добавляем -es: boxes.'), mood(4200, 'cat', 'happy'),
    pop(6200, ['c1', 'city']), cap(6200, 'City: согласный + y. Меняем y на ies!'), pop(7000, 'c2'), move(7000, 'c2', { x: 90 }, 400),
    pop(7600, 'ies'), move(8200, 'ies', { x: 230, y: 160 }, 600, 'hop'), setText(8800, 'cityT', 'cities'), fade(8800, 'ies'),
    cap(8800, 'City → cities.'),
  ),
});

// серия 3: there / their / they're (интерактив)
const ep3 = episode({
  title: 'Похожие слова',
  terms: ['their (их)', 'there (там)', "they're = they are", "we're = we are"],
  svg: `${card('their', 'their', { w: 100, size: 20, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${card('there', 'there', { w: 100, size: 20, lang: 'en', fill: '#eef7fb' })}${card('theyre', "they're", { w: 100, size: 20, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${emo('bags', '🎒🎒', 30)}${emo('point', '👉🏝️', 30)}${emo('kids', '🧒🧒', 30)}
    ${text('a1', 'их: their bags', { size: 14 })}${text('a2', 'там: over there', { size: 14 })}${text('a3', 'they are', { size: 14 })}${kittenActor('cat', 'thinking', 40)}`,
  init: { their: hid(60, 50), there: hid(180, 50), theyre: hid(300, 50), bags: hid(60, 110), point: hid(180, 110), kids: hid(300, 110), a1: hid(60, 150), a2: hid(180, 150), a3: hid(300, 150), cat: at(160, 172) },
  caption0: 'Три слова звучат почти одинаково. Нажимай на них!',
  beats: beat(
    pop(300, ['their', 'there', 'theyre'], 250),
    cap(2000, 'Their — их, чьё-то: The children left their bags.'), pop(2000, ['bags', 'a1']),
    cap(4400, 'There — там: The park is over there.'), pop(4400, ['point', 'a2']),
    cap(6800, "They're — это they are, просто короче. Так же we're = we are."), pop(6800, ['kids', 'a3']), mood(6800, 'cat', 'happy'),
  ),
  interact: {
    type: 'tapShow', cat: 'cat',
    items: {
      their: { show: ['bags', 'a1'], say: 'Their — их: their bags, их сумки.', mood: 'happy' },
      there: { show: ['point', 'a2'], say: 'There — там: over there.', mood: 'happy' },
      theyre: { show: ['kids', 'a3'], say: "They're = they are.", mood: 'happy' },
    },
  },
});

// серия 4: знаки — ? , и письмо
const ep4 = episode({
  title: 'Знаки препинания',
  terms: ['вопросительный знак', 'запятая в списке', 'начало письма Dear …,'],
  svg: `${card('q', 'Where do you live', { w: 220, size: 18, lang: 'en' })}${text('qm', '?', { size: 36, color: '#ff7a59' })}
    ${emo('f1', '🍎', 30)}${emo('f2', '🍊', 30)}${emo('f3', '🍌', 30)}${text('list', 'apples, oranges and bananas', { size: 17 })}
    ${card('dear', 'Dear Sara,', { w: 140, size: 20, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${emo('env', '✉️', 34)}${kittenActor('cat', 'excited', 40)}`,
  init: { q: hid(160, 44), qm: hid(288, 50), f1: hid(90, 104), f2: hid(180, 104), f3: hid(270, 104), list: hid(180, 140), dear: hid(180, 196), env: hid(70, 196), cat: at(300, 150) },
  caption0: 'Знаки помогают читать правильно.',
  beats: beat(
    pop(300, 'q'), cap(1000, 'Вопрос заканчивается вопросительным знаком.'), pop(1800, 'qm'), move(1800, 'qm', { r: 360 }, 500),
    cap(3600, 'Запятая разделяет слова в списке.'), pop(3600, ['f1', 'f2', 'f3'], 300), pop(4600, 'list'),
    cap(6400, 'Письмо другу начинаем так: Dear Sara, — имя с большой буквы и запятая.'), pop(6400, ['env', 'dear'], 300), mood(6400, 'cat', 'happy'),
  ),
});

export default { topic: 'english-1-4', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

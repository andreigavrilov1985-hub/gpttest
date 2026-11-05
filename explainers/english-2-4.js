// Остров 2 · Английский · Тема 4. Правописание и письмо — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const W = (name, w, o = {}) => card(name, w, { w: 110, size: 18, lang: 'en', ...o });
const AP = (name) => text(name, "'", { size: 34, color: '#ff7a59' });

// серия 1: апостроф — сокращение и принадлежность
const ep1 = episode({
  title: 'Апостроф',
  terms: ["апостроф: сокращение (don't = do not)", "it's = it is", "принадлежность: the dog's bone"],
  svg: `${W('donot', 'do not', { w: 120 })}${AP('ap1')}${W('itis', 'it is', { w: 100 })}${AP('ap2')}
    ${emo('dog', '🐕', 40)}${emo('bone', '🦴', 34)}${W('db', "the dog's bone", { w: 170, fill: '#fff3d6', stroke: '#f2c46d' })}${text('poss', "'s — чей? (собаки)", { size: 14, color: '#b06200' })}
    ${kittenActor('cat', 'excited', 30)}`,
  init: { donot: hid(90, 50), ap1: hid(90, 10), itis: hid(250, 50), ap2: hid(250, 10), dog: hid(60, 150), bone: hid(110, 156), db: hid(240, 150), poss: hid(240, 186), cat: at(318, 196) },
  caption0: 'Апостроф ’ — маленькая запятая сверху. У неё две работы.',
  beats: beat(
    pop(300, ['donot', 'itis'], 200), cap(1000, 'Первая: заменяет пропущенную букву. do not → don’t.'),
    pop(1800, 'ap1'), move(2000, 'ap1', { y: 44, x: 96 }, 500, 'hop'), setText(2600, 'donotT', "don't"), fade(2600, 'ap1'),
    pop(3400, 'ap2'), move(3600, 'ap2', { y: 44, x: 250 }, 500, 'hop'), setText(4200, 'itisT', "it's"), fade(4200, 'ap2'), cap(3600, 'It is → it’s: It’s a sunny day.'),
    cap(6000, 'Вторая: показывает, чьё. Кость собаки — the dog’s bone.'), pop(6000, ['dog', 'bone', 'db', 'poss'], 250), mood(6000, 'cat', 'happy'),
  ),
});

// серия 2: похожие слова (интерактив)
const ep2 = episode({
  title: 'Звучат одинаково',
  terms: ["they're / their / there", "your / you're", 'to / too / two'],
  svg: `${W('w1', "they're")}${W('w2', 'your')}${W('w3', 'too')}${text('d1', 'they are: They’re going to win!', { size: 13 })}${text('d2', 'твой: Is this your coat?', { size: 13 })}${text('d3', 'тоже: I want to come too.', { size: 13 })}
    ${emo('trophy', '🏆', 30)}${emo('coat', '🧥', 30)}${emo('hand', '🙋', 30)}${kittenActor('cat', 'thinking', 32)}`,
  init: { w1: hid(70, 50), w2: hid(180, 50), w3: hid(290, 50), trophy: hid(70, 100), coat: hid(180, 100), hand: hid(290, 100), d1: hid(180, 150), d2: hid(180, 176), d3: hid(180, 202), cat: at(4, 196) },
  caption0: 'Нажимай на слова — котёнок расскажет, что они значат.',
  beats: beat(
    pop(300, ['w1', 'w2', 'w3'], 200),
    cap(1400, 'They’re = they are: They’re going to win!'), pop(1400, ['trophy', 'd1'], 200),
    cap(3600, 'Your — твой: Is this your coat? (А you’re = you are.)'), pop(3600, ['coat', 'd2'], 200),
    cap(5800, 'Too — тоже или слишком: I want to come too. (Two — два, to — к.)'), pop(5800, ['hand', 'd3'], 200), mood(5800, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: {
    w1: { show: ['trophy', 'd1'], say: "They're = they are." }, w2: { show: ['coat', 'd2'], say: 'Your — твой.' }, w3: { show: ['hand', 'd3'], say: 'Too — тоже, слишком.' },
  } },
});

// серия 3: трудные слова
const ep3 = episode({
  title: 'Трудные слова',
  terms: ['necessary', 'definitely', 'приём запоминания'],
  svg: `${card('n', 'necessary', { w: 220, h: 50, size: 26, lang: 'en' })}${text('n2', 'one Collar, two Sleeves: 1 c, 2 s', { size: 14, color: '#b06200' })}${emo('shirt', '👕', 40)}
    ${card('d', 'definitely', { w: 220, h: 50, size: 26, lang: 'en' })}${text('d2', 'внутри слово finite: de-FINITE-ly', { size: 14, color: '#1784a6' })}${kittenActor('cat', 'excited', 32)}`,
  init: { n: hid(170, 50), n2: hid(170, 90), shirt: hid(320, 50), d: hid(170, 150), d2: hid(170, 190), cat: at(310, 160) },
  caption0: 'Есть слова, в которых легко ошибиться.',
  beats: beat(
    pop(300, 'n'), cap(1000, 'Necessary: у рубашки один воротник (c) и два рукава (ss).'), pop(1600, ['shirt', 'n2'], 300),
    pop(4000, 'd'), cap(4000, 'Definitely: внутри прячется слово finite. Никаких «a»!'), pop(4800, 'd2'), mood(4800, 'cat', 'happy'),
  ),
});

// серия 4: абзац и вежливый стиль
const ep4 = episode({
  title: 'Абзац и стиль',
  terms: ['абзац (paragraph)', 'одна мысль — один абзац', 'формальный стиль'],
  svg: `<g data-a="page"><rect x="0" y="0" width="150" height="150" rx="8" fill="#fff" stroke="#cfe6ef" stroke-width="3"/>
    ${[0, 1, 2].map((p) => [0, 1, 2].map((l) => `<rect x="${(l ? 12 : 22)}" y="${14 + p * 46 + l * 10}" width="${l === 2 ? 80 : 120 - (l ? 0 : 10)}" height="5" rx="2" fill="${['#ff9a3c', '#2bb3c9', '#4cc27a'][p]}"/>`).join('')).join('')}</g>
    ${text('par', 'абзац = несколько предложений об одной мысли', { size: 12, color: '#5b6b83' })}
    ${card('inf', 'Help me!', { w: 160, size: 16, lang: 'en', fill: '#f3f5f8' })}${card('for', 'Could you please help me?', { w: 180, size: 12, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${text('f2', 'formal — вежливо', { size: 13, color: '#16774a' })}${kittenActor('cat', 'excited', 30)}`,
  init: { page: hid(30, 20), par: hid(110, 190), inf: hid(270, 40), for: hid(268, 100), f2: hid(268, 136), cat: at(318, 190) },
  caption0: 'Paragraph — абзац: группа предложений об одной мысли.',
  beats: beat(
    pop(300, 'page'), cap(1200, 'Новая мысль — новый абзац. Каждый цвет — своя мысль.'), pop(2000, 'par'),
    cap(4000, 'Формальный стиль — вежливый, для учителя или незнакомца.'), pop(4000, 'inf'), pop(5200, ['for', 'f2'], 300), mood(5200, 'cat', 'happy'),
  ),
});

export default { topic: 'english-2-4', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

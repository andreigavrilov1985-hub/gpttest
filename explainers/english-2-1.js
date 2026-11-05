// Остров 2 · Английский · Тема 1. Приставки, суффиксы, синонимы — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const W = (name, w, o = {}) => card(name, w, { w: 96, size: 19, lang: 'en', ...o });
const P = (name, w) => card(name, w, { w: 56, size: 18, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d', color: '#b06200' });

// серия 1: приставки un-, re-, dis-
const ep1 = episode({
  title: 'Приставки',
  terms: ['приставка (prefix)', 'un- = не', 're- = снова', 'dis- = наоборот'],
  svg: `${emo('face', '😀', 44)}${W('happy', 'happy')}${P('un', 'un-')}${text('m1', 'un- = не: unhappy — несчастный', { size: 13, color: '#b06200' })}
    ${emo('play', '▶️', 34)}${W('playW', 'play')}${P('re', 're-')}${text('m2', 're- = снова: replay — сыграть ещё раз', { size: 13, color: '#b06200' })}
    ${W('agree', 'agree')}${P('dis', 'dis-')}${text('m3', 'dis- = наоборот: disagree — не соглашаться', { size: 13, color: '#b06200' })}${kittenActor('cat', 'excited', 30)}`,
  init: { face: hid(40, 40), happy: hid(200, 40), un: hid(110, 0), m1: hid(180, 72), play: hid(40, 110), playW: hid(200, 110), re: hid(110, 70), m2: hid(180, 142), agree: hid(200, 180), dis: hid(110, 150), m3: hid(180, 214), cat: at(320, 190) },
  caption0: 'Приставка — кусочек в начале слова. Она меняет смысл.',
  beats: beat(
    pop(300, ['face', 'happy']), pop(1000, 'un'), move(1300, 'un', { y: 40 }, 500, 'hop'), setText(1800, 'happyT', 'unhappy'), setText(1800, 'face', '😢'), fade(1800, 'un'), pop(1900, 'm1'),
    cap(1900, 'Un- значит «не»: happy → unhappy, несчастный.'),
    pop(3800, ['play', 'playW']), pop(4300, 're'), move(4600, 're', { y: 110 }, 500, 'hop'), setText(5100, 'playWT', 'replay'), setText(5100, 'play', '🔁'), fade(5100, 're'), pop(5200, 'm2'),
    cap(5200, 'Re- значит «снова»: replay — сыграть ещё раз.'),
    pop(7200, 'agree'), pop(7500, 'dis'), move(7800, 'dis', { y: 180 }, 500, 'hop'), setText(8300, 'agreeT', 'disagree'), fade(8300, 'dis'), pop(8400, 'm3'),
    cap(8400, 'Dis- делает наоборот: agree → disagree.'), mood(8400, 'cat', 'happy'),
  ),
});

// серия 2: суффиксы -less и -ful
const ep2 = episode({
  title: 'Суффиксы',
  terms: ['суффикс (suffix)', '-less = без', '-ful = полный'],
  svg: `${W('care', 'care', { w: 120 })}${card('less', '-less', { w: 64, size: 18, lang: 'en', fill: '#ffe9e4', stroke: '#f3c4bd', color: '#c0392b' })}${emo('spill', '💦', 40)}${text('m1', 'careless — без заботы, небрежный', { size: 14, color: '#c0392b' })}
    ${W('help', 'help', { w: 120 })}${card('ful', '-ful', { w: 60, size: 18, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9', color: '#16774a' })}${emo('hands', '🤝', 40)}${text('m2', 'helpful — полный помощи, полезный', { size: 14, color: '#16774a' })}${kittenActor('cat', 'thinking', 34)}`,
  init: { care: hid(120, 50), less: hid(260, 20), spill: hid(40, 50), m1: hid(180, 94), help: hid(120, 160), ful: hid(260, 130), hands: hid(40, 160), m2: hid(180, 204), cat: at(316, 90) },
  caption0: 'Суффикс — кусочек в конце слова.',
  beats: beat(
    pop(300, 'care'), pop(900, 'less'), move(1200, 'less', { x: 214, y: 50 }, 500, 'hop'), setText(1800, 'careT', 'careless'), fade(1800, 'less'), pop(1900, ['spill', 'm1'], 300),
    cap(1900, '-less значит «без»: careless — без заботы, небрежный.'), mood(2200, 'cat', 'surprised'),
    pop(4400, 'help'), pop(4900, 'ful'), move(5200, 'ful', { x: 206, y: 160 }, 500, 'hop'), setText(5800, 'helpT', 'helpful'), fade(5800, 'ful'), pop(5900, ['hands', 'm2'], 300),
    cap(5900, '-ful значит «полный»: helpful — тот, кто помогает.'), mood(5900, 'cat', 'happy'),
  ),
});

// серия 3: синонимы и антонимы
const ep3 = episode({
  title: 'Похожие и противоположные',
  terms: ['синоним', 'антоним', 'enormous = huge', 'brave = courageous', 'ancient ↔ modern'],
  svg: `${emo('whale', '🐋', 54)}${W('en', 'enormous', { w: 120 })}${W('hu', 'huge')}${text('eq1', '=', { size: 26, color: '#16774a' })}
    ${emo('lion', '🦁', 44)}${W('br', 'brave')}${W('co', 'courageous', { w: 130 })}${text('eq2', '=', { size: 26, color: '#16774a' })}
    ${emo('old', '🏛️', 40)}${emo('new', '🏙️', 40)}${W('an', 'ancient', { w: 110 })}${W('mo', 'modern', { w: 100 })}${text('vs', '↔', { size: 26, color: '#ff7a59' })}${kittenActor('cat', 'excited', 30)}`,
  init: { whale: hid(40, 40), en: hid(130, 40), eq1: hid(210, 42), hu: hid(270, 40), lion: hid(40, 110), br: hid(120, 110), eq2: hid(185, 112), co: hid(265, 110), old: hid(40, 190), an: hid(120, 180), vs: hid(190, 182), mo: hid(250, 180), new: hid(320, 190), cat: at(318, 60) },
  caption0: 'Синонимы значат почти одно и то же.',
  beats: beat(
    pop(300, ['whale', 'en', 'eq1', 'hu'], 250), cap(1300, 'Enormous = huge: огромный кит!'),
    pop(3000, ['lion', 'br', 'eq2', 'co'], 250), cap(3000, 'Brave = courageous: смелый, как лев.'),
    pop(5400, ['old', 'an', 'vs', 'mo', 'new'], 250), cap(5400, 'Антонимы — противоположности: ancient (древний) ↔ modern (современный).'), mood(5600, 'cat', 'happy'),
  ),
});

// серия 4: значение по контексту
const ep4 = episode({
  title: 'Угадай по тексту',
  terms: ['значение слова по контексту', 'reluctant = unwilling', 'silent = very quiet'],
  svg: `${emo('man', '👴', 46)}${emo('house', '🏠', 46)}${card('s1', 'He was reluctant to leave his home.', { w: 320, size: 14, lang: 'en' })}${text('m1', 'reluctant = unwilling, не хочет', { size: 15, color: '#16774a' })}
    ${emo('shh', '🤫', 46)}${card('s2', 'The room was silent.', { w: 220, size: 15, lang: 'en' })}${text('m2', 'silent = very quiet, очень тихо', { size: 15, color: '#16774a' })}${kittenActor('cat', 'thinking', 32)}`,
  init: { man: hid(150, 40), house: hid(220, 40), s1: hid(180, 90), m1: hid(180, 120), shh: hid(60, 180), s2: hid(200, 170), m2: hid(200, 204), cat: at(4, 4) },
  caption0: 'Незнакомое слово? Посмотри, что происходит вокруг.',
  beats: beat(
    pop(300, ['house', 'man', 's1'], 250), cap(1300, 'Дедушка медлит, оглядывается на дом… Ему не хочется уходить.'),
    move(1800, 'man', { x: 120 }, 900), move(2700, 'man', { x: 170 }, 700), pop(3600, 'm1'), cap(3600, 'Значит, reluctant — unwilling: не желающий.'),
    pop(5400, ['shh', 's2'], 300), cap(5400, 'Тсс… В комнате ни звука. Silent — очень тихо.'), pop(6600, 'm2'), mood(6600, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: {
  happy: { say: 'un- + happy = unhappy: несчастный.' }, playW: { say: 're- + play = replay: сыграть снова.' }, agree: { say: 'dis- + agree = disagree: не соглашаться.' },
} };

export default { topic: 'english-2-1', kind: 'cartoon', episodes: [ep1, ep2, ep3, ep4] };

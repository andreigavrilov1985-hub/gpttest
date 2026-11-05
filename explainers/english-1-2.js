// Остров 1 · Английский · Тема 2. Грамматика: времена и части речи — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, wiggle, episode, beat } from '../js/cartoon-kit.js';

const W = (name, word, o = {}) => card(name, word, { w: 80, size: 20, lang: 'en', ...o });

// серия 1: she goes (+s / +es)
const ep1 = episode({
  title: 'She goes',
  terms: ['глагол', 'настоящее время', 'окончание -s / -es'],
  svg: `${emo('school', '🏫', 46)}${emo('boy', '🧒', 40)}${emo('girl', '👧', 40)}
    ${W('i', 'I')}${W('go', 'go', { fill: '#e2f8ea', stroke: '#9fdcb9' })}${W('she', 'She')}${W('go2', 'go', { fill: '#e2f8ea', stroke: '#9fdcb9' })}${card('es', '+es', { w: 54, size: 18, fill: '#fff3d6', stroke: '#f2c46d', color: '#b06200' })}
    ${text('day', 'every day — каждый день', { size: 14, color: '#5b6b83' })}${kittenActor('cat', 'excited', 44)}`,
  init: {
    school: hid(320, 70), boy: hid(30, 70), girl: hid(30, 160), i: hid(110, 70), go: hid(196, 70), she: hid(110, 160), go2: hid(196, 160), es: hid(270, 120),
    day: hid(180, 222), cat: at(300, 150),
  },
  caption0: 'Present simple — то, что бывает обычно, каждый день.',
  beats: beat(
    pop(300, ['school', 'boy', 'i', 'go', 'day'], 200),
    cap(1800, 'I go to school. Глагол go — действие.'), move(2200, 'boy', { x: 300 }, 1400),
    cap(4200, 'А если she, he или it — к глаголу прибавляем -s.'), pop(4200, ['girl', 'she', 'go2'], 200),
    pop(5400, 'es'), move(6000, 'es', { x: 246, y: 160 }, 600, 'hop'), setText(6700, 'go2T', 'goes'), fade(6700, 'es'),
    move(6700, 'go2', { s: 1.2 }, 250), move(6950, 'go2', { s: 1 }, 250),
    cap(7000, 'She goes to school. После o, s, x пишем -es.'), move(7400, 'girl', { x: 300 }, 1400), mood(7400, 'cat', 'happy'),
  ),
});

// серия 2: прошедшее время
const ep2 = episode({
  title: 'Вчера',
  terms: ['прошедшее время', 'yesterday', 'last week', 'неправильные глаголы', '-ed'],
  svg: `${card('cal', 'today', { w: 120, h: 56, size: 22, fill: '#fff', stroke: '#ff7a59', lang: 'en' })}${emo('pizza', '🍕', 40)}
    ${W('eat', 'eat', { fill: '#e2f8ea', stroke: '#9fdcb9' })}${W('see', 'see', { fill: '#e2f8ea', stroke: '#9fdcb9' })}${W('play', 'play', { fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${emo('eyes', '👀', 34)}${text('irr', 'своя форма!', { size: 14, color: '#ff7a59' })}${text('ed', '+ed', { size: 18, color: '#b06200' })}${kittenActor('cat', 'excited', 48)}`,
  init: { cal: hid(180, 40), pizza: hid(70, 120), eat: hid(70, 170), see: hid(180, 170), eyes: hid(180, 120), play: hid(290, 170), irr: hid(125, 214), ed: hid(290, 130), cat: at(4, 6) },
  caption0: 'Прошедшее время — то, что уже было.',
  beats: beat(
    pop(300, 'cal'), setText(1500, 'calT', 'yesterday'), wiggle(1500, 'cal'),
    cap(1500, 'Yesterday — вчера. Last week — на прошлой неделе.'),
    pop(3300, ['pizza', 'eat']), cap(3300, 'Вчера котёнок съел пиццу: eat превращается в ate!'),
    move(4300, 'pizza', { s: 0.2, o: 0, x: 30, y: 60 }, 700), setText(4600, 'eatT', 'ate'), mood(4600, 'cat', 'happy'),
    pop(6200, ['eyes', 'see']), cap(6200, 'See → saw: «увидел». У таких глаголов своя форма.'), setText(7200, 'seeT', 'saw'), pop(7400, 'irr'),
    pop(9200, ['play', 'ed']), cap(9200, 'А у многих просто +ed: play → played.'), setText(10200, 'playT', 'played'), fade(10200, 'ed'),
  ),
});

// серия 3: будущее и am / is / are
const ep3 = episode({
  title: 'Завтра',
  terms: ['будущее время', 'will', 'tomorrow', 'am / is / are'],
  svg: `${card('cal', 'today', { w: 130, h: 56, size: 22, stroke: '#2bb3c9', lang: 'en' })}${emo('zoo', '🦁', 46)}
    ${W('we', 'We')}${W('will', 'will', { fill: '#fff3d6', stroke: '#f2c46d', color: '#b06200' })}${W('go', 'go', { fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${emo('k1', '🐱', 30)}${emo('k2', '🐱', 30)}${emo('k3', '🐱', 30)}${card('they', 'They are playing', { w: 200, size: 18, lang: 'en' })}
    ${text('forms', 'I am · he is · they are', { size: 15, color: '#5b6b83' })}${kittenActor('cat', 'excited', 40)}`,
  init: { cal: hid(180, 34), zoo: hid(320, 100), we: hid(70, 100), will: hid(150, 30), go: hid(230, 100), k1: hid(60, 170), k2: hid(95, 170), k3: hid(130, 170), they: hid(250, 170), forms: hid(180, 220), cat: at(4, 6) },
  caption0: 'Tomorrow — завтра. Это будущее.',
  beats: beat(
    pop(300, 'cal'), setText(1300, 'calT', 'tomorrow'), wiggle(1300, 'cal'),
    pop(2200, ['we', 'go', 'zoo'], 200), cap(2200, 'Чтобы сказать о будущем, ставим will перед глаголом.'),
    pop(3600, 'will'), move(4200, 'will', { y: 100, x: 150 }, 700, 'hop'), move(4200, 'go', { x: 236 }, 400),
    cap(5100, 'We will go to the zoo — мы пойдём в зоопарк.'), mood(5100, 'cat', 'happy'),
    cap(7200, 'С they всегда are: They are playing — они играют.'), pop(7200, ['k1', 'k2', 'k3', 'they'], 200),
    hop(8200, 'k1', { x: 60 }, 500), hop(8400, 'k2', { x: 95 }, 500), hop(8600, 'k3', { x: 130 }, 500),
    pop(9400, 'forms'),
  ),
});

// серия 4: местоимения и my
const ep4 = episode({
  title: 'Он, она, они, мой',
  terms: ['местоимение', 'he / she / they', 'my'],
  svg: `${emo('tom', '👦', 46)}${emo('anna', '👧', 46)}${W('tomW', 'Tom')}${W('annaW', 'Anna')}
    ${emo('book', '📘', 40)}${card('my', 'my book', { w: 120, size: 20, lang: 'en', fill: '#efe7ff', stroke: '#c8b5f5' })}${text('myRu', 'my — мой: чьё?', { size: 14 })}
    ${kittenActor('cat', 'excited', 44)}`,
  init: { tom: hid(70, 60), anna: hid(170, 60), tomW: hid(70, 110), annaW: hid(170, 110), book: hid(70, 180), my: hid(170, 180), myRu: hid(270, 216), cat: at(290, 50) },
  caption0: 'Местоимение — слово вместо имени.',
  beats: beat(
    pop(300, ['tom', 'tomW', 'anna', 'annaW'], 200),
    cap(1800, 'Tom likes football → He likes football. Tom — мальчик, значит he.'),
    move(2400, 'tomW', { r: 360 }, 600), setText(2700, 'tomWT', 'he'),
    cap(4600, 'Anna — девочка, значит she. Вместе они — they.'), move(4900, 'annaW', { r: 360 }, 600), setText(5200, 'annaWT', 'she'),
    cap(7000, 'Это моя книга: my book. My — «мой».'), pop(7000, ['book', 'my', 'myRu'], 300), hop(7400, 'cat', { x: 250, y: 96 }, 700), mood(8100, 'cat', 'happy'),
  ),
});

// серия 5: a / an и вопрос (интерактив: нажми на кубики по порядку)
const ep5 = episode({
  title: 'a, an и вопрос',
  terms: ['артикль a / an', 'вопросительные слова', 'вопрос с Do', 'знак вопроса'],
  svg: `${emo('apple', '🍎', 40)}${emo('bookE', '📕', 40)}${card('an', 'an apple', { w: 120, size: 19, lang: 'en' })}${card('a', 'a book', { w: 110, size: 19, lang: 'en' })}
    ${text('rule', 'an — перед гласным звуком', { size: 14, color: '#ff7a59' })}
    ${W('q1', 'Do', { fill: '#2bb3c9', stroke: '#1784a6', color: '#fff' })}${W('q2', 'you', { fill: '#2bb3c9', stroke: '#1784a6', color: '#fff' })}${W('q3', 'like', { fill: '#2bb3c9', stroke: '#1784a6', color: '#fff' })}${W('q4', 'pizza', { fill: '#2bb3c9', stroke: '#1784a6', color: '#fff' })}
    ${text('qm', '?', { size: 40, color: '#ff7a59' })}${text('qw', 'What? — что · Where? — где · Who? — кто', { size: 13, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 38)}`,
  init: {
    apple: hid(60, 50), bookE: hid(220, 50), an: hid(130, 50), a: hid(290, 50), rule: hid(180, 92),
    q1: hid(300, 150), q2: hid(60, 150), q3: hid(220, 150), q4: hid(140, 150), qm: hid(340, 158), qw: hid(180, 222), cat: at(4, 180),
  },
  caption0: 'Перед словом ставим a или an — «какой-то один».',
  beats: beat(
    pop(300, ['apple', 'an', 'bookE', 'a'], 250), cap(1600, 'An apple — apple начинается с гласного звука. A book — с согласного.'), pop(1800, 'rule'),
    cap(4400, 'Вопрос складываем как кубики. Слова перепутались…'), pop(4400, ['q1', 'q2', 'q3', 'q4'], 150),
    move(5800, 'q1', { x: 50 }, 600, 'hop'), move(6300, 'q2', { x: 130 }, 600, 'hop'), move(6800, 'q3', { x: 210 }, 600, 'hop'), move(7300, 'q4', { x: 290 }, 600, 'hop'),
    pop(8000, 'qm'), cap(8000, 'Do you like pizza? Вопрос часто начинается с Do, в конце — знак вопроса.'), mood(8000, 'cat', 'happy'),
    pop(10400, 'qw'),
  ),
});

// интерактив: нажми — котёнок объяснит
ep5.interact = { type: 'tapShow', cat: 'cat', items: {
  q1: { say: 'Do — слово-помощник: с него начинается вопрос.' }, q2: { say: 'You — ты.' },
  q3: { say: 'Like — нравиться, любить.' }, q4: { say: 'Pizza — пицца. А в конце — знак вопроса.' },
} };

export default {
  topic: 'english-1-2',
  kind: 'cartoon',
  episodes: [ep1, ep2, ep3, ep4, ep5],
  memo: [
    'Глагол — слово-действие: run, eat, go.',
    'Настоящее время: с he, she, it добавляем -s: she goes, he plays.',
    'Прошедшее время (yesterday, last week): -ed (played) или своя форма: eat → ate, see → saw, go → went.',
    'Будущее время: will + глагол: we will go. С they — are: they are playing.',
    'Местоимения: he (он), she (она), they (они). My — мой.',
    'a — перед согласным звуком (a book), an — перед гласным (an apple).',
    'Вопрос: Do you like pizza? What — что, Where — где, Who — кто.',
  ],
};

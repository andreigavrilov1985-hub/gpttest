// Остров 2 · Английский · Тема 3. Чтение с пониманием — мини-мультфильм
// Примеры свои (не из вопросов), чтобы мультик учил способу, а не подсказывал ответы.
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, mark, episode, beat } from '../js/cartoon-kit.js';

const line = (name, s, w = 320) => card(name, s, { w, h: 32, size: 14, lang: 'en' });

// серия 1: найди число или дату
const ep1 = episode({
  title: 'Ищем факты',
  terms: ['поиск факта в тексте (scanning)', 'числа и даты'],
  svg: `${line('l1', 'The zoo opened in 1998.')}${line('l2', 'It has 300 animals and a big lake.')}${line('l3', 'The biggest animal is an elephant.')}
    ${card('q', 'When did the zoo open?', { w: 230, size: 15, fill: '#eef7fb', lang: 'en' })}${emo('glass', '🔍', 30)}${card('a', '1998', { w: 80, size: 20, fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${text('tip', 'вопрос When? → ищем дату', { size: 14, color: '#ff7a59' })}${kittenActor('cat', 'thinking', 32)}`,
  init: { l1: hid(180, 40), l2: hid(180, 78), l3: hid(180, 116), q: hid(150, 170), glass: hid(20, 40), a: hid(310, 170), tip: hid(150, 210), cat: at(300, 196) },
  caption0: 'Сначала прочитай вопрос — он скажет, что искать.',
  beats: beat(
    pop(200, ['q'], 100), cap(1000, 'When? — «когда?». Значит, ищем дату или год.'), pop(1600, 'tip'),
    pop(2600, ['l1', 'l2', 'l3'], 200), pop(3400, 'glass'), move(3400, 'glass', { y: 116 }, 900), move(4300, 'glass', { y: 40, x: 150 }, 700),
    cap(4300, 'Пробегаем глазами текст и находим год: 1998.'), pop(5000, 'a'), mood(5000, 'cat', 'happy'),
  ),
});

// серия 2: чувства героя и причина
const ep2 = episode({
  title: 'Что чувствует герой?',
  terms: ['чувства героя', 'причина (because)', 'вывод из текста'],
  svg: `${line('t1', 'Leo was scared before the race.', 300)}${line('t2', 'His friend smiled and said "You can do it!"', 330)}${line('t3', 'Leo felt calm and ran fast.', 280)}
    ${emo('f1', '😰', 40)}${emo('f2', '🙂', 40)}${text('why', 'почему стало лучше? друг поддержал', { size: 14, color: '#16774a' })}${text('w', 'scared → calm', { size: 18, color: '#1784a6' })}${kittenActor('cat', 'excited', 30)}`,
  init: { t1: hid(180, 40), t2: hid(180, 80), t3: hid(180, 120), f1: hid(60, 180), f2: hid(140, 180), w: hid(260, 180), why: hid(180, 222), cat: at(318, 150) },
  caption0: 'Слова о чувствах — подсказки к ответу.',
  beats: beat(
    pop(200, 't1'), pop(800, 'f1'), cap(800, 'Scared — испуганный. Так Лео чувствовал себя сначала.'),
    pop(2800, 't2'), cap(2800, 'Друг улыбнулся и подбодрил его…'), pop(4400, 't3'), pop(4800, ['f2', 'w'], 300), cap(4800, '…и Лео успокоился: calm. Чувство изменилось из-за друга.'),
    pop(7000, 'why'), mood(7000, 'cat', 'happy'),
  ),
});

// серия 3: главная мысль и значение слова (интерактив)
const ep3 = episode({
  title: 'Главная мысль',
  terms: ['главная мысль текста', 'значение слова по тексту', 'польза (benefit)'],
  svg: `${emo('bottle', '🍾', 40)}${emo('arrow', '♻️', 40)}${emo('new', '🥫', 40)}${card('rec', 'recycling', { w: 120, size: 18, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}
    ${text('m', '= using materials again (снова используем)', { size: 13, color: '#16774a' })}${card('ben', 'benefit = польза', { w: 170, size: 15, fill: '#eef7fb' })}${text('b2', 'например: saves energy, less rubbish', { size: 13, color: '#1784a6' })}${kittenActor('cat', 'thinking', 32)}`,
  init: { bottle: hid(70, 60), arrow: hid(180, 60), new: hid(290, 60), rec: hid(180, 116), m: hid(180, 150), ben: hid(180, 194), b2: hid(180, 224), cat: at(4, 150) },
  caption0: 'Не знаешь слово — смотри, о чём весь текст.',
  beats: beat(
    pop(300, ['bottle', 'arrow', 'new'], 400), cap(1200, 'Старая бутылка стала новой банкой… Это recycling.'), pop(2000, 'rec'), pop(2800, 'm'),
    cap(4400, 'Benefit — польза. В тексте ищем, чем это хорошо.'), pop(4400, ['ben', 'b2'], 400), mood(4400, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { rec: { show: ['m'], say: 'Recycling — переработка: используем материалы снова.' }, ben: { show: ['b2'], say: 'Benefit — польза, то, чем что-то хорошо.' } } },
});

export default { topic: 'english-2-3', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

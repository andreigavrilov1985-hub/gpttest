// Остров 3 · Английский · Тема 2. Пассив, who/which, условные предложения — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

const W = (name, w, o = {}) => card(name, w, { w: 100, size: 16, lang: 'en', ...o });

// серия 1: актив и пассив
const ep1 = episode({
  title: 'Кто сделал — что сделали',
  terms: ['active voice', 'passive voice: was/were + 3-я форма', 'by — кем'],
  svg: `${W('s', 'Sam')}${W('v', 'painted')}${W('o', 'the fence')}${emo('paint', '🖌️', 34)}
    ${text('act', 'active: важен тот, кто делает', { size: 14, color: '#1784a6' })}${text('pas', 'passive: The fence was painted by Sam.', { size: 14, color: '#16774a' })}${text('was', 'was + painted', { size: 14, color: '#ff7a59' })}${kittenActor('cat', 'thinking', 28)}`,
  init: { s: hid(70, 60), v: hid(180, 60), o: hid(290, 60), paint: hid(180, 110), act: hid(180, 150), pas: hid(180, 190), was: hid(180, 220), cat: at(318, 196) },
  caption0: 'Sam painted the fence. Сэм покрасил забор.',
  beats: beat(
    pop(300, ['s', 'v', 'o'], 200), pop(1000, 'paint'), pop(1600, 'act'),
    cap(2800, 'А если важнее забор? Меняем местами!'), move(3000, 'o', { x: 70 }, 800, 'hop'), move(3000, 's', { x: 290 }, 800, 'hop'), setText(3800, 'vT', 'was painted'), setText(3800, 'sT', 'by Sam'),
    cap(4200, 'Passive: The fence was painted by Sam. Was + 3-я форма глагола.'), pop(4200, ['pas', 'was'], 300), mood(4200, 'cat', 'happy'),
  ),
});

// серия 2: who / which и was …-ing
const ep2 = episode({
  title: 'Who и which',
  terms: ['who — о людях', 'which — о предметах', 'past continuous: was watching when…'],
  svg: `${emo('man', '👨‍🍳', 40)}${W('who', 'who', { w: 70, fill: '#fff3d6', stroke: '#f2c46d' })}${text('w1', 'The man who cooks is my dad.', { size: 14 })}
    ${emo('bag', '🎒', 40)}${W('which', 'which', { w: 80, fill: '#eef7fb' })}${text('w2', 'The bag which I found is blue.', { size: 14 })}
    ${card('pc', 'I was reading when the bell rang.', { w: 300, size: 14, lang: 'en', fill: '#e2f8ea', stroke: '#9fdcb9' })}${text('pc2', 'длилось (was …-ing) — и вдруг случилось', { size: 12, color: '#5b6b83' })}${kittenActor('cat', 'excited', 26)}`,
  init: { man: hid(40, 40), who: hid(110, 40), w1: hid(220, 76), bag: hid(40, 110), which: hid(116, 110), w2: hid(220, 146), pc: hid(180, 194), pc2: hid(180, 224), cat: at(318, 4) },
  caption0: 'Who — о людях.',
  beats: beat(
    pop(300, ['man', 'who'], 200), pop(1000, 'w1'), cap(1000, 'The man who cooks… — человек, который готовит.'),
    pop(3000, ['bag', 'which'], 200), pop(3600, 'w2'), cap(3000, 'Which — о предметах: the bag which I found.'),
    cap(5400, 'Was reading — что-то длилось, когда случилось другое.'), pop(5400, ['pc', 'pc2'], 300), mood(5400, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: { who: { say: 'Who — о людях.' }, which: { say: 'Which — о предметах и животных.' } } },
});

// серия 3: although, if I were, сложное предложение
const ep3 = episode({
  title: 'Хотя и если бы',
  terms: ['although — хотя', 'if I were … I would … (мечта)', 'complex sentence: because, although'],
  svg: `${emo('rain', '🌧️', 34)}${emo('ball', '⚽', 34)}${card('al', 'Although it was cold, we swam.', { w: 300, size: 14, lang: 'en' })}${text('al2', 'although — хотя: это нам не помешало', { size: 13, color: '#1784a6' })}
    ${card('if', 'If I were a bird, I would fly.', { w: 300, size: 14, lang: 'en', fill: '#fff3d6', stroke: '#f2c46d' })}${emo('bird', '🐦', 30)}${text('if2', 'were — мечта, не на самом деле', { size: 13, color: '#b06200' })}${kittenActor('cat', 'excited', 26)}`,
  init: { rain: hid(40, 40), ball: hid(80, 40), al: hid(200, 40), al2: hid(180, 76), if: hid(180, 140), bird: hid(330, 110), if2: hid(180, 176), cat: at(4, 196) },
  caption0: 'Although — «хотя»: одно не помешало другому.',
  beats: beat(
    pop(300, ['rain', 'ball', 'al'], 200), cap(1000, 'Although it was cold, we swam — хотя было холодно, мы плавали.'), pop(2000, 'al2'),
    pop(3800, 'if'), cap(3800, 'If I were… I would… — мечтаем о том, чего нет. С I тоже were!'), hop(4600, 'bird', { x: 300, y: 100 }, 900), pop(5000, 'if2'), mood(5000, 'cat', 'happy'),
  ),
});

export default { topic: 'english-3-2', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

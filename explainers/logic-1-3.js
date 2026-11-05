// Остров 1 · Логика · Тема 3. Логические задачи — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, wiggle, episode, beat } from '../js/cartoon-kit.js';

// серия 1: «все кошки — животные»
const ep1 = episode({
  title: 'Все кошки — животные',
  terms: ['вывод из двух утверждений', 'все … — …'],
  svg: `<g data-a="big"><ellipse rx="150" ry="90" fill="#e2f8ea" stroke="#4cc27a" stroke-width="3"/></g>${text('bt', 'животные', { size: 16, color: '#16774a' })}
    <g data-a="small"><ellipse rx="60" ry="40" fill="#fff3d6" stroke="#f2c46d" stroke-width="3"/></g>${text('st', 'кошки', { size: 15, color: '#b06200' })}
    ${emo('murka', '🐈', 34)}${text('mt', 'Мурка', { size: 14 })}${kittenActor('cat', 'thinking', 34)}`,
  init: { big: hid(180, 125), bt: hid(180, 58), small: hid(210, 140), st: hid(210, 112), murka: at(330, 30, { o: 0 }), mt: hid(330, 60), cat: at(4, 4) },
  caption0: 'Все кошки — животные. Нарисуем это кругами.',
  beats: beat(
    pop(400, ['big', 'bt'], 200), pop(1400, ['small', 'st'], 200), cap(1400, 'Круг «кошки» целиком внутри круга «животные».'),
    cap(3800, 'Мурка — кошка. Она прыгает в круг кошек…'), [[3800, 'to', 'murka', { o: 1 }, 300]], pop(3800, 'mt'),
    hop(4400, 'murka', { x: 210, y: 150 }, 900), move(4400, 'mt', { x: 210, y: 176 }, 900),
    cap(5800, '…значит, она и в круге животных. Мурка — животное!'), mood(5800, 'cat', 'happy'),
  ),
});

// серия 2: кто ниже
const kid = (n, ch) => emo(n, ch, 44);
const ep2 = episode({
  title: 'Кто ниже?',
  terms: ['сравнение', 'выше / ниже', 'порядок'],
  svg: `<rect x="40" y="200" width="280" height="4" fill="#23324a"/>${kid('anya', '👧')}${kid('borya', '👦')}${kid('vitya', '🧒')}
    ${text('a', 'Аня', { size: 14 })}${text('b', 'Боря', { size: 14 })}${text('v', 'Витя', { size: 14 })}${text('rule', 'Аня > Боря > Витя', { size: 18, color: '#ff7a59' })}
    ${kittenActor('cat', 'thinking', 36)}`,
  init: { anya: hid(80, 120, { s: 0.4 }), borya: hid(180, 150), vitya: hid(280, 175), a: hid(80, 222), b: hid(180, 222), v: hid(280, 222), rule: hid(180, 40), cat: at(310, 4) },
  caption0: 'Аня выше Бори, а Боря выше Вити.',
  beats: beat(
    [[300, 'to', 'anya', { o: 1, s: 2.2 }, 500, 'back'], [500, 'to', 'borya', { o: 1, s: 1.6 }, 500, 'back'], [700, 'to', 'vitya', { o: 1, s: 1.1 }, 500, 'back']], pop(800, ['a', 'b', 'v'], 100),
    cap(2200, 'Выстроим по росту — слева направо.'), pop(2200, 'rule'),
    cap(4200, 'Самый низкий — Витя!'), wiggle(4200, 'vitya'), mood(4200, 'cat', 'happy'),
  ),
});

// серия 3: дни недели (послезавтра)
const DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const ep3 = episode({
  title: 'Послезавтра',
  terms: ['дни недели', 'завтра', 'послезавтра'],
  svg: `${DAYS.map((d, i) => card(`d${i}`, d, { w: 44, h: 40, size: 16, fill: i === 2 ? '#fff3d6' : '#fff', stroke: i === 2 ? '#f2c46d' : '#cfe6ef' })).join('')}
    ${text('today', 'сегодня', { size: 13, color: '#b06200' })}${text('t1', 'завтра', { size: 13, color: '#1784a6' })}${text('t2', 'послезавтра', { size: 13, color: '#16774a' })}${kittenActor('cat', 'excited', 36)}`,
  init: { ...Object.fromEntries(DAYS.map((_, i) => [`d${i}`, hid(30 + i * 50, 140)])), today: hid(130, 176), t1: hid(180, 106), t2: hid(230, 176), cat: at(112, 74) },
  caption0: 'Сегодня среда.',
  beats: beat(
    pop(200, DAYS.map((_, i) => `d${i}`), 120), pop(1200, 'today'),
    cap(2000, 'Завтра — следующий день: четверг.'), hop(2000, 'cat', { x: 162 }, 700), pop(2700, 't1'),
    cap(3800, 'Послезавтра — через два дня: пятница!'), hop(3800, 'cat', { x: 212 }, 700), pop(4500, 't2'), mood(4500, 'cat', 'happy'),
  ),
});

// серия 4: налево от востока и очередь
const ep4 = episode({
  title: 'Поворот и очередь',
  terms: ['стороны света', 'поворот налево', 'порядковый номер в очереди'],
  svg: `<circle cx="90" cy="110" r="70" fill="#fff" stroke="#d6e5ee" stroke-width="3"/>${text('N', 'С', { size: 16 })}${text('E', 'В', { size: 16 })}${text('S', 'Ю', { size: 16 })}${text('W', 'З', { size: 16 })}
    <g data-a="arr"><path d="M0 0 L50 0" stroke="#ff7a59" stroke-width="6" stroke-linecap="round"/><path d="M40 -10 L52 0 L40 10" fill="none" stroke="#ff7a59" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>
    ${emo('q1', '🧒', 36)}${emo('q2', '👧', 36)}${emo('kolya', '👦', 36)}${text('n1', '1', { size: 15 })}${text('n2', '2', { size: 15 })}${text('n3', '3 — Коля!', { size: 15, color: '#16774a' })}${emo('shop', '🏪', 36)}
    ${kittenActor('cat', 'thinking', 34)}`,
  init: { N: at(90, 52), E: at(150, 116), S: at(90, 176), W: at(30, 116), arr: at(90, 110, { o: 0 }), shop: hid(210, 210), q1: hid(250, 210), q2: hid(290, 210), kolya: hid(330, 210), n1: hid(250, 186), n2: hid(290, 186), n3: hid(320, 168), cat: at(250, 30) },
  caption0: 'Лена идёт на восток.',
  beats: beat(
    [[400, 'to', 'arr', { o: 1 }, 300]], cap(1400, 'Поворачивает налево — это четверть круга против часовой стрелки.'), move(1600, 'arr', { r: -90 }, 900),
    cap(3200, 'Стрелка смотрит на север! Если смотришь на восток, слева — север.'), mood(3200, 'cat', 'happy'),
    cap(5400, 'Перед Колей стоят двое. Каким он стоит?'), pop(5400, ['shop', 'q1', 'q2', 'kolya'], 200), mood(5400, 'cat', 'thinking'),
    pop(6600, ['n1', 'n2'], 400), pop(7400, 'n3'), cap(7400, 'Первый, второй… Коля — третий!'), mood(7400, 'cat', 'happy'),
  ),
});

// интерактив: нажми — котёнок объяснит
ep3.interact = { type: 'tapShow', cat: 'cat', items: {
  d2: { say: 'Среда — сегодня.' }, d3: { say: 'Четверг — завтра.' }, d4: { say: 'Пятница — послезавтра!', mood: 'celebrate' },
} };

export default {
  topic: 'logic-1-3',
  kind: 'cartoon',
  episodes: [ep1, ep2, ep3, ep4],
  memo: [
    'Если все кошки — животные, а Мурка — кошка, то Мурка — животное.',
    'Сравнение по росту: выстрой всех по порядку и найди крайнего.',
    'Дни недели: пн, вт, ср, чт, пт, сб, вс. Завтра — следующий день, послезавтра — через два дня.',
    'Если смотришь на восток, слева север, справа юг.',
    'В задачах на счёт (яблоки, лапы, конфеты) запиши действие: 5 − 2 = 3, 3 × 4 = 12, 3 + 2 = 5.',
    'В очереди: если перед тобой двое, ты третий.',
  ],
};

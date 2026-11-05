// Остров 3 · Математика · Тема 3. Скобки, уравнения и прямые — мини-мультфильм (примеры свои)
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, cutLine, episode, beat } from '../js/cartoon-kit.js';

// серия 1: (x + 1)(x + 4) как площадь
const ep1 = episode({
  title: 'Скобки-прямоугольник',
  terms: ['раскрытие двух скобок', 'x²', 'вынесение множителя за скобки'],
  svg: `<g data-a="xx"><rect x="0" y="0" width="90" height="90" fill="#ffcf3f" stroke="#fff" stroke-width="2"/></g><g data-a="x4"><rect x="0" y="0" width="60" height="90" fill="#ff9a3c" stroke="#fff" stroke-width="2"/></g>
    <g data-a="x1"><rect x="0" y="0" width="90" height="20" fill="#2bb3c9" stroke="#fff" stroke-width="2"/></g><g data-a="c4"><rect x="0" y="0" width="60" height="20" fill="#9b5cf6" stroke="#fff" stroke-width="2"/></g>
    ${text('tx', 'x²', { size: 18 })}${text('t4x', '4x', { size: 16, color: '#fff' })}${text('t1x', 'x', { size: 13, color: '#fff' })}${text('t4', '4', { size: 13, color: '#fff' })}
    ${text('sum', '(x + 1)(x + 4) = x² + 4x + x + 4 = x² + 5x + 4', { size: 13, color: '#16774a' })}${card('fac', '4x + 8 = 4(x + 2)', { w: 200, size: 16, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 28)}`,
  init: { xx: hid(40, 30), x4: hid(130, 30), x1: hid(40, 120), c4: hid(130, 120), tx: hid(85, 80), t4x: hid(160, 80), t1x: hid(85, 135), t4: hid(160, 135), sum: hid(180, 170), fac: hid(180, 214), cat: at(318, 30) },
  caption0: '(x + 1)(x + 4) — это площадь прямоугольника со сторонами x + 1 и x + 4.',
  beats: beat(
    pop(400, ['xx', 'tx'], 200), pop(1400, ['x4', 't4x'], 200), pop(2400, ['x1', 't1x'], 200), pop(3400, ['c4', 't4'], 200),
    cap(1400, 'Каждый кусок — произведение: x · x, x · 4, 1 · x, 1 · 4.'),
    cap(4400, 'Складываем все куски: x² + 5x + 4.'), pop(4400, 'sum'),
    cap(6400, 'Обратное — вынести общий множитель за скобки.'), pop(6400, 'fac'), mood(6400, 'cat', 'happy'),
  ),
});

// серия 2: уравнение с иксами с обеих сторон
const ep2 = episode({
  title: 'Иксы с обеих сторон',
  terms: ['уравнение с x в обеих частях', 'перенос', 'деление на коэффициент'],
  svg: `${text('e0', '4x + 1 = x + 10', { size: 24 })}${text('e1', 'убираем x с обеих сторон: 3x + 1 = 10', { size: 15, color: '#1784a6' })}${text('e2', 'убираем 1: 3x = 9', { size: 15, color: '#1784a6' })}${text('e3', 'делим на 3: x = 3', { size: 22, color: '#16774a' })}
    ${text('chk', 'проверка: 4·3 + 1 = 13 = 3 + 10 ✓', { size: 14, color: '#5b6b83' })}${kittenActor('cat', 'thinking', 28)}`,
  init: { e0: hid(180, 40), e1: hid(180, 84), e2: hid(180, 118), e3: hid(180, 158), chk: hid(180, 204), cat: at(318, 196) },
  caption0: 'Решим 4x + 1 = x + 10.',
  beats: beat(
    pop(300, 'e0'), cap(1000, 'Собираем иксы в одной стороне: вычтем x из обеих частей.'), pop(1600, 'e1'),
    cap(3200, 'Теперь числа в другую сторону: вычтем 1.'), pop(3400, 'e2'),
    cap(5000, 'И разделим на 3.'), pop(5000, 'e3'), cap(6600, 'Всегда проверяй: подставь ответ в уравнение.'), pop(6600, 'chk'), mood(6600, 'cat', 'happy'),
  ),
});

// серия 3: прямая y = mx + c
const gx = (x) => 60 + x * 30;
const gy = (y) => 210 - y * 18;
const ep3 = episode({
  title: 'Прямая на графике',
  terms: ['y = mx + c', 'градиент m — наклон', 'c — точка на оси y', 'формула n-го члена'],
  svg: `<path d="M60 20 V210 H340" stroke="#23324a" stroke-width="3" fill="none"/>${cutLine('ln', gx(0), gy(1), gx(4.5), gy(10), '#ff7a59')}
    <g data-a="c"><circle r="7" fill="#9b5cf6"/></g>${text('ct', 'c = 1: точка на оси y', { size: 13, color: '#6d3ad1' })}
    <path data-a="step" d="M${gx(1)} ${gy(3)} h30 v-36" stroke="#16774a" stroke-width="3" fill="none" stroke-dasharray="4 3"/>${text('mt', 'вправо на 1 — вверх на 2: градиент 2', { size: 13, color: '#16774a' })}
    ${card('f', 'y = 2x + 1', { w: 130, size: 20, fill: '#fff3d6', stroke: '#f2c46d' })}${text('sq', 'ряд 3, 5, 7… шаг 2 → 2n + 1', { size: 13, color: '#5b6b83' })}${kittenActor('cat', 'excited', 26)}`,
  init: { c: hid(gx(0), gy(1)), ct: hid(150, gy(1) + 4), step: { o: 0 }, mt: hid(220, 140), f: hid(260, 40), sq: hid(250, 230), cat: at(4, 4) },
  caption0: 'Прямая y = 2x + 1.',
  beats: beat(
    pop(300, 'f'), pop(900, ['c', 'ct'], 200), cap(900, 'c = 1 — где прямая пересекает ось y.'),
    draw(2600, 'ln', 1200), [[3400, 'to', 'step', { o: 1 }, 400]], pop(3800, 'mt'), cap(2600, 'm = 2 — градиент: на шаг вправо прямая поднимается на 2.'),
    cap(5600, 'Так же формула ряда: шаг 2, первый член 3 → 2n + 1.'), pop(5600, 'sq'), mood(5600, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { xx: { say: 'x · x = x²' }, x4: { say: 'x · 4 = 4x' }, x1: { say: '1 · x = x' }, c4: { say: '1 · 4 = 4' } } };

export default { topic: 'math-3-3', kind: 'cartoon', episodes: [ep1, ep2, ep3] };

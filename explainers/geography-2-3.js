// Остров 2 · География · Тема 3. Реки и приборы погоды — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, draw, episode, beat } from '../js/cartoon-kit.js';

// серия 1: речной бассейн
const ep1 = episode({
  title: 'Речной бассейн',
  terms: ['приток', 'речной бассейн', 'водораздел', 'меандр', 'дельта'],
  svg: `<rect x="0" y="0" width="360" height="240" fill="#e3f6d5"/><g data-a="basin"><path d="M30 30 Q180 -10 330 40 L320 200 Q180 230 40 200 Z" fill="#cfe6ef" opacity=".6"/></g>
    <path d="M10 70 L60 20 L110 60" stroke="#8a6d5a" stroke-width="6" fill="none"/>
    <path data-a="main" data-draw d="M70 40 C 120 80, 80 110, 140 120 C 200 130, 150 170, 220 175 C 260 178, 260 150, 300 170" stroke="#2bb3c9" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path data-a="trib" data-draw d="M200 30 C 210 70, 170 90, 150 118" stroke="#7fd0e3" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path data-a="delta" d="M300 170 l30 -20 M300 170 l36 0 M300 170 l30 22" stroke="#2bb3c9" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${text('tw', 'водораздел', { size: 13 })}${text('tt', 'приток', { size: 13, color: '#1784a6' })}${text('tm', 'меандр — изгиб', { size: 13, color: '#1784a6' })}${text('td', 'дельта', { size: 13, color: '#1784a6' })}${text('tb', 'бассейн', { size: 14, color: '#5b6b83' })}
    ${kittenActor('cat', 'excited', 28)}`,
  init: { basin: { o: 0 }, delta: { o: 0 }, tw: hid(110, 14), tt: hid(222, 60), tm: hid(190, 196), td: hid(330, 214), tb: hid(90, 180), cat: at(4, 196) },
  caption0: 'Река собирает воду с большой территории.',
  beats: beat(
    draw(400, 'main', 2000), cap(800, 'Вода стекает с гор, и река течёт, извиваясь.'),
    pop(2600, 'tm'), cap(2600, 'Плавный изгиб реки называется меандр.'),
    draw(4200, 'trib', 800), pop(4800, 'tt'), cap(4200, 'Маленькая речка, впадающая в большую, — приток.'),
    [[6200, 'to', 'basin', { o: 1 }, 600]], pop(6400, 'tb'), cap(6200, 'Вся земля, с которой река и притоки собирают воду, — речной бассейн.'),
    pop(8400, 'tw'), cap(8400, 'Возвышенность, которая разделяет соседние бассейны, — водораздел.'),
    [[10200, 'to', 'delta', { o: 1 }, 500]], pop(10400, 'td'), cap(10200, 'В устье река может разветвиться — это дельта из речных наносов.'), mood(10400, 'cat', 'happy'),
  ),
});

// серия 2: приборы погоды (интерактив)
const ep2 = episode({
  title: 'Метеостанция',
  terms: ['дождемер — осадки', 'барометр — атмосферное давление', 'анемометр — скорость ветра', 'западный ветер дует с запада', 'пустыня — мало осадков'],
  svg: `${card('rg', '🧪 дождемер', { w: 120, size: 14 })}${card('ba', '⏲️ барометр', { w: 120, size: 14 })}${card('an', '🌀 анемометр', { w: 120, size: 14 })}
    ${text('rg2', 'осадки', { size: 13 })}${text('ba2', 'давление', { size: 13 })}${text('an2', 'ветер', { size: 13 })}
    ${emo('flag', '🚩', 34)}${text('wind', 'западный ветер дует С запада →', { size: 13, color: '#1784a6' })}${text('des', 'пустынный климат: очень мало осадков', { size: 13, color: '#b06200' })}${kittenActor('cat', 'thinking', 28)}`,
  init: { rg: hid(70, 50), ba: hid(190, 50), an: hid(310, 50), rg2: hid(70, 84), ba2: hid(190, 84), an2: hid(310, 84), flag: hid(60, 150), wind: hid(210, 150), des: hid(180, 210), cat: at(4, 196) },
  caption0: 'На метеостанции свои приборы. Нажимай на них!',
  beats: beat(
    pop(300, ['rg', 'ba', 'an'], 250),
    cap(1400, 'Дождемер собирает дождь — так измеряют осадки.'), pop(1400, 'rg2'),
    cap(3000, 'Барометр показывает атмосферное давление.'), pop(3000, 'ba2'),
    cap(4600, 'Анемометр крутится от ветра — меряет его скорость.'), pop(4600, 'an2'), move(4600, 'an', { r: 360 }, 1200),
    cap(6400, 'Ветер называют по тому, ОТКУДА он дует: западный — с запада.'), pop(6400, ['flag', 'wind'], 200), move(6800, 'flag', { r: 15 }, 300),
    cap(8400, 'В пустыне осадков очень мало — это главный признак пустынного климата.'), pop(8400, 'des'), mood(8400, 'cat', 'happy'),
  ),
  interact: { type: 'tapShow', cat: 'cat', items: {
    rg: { show: ['rg2'], say: 'Дождемер: сколько выпало осадков.' }, ba: { show: ['ba2'], say: 'Барометр: атмосферное давление.' }, an: { show: ['an2'], say: 'Анемометр: скорость ветра.' },
  } },
});

export default { topic: 'geography-2-3', kind: 'cartoon', episodes: [ep1, ep2] };

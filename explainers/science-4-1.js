// Остров 4 · Наука · Тема 1. Ряд активности металлов, кислоты и щёлочи — мини-мультфильм
import { card, text, emo, kittenActor, at, hid, cap, pop, fade, move, hop, mood, setText, episode, beat } from '../js/cartoon-kit.js';

// серия 1: ряд активности и вытеснение
const METALS = ['K', 'Na', 'Mg', 'Zn', 'Fe', 'Cu', 'Au'];
const ep1 = episode({
  title: 'Кто активнее',
  terms: ['ряд активности металлов', 'натрий — очень активный', 'вытеснение: активный металл вытесняет менее активный', 'медь на железном гвозде'],
  svg: `${METALS.map((m, i) => card(`m${i}`, m, { w: 40, h: 36, size: 15, fill: i < 3 ? '#ffe9e4' : i < 5 ? '#fff3d6' : '#eef7fb' })).join('')}${text('top', 'самые активные ←', { size: 13, color: '#c0392b' })}${text('bot', '→ малоактивные', { size: 13, color: '#1784a6' })}
    <rect x="180" y="110" width="140" height="80" rx="8" fill="#9adbe8" opacity=".7"/>${text('sol', 'раствор сульфата меди', { size: 12, color: '#1784a6' })}<g data-a="nail"><rect x="-5" y="-40" width="10" height="70" rx="3" fill="#9aa5b4"/></g><g data-a="cu"><rect x="-6" y="-10" width="12" height="40" rx="3" fill="#c96a3a"/></g>
    ${text('d', 'железо активнее меди — вытесняет её', { size: 12, color: '#16774a' })}${kittenActor('cat', 'surprised', 24)}`,
  init: { ...Object.fromEntries(METALS.map((_, i) => [`m${i}`, hid(40 + i * 46, 40)])), top: hid(90, 76), bot: hid(270, 76), sol: hid(250, 206), nail: at(250, 140), cu: at(250, 140, { o: 0 }), d: hid(120, 150), cat: at(4, 196) },
  caption0: 'Металлы выстроились по активности.',
  beats: beat(
    pop(200, METALS.map((_, i) => `m${i}`), 150), pop(1400, ['top', 'bot'], 200), cap(1400, 'Калий и натрий — очень активные. Медь и золото — спокойные.'),
    cap(3600, 'Железный гвоздь опустили в раствор с медью…'), [[4400, 'to', 'cu', { o: 1 }, 1600]],
    cap(5600, 'Гвоздь покрылся медью! Активный металл вытесняет менее активный.'), pop(5600, 'd'), mood(5600, 'cat', 'excited'),
  ),
});

// серия 2: нейтрализация, индикатор, CO₂
const ep2 = episode({
  title: 'Кислота + щёлочь',
  terms: ['нейтрализация: кислота + щёлочь → соль + вода', 'индикатор: кислота красная, щёлочь фиолетовая', 'таблетка от изжоги нейтрализует кислоту', 'CO₂ мутит известковую воду', 'металл + кислота → соль (хлорид) + водород'],
  svg: `${card('ac', 'кислота pH 2', { w: 110, size: 14, fill: '#ffd0c4', stroke: '#e4553b' })}${card('al', 'щёлочь pH 12', { w: 110, size: 14, fill: '#e2d7ff', stroke: '#7a3aa8' })}${text('pl', '+', { size: 24 })}
    ${card('neu', 'соль + вода, pH 7', { w: 160, size: 15, fill: '#e2f8ea', stroke: '#4cc27a' })}${emo('pill', '💊', 30)}${text('pt', 'таблетка от изжоги нейтрализует кислоту', { size: 12, color: '#5b6b83' })}
    ${card('lw', 'CO₂ → известковая вода мутнеет', { w: 260, size: 13, fill: '#f3f5f8' })}${card('mc', 'магний + соляная кислота → хлорид магния + водород', { w: 340, size: 11, fill: '#eef7fb' })}${kittenActor('cat', 'excited', 22)}`,
  init: { ac: hid(80, 30), pl: hid(180, 34), al: hid(280, 30), neu: hid(180, 80), pill: hid(40, 124), pt: hid(200, 124), lw: hid(180, 170), mc: hid(180, 214), cat: at(320, 200) },
  caption0: 'Смешаем кислоту и щёлочь…',
  beats: beat(
    pop(300, ['ac', 'pl', 'al'], 200), move(1200, 'ac', { x: 150 }, 600), move(1200, 'al', { x: 210 }, 600), fade(1900, ['ac', 'al', 'pl']), pop(2000, 'neu'),
    cap(2000, 'Получились соль и вода — нейтральный раствор. Это нейтрализация.'), pop(3600, ['pill', 'pt'], 300),
    cap(5200, 'Углекислый газ узнают по известковой воде: она мутнеет.'), pop(5200, 'lw'),
    cap(6800, 'Металл с кислотой даёт соль и водород.'), pop(6800, 'mc'), mood(6800, 'cat', 'happy'),
  ),
});

ep1.interact = { type: 'tapShow', cat: 'cat', items: { m1: { say: 'Na — натрий: очень активный.' }, m4: { say: 'Fe — железо: активнее меди.' }, m5: { say: 'Cu — медь: малоактивная.' } } };

export default { topic: 'science-4-1', kind: 'cartoon', episodes: [ep1, ep2] };

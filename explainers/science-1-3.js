// Остров 1 · Наука · Тема 3. Материалы и вещества (вопросы на английском)
export default {
  topic: 'science-1-3',
  steps: [
    {
      block: 'tiles',
      params: {
        interactive: true,
        items: [
          { icon: '🧊', title: 'solid — твёрдое', text: 'держит свою форму: лёд, камень' },
          { icon: '💧', title: 'liquid — жидкость', text: 'течёт и принимает форму сосуда: вода' },
          { icon: '💨', title: 'gas — газ', text: 'разлетается и заполняет всё место: пар' },
        ],
      },
      cat: 'Нажми на каждую карточку!',
      caption: 'Вещество бывает твёрдым (solid), жидким (liquid) и газом (gas).',
      terms: ['solid', 'liquid', 'gas'],
    },
    {
      block: 'diagramFlow',
      params: {
        interactive: true,
        nodes: [
          { icon: '🧊', label: 'лёд', more: 'solid' },
          { icon: '💧', label: 'вода', more: 'liquid' },
          { icon: '☁️', label: 'пар', more: 'gas, water vapour' },
        ],
        arrows: ['melting', 'evaporation'],
        cycle: true,
        cycleLabel: 'назад: пар → вода (condensation), вода → лёд (freezing)',
      },
      cat: 'Смотри, как вода меняется!',
      caption: 'Melting — таяние, evaporation — испарение, freezing — замерзание. Вода замерзает при 0°C, кипит при 100°C (на уровне моря).',
      terms: ['melting', 'evaporation', 'freezing', 'water vapour', '0°C', '100°C'],
    },
    {
      block: 'diagramFlow',
      params: {
        nodes: [
          { icon: '🧂', label: 'соль' },
          { icon: '💧', label: 'вода' },
          { icon: '🥤', label: 'солёная вода' },
        ],
        arrows: ['+', 'dissolve'],
      },
      cat: 'Соль спряталась в воде!',
      caption: 'Dissolve — раствориться, исчезнуть из виду в жидкости. Solvent — то, в чём растворяют: вода.',
      terms: ['dissolve', 'solvent'],
    },
    {
      block: 'tiles',
      params: {
        items: [
          { icon: '🏖️', title: 'песок + вода → filter', text: 'песок не растворяется и остаётся на фильтре' },
          { icon: '☀️', title: 'солёная вода → evaporate', text: 'вода испаряется, соль остаётся' },
        ],
      },
      cat: 'А теперь разделим смесь обратно.',
      caption: 'Filter задерживает нерастворившееся. Соль фильтр пропустит: её получают, когда вода испарится.',
      terms: ['filter', 'separate', 'evaporate'],
    },
    {
      block: 'tiles',
      params: {
        interactive: true,
        items: [
          { icon: '🧲', title: 'magnet + iron', text: 'магнит притягивает железо; дерево и пластик — нет' },
          { icon: '🔌', title: 'conductor', text: 'проводник пропускает ток: медь (copper)' },
          { icon: '🧤', title: 'insulator', text: 'изолятор не пропускает ток: резина, пластик' },
        ],
      },
      cat: 'Угадай, что внутри карточек!',
      caption: 'Magnet притягивает iron (железо). Conductor пропускает ток, insulator — нет.',
      terms: ['magnet', 'iron', 'conductor', 'insulator', 'copper'],
    },
    {
      block: 'tiles',
      params: {
        items: [
          { icon: '🍫', title: 'reversible — обратимое', text: 'шоколад растаял, остыл и снова твёрдый' },
          { icon: '🔥', title: 'irreversible — необратимое', text: 'сгоревшее дерево, испечённый торт назад не вернуть' },
        ],
      },
      cat: 'Можно ли всё вернуть назад?',
      caption: 'Reversible change — можно вернуть как было: таяние. Горение назад не вернуть.',
      terms: ['reversible change', 'irreversible change'],
    },
  ],
  memo: [
    'Solid — твёрдое (держит форму), liquid — жидкость (течёт), gas — газ (заполняет всё место).',
    'Melting — таяние, freezing — замерзание (вода при 0°C), evaporation — испарение. Вода кипит при 100°C на уровне моря.',
    'Dissolve — растворить. Solvent — растворитель: то, в чём растворяют (вода).',
    'Filter задерживает нерастворившееся (песок). Соль из солёной воды получают испарением.',
    'Magnet притягивает iron (железо). Conductor (медь) пропускает ток, insulator (резина, пластик) — нет.',
    'Reversible change можно вернуть назад (таяние шоколада); горение — нельзя.',
  ],
};

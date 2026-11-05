// Остров 1 · Английский · Тема 2. Грамматика: времена и части речи
export default {
  topic: 'english-1-2',
  steps: [
    {
      block: 'wordBuilder',
      params: {
        pairs: [
          { base: 'I like', result: 'she likes', note: 'с he, she, it добавляем -s' },
          { base: 'go', add: 'es', result: 'she goes', note: 'после o добавляем -es' },
          { base: 'play', add: 's', result: 'he plays' },
        ],
      },
      cat: 'Глагол — это слово-действие!',
      caption: 'Настоящее время — то, что бывает обычно, every day (каждый день). С he, she, it к глаголу добавляем -s.',
      terms: ['глагол', 'настоящее время', 'окончание -s / -es'],
    },
    {
      block: 'wordBuilder',
      params: {
        pairs: [
          { base: 'play', add: 'ed', result: 'played' },
          { base: 'eat', result: 'ate', note: 'своя форма' },
          { base: 'see', result: 'saw', note: 'своя форма' },
          { base: 'go', result: 'went', note: 'своя форма' },
        ],
      },
      cat: 'Вчера — значит прошлое!',
      caption: 'Прошедшее время — то, что уже было: yesterday (вчера), last week (на прошлой неделе). Обычно -ed, но бывает своя форма.',
      terms: ['прошедшее время', 'yesterday', 'last week', 'неправильные глаголы'],
    },
    {
      block: 'tiles',
      params: {
        items: [
          { icon: '🔮', title: 'Tomorrow we will go.', lang: 'en', text: 'will + глагол = будущее. Tomorrow — завтра.' },
          { icon: '🙋', title: 'I am · he is · they are', lang: 'en', text: 'am, is, are — формы глагола «быть»' },
        ],
      },
      cat: 'А теперь заглянем в будущее.',
      caption: 'Будущее время: will + глагол. С they ставим are: they are playing.',
      terms: ['будущее время', 'will', 'tomorrow', 'am / is / are'],
    },
    {
      block: 'tiles',
      params: {
        interactive: true,
        items: [
          { icon: '👦', title: 'he', lang: 'en', text: 'он: Tom → he' },
          { icon: '👧', title: 'she', lang: 'en', text: 'она: Anna → she' },
          { icon: '👫', title: 'they', lang: 'en', text: 'они' },
          { icon: '🎒', title: 'my', lang: 'en', text: 'мой: my book — моя книга' },
        ],
      },
      cat: 'Нажми на карточки и проверь себя!',
      caption: 'Местоимение — слово вместо имени: Tom → he. My («мой») показывает, чьё.',
      terms: ['местоимение', 'he / she / they', 'my'],
    },
    {
      block: 'tiles',
      params: {
        items: [
          { icon: '📕', title: 'a book', lang: 'en', text: 'a — перед согласным звуком' },
          { icon: '🍎', title: 'an apple', lang: 'en', text: 'an — перед гласным звуком' },
          { icon: '❓', title: 'What? Where? Who?', lang: 'en', text: 'что? где? кто?' },
        ],
      },
      cat: 'Маленькие слова, но очень важные.',
      caption: 'Артикль a/an — «какой-то один», не конкретный. What — что, Where — где, Who — кто.',
      terms: ['артикль a / an', 'вопросительные слова'],
    },
    {
      block: 'sentenceBlocks',
      params: { words: ['Do', 'you', 'like', 'pizza?'], shuffled: ['like', 'pizza?', 'Do', 'you'] },
      cat: 'Собери вопрос из кубиков!',
      caption: 'Вопрос часто начинается с Do, а в конце стоит знак вопроса.',
      terms: ['вопросительное предложение', 'Do', 'знак вопроса'],
    },
  ],
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

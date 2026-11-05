// All tunable constants in one place.
export const CONFIG = {
  PASS_THRESHOLD: 0.7,          // 70% per city (sum of the city's questions)
  TOPIC_WEAK_THRESHOLD: 0.7,    // topics below this get extra tasks
  // Stage 2: "too easy" detection. Kept here so it is changed in one place.
  FAST_ANSWER_FRACTION: 1 / 3,
  // "Usual" time for a question: base + per character of question and options.
  USUAL_TIME_BASE_MS: 4000,
  USUAL_TIME_PER_CHAR_MS: 60,
  IDLE_MS: 20000,                  // kitten dozes off after 20 s without an answer
  COMEBACK_AFTER_MS: 3 * 60 * 60 * 1000, // "welcome back" phrases after a 3-hour break
  STORAGE_KEY: 'kidsgame.progress.v1',
  ISLANDS: [1, 2, 3, 4, 5],
  SUBJECTS: ['math', 'english', 'science', 'geography', 'logic'],
  SPEECH_LANG: 'en-GB',
  SPEECH_RATE: 0.9,
  COINS_PER_CORRECT: 1,
};

export const SUBJECT_INFO = {
  math: { name: 'Математика', city: 'Город Чисел', icon: '🔢', color: '#ff8a3d' },
  english: { name: 'Английский', city: 'Город Слов', icon: '📖', color: '#4f8cff' },
  science: { name: 'Наука', city: 'Город Опытов', icon: '🔬', color: '#22b07d' },
  geography: { name: 'География', city: 'Город Карт', icon: '🌍', color: '#18a4c4' },
  logic: { name: 'Логика', city: 'Город Загадок', icon: '🧩', color: '#9b5cf6' },
};

export const ISLAND_INFO = {
  1: { name: 'Остров Ракушек', year: 'Year 6' },
  2: { name: 'Остров Пальм', year: 'Year 7' },
  3: { name: 'Остров Вулкана', year: 'Year 8' },
  4: { name: 'Остров Маяка', year: 'Year 9' },
  5: { name: 'Остров Звёзд', year: 'Year 10' },
};

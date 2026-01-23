/**
 * Calculates reading time for given text
 * Assumes average reading speed of 200 words per minute (Russian standard)
 *
 * @param text - Text content to analyze
 * @param options - Configuration options
 * @returns Reading time in minutes and formatted string
 *
 * @example
 * readingTime('Текст из 400 слов...') // => { minutes: 2, words: 400, text: '2 мин чтения' }
 */
export function readingTime(
  text: string,
  options: {
    wordsPerMinute?: number;
    locale?: 'ru' | 'en';
  } = {}
): {
  minutes: number;
  words: number;
  text: string;
} {
  const { wordsPerMinute = 200, locale = 'ru' } = options;

  // Remove HTML tags if present
  const strippedText = text.replace(/<[^>]*>/g, '');

  // Count words (split by whitespace)
  const words = strippedText.trim().split(/\s+/).length;

  // Calculate reading time
  const minutes = Math.ceil(words / wordsPerMinute);

  // Format text based on locale
  let formattedText: string;
  if (locale === 'ru') {
    formattedText = formatMinutesRu(minutes);
  } else {
    formattedText = minutes === 1 ? '1 min read' : `${minutes} min read`;
  }

  return {
    minutes,
    words,
    text: formattedText,
  };
}

/**
 * Formats minutes in Russian with proper declension
 *
 * @param minutes - Number of minutes
 * @returns Formatted string (e.g., "1 минута чтения", "2 минуты чтения", "5 минут чтения")
 */
function formatMinutesRu(minutes: number): string {
  const lastDigit = minutes % 10;
  const lastTwoDigits = minutes % 100;

  let word: string;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    word = 'минут';
  } else if (lastDigit === 1) {
    word = 'минута';
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    word = 'минуты';
  } else {
    word = 'минут';
  }

  return `${minutes} ${word} чтения`;
}

/**
 * Estimates reading time for a given word count
 *
 * @param wordCount - Number of words
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Reading time in minutes
 *
 * @example
 * estimateReadingTime(400) // => 2
 */
export function estimateReadingTime(
  wordCount: number,
  wordsPerMinute: number = 200
): number {
  return Math.ceil(wordCount / wordsPerMinute);
}

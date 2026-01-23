/**
 * Transliteration map: Cyrillic → Latin
 */
const translitMap: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
  А: 'A',
  Б: 'B',
  В: 'V',
  Г: 'G',
  Д: 'D',
  Е: 'E',
  Ё: 'Yo',
  Ж: 'Zh',
  З: 'Z',
  И: 'I',
  Й: 'Y',
  К: 'K',
  Л: 'L',
  М: 'M',
  Н: 'N',
  О: 'O',
  П: 'P',
  Р: 'R',
  С: 'S',
  Т: 'T',
  У: 'U',
  Ф: 'F',
  Х: 'H',
  Ц: 'Ts',
  Ч: 'Ch',
  Ш: 'Sh',
  Щ: 'Sch',
  Ъ: '',
  Ы: 'Y',
  Ь: '',
  Э: 'E',
  Ю: 'Yu',
  Я: 'Ya',
};

/**
 * Transliterates Cyrillic text to Latin characters
 *
 * @param text - Text to transliterate
 * @returns Transliterated text
 *
 * @example
 * transliterate('Привет мир') // => 'Privet mir'
 */
function transliterate(text: string): string {
  return text
    .split('')
    .map((char) => translitMap[char] || char)
    .join('');
}

/**
 * Converts a string to a URL-friendly slug
 * Supports Cyrillic → Latin transliteration
 *
 * @param text - Text to slugify
 * @param options - Slugify options
 * @returns URL-friendly slug
 *
 * @example
 * slugify('Привет Мир!') // => 'privet-mir'
 * slugify('Hello World 123') // => 'hello-world-123'
 * slugify('Тест___Пост', { separator: '_' }) // => 'test_post'
 */
export function slugify(
  text: string,
  options: {
    separator?: string;
    lowercase?: boolean;
    maxLength?: number;
  } = {}
): string {
  const { separator = '-', lowercase = true, maxLength } = options;

  let slug = text;

  // Transliterate Cyrillic characters
  slug = transliterate(slug);

  // Convert to lowercase if needed
  if (lowercase) {
    slug = slug.toLowerCase();
  }

  // Replace spaces and special characters with separator
  slug = slug
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, separator) // Replace spaces, underscores, hyphens with separator
    .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), ''); // Remove leading/trailing separators

  // Truncate to max length
  if (maxLength && slug.length > maxLength) {
    slug = slug.slice(0, maxLength);
    // Remove trailing separator if any
    slug = slug.replace(new RegExp(`${separator}+$`), '');
  }

  return slug;
}

/**
 * Generates a unique slug by appending a number if slug already exists
 *
 * @param text - Text to slugify
 * @param existingSlugs - Array of existing slugs to check against
 * @returns Unique slug
 *
 * @example
 * uniqueSlugify('Test', ['test']) // => 'test-1'
 * uniqueSlugify('Test', ['test', 'test-1']) // => 'test-2'
 */
export function uniqueSlugify(text: string, existingSlugs: string[]): string {
  let slug = slugify(text);
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${slugify(text)}-${counter}`;
    counter++;
  }

  return slug;
}

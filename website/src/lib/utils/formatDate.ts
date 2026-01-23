/**
 * Formats a date string or Date object to Russian locale
 *
 * @param date - Date string or Date object to format
 * @param options - Intl.DateTimeFormatOptions for customization
 * @returns Formatted date string in Russian locale
 *
 * @example
 * formatDate('2026-01-23') // => '23 января 2026 г.'
 * formatDate(new Date(), { dateStyle: 'short' }) // => '23.01.2026'
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ru-RU', options).format(dateObj);
}

/**
 * Formats a date to ISO 8601 format (YYYY-MM-DD)
 *
 * @param date - Date string or Date object
 * @returns ISO formatted date string
 *
 * @example
 * formatDateISO('23 января 2026') // => '2026-01-23'
 */
export function formatDateISO(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
}

/**
 * Formats a date to relative time (e.g., "2 дня назад", "через месяц")
 *
 * @param date - Date string or Date object
 * @returns Relative time string in Russian
 *
 * @example
 * formatRelativeTime('2026-01-21') // => '2 дня назад'
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat('ru-RU', { numeric: 'auto' });

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ] as const;

  for (const interval of intervals) {
    const count = Math.floor(Math.abs(diffInSeconds) / interval.seconds);
    if (count >= 1) {
      return rtf.format(diffInSeconds < 0 ? count : -count, interval.label);
    }
  }

  return rtf.format(0, 'second');
}

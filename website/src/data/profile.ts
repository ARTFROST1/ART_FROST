/**
 * Profile Configuration
 * Personal information, bio, and avatar for the About page
 */

export interface ProfileConfig {
  /** Full name */
  name: string;
  /** Professional title */
  title: string;
  /** Short tagline */
  tagline: string;
  /** Avatar/photo URL */
  avatar: string;
  /** Full biography text (can be multiline) */
  bio: string;
  /** Short bio for cards/previews */
  shortBio: string;
  /** Location */
  location: string;
  /** Current status/availability */
  status: 'available' | 'busy' | 'not-available';
  /** Status message */
  statusMessage?: string;
  /** Email for contact */
  email?: string;
  /** Resume/CV URL */
  resumeUrl?: string;
}

/**
 * Main profile data
 */
export const profile: ProfileConfig = {
  name: 'Art Frost',
  title: 'IT-специалист & Vibe Coder',
  tagline: 'Создаю цифровые продукты с душой',
  avatar: '/assets/images/avatar.jpg',
  bio: `Привет! Я Art Frost — IT-специалист и vibe coder из России.

Занимаюсь разработкой более 5 лет. Начинал с фронтенда, сейчас работаю full-stack: от идеи до продакшена. Люблю современные технологии, чистый код и красивые интерфейсы.

Веду Telegram-канал, где делюсь мыслями о разработке, AI, и жизни в IT. Создаю open source проекты и пишу о своём опыте.

Мой подход — "vibe coding": когда процесс разработки приносит удовольствие, результат получается лучше. Верю, что технологии должны делать жизнь проще, а не сложнее.

Когда не кодирую, изучаю новые технологии, смотрю техно-контент, или исследую возможности AI в повседневной работе.`,
  shortBio:
    'IT-специалист и vibe coder. Создаю цифровые продукты с душой. Веду канал о разработке и технологиях.',
  location: 'Россия',
  status: 'available',
  statusMessage: 'Открыт для интересных проектов',
  email: 'contact@artfrost.dev',
  resumeUrl: '/resume.pdf',
};

/**
 * Highlights/achievements for quick display
 */
export const profileHighlights = [
  { label: 'Лет в IT', value: '5+' },
  { label: 'Проектов', value: '20+' },
  { label: 'Технологий', value: '15+' },
];

/**
 * Current focus areas
 */
export const currentFocus = [
  'Full-stack разработка на TypeScript',
  'Astro & Next.js проекты',
  'AI интеграции и автоматизация',
  'Open Source',
];

export default profile;

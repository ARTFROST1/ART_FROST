/**
 * Experience & Timeline Configuration
 * Career timeline, milestones, and achievements
 * Used in About page timeline section
 */

export type ExperienceType = 'work' | 'education' | 'milestone' | 'project' | 'achievement';

export interface ExperienceEntry {
  /** Unique ID */
  id: string;
  /** Year or date range (e.g., "2020", "2019-2021") */
  year: string;
  /** Title/position */
  title: string;
  /** Company/organization (optional) */
  company?: string;
  /** Description */
  description: string;
  /** Entry type */
  type: ExperienceType;
  /** Icon name */
  icon?: string;
  /** Is current/ongoing */
  isCurrent?: boolean;
  /** Related skills/technologies */
  skills?: string[];
  /** Link to more info */
  link?: string;
  /** Sort order (higher = newer) */
  order: number;
}

/**
 * Career timeline entries
 * Ordered from newest to oldest
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'current-2024',
    year: '2024 — н.в.',
    title: 'Freelance & Open Source',
    description:
      'Full-stack разработка для клиентов. Создание open source проектов. Ведение технического блога и Telegram-канала.',
    type: 'work',
    icon: 'rocket',
    isCurrent: true,
    skills: ['TypeScript', 'React', 'Astro', 'Next.js', 'Supabase'],
    order: 100,
  },
  {
    id: 'channel-2023',
    year: '2023',
    title: 'Запуск Telegram-канала',
    description:
      'Начал вести Telegram-канал о разработке, технологиях и жизни в IT. Делюсь опытом и мыслями.',
    type: 'milestone',
    icon: 'message-circle',
    link: 'https://t.me/artfrost',
    order: 90,
  },
  {
    id: 'fullstack-2022',
    year: '2022',
    title: 'Переход в Full-Stack',
    description:
      'Расширил стек до full-stack разработки. Изучил Node.js, PostgreSQL, и серверную разработку.',
    type: 'milestone',
    icon: 'layers',
    skills: ['Node.js', 'PostgreSQL', 'REST API'],
    order: 80,
  },
  {
    id: 'frontend-2021',
    year: '2021',
    title: 'Senior Frontend Developer',
    description:
      'Работа над крупными проектами, менторинг junior разработчиков, архитектурные решения.',
    type: 'work',
    icon: 'code',
    skills: ['React', 'TypeScript', 'Architecture'],
    order: 70,
  },
  {
    id: 'react-2020',
    year: '2020',
    title: 'Специализация на React',
    description:
      'Глубокое погружение в React экосистему. Изучение TypeScript, Next.js, современных паттернов.',
    type: 'milestone',
    icon: 'zap',
    skills: ['React', 'TypeScript', 'Next.js'],
    order: 60,
  },
  {
    id: 'start-2019',
    year: '2019',
    title: 'Начало карьеры в IT',
    description:
      'Первые шаги в веб-разработке. Изучение HTML, CSS, JavaScript. Первые коммерческие проекты.',
    type: 'work',
    icon: 'play',
    skills: ['HTML', 'CSS', 'JavaScript'],
    order: 50,
  },
];

/**
 * Get experience entries sorted by order (newest first)
 */
export function getExperienceTimeline(): ExperienceEntry[] {
  return [...experience].sort((a, b) => b.order - a.order);
}

/**
 * Get experience by type
 */
export function getExperienceByType(type: ExperienceType): ExperienceEntry[] {
  return experience.filter((entry) => entry.type === type);
}

/**
 * Get current experience entries
 */
export function getCurrentExperience(): ExperienceEntry[] {
  return experience.filter((entry) => entry.isCurrent);
}

/**
 * Experience type labels
 */
export const experienceTypeLabels: Record<ExperienceType, string> = {
  work: 'Работа',
  education: 'Образование',
  milestone: 'Веха',
  project: 'Проект',
  achievement: 'Достижение',
};

/**
 * Experience type colors (for badges)
 */
export const experienceTypeColors: Record<ExperienceType, string> = {
  work: 'primary',
  education: 'blue',
  milestone: 'yellow',
  project: 'green',
  achievement: 'purple',
};

export default experience;

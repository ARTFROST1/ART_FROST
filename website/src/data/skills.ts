/**
 * Skills Configuration
 * Technical skills organized by categories
 * Used in About page and project filtering
 */

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  /** Skill name */
  name: string;
  /** Icon name (optional) */
  icon?: string;
  /** Proficiency level */
  level: SkillLevel;
  /** Years of experience */
  years?: number;
  /** Is currently actively using */
  isActive?: boolean;
}

export interface SkillCategory {
  /** Category ID */
  id: string;
  /** Category display name */
  name: string;
  /** Category icon */
  icon: string;
  /** Skills in this category */
  skills: Skill[];
  /** Sort order */
  order: number;
}

/**
 * All skills organized by category
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: 'monitor',
    order: 1,
    skills: [
      { name: 'TypeScript', level: 'expert', years: 4, isActive: true },
      { name: 'React', level: 'expert', years: 4, isActive: true },
      { name: 'Next.js', level: 'advanced', years: 3, isActive: true },
      { name: 'Astro', level: 'advanced', years: 2, isActive: true },
      { name: 'Tailwind CSS', level: 'expert', years: 3, isActive: true },
      { name: 'HTML/CSS', level: 'expert', years: 5, isActive: true },
      { name: 'JavaScript', level: 'expert', years: 5, isActive: true },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: 'server',
    order: 2,
    skills: [
      { name: 'Node.js', level: 'advanced', years: 4, isActive: true },
      { name: 'Python', level: 'intermediate', years: 2, isActive: true },
      { name: 'PostgreSQL', level: 'advanced', years: 3, isActive: true },
      { name: 'Supabase', level: 'advanced', years: 2, isActive: true },
      { name: 'REST API', level: 'expert', years: 4, isActive: true },
      { name: 'GraphQL', level: 'intermediate', years: 2 },
    ],
  },
  {
    id: 'tools',
    name: 'Инструменты',
    icon: 'wrench',
    order: 3,
    skills: [
      { name: 'Git', level: 'expert', years: 5, isActive: true },
      { name: 'VS Code', level: 'expert', years: 5, isActive: true },
      { name: 'Figma', level: 'intermediate', years: 3, isActive: true },
      { name: 'Docker', level: 'intermediate', years: 2 },
      { name: 'Vercel', level: 'advanced', years: 3, isActive: true },
      { name: 'GitHub Actions', level: 'intermediate', years: 2 },
    ],
  },
  {
    id: 'ai',
    name: 'AI & Automation',
    icon: 'bot',
    order: 4,
    skills: [
      { name: 'ChatGPT/Claude', level: 'advanced', years: 2, isActive: true },
      { name: 'GitHub Copilot', level: 'advanced', years: 2, isActive: true },
      { name: 'n8n', level: 'intermediate', years: 1, isActive: true },
      { name: 'Prompt Engineering', level: 'advanced', years: 2, isActive: true },
    ],
  },
  {
    id: 'other',
    name: 'Другое',
    icon: 'sparkles',
    order: 5,
    skills: [
      { name: 'SEO', level: 'advanced', years: 3, isActive: true },
      { name: 'Technical Writing', level: 'intermediate', years: 2 },
      { name: 'UI/UX Design', level: 'intermediate', years: 3 },
      { name: 'Agile/Scrum', level: 'intermediate', years: 3 },
    ],
  },
];

/**
 * Get all skills as flat array
 */
export function getAllSkills(): Skill[] {
  return skillCategories.flatMap((category) => category.skills);
}

/**
 * Get skills by category ID
 */
export function getSkillsByCategory(categoryId: string): Skill[] {
  const category = skillCategories.find((c) => c.id === categoryId);
  return category?.skills ?? [];
}

/**
 * Get active skills only
 */
export function getActiveSkills(): Skill[] {
  return getAllSkills().filter((skill) => skill.isActive);
}

/**
 * Get skill names for tags
 */
export function getSkillTags(): string[] {
  return getActiveSkills().map((skill) => skill.name);
}

/**
 * Get top skills (expert level)
 */
export function getTopSkills(limit: number = 6): Skill[] {
  return getAllSkills()
    .filter((skill) => skill.level === 'expert')
    .slice(0, limit);
}

/**
 * Skill level display values
 */
export const skillLevelLabels: Record<SkillLevel, string> = {
  beginner: 'Начинающий',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
  expert: 'Эксперт',
};

/**
 * Skill level percentages (for progress bars)
 */
export const skillLevelPercentage: Record<SkillLevel, number> = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 95,
};

export default skillCategories;

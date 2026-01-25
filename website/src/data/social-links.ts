/**
 * Social Links Configuration
 * Detailed social media links with icons, URLs, and descriptions
 * Used in Footer, Links page, and various components
 */

export interface SocialLinkConfig {
  /** Unique identifier */
  id: string;
  /** Platform display name */
  name: string;
  /** Platform label (for aria-label) */
  label: string;
  /** Full URL to profile */
  url: string;
  /** Icon name (from astro-icon or custom) */
  icon: string;
  /** Username on platform */
  username: string;
  /** Short description */
  description: string;
  /** Followers count (optional, for display) */
  followers?: string;
  /** Platform brand color */
  color: string;
  /** Is primary/featured link */
  isPrimary?: boolean;
  /** Sort order */
  order: number;
}

/**
 * All social media links
 * Ordered by importance
 */
export const socialLinks: SocialLinkConfig[] = [
  {
    id: 'telegram',
    name: 'Telegram',
    label: 'Telegram канал Art Frost',
    url: 'https://t.me/artfrost',
    icon: 'telegram',
    username: '@artfrost',
    description: 'Канал о разработке, IT и технологиях. Посты, мысли, инсайты.',
    color: '#26A5E4',
    isPrimary: true,
    order: 1,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    label: 'YouTube канал Art Frost',
    url: 'https://youtube.com/@artfrost',
    icon: 'youtube',
    username: '@artfrost',
    description: 'Видеоконтент, туториалы, обзоры технологий.',
    color: '#FF0000',
    isPrimary: true,
    order: 2,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    label: 'Instagram Art Frost',
    url: 'https://instagram.com/artfrost',
    icon: 'instagram',
    username: '@artfrost',
    description: 'Личное, закулисье, моменты жизни.',
    color: '#E4405F',
    isPrimary: true,
    order: 3,
  },
  {
    id: 'github',
    name: 'GitHub',
    label: 'GitHub профиль Art Frost',
    url: 'https://github.com/artfrost',
    icon: 'github',
    username: 'artfrost',
    description: 'Open source проекты, исходный код.',
    color: '#181717',
    isPrimary: true,
    order: 4,
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    label: 'X (Twitter) Art Frost',
    url: 'https://x.com/artfrost',
    icon: 'twitter',
    username: '@artfrost',
    description: 'Короткие мысли, новости, общение.',
    color: '#000000',
    isPrimary: true,
    order: 5,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    label: 'LinkedIn профиль Art Frost',
    url: 'https://linkedin.com/in/artfrost',
    icon: 'linkedin',
    username: 'artfrost',
    description: 'Профессиональная сеть, карьера.',
    color: '#0A66C2',
    order: 6,
  },
  {
    id: 'reddit',
    name: 'Reddit',
    label: 'Reddit профиль Art Frost',
    url: 'https://reddit.com/u/artfrost',
    icon: 'reddit',
    username: 'u/artfrost',
    description: 'Обсуждения, комьюнити, AMA.',
    color: '#FF4500',
    isPrimary: true,
    order: 7,
  },
];

/**
 * Get primary (featured) social links
 */
export function getPrimarySocialLinks(): SocialLinkConfig[] {
  return socialLinks
    .filter((link) => link.isPrimary)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get all social links sorted by order
 */
export function getAllSocialLinks(): SocialLinkConfig[] {
  return [...socialLinks].sort((a, b) => a.order - b.order);
}

/**
 * Get social link by ID
 */
export function getSocialLinkById(id: string): SocialLinkConfig | undefined {
  return socialLinks.find((link) => link.id === id);
}

/**
 * Social links for footer (compact version)
 */
export const footerSocialLinks = [
  { label: 'Telegram', href: 'https://t.me/artfrost', icon: 'telegram' },
  { label: 'YouTube', href: 'https://youtube.com/@artfrost', icon: 'youtube' },
  { label: 'Instagram', href: 'https://instagram.com/artfrost', icon: 'instagram' },
  { label: 'GitHub', href: 'https://github.com/artfrost', icon: 'github' },
];

export default socialLinks;

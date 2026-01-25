/**
 * Site Configuration
 * Central configuration file for the Art Frost portfolio website
 *
 * Contains:
 * - Basic site metadata
 * - Author information
 * - Social links
 * - SEO defaults
 * - Theme settings
 */

export interface SocialLink {
  /** Platform name */
  name: string;
  /** Display label */
  label: string;
  /** URL to the social profile */
  url: string;
  /** Icon name (from astro-icon/lucide) */
  icon: string;
  /** Short description */
  description?: string;
}

export interface Author {
  /** Full name */
  name: string;
  /** Email address */
  email?: string;
  /** Telegram username (without @) */
  telegram: string;
  /** Short title/role */
  title: string;
  /** Location */
  location?: string;
}

export interface SiteConfig {
  /** Site name (brand) */
  name: string;
  /** Default page title suffix */
  title: string;
  /** Default meta description */
  description: string;
  /** Canonical site URL */
  url: string;
  /** Author information */
  author: Author;
  /** Social media links */
  social: SocialLink[];
  /** Locale for i18n */
  locale: string;
  /** Theme color for mobile browsers */
  themeColor: string;
  /** Default OG image path */
  defaultOgImage: string;
  /** Twitter handle (with @) */
  twitterHandle: string;
}

/**
 * Main site configuration
 */
export const siteConfig: SiteConfig = {
  name: 'Art Frost',
  title: 'Art Frost — IT-специалист & Vibe Coder',
  description:
    'Персональный сайт Art Frost — IT-специалист, vibe coder. Портфолио проектов, блог о технологиях и разработке.',
  url: 'https://artfrost.vercel.app',
  author: {
    name: 'Art Frost',
    email: 'contact@artfrost.dev',
    telegram: 'artfrost',
    title: 'IT-специалист & Vibe Coder',
    location: 'Россия',
  },
  social: [
    {
      name: 'telegram',
      label: 'Telegram',
      url: 'https://t.me/artfrost',
      icon: 'telegram',
      description: 'Канал с постами о разработке и технологиях',
    },
    {
      name: 'youtube',
      label: 'YouTube',
      url: 'https://youtube.com/@artfrost',
      icon: 'youtube',
      description: 'Видеоконтент и туториалы',
    },
    {
      name: 'instagram',
      label: 'Instagram',
      url: 'https://instagram.com/artfrost',
      icon: 'instagram',
      description: 'Закулисье и личное',
    },
    {
      name: 'github',
      label: 'GitHub',
      url: 'https://github.com/artfrost',
      icon: 'github',
      description: 'Open source проекты и код',
    },
  ],
  locale: 'ru_RU',
  themeColor: '#34b863', // Primary color from design system
  defaultOgImage: '/og-image.png',
  twitterHandle: '@artfrost',
};

/**
 * Get social link by platform name
 */
export function getSocialLink(name: string): SocialLink | undefined {
  return siteConfig.social.find((s) => s.name === name);
}

/**
 * Get all social links
 */
export function getAllSocialLinks(): SocialLink[] {
  return siteConfig.social;
}

export default siteConfig;

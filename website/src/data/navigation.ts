/**
 * Navigation Configuration
 * Defines navigation items for header, footer, and mobile menu
 */

export interface NavItem {
  /** Display label */
  label: string;
  /** URL path */
  href: string;
  /** Icon name (optional, from astro-icon/lucide) */
  icon?: string;
  /** Show only on mobile */
  mobileOnly?: boolean;
  /** Show only on desktop */
  desktopOnly?: boolean;
  /** Is external link */
  external?: boolean;
  /** Badge text (e.g., "New") */
  badge?: string;
}

/**
 * Main navigation items (header, mobile menu)
 */
export const mainNavigation: NavItem[] = [
  {
    label: 'Главная',
    href: '/',
    icon: 'home',
  },
  {
    label: 'Проекты',
    href: '/projects',
    icon: 'folder',
  },
  {
    label: 'Обо мне',
    href: '/about',
    icon: 'user',
  },
  {
    label: 'Ссылки',
    href: '/links',
    icon: 'link',
  },
];

/**
 * Footer navigation items (optional subset)
 */
export const footerNavigation: NavItem[] = [
  {
    label: 'Главная',
    href: '/',
  },
  {
    label: 'Проекты',
    href: '/projects',
  },
  {
    label: 'Обо мне',
    href: '/about',
  },
  {
    label: 'Ссылки',
    href: '/links',
  },
];

/**
 * Blog navigation (Post-MVP)
 */
export const blogNavigation: NavItem[] = [
  {
    label: 'Все посты',
    href: '/blog',
    icon: 'newspaper',
  },
  {
    label: 'Категории',
    href: '/blog/categories',
    icon: 'tags',
  },
];

/**
 * Call-to-action navigation item
 * Used in header as primary CTA
 */
export const ctaNavItem: NavItem = {
  label: 'Telegram',
  href: 'https://t.me/artfrost',
  icon: 'telegram',
  external: true,
};

/**
 * Get navigation items with active state
 */
export function getNavWithActive(
  items: NavItem[],
  currentPath: string
): (NavItem & { isActive: boolean })[] {
  return items.map((item) => ({
    ...item,
    isActive: isActivePath(item.href, currentPath),
  }));
}

/**
 * Check if a path is active
 */
export function isActivePath(href: string, currentPath: string): boolean {
  if (href === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(href);
}

export default mainNavigation;

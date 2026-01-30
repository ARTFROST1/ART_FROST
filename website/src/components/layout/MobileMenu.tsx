import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@lib/utils';

/**
 * Navigation items for mobile menu
 */
const navItems = [
  { label: 'Главная', href: '/' },
  { label: 'Проекты', href: '/projects' },
  { label: 'Обо мне', href: '/about' },
  { label: 'Ссылки', href: '/links' },
];

/**
 * Social links for mobile menu
 */
const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/artfrost', icon: 'telegram' },
  { label: 'YouTube', href: 'https://youtube.com/@artfrost', icon: 'youtube' },
  { label: 'Instagram', href: 'https://instagram.com/artfrost', icon: 'instagram' },
  { label: 'GitHub', href: 'https://github.com/artfrost', icon: 'github' },
];

interface MobileMenuProps {
  currentPath: string;
}

/**
 * MobileMenu Component
 * Full-screen mobile navigation overlay
 * Uses client:media="(max-width: 768px)" directive in Astro
 *
 * @example
 * <MobileMenu currentPath={Astro.url.pathname} client:media="(max-width: 768px)" />
 */
export function MobileMenu({ currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for toggle event from Header
  useEffect(() => {
    const handleToggle = (event: Event) => {
      const { detail } = event as CustomEvent<{ isOpen: boolean }>;
      setIsOpen(detail.isOpen);
    };

    window.addEventListener(
      'toggle-mobile-menu',
      handleToggle as EventListener
    );

    return () => {
      window.removeEventListener(
        'toggle-mobile-menu',
        handleToggle as EventListener
      );
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const closeMenu = () => {
    setIsOpen(false);
    // Sync with header button state
    const button = document.getElementById('mobile-menu-button');
    if (button) {
      button.setAttribute('aria-expanded', 'false');
      button.querySelector('.menu-icon')?.classList.remove('hidden');
      button.querySelector('.close-icon')?.classList.add('hidden');
    }
  };

  // Check if link is active
  const isActive = (href: string): boolean => {
    if (href === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(href);
  };

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className={cn(
        'fixed inset-0 z-40',
        'bg-[var(--color-bg-primary)]/98 backdrop-blur-2xl',
        'flex flex-col',
        'transition-all duration-300 ease-out',
        'animate-in fade-in slide-in-from-top-4'
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Мобильное меню"
    >
      {/* Menu Content */}
      <div className="flex-1 flex flex-col justify-center px-8 pt-16">
        {/* Navigation Links */}
        <nav className="space-y-3" aria-label="Мобильная навигация">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={cn(
                'block py-5 px-6 text-2xl font-semibold rounded-2xl',
                'transition-all duration-300',
                'border backdrop-blur-xl',
                isActive(item.href)
                  ? [
                      'text-[var(--color-primary)]',
                      'bg-[var(--color-bg-glass)]',
                      'border-[var(--color-border-glass)]',
                      'shadow-[0_0_40px_-10px_var(--color-primary-glow)]',
                      '[html[data-theme="light"]_&]:bg-black/5',
                    ]
                  : [
                      'text-[var(--color-text-heading)]',
                      'bg-transparent',
                      'border-transparent',
                      'hover:bg-[var(--color-bg-glass)]',
                      'hover:border-[var(--color-border-glass)]',
                      'hover:text-[var(--color-primary)]',
                      'hover:shadow-[0_0_30px_-15px_var(--color-primary-glow)]',
                      '[html[data-theme="light"]_&]:hover:bg-black/5',
                    ]
              )}
              style={{ animationDelay: `${index * 50}ms` }}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="mt-10" style={{ animationDelay: '200ms' }}>
          <a
            href="https://t.me/artfrost"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'block w-full py-5 px-6 text-center text-lg font-semibold',
              'rounded-2xl text-white',
              'bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)]',
              'shadow-[0_0_50px_-10px_var(--color-primary-glow),0_8px_24px_-8px_rgba(0,0,0,0.3)]',
              'border border-[var(--color-primary)]/20',
              'transition-all duration-300',
              'hover:scale-[1.03] hover:shadow-[0_0_60px_-5px_var(--color-primary-glow),0_12px_32px_-8px_rgba(0,0,0,0.4)]',
              'active:scale-[0.97]'
            )}
            onClick={closeMenu}
          >
            Подписаться на Telegram
          </a>
        </div>
      </div>

      {/* Footer with Social Links */}
      <div className="px-8 pb-10" style={{ animationDelay: '250ms' }}>
        <div className="flex justify-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center justify-center',
                'w-14 h-14 rounded-2xl',
                'bg-[var(--color-bg-glass)] backdrop-blur-xl',
                'border border-[var(--color-border-glass)]',
                'text-[var(--color-text-muted)]',
                'transition-all duration-300',
                'hover:bg-[var(--color-bg-glass-strong)] hover:text-[var(--color-primary)]',
                'hover:border-[var(--color-primary)]/50',
                'hover:shadow-[0_0_30px_-12px_var(--color-primary-glow)]',
                'hover:scale-110',
                '[html[data-theme="light"]_&]:bg-black/5',
                '[html[data-theme="light"]_&]:hover:bg-black/10'
              )}
              aria-label={link.label}
            >
              <SocialIcon name={link.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Simple social icon component (inline SVGs)
 */
function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, ReactNode> = {
    telegram: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
    ),
    youtube: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    ),
    instagram: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    github: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  };

  return icons[name] || null;
}

export default MobileMenu;

import { useEffect, useState } from 'react';
import { THEME_KEY, THEMES, DEFAULT_THEME, type Theme } from './constants';

/**
 * Custom hook for theme management
 * Handles theme state, localStorage, and system preference
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    const getInitialTheme = (): Theme => {
      // 1. Check localStorage
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === THEMES.LIGHT || stored === THEMES.DARK) {
        return stored;
      }

      // 2. Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return THEMES.DARK;
      }

      // 3. Default to dark
      return DEFAULT_THEME;
    };

    setTheme(getInitialTheme());
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);

    // Apply to DOM
    if (newTheme === THEMES.LIGHT) {
      document.documentElement.setAttribute('data-theme', THEMES.LIGHT);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  // Set specific theme
  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);

    // Apply to DOM
    if (newTheme === THEMES.LIGHT) {
      document.documentElement.setAttribute('data-theme', THEMES.LIGHT);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  return {
    theme,
    toggleTheme,
    setTheme: setThemeValue,
    mounted,
    isDark: theme === THEMES.DARK,
    isLight: theme === THEMES.LIGHT,
  };
}

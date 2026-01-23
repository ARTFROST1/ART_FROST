/**
 * Inline theme initialization script to prevent FOUC (Flash of Unstyled Content)
 * This script MUST be placed in <head> before any CSS loads
 * It immediately reads theme from localStorage/system preference and applies it
 */

export const themeScript = `
(function() {
  const THEME_KEY = 'artfrost-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  function getThemePreference() {
    // 1. Check localStorage first
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === DARK || stored === LIGHT) {
      return stored;
    }

    // 2. Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK;
    }

    // 3. Default to dark theme
    return DARK;
  }

  function applyTheme(theme) {
    if (theme === LIGHT) {
      document.documentElement.setAttribute('data-theme', LIGHT);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  // Apply theme immediately
  const theme = getThemePreference();
  applyTheme(theme);

  // Listen for storage events (theme changes in other tabs)
  window.addEventListener('storage', function(e) {
    if (e.key === THEME_KEY) {
      applyTheme(e.newValue || DARK);
    }
  });
})();
`.trim();

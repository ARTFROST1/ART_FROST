/**
 * Theme constants for the application
 */

export const THEME_KEY = 'artfrost-theme';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const DEFAULT_THEME: Theme = THEMES.DARK;

export const THEME_STORAGE_KEY = 'portfolio-theme';

const THEMES = new Set(['dark', 'light']);

export function getPreferredTheme() {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (THEMES.has(storedTheme)) {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function applyTheme(theme) {
  if (typeof document === 'undefined' || !THEMES.has(theme)) {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

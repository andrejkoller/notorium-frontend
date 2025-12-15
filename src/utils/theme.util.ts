import { type Theme, THEME, isValidTheme } from "../types/theme.types";

export const STORAGE_KEY = "theme";
export const DATA_ATTRIBUTE = "data-theme";

export const getInitialTheme = (): Theme => {
  const storedTheme = getStoredTheme();
  if (storedTheme) return storedTheme;

  return getSystemThemePreference();
};

export const getSystemThemePreference = (): Theme => {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia === "undefined"
  ) {
    return THEME.DARK;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? THEME.DARK : THEME.LIGHT;
};

export const getStoredTheme = (): Theme | null => {
  if (typeof localStorage === "undefined") return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored && isValidTheme(stored) ? stored : null;
};

export const applyTheme = (theme: Theme): void => {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute(DATA_ATTRIBUTE, theme);
};

export const persistTheme = (theme: Theme): void => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, theme);
};

export const isDarkTheme = (theme: Theme): boolean => theme === THEME.DARK;

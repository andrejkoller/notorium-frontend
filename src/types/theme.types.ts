export const THEME = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type Theme = (typeof THEME)[keyof typeof THEME];

export const THEME_LABELS: Record<Theme, string> = {
  [THEME.LIGHT]: "Light",
  [THEME.DARK]: "Dark",
};

export const isValidTheme = (theme: string): theme is Theme => {
  return Object.values(THEME).includes(theme as Theme);
};

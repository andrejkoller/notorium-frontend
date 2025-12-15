import * as React from "react";
import { ThemeContext } from "../contexts/theme-context";
import { type Theme, THEME } from "../types/theme.types";
import { applyTheme, persistTheme, getInitialTheme } from "../utils/theme.util";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

const themeOrder: Theme[] = [THEME.LIGHT, THEME.DARK];

export function ThemeProvider({
  children,
  defaultTheme = THEME.DARK,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [isThemeInitialized, setIsThemeInitialized] = React.useState(false);

  React.useEffect(() => {
    const currentTheme = getInitialTheme();
    setThemeState(currentTheme);
    applyTheme(currentTheme);
    setIsThemeInitialized(true);
  }, []);

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    persistTheme(newTheme);
  }, []);

  const toggleTheme = React.useCallback(() => {
    if (!isThemeInitialized) return;

    const currentIndex = themeOrder.indexOf(theme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    setTheme(nextTheme);
  }, [theme, setTheme, isThemeInitialized]);

  const contextValue = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

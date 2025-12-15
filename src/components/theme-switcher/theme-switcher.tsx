import { Switch } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";

const ThemeSwitcher = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { setTheme } = useTheme();

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setIsChecked(checked);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme as "light" | "dark");
      setIsChecked(storedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      setIsChecked(prefersDark);
    }
  }, [setTheme]);

  return (
    <Switch.Root
      className="theme-switcher"
      checked={isChecked}
      onCheckedChange={() => handleThemeChange(!isChecked)}
      size="lg"
      colorScheme="primary"
    >
      <Switch.HiddenInput />
      <Switch.Control />
      <Switch.Label />
    </Switch.Root>
  );
};

export { ThemeSwitcher };

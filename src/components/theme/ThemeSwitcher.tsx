import { Button, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useColorMode } from "../ui/color-mode";
import { Moon, Sun } from "lucide-react";
import { Tooltip } from "../ui/tooltip";

export const ThemeSwitcher = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { setColorMode } = useColorMode();

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setIsChecked(checked);
    setColorMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setColorMode(storedTheme as "light" | "dark");
      setIsChecked(storedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setColorMode(initialTheme);
      setIsChecked(prefersDark);
    }
  }, [setColorMode]);

  return (
    <Tooltip content="Switch theme" aria-label="Switch theme tooltip">
      <Button
        className="theme-switcher-button"
        variant={"solid"}
        onClick={() => handleThemeChange(!isChecked)}
      >
        <Icon as={isChecked ? Moon : Sun} />
      </Button>
    </Tooltip>
  );
};

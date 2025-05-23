import { Icon, Switch } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useColorMode } from "../ui/color-mode";
import { Moon, Sun } from "lucide-react";

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
    <Switch.Root
      size="lg"
      checked={isChecked}
      onChange={(e) =>
        handleThemeChange((e.target as HTMLInputElement).checked)
      }
    >
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
        <Switch.Indicator fallback={<Icon as={Moon} color="gray.400" />}>
          <Icon as={Sun} color="yellow.400" />
        </Switch.Indicator>
      </Switch.Control>
      <Switch.Label />
    </Switch.Root>
  );
};

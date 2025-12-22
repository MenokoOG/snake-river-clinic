import { useEffect } from "react";
import { useLocalStorage, useToggle } from "../hooks";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [storedTheme, setStoredTheme] = useLocalStorage<Theme>(
    "srams_theme",
    "dark"
  );
  const [isLight, toggle] = useToggle(storedTheme === "light");

  useEffect(() => {
    const theme: Theme = isLight ? "light" : "dark";
    setStoredTheme(theme);

    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [isLight, setStoredTheme]);

  return (
    <button
      type="button"
      className="btn-ghost text-sm px-3 py-2"
      onClick={toggle}
      aria-label="Toggle light/dark theme"
    >
      {isLight ? "Light" : "Dark"}
    </button>
  );
}

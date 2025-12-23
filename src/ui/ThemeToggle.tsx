import { useEffect } from "react";
import { useLocalStorage } from "../hooks";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<Theme>("srams_theme", "dark");

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button
      type="button"
      className="btn-ghost text-sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle light/dark theme"
      aria-pressed={theme === "light"}
    >
      {theme === "light" ? "Light" : "Dark"}
    </button>
  );
}

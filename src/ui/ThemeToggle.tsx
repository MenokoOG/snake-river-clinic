import { useEffect } from "react";
import { useLocalStorage } from "../hooks/index";

type Theme = "dark" | "light";

function setThemeColorMeta(theme: Theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;

  // Match your CSS palette
  const color = theme === "light" ? "#F7F8FB" : "#0B0E13";
  meta.setAttribute("content", color);
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  setThemeColorMeta(theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<Theme>("srams_theme", "dark");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="btn-ghost text-sm px-3 py-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle light/dark theme"
    >
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}

import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      // Check if user already has a theme saved
      const saved = localStorage.getItem("theme");
      return saved ? saved : "dark"; // first-time: dark, else use saved
    }
    return "dark"; // server-side fallback
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return [theme, setTheme];
}

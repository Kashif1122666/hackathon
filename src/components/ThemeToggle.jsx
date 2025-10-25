import React from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border hover:bg-muted transition-colors"
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Dark</span>
        </>
      )}
    </button>
  );
}

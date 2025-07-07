"use client";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useThemeStore } from "./useThemeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  console.log(theme);
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      title={theme === "light" ? "Mode clair" : "Mode sombre"}
    >
      {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

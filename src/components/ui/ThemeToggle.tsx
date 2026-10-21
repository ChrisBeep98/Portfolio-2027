"use client";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  // Evitar desajustes durante la hidratación inicial
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 transition-all duration-300 ease-out cursor-pointer hover:scale-110 active:scale-95 group"
      aria-label="Toggle Theme"
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className={`absolute transition-all duration-500 transform ${isDark ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"}`}>
          <Sun size={20} strokeWidth={2.5} className="text-white group-hover:text-primary transition-colors" />
        </div>
        <div className={`absolute transition-all duration-500 transform ${isDark ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
          <Moon size={20} strokeWidth={2.5} className="text-white group-hover:text-primary transition-colors" />
        </div>
      </div>
    </button>
  );
}
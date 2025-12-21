import React from 'react';
import useTheme from '../contexts/theme.js';
import { Sun, Moon } from "lucide-react";

export default function ThemeBtn() {
  const { themeMode, darkTheme, lightTheme } = useTheme();

  const toggleTheme = () => {
    if (themeMode === "dark") {
      lightTheme();
    } else {
      darkTheme();
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 bg-[#44444E]/50 hover:bg-[#715A5A]/30 border border-[#D3DAD9]/20"
    >
      {themeMode === "dark" ? (
        <Sun className="text-[#D3DAD9]" size={20} />
      ) : (
        <Moon className="text-[#37353E]" size={20} />
      )}
    </button>
  );
}
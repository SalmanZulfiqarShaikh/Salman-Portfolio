import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/theme";

function Nav() {
  const links = ["Home", "Projects", "About", "Skills"];
  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { themeMode, lightMode, darkMode } = useTheme();

  const toggleTheme = () => {
    if (themeMode === "light") {
      darkMode();
    } else {
      lightMode();
    }
  };

  // Dynamic colors based on theme
  const textColor = themeMode === "dark" ? "text-white" : "text-[#0d0d0d]";
  const hoverColor = "hover:text-[#bfa980]";
  const underlineColor = themeMode === "dark" ? "bg-white" : "bg-[#0d0d0d]";
  const mobileBg = themeMode === "dark" ? "bg-[#1a1a1a]/95" : "bg-white/90";

  return (
    <header className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-full px-8 py-6">
      <nav className="max-w-[90%] md:max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className={`text-lg sm:text-xl font-semibold tracking-wider ${textColor} transition-colors duration-300`}
        >
          Salman._
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 lg:gap-8 items-center">
          {links.map((link, i) => (
            <li
              key={i}
              onMouseEnter={() => setHovered(link)}
              onMouseLeave={() => setHovered(null)}
              className="relative"
            >
              <a
                href={`#${link.toLowerCase()}`}
                className={`text-sm uppercase tracking-widest ${textColor} transition-all duration-300 ${
                  hovered && hovered !== link ? "opacity-40" : "opacity-100"
                }`}
              >
                {link}
              </a>
              {/* Underline Animation */}
              <span
                className={`absolute left-0 bottom-[-4px] h-[1.5px] ${underlineColor} transition-all duration-300 ${
                  hovered === link ? "w-full opacity-100" : "w-0 opacity-0"
                }`}
              ></span>
            </li>
          ))}

          {/* Resume */}
          <li
            onMouseEnter={() => setHovered("Resume")}
            onMouseLeave={() => setHovered(null)}
            className="relative"
          >
            <a
              href="/Resume.pdf"
              download
              target="_blank"
              className={`text-sm uppercase tracking-widest ${textColor} transition-all duration-300 ${
                hovered && hovered !== "Resume" ? "opacity-40" : "opacity-100"
              }`}
            >
              Resume
            </a>
            <span
              className={`absolute left-0 bottom-[-4px] h-[1.5px] ${underlineColor} transition-all duration-300 ${
                hovered === "Resume" ? "w-full opacity-100" : "w-0 opacity-0"
              }`}
            ></span>
          </li>

          {/* Theme Toggle Button */}
          <li>
            <button
              onClick={toggleTheme}
              className={`p-2 ${textColor} ${hoverColor} transition-all duration-300 hover:scale-110`}
              aria-label="Toggle theme"
            >
              {themeMode === "dark" ? <Sun size={26} /> : <Moon size={26} />}
            </button>
          </li>
        </ul>

        {/* Hamburger (Mobile) */}
        <button
          className={`md:hidden p-2 ${textColor}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`md:hidden ${mobileBg} backdrop-blur-md absolute top-full left-0 w-full py-8 flex flex-col items-center gap-6 rounded-3xl mt-4 shadow-md`}
          >
            {[...links, "Resume"].map((link, i) => (
              <motion.a
                key={i}
                href={
                  link === "Resume" ? "/resume.jpg" : `#${link.toLowerCase()}`
                }
                download={link === "Resume"}
                target={link === "Resume" ? "_blank" : ""}
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.05 }}
                className={`uppercase text-lg tracking-widest ${textColor} ${hoverColor} transition`}
              >
                {link}
              </motion.a>
            ))}

            {/* Theme Toggle in Mobile Menu */}
            <button
              onClick={toggleTheme}
              className={`p-2 ${textColor} ${hoverColor} transition-all duration-300`}
            >
              {themeMode === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Nav;
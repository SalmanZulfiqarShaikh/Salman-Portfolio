import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function Nav() {
  const links = ["Home", "About", "Projects", "Skills"];
  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-full px-8 py-6">
      <nav className="max-w-[90%] md:max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-lg sm:text-xl font-semibold tracking-wider text-[#0d0d0d] transition-colors duration-300"
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
                className={`text-sm uppercase tracking-widest text-[#0d0d0d] transition-all duration-300 ${
                  hovered && hovered !== link ? "opacity-40" : "opacity-100"
                }`}
              >
                {link}
              </a>
              {/* Underline Animation */}
              <span
                className={`absolute left-0 bottom-[-4px] h-[1.5px] bg-[#0d0d0d] transition-all duration-300 ${
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
              href="/resume.pdf"
              download
              target="_blank"
              className={`text-sm uppercase tracking-widest text-[#0d0d0d] transition-all duration-300 ${
                hovered && hovered !== "Resume" ? "opacity-40" : "opacity-100"
              }`}
            >
              Resume
            </a>
            <span
              className={`absolute left-0 bottom-[-4px] h-[1.5px] bg-[#0d0d0d] transition-all duration-300 ${
                hovered === "Resume" ? "w-full opacity-100" : "w-0 opacity-0"
              }`}
            ></span>
          </li>
        </ul>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden p-2 text-[#0d0d0d]"
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
            className="md:hidden bg-white/90 backdrop-blur-md absolute top-full left-0 w-full py-8 flex flex-col items-center gap-6 rounded-3xl mt-4 shadow-md"
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
                className="uppercase text-lg tracking-widest text-[#0d0d0d] hover:text-[#bfa980] transition"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Nav;

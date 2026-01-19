import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../contexts/theme";
import reactLogo from "../assets/logos/react.png";
import tailwindLogo from "../assets/logos/tailwind.png";
import reduxLogo from "../assets/logos/redux.png";
import jsLogo from "../assets/logos/Javascript.png";
import bootstrapLogo from "../assets/logos/bootstrap.png";
import framerLogo from "../assets/logos/framer-motion.svg";
import gitLogo from "../assets/logos/git.png";
import wordPress from "../assets/logos/wordpress.png";
import n8n from "../assets/logos/n8n.png";
import python from "../assets/logos/python.webp";
import java from "../assets/logos/java.png";
import supabase from "../assets/logos/supabase.webp";

function Stack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const { themeMode } = useTheme();

  // Dynamic colors
  const headingColor = themeMode === "dark" ? "text-white/90" : "text-[#0d0d0d]/90";
  const cardBg = themeMode === "dark" ? "bg-white/10" : "bg-[#0d0d0d]/5";
  const bgColor = themeMode === "dark" ? "bg-[#0d0d0d]" : "bg-[#f5f2ea]";

  const skills = [
    { name: "Python", logo: python },
    { name: "JavaScript", logo: jsLogo },
    { name: "n8n", logo: n8n },
    { name: "React", logo: reactLogo },
    { name: "Tailwind", logo: tailwindLogo },
    { name: "Supabase", logo: supabase },
    { name: "Git", logo: gitLogo },
    { name: "Framer Motion", logo: framerLogo },
  ];

  return (
    <section
      ref={ref}
      id="skills"
      className={`min-h-screen flex flex-col items-center justify-center px-6 ${bgColor} transition-colors duration-500`}
    >
      {/* Section Title */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`text-4xl md:text-6xl font-serif font-semibold ${headingColor} mb-16 transition-colors duration-500`}
      >
        Tech Stack
      </motion.h1>

      {/* Stack Icons */}
      <div className="flex flex-wrap justify-center gap-10 md:gap-14 max-w-5xl">
  {skills.map((skill, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className="flex flex-col items-center gap-3 group"
    >
      <div className={`h-16 w-16 md:h-18 md:w-18 flex items-center justify-center ${cardBg} rounded-2xl shadow-md transition-all duration-500`}>
        <img
          src={skill.logo}
          alt={skill.name}
          className={`h-12 md:h-16 object-contain filter ${
            themeMode === "dark" ? "grayscale-0" : "md:grayscale"
          } group-hover:grayscale-0 transition-all duration-700`}
        />
      </div>
      <p className="text-[#bfa980] text-sm md:text-base tracking-widest font-light font-sans uppercase">
        {skill.name}
      </p>
    </motion.div>
  ))}
</div>
    </section>
  );
}

export default Stack;
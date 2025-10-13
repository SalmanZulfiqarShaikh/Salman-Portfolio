import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import reactLogo from "../assets/logos/react.png";
import tailwindLogo from "../assets/logos/tailwind.png";
import reduxLogo from "../assets/logos/redux.png";
import jsLogo from "../assets/logos/javascript.png";
import bootstrapLogo from "../assets/logos/bootstrap.png";
import framerLogo from "../assets/logos/framer-motion.svg";
import gitLogo from "../assets/logos/git.png";

function Stack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  const skills = [
    { name: "React", logo: reactLogo },
    { name: "Tailwind", logo: tailwindLogo },
    { name: "Redux", logo: reduxLogo },
    { name: "JavaScript", logo: jsLogo },
    { name: "Bootstrap", logo: bootstrapLogo },
    { name: "Framer Motion", logo: framerLogo },
    { name: "Git", logo: gitLogo },
  ];

  return (
    <section
      ref={ref}
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center px-6 ]"
    >
      {/* Section Title */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-serif font-semibold text-[#0d0d0d]/90 mb-16"
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
            <div className="h-16 w-16 md:h-18 md:w-18 flex items-center justify-center bg-[#0d0d0d]/5 rounded-2xl shadow-md transition-all duration-200">
              <img
                src={skill.logo}
                alt={skill.name}
                className="h-12 md:h-16 object-contain filter md:grayscale group-hover:grayscale-0 transition-all duration-700"
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

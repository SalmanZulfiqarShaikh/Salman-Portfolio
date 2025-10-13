import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Salman from "../assets/images/salman.webp"

function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section
      id="about"
      ref={ref}
      className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16 py-24 "
    >
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-center md:justify-start w-full md:w-1/2"
      >
        <img
          src={Salman}
          alt="Profile"
          className="
            w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 
            object-cover rounded-2xl shadow-lg border border-[#bfa980]/30
            transition-all duration-300 ease-in-out
            
          "
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#0d0d0d]/90 mb-6">
          About Me
        </h2>
        <p className="text-[#0d0d0d]/80 leading-relaxed text-lg md:text-xl font-light font-sans">
          I’m <span className="text-[#bfa980] font-medium">Salman Zulfiqar Shaikh</span>, 
          a passionate software engineer focused on building elegant, 
          performance-driven web experiences.
          <br /><br />
          I love crafting interfaces that blend design with logic — 
          ensuring every project feels intuitive, aesthetic, and meaningful.
        </p>
      </motion.div>
    </section>
  );
}

export default About;

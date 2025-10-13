import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex flex-col justify-center items-center min-h-[90vh] px-6 text-center pt-32 overflow-hidden"
    >
     

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={
          inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -60, transition: { duration: 0.8 } }
        }
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-[#0d0d0d]/90 font-semibold text-5xl sm:text-7xl md:text-8xl leading-tight font-serif"
      >
        Salman Zulfiqar Shaikh
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={
          inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 40, transition: { duration: 0.8 } }
        }
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-[#bfa980] mt-4 text-xl sm:text-2xl md:text-3xl tracking-wide font-light font-sans"
      >
        Software Developer
      </motion.p>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="text-[#0d0d0d]/70 mt-3 text-base sm:text-lg italic font-light"
      >
        Crafting timeless digital experiences with code.
      </motion.p>

      {/* Call To Action Button */}
      <motion.a
        href="#footer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="mt-10 inline-block border border-[#bfa980] text-[#bfa980] px-6 py-2 rounded-full hover:bg-[#bfa980] hover:text-[#0d0d0d] transition-all"
      >
        Let’s Work Together
      </motion.a>

      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 12, 0] }}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut" },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-0 cursor-pointer"
      >
        <a href="#about" aria-label="Scroll Down">
          <ChevronDown size={36} className="text-[#bfa980]" />
        </a>
      </motion.div>
    </section>
  );
}

export default Hero;

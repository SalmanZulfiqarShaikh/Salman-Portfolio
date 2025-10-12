import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  return (
    <section
      ref={ref}
      id="home"
      className="flex flex-col justify-center items-center min-h-[90vh] px-6 text-center pt-32 relative overflow-hidden"
    >
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
        Software Engineer
      </motion.p>
    </section>
  );
}

export default Hero;


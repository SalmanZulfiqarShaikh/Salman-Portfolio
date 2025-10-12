import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

function Hire() {
  const text = "  ✦    Available for Projects   "; // 

  return (
    <a
      href="https://wa.me/923357957721"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="fixed bottom-0 left-0 w-full bg-[#0d0d0d] text-white overflow-hidden z-50">
        <motion.div
          className="flex items-center whitespace-nowrap py-2 text-base md:text-lg tracking-widest font-sans"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25, // adjust speed
          }}
        >
          <span className="text-[#bfa980] font-light">
            {text.repeat(50)}
            ""
          </span>
        </motion.div>
      </div>
    </a>
  );
}

export default Hire;

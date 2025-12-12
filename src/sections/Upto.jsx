import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";
import UptoCard from "../components/UptoCard";

function Upto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const cards = [
    {
      title: "Mastering Frontend",
      points: [
        "Refining TailwindCSS design patterns",
        "Experimenting with React 19 features",
        "Learning  Design Systems",
      ],
      icon: FaCode
    },
    {
      title: "Skill Development",
      points: [
        "Learning backend development",
        "Exploring Next.js 15 and AI-driven workflows",
        "Building foundations for agent-based automation",
      ],
      icon: AiOutlineRise
    },
    {
      title: "Academics",
      points: [
        "Pursuing BSCS at University of Karachi (UBIT)",
        "Strengthening core programming fundamentals",
        "Balancing academic learning with real-world projects",
      ],
      icon: FaGraduationCap
    },
    {
      title: "Exploration & Networking",
      points: [
        "Attending tech events and developer workshops",
        "Staying updated with industry trends",
        "Connecting with fellow developers and innovators",
      ],
      icon: FaHandshake
    }
  ];

  return (
    <section
      ref={ref}
      id="upto"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-[#F5F0E6]"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-serif font-semibold text-[#0d0d0d]/90 mb-4">
          What Am I Doing Now?
        </h1>
        
        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-[#0d0d0d]/70 text-lg md:text-xl font-light font-sans"
        >
          (Updated:{" "}
          <span className="text-[#bfa980] font-medium">
            {month} {year}
          </span>
          )
        </motion.p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl w-full">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <UptoCard title={card.title} points={card.points} icon={card.icon} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Upto;
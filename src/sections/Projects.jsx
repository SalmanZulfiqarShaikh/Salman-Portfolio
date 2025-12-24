import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import kolachiBeansPhoto from "../assets/images/kolachibeans.webp";
import FilmVaultPhoto from "../assets/images/filmVault.webp";
import BeatsByDREPhoto from "../assets/images/beatsbydre.webp";
import PakiQuizPhoto from "../assets/images/pakiquiz.webp";
import clarityPhoto from "../assets/images/clarity.webp";

function Projects() {
  const [filter, setFilter] = useState("Featured");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1366);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projects = [
    {
      name: "Clarity AI",
      repo: "https://github.com/SalmanZulfiqarShaikh/clarity-ai",
      liveLink: "https://clarity-ai-wheat.vercel.app/",
      preview: clarityPhoto,
      Stack: ["React", "Tailwind", "TypeScript", "Framer Motion",],
      type: ["Featured", "Frontend"],
    },
    {
      name: "Film Vault",
      repo: "https://github.com/SalmanZulfiqarShaikh/FilmVault",
      liveLink: "https://filmvaultpk.vercel.app/",
      preview: FilmVaultPhoto,
      Stack: ["React", "Tailwind", "React Router", "AppWrite", "Swiper JS", "API"],
      type: ["Featured", "Frontend"],
    },
    {
      name: "Beats By DRE – Reimagined",
      repo: "https://github.com/SalmanZulfiqarShaikh/BeatsByDRE",
      liveLink: "https://beats-by-dre-nine.vercel.app/",
      preview: BeatsByDREPhoto,
      Stack: ["React", "Framer Motion", "Tailwind","Swiper JS"],
      type: ["Featured", "Frontend"],
    },
    {
      name: "Kolachi Beans",
      repo: "https://github.com/SalmanZulfiqarShaikh/Kolachi-Beans",
      liveLink: "https://kolachi-beans.vercel.app/",
      preview: kolachiBeansPhoto,
      Stack: ["Swiper JS", "Vanilla JS", "Vanilla CSS"],
      type: ["Featured", "Frontend"],
    },
    {
      name: "PakiQuiz",
      repo: "https://github.com/SalmanZulfiqarShaikh/PakiQuiz",
      liveLink: "https://paki-quiz.vercel.app/",
      preview: PakiQuizPhoto,
      Stack: ["Vanilla CSS", "Vanilla JS"],
      type: ["Featured", "Frontend"],
    },
  ];

  const filteredProjects = projects.filter((p) => p.type.includes(filter));
  const filters = ["Featured", "Frontend", "Fullstack", "Agents", "Backend"];

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-[#f5f2ea]"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-serif font-semibold text-[#0d0d0d]/90 mb-12"
      >
        Featured Projects
      </motion.h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm md:text-base border transition-all duration-300 ${
              filter === f
                ? "bg-[#bfa980] text-white border-[#bfa980]"
                : "border-[#bfa980] text-[#0d0d0d]/80 hover:bg-[#bfa980]/10"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
          {filteredProjects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/90 rounded-2xl overflow-hidden shadow-lg border border-[#bfa980]/30 group hover:shadow-2xl transition-all duration-500"
            >
              <ProjectCard proj={proj} isMobile={isMobile} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-xl font-serif text-[#bfa980] mt-16">
          Coming Soon!
        </p>
      )}
    </section>
  );
}

function ProjectCard({ proj, isMobile }) {
  return (
    <div className="relative overflow-hidden">
      {/* Image */}
      <img
        src={proj.preview}
        alt={proj.name}
        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* Desktop Overlay */}
      {!isMobile && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h3 className="text-2xl font-semibold text-white mb-3 font-serif text-center px-3">
            {proj.name}
          </h3>
          <p className="text-sm text-gray-200 mb-4">
            {proj.Stack?.join(" • ")}
          </p>
          <div className="flex gap-6">
            <a
              href={proj.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#bfa980] hover:text-white transition-all"
            >
              <ExternalLink size={18} /> Live
            </a>
            <a
              href={proj.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#bfa980] hover:text-white transition-all"
            >
              <Github size={18} /> Code
            </a>
          </div>
        </div>
      )}

      {/* Mobile Layout (Static Info Below) */}
      {isMobile && (
        <div className="p-5 text-center">
          <h3 className="text-xl font-semibold text-[#0d0d0d]/90 font-serif mb-2">
            {proj.name}
          </h3>
          <p className="text-sm text-[#0d0d0d]/70 mb-4">
            {proj.Stack?.join(" • ")}
          </p>
          <div className="flex justify-center gap-6">
            <a
              href={proj.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#bfa980] hover:text-black transition-all"
            >
              <ExternalLink size={18} /> Live
            </a>
            <a
              href={proj.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#bfa980] hover:text-black transition-all"
            >
              <Github size={18} /> Code
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;

import React from 'react'
import { FaInstagram, FaLinkedin, FaGithub, FaXTwitter  } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { FaFileDownload } from "react-icons/fa";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <section id="footer" className="bg-black text-white py-10 pb-14 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        
        {/* Connect */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#bfa980]">Connect</h2>
          <div className="flex justify-center sm:justify-start gap-5 text-2xl">
            <a href="https://www.instagram.com/salmanzulfiqar_" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-[#bfa980] transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/salmanzulfiqarshaikh/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-[#bfa980] transition-colors" />
            </a>
            <a href="https://github.com/salmanzulfiqarshaikh" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-[#bfa980] transition-colors" />
            </a>
            <a href="https://x.com/SalmanZulf86556" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="hover:text-[#bfa980] transition-colors" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#bfa980]">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-[#bfa980] transition-colors">Home</a></li>
            <li><a href="#projects" className="hover:text-[#bfa980] transition-colors">Projects</a></li>
            <li><a href="#about" className="hover:text-[#bfa980] transition-colors">About</a></li>
            <li><a href="#skills" className="hover:text-[#bfa980] transition-colors">Skills</a></li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div >
          <h2 className="text-xl font-semibold mb-4 text-[#bfa980]">Get In Touch</h2>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=salmanzulfiqar04@gmail.com" target="_blank"
            className="flex items-center justify-center sm:justify-start gap-2 hover:text-[#bfa980] transition-colors"
          >
            <SiGmail  /> <p>salmanzulfiqar04@gmail.com</p>
          </a>
          <a
          href="/Resume.pdf"
              download
              target="_blank"
              className='flex items-center justify-center sm:justify-start gap-2 hover:text-[#bfa980] transition-colors'
          ><FaFileDownload/>Resume</a>
        </div>

      </div>

      {/* Bottom Line */}
      <hr className="border-t border-[#bfa980]/30 my-6" />
      <p className="text-center text-sm text-gray-400">
        © {year} Salman Zulfiqar Shaikh — All rights reserved.
      </p>
    </section>
  );
}

export default Footer;

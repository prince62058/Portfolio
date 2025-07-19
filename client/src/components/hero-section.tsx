import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Github, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

import ProfileImage from "../../../attached_assets/Prince (2).jpg";

const texts = [
  "MERN Stack Developer",
  "Full Stack Developer",
  "AI & ML Enthusiast", 
  "Problem Solver"
];

export function HeroSection() {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting]);

  const downloadResume = () => {
    // Create a link to download the resume PDF
    const link = document.createElement('a');
    link.href = '/api/resume';
    link.download = 'Prince_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 pt-20"
    >
      <div className="container-max section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 1, 
              delay: 0.2,
              type: "spring",
              bounce: 0.6
            }}
            className="relative inline-block"
          >
            <motion.div 
              className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 p-1.5"
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{
                rotate: {
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity
                },
                scale: {
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity
                }
              }}
            >
              <motion.img 
                src={ProfileImage}
                alt="Prince Kumar"
                className="w-full h-full rounded-full object-cover border-2 border-white/20 shadow-2xl"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  y: {
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity
                  }
                }}
              />
            </motion.div>
            
            {/* Animated Ring Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-6xl font-bold text-foreground"
            >
              Prince Kumar
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl sm:text-2xl text-muted-foreground h-8"
            >
              <span className="typewriter-cursor pr-1">
                {currentText}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              MERN Stack Developer and Computer Science Engineering student specializing in AI & ML. Passionate about building full-stack web applications using MongoDB, Express, React, and Node.js.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Button
              onClick={downloadResume}
              size="lg"
              className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
            <Button
              onClick={scrollToProjects}
              variant="outline"
              size="lg"
              className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Projects
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center space-x-6 pt-4"
          >
            <a
              href="https://github.com/prince62058"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="mailto:princekumar5252@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="tel:+916205872519"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
            >
              <Phone className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

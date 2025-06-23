import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Heart } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/prince62058",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:princekumar5252@gmail.com",
    label: "Email",
  },
  {
    icon: Phone,
    href: "tel:+916205872519",
    label: "Phone",
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12">
      <div className="container-max">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-4"
          >
            Prince Kumar
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-6"
          >
            Computer Science Engineering Student | AI & ML Enthusiast
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6 mb-8"
          >
            {socialLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="sr-only">{link.label}</span>
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 pt-8"
          >
            <p className="text-gray-400 flex items-center justify-center">
              © 2024 Prince Kumar. All rights reserved. Built with passion and{" "}
              <Heart className="h-4 w-4 text-red-500 mx-1" />
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

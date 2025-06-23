import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mernSkills = [
  { name: "MongoDB", level: 85, color: "bg-gradient-to-r from-green-500 to-green-600" },
  { name: "Express.js", level: 90, color: "bg-gradient-to-r from-gray-500 to-gray-600" },
  { name: "React.js", level: 95, color: "bg-gradient-to-r from-blue-500 to-blue-600" },
  { name: "Node.js", level: 88, color: "bg-gradient-to-r from-green-600 to-green-700" },
];

const programmingSkills = [
  { name: "JavaScript", level: 95, color: "bg-gradient-to-r from-yellow-500 to-yellow-600" },
  { name: "TypeScript", level: 85, color: "bg-gradient-to-r from-blue-600 to-blue-700" },
  { name: "Java", level: 90, color: "bg-gradient-to-r from-red-500 to-red-600" },
  { name: "HTML/CSS", level: 95, color: "bg-gradient-to-r from-orange-500 to-red-500" },
];

const technologies = [
  { name: "Git/GitHub", icon: "🔀" },
  { name: "JWT Auth", icon: "🔐" },
  { name: "RESTful APIs", icon: "🔗" },
  { name: "Socket.io", icon: "⚡" },
  { name: "Mongoose", icon: "🍃" },
  { name: "Postman", icon: "📮" },
];

const competencies = [
  "Data Structures",
  "Algorithms", 
  "OOP Concepts",
  "DBMS",
  "Operating Systems",
  "Network Security",
  "Artificial Intelligence",
];

export function SkillsSection() {
  const [progressValues, setProgressValues] = useState<{ [key: string]: number }>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Animate MERN stack progress bars
          mernSkills.forEach((skill, index) => {
            setTimeout(() => {
              setProgressValues(prev => ({
                ...prev,
                [skill.name]: skill.level
              }));
            }, index * 200);
          });
          // Animate programming skills progress bars
          programmingSkills.forEach((skill, index) => {
            setTimeout(() => {
              setProgressValues(prev => ({
                ...prev,
                [skill.name]: skill.level
              }));
            }, (index + mernSkills.length) * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('skills');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section id="skills" className="section-padding bg-muted/50">
      <div className="container-max">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            MERN Stack & Technical Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Full-stack development expertise with MongoDB, Express.js, React.js, and Node.js, 
            plus supporting technologies for modern web application development.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* MERN Stack */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              MERN Stack
            </h3>

            <div className="space-y-6">
              {mernSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={progressValues[skill.name] || 0} 
                      className="h-3"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Programming Languages */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Programming Languages
            </h3>

            <div className="space-y-6">
              {programmingSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={progressValues[skill.name] || 0} 
                      className="h-3"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-12">
          {/* Technologies & Frameworks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Development Tools & Technologies
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-2">{tech.icon}</div>
                      <div className="font-medium text-foreground">{tech.name}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h4 className="text-lg font-semibold text-foreground mb-4 text-center">
            Core Competencies
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {competencies.map((competency, index) => (
              <motion.div
                key={competency}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Badge variant="secondary" className="text-sm">
                  {competency}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

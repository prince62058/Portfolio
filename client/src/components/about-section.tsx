import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Brain, Database, Shield, Smartphone } from "lucide-react";

export function AboutSection() {
  const stats = [
    { label: "Projects Completed", value: "3+", color: "text-blue-600 dark:text-blue-400" },
    { label: "Current GPA", value: "8.56", color: "text-green-600 dark:text-green-400" },
    { label: "Technologies", value: "5+", color: "text-purple-600 dark:text-purple-400" },
    { label: "Certifications", value: "4+", color: "text-orange-600 dark:text-orange-400" },
  ];

  const focusAreas = [
    { icon: Code, label: "MERN Stack Development", color: "text-blue-600 dark:text-blue-400" },
    { icon: Brain, label: "Artificial Intelligence & ML", color: "text-purple-600 dark:text-purple-400" },
    { icon: Database, label: "Database Management", color: "text-green-600 dark:text-green-400" },
    { icon: Shield, label: "Network Security", color: "text-red-600 dark:text-red-400" },
    { icon: Smartphone, label: "Mobile App Development", color: "text-indigo-600 dark:text-indigo-400" },
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Passionate about leveraging technology to solve real-world problems and create meaningful digital experiences.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                I'm a MERN Stack Developer and Computer Science Engineering student at Technocrats Institute of Technology, specializing in Artificial Intelligence and Machine Learning. With expertise in MongoDB, Express.js, React.js, and Node.js, I build comprehensive full-stack web applications that deliver seamless user experiences.
              </p>
              
              <p className="text-muted-foreground">
                My journey in technology spans from creating dynamic web applications using the MERN stack to developing machine learning systems. I'm passionate about combining modern web technologies with AI capabilities, crafting solutions that are both technically robust and user-centric.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 border-none">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Technical Focus Areas
                </h3>
                
                <div className="space-y-4">
                  {focusAreas.map((area, index) => (
                    <motion.div
                      key={area.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <area.icon className={`h-5 w-5 ${area.color}`} />
                      <span className="text-muted-foreground">{area.label}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

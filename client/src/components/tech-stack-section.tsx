import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Server, Globe, Code2, Layers, GitBranch } from "lucide-react";

const mernStack = [
  {
    name: "MongoDB",
    category: "Database",
    description: "NoSQL database for flexible, scalable data storage",
    icon: Database,
    color: "from-green-500 to-green-600",
    textColor: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    level: 85,
  },
  {
    name: "Express.js",
    category: "Backend Framework",
    description: "Fast, minimalist web framework for Node.js",
    icon: Server,
    color: "from-gray-500 to-gray-600",
    textColor: "text-gray-600 dark:text-gray-400",
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
    level: 90,
  },
  {
    name: "React.js",
    category: "Frontend Library",
    description: "Component-based UI library for building interactive interfaces",
    icon: Globe,
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    level: 95,
  },
  {
    name: "Node.js",
    category: "Runtime Environment",
    description: "JavaScript runtime for building scalable server applications",
    icon: Code2,
    color: "from-green-600 to-green-700",
    textColor: "text-green-700 dark:text-green-300",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    level: 88,
  },
];

const supportingTech = [
  { name: "JavaScript (ES6+)", icon: "🟨", level: 95 },
  { name: "TypeScript", icon: "🔷", level: 85 },
  { name: "HTML5/CSS3", icon: "🎨", level: 95 },
  { name: "Git/GitHub", icon: "🔀", level: 90 },
  { name: "JWT Authentication", icon: "🔐", level: 85 },
  { name: "RESTful APIs", icon: "🔗", level: 90 },
  { name: "Mongoose ODM", icon: "🍃", level: 85 },
  { name: "Socket.io", icon: "⚡", level: 75 },
];

const tools = [
  { name: "VS Code", category: "IDE" },
  { name: "Postman", category: "API Testing" },
  { name: "MongoDB Compass", category: "Database GUI" },
  { name: "Netlify/Vercel", category: "Deployment" },
  { name: "Heroku", category: "Cloud Platform" },
  { name: "npm/yarn", category: "Package Manager" },
];

export function TechStackSection() {
  return (
    <section id="tech-stack" className="section-padding bg-muted/30">
      <div className="container-max">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            MERN Stack Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Full-stack development using MongoDB, Express.js, React.js, and Node.js - 
            building scalable, modern web applications from database to deployment.
          </motion.p>
        </div>

        {/* MERN Stack Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mernStack.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-l-transparent hover:border-l-primary">
                  <div className={`h-20 bg-gradient-to-br ${tech.color} flex items-center justify-center`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {tech.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {tech.category}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tech.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Proficiency</span>
                          <span className={`font-medium ${tech.textColor}`}>{tech.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tech.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`h-2 rounded-full bg-gradient-to-r ${tech.color}`}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Supporting Technologies */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-semibold text-foreground">
                    Supporting Technologies
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {supportingTech.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{tech.icon}</span>
                        <span className="font-medium text-foreground text-sm">
                          {tech.name}
                        </span>
                      </div>
                      <div className="w-full bg-background rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          transition={{ duration: 0.8, delay: index * 0.05 }}
                          viewport={{ once: true }}
                          className="h-1.5 rounded-full bg-gradient-to-r from-primary to-primary/70"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Development Tools */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <GitBranch className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-semibold text-foreground">
                    Development Tools
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {tools.map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium text-foreground">{tool.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {tool.category}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Full-Stack Capabilities</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• End-to-end application development</li>
                    <li>• RESTful API design and implementation</li>
                    <li>• Database modeling and optimization</li>
                    <li>• User authentication and authorization</li>
                    <li>• Responsive UI/UX development</li>
                    <li>• Cloud deployment and DevOps</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* MERN Architecture Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
                MERN Stack Architecture Flow
              </h3>
              
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                {[
                  { name: "React Frontend", desc: "User Interface", color: "blue" },
                  { name: "Express API", desc: "Server Logic", color: "gray" },
                  { name: "Node.js Runtime", desc: "Server Environment", color: "green" },
                  { name: "MongoDB", desc: "Data Storage", color: "green" },
                ].map((item, index) => (
                  <div key={item.name} className="flex items-center">
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/30 flex items-center justify-center mb-2`}>
                        <span className={`text-${item.color}-600 dark:text-${item.color}-400 font-bold text-sm`}>
                          {index + 1}
                        </span>
                      </div>
                      <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block mx-4">
                        <div className="w-8 h-0.5 bg-primary/30"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
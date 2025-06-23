import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Code, BarChart3, Layers, Briefcase } from "lucide-react";

const education = [
  {
    id: "graduate",
    degree: "B.Tech in CSE (AI & ML)",
    institution: "Technocrats Institute of Technology",
    period: "August 2021 - June 2025",
    location: "Bhopal, MP",
    gpa: "8.56",
    status: "Graduate",
    statusColor: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    borderColor: "border-l-green-500",
  },
  {
    id: "completed",
    degree: "12th Standard",
    institution: "Subhash Public School",
    period: "June 2020 - April 2021",
    location: "Giridih, Jharkhand",
    gpa: "76",
    status: "Completed",
    statusColor: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
    borderColor: "border-l-gray-400",
  },
];

const certifications = [
  {
    title: "Java Programming",
    description: "Fundamental certification",
    icon: Code,
    color: "from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "BI & Analytics",
    description: "Lumenore certification",
    icon: BarChart3,
    color: "from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "MERN Stack",
    description: "Coding Ninjas (In Progress)",
    icon: Layers,
    color: "from-green-50 to-green-100 dark:from-green-900 dark:to-green-800",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Deloitte Simulation",
    description: "Technology Job Simulation",
    icon: Briefcase,
    color: "from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
];

export function EducationSection() {
  return (
    <section id="education" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            Education Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            My academic path and continuous learning journey in technology and computer science.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border"></div>

          {/* Education Items */}
          <div className="space-y-12">
            {education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-center justify-between"
              >
                {/* Left Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'order-2 pl-8'}`}>
                  <Card className={`${item.borderColor} border-l-4 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                    <CardContent className="p-6">
                      <div className={`flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-2`}>
                        <Badge className={item.statusColor}>
                          {item.status}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {item.degree}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {item.institution}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.period} | {item.location}
                      </p>
                      <div className={`flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-2xl font-bold text-primary mr-2">
                          {item.gpa}
                        </span>
                        <span className="text-muted-foreground">
                          {item.id === 'graduate' ? 'GPA' : 'Percentage'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="w-2/12 flex justify-center">
                  <div className={`w-4 h-4 rounded-full border-4 border-background shadow-lg z-10 ${
                    item.status === 'Graduate' ? 'bg-green-500' : 'bg-muted-foreground'
                  }`}></div>
                </div>

                {/* Right Content (empty for alternating layout) */}
                <div className={`w-5/12 ${index % 2 === 1 ? 'order-1' : ''}`}></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground text-center mb-12"
          >
            Certifications & Achievements
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`bg-gradient-to-br ${cert.color} border-none text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                    <CardContent className="p-6">
                      <IconComponent className={`h-12 w-12 ${cert.iconColor} mb-4 mx-auto`} />
                      <h4 className="font-semibold text-foreground mb-2">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {cert.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

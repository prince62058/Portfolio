import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Music, UserCheck, Download, ExternalLink, Github, Search, Star, GitFork, Eye, Code, Globe, Database, Cpu, Smartphone, Terminal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface GitHubStats {
  stars: number;
  forks: number;
  watchers: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  icon: any;
  tags: string[];
  category: string[];
  color: string;
  github?: string;
  demo?: string;
  download?: boolean;
  stars?: number;
  forks?: number;
  watchers?: number;
  language?: string;
  homepage?: string;
  html_url?: string;
}

interface GitHubRepo {
  id: string;
  name: string;
  title: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  watchers: number;
  html_url: string;
  homepage: string;
  topics: string[];
  created_at: string;
  updated_at: string;
}

const projects: Project[] = [
  {
    id: "reservation-system",
    title: "Online Reservation System",
    description: "Comprehensive booking system with Java backend and JDBC database connectivity for seamless reservation management.",
    icon: CalendarCheck,
    tags: ["Java", "MySQL", "JDBC"],
    category: ["java", "web"],
    color: "from-blue-500 to-indigo-600",
    github: "Online-Reservation-Using-JDBC-IN-JAVA",
    demo: "https://prince62058.github.io/Online-Reservation-Using-JDBC-IN-JAVA/",
    download: true,
  },
  {
    id: "music-webapp",
    title: "Music Webapp",
    description: "Interactive music player with intuitive controls including play, pause, next, previous, and volume management.",
    icon: Music,
    tags: ["HTML", "CSS", "JavaScript"],
    category: ["web"],
    color: "from-purple-500 to-pink-600",
    github: "MusicWeb-APP",
    demo: "https://prince62058.github.io/MusicWeb-APP/",
    download: true,
  },
  {
    id: "face-recognition",
    title: "Face Recognition System",
    description: "Automated attendance tracking system using OpenCV for face detection and Scikit-learn for machine learning algorithms.",
    icon: UserCheck,
    tags: ["OpenCV", "Python", "ML"],
    category: ["ml"],
    color: "from-green-500 to-teal-600",
    github: "Face-Recognition-Attendance-Systems",
    demo: "https://prince62058.github.io/Face-Recognition-Attendance-Systems/",
    download: true,
  },
  {
    id: "login-signup",
    title: "Login Signup System",
    description: "User authentication system with secure login and registration functionality, featuring modern UI design and form validation.",
    icon: UserCheck,
    tags: ["HTML", "CSS", "JavaScript"],
    category: ["web"],
    color: "from-indigo-500 to-purple-600",
    github: "Login-Signup",
    demo: "https://prince62058.github.io/Login-Signup/",
    download: true,
  },
  {
    id: "hrms",
    title: "Human Resource Management System",
    description: "Comprehensive HRMS application for managing employee data, payroll, attendance, and HR operations with intuitive dashboard interface.",
    icon: Database,
    tags: ["Java", "Database", "Management"],
    category: ["java", "backend"],
    color: "from-emerald-500 to-cyan-600",
    github: "HRMS",
    demo: "https://prince62058.github.io/HRMS/",
    download: true,
  },
  {
    id: "servidor",
    title: "Servidor Full Stack",
    description: "Complete full-stack web application with modern backend architecture and responsive frontend design, featuring comprehensive user management and API integration.",
    icon: Globe,
    tags: ["Full Stack", "Backend", "Frontend"],
    category: ["web", "backend"],
    color: "from-violet-500 to-purple-600",
    github: "servidor",
    demo: "https://prince62058.github.io/servidor/",
    download: true,
  },
];

const filters = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Development" },
  { id: "ml", label: "Machine Learning" },
  { id: "java", label: "Java" },
  { id: "mobile", label: "Mobile" },
  { id: "backend", label: "Backend" },
  { id: "other", label: "Other" },
];

// Helper function to get icon based on language
const getLanguageIcon = (language: string) => {
  const lang = language?.toLowerCase() || '';
  if (lang.includes('javascript') || lang.includes('js')) return Code;
  if (lang.includes('python')) return Terminal;
  if (lang.includes('java')) return Cpu;
  if (lang.includes('html') || lang.includes('css')) return Globe;
  if (lang.includes('sql') || lang.includes('database')) return Database;
  if (lang.includes('swift') || lang.includes('kotlin')) return Smartphone;
  return Code;
};

// Helper function to get color based on language
const getLanguageColor = (language: string) => {
  const lang = language?.toLowerCase() || '';
  if (lang.includes('javascript') || lang.includes('js')) return 'from-yellow-500 to-orange-600';
  if (lang.includes('python')) return 'from-blue-500 to-green-600';
  if (lang.includes('java')) return 'from-red-500 to-orange-600';
  if (lang.includes('html') || lang.includes('css')) return 'from-purple-500 to-pink-600';
  if (lang.includes('sql') || lang.includes('database')) return 'from-gray-500 to-blue-600';
  if (lang.includes('swift') || lang.includes('kotlin')) return 'from-indigo-500 to-purple-600';
  if (lang.includes('typescript')) return 'from-blue-600 to-indigo-700';
  return 'from-gray-500 to-gray-700';
};

// Helper function to categorize projects
const getProjectCategory = (language: string, topics: string[] = []) => {
  const categories = [];
  const lang = language?.toLowerCase() || '';
  const topicsLower = topics.map(t => t.toLowerCase());
  
  if (lang.includes('javascript') || lang.includes('html') || lang.includes('css') || lang.includes('typescript') || topicsLower.includes('web')) {
    categories.push('web');
  }
  if (lang.includes('python') || topicsLower.includes('machine-learning') || topicsLower.includes('ml') || topicsLower.includes('ai')) {
    categories.push('ml');
  }
  if (lang.includes('java')) {
    categories.push('java');
  }
  if (topicsLower.includes('mobile') || lang.includes('swift') || lang.includes('kotlin')) {
    categories.push('mobile');
  }
  if (topicsLower.includes('api') || topicsLower.includes('backend')) {
    categories.push('backend');
  }
  
  return categories.length > 0 ? categories : ['other'];
};

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [allProjects, setAllProjects] = useState<Project[]>(projects);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // GitHub repositories query
  const { data: githubRepos, isLoading: isLoadingRepos } = useQuery({
    queryKey: ["/api/github-repos"],
    enabled: true,
  });

  // GitHub stats query
  const { data: githubStats } = useQuery({
    queryKey: ["/api/github-stats"],
    enabled: true,
  });

  // Convert GitHub repos to Project format and combine with existing projects
  useEffect(() => {
    if (githubRepos) {
      const githubProjects: Project[] = githubRepos.map((repo: GitHubRepo) => ({
        id: repo.id,
        title: repo.title,
        description: repo.description,
        icon: getLanguageIcon(repo.language),
        tags: [repo.language, ...repo.topics.slice(0, 2)].filter(Boolean),
        category: getProjectCategory(repo.language, repo.topics),
        color: getLanguageColor(repo.language),
        github: repo.name,
        demo: repo.homepage,
        download: true,
        stars: repo.stars,
        forks: repo.forks,
        watchers: repo.watchers,
        language: repo.language,
        homepage: repo.homepage,
        html_url: repo.html_url,
      }));

      // Update existing projects with GitHub data, keeping manual overrides
      const updatedProjects = projects.map(project => {
        const githubProject = githubProjects.find(gp => gp.github === project.github);
        if (githubProject) {
          return {
            ...project,
            stars: githubProject.stars,
            forks: githubProject.forks,
            watchers: githubProject.watchers,
            // Keep manual demo links, use GitHub only as fallback
            demo: project.demo || githubProject.demo,
          };
        }
        return project;
      });

      // Add new GitHub projects not in manual list
      const existingProjectIds = new Set(projects.map(p => p.github));
      const uniqueGithubProjects = githubProjects.filter(gp => !existingProjectIds.has(gp.github));
      
      setAllProjects([...updatedProjects, ...uniqueGithubProjects]);
    }
  }, [githubRepos]);

  useEffect(() => {
    let filtered = allProjects;

    // Apply category filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(project => 
        project.category.includes(activeFilter)
      );
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [activeFilter, searchTerm, allProjects]);

  const getProjectStats = (projectId: string): GitHubStats => {
    return githubStats?.[projectId] || { stars: 0, forks: 0, watchers: 0 };
  };

  return (
    <section id="projects" className="section-padding bg-muted/50">
      <div className="container-max">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A showcase of my technical skills and problem-solving abilities through various projects.
          </motion.p>
        </div>

        {/* Project Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center mb-12 gap-2"
        >
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`filter-btn ${activeFilter === filter.id ? "active" : ""}`}
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const stats = getProjectStats(project.id);
            const IconComponent = project.icon;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="project-card h-full">
                  <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <IconComponent className="h-16 w-16 text-white" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <div className="flex gap-1">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm">
                      {project.description}
                    </p>
                    
                    <div className="flex gap-2 mb-4">
                      {project.download && (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => window.open(`https://github.com/prince62058/${project.github}/archive/refs/heads/main.zip`, "_blank")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                      {project.demo && (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            console.log('Demo URL:', project.demo);
                            window.open(project.demo, "_blank");
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                      {project.github && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(`https://github.com/prince62058/${project.github}`, "_blank")}
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {/* GitHub Stats */}
                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          {project.stars || stats?.stars || 0}
                        </span>
                        <span className="flex items-center">
                          <GitFork className="h-3 w-3 mr-1" />
                          {project.forks || stats?.forks || 0}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {project.watchers || stats?.watchers || 0}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open("https://github.com/prince62058", "_blank")}
            className="px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300"
          >
            <Github className="mr-2 h-4 w-4" />
            View All on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PenTool, Code, Brain, Wrench, Bell, Mail } from "lucide-react";

const blogCategories = [
  {
    icon: Code,
    title: "Web Development",
    description: "Frontend and backend development tutorials",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Exploring the world of artificial intelligence",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Wrench,
    title: "Best Practices",
    description: "Software engineering and development tips",
    color: "text-green-600 dark:text-green-400",
  },
];

export function BlogSection() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const response = await fetch("/api/blog-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      toast({
        title: "Successfully Subscribed!",
        description: "You'll be notified when new blog posts are published.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section id="blog" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            Technical Blog
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Sharing insights, tutorials, and experiences from my journey in technology and software development.
          </motion.p>
        </div>

        {/* Coming Soon Message with Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <div className="max-w-md mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 border-none">
              <CardContent className="p-8">
                <PenTool className="h-16 w-16 text-primary mb-6 mx-auto" />
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Coming Soon!
                </h3>
                <p className="text-muted-foreground mb-6">
                  I'm currently working on creating valuable technical content to share with the community. Stay tuned for articles on web development, AI/ML, and software engineering best practices.
                </p>
                
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      disabled={isSubscribing}
                      className="px-6 hover:scale-105 transition-all duration-300"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      {isSubscribing ? "..." : "Subscribe"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Future Blog Categories */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {blogCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <IconComponent className={`h-12 w-12 ${category.color} mb-4 mx-auto`} />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

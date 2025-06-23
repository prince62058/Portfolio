import { storage } from "./storage.js";
import { insertContactSchema, insertBlogSubscriberSchema, insertProjectStatsSchema } from "../shared/schema.js";

export async function registerRoutes(app) {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to submit contact form" 
      });
    }
  });

  // Blog subscription
  app.post("/api/blog-subscribe", async (req, res) => {
    try {
      const validatedData = insertBlogSubscriberSchema.parse(req.body);
      const subscriber = await storage.createBlogSubscriber(validatedData);
      res.json({ success: true, subscriber });
    } catch (error) {
      console.error("Blog subscription error:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to subscribe to blog" 
      });
    }
  });

  // Get GitHub stats for projects
  app.get("/api/github-stats", async (req, res) => {
    try {
      // Mock GitHub stats data for demo
      const githubStats = {
        "reservation-system": { stars: 5, forks: 0, watchers: 1 },
        "e-commerce-platform": { stars: 8, forks: 2, watchers: 3 },
        "task-management": { stars: 12, forks: 3, watchers: 5 },
        "social-media-dashboard": { stars: 15, forks: 4, watchers: 8 },
        "weather-app": { stars: 20, forks: 6, watchers: 12 },
        "portfolio-website": { stars: 25, forks: 8, watchers: 15 }
      };
      
      res.json(githubStats);
    } catch (error) {
      console.error("GitHub stats error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch GitHub stats" 
      });
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch contacts" 
      });
    }
  });

  // Get all blog subscribers (admin endpoint)
  app.get("/api/blog-subscribers", async (req, res) => {
    try {
      const subscribers = await storage.getBlogSubscribers();
      res.json(subscribers);
    } catch (error) {
      console.error("Get subscribers error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch subscribers" 
      });
    }
  });

  return app;
}
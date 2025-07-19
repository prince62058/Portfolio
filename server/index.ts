import express from "express";
import cors from "cors";
import connectDB from "./mongodb.js";
import { storage as mongoStorage } from "./mongoStorage.js";
import { memoryStorage } from "./memoryStorage.js";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import fs from "fs";

const app = express();

// Initialize storage (MongoDB or fallback to memory)
let storage = memoryStorage;
let isMongoConnected = false;

(async () => {
  try {
    isMongoConnected = await connectDB();
    if (isMongoConnected) {
      storage = mongoStorage;
      console.log('Using MongoDB storage');
    } else {
      console.log('Using in-memory storage');
    }
  } catch (error) {
    console.warn('Database initialization failed, using in-memory storage');
  }
})();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Add MERN stack API routes
app.get('/api/github-stats', async (req, res) => {
  try {
    const repos = ['reservation-system', 'e-commerce-platform', 'task-management', 'social-media-dashboard', 'weather-app', 'portfolio-website', 'servidor'];
    const stats = {};
    
    for (const repo of repos) {
      const dbStats = await storage.getProjectStats(repo);
      if (dbStats) {
        stats[repo] = {
          stars: dbStats.stars,
          forks: dbStats.forks,
          watchers: dbStats.watchers,
        };
      } else {
        const newStats = {
          projectId: repo,
          stars: Math.floor(Math.random() * 20) + 5,
          forks: Math.floor(Math.random() * 8) + 1,
          watchers: Math.floor(Math.random() * 15) + 3,
        };
        await storage.updateProjectStats(newStats);
        stats[repo] = {
          stars: newStats.stars,
          forks: newStats.forks,
          watchers: newStats.watchers,
        };
      }
    }
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    res.status(500).json({ error: 'Failed to fetch GitHub stats' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = await storage.createContact({ name, email, subject, message });
    
    res.json({ 
      success: true, 
      message: 'Message sent successfully!', 
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
});

app.post('/api/blog-subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const subscriber = await storage.createBlogSubscriber({ email });
    
    res.json({ 
      success: true, 
      message: 'Successfully subscribed to blog updates!',
      subscriber: {
        id: subscriber._id,
        email: subscriber.email,
        createdAt: subscriber.createdAt
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }
    console.error('Error saving subscriber:', error);
    res.status(500).json({ error: 'Failed to subscribe to blog updates' });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await storage.getContacts();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.get('/api/blog-subscribers', async (req, res) => {
  try {
    const subscribers = await storage.getBlogSubscribers();
    res.json(subscribers);
  } catch (error) {
    console.error('Error fetching blog subscribers:', error);
    res.status(500).json({ error: 'Failed to fetch blog subscribers' });
  }
});

app.get('/api/resume', (req, res) => {
  try {
    const resumePath = path.resolve(process.cwd(), 'attached_assets', 'princeUpdatedResume_1750631151263.pdf');
    
    if (fs.existsSync(resumePath)) {
      res.download(resumePath, 'Prince_Kumar_Resume.pdf', (err) => {
        if (err) {
          console.error('Error downloading resume:', err);
          res.status(500).json({ error: 'Failed to download resume' });
        }
      });
    } else {
      res.status(404).json({ error: 'Resume not found' });
    }
  } catch (error) {
    console.error('Error serving resume:', error);
    res.status(500).json({ error: 'Failed to serve resume' });
  }
});

(async () => {
  const server = app;

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();

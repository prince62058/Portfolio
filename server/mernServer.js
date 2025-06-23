import express from 'express';
import cors from 'cors';
import connectDB from './mongodb.js';
import { storage } from './mongoStorage.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = undefined;

  const originalResJson = res.json;
  res.json = function (bodyObj, ...args) {
    capturedJsonResponse = bodyObj;
    return originalResJson.apply(this, [bodyObj, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse).substring(0, 80)}`;
      }
      console.log(logLine);
    }
  });

  next();
});

// API Routes
// GitHub stats endpoint
app.get('/api/github-stats', async (req, res) => {
  try {
    const githubUsername = 'prince62058';
    const repos = ['reservation-system', 'e-commerce-platform', 'task-management', 'social-media-dashboard', 'weather-app', 'portfolio-website'];
    
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
        // Initialize with realistic values for demo
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

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = await storage.createContact({ 
      name, 
      email, 
      subject, 
      message 
    });
    
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

// Blog subscription
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

// Get all contacts (admin endpoint)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await storage.getContacts();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Get all blog subscribers (admin endpoint)
app.get('/api/blog-subscribers', async (req, res) => {
  try {
    const subscribers = await storage.getBlogSubscribers();
    res.json(subscribers);
  } catch (error) {
    console.error('Error fetching blog subscribers:', error);
    res.status(500).json({ error: 'Failed to fetch blog subscribers' });
  }
});

// Resume download endpoint
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

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist/public')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/public/index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error('Server Error:', err);
  res.status(status).json({ message });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`MERN Stack Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
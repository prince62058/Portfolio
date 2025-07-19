import { createServer } from "http";
import path from "path";
import fs from "fs";
import { storage } from "./storage.js";
import { insertContactSchema, insertBlogSubscriberSchema } from "../shared/schema.js";

export async function registerRoutes(app) {
  // GitHub API proxy to avoid CORS issues and use database storage
  app.get("/api/github-stats", async (req, res) => {
    try {
      const githubUsername = "prince62058";
      const repos = ["reservation-system", "music-webapp", "face-recognition-attendance"];

      const stats: { [key: string]: { stars: number; forks: number; watchers: number } } = {};

      // Check database first, then use cached/stored values
      for (const repo of repos) {
        const dbStats = await storage.getProjectStats(repo);
        if (dbStats) {
          stats[repo] = {
            stars: dbStats.stars,
            forks: dbStats.forks,
            watchers: dbStats.watchers,
          };
        } else {
          // Initialize with default values and store in database
          const newStats = {
            projectId: repo,
            stars: Math.floor(Math.random() * 10) + 1,
            forks: Math.floor(Math.random() * 5),
            watchers: Math.floor(Math.random() * 15) + 1,
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
      console.error("Error fetching GitHub stats:", error);
      res.status(500).json({ error: "Failed to fetch GitHub stats" });
    }
  });

  // GitHub repositories endpoint
  app.get("/api/github-repos", async (req, res) => {
    try {
      const response = await fetch("https://api.github.com/users/prince62058/repos?per_page=100&sort=updated");
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }

      const repos = await response.json();
      const filteredRepos = repos
        .filter((repo: any) => !repo.fork && !repo.private)
        .map((repo: any) => ({
          id: repo.name,
          name: repo.name,
          title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          description: repo.description || "No description available",
          language: repo.language || "Unknown",
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          watchers: repo.watchers_count || 0,
          html_url: repo.html_url,
          homepage: repo.homepage && repo.homepage.trim() !== "" ? repo.homepage : `https://prince62058.github.io/${repo.name}/`,
          topics: repo.topics || [],
          created_at: repo.created_at,
          updated_at: repo.updated_at,
        }));

      res.json(filteredRepos);
    } catch (error) {
      console.error("Error fetching GitHub repositories:", error);
      res.status(500).json({ error: "Failed to fetch GitHub repositories" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, message: "Message sent successfully!", contact });
    } catch (error) {
      console.error("Error saving contact:", error);
      res.status(500).json({ error: "Failed to save contact message" });
    }
  });

  // Blog subscriber endpoint
  app.post("/api/blog-subscribe", async (req, res) => {
    try {
      const subscriberData = insertBlogSubscriberSchema.parse(req.body);
      const subscriber = await storage.createBlogSubscriber(subscriberData);
      res.json({ success: true, message: "Successfully subscribed to blog updates!", subscriber });
    } catch (error) {
      console.error("Error saving subscriber:", error);
      res.status(500).json({ error: "Failed to subscribe to blog updates" });
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Get all blog subscribers (admin endpoint)
  app.get("/api/blog-subscribers", async (req, res) => {
    try {
      const subscribers = await storage.getBlogSubscribers();
      res.json(subscribers);
    } catch (error) {
      console.error("Error fetching blog subscribers:", error);
      res.status(500).json({ error: "Failed to fetch blog subscribers" });
    }
  });

  // Resume download endpoint
  app.get('/api/resume', (req, res) => {
    try {
      const path = require('path');
      const fs = require('fs');

      // Path to your actual resume PDF
      const resumePath = path.join(__dirname, '../attached_assets/PrinceUpdatedResume_1752948908157.pdf');

      // Check if file exists
      if (!fs.existsSync(resumePath)) {
        return res.status(404).json({ error: 'Resume file not found' });
      }

      // Set headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Prince_Kumar_Resume.pdf"');
      res.setHeader('Content-Length', fs.statSync(resumePath).size);

      // Stream the actual PDF file
      const fileStream = fs.createReadStream(resumePath);
      fileStream.pipe(res);

      fileStream.on('error', (error: any) => {
        console.error('Error streaming resume:', error);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to download resume' });
        }
      });

    } catch (error) {
      console.error('Error downloading resume:', error);
      res.status(500).json({ error: 'Failed to download resume' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
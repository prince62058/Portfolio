// Vercel serverless function entry point
import express from "express";
import cors from "cors";
import { registerRoutes } from "../server/routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
registerRoutes(app);

export default app;
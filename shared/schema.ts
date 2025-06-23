import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blog_subscribers = pgTable("blog_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const project_stats = pgTable("project_stats", {
  id: serial("id").primaryKey(),
  projectId: varchar("project_id", { length: 100 }).notNull().unique(),
  stars: integer("stars").default(0).notNull(),
  forks: integer("forks").default(0).notNull(),
  watchers: integer("watchers").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const contactsRelations = relations(contacts, ({ }) => ({}));
export const blogSubscribersRelations = relations(blog_subscribers, ({ }) => ({}));
export const projectStatsRelations = relations(project_stats, ({ }) => ({}));

// Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const insertBlogSubscriberSchema = createInsertSchema(blog_subscribers).pick({
  email: true,
});

export const insertProjectStatsSchema = createInsertSchema(project_stats).pick({
  projectId: true,
  stars: true,
  forks: true,
  watchers: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertBlogSubscriber = z.infer<typeof insertBlogSubscriberSchema>;
export type BlogSubscriber = typeof blog_subscribers.$inferSelect;
export type InsertProjectStats = z.infer<typeof insertProjectStatsSchema>;
export type ProjectStats = typeof project_stats.$inferSelect;

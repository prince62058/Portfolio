import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 200 }).notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const blog_subscribers = pgTable("blog_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const project_stats = pgTable("project_stats", {
  id: serial("id").primaryKey(),
  project_id: varchar("project_id", { length: 100 }).notNull().unique(),
  stars: integer("stars").default(0),
  forks: integer("forks").default(0),
  watchers: integer("watchers").default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const contactsRelations = relations(contacts, ({ }) => ({}));
export const blogSubscribersRelations = relations(blog_subscribers, ({ }) => ({}));
export const projectStatsRelations = relations(project_stats, ({ }) => ({}));

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
  project_id: true,
  stars: true,
  forks: true,
  watchers: true,
});
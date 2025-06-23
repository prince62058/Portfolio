import { db } from "./db.js";
import { users, contacts, blog_subscribers, project_stats } from "../shared/schema.js";
import { eq } from "drizzle-orm";

export class DatabaseStorage {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser) {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(contact) {
    const [newContact] = await db
      .insert(contacts)
      .values(contact)
      .returning();
    return newContact;
  }

  async getContacts() {
    return await db.select().from(contacts);
  }

  async createBlogSubscriber(subscriber) {
    const [newSubscriber] = await db
      .insert(blog_subscribers)
      .values(subscriber)
      .returning();
    return newSubscriber;
  }

  async getBlogSubscribers() {
    return await db.select().from(blog_subscribers);
  }

  async getProjectStats(projectId) {
    const [stats] = await db.select().from(project_stats).where(eq(project_stats.project_id, projectId));
    return stats || undefined;
  }

  async updateProjectStats(stats) {
    const [updatedStats] = await db
      .insert(project_stats)
      .values(stats)
      .onConflictDoUpdate({
        target: project_stats.project_id,
        set: {
          stars: stats.stars,
          forks: stats.forks,
          watchers: stats.watchers,
          updated_at: new Date()
        }
      })
      .returning();
    return updatedStats;
  }

  async getAllProjectStats() {
    return await db.select().from(project_stats);
  }
}

export const storage = new DatabaseStorage();
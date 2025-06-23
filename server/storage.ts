import { users, contacts, blog_subscribers, project_stats } from "../shared/schema.js";
import { db } from "./db.js";
import { eq } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db
      .insert(contacts)
      .values(contact)
      .returning();
    return newContact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.createdAt);
  }

  async createBlogSubscriber(subscriber: InsertBlogSubscriber): Promise<BlogSubscriber> {
    const [newSubscriber] = await db
      .insert(blog_subscribers)
      .values(subscriber)
      .returning();
    return newSubscriber;
  }

  async getBlogSubscribers(): Promise<BlogSubscriber[]> {
    return await db.select().from(blog_subscribers).orderBy(blog_subscribers.createdAt);
  }

  async getProjectStats(projectId: string): Promise<ProjectStats | undefined> {
    const [stats] = await db.select().from(project_stats).where(eq(project_stats.projectId, projectId));
    return stats || undefined;
  }

  async updateProjectStats(stats: InsertProjectStats): Promise<ProjectStats> {
    const [updatedStats] = await db
      .insert(project_stats)
      .values(stats)
      .onConflictDoUpdate({
        target: project_stats.projectId,
        set: {
          stars: stats.stars,
          forks: stats.forks,
          watchers: stats.watchers,
          updatedAt: new Date(),
        },
      })
      .returning();
    return updatedStats;
  }

  async getAllProjectStats(): Promise<ProjectStats[]> {
    return await db.select().from(project_stats);
  }
}

export const storage = new DatabaseStorage();

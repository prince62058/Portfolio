// In-memory storage implementation for MERN stack demo
class MemoryStorage {
  constructor() {
    this.contacts = [];
    this.blogSubscribers = [];
    this.projectStats = new Map();
    this.users = [];
    this.nextId = 1;
  }

  async getUser(id) {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username) {
    return this.users.find(user => user.username === username);
  }

  async createUser(userData) {
    const user = {
      id: this.nextId++,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  async createContact(contactData) {
    const contact = {
      _id: this.nextId++,
      ...contactData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.contacts.push(contact);
    return contact;
  }

  async getContacts() {
    return [...this.contacts].sort((a, b) => b.createdAt - a.createdAt);
  }

  async createBlogSubscriber(subscriberData) {
    // Check for duplicate email
    const existing = this.blogSubscribers.find(sub => sub.email === subscriberData.email);
    if (existing) {
      const error = new Error('Email already subscribed');
      error.code = 11000;
      throw error;
    }

    const subscriber = {
      _id: this.nextId++,
      ...subscriberData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.blogSubscribers.push(subscriber);
    return subscriber;
  }

  async getBlogSubscribers() {
    return [...this.blogSubscribers].sort((a, b) => b.createdAt - a.createdAt);
  }

  async getProjectStats(projectId) {
    return this.projectStats.get(projectId);
  }

  async updateProjectStats(statsData) {
    const stats = {
      _id: this.nextId++,
      ...statsData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.projectStats.set(statsData.projectId, stats);
    return stats;
  }

  async getAllProjectStats() {
    return Array.from(this.projectStats.values());
  }
}

export const memoryStorage = new MemoryStorage();
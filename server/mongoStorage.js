import { User, Contact, BlogSubscriber, ProjectStats } from './models.js';

export class MongoStorage {
  async getUser(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username) {
    try {
      return await User.findOne({ username });
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async createContact(contactData) {
    try {
      const contact = new Contact(contactData);
      return await contact.save();
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  async getContacts() {
    try {
      return await Contact.find().sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error getting contacts:', error);
      return [];
    }
  }

  async createBlogSubscriber(subscriberData) {
    try {
      const subscriber = new BlogSubscriber(subscriberData);
      return await subscriber.save();
    } catch (error) {
      console.error('Error creating blog subscriber:', error);
      throw error;
    }
  }

  async getBlogSubscribers() {
    try {
      return await BlogSubscriber.find().sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error getting blog subscribers:', error);
      return [];
    }
  }

  async getProjectStats(projectId) {
    try {
      return await ProjectStats.findOne({ projectId });
    } catch (error) {
      console.error('Error getting project stats:', error);
      return undefined;
    }
  }

  async updateProjectStats(statsData) {
    try {
      return await ProjectStats.findOneAndUpdate(
        { projectId: statsData.projectId },
        statsData,
        { new: true, upsert: true }
      );
    } catch (error) {
      console.error('Error updating project stats:', error);
      throw error;
    }
  }

  async getAllProjectStats() {
    try {
      return await ProjectStats.find();
    } catch (error) {
      console.error('Error getting all project stats:', error);
      return [];
    }
  }
}

export const storage = new MongoStorage();
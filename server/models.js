import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Blog Subscriber Schema
const blogSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true
});

// Project Stats Schema
const projectStatsSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    unique: true
  },
  stars: {
    type: Number,
    default: 0
  },
  forks: {
    type: Number,
    default: 0
  },
  watchers: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);
export const Contact = mongoose.model('Contact', contactSchema);
export const BlogSubscriber = mongoose.model('BlogSubscriber', blogSubscriberSchema);
export const ProjectStats = mongoose.model('ProjectStats', projectStatsSchema);
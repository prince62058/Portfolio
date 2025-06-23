import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if MongoDB URI is available
    const mongoURI = process.env.MONGODB_URI;
    
    if (mongoURI) {
      await mongoose.connect(mongoURI);
      console.log('MongoDB connected successfully');
      return true;
    } else {
      console.log('No MongoDB URI found, using in-memory storage');
      return false;
    }
  } catch (error) {
    console.warn('MongoDB connection failed, falling back to in-memory storage:', error.message);
    return false;
  }
};

export default connectDB;
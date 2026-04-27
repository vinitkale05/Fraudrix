import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('FATAL: MONGODB_URI is not defined in environment variables.');
    return;
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️  MongoDB Connection Error: ${error instanceof Error ? error.message : String(error)}`);
    console.warn('⚠️  Continuing without database. Some features will be unavailable.');
  }
};

export default connectDB;

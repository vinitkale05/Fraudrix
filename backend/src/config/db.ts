import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('localhost')) {
    console.error('❌ FATAL ERROR: MONGODB_URI is missing or set to localhost on Render.');
    console.error('👉 ACTION REQUIRED: Go to Render Dashboard -> Environment and add your MongoDB Atlas Connection String.');
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

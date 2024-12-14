import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Function to test the connection
const testConnection = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
    });
    console.log('MongoDB connection successful');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB connection failed');
  }
};

// Call testConnection during the app startup
testConnection();

// Function to get the database connection
const connectToDatabase = () => {
  return mongoose.connection;  // Return the Mongoose connection instance
};

export default connectToDatabase;

import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Enforces unique usernames
      minlength: 3, // Optional: Ensure username is at least 3 characters long
    },
    email: {
      type: String,
      required: true,
      unique: true, // Enforces unique email
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email'], // Basic email format validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Optional: Enforce minimum password length
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Restrict role values to 'user' or 'admin'
      default: 'user', // Default role is 'user'
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Indexes for optimizing lookups
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

// No password hashing in schema since it's handled in the controller

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;

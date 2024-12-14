import bcrypt from 'bcrypt';
import User from '../lib/userModel.js';  // Import the User model

// Controller to handle user registration
export const registerUser = async (request, reply) => {
  const { username, password, email } = request.body;

  // Basic validation
  if (!username || !password || !email) {
    return reply.code(400).send({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return reply.code(409).send({ message: 'Username or Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const user = new User({ username, password: hashedPassword, email });
    await user.save();

    // Respond with a success message (don't return the password)
    reply.code(201).send({ message: 'User created successfully' });

  } catch (err) {
    console.error('Error creating user:', err);
    reply.code(500).send({ message: 'Server error' });
  }
};

// Controller to handle login (with JWT generation)
export const loginUser = async (request, reply) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return reply.code(400).send({ message: 'Username and password are required' });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return reply.code(404).send({ message: 'User not found' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.code(401).send({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = fastify.jwt.sign({ username: user.username, role: user.role });

    // Respond with the token
    reply.send({ token });
  } catch (err) {
    console.error('Login error:', err);
    reply.code(500).send({ message: 'Server error' });
  }
};

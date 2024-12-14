import Fastify from 'fastify';
import dotenv from 'dotenv';
import { jwtPlugin } from './lib/jwt.js';  // Your custom JWT plugin
import connectToDatabase from './lib/mongodb.js';
import dataRoutes from './routes/routes.js';  // Import data routes
import authRoutes from './routes/authRoutes.js';  // Import auth routes

dotenv.config(); // Load .env variables

const fastify = Fastify({ logger: true });

// Register the JWT plugin
fastify.register(jwtPlugin, { secret: process.env.JWT_SECRET });

// Connect to MongoDB
async function startServer() {
  const db = await connectToDatabase();
  fastify.decorate('db', db); // Make db available throughout the app

  // Register routes
  fastify.register(dataRoutes);  // Register data routes (with protection)
  fastify.register(authRoutes);  // Register auth routes (public)

  try {
    await fastify.listen({ port: 5000 });
    console.log('Server running at http://localhost:5000/');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();

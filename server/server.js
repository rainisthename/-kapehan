import Fastify from 'fastify';
import dotenv from 'dotenv';
import connectToDatabase from './lib/mongodb.js';
import healthCheck from './routes/routes.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js'
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from 'fastify-cookie';
import fastifyHelmet from '@fastify/helmet'; // Adding helmet for security headers
import fastifyRateLimit from '@fastify/rate-limit'; // Adding rate limiting
import shopRoutes from './routes/shopRoute.js';
dotenv.config(); // Load environment variables from .env

const fastify = Fastify({
  logger: {
    level: 'info', // Use appropriate logging level (info in production)
  },
  bodyLimit: 1048576, // Limit body size (1MB)
});

// Register cookie and JWT plugins
fastify.register(fastifyCookie); // Cookie plugin for secure cookie handling
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET, // Always store secrets securely (do not hardcode them)
  sign: {
    expiresIn: '1h', // Token expiration time
  },
});

// Register security-related plugins
fastify.register(fastifyHelmet); // Secure HTTP headers to prevent common vulnerabilities
fastify.register(fastifyRateLimit, {
  max: 100, // Max requests per window
  timeWindow: '1 minute', // Time window for the rate limit
}); 

// Optionally, you can add CSRF protection depending on your app's needs

// Log that JWT plugin has been successfully registered
fastify.addHook('onReady', () => {
  fastify.log.info('JWT plugin registered successfully.');
});

// Improved error handling function to avoid exposing sensitive information
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(error.statusCode || 500).send({
    message: error.message || 'Internal Server Error',
  });
});

async function startServer() {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase();
    fastify.decorate('db', db); // Attach DB connection to Fastify instance

    // Register routes
    fastify.register(authRoutes); // Auth routes (login/register)
    fastify.register(healthCheck); // Health check routes
    fastify.register(dataRoutes); // Data routes
    fastify.register(shopRoutes); // Data routes

    // Start the server
    await fastify.listen({ port: process.env.PORT || 5000 });
    fastify.log.info('Server running at http://localhost:5000/');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer(); // Start the Fastify server

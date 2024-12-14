import fastifyJwt from '@fastify/jwt';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Make sure this is in your .env file

export const jwtPlugin = async (fastify) => {
  // Register the JWT plugin with the Fastify instance
  fastify.register(fastifyJwt, { secret: JWT_SECRET });
};

// Function to generate a JWT token
export const generateToken = (fastify, payload) => {
  // Use the `sign` method from the Fastify instance
  return fastify.jwt.sign(payload);
};

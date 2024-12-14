import { registerUser } from '../controller/authController.js';
import authenticate from '../middleware/authenticate.js';  // Your authentication middleware

async function authRoutes(fastify, options) {
  // Registration route
  fastify.post('/api/v1/register', registerUser);

  // Login route (this will return a JWT token)
  // fastify.post('/register', { preHandler: authenticate }, async (request, reply) => {
  //   // Handle the creation logic
  //   return { message: 'Resource created' };
  // });
}

export default authRoutes;

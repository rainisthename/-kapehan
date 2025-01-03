import { loginUser, registerUser, logoutUser, fetchUser } from '../controller/authController.js';

async function authRoutes(fastify, options) {
  // Registration route (no authentication required)
  // fastify.post('/api/v1/register', registerUser);
  
  // Login route (no authentication required)
  fastify.post('/api/v1/login', loginUser);

  fastify.post('/api/v1/logout', logoutUser);  // Add logout route
  // fastify.get('/api/v1/user', fetchUser);  // Add logout route

}

export default authRoutes;

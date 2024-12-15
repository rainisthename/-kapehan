import { verifyJWT } from '../middleware/Authenticate.js'; // Import the verifyJWT controller

async function dataRoutes(fastify, options) {
    // Protected route example with JWT verification
    fastify.get('/api/v1/users', { preHandler: verifyJWT }, async (request, reply) => {
      return reply.send({ message: `Hello, ${request.user.username}. This is a protected route!` });
    });
  
  }
  
  export default dataRoutes;
  
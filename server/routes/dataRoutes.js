import { verifyJWT } from '../middleware/Authenticate.js'; // Import the verifyJWT controller
import { fetchUser } from '../controller/authController.js';
async function dataRoutes(fastify, options) {
    // Protected route example with JWT verification
    // fastify.get('/api/v1/users', { preHandler: verifyJWT }, async (request, reply) => {
    //   return reply.send({ message: `Hello, ${request.user.username}. This is a protected route!` });
    // });

    fastify.post('/api/v1/user', { preHandler: verifyJWT }, fetchUser);

  
  }
  
  export default dataRoutes;
  
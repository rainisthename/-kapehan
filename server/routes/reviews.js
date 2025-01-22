import { verifyJWT } from "../middleware/Authenticate.js";
import {
  createReview,
  getReviewsByShop
} from "../controller/reviews.js";
// import { writeFile } from "fs/promises"

/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {import("fastify").FastifyHttpOptions} options 
 */
async function reviewsRoutes(fastify, options) {
  // POST route for adding a review 
  fastify.post('/reviews', {  
    // preHandler: verifyJWT,
    preValidation: (request, reply, done) => {
      const { userId, shopId } = request.body;
      if (!userId || !shopId) {
        return reply.status(400).send({ error: 'User ID and Shop ID are required' });
      } // Add your authentication/authorization logic here 
      done();
    }
  }, createReview
  );

  // GET route for retrieving reviews with pagination 
  fastify.get('/reviews/:shopId', getReviewsByShop);
}

export default reviewsRoutes;

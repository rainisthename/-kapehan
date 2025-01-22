// controllers/reviewController.js
import Review from '../lib/Review.js';

// Create a new review
export const createReview = async (req, reply) => {
  const { userId, shopId, rating, comment } = req.body;

  try {
    // Validate input
    if (!userId || !shopId || !rating) {
      return reply.status(400).send({ message: 'Missing required fields' });
    }

    // Create and save review
    const newReview = new Review({ userId, shopId, rating, comment });
    await newReview.save();

    return reply.status(201).send({
      message: 'Review created successfully',
      review: newReview,
    });
  } catch (error) {
    req.log.error('Error creating review:', error);
    return reply.status(500).send({ message: 'Internal server error' });
  }

};

// 
/**
 * 
 * @param {import('fastify').FastifyRequest} req 
 * @param {import('fastify').FastifyReply} reply 
 * @returns {import('fastify').FastifyReply}
 * @description Get all reviews for a shop
 */
export const getReviewsByShop = async (req, reply) => {
  const { shopId } = req.params;
  console.log('shopId', shopId)
  try {
    const reviews = await Review.find({ shopId }).sort({ createdAt: -1 });

    return reply.status(200).send({ reviews });
  } catch (error) {
    req.log.error('Error fetching reviews:', error);
    return reply.status(500).send({ message: 'Internal server error' });
  }
};

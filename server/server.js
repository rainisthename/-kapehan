import Fastify from "fastify";
import dotenv from "dotenv";
import connectToDatabase from "./lib/mongodb.js";
import healthCheck from "./routes/routes.js";
import authRoutes from "./routes/authRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "fastify-cookie";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import shopRoutes from "./routes/shopRoute.js";
import fastifyCors from "@fastify/cors"; // Import Fastify CORS plugin
import corsOptions from "./lib/corsConfig.js"; // Import CORS options
// import fastifyMulter from 'fastify-multer'; // Import fastify-multer
import fastifyMultipart from "@fastify/multipart";
import reviewsRoutes from "./routes/reviews.js";

dotenv.config();

const fastify = Fastify({
  logger: {
    level: "info",
  },
  bodyLimit: 1048576, // Increase body limit if needed
});

fastify.register(fastifyMultipart, {
  addToBody: true, // Ensure multipart data is added to the request body
  limits: { fileSize: 1000000 }, // Optional: Set file size limit if needed
});
// Register plugins
fastify.register(fastifyCookie);
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
  sign: {
    expiresIn: "1h",
  },
});

// Register security plugins
fastify.register(fastifyHelmet);
fastify.register(fastifyRateLimit, {
  max: 100,
  timeWindow: "1 minute",
});

// Register CORS with the configured options
fastify.register(fastifyCors, corsOptions);

// Set error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(error.statusCode || 500).send({
    message: error.message || "Internal Server Error",
  });
});

async function startServer() {
  try {
    const db = await connectToDatabase();
    fastify.decorate("db", db);

    // Register routes
    fastify.register(authRoutes);
    fastify.register(healthCheck);
    fastify.register(dataRoutes);
    fastify.register(shopRoutes); // This route will now have access to fastify.multer
    fastify.register(reviewsRoutes);

    // Start the server
    await fastify.listen({ port: process.env.PORT || 5000 });
    fastify.log.info("Server running at http://localhost:5000/");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();

async function dataRoutes(fastify, db) {
  fastify.get("/api/v1/health", async (request, reply) => {
    try {
      // Respond with a simple OK status for health check
      reply.send({ status: "OK", message: "Service is running" });
    } catch (err) {
      reply.code(500).send({ success: false, error: err.message });
    }
  });
}

export default dataRoutes;

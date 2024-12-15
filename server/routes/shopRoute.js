import { verifyJWT } from "../middleware/Authenticate.js"; // Import the verifyJWT middleware
import {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
} from "../controller/shopController.js";

async function shopRoutes(fastify, options) {
  // Route to create a shop (with JWT authentication)
  fastify.post("/api/v1/shops/create", { preHandler: verifyJWT }, async (request, reply) => {
    try {
      await createShop(request, reply);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Failed to create shop" });
    }
  });

  // Route to update a shop (with JWT authentication)
  fastify.put("/api/v1/shops/update/:shopId", { preHandler: verifyJWT }, async (request, reply) => {
    try {
      await updateShop(request, reply);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Failed to update shop" });
    }
  });

  // Route to get all shops (with pagination)
  fastify.get("/api/v1/shops", async (request, reply) => {
    try {
      const { page = 1, limit = 10 } = request.query; // Pagination query params
      const shops = await getAllShops(page, limit);
      reply.send(shops);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Failed to retrieve shops" });
    }
  });

  // Route to get a specific shop by ID (no authentication required)
  fastify.get("/api/v1/shops/:shopId", async (request, reply) => {
    try {
      const shop = await getShopById(request.params.shopId);
      if (!shop) {
        reply.status(404).send({ error: "Shop not found" });
        return;
      }
      reply.send(shop);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Failed to retrieve shop" });
    }
  });

  // Route to delete a shop (with JWT authentication)
  fastify.delete("/api/v1/shops/delete/:shopId", { preHandler: verifyJWT }, async (request, reply) => {
    try {
      await deleteShop(request.params.shopId);
      reply.status(200).send({ message: "Shop deleted successfully" });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Failed to delete shop" });
    }
  });
}

export default shopRoutes;

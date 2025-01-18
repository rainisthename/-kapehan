import { verifyJWT } from "../middleware/Authenticate.js";
import {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
} from "../controller/shopController.js";
// import { writeFile } from "fs/promises"

// Helper function to handle pagination
const handlePagination = (page, limit) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {import("fastify").FastifyHttpOptions} options 
 */
async function shopRoutes(fastify, options) {
  fastify.post(
    "/api/v1/shops/create",
    { preHandler: verifyJWT },
    async (request, reply) => {
      try {
        // Step 1: Extract the file and form fields from the request (pass all data to the controller)
        const parts = request.parts();
        let shopData = {
          file: null,
          fields: {
            amenities: [],
            socialMedia: {}
          },
        };

        try {
          shopData.fields = shopData.fields || {};
          shopData.fields.amenities = shopData.fields.amenities || [];
          const socialMediaData = {};

          for await (const part of parts) {
            if (part.file) {
              shopData.fields.shopImage = {
                filename: part.filename,
                mimetype: part.mimetype,
              }
              const buffer = await part.toBuffer();
              shopData.file = buffer; // Store the file as a buffer or save it to a path
            } else {
              if (part.fieldname.includes("amenities")) {
                shopData.fields.amenities.push(part.value);
              } else if (part.fieldname.includes("socialMedia")) {
                console.log("part.fieldname", part.fieldname);
                console.log("part.value", part.value);
                // Process socialMedia fields
                const socialMediaMatch = part.fieldname.match(/^socialMedia\[(\d+)]\[(\w+)]$/);
                if (socialMediaMatch) {
                  const [, index, key] = socialMediaMatch; // Destructure index and key
                  socialMediaData[index] = socialMediaData[index] || {}; // Ensure the index exists
                  socialMediaData[index][key] = part.value; // Assign value to the key
                } else if (part.fieldname.startsWith("socialMedia")) {
                  shopData.fields.socialMedia = shopData.fields.socialMedia || {};
                  shopData.fields.socialMedia[part.fieldname] = part.value;
                }

                // After processing all parts, map socialMediaData to the final object
                shopData.fields.socialMedia = Object.values(socialMediaData).reduce(
                  (acc, curr) => {
                    if (curr.platform && curr.url) {
                      acc[curr.platform] = curr.url;
                    }
                    return acc;
                  },
                  { facebook: "", instagram: "", twitter: "" } // Initialize default structure
                );
              } else {
                shopData.fields[part.fieldname] = part.value;
              }
            }
          }

          console.log("Finished processing all parts");
          // console.log("Final shopData:", shopData);
        } catch (error) {
          console.error("Error in for await loop:", error);
        }

        // Add the image path to the shop data
        // shopData.imagePath = shopImage;
        console.log('shopData', shopData)
        // return;
        // Pass the entire data object to the controller
        const shop = await createShop(shopData, reply);
        console.log("created shop")
        // Step 4: Return the success response
        return reply.send({
          isSuccess: true,
          message: "Shop created successfully",
          shop,
        });
      } catch (error) {
        console.error("Error during shop creation:", error);
        return reply.status(500).send({
          isSuccess: false,
          error: "Failed to create shop",
        });
      }
    }
  );

  fastify.put(
    "/api/v1/shops/update/:shopId",
    { preHandler: verifyJWT },
    async (request, reply) => {
      try {
        const shop = await updateShop(request, reply);
        reply.send({
          isSuccess: true,
          message: "Shop updated successfully",
          shop,
        });
      } catch (error) {
        console.error(error);
        reply.status(500).send({
          isSuccess: false,
          error: "Failed to update shop",
        });
      }
    }
  );

  // Route to get all shops (with pagination)
  fastify.get("/api/v1/shops", async (request, reply) => {
    try {
      const { page = 1, limit = 10 } = request.query; // Pagination query params
      const { skip, limit: pageLimit } = handlePagination(
        Number(page),
        Number(limit)
      );

      const { shops, totalShops } = await getAllShops(skip, pageLimit);
      const totalPages = Math.ceil(totalShops / pageLimit); // Calculate total pages

      reply.send({
        isSuccess: true,
        shops,
        pagination: {
          totalShops,
          totalPages,
          currentPage: page,
          limit: pageLimit,
        },
      });
    } catch (error) {
      console.error(error);
      reply.status(500).send({
        isSuccess: false,
        error: "Failed to retrieve shops",
      });
    }
  });

  // Route to get a specific shop by ID (no authentication required)
  fastify.get("/api/v1/shops/:shopId", async (request, reply) => {
    try {
      const shop = await getShopById(request.params.shopId);
      if (!shop) {
        reply.status(404).send({
          isSuccess: false,
          error: "Shop not found",
        });
        return;
      }
      reply.send({
        isSuccess: true,
        shop,
      });
    } catch (error) {
      console.error(error);
      reply.status(500).send({
        isSuccess: false,
        error: "Failed to retrieve shop",
      });
    }
  });

  // Route to delete a shop (with JWT authentication)
  fastify.delete(
    "/api/v1/shops/delete/:shopId",
    { preHandler: verifyJWT },
    async (request, reply) => {
      try {
        await deleteShop(request.params.shopId);
        reply.send({
          isSuccess: true,
          message: "Shop deleted successfully",
        });
      } catch (error) {
        console.error(error);
        reply.status(500).send({
          isSuccess: false,
          error: "Failed to delete shop",
        });
      }
    }
  );
}

export default shopRoutes;

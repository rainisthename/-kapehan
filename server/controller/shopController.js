import Shop from '../lib/shopSchema.js'; // Assuming the Shop model is located here

// Create a new shop
const createShop = async (req, reply) => {
  try {
    const { name, address, isOpen, ratings, about, amenities, storeTime, storeDate, socialMedia, storeLocation, image } = req.body;
    
    // Validation
    if (!name || !address || !isOpen) {
      return reply.status(400).send({ error: 'Required fields are missing' });
    }

    const newShop = new Shop({
      name,
      address,
      isOpen,
      ratings: ratings || 0,
      about,
      amenities,
      storeTime,
      storeDate,
      socialMedia,
      storeLocation,
      image,
    });

    await newShop.save();
    reply.status(201).send(newShop);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Failed to create shop' });
  }
};

// Get all shops
const getAllShops = async (req, reply) => {
  try {
    const shops = await Shop.find();
    reply.status(200).send(shops);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Failed to fetch shops' });
  }
};

// Get a specific shop by ID
const getShopById = async (req, reply) => {
  try {
    const { shopId } = req.params;
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return reply.status(404).send({ error: 'Shop not found' });
    }

    reply.status(200).send(shop);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Failed to fetch shop' });
  }
};

// Update a shop by ID
const updateShop = async (req, reply) => {
  try {
    const { shopId } = req.params;
    const { name, address, isOpen, ratings, about, amenities, storeTime, storeDate, socialMedia, storeLocation, image } = req.body;

    const updatedShop = await Shop.findByIdAndUpdate(shopId, {
      name,
      address,
      isOpen,
      ratings,
      about,
      amenities,
      storeTime,
      storeDate,
      socialMedia,
      storeLocation,
      image,
    }, { new: true });

    if (!updatedShop) {
      return reply.status(404).send({ error: 'Shop not found' });
    }

    reply.status(200).send(updatedShop);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Failed to update shop' });
  }
};

// Delete a shop by ID
const deleteShop = async (req, reply) => {
  try {
    const { shopId } = req.params;

    const deletedShop = await Shop.findByIdAndDelete(shopId);

    if (!deletedShop) {
      return reply.status(404).send({ error: 'Shop not found' });
    }

    reply.status(200).send({ message: 'Shop deleted successfully' });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Failed to delete shop' });
  }
};

// Export the controller functions
export { createShop, getAllShops, getShopById, updateShop, deleteShop };

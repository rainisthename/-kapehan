import Shop from '../lib/shopSchema.js'; // Assuming the Shop model is located here

// Helper function to validate required fields
const validateShopFields = (fields) => {
  const requiredFields = ['name', 'address', 'isOpen', 'city']; // Fields that must be provided
  for (const field of requiredFields) {
    if (!fields[field]) {
      return field; // Return the missing field
    }
  }
  return null; // No fields are missing
};

// Create a new shop
const createShop = async (req, reply) => {
  try {
    const { name, address, isOpen, ratings, about, amenities, storeTime, storeDate, socialMedia, storeLocation, image, city } = req.body;
    
    // Validation check for required fields
    const missingField = validateShopFields(req.body);
    if (missingField) {
      return reply.status(400).send({ isSuccess: false, error: `${missingField} is required` });
    }

    // Create new shop entry
    const newShop = new Shop({
      name,
      address,
      isOpen,
      ratings: ratings || 0, // Default to 0 if ratings not provided
      about,
      amenities,
      storeTime,
      city,
      storeDate,
      socialMedia,
      storeLocation,
      image,
    });

    // Save the new shop
    await newShop.save();

    // Return success response
    reply.status(201).send({ isSuccess: true, message: "Shop created successfully", shop: newShop });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ isSuccess: false, error: 'Failed to create shop' });
  }
};

// Get all shops
const getAllShops = async (skip, limit) => {
  try {
    const shops = await Shop.find()
      .skip(skip) // Skip the records based on pagination
      .limit(limit); // Limit the number of records returned
    const totalShops = await Shop.countDocuments(); // Get the total number of shops for pagination info
    return { shops, totalShops };
  } catch (error) {
    throw new Error('Failed to fetch shops');
  }
};


// Get a specific shop by ID
const getShopById = async (req, reply) => {
  try {
    const { shopId } = req.params;
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return reply.status(404).send({ isSuccess: false, error: 'Shop not found' });
    }

    reply.status(200).send({ isSuccess: true, shop });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ isSuccess: false, error: 'Failed to fetch shop' });
  }
};

// Update a shop by ID
const updateShop = async (req, reply) => {
  try {
    const { shopId } = req.params;
    const { name, address, isOpen, ratings, about, amenities, storeTime, storeDate, socialMedia, storeLocation, image, city } = req.body;

    const updatedShop = await Shop.findByIdAndUpdate(shopId, {
      name,
      address,
      isOpen,
      ratings,
      about,
      city,
      amenities,
      storeTime,
      storeDate,
      socialMedia,
      storeLocation,
      image,
    }, { new: true });

    if (!updatedShop) {
      return reply.status(404).send({ isSuccess: false, error: 'Shop not found' });
    }

    reply.status(200).send({ isSuccess: true, message: 'Shop updated successfully', shop: updatedShop });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ isSuccess: false, error: 'Failed to update shop' });
  }
};

// Delete a shop by ID
const deleteShop = async (req, reply) => {
  try {
    const { shopId } = req.params;

    const deletedShop = await Shop.findByIdAndDelete(shopId);

    if (!deletedShop) {
      return reply.status(404).send({ isSuccess: false, error: 'Shop not found' });
    }

    reply.status(200).send({ isSuccess: true, message: 'Shop deleted successfully' });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ isSuccess: false, error: 'Failed to delete shop' });
  }
};

// Export the controller functions
export { createShop, getAllShops, getShopById, updateShop, deleteShop };

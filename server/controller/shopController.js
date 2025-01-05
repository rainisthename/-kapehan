import Shop from "../lib/shopSchema.js"; // Assuming the Shop model is located here
import admin from "../firebase/firebase-admin.js"; // Import the firebase-admin setup

// import { getStorage, getDownloadURL } from "firebase-admin/storage"; // Import the necessary methods
import streamifier from "streamifier"; // Import streamifier
import { getStorage } from "firebase-admin/storage"; // Destructure getStorage from the initialized Firebase admin SDK

// Helper function to validate required fields
const validateShopFields = (fields) => {
  const requiredFields = ["name", "address", "city"]; // Fields that must be provided
  for (const field of requiredFields) {
    if (!fields[field]) {
      return field; // Return the missing field
    }
  }
  return null; // No fields are missing
};

const createShop = async (data, reply) => {
  try {
    // Extract file and fields from the data object
    const { file, fields } = data;

    console.log("Received fields:", fields);

    if (!fields) {
      return reply.status(400).send({
        isSuccess: false,
        error: "No fields found in the request.",
      });
    }

    // Destructure required fields
    const {
      name,
      address,
      isOpen,
      ratings,
      about,
      amenities,
      storeTime,
      socialMedia,
      city,
      storeDate,
      storeLocation,
    } = fields;

    console.log("fields", fields);
    // Validate presence of name and address
    if (!name?.value || !address?.value || !socialMedia.value || !amenities.value) {
      return reply.status(400).send({
        isSuccess: false,
        error: "Name and address are required.",
      });
    }

    // Process and validate amenities
    let amenitiesArray = [];
    try {
      if (fields.amenities) {
        amenitiesArray = JSON.parse(fields.amenities.value);
      }
    } catch (error) {
      console.error("Error processing amenities:", error.message);
      return reply.status(400).send({
        isSuccess: false,
        error: "Invalid format for amenities.",
      });
    }
    console.log("Processed ameneties:", amenitiesArray);

    // Process and validate socialMedia
    let socialMediaArray = [];
    try {
      if (fields.socialMedia) {
        socialMediaArray = JSON.parse(fields.socialMedia.value);
      }
    } catch (error) {
      console.error("Error processing social media:", error.message);
      return reply.status(400).send({
        isSuccess: false,
        error: "Invalid format for social media.",
      });
    }

    console.log("Processed social media:", socialMediaArray);

    // Validate file upload
    const mimetype = fields.shopImage?.mimetype;
    const filename = fields.shopImage?.filename;

    if (!file || !mimetype || !filename) {
      return reply.status(400).send({
        isSuccess: false,
        error: "Shop image is required.",
      });
    }

    if (!["image/jpeg", "image/png"].includes(mimetype)) {
      return reply.status(400).send({
        isSuccess: false,
        error: "Only JPG and PNG images are allowed.",
      });
    }

    // Prepare Firebase Storage
    const storage = getStorage();
    const bucket = storage.bucket(); // Uses default Firebase bucket
    const shopUrl = name.value.toLowerCase().replace(/\s+/g, "-");
    const firebaseFile = bucket.file(`shops/${shopUrl}.jpg`);

    // Upload image to Firebase Storage (using streams)
    const uploadImageToFirebase = new Promise((resolve, reject) => {
      const fileStream = file.file || file;

      const stream = firebaseFile.createWriteStream({
        metadata: { contentType: mimetype },
      });

      fileStream.pipe(stream);

      stream.on("error", (err) => reject(err));
      stream.on("finish", () => {
        firebaseFile
          .getSignedUrl({
            action: "read",
            expires: "03-09-2491",
          })
          .then((signedUrls) => resolve(signedUrls[0]))
          .catch((error) => reject(error));
      });
    });

    const imageUrl = await uploadImageToFirebase;

    // Prepare the shop data for creation
    const newShop = new Shop({
      name: name.value,
      address: address.value,
      isOpen: isOpen?.value ?? true,
      ratings: ratings?.value ?? 0,
      about: about?.value,
      amenities: amenitiesArray,
      storeTime: storeTime?.value,
      city: city?.value,
      storeDate: storeDate?.value,
      socialMedia: socialMediaArray,
      storeLocation: storeLocation?.value,
      image: imageUrl,
    });

    // Save the shop to the database
    await newShop.save();

    console.log("Shop created successfully:", newShop);

    return reply.status(201).send({
      isSuccess: true,
      shop: newShop,
    });
  } catch (error) {
    console.error("Error creating shop:", error);

    return reply.status(500).send({
      isSuccess: false,
      error: "Failed to create shop.",
    });
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
    throw new Error("Failed to fetch shops");
  }
};

// Get a specific shop by ID
const getShopById = async (req, reply) => {
  try {
    const { shopId } = req.params;
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return reply
        .status(404)
        .send({ isSuccess: false, error: "Shop not found" });
    }

    reply.status(200).send({ isSuccess: true, shop });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ isSuccess: false, error: "Failed to fetch shop" });
  }
};

// Update a shop by ID
const updateShop = async (req, reply) => {
  try {
    const { shopId } = req.params;
    const {
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
      city,
    } = req.body;

    const updatedShop = await Shop.findByIdAndUpdate(
      shopId,
      {
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
      },
      { new: true }
    );

    if (!updatedShop) {
      return reply
        .status(404)
        .send({ isSuccess: false, error: "Shop not found" });
    }

    reply.status(200).send({
      isSuccess: true,
      message: "Shop updated successfully",
      shop: updatedShop,
    });
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ isSuccess: false, error: "Failed to update shop" });
  }
};

// Delete a shop by ID
const deleteShop = async (req, reply) => {
  try {
    const { shopId } = req.params;

    const deletedShop = await Shop.findByIdAndDelete(shopId);

    if (!deletedShop) {
      return reply
        .status(404)
        .send({ isSuccess: false, error: "Shop not found" });
    }

    reply
      .status(200)
      .send({ isSuccess: true, message: "Shop deleted successfully" });
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ isSuccess: false, error: "Failed to delete shop" });
  }
};

// Export the controller functions
export { createShop, getAllShops, getShopById, updateShop, deleteShop };

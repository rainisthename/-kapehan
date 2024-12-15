import mongoose from 'mongoose';

// Define the shop schema
const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3, // Ensure shop name is at least 3 characters long
    },
    address: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    ratings: {
      type: Number,
      min: 0, // Ratings cannot be negative
      max: 5, // Assuming a 5-star rating system
      default: 0,
    },
    about: {
      type: String,
      maxlength: 1000, // Optional: Limit the length of the description
    },
    amenities: {
      type: [String], // Array of amenities available at the shop
    },
    storeTime: {
      type: String, // Format: "9:00 AM - 9:00 PM"
    },
    storeDate: {
      type: Date, // Date when the store was established or added to the system
    },
    socialMedia: {
      type: [String], // Array of social media links as strings
    },
    storeLocation: {
      type: {
        type: String, // Must be 'Point'
        enum: ['Point'], // GeoJSON format
        required: true,
      },
      coordinates: {
        type: [Number], // Longitude, Latitude
        required: true,
      },
    },
    image: {
      type: String, // URL of the shop image
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create a 2dsphere index for geo queries
shopSchema.index({ storeLocation: '2dsphere' });

// Create the Shop model
const Shop = mongoose.model('Shop', shopSchema);

export default Shop;

"use client";
import React, { useState } from "react";
import AmenitySelection from "../../../components/AmenitySelector";
import AlertModal from "../../../components/Alert";
import ImageUpload from "../../../components/ImageUpload";
import StoreTime from "../../../components/StoreTime";
import { createShop } from "../../../../data/shopsAPiSlice";
import { PuffLoader } from "react-spinners"; // If you are using this loader for the loading state

const DashboardForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    about: "",
    openTime: "",
    closeTime: "",
    shopImage: null,
    amenities: [],
    socialMedia: [
      { platform: "facebook", url: "" },
      { platform: "instagram", url: "" },
      { platform: "twitter", url: "" },
    ],
  });

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ message: "", type: "" });

  const availableAmenities = ["Wi-Fi", "Pet-friendly", "Outdoor Seating", "Electric Socket"];
  const cities = [
    "Manila", 
    "Caloocan", 
    "Las Piñas", 
    "Makati", 
    "Malabon", 
    "Mandaluyong", 
    "Marikina", 
    "Muntinlupa", 
    "Navotas", 
    "Parañaque", 
    "Pasay", 
    "Pasig", 
    "Quezon City", 
    "San Juan", 
    "Taguig", 
    "Valenzuela" 
  ];

  const handleAmenityClick = (amenity) => {
    const updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((item) => item !== amenity) // Remove if exists
      : [...selectedAmenities, amenity]; // Add if not exists

    setSelectedAmenities(updatedAmenities);
    setFormData((prevState) => ({
      ...prevState,
      amenities: updatedAmenities,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors({ ...errors, [name]: "" });
  };

  const handleSocialMediaChange = (e, index) => {
    const { value } = e.target;

    const updatedSocialMedia = [...formData.socialMedia];
    updatedSocialMedia[index] = { ...updatedSocialMedia[index], url: value };

    setFormData((prevState) => ({
      ...prevState,
      socialMedia: updatedSocialMedia,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.about.trim()) newErrors.about = "About section is required.";
    if (!formData.openTime) newErrors.openTime = "Opening time is required.";
    if (!formData.closeTime) newErrors.closeTime = "Closing time is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      city: "",
      about: "",
      shopImage: null,
      openTime: "",
      closeTime: "",
      amenities: [],
      socialMedia: [
        { platform: "facebook", url: "" },
        { platform: "instagram", url: "" },
        { platform: "twitter", url: "" },
      ],
    });
    setSelectedAmenities([]);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
  
    const storeTime = `${formData.openTime} AM - ${formData.closeTime} PM`;
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("city", formData.city);
    formDataToSubmit.append("about", formData.about);
    formDataToSubmit.append("storeTime", storeTime);

    if (formData.shopImage) {
      formDataToSubmit.append("shopImage", formData.shopImage);
    }

    formDataToSubmit.append("amenities", JSON.stringify(formData.amenities));
    formDataToSubmit.append("socialMedia", JSON.stringify(formData.socialMedia));

    console.log([...formDataToSubmit.entries()]);

    try {
      await createShop(formDataToSubmit);
      setLoading(false);
      resetForm();
      setAlert({
        message: "Store created successfully!",
        type: "success",
      });
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
    } catch (error) {
      setLoading(false);
      setAlert({
        message: "Error creating store. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="font-poppins p-6 relative">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <PuffLoader color="#ffffff" size={60} />
        </div>
      )}

      {alert.message && (
        <AlertModal
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter store name"
            className={`w-full px-4 py-3 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter store address"
              className={`w-full px-4 py-3 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300`}
            >
              <option value="" disabled>
                Select city
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us about the store"
            className={`w-full px-4 py-3 border ${
              errors.about ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300`}
          ></textarea>
          {errors.about && (
            <p className="text-red-500 text-sm mt-1">{errors.about}</p>
          )}
        </div>

        <AmenitySelection
          availableAmenities={availableAmenities}
          selectedAmenities={selectedAmenities}
          onSelectAmenity={handleAmenityClick}
        />

        <StoreTime
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />

        <label className="block text-gray-700 font-medium mb-2">
          Social Media Links
        </label>
        {formData.socialMedia.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              name="url"
              value={item.url || ""}
              onChange={(e) => handleSocialMediaChange(e, index)}
              placeholder={`${
                item.platform.charAt(0).toUpperCase() + item.platform.slice(1)
              } URL`}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 mb-2"
            />
          </div>
        ))}

        <ImageUpload
          setFormData={setFormData}
          formData={formData}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardForm;

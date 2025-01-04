"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PuffLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa";
import AlertModal from "../../../components/Alert"; // Corrected import for AlertModal

const DashboardForm = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    about: "",
    facebook: "",
    instagram: "",
    twitter: "",
    openTime: "",
    closeTime: "",
  });
  const [alert, setAlert] = useState({ message: "", type: "" }); // State for alert

  const availableAmenities = ["Free Wi-Fi", "Pet-friendly", "Outdoor Seating"];
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

  const handleAmenityClick = (amenity) => {
    if (!selectedAmenities.includes(amenity)) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const removeAmenity = (amenity) => {
    setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setFormData({
        name: "",
        address: "",
        city: "",
        about: "",
        facebook: "",
        instagram: "",
        twitter: "",
        openTime: "",
        closeTime: "",
      });
      setSelectedAmenities([]);
      setImagePreview(null);

      // Show success alert
      setAlert({
        message: "Store created successfully!",
        type: "success",
      });

      // Hide the alert after 3 seconds
      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);
    }, 2000);
  };

  return (
    <div className="font-poppins p-6 relative">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <PuffLoader color="#ffffff" size={60} />
        </div>
      )}

      {/* Alert Modal */}
      {alert.message && <AlertModal message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter store name"
            className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter store address"
              className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300`}
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
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
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
            className={`w-full px-4 py-3 border ${errors.about ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300`}
          ></textarea>
          {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Store Time</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              name="openTime"
              value={formData.openTime}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.openTime ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300`}
            />
            <input
              type="time"
              name="closeTime"
              value={formData.closeTime}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.closeTime ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300`}
            />
          </div>
          {errors.openTime && <p className="text-red-500 text-sm mt-1">{errors.openTime}</p>}
          {errors.closeTime && <p className="text-red-500 text-sm mt-1">{errors.closeTime}</p>}
        </div>
        
        {/* Social Media and Submit Button */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Social Media</label>
          <div className="space-y-3">
            <input
              type="url"
              placeholder="Facebook URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <input
              type="url"
              placeholder="Instagram URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <input
              type="url"
              placeholder="Twitter URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-200"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardForm;

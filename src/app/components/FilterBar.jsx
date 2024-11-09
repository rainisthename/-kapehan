"use client";
import React, { useState } from "react";
import AmenitiesCheckbox from "./Ameneties";
import { BiFilter } from "react-icons/bi";

const FilterBar = () => {
  const [priceRange, setPriceRange] = useState([100, 50000]);
  const [openNow, setOpenNow] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState(""); // Initialize city state

  const handlePriceChange = (e) => {
    const value = e.target.value.split(",").map(Number);
    setPriceRange(value);
  };

  const clearAllFilters = () => {
    setPriceRange([100, 50000]);
    setOpenNow(false);
    setRecommended(false);
    setCity(""); // Clear city input when clearing filters
  };

  return (
    <div>
      {/* Hamburger Menu for Mobile View */}
      <div className="grid grid-cols-1 md:hidden">
        <div className="pl-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 px-3 py-1.5 bg-gray-200 text-black rounded-full shadow-xs hover:bg-gray-300"
          >
            <BiFilter />
            <span className="text-sm font-medium">Filter</span>
          </button>
        </div>
      </div>

      {/* Sidebar for Filters */}
      <div
        className={`fixed inset-0 bg-white p-6 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-64 md:h-screen overflow-y-auto md:z-0 z-50`}
      >
        {/* Close Button (only for mobile view) */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-blue-600 transition duration-150 md:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {/* Location Filter */}
        <div className="mb-6">
          <label className="block text-sm font-poppins mb-2 text-gray-700">
            City
          </label>
          <select className="w-full p-2 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150">
            <option value="">Select City</option>
            <option value="yes">Makati</option>
            <option value="no">Quezon City</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <label className="block text-sm font-poppins mb-2 text-gray-700">
            Price Range
          </label>
          <input
            type="range"
            min="100"
            max="50000"
            step="100"
            value={priceRange[0]} // Bind the first value of price range
            onChange={(e) => {
              const newValue = Number(e.target.value);
              setPriceRange([newValue, priceRange[1]]);
            }}
            className="w-full"
          />
          <input
            type="range"
            min="100"
            max="50000"
            step="100"
            value={priceRange[1]} // Bind the second value of price range
            onChange={(e) => {
              const newValue = Number(e.target.value);
              setPriceRange([priceRange[0], newValue]);
            }}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₱{priceRange[0]}</span>
            <span>₱{priceRange[1]}</span>
          </div>
        </div>

        {/* Wi-Fi Availability Filter */}
        <AmenitiesCheckbox />

        {/* Newest to Oldest Filter */}
        <div className="mb-6">
          <label className="block text-sm font-poppins mb-2 text-gray-700">
            Sort By
          </label>
          <select className="w-full p-2 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150">
            <option value="">Select sorting option</option>
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
          </select>
        </div>

        {/* Open Now Checkbox */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="openNow"
            checked={openNow}
            onChange={() => setOpenNow(!openNow)}
            className="mr-2"
          />
          <label
            htmlFor="openNow"
            className="text-sm font-poppins text-gray-700"
          >
            Open Now
          </label>
        </div>

        {/* Recommended Checkbox */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="recommended"
            checked={recommended}
            onChange={() => setRecommended(!recommended)}
            className="mr-2"
          />
          <label
            htmlFor="recommended"
            className="text-sm font-poppins text-gray-700"
          >
            Recommended
          </label>
        </div>

        {/* Clear All Filters Button */}
        <button
          onClick={clearAllFilters}
          className="mt-6 w-full py-2 bg-gray-600 text-white rounded focus:outline-none hover:bg-gray-400 transition duration-150 font-poppins"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterBar;

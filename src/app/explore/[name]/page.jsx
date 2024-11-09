"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image"; // Optional if you want to use Next.js Image component
import coffeeShop from "../../../../public/images/coffeeshop.jpg";
import { FaWifi, FaParking, FaSwimmingPool } from "react-icons/fa";
import { SiSocketdotio } from "react-icons/si";
import { MdOutlineBathroom } from "react-icons/md";

import ReviewList from "../../components/Reviews";
import { FaClock } from "react-icons/fa6";
import MapComponent from "../../components/GoogleMaps";
const drinks = [
  {
    name: "Spanish Latte",
    description: "A delightful blend of rich espresso and creamy milk.",
    sizes: [
      { size: "12 oz", price: 140 },
      { size: "16 oz", price: 170 },
    ],
  },
  {
    name: "Macchiato",
    description: "Espresso topped with a dollop of foamed milk.",
    sizes: [
      { size: "12 oz", price: 130 },
      { size: "16 oz", price: 160 },
    ],
  },
  {
    name: "Cappuccino",
    description: "A perfect mix of espresso, steamed milk, and foam.",
    sizes: [
      { size: "12 oz", price: 150 },
      { size: "16 oz", price: 180 },
    ],
  },
  {
    name: "Americano",
    description: "Espresso diluted with hot water for a smooth finish.",
    sizes: [
      { size: "12 oz", price: 120 },
      { size: "16 oz", price: 150 },
    ],
  },
  {
    name: "Flat White",
    description: "A velvety texture of espresso with microfoam milk.",
    sizes: [
      { size: "12 oz", price: 160 },
      { size: "16 oz", price: 190 },
    ],
  },
  {
    name: "Mocha",
    description: "A delicious blend of chocolate, espresso, and milk.",
    sizes: [
      { size: "12 oz", price: 160 },
      { size: "16 oz", price: 190 },
    ],
  },
];

const amenities = [
  { label: "WiFi Connection", icon: FaWifi },
  { label: "Parking", icon: FaParking },
  { label: "Electric Socket", icon: SiSocketdotio },
  { label: "Bathroom", icon: MdOutlineBathroom  },

];

const desserts = [
  {
    name: "Cheesecake",
    description: "Rich and creamy",
    sizes: [{ size: "Slice", price: 120 }],
  },
  // Add more dessert items here...
];

export default function CoffeeShopDetail() {
  const params = useParams();
  const { name } = params; // Extracts the 'name' part from the URL

  const [activeTab, setActiveTab] = useState("coffee"); // State to manage the active tab

  const formattedName = decodeURIComponent(name).replace(/-/g, " ");

  const parallaxStyle = {
    backgroundImage: `url(${coffeeShop.src})`, // Use .src when using the Image import
    minHeight: "60vh",
    backgroundAttachment: "fixed",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  const centerTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  };

  const latitude = 14.5995; // Example latitude
  const longitude = 120.9842; // Example longitude

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <div className="parallax" style={parallaxStyle}>
        <div style={overlayStyle}></div>
        <div style={centerTextStyle} className="w-[90%] md:w-[60%]">
          <p className="text-4xl md:text-5xl lg:text-8xl font-poppins-bold text-white pb-5">
            {formattedName}
          </p>
          <p className="text-sm sm:text-xl font-poppins text-white">
            Pinagsama Village, EP Housing 2
          </p>
          <div className="flex justify-center items-center space-x-1 sm:space-x-4 mt-5">
            {/* First badge */}
            <div className="inline-flex items-center space-x-2 font-poppins bg-gray-200 text-black py-2 px-4 rounded-full">
              <FaClock size={18} />
              <span className="text-base">Open</span>
            </div>

            {/* Second badge */}
            <div className="inline-flex items-center space-x-2 font-poppins bg-gray-200 text-black py-2 px-4 rounded-full">
              <span className="text-yellow-500 font-poppins-bold">★</span>
              <span className="text-xs 2xl:text-sm font-poppins text-[#4b4b4d] ml-1">
                4.5
              </span>
            </div>
          </div>

          {/* Placeholder for additional content */}
        </div>
      </div>
      <div className="mx-[5%] mt-[20%] sm:mt-[5%] text-center">
        <div className="flex flex-col lg:flex-row items-start justify-between">
          {/* Amenities Section */}
          <div className="lg:w-1/2 w-full flex flex-col items-start lg:pr-8 mb-8 lg:mb-0">
            {/* First Amenities Section */}
            <div className="mb-6 w-full">
              <p className="text-4xl md:text-3xl lg:text-2xl font-poppins-bold text-gray-600 mb-4 text-left">
                Amenities
              </p>
              <div className="flex flex-wrap justify-start gap-4">
                {amenities.map((amenity, index) => {
                  const IconComponent = amenity.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-2 font-poppins bg-gray-200 text-black py-2 px-4 rounded-full"
                    >
                      <IconComponent size={18} />
                      <span className="text-xs">{amenity.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Second Amenities Section (Duplicated for Demonstration, can be customized) */}
            <div className="w-full">
              <p className="text-4xl md:text-3xl lg:text-2xl font-poppins-bold text-gray-600 mb-4 text-left">
                Store Time
              </p>
              <div className="flex flex-wrap justify-start gap-4">
                <div className="flex items-center space-x-2 font-poppins bg-gray-200 text-black py-2 px-4 rounded-full">
                  <FaClock size={18} />
                  <span className="text-xs">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center space-x-2 font-poppins bg-gray-200 text-black py-2 px-4 rounded-full">
                  <FaClock size={18} />
                  <span className="text-xs">Sunday - Monday</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:w-1/2 w-full">
            <MapComponent lat={latitude} lng={longitude} />
          </div>
        </div>

        <div className="mx-[5%] mt-[5%]">
          {/* Main Title */}
          <p className="text-4xl md:text-3xl lg:text-4xl font-mona-black text-gray-600 mb-4 text-center">
            {activeTab === "coffee" ? "Coffee Menu" : "Dessert Menu"}
          </p>

          {/* Tab Navigation below the Title */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              className={`px-4 py-2 font-bold rounded-full transition-all duration-300 ${
                activeTab === "coffee"
                  ? "bg-[#5f4429] text-white shadow-lg transform hover:scale-110"
                  : "bg-gray-200 text-gray-600 transform hover:scale-105"
              }`}
              onClick={() => setActiveTab("coffee")}
            >
              Coffee
            </button>
            <button
              className={`px-4 py-2 font-bold rounded-full transition-all duration-300 ${
                activeTab === "dessert"
                  ? "bg-[#5f4429] text-white shadow-lg transform hover:scale-110"
                  : "bg-gray-200 text-gray-600 transform hover:scale-105"
              }`}
              onClick={() => setActiveTab("dessert")}
            >
              Dessert
            </button>
          </div>

          {/* Content Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 max-w-96 sm:max-w-none m-auto transition-opacity duration-500"
            style={{ opacity: activeTab === "coffee" ? 1 : 0.8 }}
          >
            {(activeTab === "coffee" ? drinks : desserts).map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white shadow-lg rounded-lg mb-5 pb-5 p-6"
              >
                <p className="text-[#5f4429] font-poppins-bold text-2xl mb-1 text-center transition-colors duration-300">
                  {item.name}
                </p>
                <p className="text-[#4b4b4d] font-poppins text-xs text-center italic mb-2">
                  {item.description}
                </p>
                <div className="mt-3 space-y-1">
                  {item.sizes.map((size, sizeIndex) => (
                    <p
                      key={sizeIndex}
                      className="text-[#4b4b4d] font-poppins text-sm text-center"
                    >
                      {size.size}:{" "}
                      <span className="font-poppins-bold text-[#5f4429]">
                        ₱{size.price}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center pt-[5%] pb-[5%]">
            <p className="text-4xl md:text-3xl lg:text-4xl font-mona-black text-gray-600 mb-4">
              Shop Reviews
            </p>
            <ReviewList />
          </div>
        </div>
      </div>
    </div>
  );
}

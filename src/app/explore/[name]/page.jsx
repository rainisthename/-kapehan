"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image"; // Optional if you want to use Next.js Image component
import coffeeShop from "../../../../public/images/coffeeshop.jpg";
import {
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaFacebook,
  FaInstagramSquare,
} from "react-icons/fa";
import { SiSocketdotio } from "react-icons/si";
import { MdOutlineBathroom } from "react-icons/md";

import ReviewList from "../../components/Reviews";
import { FaClock } from "react-icons/fa6";
import MapComponent from "../../components/GoogleMaps";
import Modal from "../../components/RatingModal";
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
  { label: "Bathroom", icon: MdOutlineBathroom },
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
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

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
      <div className="mx-[5%] mt-[20%] sm:mt-[5%] text-center pb-5">
        <div className="flex flex-col lg:flex-row items-start justify-between">
          {/* Amenities Section */}
          <div className="lg:w-1/2 w-full flex flex-col items-start lg:pr-8 mb-8 lg:mb-0">
            {/* First Amenities Section */}
            <div className="mb-6 w-full">
              <p className="text-4xl md:text-3xl lg:text-2xl font-poppins-bold text-gray-600 mb-4 text-left">
                About
              </p>
              <div className="flex flex-wrap justify-start gap-4">
                <p className="font-poppins text-gray-600 text-left text-base">
                  Green Beans Café is your go-to spot for fresh coffee and chill
                  vibes. Enjoy handpicked beans brewed into your favorite
                  drinks, from creamy lattes to bold espressos. Pair your cup
                  with tasty pastries or snacks. It’s the perfect hangout for
                  relaxing, working, or catching up. Sip, savor, and stay!
                </p>
              </div>
            </div>
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

            <div className="w-full mt-5">
              <p className="text-4xl md:text-3xl lg:text-2xl font-poppins-bold text-gray-600 mb-4 text-left">
                Social Media
              </p>
              <div className="flex flex-wrap justify-start gap-4">
                <div className="flex items-center space-x-2 font-poppins bg-gray-200 text-black py-2 px-4 rounded-full">
                  <FaFacebook size={18} />
                  <span className="text-xs">Facebook</span>
                </div>
                <div className="flex items-center space-x-2 font-poppins bg-gray-200 text-black py-2 px-4 rounded-full">
                  <FaInstagramSquare size={18} />
                  <span className="text-xs">Instagram</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:w-1/2 w-full">
            <MapComponent lat={latitude} lng={longitude} />
          </div>
        </div>

        <div className="mt-[5%] pb-5">
          <p className="text-4xl md:text-3xl lg:text-3xl font-inter-black text-gray-600 mb-4 text-left flex items-center">
            Recommendations
            <span className="ml-2 text-lg md:text-base lg:text-base font-inter text-gray-500">
              (10)
            </span>
          </p>
          <ReviewList />
        </div>
        <button
          onClick={() => setShowModal(true)} // Show modal when button is clicked
          className="px-8 py-3 md:px-10 md:py-4 bg-white text-gray-800 rounded-full font-poppins cursor-pointer border border-gray-800 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
        >
          Write a review
        </button>

        {/* Modal component with show and close handlers */}
        <Modal show={showModal} onClose={handleCloseModal} />
      </div>
    </div>
  );
}

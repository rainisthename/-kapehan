"use client";
import React, { useState } from "react";
import Image from "next/image";
import maps from "../../../public/images/vector-maps-street.jpg";
import CoffeeCard from "../components/CoffeeCard";
import coffeeShop from "../../../public/images/coffeeshop.jpg"; // Replace with your actual image paths

const CoffeeShopLocator = ({ card }) => {
  const cards = [
    {
      id: 1,
      title: "Dream Coffee Shop",
      image: coffeeShop,
      rating: 4.5,
      address: "Pinagsama Village EP Housing 2",
      city: "Taguig",
    },
    {
      id: 2,
      title: "Malikhain Coffee Shop",
      image: coffeeShop,
      rating: 4.7,
      address: "Pinagsama Village EP Housing 2",
      city: "Makati",
    },
    {
      id: 3,
      title: "Rooftop Coffee Shop",
      image: coffeeShop,
      rating: 4.3,
      address: "Pinagsama Village EP Housing 2",
      city: "San Juan",
    },
    {
      id: 4,
      title: "Rooftop Coffee Shop",
      image: coffeeShop,
      rating: 5.3,
      address: "Pinagsama Village EP Housing 2",
      city: "San Juan",
    },
  ];

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col  justify-start">
      {/* Hero Section */}
      <div className="relative w-full shadow-2xl">
        <div className="relative w-full h-screen md:h-[60vh] flex flex-col justify-between">
          <div className="absolute inset-0">
            <Image
              src={maps}
              alt="Coffee Shop Map"
              className={`object-cover transition-opacity duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              fill
              onLoad={() => setIsLoaded(true)}
              onError={() => setIsLoaded(true)}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-800 bg-opacity-60"></div>
          </div>

          {/* Content */}
          <div className="relative flex flex-col justify-center items-center text-center text-white px-6 z-10 h-full">
            <p className="text-lg md:text-xl max-w-2xl mb-6 leading-relaxed font-poppins">
              Discover the best coffee shops near you and make your coffee time
              special.
            </p>

            {/* Search Section */}
            <div className="relative bg-white bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Type your location"
                  className="p-3 w-full text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
                />
                <input
                  type="text"
                  placeholder="Add a second location"
                  className="p-3 w-full text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
                />
                <button className="px-6 py-3 text-white bg-gray-700 hover:bg-gray-800 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600">
                  Search Coffee Shops
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mx-[2%] mt-[2%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
          {cards.map((card) => (
            <CoffeeCard key={card.id} card={card} />
          ))}
        </div>
      </section>{" "}
    </div>
  );
};

export default CoffeeShopLocator;

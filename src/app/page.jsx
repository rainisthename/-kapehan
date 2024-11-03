"use client";
import Image from "next/image";
import coffeeShop from "../../public/images/coffeeshop.jpg"; // Replace with your actual image paths
import { useState } from "react";
import Footer from "./components/Footer";
// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="animate-pulse">
      <div className="h-40 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 mb-2"></div>
        <div className="flex items-center">
          <div className="h-5 w-5 bg-gray-300 rounded-full mr-1"></div>
          <div className="h-4 bg-gray-300 w-16"></div>
        </div>
      </div>
    </div>
  </div>
);

// Card Component
const CoffeeCard = ({ card }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && <SkeletonLoader />} {/* Show skeleton loader if not loaded */}
      
      <div
        className={`relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 ${
          isLoaded ? "" : "invisible"
        }`}
      >
        <div className="relative w-full h-56"> {/* Set height to your desired value */}
          <Image
            src={card.image}
            alt={card.title}
            className="object-cover transition-opacity duration-300"
            fill // Use fill instead of layout="responsive"
            onLoad={() => setIsLoaded(true)} // Update state on load
            onError={() => setIsLoaded(true)} // Also update state on error
          />

          {/* Rating at the top right */}
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow-md">
            <span className="text-yellow-500 font-poppins-bold">★</span>
            <span className="text-sm font-poppins text-[#4b4b4d] ml-1">
              {card.rating}
            </span>
          </div>
          <div className="absolute bottom-2 left-2 bg-white rounded-full px-2 py-1 shadow-md">
            <p className="text-sm font-poppins text-gray-600">{card.city}</p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xl font-poppins-bold text-[#5f4429]">
            {card.title}
          </p>
          <span className="text-xs font-poppins text-[#4b4b4d]">
            {card.address}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  // Sample data for demonstration
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
      rating: 4.3,
      address: "Pinagsama Village EP Housing 2",
      city: "Quezon City",
    },
  ];

  return (
    <div className="bg-[#FAF7F2] flex flex-col min-h-screen">
      <div className="mx-8 md:mx-[10%] flex-grow">
        <section className="pt-14 text-left md:text-center">
          <h1 className="text-5xl lg:text-4xl xl:text-6xl tracking-wider 2xl:text-8xl text-[#5f4429] mb-5 font-poppins-extra-bold">
            Discover Your Perfect Coffee Spot in Metro Manila
          </h1>
          <p className="mt-4 text-sm md:text-base xl:text-lg 2xl:text-xl text-[#4b4b4d] font-poppins">
            Finding the perfect coffee shop in Metro Manila is now easier.
            Kapehan offers a curated list of the city's best spots. Discover
            Metro Manila's vibrant coffee scene with us today!
          </p>
          <div className="flex justify-start md:justify-center mt-6">
            <button className="pulse-button px-8 py-3 md:px-10 md:py-4 bg-[#5f4429] text-white rounded-full font-mona-semibold cursor-pointer">
              Find Coffee Shops
            </button>
          </div>
        </section>

        <section className="mt-[10%]">
          <p className="text-4xl md:text-7xl font-bold text-[#5f4429] mb-8 font-mona-black">
            Popular Coffee Shops
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
            {cards.map((card) => (
              <CoffeeCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        <section className="my-[5%]">
          <p className="text-4xl md:text-7xl font-bold text-[#5f4429] mb-8 font-mona-black">
            Our Story & Blogs
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-96 sm:max-w-none m-auto">
            <div className="flex flex-col items-center">
              <div className="w-full h-[370px] bg-[#5f4429] rounded-[20px]"></div>
              <p className="text-[#5f4429] font-mona-extrabold text-2xl mt-5 mb-3 w-full text-left ">
                Coffee & Dream: The Start of kapehan.ph
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Footer should be placed outside the content container */}
      
    </div>
  );
}

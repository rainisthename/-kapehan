"use client";
import { SkeletonLoader } from "./SkeletonLoader";
import { useState } from "react";
import Image from "next/image";

export default function CoffeeCard({ card }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && <SkeletonLoader />}{" "}
      {/* Show skeleton loader if not loaded */}
      <div
        className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
          isLoaded ? "" : "invisible"
        }`}
      >
        <div className="relative w-full h-36 2xl:h-52">
          {" "}
          {/* Set height to your desired value */}
          <Image
            src={card.image}
            alt={card.title}
            className="object-cover transition-opacity duration-300"
            fill // Use fill instead of layout="responsive"
            onLoad={() => setIsLoaded(true)} // Update state on load
            onError={() => setIsLoaded(true)} // Also update state on error
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Define sizes for different viewport widths
            priority // Mark the image as priority for LCP
          />
          {/* Rating at the top right */}
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow-md">
            <span className="text-yellow-500 font-poppins-bold">★</span>
            <span className="text-xs 2xl:text-sm font-poppins text-[#4b4b4d] ml-1">
              {card.rating}
            </span>
          </div>
          <div className="absolute bottom-2 left-2 bg-white rounded-full px-2 py-1 shadow-md">
            <p className="text-xs 2xl:text-sm font-poppins text-gray-600">
              {card.city}
            </p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm 2xl:text-xl font-poppins-bold text-[#5f4429]">
            {card.title}
          </p>
          <span className="text-xs 2xl:text-xs font-poppins text-[#4b4b4d]">
            {card.address}
          </span>
        </div>
      </div>
    </div>
  );
}

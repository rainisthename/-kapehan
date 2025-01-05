import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Import FaTrash from react-icons

const AmenitySelector = ({ availableAmenities, selectedAmenities, onSelectAmenity, onRemoveAmenity }) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">Amenities</label>
      <div className="flex space-x-2 mb-3">
        {availableAmenities.map((amenity) => (
          <button
            type="button"
            key={amenity}
            onClick={() => onSelectAmenity(amenity)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition-all"
          >
            {amenity}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedAmenities.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-lg"
          >
            {amenity}
            <button
              type="button"
              onClick={() => onRemoveAmenity(amenity)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <FaTrash className="w-4 h-4" /> {/* Replace the <i> tag with FaTrash */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitySelector;

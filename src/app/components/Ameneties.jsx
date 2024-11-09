import { useState } from "react";

const AmenitiesCheckbox = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  
  // List of available amenities
  const amenities = [
    { id: "wifi", label: "Wi-Fi" },
    { id: "sockets", label: "Sockets" },
    { id: "charging", label: "Charging Station" },
    { id: "bathroom", label: "Bathroom" },
  ];

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    
    if (checked) {
      // Add the selected amenity
      setSelectedAmenities((prev) => [...prev, id]);
    } else {
      // Remove the unselected amenity
      setSelectedAmenities((prev) => prev.filter((amenity) => amenity !== id));
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-poppins mb-2 text-gray-700">Amenities</label>
       {/* Display selected amenities with styles */}


      <div className="flex flex-col">
        {amenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={amenity.id}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor={amenity.id} className="text-sm font-poppins text-gray-700">
              {amenity.label}
            </label>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default AmenitiesCheckbox;

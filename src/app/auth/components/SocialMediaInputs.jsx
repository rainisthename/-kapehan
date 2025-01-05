import React from "react";

const SocialMediaInputs = ({ socialMedia = [], onSocialMediaChange }) => {
    return (
        <div>
          <label className="block text-gray-700 font-medium mb-2">Social Media Links</label>
          {socialMedia.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                name={item.platform}  // Ensures each input has a unique name based on the platform
                value={item.url || ""}  // Ensure input's value is bound to the 'url' property
                onChange={(e) => onSocialMediaChange(e, index)}  // Handle change event
                placeholder={`${item.platform.charAt(0).toUpperCase() + item.platform.slice(1)} URL`}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 mb-2"
              />
            </div>
          ))}
        </div>
      );
    
};

export default SocialMediaInputs;

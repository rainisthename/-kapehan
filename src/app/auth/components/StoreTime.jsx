import React from 'react';

const StoreTime = ({ formData, handleChange, errors }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-700 font-medium mb-2">Opening Time</label>
      <input
        type="time"
        name="openTime"
        value={formData.openTime}
        onChange={handleChange}
        className={`w-full px-4 py-3 border ${
          errors.openTime ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300`}
      />
      {errors.openTime && (
        <p className="text-red-500 text-sm mt-1">{errors.openTime}</p>
      )}
    </div>
    <div>
      <label className="block text-gray-700 font-medium mb-2">Closing Time</label>
      <input
        type="time"
        name="closeTime"
        value={formData.closeTime}
        onChange={handleChange}
        className={`w-full px-4 py-3 border ${
          errors.closeTime ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300`}
      />
      {errors.closeTime && (
        <p className="text-red-500 text-sm mt-1">{errors.closeTime}</p>
      )}
    </div>
  </div>
);

export default StoreTime;

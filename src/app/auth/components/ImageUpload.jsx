import React from 'react';

const ImageUpload = ({ setFormData, formData, imagePreview, setImagePreview }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        shopImage: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">Store Image</label>
      <input
        type="file"
        accept="image/*"
        className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;

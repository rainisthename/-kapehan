// components/Modal.js
import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa"; // Importing icons from react-icons

const Modal = ({ show, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    // Check if all required fields are filled
    if (!rating || !review) {
      alert("Please fill in all fields, including rating.");
      return;
    }

    // Handle the review submission
    console.log("Review Submitted:", { review, rating });
    onClose(); // Close the modal after submission
  };

  return (
    show && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-96 md:w-[500px]">
          {/* Header with Title */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-poppins-semibold text-gray-800">Write a Review</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">
              <FaTimes />
            </button>
          </div>


          {/* Rating Section */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-poppins text-left mb-2">Rating</label>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`cursor-pointer text-3xl ${rating > index ? "text-yellow-500" : "text-gray-400"}`}
                  onClick={() => handleRatingClick(index)}
                >
                  <FaStar />
                </span>
              ))}
            </div>
          </div>

          {/* Review Section */}
          <div className="mb-6">
            <label htmlFor="review" className="block text-left text-gray-700 text-lg font-poppins mb-2">
              Your Review
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Write your review here"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-gray-400 text-white px-8 py-3 rounded-full font-poppins hover:bg-gray-600 transition duration-300"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;

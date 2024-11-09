import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Mark Lester",
    date: "January 5, 2024",
    rating: 4,
    comment: "Best new coffee shop in town",
  },
  {
    name: "Jane Smith",
    date: "January 5, 2024",
    rating: 4,
    comment: "Very friendly staff and cozy atmosphere. I enjoyed my visit!",
  },
  {
    name: "John Appleseed",
    date: "January 5, 2024",
    rating: 5,
    comment: "The best coffee I’ve had in a while. Totally worth the visit!",
  },
  {
    name: "John Appleseed",
    date: "January 5, 2024",
    rating: 5,
    comment: "The best coffee I’ve had in a while. Totally worth the visit!",
  },
  {
    name: "John Appleseed",
    date: "January 5, 2024",
    rating: 5,
    comment: "The best coffee I’ve had in a while. Totally worth the visit!",
  },
];

export default function ReviewList() {
  return (
    <div className="bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg transition-all transform flex flex-col justify-between"
          >
            {/* Comment */}
            <p className="text-base text-gray-400 italic leading-relaxed font-poppins-bold pt-5 text-center">
              &quot;{review.comment}&quot;
            </p>

            {/* Name, Date, Rating */}
            <div className="flex flex-col items-center mt-5">
              <p className="text-sm font-poppins text-gray-900">
                {review.name}
              </p>
              <div className="flex items-center space-x-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              {review.date && (
                <p className="text-xs font-poppins text-gray-500 mt-2">
                  {review.date}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

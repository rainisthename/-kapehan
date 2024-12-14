import { FaRegBuilding } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoStarSharp } from "react-icons/io5";

const StatsCards = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Total Coffee Shops */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center items-center mb-4">
            <span className="inline-block bg-blue-100 p-3 rounded-full text-blue-500">
              <FaRegBuilding />
            </span>
          </div>
          <h2 className="text-gray-600 text-sm uppercase mb-2 font-poppins">Total Of Coffee Shops</h2>
          <p className="text-2xl font-bold">4.5K</p>
          <p className="text-blue-500 text-sm font-medium">+34%</p>
        </div>

        {/* Total Visitors */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center items-center mb-4">
            <span className="inline-block bg-purple-100 p-3 rounded-full text-purple-500">
            <FiUsers />
            </span>
          </div>
          <h2 className="text-gray-600 text-sm uppercase mb-2 font-poppins">Total Visitors</h2>
          <p className="text-2xl font-bold">300</p>
          <p className="text-purple-500 text-sm font-medium">+34%</p>
        </div>

        {/* Total Earnings */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center items-center mb-4">
            <span className="inline-block bg-red-100 p-3 rounded-full text-yellow-500">
              <IoStarSharp />
            </span>
          </div>
          <h2 className="text-gray-600 text-sm uppercase mb-2 font-poppins">Total ratings</h2>
          <p className="text-2xl font-bold">$30K</p>
          <p className="text-red-500 text-sm font-medium">-12%</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;

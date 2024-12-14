"use client";
import { AiOutlineUser } from 'react-icons/ai'; // Profile icon

const AppBar = () => {
  return (
<div className="flex justify-between items-center bg-white text-gray-600 shadow-sm p-4 px-6 border-b border-gray-200">
  <div className="ml-auto flex items-center space-x-4">
    {/* Notification Icon */}
    <div className="relative flex items-center space-x-2">
      {/* Profile Icon with Circle */}
      <div className="w-8 h-8 flex justify-center items-center bg-gray-200 rounded-full">
        <AiOutlineUser className="text-xl text-gray-600" />
      </div>
      {/* Logout Button */}
      <button className="flex items-center space-x-2 px-4 py-1 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition">
        <p className="font-poppins">Logout</p>
      </button>
    </div>
  </div>
</div>

  );
}

export default AppBar;

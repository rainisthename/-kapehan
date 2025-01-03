"use client";
import { useState } from "react";
import Link from "next/link";
import { IoHomeOutline, IoCubeOutline } from "react-icons/io5";
import { FaUsers, FaClipboardList, FaSignOutAlt, FaRegBuilding } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to toggle sidebar

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-screen-min bg-white text-gray-600 p-4 transition-all duration-500 ease-in-out 
      ${
        isCollapsed ? "w-20" : "w-64"
      } shadow-lg border-r border-gray-200 overflow-hidden relative`} // Make the sidebar relative
    >
      {/* Sidebar Menu */}
      <ul className="space-y-3 mt-6">
        <li>
          <Link
            href="/auth/dashboard"
            className="flex items-center space-x-3 text-gray-600 hover:bg-gray-100 p-3 rounded-md transition-all duration-300 font-poppins text-sm"
          >
            <span className="text-xl">
              <IoHomeOutline />
            </span>
            <span
              className={`ml-2 transition-all duration-300 transform ${
                isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/auth/dashboard/coffeeshops"
            className="flex items-center space-x-3 text-gray-600 hover:bg-gray-100 p-3 rounded-md transition-all duration-300  text-sm font-poppins"
          >
            <span className="text-xl">
              <FaRegBuilding />
            </span>
            <span
              className={`ml-2 transition-all duration-300 transform ${
                isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              Coffee Shops
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/users"
            className="flex items-center space-x-3 text-gray-600 hover:bg-gray-100 p-3 rounded-md transition-all duration-300 text-sm font-poppins"
          >
            <span className="text-xl">
              <HiOutlineUsers />
            </span>
            <span
              className={`ml-2 transition-all duration-300 transform ${
                isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              Users
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/testing"
            className="flex items-center space-x-3 text-gray-600 hover:bg-gray-100 p-3 rounded-md transition-all duration-300 font-poppins text-sm"
          >
            <span className="text-xl">
              <IoIosInformationCircleOutline />
            </span>
            <span
              className={`ml-2 transition-all duration-300 transform ${
                isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              Information
            </span>
          </Link>
        </li>
      </ul>

      {/* Logout Button */}

      {/* Sidebar Toggle Button */}
      <div className="absolute bottom-4 left-0 right-0 px-6 z-10">
        <button
          onClick={handleToggleSidebar}
          className="w-full text-left flex items-center space-x-3 text-gray-400"
        >
          <div className="flex items-center justify-center bg-gray-200 rounded-full p-1">
            {isCollapsed ? (
              <IoIosArrowForward className="text-xl" />
            ) : (
              <IoIosArrowBack className="text-xl" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

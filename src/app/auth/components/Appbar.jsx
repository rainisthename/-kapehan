"use client";
import { AiOutlineUser } from "react-icons/ai"; // Profile icon
import { logoutUser } from "../../context/authAction";
import { useRouter } from "next/navigation"; // App Router's useRouter
import authReducer from "../../context/authReducer";
import React, { useReducer } from "react";

const AppBar = () => {
  const [state, dispatch] = useReducer(authReducer, { user: null }); // Correctly destructure state and dispatch

  const router = useRouter();

  const handleLogout = () => {
    console.log("LOGOUT WAS TRIGGERED");
    logoutUser(dispatch); // Use the dispatch function correctly
    router.push("/"); // Redirect to homepage
  };

  return (
    <div className="flex justify-between items-center bg-white text-gray-600 shadow-sm p-4 px-6 border-b border-gray-200">
      <div className="ml-auto flex items-center space-x-4">
        <div className="relative flex items-center space-x-2">
          {/* Profile Icon */}
          <div className="w-8 h-8 flex justify-center items-center bg-gray-200 rounded-full">
            <AiOutlineUser className="text-xl text-gray-600" />
          </div>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-1 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition"
          >
            <p className="font-poppins">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppBar;

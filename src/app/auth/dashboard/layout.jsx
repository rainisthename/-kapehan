"use client";
import Sidebar from "../components/Sidebar";
import AppBar from "../components/Appbar";
import { useAuth } from "../../context/authContext"; // Assuming you're using AuthContext
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { user } = useAuth(); // Get user data from context
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    if (user) {
      setUserInformation(user); // Store user data as userInformation
    }
  }, [user]); // When user changes, update userInformation

  if (!userInformation) {
    // If userInformation is not available, show loading state
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with h-full to take full height */}
      <Sidebar className="h-[120%]" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* AppBar stays on top */}
        <AppBar user={userInformation} /> {/* Pass user data to AppBar */}

        {/* Main Content Layout */}
        <main className="px-12 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

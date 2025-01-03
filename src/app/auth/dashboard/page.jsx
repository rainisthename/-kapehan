"use client"
import AppBar from "../components/Appbar";
import StatsCards from "../components/StatCards";
import TopPerformer from "../components/TopPerformers";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getAuthToken, isTokenExpired } from '../../../utils/authUtil'; // Import functions

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();  // Using the updated client-side method
    console.log('Retrieved token:', token); // Log the token to verify

    if (!token || isTokenExpired(token)) {
      // If no token exists or the token is expired, redirect to login
      console.log('No valid token, redirecting to /login');
      // router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Main Content Layout */}
        <main className="p-6 flex-1 overflow-auto">
          <div className="w-full pb-5">
            <StatsCards />
          </div>
          <div className="w-full">
            <TopPerformer />
          </div>
        </main>
      </div>
    </div>
  );
}

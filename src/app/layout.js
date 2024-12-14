"use client"; // Marking this as a client-side component

import { usePathname } from "next/navigation"; // For checking the current route
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head"; // Import Head for metadata
import "./globals.css";
import { useState, useEffect } from "react";
export default function Layout({ children }) {
  const pathname = usePathname(); // Get the current path

  // Define metadata directly inside the component for the current page
  const metadata = {
    title: "Home - Kapehan",
    description: "Generated by create next app",
  };

  // Only show Navbar and Footer if not on '/auth' page
  const [showNavbarAndFooter, setShowNavbarAndFooter] = useState(false);

  useEffect(() => {
    // Only show Navbar and Footer if the route does not start with '/auth'
    setShowNavbarAndFooter(!pathname.startsWith("/auth"));
  }, [pathname]); // Re-run when pathname changes

  return (
    <html lang="en">
      <head>
        {/* Setting metadata inside the Head component */}
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body>
        {showNavbarAndFooter && <Navbar />}
        {children} {/* Render children (page content) */}
        {showNavbarAndFooter && <Footer />}
      </body>
    </html>
  );
}

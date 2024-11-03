"use client"; // Add this line at the top
import { useEffect, useState } from "react";
import Link from "next/link";
// import Logo from "@/components/Logo";
import Links from "../components/Links";
import { pageEndpoints } from "../config/config";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY !== 0 || window.pageYOffset !== 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    return () => (window.onscroll = null);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`sticky z-50 top-0 p-2 bg-[#FAF7F2] ${isSticky ? "border-b-2" : "border-b-0"}`}
    >
      <div className="max-w-[1420px] m-auto flex justify-between items-center">
        <div className="sm:p-5">
          {/* <p className="p-4 mr-5 font-poppins-medium text-[#4b4b4d]">Kapehan</p> */}
        </div>
        <div className="sm:p-5 flex-1 flex justify-center">
          <div className="hidden md:flex space-x-4">
            <Links pageTitle={"home."} endpoint={pageEndpoints.home} />
            <Links pageTitle={"find coffee shops."} endpoint={pageEndpoints.explore} />
            <Links pageTitle={"blogs."} endpoint={pageEndpoints.blogs} />
            <Links pageTitle={"about us."} endpoint={pageEndpoints.about} />
          </div>
        </div>
        <div className="sm:p-5 hidden md:block">
          {/* Add your new link here */}
          <Links pageTitle={"contact us."} endpoint={pageEndpoints.about} />
        </div>
        <div className="md:hidden p-5">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col items-center space-y-4 py-4">
          <button
            onClick={toggleMenu}
            className="absolute top-5 right-5 text-2xl focus:outline-none"
          >
            &times;
          </button>
          <Links pageTitle={"home."} endpoint={pageEndpoints.home} />
          <Links pageTitle={"find coffee shops."} endpoint={pageEndpoints.explore} />
          <Links pageTitle={"blogs."} endpoint={pageEndpoints.blogs} />
          <Links pageTitle={"about us."} endpoint={pageEndpoints.about} />
          <Links pageTitle={"contact us."} endpoint={pageEndpoints.about} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

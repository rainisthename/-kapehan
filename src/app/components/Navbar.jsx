"use client"; // Add this line at the top
import { useState } from "react";
import Link from "next/link";
// import Logo from "@/components/Logo";
import Links from "../components/Links";
import { pageEndpoints } from "../config/config";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#FAF7F2]">
      <div className="max-w-[1420px] m-auto flex justify-between items-center">
        <div className="sm:p-5">
          {/* <p className="text-2xl font-poppins-bold text-[#5F4429]">Kapehan</p> */}
        </div>
        <div className="sm:p-5 flex-1 flex justify-center">
          <div className="hidden md:flex space-x-4">
            <Links pageTitle={"home."} endpoint={pageEndpoints.home} />
            <Links
              pageTitle={"coffee shops."}
              endpoint={pageEndpoints.explore}
            />
            <Links pageTitle={"blogs."} endpoint={pageEndpoints.blogs} />
            <Links pageTitle={"about us."} endpoint={pageEndpoints.about} />
          </div>
        </div>
        <div className="sm:p-5 hidden md:block">
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
          {/* Each Link has onClick={toggleMenu} to close the menu on click */}
          <Links
            pageTitle={"home."}
            endpoint={pageEndpoints.home}
            onClick={toggleMenu}
          />
          <Links
            pageTitle={"coffee shops."}
            endpoint={pageEndpoints.explore}
            onClick={toggleMenu}
          />
          <Links
            pageTitle={"blogs."}
            endpoint={pageEndpoints.blogs}
            onClick={toggleMenu}
          />
          <Links
            pageTitle={"about us."}
            endpoint={pageEndpoints.about}
            onClick={toggleMenu}
          />
          <Links
            pageTitle={"contact us."}
            endpoint={pageEndpoints.about}
            onClick={toggleMenu}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

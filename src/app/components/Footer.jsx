import React from "react";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <div className="border-t border-gray-400">
    <footer className="py-8 mx-8 md:mx-[10%]">
      <div className="max-w-xl">
        {/* Column 1 */}
        <div>
          <p className="text-2xl font-poppins-bold text-gray-800 mb-4">
            Kapehan
          </p>
          <p className="text-sm font-poppins text-gray-400">
            We index the unique coffee shops in Metro Manila to help you find
            the best local spots for your caffeine fix.
          </p>
          <SocialIcons />
        </div>
      </div>
      <hr />
      <p className="mt-8 text-gray-400 text-sm font-poppins">
        © {new Date().getFullYear()} Kapehan. All rights reserved.
      </p>
    </footer>
    </div>
  );
};

export default Footer;

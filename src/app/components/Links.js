import React from "react";
import Link from "next/link";

const Links = ({ pageTitle, endpoint, onClick  }) => {
  return (
    <Link
    onClick={onClick}
      href={endpoint}
      className="p-4 mr-5 inline-block text-base font-poppins-medium text-[#4b4b4d] relative hover:text-black group"
    >
      {pageTitle}
      <span className="absolute left-0 right-0 bottom-2 h-0.5 bg-[#011532] w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
    </Link>
  );
};

export default Links;

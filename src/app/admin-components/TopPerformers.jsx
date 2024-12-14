"use client";
import { useState } from "react";

const TopPerformer = () => {
  const [activeTab, setActiveTab] = useState("Today");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Ratings");
  const [sortOrder, setSortOrder] = useState("desc");
  const itemsPerPage = 5;

  const tabs = ["Today", "Week", "Month", "Year"];

  const data = [
    {
      name: "Marke Angel",
      id: "245690",
      city: "Makati City",
      marks: 5,
      reviews: 50,
    },
    {
      name: "Angel Korrea",
      id: "245690",
      city: "Quezon City",
      marks: 4,
      reviews: 45,
    },
    {
      name: "Lucifer Zen",
      id: "245690",
      city: "Taguig City",
      marks: 3,
      reviews: 30,
    },
    { name: "Trent Boult", id: "245690", city: "Pasig", marks: 2, reviews: 40 },
    {
      name: "Droid Man",
      id: "245690",
      city: "Quezon City",
      marks: 4,
      reviews: 25,
    },
    {
      name: "Jake Peralta",
      id: "245691",
      city: "Mandaluyong",
      marks: 5,
      reviews: 60,
    },
    { name: "Tina Belcher", id: "245692", city: "BGC", marks: 5, reviews: 35 },
    {
      name: "Bob Belcher",
      id: "245693",
      city: "Taguig",
      marks: 4,
      reviews: 48,
    },
    {
      name: "Linda Belcher",
      id: "245694",
      city: "Quezon City",
      marks: 4,
      reviews: 52,
    },
    {
      name: "Gene Belcher",
      id: "245695",
      city: "Ortigas City",
      marks: 4,
      reviews: 42,
    },
  ];

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Sorting Logic
  const sortedData = [...currentData].sort((a, b) => {
    const aValue = sortBy === "Ratings" ? a.marks : a.reviews;
    const bValue = sortBy === "Ratings" ? b.marks : b.reviews;
    if (sortOrder === "desc") {
      return bValue - aValue;
    } else {
      return aValue - bValue;
    }
  });

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(criteria);
      setSortOrder("desc"); // Default to descending order
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-poppins">Most Visited Coffee Shop</h2>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 text-center text-sm sm:text-base font-medium ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-gray-600 text-xs sm:text-sm">
              <th className="py-3 px-4 font-inter">Store Code #</th>
              <th className="py-3 px-4 font-inter">Coffee Shop Name</th>
              <th className="py-3 px-4 font-inter">City</th>
              {/* Sorting for Ratings */}
              <th
                className="py-3 px-4 font-inter cursor-pointer"
                onClick={() => handleSortChange("Ratings")}
              >
                Ratings{" "}
                {sortBy === "Ratings" && (sortOrder === "desc" ? "↓" : "↑")}
              </th>
              {/* Sorting for Reviews */}
              <th
                className="py-3 px-4 font-inter cursor-pointer"
                onClick={() => handleSortChange("Reviews")}
              >
                Reviews{" "}
                {sortBy === "Reviews" && (sortOrder === "desc" ? "↓" : "↑")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-400 font-inter text-xs sm:text-sm">
                  {item.id}
                </td>
                <td className="py-3 px-4 text-gray-400 font-inter text-xs sm:text-sm">
                  {item.name}
                </td>
                <td className="py-3 px-4 text-gray-400 font-inter text-xs sm:text-sm">
                  {item.city}
                </td>
                <td className="py-3 px-4 text-gray-400 font-inter text-xs sm:text-sm">
                  {item.marks}
                </td>
                <td className="py-3 px-4 text-gray-400 font-inter text-xs sm:text-sm">
                  {item.reviews}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TopPerformer;

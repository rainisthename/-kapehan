"use client"
import { useState } from 'react';
import { FaSearch, FaEye, FaPen, FaTrashAlt } from 'react-icons/fa';

const TableComponent = () => {
  const [activeTab, setActiveTab] = useState('active'); // Active or Pending tab
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const stores = [
    { id: 1, name: 'Shop A', city: 'New York', rating: 4.5, activeDate: '2024-01-15' },
    { id: 2, name: 'Shop B', city: 'Los Angeles', rating: 3.8, activeDate: '2024-02-10' },
    { id: 3, name: 'Shop C', city: 'Chicago', rating: 4.2, activeDate: '2024-03-03' },
    // Add more shops as needed
  ];
  
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const displayedStores = filteredStores.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handlePagination = (page) => setCurrentPage(page);

  return (
    <div className="font-poppins p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex items-center">
          <FaSearch className="absolute left-3 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by Store Name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <button className="px-6 py-3 text-sm font-medium text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-200">
          Create Shop
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-6 py-3 text-sm font-medium ${activeTab === 'active' ? 'text-gray-800 border-b-2 border-gray-600' : 'text-gray-400'} transition-all duration-200`}
        >
          Active (12)
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-3 text-sm font-medium ${activeTab === 'pending' ? 'text-gray-800 border-b-2 border-gray-600' : 'text-gray-400'} transition-all duration-200`}
        >
          Pending
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-[#F5F5F5] border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Store Code #
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Coffee Shop Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                City
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Ratings
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Active Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedStores.map(store => (
              <tr key={store.id} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-700">{store.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{store.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{store.city}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{store.rating}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{store.activeDate}</td>
                <td className="px-6 py-4 text-sm text-gray-700 flex space-x-4">
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaEye className="w-5 h-5" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaPen className="w-5 h-5" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaTrashAlt className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredStores.length)} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredStores.length)} of {filteredStores.length} stores
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;

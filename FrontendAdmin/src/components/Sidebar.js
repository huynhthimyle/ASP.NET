import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-900 shadow-lg">
      <div className="flex flex-col h-full">
        {/* Header with title */}
        <div className="flex items-center justify-center p-6 border-b border-gray-700">
          <Link to="/dashboard">
            <h1 className="text-3xl font-bold text-yellow-600 uppercase transition-all duration-300 hover:text-yellow-500">
              MyLeStyle
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1">
          <ul className="space-y-1 px-3">
            {/* Banner */}
            <li>
              <Link
                to="/banner"
                className="block px-4 py-3 text-gray-200 text-sm font-medium rounded transition-all duration-300 hover:bg-yellow-600 hover:text-white"
              >
                Banner
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                to="/contact"
                className="block px-4 py-3 text-gray-200 text-sm font-medium rounded transition-all duration-300 hover:bg-yellow-600 hover:text-white"
              >
                Contact
              </Link>
            </li>

            {/* Category */}
            <li>
              <Link
                to="/category"
                className="block px-4 py-3 text-gray-200 text-sm font-medium rounded transition-all duration-300 hover:bg-yellow-600 hover:text-white"
              >
                Category
              </Link>
            </li>

            {/* Product */}
            <li>
              <Link
                to="/product"
                className="block px-4 py-3 text-gray-200 text-sm font-medium rounded transition-all duration-300 hover:bg-yellow-600 hover:text-white"
              >
                Product
              </Link>
            </li>

            {/* User */}
            <li>
              <Link
                to="/user"
                className="block px-4 py-3 text-gray-200 text-sm font-medium rounded transition-all duration-300 hover:bg-yellow-600 hover:text-white"
              >
                User
              </Link>
            </li>

            {/* Order */}
            <li>
              <Link
                to="/order"
                className="block px-4 py-3 text-gray-200 text-sm font-medium rounded transition-all duration-300 hover:bg-yellow-600 hover:text-white"
              >
                Order
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
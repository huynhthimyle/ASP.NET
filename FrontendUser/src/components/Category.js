import React, { useState } from 'react';

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className="left-0 font-bold text-black cursor-pointer hover:text-blue-500">Sản phẩm</span>
      {/* {isOpen && (
        <div className="absolute w-48 mt-0 bg-white border border-gray-300 rounded-lg shadow-lg ">
          <ul>
            <li className="px-4 py-2 rounded-lg hover:bg-blue-500">
              <a href="#" className="text-black">Iphone</a>
            </li>
            <li className="px-4 py-2 rounded-lg hover:bg-blue-500">
              <a href="#" className="text-black">Samsung</a>
            </li>
            <li className="px-4 py-2 rounded-lg hover:bg-blue-500">
              <a href="#" className="text-black">Realme</a>
            </li>
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Category;

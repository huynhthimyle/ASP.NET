import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryService from './../service/CategorySerice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const existingCategory = await CategoryService.getList();
    if (existingCategory.some(category => category.name.toLowerCase() === name.toLowerCase())) {
      toast.error('Tên danh mục đã tồn tại!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return;
    }
  
    try {
      const categoryData = { name, description };
      const response = await CategoryService.addCategory(categoryData);
  
      if (response && response.id) {
        toast.success('Thêm danh mục thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
  
        setTimeout(() => {
          navigate('/category');
        }, 2000);
      } else {
        toast.error('Thêm danh mục thất bại!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    } catch (error) {
      console.error('Lỗi khi thêm danh mục:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };
  

  const handleExit = () => {
    navigate('/category');
  };

  return (
    <div className="max-w-lg p-8 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-2xl font-bold text-center text-indigo-600">Thêm Danh Mục Mới</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Tên Danh Mục</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Mô Tả</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center w-full px-4 py-2 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Thêm Danh Mục
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <button
          onClick={handleExit}
          className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-100"
        >
          Thoát
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default AddCategory;

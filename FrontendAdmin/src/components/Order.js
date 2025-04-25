import React, { useEffect, useState } from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import OrderService from '../service/OrderService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await OrderService.getList();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError("Có lỗi xảy ra khi tải danh sách đơn hàng");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng với ID: ${id}?`)) {
      try {
        await OrderService.deleteOrder(id);
        setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
        toast.success('Xóa đơn hàng thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        toast.error('Có lỗi xảy ra khi xóa đơn hàng!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container p-6 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Quản lý Đơn hàng</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-100">
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">ID</th>
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">UserID</th>
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">Tên</th>
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">Số điện thoại</th>
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">Email</th>
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">Địa chỉ</th>
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(order => (
              <tr key={order.id} className="transition duration-200 ease-in-out hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.id}</td>
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.userId}</td>
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.name}</td>
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.phone}</td>
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.email}</td>
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.address}</td>
                <td className="flex px-6 py-4 space-x-4 text-gray-800 border-b border-gray-200">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteOrder(order.id); }}
                    className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    title="Xóa"
                  >
                    <FaTrash size={18} />
                    Xóa
                  </button>
                  <Link to={`/orderdetail/order/${order.id}`} className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <FaEye size={18} />
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
          disabled={currentPage === 1}
        >
          Đầu
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
          disabled={currentPage === 1}
        >
          Trước
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
          disabled={currentPage === totalPages}
        >
          Cuối
        </button>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default Order;

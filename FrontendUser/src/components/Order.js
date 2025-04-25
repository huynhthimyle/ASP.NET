import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderService from './../service/OrderService';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setError("Bạn cần đăng nhập để xem đơn hàng!");
        setLoading(false);
        return;
      }

      try {
        // Fetch orders by userId
        const data = await OrderService.getOrdersByUserId(user.id);
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        setError("Có lỗi xảy ra khi tải danh sách đơn hàng");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

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
  if (orders.length === 0) return <p className="text-center text-gray-500">Không có đơn hàng nào</p>;

  return (
    <div className="container p-8 mx-auto mt-5 mb-5 bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Thông Tin Người Dùng</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="text-gray-700 bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-semibold border-b-2 border-gray-200">ID</th>
              <th className="px-6 py-3 font-semibold border-b-2 border-gray-200">Tên</th>
              <th className="px-6 py-3 font-semibold border-b-2 border-gray-200">Số điện thoại</th>
              <th className="px-6 py-3 font-semibold border-b-2 border-gray-200">Email</th>
              <th className="px-6 py-3 font-semibold border-b-2 border-gray-200">Địa chỉ</th>
              <th className="px-6 py-3 font-semibold border-b-2 border-gray-200">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(order => (
              <tr key={order.id} className="transition duration-200 ease-in-out hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.id}</td>
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.name}</td>
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.phone}</td>
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.email}</td>
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.address}</td>
                <td className="flex px-6 py-4 space-x-4 text-gray-800 border-b border-gray-200">
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
        <button onClick={() => handlePageChange(1)} className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700" disabled={currentPage === 1}>
          Đầu
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)} className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700" disabled={currentPage === 1}>
          Trước
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700" disabled={currentPage === totalPages}>
          Sau
        </button>
        <button onClick={() => handlePageChange(totalPages)} className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700" disabled={currentPage === totalPages}>
          Cuối
        </button>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default Order;

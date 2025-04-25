import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductService from './../service/ProductService';
import OrderService from './../service/OrderService';
import UserService from './../service/UserService';
import CategoryService from './../service/CategorySerice';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getList();
        const users = response.users || [];
        const products = await ProductService.getList();
        const orders = await OrderService.getList();
        const categories = await CategoryService.getList();

        setUserCount(users.length);
        setProductCount(products.length);
        setOrderCount(orders.length);
        setCategoryCount(categories.length);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Chào Mừng Đến Với Trang Quản Lý
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Thẻ người dùng */}
        <Link
          to="/user"
          className="p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="text-lg font-semibold text-yellow-600">Người Dùng</h3>
          <p className="mt-2 text-xl font-medium text-gray-700">
            {userCount ?? 0} tài khoản
          </p>
        </Link>

        {/* Thẻ sản phẩm */}
        <Link
          to="/product"
          className="p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="text-lg font-semibold text-yellow-600">Sản Phẩm</h3>
          <p className="mt-2 text-xl font-medium text-gray-700">
            {productCount} sản phẩm
          </p>
        </Link>

        {/* Thẻ đơn hàng */}
        <Link
          to="/order"
          className="p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="text-lg font-semibold text-yellow-600">Đơn Hàng</h3>
          <p className="mt-2 text-xl font-medium text-gray-700">
            {orderCount} đơn hàng
          </p>
        </Link>

        {/* Thẻ danh mục */}
        <Link
          to="/category"
          className="p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="text-lg font-semibold text-yellow-600">Danh Mục</h3>
          <p className="mt-2 text-xl font-medium text-gray-700">
            {categoryCount} danh mục
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import CartService from './../service/CartService';

export default function Header() {
    const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);
    const navigate = useNavigate();

    // Check if the user is logged in and get the cart item count
    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);

        if (user) {
            const userId = JSON.parse(user).id;
            CartService.getCartByUserId(userId)
                .then((data) => {
                    setCartItemCount(data.length);
                })
                .catch((error) => {
                    console.error('Error fetching cart:', error);
                });
        }
    }, []);

    const toggleProfileMenu = () => {
        setProfileMenuVisible((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setCartItemCount(0);
        navigate('/login');
    };

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="container flex items-center justify-between px-6 py-4 mx-auto">
                {/* Left Section: Location and Phone */}
                <div className="flex items-center gap-6 text-base text-gray-600">
                    <div className="flex items-center gap-2">
                        <FiMapPin className="text-yellow-600 w-6 h-6" />
                        <span>Hệ thống 1 cửa hàng</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiPhone className="text-yellow-600 w-6 h-6" />
                        <span>09123.456.789</span>
                    </div>
                </div>

                {/* Center Section: Navigation Links */}
                <div className="flex items-center gap-6 text-base font-medium">
                    <Link to="/" className="text-3xl font-bold text-yellow-600">
                        MyLeStyle
                    </Link>
                    <Link to="/product" className="uppercase text-gray-700 hover:text-yellow-600">Sản phẩm</Link>
                    <Link to="/contact" className="uppercase text-gray-700 hover:text-yellow-600">Liên hệ</Link>
                </div>

                {/* Right Section: Search, Cart, and Profile */}
                <div className="flex items-center gap-6">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="pl-10 pr-6 py-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>

                    {/* Cart */}
                    <Link to="/cart" className="relative flex items-center">
                        <FaShoppingCart className="text-gray-700 hover:text-yellow-600 w-6 h-6" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>

                    {/* Profile/Login */}
                    <div
                        className="relative flex items-center cursor-pointer"
                        onMouseEnter={toggleProfileMenu}
                        onMouseLeave={toggleProfileMenu}
                    >
                        <FaUserCircle className="text-gray-700 hover:text-yellow-600 w-6 h-6" />
                        {isLoggedIn ? (
                            isProfileMenuVisible && (
                                <div className="absolute z-50 w-56 top-5 right-0 bg-white rounded-md shadow-lg">
                                    <ul className="py-3">
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="block px-5 py-3 text-base text-gray-700 hover:bg-yellow-100"
                                            >
                                                Cập nhật thông tin
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/order"
                                                className="block px-5 py-3 text-base text-gray-700 hover:bg-yellow-100"
                                            >
                                                Lịch sử mua hàng
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full px-5 py-3 text-base text-left text-gray-700 hover:bg-yellow-100"
                                            >
                                                Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )
                        ) : (
                            <div className="flex gap-3">
                                <Link to="/login" className="text-base text-gray-700 hover:text-yellow-600">
                                    Đăng Nhập
                                </Link>
                                <span>/</span>
                                <Link to="/register" className="text-base text-gray-700 hover:text-yellow-600">
                                    Đăng Ký
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
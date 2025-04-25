import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="bg-white border-t border-gray-200">
      <footer className="font-sans tracking-wide">
        <div className="px-6 mx-auto max-w-7xl py-8 sm:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand & Description */}
            <div className="space-y-3">
              <Link to="/" className="text-2xl font-bold text-yellow-600">
                MyLeStyle
              </Link>
              <p className="text-sm text-gray-600">
                MyLeStyle xin chào các bạn! Chúc các bạn có một trải nghiệm vui vẻ. Xin cảm ơn!
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="mb-3 text-lg font-semibold text-gray-900">Danh mục</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-600 hover:text-yellow-600">Trang Chủ</Link></li>
                <li><Link to="/product" className="text-gray-600 hover:text-yellow-600">Sản Phẩm</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-yellow-600">Liên Hệ</Link></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="mb-3 text-lg font-semibold text-gray-900">Về chúng tôi</h4>
              <ul className="flex gap-3">
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF className="w-5 h-5 text-gray-600 hover:text-yellow-600" />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="w-5 h-5 text-gray-600 hover:text-yellow-600" />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaPhone className="w-5 h-5 text-gray-600 hover:text-yellow-600" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="mb-3 text-lg font-semibold text-gray-900">Liên hệ</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/map" className="hover:text-yellow-600">Dĩ An, Bình Dương</Link></li>
                <li><a href="mailto:huynhthimyle2004@gmail.com" className="hover:text-yellow-600">huynhthimyle2004@gmail.com</a></li>
                <li><a href="tel:+84 234 567 789" className="hover:text-yellow-600">+84 234 567 789</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-4 text-center border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">© 2025 MyLeStyle.</p>
        </div>
      </footer>
    </div>
  );
}
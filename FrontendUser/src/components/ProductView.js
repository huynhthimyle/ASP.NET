import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductService from './../service/ProductService';
import CartService from './../service/CartService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await ProductService.getProductById(id);
        if (result) {
          setProduct(result);
        } else {
          setError('Không tìm thấy thông tin sản phẩm.');
        }
      } catch {
        setError('Không thể lấy thông tin sản phẩm.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!product?.id) {
      toast.error('Thông tin sản phẩm không hợp lệ.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = storedUser.id;
    if (!userId) {
      toast.error('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const cartData = {
      userId: userId,
      productId: product.id,
      quantity: quantity,
    };

    try {
      await CartService.addToCart(cartData);
      toast.success('Đã thêm vào giỏ hàng!', {
        position: 'top-right',
        autoClose: 3000,
      });
      setTimeout(() => {
        window.location.href = '/cart';
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      toast.error(`Lỗi khi thêm vào giỏ: ${msg}`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg text-gray-500">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-12 text-center text-lg text-red-500 font-semibold">{error}</p>
    );
  }

  if (!product) {
    return (
      <p className="py-12 text-center text-lg text-gray-600">Không tìm thấy sản phẩm.</p>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img
              src={`https://localhost:7192/images/${product.imageUrl}`}
              alt={product.name}
              className="object-contain w-full max-h-[400px] rounded-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
              }}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Price Section */}
            <div className="flex items-center gap-3">
              {product.pricesale ? (
                <>
                  <span className="text-2xl font-semibold text-yellow-600">
                    {product.pricesale.toLocaleString()}₫
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {product.price.toLocaleString()}₫
                  </span>
                  <span className="px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded">
                    -{Math.round(((product.price - product.pricesale) / product.price) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-2xl font-semibold text-yellow-600">
                  {product.price.toLocaleString()}₫
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Mô tả sản phẩm</h3>
              <p className="text-gray-600">{product.description || 'Không có mô tả cho sản phẩm này.'}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm font-medium text-gray-700">Số lượng:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  −
                </button>
                <span className="px-4 py-1 text-lg">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            {isLoggedIn ? (
              <button
                onClick={handleAddToCart}
                className="mt-4 flex items-center justify-center gap-2 w-full px-6 py-3 text-lg font-semibold text-white bg-yellow-600 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition"
              >
                <FaShoppingCart className="w-5 h-5" />
                Thêm vào giỏ hàng
              </button>
            ) : (
              <Link
                to="/login"
                className="mt-4 block w-full py-3 text-lg font-semibold text-center text-white bg-red-500 rounded hover:bg-red-600 transition"
              >
                Đăng nhập để thêm sản phẩm
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
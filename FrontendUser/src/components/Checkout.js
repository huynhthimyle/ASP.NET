import React, { useEffect, useState } from 'react';
import OrderService from './../service/OrderService';
import CartService from './../service/CartService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Checkout() {
  const [userAddress, setUserAddress] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const baseImageUrl = 'https://localhost:7192/images';

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('selectedItemsForCheckout')) || [];
    console.log('Loaded selectedItems:', items);
    setSelectedItems(items);
  }, []);

  const calculateTotal = () => {
    const total = selectedItems.reduce((sum, item) => {
      const price = item.product?.price || 0;
      return sum + price * item.qty;
    }, 0);
    return total.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  const clearCartItems = async () => {
    try {
      let userId = selectedItems[0]?.userId;
      if (!userId) {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        userId = user.id || user.userId;
      }

      if (!userId) {
        throw new Error('Không tìm thấy userId để xóa giỏ hàng');
      }

      const productIds = selectedItems.map((item) => item.productId);
      if (productIds.length > 0) {
        await CartService.removeCartItems(productIds, userId);
        console.log('Đã xóa các sản phẩm khỏi giỏ hàng:', productIds);
      }

      localStorage.removeItem('selectedItemsForCheckout');
    } catch (error) {
      console.error('Lỗi khi xóa giỏ hàng:', error);
      setPaymentStatus('Thanh toán thành công, nhưng không thể xóa sản phẩm khỏi giỏ hàng.');
    }
  };

  const handlePayment = async () => {
    try {
      if (!selectedItems || selectedItems.length === 0) {
        setPaymentStatus('Lỗi: Giỏ hàng trống. Vui lòng chọn sản phẩm để thanh toán.');
        return;
      }

      let userId = selectedItems[0]?.userId;
      if (!userId) {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        userId = user.id || user.userId;
      }

      if (!userId) {
        setPaymentStatus('Lỗi: Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setPaymentStatus('Lỗi: Vui lòng đăng nhập lại.');
        return;
      }

      const orderDetails = selectedItems
        .filter((item) => item.qty > 0 && item.productId)
        .map((item) => {
          if (!item.productId || !item.qty || item.qty <= 0) {
            throw new Error(`Dữ liệu không hợp lệ cho sản phẩm: ${JSON.stringify(item)}`);
          }
          return {
            productId: Number(item.productId),
            quantity: Number(item.qty),
          };
        });

      if (!userName || !userPhone || !userEmail || !userAddress) {
        setPaymentStatus('Vui lòng điền đầy đủ thông tin người nhận.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        setPaymentStatus('Email không hợp lệ.');
        return;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(userPhone)) {
        setPaymentStatus('Số điện thoại không hợp lệ (phải có 10 chữ số).');
        return;
      }

      if (userAddress.length < 5) {
        setPaymentStatus('Địa chỉ giao hàng quá ngắn.');
        return;
      }

      if (orderDetails.length === 0) {
        setPaymentStatus('Không có sản phẩm nào để thanh toán.');
        return;
      }

      const orderData = {
        userId: Number(userId),
        name: userName,
        phone: userPhone,
        email: userEmail,
        address: userAddress,
        orderDetails,
      };

      console.log('Dữ liệu gửi đi:', orderData);

      const response = await OrderService.addOrder(orderData);
      console.log('Full response:', response);

      if (response?.id || response?.data?.id || (response?.status >= 200 && response?.status < 300)) {
        toast.success('Thanh toán thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        await clearCartItems();
        setSelectedItems([]);

        setTimeout(() => {
          window.location.href = '/cart';
        }, 3000);
      } else {
        console.warn('Phản hồi không hợp lệ:', response);
        setPaymentStatus('Thanh toán thất bại: Phản hồi không hợp lệ từ server.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Lỗi không xác định.';
      console.error('Lỗi thanh toán:', {
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data,
        stack: error.stack,
      });
      setPaymentStatus(`Thanh toán thất bại: ${errorMessage}`);
    }
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Xác Nhận Đơn Hàng</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-lg shadow-md p-6">
          {/* User Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Thông Tin Người Nhận</h3>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Họ và tên</label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Nhập email"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Số điện thoại</label>
              <input
                type="tel"
                placeholder="Nhập số điện thoại"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Địa chỉ giao hàng</label>
              <input
                type="text"
                placeholder="Nhập địa chỉ giao hàng"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Order Details */}
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Chi Tiết Đơn Hàng</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {selectedItems.length > 0 ? (
                selectedItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between p-4 bg-white rounded shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      {item.imageUrl ? (
                        <img
                          src={`${baseImageUrl}/${item.imageUrl}`}
                          alt={item.name || 'Sản phẩm'}
                          className="object-cover w-16 h-16 rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-16 h-16 text-sm text-gray-500 bg-gray-200 rounded">
                          No Image
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{item.name || `Sản phẩm ${item.productId}`}</p>
                        <p className="text-sm text-gray-600">x{item.qty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-yellow-600">
                        {(item.product?.price || 0).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">Không có sản phẩm nào để thanh toán.</p>
              )}
            </div>
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
              <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
              <span className="text-xl font-bold text-yellow-600">{calculateTotal()}</span>
            </div>
            <button
              className="w-full py-3 mt-4 font-semibold text-white bg-yellow-600 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition"
              onClick={handlePayment}
            >
              Thanh Toán
            </button>
            {paymentStatus && (
              <div
                className={`mt-4 p-3 text-sm font-medium rounded text-center ${paymentStatus.includes('thành công')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                  }`}
              >
                {paymentStatus}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
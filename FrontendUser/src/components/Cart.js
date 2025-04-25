import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CartService from '../service/CartService';
import ProductService from '../service/ProductService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState({});
    const [checkoutError, setCheckoutError] = useState(null);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.id;
    const navigate = useNavigate();
    const baseImageUrl = 'https://localhost:7192/images';

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!userId) {
                setError('Vui lòng đăng nhập để xem giỏ hàng.');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const cart = await CartService.getCartByUserId(userId);
                console.log('Danh sách giỏ hàng:', cart);
                if (Array.isArray(cart) && cart.length > 0) {
                    const updatedCart = [];
                    for (let item of cart) {
                        try {
                            const product = await ProductService.getById(item.productId);
                            updatedCart.push({
                                ...item,
                                cardId: item.id,
                                qty: item.quantity,
                                product: product || {
                                    name: `Sản phẩm ${item.productId}`,
                                    price: 0,
                                    imageUrl: null,
                                },
                            });
                        } catch (error) {
                            console.error(`Lỗi khi tải sản phẩm ${item.productId}:`, error);
                            updatedCart.push({
                                ...item,
                                qty: item.quantity,
                                product: {
                                    name: `Sản phẩm ${item.productId}`,
                                    price: 0,
                                    imageUrl: null,
                                },
                            });
                        }
                    }
                    setCartItems(updatedCart);
                } else {
                    setCartItems([]);
                }
            } catch (error) {
                console.error('Lỗi khi lấy giỏ hàng:', error);
                setError('Không thể tải giỏ hàng. Vui lòng thử lại sau.');
                setCartItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [userId, navigate]);

    const handleQuantityChange = async (id, newQuantity) => {
        if (newQuantity < 1) return;

        const previousItems = [...cartItems];
        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, qty: newQuantity, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);

        try {
            const item = cartItems.find((item) => item.id === id);
            if (!item) throw new Error('Không tìm thấy mục giỏ hàng');

            const payload = {
                Id: id,
                UserId: item.userId,
                ProductId: item.productId,
                Quantity: newQuantity,
            };

            await CartService.updateCartItem(id, payload);
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng:', error);
            setCartItems(previousItems);
            setError('Không thể cập nhật số lượng. Vui lòng thử lại.');
        }
    };

    const handleDelete = async (itemId) => {
        try {
            await CartService.removeFromCart(itemId);
            setCartItems(cartItems.filter((item) => item.id !== itemId));
            toast.success('Sản phẩm đã được xóa khỏi giỏ hàng.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
            });
            setTimeout(() => {
                window.location.href = '/cart';
            }, 2000);
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error.response?.data || error.message);
            toast.error('Không thể xóa sản phẩm. Vui lòng thử lại.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
            });
        }
    };

    const calculateTotal = () => {
        const totalAmount = cartItems.reduce((total, item) => {
            const price = item.product?.price || 0;
            return total + price * item.qty;
        }, 0);

        const selectedTotal = cartItems.reduce((total, item) => {
            if (selectedItems[item.id]) {
                const price = item.product?.price || 0;
                return total + price * item.qty;
            }
            return total;
        }, 0);

        return {
            totalAmount: totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            selectedTotal: selectedTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        };
    };

    const totals = calculateTotal();

    const handleProceedToCheckout = () => {
        const selectedProducts = cartItems
            .filter((item) => selectedItems[item.id])
            .map((item) => ({
                ...item,
                cartId: item.id,
                name: item.product?.name || `Sản phẩm ${item.productId}`,
                price: item.product?.price || 0,
                imageUrl: item.product?.imageUrl || null,
            }));

        if (selectedProducts.length === 0) {
            setCheckoutError('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
        } else {
            setCheckoutError(null);
            localStorage.setItem('selectedItemsForCheckout', JSON.stringify(selectedProducts));
            navigate('/checkout');
        }
    };

    return (
        <div className="bg-gray-50 py-12 min-h-screen">
            <ToastContainer />
            <section id="cart-page" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Giỏ Hàng Của Bạn</h1>
                {loading ? (
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="mt-4 text-lg text-gray-500">Đang tải giỏ hàng...</p>
                    </div>
                ) : error ? (
                    <div className="text-center">
                        <p className="text-red-500 text-lg">{error}</p>
                        <Link
                            to="/login"
                            className="inline-block mt-4 px-6 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700 transition"
                        >
                            Đăng nhập ngay
                        </Link>
                    </div>
                ) : cartItems.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600 text-lg">Giỏ hàng của bạn đang trống.</p>
                        <button
                            onClick={() => navigate('/product')}
                            className="mt-4 px-6 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700 transition"
                        >
                            Mua sắm ngay
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Cart Items Table */}
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-yellow-600 text-white">
                                        <tr>
                                            <th className="px-4 py-3 text-sm font-semibold text-left">Chọn</th>
                                            <th className="px-4 py-3 text-sm font-semibold text-left">Sản phẩm</th>
                                            <th className="px-4 py-3 text-sm font-semibold text-center">Giá</th>
                                            <th className="px-4 py-3 text-sm font-semibold text-center">Số lượng</th>
                                            <th className="px-4 py-3 text-sm font-semibold text-center">Tổng</th>
                                            <th className="px-4 py-3 text-sm font-semibold text-center">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {cartItems.map((item) => {
                                            const product = item.product || {};
                                            return (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-4 text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedItems[item.id] || false}
                                                            onChange={() =>
                                                                setSelectedItems((prev) => ({
                                                                    ...prev,
                                                                    [item.id]: !prev[item.id],
                                                                }))
                                                            }
                                                            className="text-yellow-600 focus:ring-yellow-500 rounded"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-4 flex items-center space-x-3">
                                                        {product.imageUrl ? (
                                                            <img
                                                                src={`${baseImageUrl}/${product.imageUrl}`}
                                                                alt={product.name || 'Sản phẩm'}
                                                                className="object-cover w-16 h-16 rounded"
                                                                onError={(e) => {
                                                                    e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                                                                }}
                                                            />
                                                        ) : (
                                                            <span className="text-gray-400">Không có ảnh</span>
                                                        )}
                                                        <span className="text-gray-700 font-medium">
                                                            {product.name || `Sản phẩm ${item.productId}`}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 text-center text-gray-700">
                                                        {(product.price || 0).toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    </td>
                                                    <td className="px-4 py-4 text-center">
                                                        <div className="flex items-center justify-center space-x-2">
                                                            <button
                                                                onClick={() => handleQuantityChange(item.id, item.qty - 1)}
                                                                disabled={item.qty <= 1}
                                                                className="px-2 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-400 transition"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="text-gray-700">{item.qty}</span>
                                                            <button
                                                                onClick={() => handleQuantityChange(item.id, item.qty + 1)}
                                                                className="px-2 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 transition"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-center text-gray-700">
                                                        {((product.price || 0) * item.qty).toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    </td>
                                                    <td className="px-4 py-4 text-center">
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="text-red-500 hover:text-red-700 font-semibold"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="md:w-1/4">
                            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tóm Tắt Đơn Hàng</h2>
                                <div className="space-y-3 text-gray-600">
                                    <p className="flex justify-between">
                                        <span>Tổng tất cả:</span>
                                        <span className="font-semibold">{totals.totalAmount}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Tổng đã chọn:</span>
                                        <span className="font-semibold">{totals.selectedTotal}</span>
                                    </p>
                                </div>
                                {checkoutError && <p className="text-sm text-red-500 mt-3">{checkoutError}</p>}
                                <button
                                    onClick={handleProceedToCheckout}
                                    className="mt-4 w-full py-3 text-white bg-yellow-600 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition"
                                >
                                    Tiến Hành Thanh Toán
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Cart;
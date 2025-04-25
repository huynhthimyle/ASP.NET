import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrderDetailService from '../service/OrderDetailService';
import ProductService from '../service/ProductService';

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const data = await OrderDetailService.getOrderDetails(orderId);

                if (data && data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        try {
                            const product = await ProductService.getById(data[i].productId);
                            data[i].product = product;
                        } catch (error) {
                            console.error(`Lỗi khi tải sản phẩm ${data[i].productId}:`, error);
                            data[i].product = null;
                        }
                    }

                    setOrder({
                        orderId,
                        order_details: data
                    });
                } else {
                    setError("Không có chi tiết đơn hàng hoặc sản phẩm.");
                }
            } catch (error) {
                console.error("Lỗi khi tải chi tiết đơn hàng:", error);
                setError("Có lỗi xảy ra khi tải thông tin đơn hàng");
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetail();
        } else {
            setError("Không tìm thấy mã đơn hàng trong URL");
            setLoading(false);
        }
    }, [orderId]);

    if (loading) return <div className="p-6 text-lg font-medium text-center">Đang tải dữ liệu đơn hàng...</div>;
    if (error) return <div className="p-6 text-lg font-semibold text-center text-red-500">{error}</div>;
    if (!order || !order.order_details || order.order_details.length === 0)
        return <div className="p-6 text-lg text-center text-gray-500">Không có sản phẩm nào trong đơn hàng.</div>;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = order.order_details.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(order.order_details.length / itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
                🧾 Chi tiết đơn hàng #{order.orderId}
            </h1>

            <div className="p-6 bg-white shadow-md rounded-xl">
                <h2 className="pb-2 mb-6 text-2xl font-semibold text-gray-700 border-b">Sản phẩm trong đơn hàng</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-center border border-gray-200">
                        <thead className="text-gray-700 bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 border">ID</th>
                                <th className="px-4 py-3 border">Đơn hàng</th>
                                <th className="px-4 py-3 border">ID: Sản phẩm</th>
                                <th className="px-4 py-3 border">Tên sản phẩm</th>
                                <th className="px-4 py-3 border">Ảnh</th>
                                <th className="px-4 py-3 border">Giá (₫)</th>
                                <th className="px-4 py-3 border">Số lượng</th>
                                <th className="px-4 py-3 border">Tổng giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((detail, index) => {
                                const product = detail.product;
                                const price = product?.price || 0;
                                const quantity = detail.quantity || 0;
                                const total = price * quantity;

                                return (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 border">{detail.id}</td>
                                        <td className="px-4 py-3 border">{detail.orderId}</td>
                                        <td className="px-4 py-3 border">{detail.productId}</td>
                                        <td className="px-4 py-3 font-medium text-gray-800 border">
                                            {product?.name || 'Không có sản phẩm'}
                                        </td>
                                        <td className="px-4 py-3 border">
                                            {product?.imageUrl ? (
                                                <img
                                                    src={`https://localhost:7192/images/${product.imageUrl}`}
                                                    alt={product.name}
                                                    className="object-cover w-16 h-16 mx-auto border border-gray-300"
                                                />
                                            ) : (
                                                <span className="text-gray-400">Không có ảnh</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-green-600 border">
                                            {price.toLocaleString('vi-VN')}₫
                                        </td>
                                        <td className="px-4 py-3 border">{quantity}</td>
                                        <td className="px-4 py-3 font-semibold text-blue-700 border">
                                            {total.toLocaleString('vi-VN')}₫
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-center mt-4 space-x-2">
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
                            className={`px-3 py-1 rounded ${currentPage === i + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
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
            </div>

            <div className="mt-8 text-center">
                <Link
                    to="/order"
                    className="inline-block px-6 py-2 text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
                >
                    ⬅ Quay lại danh sách đơn hàng
                </Link>
            </div>
        </div>
    );
};

export default OrderDetail;

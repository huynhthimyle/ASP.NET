import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import CategoryService from './../service/CategorySerice';
import ProductService from './../service/ProductService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const result = await ProductService.getList();
                setProducts(result || []);
                const categoriesResult = await CategoryService.getList();
                setCategories(categoriesResult || []);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu sản phẩm hoặc danh mục:', error);
            }
        };
        fetchProductsAndCategories();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm với ID: ${id}?`)) {
            try {
                await ProductService.deleteProduct(id);
                setProducts(products.filter(product => product.id !== id));
                toast.success(`Đã xóa sản phẩm với ID: ${id}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                });
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
                toast.error('Không thể xóa sản phẩm. Vui lòng thử lại.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                });
            }
        }
    };

    const getCategoryNameById = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : 'Không rõ';
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container p-4 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="mb-4 text-2xl font-bold">Danh Sách Sản Phẩm</h1>
                <Link
                    to="/product/add"
                    className="flex items-center gap-2 px-4 py-2 mb-4 text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                >
                    <IoMdAddCircleOutline size={20} />
                    Thêm sản phẩm
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="text-gray-700 bg-gray-200">
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">STT</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">ID</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Tên sản phẩm</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Hình ảnh</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Giá</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Mô tả</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Danh mục</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Số lượng</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.length > 0 ? (
                            currentItems.map((product, index) => (
                                <tr key={product.id} className="transition duration-200 hover:bg-gray-100">
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.id}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                        <img
                                            src={`https://localhost:7192/images/${product.imageUrl}`}
                                            alt={product.name}
                                            className="object-cover w-16 h-16 rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.price} vnđ</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.description}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                        {getCategoryNameById(product.categoryId)}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.quantity}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                        <div className="flex justify-center space-x-4">
                                            <Link
                                                to={`/product/edit/${product.id}`}
                                                className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                                            >
                                                <FaEdit className="mr-1" />
                                                Sửa
                                            </Link>
                                            <button
                                                className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <FaTrash className="mr-1" />
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">Không có sản phẩm nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
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

            {/* Toast Notification */}
            <ToastContainer />
        </div>
    );
}

export default Product;

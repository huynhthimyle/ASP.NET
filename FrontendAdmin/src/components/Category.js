import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import CategoryService from './../service/CategorySerice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Category() {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 7;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await CategoryService.getList();
                if (Array.isArray(result)) {
                    setCategories(result);
                } else if (result?.categories) {
                    setCategories(result.categories);
                } else {
                    setCategories([]);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách danh mục:', error);
                setCategories([]);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục với ID: ${id}?`)) {
            try {
                await CategoryService.deleteCategory(id);
                setCategories(categories.filter(category => category.id !== id));
                toast.success(`Đã xóa danh mục với ID: ${id}`, {
                    position: "top-right",
                    autoClose: 3000, // 3 giây
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,  // Không cho kéo thông báo
                });
            } catch (error) {
                console.error('Lỗi khi xóa danh mục:', error);
                toast.error('Không thể xóa danh mục. Vui lòng thử lại.', {
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

    const indexOfLast = currentPage * categoriesPerPage;
    const indexOfFirst = indexOfLast - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container p-4 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="mb-4 text-2xl font-bold">Danh Sách Danh Mục</h1>
                <Link
                    to="/category/add"
                    className="flex items-center gap-2 px-4 py-2 mb-4 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                >
                    <IoMdAddCircleOutline size={20} />
                    Thêm danh mục
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="text-gray-700 bg-gray-200">
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">STT</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">ID</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Tên danh mục</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Mô tả</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCategories.length > 0 ? (
                            currentCategories.map((category, index) => (
                                <tr key={category.id} className="transition duration-200 hover:bg-gray-100">
                                    <td className="px-4 py-4 text-sm border-b">{indexOfFirst + index + 1}</td>
                                    <td className="px-4 py-4 text-sm border-b">{category.id}</td>
                                    <td className="px-4 py-4 text-sm border-b">{category.name}</td>
                                    <td className="px-4 py-4 text-sm border-b">{category.description}</td>
                                    <td className="px-4 py-4 text-sm border-b">
                                        <div className="flex justify-center space-x-4">
                                            <Link
                                                to={`/category/edit/${category.id}`}
                                                className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                            >
                                                <FaEdit className="mr-1" />
                                                Sửa
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="flex items-center justify-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
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
                                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">Không có danh mục nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Phân trang */}
            <div className="flex items-center justify-center mt-4 space-x-2">
                {/* Nút trang đầu */}
                <button
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                    disabled={currentPage === 1}
                >
                    Đầu
                </button>

                {/* Nút Previous */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                    disabled={currentPage === 1}
                >
                    Trước
                </button>

                {/* Các nút trang */}
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {i + 1}
                    </button>
                ))}

                {/* Nút Next */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                    disabled={currentPage === totalPages}
                >
                    Sau
                </button>

                {/* Nút trang cuối */}
                <button
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                    disabled={currentPage === totalPages}
                >
                    Cuối
                </button>
            </div>

            {/* Đảm bảo ToastContainer được đặt đúng */}
            <ToastContainer />
        </div>
    );
}

export default Category;

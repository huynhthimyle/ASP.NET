import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerService from './../service/BannerSevice';

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const bannersPerPage = 4;

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const result = await BannerService.getList();
                if (Array.isArray(result) && result.length > 0) {
                    setBanners(result);
                } else {
                    console.log("Không có banner nào.");
                }
            } catch (err) {
                console.error("Error fetching banners:", err);
                setError(err);
            }
        };

        fetchBanners();
    }, []);

    const handleDeleteBanner = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa banner này không?")) {
            try {
                await BannerService.deleteBanner(id);
                setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
                toast.success("Xóa banner thành công!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    progressStyle: { background: '#4ade80' },
                });
            } catch (err) {
                console.error("Error deleting banner:", err);
                setError(err);
                toast.error("Lỗi khi xóa banner!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    progressStyle: { background: '#f87171' },
                });
            }
        }
    };

    const indexOfLast = currentPage * bannersPerPage;
    const indexOfFirst = indexOfLast - bannersPerPage;
    const currentBanners = banners.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(banners.length / bannersPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container p-6 mx-auto bg-gray-50">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Quản lý Quảng cáo</h1>
                <Link
                    to="/banner/add"
                    className="flex items-center px-6 py-3 text-white transition duration-300 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
                >
                    <IoMdAddCircleOutline className="mr-2" />
                    Thêm quảng cáo
                </Link>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="text-sm text-gray-700 uppercase bg-gray-200">
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-300">Id</th>
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-300">Tên</th>
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-300">Hình ảnh</th>
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-300">Mô tả</th>
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-300">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBanners.length > 0 ? (
                            currentBanners.map((banner) => (
                                <tr key={banner.id} className="transition duration-300 ease-in-out hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">{banner.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">{banner.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">
                                        {banner.imageUrl && (
                                            <img
                                                src={`https://localhost:7192/images/${banner.imageUrl}`}
                                                alt={banner.name}
                                                className="object-cover w-48 h-20 mx-auto border border-gray-300 rounded-lg"
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">{banner.description}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">
                                        <div className="flex items-center justify-center space-x-4">
                                            <Link
                                                to={`/banner/edit/${banner.id}`}
                                                className="flex items-center px-4 py-2 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
                                            >
                                                <FaEdit size={18} />
                                                <span className="ml-2">Sửa</span>
                                            </Link>
                                            <button
                                                className="flex items-center px-4 py-2 text-white transition duration-300 bg-red-500 rounded hover:bg-red-600"
                                                onClick={() => handleDeleteBanner(banner.id)}
                                            >
                                                <FaTrash size={18} />
                                                <span className="ml-2">Xóa</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 border-b border-gray-200">
                                    Không có quảng cáo nào.
                                </td>
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

            {error && <p className="mt-4 text-center text-red-500">{error.message}</p>}

            {/* Toast notification container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Banner;

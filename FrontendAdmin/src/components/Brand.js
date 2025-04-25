import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import BrandService from '../service/BrandService';
import { ApiImage } from '../api/ApiImage';

const Brand = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await BrandService.getList();
            setBrands(result.brands);
        })();
    }, []);

    const handleDelete = (id) => {
        alert(`Xóa thương hiệu với ID: ${id}`);
        // Logic xóa thương hiệu tại đây
    };

    const handleEdit = (id) => {
        alert(`Chỉnh sửa thương hiệu với ID: ${id}`);
        // Logic chỉnh sửa thương hiệu tại đây
    };

    return (
        <div className="container px-4 py-6 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center">Quản Lý Thương Hiệu</h1>
            <div className="mb-4 text-right">
                <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                    Thêm Thương Hiệu
                </button>
            </div>
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border">STT</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border">ID</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border">Tên</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border">Hình ảnh</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.length > 0 ? (
                            brands.map((brand, index) => (
                                <tr key={brand.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900 border">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border">{brand.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border">{brand.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border">
                                        {brand.thumbnail && (
                                            <img src={`${ApiImage}/images/brand/${brand.thumbnail}`} alt={brand.name} className="object-cover w-16 h-16" />
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => handleEdit(brand.id)}
                                                className="text-yellow-500 hover:text-yellow-600"
                                                aria-label={`Edit ${brand.name}`}
                                            >
                                                <FaEdit size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(brand.id)}
                                                className="text-red-500 hover:text-red-600"
                                                aria-label={`Delete ${brand.name}`}
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 border">
                                    Không có thương hiệu nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Brand;

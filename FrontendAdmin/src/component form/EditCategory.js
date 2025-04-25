import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryService from './../service/CategorySerice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditCategory() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchCategory = async () => {
                try {
                    const category = await CategoryService.getCategoryById(id);
                    if (category && category.id) {
                        setName(category.name);
                        setDescription(category.description);
                    } else {
                        toast.error('Không tìm thấy danh mục', {
                            className: 'toast-error',
                        });
                    }
                } catch (error) {
                    console.error('Lỗi khi tải danh mục:', error);
                    toast.error('Có lỗi xảy ra khi tải danh mục', {
                        className: 'toast-error',
                    });
                }
            };

            fetchCategory();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !description) {
            toast.error('Tên và mô tả không được để trống.', {
                className: 'toast-error',
            });
            return;
        }
    
        try {
            setLoading(true);
    
            const categoryData = {
                id: id,
                name: name,
                description: description
            };
    
            await CategoryService.updateCategory(id, categoryData);
    
            toast.success('Cập nhật danh mục thành công', {
                className: 'toast-success',
            });
    
            setTimeout(() => {
                navigate('/category');
            }, 2000);
        } catch (error) {
            console.error('Lỗi khi cập nhật danh mục:', error.response || error);
            toast.error('Có lỗi xảy ra khi cập nhật danh mục. Vui lòng thử lại.', {
                className: 'toast-error',
            });
        } finally {
            setLoading(false);
        }
    };
    

    const handleExit = () => {
        navigate('/category');
    };

    return (
        <div className="max-w-lg p-8 mx-auto bg-white rounded-lg shadow-lg">
            <h1 className="mb-6 text-2xl font-bold text-center text-indigo-600">Chỉnh Sửa Danh Mục</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Tên Danh Mục</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Mô Tả</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className={`flex items-center justify-center w-full px-4 py-2 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Đang Cập Nhật...' : 'Cập Nhật'}
                </button>
            </form>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handleExit}
                    className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-100"
                >
                    Thoát
                </button>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover={false}
                draggable={false}
                style={{
                    marginTop: '30px', // Thêm khoảng cách thụt lùi cho tất cả toast
                }}
            />
        </div>
    );
}

export default EditCategory;

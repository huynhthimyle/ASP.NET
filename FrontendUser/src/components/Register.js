import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from './../service/UserService';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password || !phone || !address) {
            toast.warn('Vui lòng điền đầy đủ thông tin!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            setLoading(false);
            return;
        }

        const userData = {
            name,
            email,
            phone,
            address,
            password,
            description,
        };

        try {
            const response = await UserService.addUser(userData);
            console.log("Response from API:", response);

            const { message, token, email: responseEmail, name: responseName } = response || {};

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('email', responseEmail);

                toast.success('Đăng ký thành công!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                console.error('Dữ liệu không hợp lệ từ API:', response);
                toast.error('Dữ liệu không hợp lệ từ API', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
            }
        } catch (error) {
            console.error('Lỗi đăng ký:', error);

            const errorMsg = error.response?.data?.message || error.message || 'Vui lòng thử lại.';
            toast.error(`Đăng ký thất bại! ${errorMsg}`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 py-12 min-h-screen">
            <ToastContainer />
            <section className="flex items-center justify-center px-4">
                <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Đăng Ký Tài Khoản</h2>
                    <form onSubmit={handleAuth} className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Họ và tên</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Nhập họ và tên"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Nhập email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Nhập số điện thoại"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Địa chỉ</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Nhập địa chỉ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Mô tả</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Nhập mô tả (không bắt buộc)"
                                rows="3"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Mật khẩu</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Nhập mật khẩu"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 text-sm font-medium text-white rounded transition ${loading
                                    ? 'bg-yellow-400 cursor-not-allowed'
                                    : 'bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                                }`}
                        >
                            {loading ? 'Đang xử lý...' : 'Đăng ký'}
                        </button>
                    </form>

                    <div className="mt-6 text-sm text-center text-gray-600">
                        Đã có tài khoản?{' '}
                        <Link to="/login" className="font-medium text-yellow-600 hover:text-yellow-700">
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Register;
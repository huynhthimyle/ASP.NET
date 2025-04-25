import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from './../service/UserService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warn('Vui lòng nhập đầy đủ email và mật khẩu.', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            return;
        }

        setLoading(true);

        try {
            const response = await UserService.login({ email, password });

            console.log('Login response:', response);

            const { token, id, email: userEmail } = response;

            if (token && id && userEmail) {
                localStorage.setItem('user', JSON.stringify({ token, id, email: userEmail }));

                toast.success('Đăng nhập thành công!', {
                    position: 'top-right',
                    autoClose: 2000,
                });

                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                toast.error('Dữ liệu không hợp lệ từ API.');
            }
        } catch (error) {
            const errorMsg = error?.response?.data?.message || 'Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.';
            toast.error(errorMsg, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            console.error('Login error:', error?.response || error.message || error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <section className="flex items-center justify-center px-4 py-12 bg-gray-50 min-h-screen">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Đăng Nhập</h2>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Nhập email"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                id="password"
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
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-600">
                        Chưa có tài khoản?{' '}
                        <Link to="/register" className="font-medium text-yellow-600 hover:text-yellow-700">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </section>
        </>
    );
};

export default Login;
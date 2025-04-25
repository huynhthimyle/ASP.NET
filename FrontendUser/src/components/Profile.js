import React, { useEffect, useState } from 'react';
import UserService from './../service/UserService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          const userId = user.id;
          const response = await UserService.getUserById(userId);
          if (response) {
            setUserData(response);
            setFormData(response);
          } else {
            setError('Không tìm thấy dữ liệu người dùng.');
            toast.error('Không tìm thấy dữ liệu người dùng!', {
              position: 'top-right',
              autoClose: 2000,
            });
          }
        } else {
          setError('Bạn chưa đăng nhập.');
          toast.error('Bạn chưa đăng nhập!', {
            position: 'top-right',
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (error) {
        console.error('Lỗi khi tải thông tin người dùng:', error);
        setError('Lỗi khi tải thông tin người dùng.');
        toast.error('Lỗi khi tải thông tin người dùng!', {
          position: 'top-right',
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        id: userData.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        description: formData.description,
      };

      await UserService.updateUser(userData.id, updatedUser);
      setUserData(updatedUser);
      setIsEditing(false);

      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser) {
        const updatedLocal = { ...currentUser, email: updatedUser.email };
        localStorage.setItem('user', JSON.stringify(updatedLocal));
      }

      toast.success('Cập nhật thông tin thành công!', {
        position: 'top-right',
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data || 'Không thể cập nhật thông tin. Vui lòng thử lại.';
      setError(errorMessage);
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Thông Tin Người Dùng</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {error && (
            <p className="text-center text-lg text-red-500 mb-4">{error}</p>
          )}

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Họ và tên</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Nhập email"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Nhập địa chỉ"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Mô tả</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Nhập mô tả ngắn"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(userData);
                  }}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 text-sm font-medium text-white rounded transition ${loading
                    ? 'bg-yellow-400 cursor-not-allowed'
                    : 'bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                    }`}
                >
                  {loading ? 'Đang xử lý...' : 'Lưu'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Họ và tên:</span>
                <p className="text-gray-900">{userData?.name || 'Chưa có thông tin'}</p>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Email:</span>
                <p className="text-gray-900">{userData?.email || 'Chưa có thông tin'}</p>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Số điện thoại:</span>
                <p className="text-gray-900">{userData?.phone || 'Chưa có thông tin'}</p>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Địa chỉ:</span>
                <p className="text-gray-900">{userData?.address || 'Chưa có thông tin'}</p>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Mô tả:</span>
                <p className="text-gray-900">{userData?.description || 'Chưa có thông tin'}</p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                className={`mt-6 w-full py-3 text-sm font-medium text-white rounded transition ${loading
                  ? 'bg-yellow-400 cursor-not-allowed'
                  : 'bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                  }`}
              >
                {loading ? 'Đang xử lý...' : 'Chỉnh sửa'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from '../service/UserService';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  const fetchUsers = async () => {
    try {
      const result = await UserService.getList();
      setUsers(result.users);  // Set the users from the result
    } catch (err) {
      setError('Không thể tải danh sách người dùng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xóa người dùng
  const handleDelete = async (userId) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản với ID: ${userId}?`))
    {
      try {
        await UserService.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        toast.success('Xóa người dùng thành công!', { position: 'top-right', autoClose: 3000 });
      } catch (err) {
        const errorMessage = err.response ? err.response.data : 'Không thể xóa người dùng. Vui lòng thử lại.';
        setError(errorMessage);
        toast.error(errorMessage, { position: 'top-right', autoClose: 3000 });
      }
    }
    
  };

  const handleSave = async (userId, updatedData) => {
    try {
      const updatedUser = {
        id: userId,
        name: updatedData.name,
        email: updatedData.email,
        phone: updatedData.phone,
        address: updatedData.address,
        description: updatedData.description
      };

      // Update user using the correct method name: updateUser
      await UserService.updateUser(userId, updatedUser);
      setUsers(users.map(user => (user.id === userId ? updatedUser : user)));
      setEditingUser(null);
      toast.success('Cập nhật người dùng thành công!', { position: 'top-right', autoClose: 3000 });
    } catch (err) {
      const errorMessage = err.response ? err.response.data : 'Không thể cập nhật người dùng. Vui lòng thử lại.';
      setError(errorMessage);
      toast.error(errorMessage, { position: 'top-right', autoClose: 3000 });
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div className="p-4 text-center">Đang tải...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-gray-700">Danh Sách Người Dùng</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-left border-b">ID</th>
              <th className="px-4 py-3 text-sm font-medium text-left border-b">Tên</th>
              <th className="px-4 py-3 text-sm font-medium text-left border-b">Email</th>
              <th className="px-4 py-3 text-sm font-medium text-left border-b">Điện thoại</th>
              <th className="px-4 py-3 text-sm font-medium text-left border-b">Địa chỉ</th>
              <th className="px-4 py-3 text-sm font-medium text-left border-b">Mô tả</th>
              <th className="px-4 py-3 text-sm font-medium text-left border-b">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-4 text-sm">{user.id}</td>
                <td className="px-4 py-4 text-sm">{user.name}</td>
                <td className="px-4 py-4 text-sm">{user.email}</td>
                <td className="px-4 py-4 text-sm">{user.phone}</td>
                <td className="px-4 py-4 text-sm">{user.address}</td>
                <td className="px-4 py-4 text-sm">{user.description}</td>
                <td className="px-4 py-4 text-sm">
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      <FaEdit className="mr-2" /> Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="flex items-center justify-center px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                      <FaTrash className="mr-2" /> Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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

      {/* Modal chỉnh sửa người dùng */}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-md shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Chỉnh sửa người dùng</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(editingUser.id, editingUser);
              }}
            >
              <input
                type="text"
                placeholder="Tên"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Điện thoại"
                value={editingUser.phone}
                onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Địa chỉ"
                value={editingUser.address}
                onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <textarea
                placeholder="Mô tả"
                value={editingUser.description}
                onChange={(e) => setEditingUser({ ...editingUser, description: e.target.value })}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <button type="submit" className="px-4 py-2 mr-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                Cập nhật
              </button>
              <button type="button" onClick={handleCancel} className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700">
                Thoát
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default User;

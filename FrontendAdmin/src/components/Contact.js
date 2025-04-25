import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ContactService from './../service/ContactService';
import { toast, ToastContainer } from 'react-toastify'; // Đảm bảo import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của Toastify

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await ContactService.getList();
        console.log("Kết quả từ API:", result);

        if (Array.isArray(result)) {
          setContacts(result);
        } else {
          console.error("Kết quả không phải là một mảng hoặc không có cấu hình:", result);
          setContacts([]);
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
        setContacts([]);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) {
      try {
        await ContactService.deleteContact(id);
        // Cập nhật lại danh sách liên hệ sau khi xóa
        setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== id));

        // Hiển thị thông báo thành công
        toast.success('Xóa liên hệ thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      } catch (error) {
        console.error("Lỗi khi xóa liên hệ:", error);

        // Hiển thị thông báo lỗi
        toast.error('Có lỗi xảy ra khi xóa liên hệ. Vui lòng thử lại.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    }
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="flex items-center justify-between mb-6 text-2xl font-semibold text-gray-800">Quản Lý Liên Hệ</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full leading-normal table-auto">
          <thead>
            <tr className="text-sm text-gray-700 uppercase bg-gray-100">
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">ID</th>
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Tên</th>
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Email</th>
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Địa Chỉ</th>
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Số Điện Thoại</th>
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {contacts && contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id} className="transition duration-200 ease-in-out hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{contact.id}</td>
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{contact.name}</td>
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{contact.email}</td>
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{contact.address}</td>
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{contact.phone}</td>
                  <td className="px-4 py-4 text-sm border-b">
                    <div className="flex justify-center space-x-4">
                      <Link
                        to={`/contact/edit/${contact.id}`}
                        className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        <FaEdit className="mr-1" />
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(contact.id)}
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
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 border-b">
                  Không có cấu hình nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer /> {/* Đảm bảo ToastContainer được thêm vào */}
    </div>
  );
};

export default Contact;

import React, { useState, useEffect } from 'react';
import ContactService from './../service/ContactService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedPhone = formData.phone.replace(/\D/g, '');
    const updatedFormData = { ...formData, phone: formattedPhone };

    try {
      await ContactService.addContact(updatedFormData);

      toast.success('Thêm liên hệ thành công!', {
        position: 'top-right',
        autoClose: 2000,
        progress: undefined,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
    } catch (error) {
      console.error('Lỗi khi thêm liên hệ:', error);

      toast.error('Có lỗi xảy ra, vui lòng thử lại!', {
        position: 'top-right',
        autoClose: 2000,
        progress: undefined,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Liên Hệ Với Chúng Tôi</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Tên</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Tên của bạn"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Email của bạn"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Số điện thoại của bạn"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Địa chỉ của bạn"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2 text-sm font-semibold text-white bg-yellow-600 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition"
                disabled={loading}
              >
                {loading ? 'Đang gửi...' : 'Gửi Liên Hệ'}
              </button>
            </form>
          </div>

          {/* Map and Contact Info */}
          <div className="space-y-6">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0908312620244!2d106.76939567590333!3d10.918033389235105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291a3c814c4f%3A0x9cc22b5ff22b88a4!2zxJDhuqFpIEFuLCBCw6xuaCBExrDGoW5n!5e0!3m2!1svi!2s!4v1713941574205!5m2!1svi!2s"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                title="Google Map Location - Dĩ An, Bình Dương"
              ></iframe>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-semibold">Địa chỉ:</p>
              <p>Dĩ An, Bình Dương</p>
              <p className="mt-2 font-semibold">Hotline:</p>
              <p>09123.456.789</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
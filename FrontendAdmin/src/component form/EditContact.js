import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContactService from './../service/ContactService'; // Sử dụng ContactService
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditContact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchContact = async () => {
                try {
                    const contact = await ContactService.getContactById(id);
                    if (contact && contact.id) {
                        setName(contact.name);
                        setEmail(contact.email);
                        setPhone(contact.phone);
                        setAddress(contact.address);
                    } else {
                        toast.error('Không tìm thấy liên hệ', {
                            className: 'toast-error',
                        });
                    }
                } catch (error) {
                    console.error('Lỗi khi tải liên hệ:', error);
                    toast.error('Có lỗi xảy ra khi tải liên hệ', {
                        className: 'toast-error',
                    });
                }
            };

            fetchContact();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !email || !phone || !address) {
            toast.error('Tên, email, số điện thoại và địa chỉ không được để trống.', {
                className: 'toast-error',
            });
            return;
        }
    
        try {
            setLoading(true);
    
            const contactData = {
                id: id,
                name: name,
                email: email,
                phone: phone,
                address: address
            };
    
            await ContactService.updateContact(id, contactData);
    
            toast.success('Cập nhật liên hệ thành công', {
                className: 'toast-success',
            });
    
            setTimeout(() => {
                navigate('/contact');
            }, 2000);
        } catch (error) {
            console.error('Lỗi khi cập nhật liên hệ:', error.response || error);
            toast.error('Có lỗi xảy ra khi cập nhật liên hệ. Vui lòng thử lại.', {
                className: 'toast-error',
            });
        } finally {
            setLoading(false);
        }
    };
    

    const handleExit = () => {
        navigate('/contact');
    };

    return (
        <div className="max-w-lg p-8 mx-auto bg-white rounded-lg shadow-lg">
            <h1 className="mb-6 text-2xl font-bold text-center text-indigo-600">Chỉnh Sửa Liên Hệ</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Tên Liên Hệ</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Số Điện Thoại</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Địa Chỉ</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
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

export default EditContact;

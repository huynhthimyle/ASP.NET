import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", product.name);
    formData.append("Description", product.description);
    formData.append("Price", product.price);
    formData.append("Quantity", product.quantity);
    formData.append("CategoryId", product.categoryId);
    if (imageFile) {
      formData.append("ImageFile", imageFile);
    }

    try {
      await axios.post("https://localhost:7192/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Tạo sản phẩm thành công!", {
        position: "top-right",
        autoClose: 3000,  // Thông báo tự động đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      // Chuyển trang sau khi thông báo
      setTimeout(() => {
        navigate("/product"); // Chuyển hướng sang trang sản phẩm
      }, 2000);

      setProduct({ name: "", description: "", price: "", categoryId: "" });
      setImageFile(null);
    } catch (err) {
      toast.error("Lỗi khi tạo sản phẩm. Vui lòng kiểm tra dữ liệu.", {
        position: "top-right",
        autoClose: 3000,  // Thông báo tự động đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  // Function to handle cancel button click
  const handleCancel = () => {
    navigate("/product"); // Navigate to product listing page or another page
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 bg-white shadow-xl rounded-xl">
      <h2 className="mb-4 text-2xl font-bold">Thêm Sản Phẩm Mới</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            placeholder="Nhập tên sản phẩm"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium">Mô tả</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            placeholder="Nhập mô tả sản phẩm"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium">Giá</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            placeholder="Nhập giá sản phẩm"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium">ID Danh mục</label>
          <input
            type="text"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
            placeholder="Nhập ID danh mục"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium">Số lượng</label>
          <input
            type="text"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            placeholder="Nhập số lượng sản phẩm"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium">Hình ảnh</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Thêm sản phẩm
          </button>
          <button
            type="button"
            onClick={handleCancel} // Cancel action
            className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Thoát
          </button>
        </div>
      </form>

      {/* Thêm ToastContainer ở đây */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddProduct;

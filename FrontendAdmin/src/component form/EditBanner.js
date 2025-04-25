import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBanner = () => {
  const [banner, setBanner] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(`https://localhost:7192/api/banner/${id}`);
        setBanner(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy banner:", err);
        toast.error("Lỗi khi lấy thông tin banner.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    };

    fetchBanner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanner((prev) => ({
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
    formData.append("name", banner.name);
    formData.append("description", banner.description);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      await axios.put(
        `https://localhost:7192/api/banner/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Cập nhật banner thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });

      setTimeout(() => {
        navigate("/banner");
      }, 2000);
    } catch (err) {
      console.error("Lỗi khi cập nhật banner:", err);
      toast.error("Lỗi khi cập nhật banner.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  const handleCancel = () => {
    navigate("/banner");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container max-w-3xl p-6 mx-auto mt-10 bg-white shadow-xl rounded-xl">
      <h2 className="mb-6 text-2xl font-bold text-center">Chỉnh sửa banner</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg">Tên banner</label>
          <input
            type="text"
            name="name"
            value={banner.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg">Mô tả</label>
          <textarea
            name="description"
            value={banner.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {banner.imageUrl && (
          <div>
            <label className="block text-lg">Ảnh hiện tại</label>
            <img
              src={`https://localhost:7192/images/${banner.imageUrl}`}
              alt={banner.name}
              className="object-cover w-20 h-20 mb-4 rounded-lg"
            />
          </div>
        )}

        <div>
          <label className="block text-lg">Chọn ảnh mới</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-start mt-6 space-x-4">
          <button
            type="submit"
            className="px-6 py-3 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Cập nhật banner
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Thoát
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable={false}
      />
    </div>
  );
};

export default EditBanner;

import Api from "../api/Api";

const BannerService = {
    // Lấy danh sách banner
     getList: async () => {
        const token = localStorage.getItem("token");
        const response = await Api.get("banner", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response); // In ra toàn bộ phản hồi để kiểm tra
        return response;
    },

    // Thêm banner mới
    addBanner: async (bannerData) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await Api.post('banner', bannerData, {
            headers: {
                Authorization: `Bearer ${token}`  // Thêm token vào header
            }
        });
        console.log(response);  // In ra phản hồi khi thêm banner
        return response;
    },

    // Sửa thông tin banner
    updateBanner: async (id, bannerData) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await Api.put(`banner/${id}`, bannerData, {
            headers: {
                Authorization: `Bearer ${token}`  // Thêm token vào header
            }
        });
        console.log(response);  // In ra phản hồi khi sửa banner
        return response;
    },

    // Xóa banner
    deleteBanner: async (id) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await Api.delete(`banner/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`  // Thêm token vào header
            }
        });
        console.log(response);  // In ra phản hồi khi xóa banner
        return response;
    }
};

export default BannerService;

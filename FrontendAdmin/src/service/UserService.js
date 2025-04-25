import Api from "../api/Api";

const UserService = {
    // Lấy danh sách người dùng
    getList: async () => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await Api.get("user", {
            headers: {
                Authorization: `Bearer ${token}`  // Thêm token vào header
            }
        });
        console.log(response);  // In ra toàn bộ phản hồi để kiểm tra
        return response;
    },

    // Thêm người dùng mới
    addUser: async (userData) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await Api.post("user", userData, {
            headers: {
                Authorization: `Bearer ${token}`  // Thêm token vào header
            }
        });
        console.log(response);  // In ra phản hồi khi thêm người dùng
        return response;
    },

    // Sửa thông tin người dùng
    updateUser: async (userId, userData) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await Api.put(`user/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`  // Thêm token vào header
            }
        });
        console.log(response);  // In ra phản hồi khi sửa người dùng
        return response;
    },

    // Xóa người dùng
    deleteUser: async (userId) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await Api.delete(`user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`  // Thêm token vào header
            }
        });
        console.log(response);  // In ra phản hồi khi xóa người dùng
        return response;
    }
};

export default UserService;

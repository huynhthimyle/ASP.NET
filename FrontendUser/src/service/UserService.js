// UserService.js
import Api from "../api/Api";

const UserService = {
    // Lấy danh sách người dùng
    getList: async () => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        try {
            const response = await Api.get("user", {
                headers: {
                    Authorization: `Bearer ${token}`  // Thêm token vào header
                }
            });
            console.log('Response from getList:', response);  // In ra toàn bộ phản hồi để kiểm tra
            return response;
        } catch (error) {
            console.error('Error fetching users:', error);  // In lỗi nếu có
            throw error;
        }
    },

    // Lấy thông tin người dùng theo ID
    getUserById: async (userId) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        try {
            const response = await Api.get(`user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`  // Thêm token vào header
                }
            });
            console.log('Response from getUserById:', response);  // In ra phản hồi để kiểm tra
            return response;
        } catch (error) {
            console.error('Error fetching user by ID:', error);  // In lỗi nếu có
            throw error;
        }
    },

    // Thêm người dùng mới
    addUser: async (userData) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        try {
            const response = await Api.post("user/register", userData, {
                headers: {
                    Authorization: `Bearer ${token}`  // Thêm token vào header
                }
            });
            console.log('Response from addUser:', response);  // In ra phản hồi khi thêm người dùng
            return response;
        } catch (error) {
            console.error('Error adding user:', error);  // In lỗi nếu có
            throw error;
        }
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
        try {
            const response = await Api.delete(`user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`  // Thêm token vào header
                }
            });
            console.log('Response from deleteUser:', response);  // In ra phản hồi khi xóa người dùng
            return response;
        } catch (error) {
            console.error('Error deleting user:', error);  // In lỗi nếu có
            throw error;
        }
    },

    // Đăng nhập người dùng
    login: async (userData) => {
        try {
            const response = await Api.post("user/login", userData);  
            return response; // 👈 chỉ trả về data thôi!
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
};

export default UserService;

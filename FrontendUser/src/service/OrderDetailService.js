import Api from "../api/Api";
const OrderDetailService = {
    // Lấy tất cả chi tiết đơn hàng
    getAll: async () => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await Api.get("OrderDetail", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    // Lấy chi tiết đơn hàng theo ID
    getById: async (id) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await Api.get(`OrderDetail/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    getOrderDetails: async (orderId) => {
        const token = localStorage.getItem("token");
        const response = await Api.get(`OrderDetail/order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response; 
    },
    
    

    // Thêm chi tiết đơn hàng
    add: async (data) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await Api.post("OrderDetail", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    // Cập nhật chi tiết đơn hàng
    update: async (id, data) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await Api.put(`OrderDetail/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    // Xóa chi tiết đơn hàng
    delete: async (id) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await Api.delete(`OrderDetail/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },
};

export default OrderDetailService;

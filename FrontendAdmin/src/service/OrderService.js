import Api from "../api/Api";

const OrderService = {
    // Lấy danh sách đơn hàng
    getList: async () => {
        const token = localStorage.getItem("token");
        const response = await Api.get("order", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response); // In ra toàn bộ phản hồi để kiểm tra
        return response;
    },

    // Thêm đơn hàng mới
    addOrder: async (orderData) => {
        const token = localStorage.getItem("token");
        const response = await Api.post("order", orderData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response); // In ra phản hồi khi thêm đơn hàng
        return response;
    },

    // Sửa thông tin đơn hàng
    updateOrder: async (orderId, orderData) => {
        const token = localStorage.getItem("token");
        const response = await Api.put(`order/${orderId}`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response); // In ra phản hồi khi sửa đơn hàng
        return response;
    },

    // Xóa đơn hàng
    deleteOrder: async (orderId) => {
        const token = localStorage.getItem("token");
        const response = await Api.delete(`order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response); // In ra phản hồi khi xóa đơn hàng
        return response;
    }
};

export default OrderService;

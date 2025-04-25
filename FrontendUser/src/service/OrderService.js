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
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Đảm bảo Content-Type là application/json
      }
    });
    console.log(response);
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
    },
    getOrdersByUserId: async (userId) => {
        try {
          const response = await Api.get(`order/GetOrdersByUserId/${userId}`);
          return response;  // Trả về dữ liệu đơn hàng
        } catch (error) {
          throw new Error('Lỗi khi lấy danh sách đơn hàng');
        }
      },

      getOrderDetails: async (orderId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await Api.get(`order/GetOrderDetails/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response; // Assuming the response contains the data directly
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
            throw new Error("Có lỗi xảy ra khi lấy chi tiết đơn hàng");
        }
    },
};

export default OrderService;

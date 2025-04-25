import Api from "../api/Api";

const CartService = {
    // Lấy danh sách giỏ hàng của người dùng
    getCartByUserId: async (userId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await Api.get(`cart/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Giỏ hàng của người dùng:', response);
            return response;
        } catch (error) {
            console.error('Lỗi khi lấy giỏ hàng:', error);
            throw error;
        }
    },

    // Thêm sản phẩm vào giỏ hàng
    addToCart: async ({ userId, productId, quantity }) => {
        const token = localStorage.getItem("token");
        const payload = {
            UserId: Number(userId),
            ProductId: Number(productId),
            Quantity: Number(quantity),
        };
        return Api.post("Cart", payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
    

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartItem: async (cartId, updatedCartItem) => {
        const token = localStorage.getItem("token");
        try {
            const response = await Api.put(`cart/${cartId}`, updatedCartItem, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Giỏ hàng đã được cập nhật:', response);
            return response;
        } catch (error) {
            console.error('Lỗi khi cập nhật giỏ hàng:', error);
            throw error;
        }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: async (cartId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await Api.delete(`cart/${cartId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Sản phẩm đã bị xóa khỏi giỏ hàng:', response);
            return response;
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
            throw error;
        }
    },

    // Xóa toàn bộ giỏ hàng của người dùng
    clearCart: async (userId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await Api.delete(`cart/clear/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Giỏ hàng đã được làm sạch:', response);
            return response;
        } catch (error) {
            console.error('Lỗi khi làm sạch giỏ hàng:', error);
            throw error;
        }
    },

    // Kiểm tra giỏ hàng của người dùng
    getCartDetails: async (userId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await Api.get(`cart/details/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Chi tiết giỏ hàng của người dùng:', response);
            return response;
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết giỏ hàng:', error);
            throw error;
        }
    },
    removeCartItems: async (productIds, userId) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await Api.post(
          'cart/remove',
          { userId, productIds },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Remove cart items response:', response);
        return response;
      },
};

export default CartService;

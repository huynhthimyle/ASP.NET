import Api from "../api/Api";

const ProductService = {
    // Lấy danh sách sản phẩm
    getList: async () => {
        const token = localStorage.getItem("token");
        const response = await Api.get('product', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Danh sách sản phẩm:', response);
        return response;
    },

    // Lấy sản phẩm theo ID
    getProductById: async (productId) => {
        const token = localStorage.getItem("token");
        const response = await Api.get(`product/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Sản phẩm theo ID:', response);
        return response;
    },

    // Lấy sản phẩm theo danh mục
    getProductsByCategory: async (categoryId) => {
        const token = localStorage.getItem("token");
        const response = await Api.get(`product/ByCategory/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Sản phẩm theo danh mục:', response);
        return response;
    },
    getById: async (id) => {
        const token = localStorage.getItem("token");
        const response = await Api.get(`Product/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("🔍 response.data trả về từ ProductService:", response.data);
        return response;
    },
    


    // Cập nhật sản phẩm
    updateProduct: async (productId, updatedProductData) => {
        const token = localStorage.getItem("token");
        const response = await Api.put(`product/${productId}`, updatedProductData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Cập nhật sản phẩm:', response);
        return response;
    },

    // Xóa sản phẩm
    deleteProduct: async (productId) => {
        const token = localStorage.getItem("token");
        const response = await Api.delete(`product/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Xóa sản phẩm:', response);
        return response;
    },
    

    createProduct: async (productData) => {
        const token = localStorage.getItem("token");
        const response = await Api.post('product', productData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    },

    // Upload hình ảnh sản phẩm
    uploadProductImage: async (productId, imageFormData) => {
        const token = localStorage.getItem("token");
        const response = await Api.post(
            `product/UploadImage/${productId}`,
            imageFormData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response;
    }


};

export default ProductService;

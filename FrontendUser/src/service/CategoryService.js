import Api from "../api/Api";

const CategoryService = {
    // Lấy danh sách danh mục
    getList: async () => {
        const token = localStorage.getItem("token");
        const response = await Api.get("category", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    },

    // Lấy danh mục theo id
    getCategoryById: async (id) => {
        const token = localStorage.getItem("token");
        const response = await Api.get(`category/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;  // Trả về dữ liệu của danh mục theo id
    },

    // Thêm danh mục mới
    addCategory: async (categoryData) => {
        const token = localStorage.getItem("token");
    
        return await Api.post("category", categoryData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    },

    // Cập nhật danh mục
    updateCategory: async (id, categoryData) => {
        const token = localStorage.getItem("token");
        const response = await Api.put(`category/${id}`, categoryData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',  // Send data as JSON
            },
        });
        console.log(response);
        return response;
    },

    // Xóa danh mục
    deleteCategory: async (categoryId) => {
        const token = localStorage.getItem("token");
        const response = await Api.delete(`category/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    }
};

export default CategoryService;

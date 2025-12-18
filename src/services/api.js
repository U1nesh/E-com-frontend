import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const productAPI = {
    // 1. READ: Get all products from the backend
    getAllProducts: async () => {
        try {
            const response = await axios.get(`${API_URL}/getproduct`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Could not fetch products");
        }
    },

    // 2. CREATE: Add a new product
    createProduct: async (productData) => {
        try {
            const response = await axios.post(`${API_URL}/createproduct`, productData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Could not create product");
        }
    },

    // 3. UPDATE: Edit an existing product
    updateProduct: async (id, productData) => {
        try {
            const response = await axios.put(`${API_URL}/updateproduct/${id}`, productData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Could not update product");
        }
    },

    // 4. DELETE: Remove a product
    deleteProduct: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/deleteproduct/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Could not delete product");
        }
    }
};

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productAPI = {

    getAllProducts: async () => {
        try {
            const response = await api.get('/getproduct');
            return response.data; 
        } catch (error) {
            console.error("Error fetching all products:", error);
            throw error;
        }
    },


    createProduct: async (productData) => {
        try {
            const response = await api.post('/postProduct', productData);
            return response.data;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error.response?.data?.error || new Error("Failed to create product");
        }
    },


    updateProduct: async (id, productData) => {
        try {
            const response = await api.put(`/updateProduct/${id}`, productData);
            return response.data;
        } catch (error) {
            console.error(`Error updating product ID ${id}:`, error);
            throw error.response?.data?.error || new Error("Failed to update product");
        }
    },


    deleteProduct: async (id) => {
        try {
            const response = await api.delete(`/deleteProduct/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting product ID ${id}:`, error);
            throw error.response?.data?.error || new Error("Failed to delete product");
        }
    },
};

export default api;
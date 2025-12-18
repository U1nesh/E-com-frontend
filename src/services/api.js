import axios from 'axios';

// Use environment variable `VITE_API_URL` for flexibility.
// Fallbacks:
// - If running on localhost, default to http://localhost:5001/api so local backend (port 5001) is used.
// - Otherwise use a relative `/api` path so deployments that proxy API calls to a backend work without changes.
const API_BASE_URL = import.meta.env.VITE_API_URL ?? (location.hostname === 'localhost' ? 'http://localhost:5001/api' : '/api');

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productAPI = {
    // GET
    getAllProducts: async () => {
        try {
            const response = await api.get('/getproduct');
            return response.data; 
        } catch (error) {
            console.error("Error fetching all products:", error);
            throw error;
        }
    },

    // POST
    createProduct: async (productData) => {
        try {
            const response = await api.post('/postProduct', productData);
            return response.data;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error.response?.data?.error || new Error("Failed to create product");
        }
    },

    // PUT
    updateProduct: async (id, productData) => {
        try {
            const response = await api.put(`/updateProduct/${id}`, productData);
            return response.data;
        } catch (error) {
            console.error(`Error updating product ID ${id}:`, error);
            throw error.response?.data?.error || new Error("Failed to update product");
        }
    },

    // DELETE
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

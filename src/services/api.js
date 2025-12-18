import axios from 'axios';

// Use environment variable `VITE_API_URL` for flexibility.
// Compute a safe fallback without accessing `location` at module-eval time (avoids SSR/build errors).
// Behavior:
// - If `VITE_API_URL` is set, use it.
// - If in a browser and hostname is `localhost`, default to http://localhost:5001/api for local backend.
// - Otherwise use a relative `/api` so deployed apps can proxy to their backend.
const isBrowser = typeof window !== 'undefined' && window?.location;
const API_BASE_URL = import.meta.env.VITE_API_URL ?? (isBrowser && window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : '/api');

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

// mern-frontend/src/components/ProductForm.jsx

import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api'; 
import '../ProductStyles.css'; // Import CSS for form styling

const ProductForm = ({ onProductOperationComplete, editingProduct, onCancelEdit }) => {
    
    const initialFormState = {
        name: '', description: '', price: '', stock: '', category: '', image: '',
    };
    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect to Handle Editing Mode (Pre-filling the form)
    useEffect(() => {
        if (editingProduct) {
            setFormData({
                name: editingProduct.name || '',
                description: editingProduct.description || '',
                price: String(editingProduct.price || ''), 
                stock: String(editingProduct.stock || ''),
                category: editingProduct.category || '',
                image: editingProduct.image || '',
            });
        } else {
            setFormData(initialFormState);
        }
        setError(null);
    }, [editingProduct]); 

    // Handler for input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(null); 
    };

    // Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const submissionData = {
            ...formData,
            // Ensure price and stock are sent as numbers
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
        };

        try {
            let resultProduct;
            
            if (editingProduct) {
                // UPDATE LOGIC
                resultProduct = await productAPI.updateProduct(editingProduct._id, submissionData);
                alert(`Product '${resultProduct.name}' updated successfully!`);
            } else {
                // CREATE LOGIC
                resultProduct = await productAPI.createProduct(submissionData);
                alert(`Product '${resultProduct.name}' added successfully!`);
            }
            
            // Success Action 1: Notify the parent component (Home.jsx) to refresh the list
            if (onProductOperationComplete) {
                onProductOperationComplete(); 
            }
            
            // Success Action 2: Close the modal/form
            if (onCancelEdit) { 
                 onCancelEdit();
            }

        } catch (err) {
            // Handle and display error message from the server
            setError(err.message || 'An unexpected error occurred during submission.');
            console.error("Submission error:", err);

        } finally {
            setLoading(false);
        }
    };

    // Determine the title and button text based on mode
    const formTitle = editingProduct ? 'Edit Product' : 'Add New Product';
    const submitButtonText = editingProduct ? 'Save Changes' : 'Add Product';

    return (
        <div className="product-form-container">
            <h3>{formTitle}</h3>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                <input type="number" name="stock" placeholder="Stock Quantity" value={formData.stock} onChange={handleChange} />
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
                <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
                
                <button type="submit" disabled={loading}>
                    {loading ? (editingProduct ? 'Updating...' : 'Adding...') : submitButtonText}
                </button>
                
                {/* Cancel Button inside the form container */}
                {(editingProduct || !editingProduct) && (
                    <button 
                        type="button" 
                        onClick={onCancelEdit} 
                        className="cancel-form-btn" 
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default ProductForm;
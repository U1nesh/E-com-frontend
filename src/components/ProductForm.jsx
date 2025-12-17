import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api'; 
import '../ProductStyles.css';

const ProductForm = ({ onProductOperationComplete, editingProduct, onCancelEdit }) => {
    
    const initialFormState = {
        name: '', description: '', price: '', stock: '', category: '', image: '',
    };
    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(null); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const submissionData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
        };

        try {
            let resultProduct;
            
            if (editingProduct) {
                resultProduct = await productAPI.updateProduct(editingProduct._id, submissionData);
                alert(`Product '${resultProduct.name}' updated successfully!`);
            } else {
                resultProduct = await productAPI.createProduct(submissionData);
                alert(`Product '${resultProduct.name}' added successfully!`);
            }
            
            if (onProductOperationComplete) {
                onProductOperationComplete(); 
            }
            
            if (onCancelEdit) { 
                 onCancelEdit();
            }

        } catch (err) {
            setError(err.message || 'An unexpected error occurred during submission.');
            console.error("Submission error:", err);

        } finally {
            setLoading(false);
        }
    };

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
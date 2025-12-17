// mern-frontend/src/Home.jsx

import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import { productAPI } from './services/api'; 
import '../src/ProductStyles.css'; // Import CSS for styling

// Accept the onAddToCart handler from App.jsx
const Home = ({ onAddToCart }) => {
    // State to store the list of products (Read functionality)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to manage the Update function: stores the product object currently being edited.
    const [editingProduct, setEditingProduct] = useState(null); 
    
    // Controls the visibility of the Add/Edit form modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // **********************************************
    // Core Fetch Function (Using Axios)
    // **********************************************
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productAPI.getAllProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError(`Failed to load products. Error: ${err.message}. Check if backend (Port 5001) is running.`); 
        } finally {
            setLoading(false);
        }
    };

    // Run fetchProducts when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []); 

    // Handler to trigger re-fetch after a successful C/U/D operation
    const handleProductOperationComplete = () => {
        fetchProducts(); 
        handleCloseModal(); // Always close the modal after an operation
    };
    
    // **********************************************
    // Delete Logic (DELETE)
    // **********************************************
    const handleDeleteProduct = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete product: ${name}?`)) {
            return;
        }
        
        try {
            await productAPI.deleteProduct(id);
            alert(`Product '${name}' deleted successfully.`);
            
            // Re-fetch the product list to update the display
            handleProductOperationComplete(); 
            
        } catch (error) {
            console.error("Error deleting product:", error);
            alert(`Failed to delete product: ${error.message || 'Server error'}`);
        }
    };

    // **********************************************
    // Modal/Update Handlers
    // **********************************************
    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true); // Open the modal
    };

    const handleOpenModal = () => {
        setEditingProduct(null); // Ensure it's in Create mode
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null); // Reset editing state
    }

    return (
        <div className="home-container">
            
            {/* Dashboard Header */}
            <div className="dashboard-header">
                <h1>Product Management Dashboard</h1>
                
                {/* "+ Add Product" Button */}
                <button 
                    onClick={handleOpenModal}
                    className="add-product-btn" 
                    disabled={isModalOpen} 
                >
                   + Add Product
                </button>
            </div>

            {/* --- Modal Structure --- */}
            {(isModalOpen || editingProduct) && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {/* Close button at the top right */}
                        <button className="modal-close-btn" onClick={handleCloseModal}>&times;</button>
                        
                        {/* The Form is now inside the modal */}
                        <ProductForm 
                            onProductOperationComplete={handleProductOperationComplete}
                            editingProduct={editingProduct} // Pass the product data down
                            onCancelEdit={handleCloseModal} // Close on cancel/success
                        /> 
                    </div>
                </div>
            )}
            
            {/* --- Display Section (Product List) --- */}
            <h2>Available Products</h2>
            
            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {!loading && products.length === 0 && <p>No products found. Add one above!</p>}

            {/* Product List Structure */}
            <div className="product-list-grid"> 
                {products.map((product) => (
                    // --- Product Card JSX ---
                    <div key={product._id} className="product-card" >
                        
                        {/* Product Image */}
                        <div className="product-image-container">
                            <img 
                                src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                                alt={product.name} 
                                className="product-image" 
                            />
                        </div>

                        {/* Product Details */}
                        <div className="product-info">
                            <span className="product-category">{product.category}</span>
                            <h3>{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                        </div>
                        
                        <div className="product-footer">
                            {/* Currency Display */}
                            <span className="product-price">Rs {parseFloat(product.price).toFixed(2)}</span>
                            <span className="product-stock">Stock: {product.stock}</span>
                        </div>
                        
                        {/* Action Buttons: Edit, Delete, Add to Cart */}
                        <div className="product-actions">
                            <button 
                                onClick={() => handleEditClick(product)}
                                className="action-btn edit-btn"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDeleteProduct(product._id, product.name)}
                                className="action-btn delete-btn"
                            >
                                Delete
                            </button>
                            <button 
                                onClick={() => onAddToCart(product)}
                                className="action-btn cart-btn"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import { productAPI } from './services/api'; 
import '../src/ProductStyles.css'; 

const Home = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingProduct, setEditingProduct] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);


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


    useEffect(() => {
        fetchProducts();
    }, []); 


    const handleProductOperationComplete = () => {
        fetchProducts(); 
        handleCloseModal();
    };
    

    const handleDeleteProduct = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete product: ${name}?`)) {
            return;
        }
        
        try {
            await productAPI.deleteProduct(id);
            alert(`Product '${name}' deleted successfully.`);
            

            handleProductOperationComplete(); 
            
        } catch (error) {
            console.error("Error deleting product:", error);
            alert(`Failed to delete product: ${error.message || 'Server error'}`);
        }
    };


    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true); 
    };

    const handleOpenModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    }

    return (
        <div className="home-container">
            

            <div className="dashboard-header">
                <h1>Product Management Dashboard</h1>
                

                <button 
                    onClick={handleOpenModal}
                    className="add-product-btn" 
                    disabled={isModalOpen} 
                >
                   + Add Product
                </button>
            </div>


            {(isModalOpen || editingProduct) && (
                <div className="modal-overlay">
                    <div className="modal-content">

                        <button className="modal-close-btn" onClick={handleCloseModal}>&times;</button>
                        

                        <ProductForm 
                            onProductOperationComplete={handleProductOperationComplete}
                            editingProduct={editingProduct}
                            onCancelEdit={handleCloseModal}
                        /> 
                    </div>
                </div>
            )}
            

            <h2>Available Products</h2>
            
            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {!loading && products.length === 0 && <p>No products found. Add one above!</p>}


            <div className="product-list-grid"> 
                {products.map((product) => (

                    <div key={product._id} className="product-card" >
                        

                        <div className="product-image-container">
                            <img 
                                src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                                alt={product.name} 
                                className="product-image" 
                            />
                        </div>


                        <div className="product-info">
                            <span className="product-category">{product.category}</span>
                            <h3>{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                        </div>
                        
                        <div className="product-footer">

                            <span className="product-price">Rs {parseFloat(product.price).toFixed(2)}</span>
                            <span className="product-stock">Stock: {product.stock}</span>
                        </div>
                        

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
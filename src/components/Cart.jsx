import React from 'react';
import '../ProductStyles.css'; 

const Cart = ({ cartItems, onRemoveFromCart }) => {
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalUniqueItems = cartItems.length; 

    return (
        <div className="home-container">
            <h1>Shopping Cart</h1>
            
            {cartItems.length === 0 ? (
                <p>Your cart is empty. Go add some products!</p>
            ) : (
                <div className="cart-content">
                    <div className="cart-list">
                        {cartItems.map(item => (
                            <div key={item._id} className="cart-item">
                                <div className="cart-item-image-container">
                                    <img 
                                        src={item.image || 'https://via.placeholder.com/100x70?text=No+Image'} 
                                        alt={item.name} 
                                        className="cart-item-image" 
                                    />
                                </div>
                                
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <p>Rs {parseFloat(item.price).toFixed(2)} each</p> 
                                </div>

                                <div className="cart-item-remove">
                                    <button 
                                        onClick={() => onRemoveFromCart(item._id)} 
                                        className="action-btn delete-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                                
                                <div className="cart-item-subtotal">
                                    <strong>Rs {(item.price * 1).toFixed(2)}</strong>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <p>Total Items: {totalUniqueItems}</p>
                        <h3>Cart Total: Rs {total.toFixed(2)}</h3>
                        <button className="checkout-btn" onClick={() => alert("Checkout not yet implemented!")}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
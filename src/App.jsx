// mern-frontend/src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';
import Cart from './components/Cart'; 
import Contact from './components/Contact'; 

const App = () => {
    // STATE: Array to hold unique cart items
    const [cart, setCart] = useState([]); 

    // Handler: Adds a unique item to the cart (quantity fixed at 1)
    const handleAddToCart = (product) => {
        setCart((prevCart) => {
            // Check if the item is already in the cart
            const exists = prevCart.find(item => item._id === product._id);
            
            if (!exists) {
                // If new, add the item with quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
            // If it exists, do nothing (no quantity change)
            return prevCart;
        });
        alert(`${product.name} added to cart!`);
    };

    // Handler: Removes an item completely from the cart
    const handleRemoveFromCart = (productId) => {
        setCart(prevCart => {
            // Filter out the item with the matching productId
            return prevCart.filter(item => item._id !== productId);
        });
    };

    return (
        <Router>
            {/* Nav component (no cart count needed) */}
            <Nav /> 
            <Routes>
                {/* Home Page: Passes the handler for adding products to the cart */}
                <Route path="/" element={<Home onAddToCart={handleAddToCart} />} /> 
                
                {/* Cart Page: Passes the cart data and the removal handler */}
                <Route 
                    path="/cart" 
                    element={
                        <Cart 
                            cartItems={cart} 
                            onRemoveFromCart={handleRemoveFromCart}
                        />
                    } 
                />
                
                {/* Contact Page */}
                <Route path="/contect" element={<Contact />} />
            </Routes>
        </Router>
    );
};

export default App;
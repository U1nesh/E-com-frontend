import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';
import Cart from './components/Cart'; 
import Contact from './components/Contact'; 

const App = () => {
    const [cart, setCart] = useState([]); 

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
            const exists = prevCart.find(item => item._id === product._id);
            
            if (!exists) {
                return [...prevCart, { ...product, quantity: 1 }];
            }
            return prevCart;
        });
        alert(`${product.name} added to cart!`);
    };

    const handleRemoveFromCart = (productId) => {
        setCart(prevCart => {
            return prevCart.filter(item => item._id !== productId);
        });
    };

    return (
        <Router>
            <Nav /> 
            <Routes>
                <Route path="/" element={<Home onAddToCart={handleAddToCart} />} /> 
                
                <Route 
                    path="/cart" 
                    element={
                        <Cart 
                            cartItems={cart} 
                            onRemoveFromCart={handleRemoveFromCart}
                        />
                    } 
                />
                
                <Route path="/contect" element={<Contact />} />
            </Routes>
        </Router>
    );
};

export default App;